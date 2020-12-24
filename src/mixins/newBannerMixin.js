import { mapState } from 'vuex';
import Promotion from '@/apis/Promotion'
import  { EventBus } from '../main'
import cloudinary from '@/mixins/cloudinaryMixin'

export default {
    mixins: [cloudinary],
    methods: {
        uploadBanner() {

            const {banner_title, image} = this.form;

            if(banner_title == '' || image == '') {
                return;
            }

            
            this.loading = true;
            this.uploadFileToCloudinary(this.form.image, 'banners').then(res => {
                Promotion.uploadBanner(this.form).then(res => {
                    this.loading = false;
                    if(res.status === 200){
                        this.$store.commit('ADD_ONE_BANNER', res.data)
                        EventBus.$emit('success', "Banner Created Successfully 🎉! Need to active banner again", 'back to home', 'Promotions')
                    }else {
                        EventBus.$emit('error_occur', "Error on creating Banner! Check your internet connection or contact Developer to fix it ❌", 'back to home', 'Promotions')
                    }
                }) 
            })
        },
        clearFields() {
            this.form.name = '';
            this.form.image = '',
            this.form.banner_title = ''
            this.$refs.fileupload.value = null

        }
    },
    computed: {
        ...mapState({
            cloudinary: state => state.cloudinaryModule
        })
    }
}