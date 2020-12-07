<template>
  <div>
    <app-page-title
      :buttonEnabled="false"
      :title="'Edit Product id - '+ form.id"
      titleIcon="pe-7s-note"
    />
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="input-group">

          <input
            v-model="form.model"
            type="text"
            class="form-control"
          >
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              model
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="input-group">
          <input
            v-model="form.productName"
            type="text"
            class="form-control"
          >
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              Product Name
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">
          <input
            v-model="form.brand"
            type="text"
            class="form-control"
          >
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              Brand
            </span>
          </div>
        </div>

      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">
          <input
            v-model="form.realPrice"
            type="text"
            class="form-control"
          >
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              Real Price (optional)
            </span>
          </div>
        </div>

      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">

          <select
            class="custom-select"
            id="inputGroupSelect01"
            v-model="form.rating"
          >
            <option hidden>Rating</option>
            <option
              v-for="(item, index) in ratingValue"
              :key="index"
              :value="item"
              :selected="form.rating == item"
            >{{ item }}</option>
          </select>
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >rating
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">

          <select
            class="custom-select"
            id="inputGroupSelect01"
            v-model="form.sale"
          >
            <option hidden>Sale</option>

            <option
              v-for="(item, index) in saleOptionValue"
              :key="index"
              :value="item"
              :selected="form.type == item"
            >{{ item }}</option>
          </select>
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              sale
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">

          <select
            class="custom-select"
            id="inputGroupSelect01"
            v-model="form.type"
          >
            <option hidden>Type</option>
            <option
              v-for="(item, index) in optionValue"
              :key="index"
              :value="item"
              :selected="form.type == item"
            >{{ item }}</option>
          </select>

          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              type
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">
          <input
            v-model="form.promoPrice"
            type="text"
            class="form-control"
          >
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              Promo Price
            </span>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">
          <input
            v-model="form.productType"
            type="text"
            class="form-control"
          >
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              Product Type (eg . Cooler)
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 mt-3">

        <vue-upload-multiple-image
          dragText=''
          primaryText="completed"
          popupText="upload multiple images"
          browseText="product image upload"
          @upload-success="uploadImageSuccess"
          @before-remove="beforeRemove"
          :data-images="images"
          markIsPrimaryText="go first"
          :maxImage=10
        ></vue-upload-multiple-image>

      </div>

      <div class="col-sm-12 col-md-12 mt-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              <unicon
                name="bookmark"
                fill="black"
              ></unicon>
            </span>
          </div>
          <input
            v-model="detail"
            type="text"
            class="form-control"
            placeholder="Detail (Enter each one line and press 'enter' to add)"
            v-on:keyup.enter="addToDetail"
          >
        </div>
      </div>

      <div
        v-show="form.details && form.details.length > 0"
        class="card m-4"
        style="width: 100%"
      >
        <div class="card-header">
          Details
        </div>
        <ul
          class="list-group list-group-flush"
          v-for="(item,index) in form.details"
          :key="index"
        >
          <li
            class="list-group-item d-flex"
            style="min-height: 2rem"
          >
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
                <unicon
                  name="times-circle"
                  fill="red"
                ></unicon>
              </button>
            </div>

          </li>
        </ul>
      </div>

      <div class="col-sm-12 col-md-12 mt-3">

        <button
          class="btn btn-success btn-block"
          type="button"
          @click="prepareData()"
          :disabled=isLoading
        >
          <span
            v-if="isLoading"
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span>{{ isLoading? 'Uploading' : 'Upload'}}</span>
        </button>
      </div>

    </div>
    <br>
    <SuccessAlert />
    <ErrorAlert />

  </div>
</template>

<script>
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'
import AppPageTitle from '@/components/AppPageTitle'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import productMixin from '@/mixins/productMixin'
import optionValueMixin from '@/mixins/optionValueMixin'
import helper from '@/helpers/index'
import { EventBus } from '../../main'


import { mapGetters } from 'vuex'
export default {
  mixins: [productMixin, optionValueMixin],
  components: {
    AppPageTitle,
    VueUploadMultipleImage,
    SuccessAlert,
    ErrorAlert
  },
  data () {
    return {
      form: {},
      detail: '',
      images: [],
      isDisable: false,
      isLoading: false,
      successText: "Updated Product",
      errorText: "Error On Updating Product!. Contact via minthukyaw@uit.edu.mm"
    }
  },
  methods: {
    prepareData () {
      this.isLoading = true;
      this.images.forEach((file, index) => {
        if (helper.checkImageExistsOnServer(file.path) == 200 && helper.validURL(file.path)) {
          if (index + 1 == this.images.length) this.updateProductInStore();
        } else {
          this.uploadFilesToCloudinary(file.path).then(res => {
            if (res.length == this.images.length) {
              this.form.imageURLs = res;
              this.updateProductInStore();
            }
          })
        }
      });
    },
    updateProductInStore () {
      this.$store.dispatch('updateProduct', this.form).then((res) => {
        if (res.status === 200) {
          EventBus.$emit('success', this.successText, 'back to home', 'Products')
          this.isLoading = false;
        } else {
          EventBus.$emit('error_occur', this.errorText)
        }
      }).catch(err => {
        EventBus.$emit('error_occur', err)
      })
    },
    collectImages () {
      this.form.imageURLs.forEach(imagePath => {
        var imgObj = {
          path: imagePath,
          default: 1,
          highlight: 1
        };
        this.images.push(imgObj);
      });
    },
    beforeRemove (index) {
      var r = confirm("Are you sure to delete image?")
      if (r == true) {
        this.images.splice(index, 1);
      }
    },
  },
  computed: {
    ...mapGetters({
      allProducts: 'loadAllProducts',
      oldValue: 'getProductById'
    })
  },
  mounted () {
    if (this.allProducts.length == 0) {
      this.$store.dispatch('loadProducts').then(() => {
        this.form = this.oldValue(parseInt(this.$route.params.id))
        this.collectImages();
      });
    } else {
      this.form = this.oldValue(parseInt(this.$route.params.id))
      this.collectImages();
    }
  }

}
</script>

<style>
</style>