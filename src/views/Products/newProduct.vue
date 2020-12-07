<template>
  <div>
    <app-page-title
      :buttonEnabled="false"
      title="New Product"
      titleIcon="pe-7s-note"
    />
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <input-field
          icon="label"
          v-model="form.model"
          placeholdingtext="Model"
        />
      </div>
      <div class="col-sm-12 col-md-6">
        <input-field
          icon="label-alt"
          v-model="form.productName"
          placeholdingtext="Product Name"
        />
      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <input-field
          icon="postcard"
          v-model="form.brand"
          placeholdingtext="Brand"
        />

      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              <unicon
                name="award"
                fill="black"
              ></unicon>
            </span>
          </div>
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
            >{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <input-field
          icon="usd-circle"
          v-model="form.realPrice"
          placeholdingtext="Real Price (optional)"
        />

      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <input-field
          icon="usd-circle"
          v-model="form.promoPrice"
          placeholdingtext="Promotion Price"
        />
      </div>

      <div class="col-sm-12 col-md-6 mt-3">
        <input-field
          icon="label"
          v-model="form.productType"
          placeholdingtext="Product Type (eg. Cooler)"
        />
      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              <unicon
                name="shopping-cart"
                fill="black"
              ></unicon>
            </span>
          </div>
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
            >{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 mt-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text"
              id="basic-addon1"
            >
              <unicon
                name="shopping-cart"
                fill="black"
              ></unicon>
            </span>
          </div>
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
            >{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 mt-3">

        <vue-upload-multiple-image
          dragText=''
          primaryText="completed"
          popupText="upload multiple images"
          browseText="product image upload"
          :showDelete=false
          @upload-success="uploadImageSuccess"
          :data-images="images"
          markIsPrimaryText="go first"
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
        v-show="form.details.length > 0"
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
      <div class="col-12 d-flex justify-content-center mt-3">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="new_released"
            v-model="form.new_released"
          >
          <label
            class="form-check-label"
            for="new_released"
          >New Released</label>
        </div>
        <div class="form-check ml-3">
          <input
            type="checkbox"
            class="form-check-input"
            id="trending_now"
            v-model="form.trending_now"
          >
          <label
            class="form-check-label"
            for="trending_now"
          >Trending Now</label>
        </div>
      </div>
      <div class="col-sm-12 col-md-12 my-3">

        <button
          class="btn btn-success btn-block"
          type="button"
          @click="uploadProduct"
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
    <SuccessAlert />

  </div>
</template>
<script>
import AppPageTitle from '@/components/AppPageTitle'
import InputField from '../../components/InputField.vue'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import productMixin from '@/mixins/productMixin'
import optionValueMixin from '@/mixins/optionValueMixin'

export default {
  mixins: [productMixin, optionValueMixin],
  data () {
    return {
      form: {
        productName: '',
        model: '',
        brand: '',
        rating: 'Rating',
        productType: '',
        realPrice: '',
        promoPrice: '',
        sale: 'Sale',
        details: [],
        type: 'Type',
        imageURLs: [],
        isNewRelease: true,
        isPopular: false

      },
      isAlertEnabled: false,
      detail: '',
      images: [],
      isDisable: false,
      isLoading: false,
    }
  },
  components: {
    SuccessAlert,
    AppPageTitle,
    InputField,
    VueUploadMultipleImage
  }
}
</script>
