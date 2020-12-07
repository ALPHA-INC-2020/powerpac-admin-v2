import axios from 'axios'
export default {
    methods: {
        uploadFilesToCloudinary(file, folderName) {
            return new Promise((resolve, reject) => {
                if (this.images.length !== this.form.imageURLs.length) {
                  var formData =  this.prepareFormData(file, folderName);
                    axios({
                        method: 'POST',
                        url: this.cloudinary.cloudinary_url,
                        data: formData
                    }).then((response) => {

                        if (response.status === 200) {
                            this.form.imageURLs.push(response.data.secure_url);
                            resolve(this.form.imageURLs)

                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                } else {
                    reject(file);
                }
            })
        },
        uploadFileToCloudinary(file, folderName) {
                 return new Promise((resolve, reject) => {
                    var formData = this.prepareFormData(file, folderName);
                    axios({
                        method: 'POST',
                        url: this.cloudinary.cloudinary_url,
                        data: formData
                    }).then(res => {
                        if(res.status === 200) {
                            this.form.image = res.data.secure_url
                            resolve(res.status)
                        }else {
                            console.log('error on uploading banner')
                            reject(file)
                        }
                    }).catch(e => console.log('error' + e))
            })
        },
        prepareFormData(file, folderName) {
              let formData = new FormData();
                    formData.append('upload_preset', this.cloudinary.cloudinary_upload_preset);
                    formData.append("api_key", this.cloudinary.cloudinary_api_key);
                    formData.append('folder', folderName);
                    formData.append('file', file);
                    return formData;
        }
    }
}