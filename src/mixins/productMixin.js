import Product from "@/apis/Product"
import { EventBus } from '../main'
import { mapState } from 'vuex';
import cloudinary from '@/mixins/cloudinaryMixin'

export default {
    mixins: [cloudinary],
    methods: {
        uploadProduct() {
            this.loading = true;
            this.images.forEach((file) => {
                this.uploadFilesToCloudinary(file, 'products').then((res) => {
                    if (res.length == this.images.length) {
                        this.form.navigator = this.form.productName.split(' ').join('_').replace('/', '_').replace('-', '_')
                        Product.uploadProduct(this.form).then((res) => {
                                if (res.status == 200) {
                                    EventBus.$emit('success', "Product Uploaded Successfully 🎉", 'back to home', 'Products')
                                    this.$store.commit('ADD_ONE_PRODUCT', res.data);
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
            this.images = [];
            this.form.model = '';
            this.form.productName = ''
            this.form.brand = ''
            this.form.productType = ''
            this.form.realPrice = ''
            this.form.promoPrice = ''
            this.form.imageURLs = []
            this.form.sale = 'onsale'
            this.form.rating = 5
            this.form.type = 'fan'
            this.form.details = [],
            this.form.new_released = true;
            this.form.trending_now = false;
            this.$refs.fileupload.state=null;

        }

    },
    computed: {
        ...mapState({
            cloudinary: state => state.cloudinaryModule
        })
    }
};