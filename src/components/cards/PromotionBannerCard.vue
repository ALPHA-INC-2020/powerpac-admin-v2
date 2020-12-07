<template>

  <div
    class="banner-c w-100 px-3 d-flex align-items-center rounded border border-grey justify-content-between"
    :class="{'bg-gradient' : bannerContent.status}"
  >
    <div>
      <h5 :class="{'text-white' : bannerContent.status}">{{bannerContent.banner_title.toUpperCase()}}</h5>
      <p
        class="mb-2"
        :class="{'text-white' : bannerContent.status}"
      >banner name - {{ bannerContent.name }}</p>
    </div>
    <div class="img-c d-flex justify-content-center">
      <img
        :src="bannerContent.image"
        alt=""
        class="banner_preview"
      >
    </div>

    <div
      class="check-c d-flex justify-content-center"
      v-if="!bannerContent.status"
    >
      <button
        @click="itemActiveUpdate(bannerContent.id, bannerContent.status, 'banner')"
        class="btn"
        v-if="!bannerContent.status"
      >
        <unicon
          name="bookmark"
          fill="blue"
        />
      </button>
      <div
        class="btn"
        v-if="!bannerContent.status"
      >
        <unicon
          name="edit"
          fill="blue"
        />
      </div>
      <button
        class="btn"
        v-if="!bannerContent.status"
        @click="callDeleteDialog({id: bannerContent.id,stateElement: 'allBanners', stateAction: 'deleteBanner'})"
      >
        <unicon
          name="trash"
          fill="red"
        />
      </button>
    </div>

  </div>
</template>

<script>
import actionMixin from '@/mixins/actionMixin'
export default {
  mixins: [actionMixin],
  props: {
    bannerContent: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      status: ''
    }
  },
}
</script>

<style scoped>
.banner-c {
  min-height: 100px;
}
.banner_preview {
  height: 100%;
  width: 70px;
}
.bg-gradient {
  background: rgb(114, 112, 112);
  background: linear-gradient(
    166deg,
    rgba(114, 112, 112, 1) 22%,
    rgba(155, 117, 7, 1) 67%,
    rgba(142, 144, 8, 1) 100%
  );
}
</style>