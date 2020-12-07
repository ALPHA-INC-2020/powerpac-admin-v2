import axios from 'axios'
import Product from "@/apis/Product"
import { EventBus } from '../main'
import { mapState } from 'vuex';
import cloudinary from '@/mixins/cloudinaryMixin'

export default {
    mixins: [cloudinary],
    methods: {
        uploadProduct() {
            this.isLoading = true;
            console.log(this.images);
            this.images.forEach((file) => {
                this.uploadFilesToCloudinary(file.path, 'products').then((res) => {
                    if (res.length == this.images.length) {
                        this.form.navigator = this.form.productName.split(' ').join('_').replace('/', '_').replace('-', '_')
                        Product.uploadProduct(this.form).then((res) => {

                                if (res.status == 200) {
                                    EventBus.$emit('success', "Product Uploaded Successfully 🎉", 'back to home', 'Products')
                                    this.$store.commit('ADD_ONE_PRODUCT', res.data);
                                    this.isLoading = false;
                                    this.isAlertEnabled = true;
                                    this.clearFields()
                                } else {
                                    console.log('error on uploading data')
                                }
                            })
                            .catch((err) => console.log(err))
                    }
                }).catch((err) => {
                    console.log("error: " + err)
                })
            })
        },
        // uploadFilesToCloudinary(file) {
        //     return new Promise((resolve, reject) => {
        //         if (this.form.imageURLs.length !== this.images.length) {
        //             let formData = new FormData();
        //             formData.append('upload_preset', this.cloudinary.cloudinary_upload_preset);
        //             formData.append("api_key", this.cloudinary.cloudinary_api_key);
        //             formData.append('folder', 'products');
        //             formData.append('file', file);

        //             axios({
        //                 method: 'POST',
        //                 url: this.cloudinary.cloudinary_url,
        //                 data: formData
        //             }).then((response) => {

        //                 if (response.status === 200) {
        //                     this.form.imageURLs.push(response.data.secure_url);
        //                     resolve(this.form.imageURLs)

        //                 }
        //             }).catch((error) => {
        //                 console.log(error);
        //             })
        //         } else {
        //             reject(file);
        //         }
        //     })
        // },
        uploadImageSuccess(formData, index, fileList) {
            this.images = fileList;
            console.log(fileList)
        },
        updateTask(e, index) {
            this.form.details[index] = e.target.innerText;
            e.target.blur();
        },
        addToDetail() {
            this.form.details.push(this.detail)
            this.detail = ''
        },
        deleteDetailItem(index) {
            this.form.details.splice(index, 1);
        },
        clearFields() {
            this.$emit('clearfield');
            this.images = [];
            this.form.imageURLs = []
            this.form.sale = 'Sale'
            this.form.rating = 'Rating'
            this.form.type = 'Type'
            this.form.details = [],
                this.form.new_released = true;
            this.form.trending_now = false;
        }

    },
    computed: {
        ...mapState({
            cloudinary: state => state.cloudinaryModule
        })
    }
};