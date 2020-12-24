<template>
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader>
          <strong>Create New Product</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <CInput
                v-model="form.model"
                label="Model"
                placeholder="Enter Product Model"
              />
            </CCol>
            <CCol sm="6">
              <CInput
                v-model="form.productName"
                label="Name"
                placeholder="Enter Product Name"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CInput
                v-model="form.brand"
                label="Brand"
                placeholder="Enter Product Brand"
              />
            </CCol>
            <CCol sm="6">
              <CSelect
                label="Rating"
                :options="[5,4,3,2,1]"
                :value.sync="form.rating"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CInput
                v-model="form.realPrice"
                label="Price(optional)"
                type="number"
                placeholder="Enter Real Price"
              />
            </CCol>
            <CCol sm="6">
              <CInput
                type="number"
                v-model="form.promoPrice"
                label="Sale Price"
                placeholder="Enter Sale Price"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CSelect
                :value.sync="form.sale"
                label="Stock"
                :options="['onsale','outstock', 'preorder']"
              />
            </CCol>
            <CCol sm="6">
              <CInput
                v-model="form.productType"
                label="Product Type"
                placeholder="Enter Product Type (eg cooler)"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <CSelect
                :value.sync="form.type"
                label="Type"
                :options="['fan', 'iron', 'insect_repellent', 'vacuum', 'fridge', 'jug', 'cooker', 'steamboat', 'blender', 'chopper', 'oven', 'toaster', 'fryer', 'airpot']"
              />
            </CCol>
            <CCol sm="6">
              <h6 class="mb-3">Product Photos</h6>
              <CInputFile
                ref="fileupload"
                type="file"
                multiple
                @change="onFileChange"
              />
            </CCol>
          </CRow>

          <CRow
            class="d-flex flex-wrap"
            v-if="images.length != 0"
          >
            <CCol
              sm="2"
              class="image_container"
              v-for="(image, index) in images"
              :key="index"
            >
              <img
                :src="image"
                alt=""
                class="child_img"
              >
              <div
                class="rm-img"
                @click="removeImage(index)"
              >
                <CIcon
                  name="cil-x"
                  class="icon"
                />
              </div>
            </CCol>

          </CRow>
          <CRow>
            <CCol sm="12">
              <CInput
                label="Details"
                v-model="detail"
                type="text"
                placeholder="Detail (Enter each one line and press 'enter' to add)"
                v-on:keyup.enter="addToDetail"
              />
            </CCol>
          </CRow>

          <CRow v-show="form.details.length > 0">
            <CCol sm="12">
              <CCard>
                <CCardHeader>
                  Details
                </CCardHeader>
                <CCardBody>
                  <ul
                    v-for="(item,index) in form.details"
                    :key="index"
                  >
                    <li class="d-flex justify-content-between">
                      <p
                        style="width: 100%;padding: 5px"
                        contenteditable="true"
                        v-on:keydown.enter="updateTask($event, index)"
                        v-on:blur="updateTask($event, index)"
                      >{{item}}</p>
                      <div class="ml-auto">
                        <button
                          @click="deleteDetailItem(index)"
                          type="button"
                          class="btn btn-sm"
                        >
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
          <CButton
            color="success"
            block
            :disabled="loading"
            @click="uploadProduct()"
          >
            <span v-if="!loading">Create</span>
            <CSpinner
              v-else
              color="light"
              size="sm"
            />
          </CButton>

          <SuccessAlert />

        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SuccessAlert from '@/components/alerts/SuccessAlert'
import productMixin from '@/mixins/productMixin'
export default {
  mixins: [productMixin],
  components: {
    SuccessAlert
  },
  data () {
    return {
      form: {
        productName: '',
        model: '',
        brand: '',
        rating: 5,
        productType: '',
        realPrice: '',
        promoPrice: '',
        sale: 'onsale',
        details: [],
        type: 'Type',
        imageURLs: [],
        isNewRelease: true,
        isPopular: false
      },
      detail: '',
      images: [],
      loading: false,
    }
  },
  methods: {

    addToDetail () {
      this.form.details.push(this.detail)
      this.detail = ''
    },
    onFileChange (files) {
      if (!files.length)
        return;
      this.createImage(files);
    },
    createImage (files) {
      var vm = this;
      for (var index = 0; index < files.length; index++) {
        var reader = new FileReader();
        reader.onload = function (event) {
          const imageUrl = event.target.result;
          vm.images.push(imageUrl);
        }
        reader.readAsDataURL(files[index]);
      }
    },
    removeImage (index) {
      this.exceeded = false;
      this.images.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.title-input {
  border: 1px solid #cacacc;
  outline: none;
  width: 100%;
  padding: 10px;
}
.btn {
  margin: 1px;
}

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
