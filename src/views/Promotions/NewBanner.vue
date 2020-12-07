<template>
  <div>
    <app-page-title
      :buttonEnabled="false"
      title="Create New Banner"
      titleIcon="pe-7s-pen"
    />
    <div class="row">
      <div class="col-12">
        <input
          type="text"
          class="form-control"
          placeholder="Banner Title"
          v-model="form.banner_title"
        >
      </div>
      <div class="col-12 mt-3">
        <input
          type="text"
          class="form-control"
          placeholder="Banner Name"
          v-model="form.name"
        >
        <small class="form-text text-muted">This name won't show to users, we are just want to know nickname of your banner to be easy in remembering</small>
      </div>
      <div class="col-12 mt-3 card py-5 px-3">
        <h2>Banner Image Upload</h2>
        <div class="alert alert-warning">
          make sure your image have resolution <b>1920x1080</b>
        </div>
        <input
          type="file"
          ref="fileupload"
          @change="onFileChange"
          class="form-control"
        />

        <div
          id="preview"
          class="mt-5"
        >
          <img
            v-if="url"
            :src="url"
            class="w-100 h-100"
          />
        </div>
      </div>
      <button
        class="btn btn-success btn-block my-2"
        @click="uploadBanner()"
        :disabled="loading"
      >
        <span
          v-if="loading"
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        {{loading? 'Creating' : 'Create'}}
      </button>
    </div>
    <SuccessAlert />
    <ErrorAlert />
  </div>
</template>

<script>
import AppPageTitle from '@/components/AppPageTitle'
import NewBannerMixin from '@/mixins/newBannerMixin'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'
export default {
  mixins: [NewBannerMixin],
  data () {
    return {
      url: null,
      loading: false,
      form: {
        name: '',
        banner_title: '',
        image: ''
      }
    }
  },
  components: {
    AppPageTitle,
    SuccessAlert,
    ErrorAlert
  },
  methods: {
    onFileChange (e) {
      const file = e.target.files[0];
      this.form.image = file;
      this.url = URL.createObjectURL(file);
    }
  }
}
</script>

<style>
#preview {
  height: 90px;
  width: 160px;
}
</style>