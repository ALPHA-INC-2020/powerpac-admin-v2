<template>

  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader>
          <strong>Create New Banner</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <CInput
                v-model="form.banner_title"
                label="Banner Title"
              ></CInput>
              <CAlert
                show
                color="warning"
              >
                make sure your image have resolution <b>1920x1080</b>
              </CAlert>
              <CInputFile
                type="file"
                label="Banner Image Upload"
                ref="fileupload"
                @change="onFileChange"
              />
              <CImg
                :src="url"
                v-if="url"
                height="300px"
                width="500px"
              />

            </CCol>

          </CRow>
          <CButton
            @click="uploadBanner()"
            block
            color="success"
            :disabled="loading"
          ><span v-if="!loading">Create</span>
            <CSpinner
              v-else
              color="light"
              size="sm"
            />
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <SuccessAlert />
    <ErrorAlert />
  </CRow>

</template>

<script>
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
        banner_title: '',
        image: ''
      }
    }
  },
  components: {
    SuccessAlert,
    ErrorAlert
  },
  methods: {
    onFileChange (fileList) {
      const file = fileList[0];
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