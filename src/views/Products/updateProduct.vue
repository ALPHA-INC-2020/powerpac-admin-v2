<template>

  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader>
          <strong>Edit Product</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <CInput v-model="form.model"
                      label="Model"
                      placeholder="Enter Product Model" />
            </CCol>
            <CCol sm="6">
              <CInput v-model="form.productName"
                      label="Name"
                      placeholder="Enter Product Name" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CInput v-model="form.brand"
                      label="Brand"
                      placeholder="Enter Product Brand" />
            </CCol>
            <CCol sm="6">
              <CSelect label="Rating"
                       :options="[5,4,3,2,1]"
                       :value.sync="form.rating" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CInput v-model="form.realPrice"
                      label="Price(optional)"
                      type="number"
                      placeholder="Enter Real Price" />
            </CCol>
            <CCol sm="6">
              <CInput type="number"
                      v-model="form.promoPrice"
                      label="Sale Price"
                      placeholder="Enter Sale Price" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CSelect :value.sync="form.sale"
                       label="Stock"
                       :options="['onsale','outstock', 'preorder']" />
            </CCol>
            <CCol sm="6">
              <CInput v-model="form.productType"
                      label="Product Type"
                      placeholder="Enter Product Type (eg cooler)" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CSelect :value.sync="form.type"
                       label="Type"
                       :options="['fan', 'iron', 'insect_repellent', 'vacuum', 'fridge', 'jug', 'cooker', 'steamboat', 'blender', 'chopper', 'oven', 'toaster', 'fryer', 'airpot']"
              />
            </CCol>
            <CCol sm="6">
              <h6 class="mb-3">Product Photos</h6>
              <CInputFile ref="fileupload"
                          type="file"
                          multiple
                          @change="onFileChange" />
            </CCol>
          </CRow>

          <CRow class="d-flex flex-wrap" v-if="images.length != 0">
            <CCol sm="2"
                  class="image_container"
                  v-for="(image, index) in images"
                  :key="index">
              <img :src="image"
                   alt=""
                   class="child_img">
              <div class="rm-img" @click="removeImage(index)">
                <CIcon name="cil-x" class="icon" />
              </div>
            </CCol>

          </CRow>
          <CRow>
            <CCol sm="12">
              <CInput label="Details"
                      v-model="detail"
                      type="text"
                      placeholder="Detail (Enter each one line and press 'enter' to add)"
                      v-on:keyup.enter="addToDetail" />
            </CCol>
          </CRow>

          <CRow v-if="form.details.length">
            <CCol sm="12">
              <CCard>
                <CCardHeader>
                  Details
                </CCardHeader>
                <CCardBody>
                  <ul v-for="(item,index) in form.details" :key="index">
                    <li class="d-flex justify-content-between">
                      <p style="width: 100%;padding: 5px"
                         contenteditable="true"
                         v-on:keydown.enter="updateTask($event, index)"
                         v-on:blur="updateTask($event, index)">{{item}}</p>
                      <div class="ml-auto">
                        <button @click="deleteDetailItem(index)"
                                type="button"
                                class="btn btn-sm">
                                          <CIcon name="cil-x" />
                                        </button>
                      </div>
                    </li>
                  </ul>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow class="d-flex justify-content-center mb-4">
            <span class="mr-3">
                              <input
                                checked
                                type="checkbox"
                                class="mr-3"
                                v-model="form.isNewRelease"
                                id="new"
                              />
                              <label for="new">Add To New Released</label>
                            </span>
            <span class="ml-1">
                              <input
                                type="checkbox"
                                v-model="form.isPopular"
                                id="trend"
                                class="mr-3"
                              />
                              <label for="trend">Add to Trending Now</label>
                            </span>
          </CRow>
          <CButton color="primary" block
                   :disabled="loading"
                   @click="prepareData()">

            <span v-if="!loading">Save</span>
            <CSpinner v-else
                      color="light"
                      size="sm" />
          </CButton>
          <!-- <SuccessAlert /> -->
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

</template>

<script>

  import { mapGetters, mapState } from 'vuex'
  import helper from '@/helpers/index'
  import cloudinary from '@/mixins/cloudinaryMixin'
  import productMixin from '@/mixins/productMixin'

  export default {
    mixins: [cloudinary, productMixin],
    data() {
      return {
        form: {
          details: []
        },
        detail: '',
        images: [],
        isDisable: false,
        loading: false,
        successText: 'Updated Product',
        errorText: 'Error On Updating Product!. Contact via minthukyaw@uit.edu.mm'
      }
    },
    methods: {
      prepareData() {
        this.loading = true
        this.images.forEach((file, index) => {
          if (helper.checkImageExistsOnServer(file) === 200 && helper.validURL(file)) {
            console.log('ON SERVER')
            this.checkE()
          } else {
            console.log('not on server')
            this.uploadFilesToCloudinary(file).then(() => {
              this.checkE()
            })
          }
        })
      },
      checkE() {
        console.log(this.images.length);
        console.log(this.form.imageURLs.length)
        if(this.images.length === this.form.imageURLs.length) {
          this.updateProductInStore();
        }
      },
      updateProductInStore() {
        this.$store
          .dispatch('updateProduct', this.form)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.loading = false;
              console.log('success')
            } else {
            console.log('error')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      onFileChange(files) {
        if (!files.length) return
        this.createImage(files)
      },
      createImage(files) {
        var vm = this
        for (var index = 0; index < files.length; index++) {
          var reader = new FileReader()
          reader.onload = function(event) {
            const imageUrl = event.target.result
            vm.images.push(imageUrl)
          }
          reader.readAsDataURL(files[index])
        }
      },
      removeImage(index) {
        this.images.splice(index, 1)
        this.form.imageURLs.splice(index,1)
      },
      collectImages() {
        this.form.imageURLs.forEach(imagePath => {
          this.images.push(imagePath)
        })


      }
    },
    computed: {
      ...mapGetters({
        allProducts: 'loadAllProducts',
        oldValue: 'getProductById'
      }),
      ...mapState({
        cloudinary: state => state.cloudinaryModule
      })
    },
    created() {
      if (this.allProducts.length == 0) {
        this.$store.dispatch('loadProducts').then(() => {
          this.form = this.oldValue(parseInt(this.$route.params.id))
          this.collectImages()
        })
      } else {
        this.form = this.oldValue(parseInt(this.$route.params.id))
        this.collectImages()
      }
    }
  }

</script>

<style scoped>

  .image_container {
    height: 150px;
    position: relative;
    padding: 10px;
    width: 50%;
  }
  .child_img {
    height: 100%;
    width: 100%;
  }
  .rm-img {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .icon {
    background: rgba(128, 128, 128, 0.605);
    cursor: pointer;
    border-radius: 50%;
  }
  .icon:hover {
    background: rgba(255, 0, 0, 0.571);
  }

</style>
