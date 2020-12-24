
<template>
  <div>
    <input
      type="text"
      class="title-input mb-3"
      placeholder="Promotion Title"
      v-model="form.title"
    >
    <!-- <vue-editor
      v-model="form.content"
      placeholder="Promotion Content"
    ></vue-editor> -->
    <VueEditor
      v-model="form.content"
      placeholder="Promotion Content"
    ></VueEditor>
    <div>

      <div class="alert alert-warning mt-2">
        You have to upload <b>four</b> images
      </div>
      <input
        ref="fileupload"
        type="file"
        multiple
        @change="onFileChange"
      >
    </div>

    <div
      class="card mt-2"
      v-show="form.content != '' || images.length != 0"
    >
      <div class="card-body">
        <div class="row">
          <div class="col-sm">
            <div
              class="d-flex flex-wrap"
              v-if="images.length != 0"
            >
              <div
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
                    name="cil-x-circle"
                    class="icon"
                  >
                  </CIcon>
                </div>
              </div>

            </div>
            <div
              v-else
              class="text-center"
            >
              <p class="text-muted">Preview image</p>
            </div>
          </div>
          <div class="col-sm">
            <h3 class="py-2 font-weight-bold">{{form.title}}</h3>
            <p
              class="p-2"
              v-html="form.content"
              v-if="form.content"
            ></p>
            <p
              v-else
              class="p-2 text-muted"
            >Preview Content ...</p>
          </div>
        </div>
      </div>

    </div>

    <CButton
      color="success"
      class="mt-3"
      block
      :disabled="loading"
      @click="uploadPromotion()"
    >

      <span v-if="!loading">Create</span>
      <CSpinner
        v-else
        color="light"
        size="sm"
      />
    </CButton>

    <div
      class="alert alert-danger mt-2"
      v-show="exceeded"
    >
      Promotion Photo must be exactly added <b>four</b> images
    </div>
    <SuccessAlert />
    <ErrorAlert />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import NewPromotionMixin from '@/mixins/newPromotionMixin'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'


export default {
  mixins: [NewPromotionMixin],
  components: {
    VueEditor,
    SuccessAlert,
    ErrorAlert,
  },
  data () {
    return {
      loading: false,
      exceeded: false,
      form: {
        title: '',
        content: '',
        imageURLs: []
      },
      images: []
    }
  },
  methods: {
    clearContent () {
      this.editor.clearContent(true)
      this.editor.focus()
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files;
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
  },
}
</script>

<style lang="scss" scoped>
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
  height: 220px;
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
