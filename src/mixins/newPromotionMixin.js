import {
    mapState
} from 'vuex';
import Promotion from '@/apis/Promotion'
import {
    EventBus
} from '../main'
import cloudinary from '@/mixins/cloudinaryMixin'


export default {
    mixins: [cloudinary],
    methods: {
        uploadPromotion() {
            this.loading = true
            if (this.form.imageURLs.length > 4) {
                this.exceeded = true;
            } else {
                this.loading = true;
               this.images.forEach((file) => {
                this.uploadFilesToCloudinary(file, 'promotions').then(({imageURLs}) => {
                    if (imageURLs.length == this.images.length) {
                        Promotion.createPromotion(this.form).then((res) => {
                                if (res.status == 200) {
                                    this.$store.commit('ADD_ONE_PROMOTION', res.data);
                                    EventBus.$emit('success', "Promotion Created Successfully 🎉", 'back to home', 'Promotions')
                                    this.loading = false;
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
            }
        },
        clearFields() {
            this.form.title = '',
            this.form.content = '',
            this.form.imageURLs = []
            this.images = [],
            this.$refs.fileupload.value=null;
        }
    },
    computed: {
        ...mapState({
            cloudinary: state => state.cloudinaryModule
        })
    }
}