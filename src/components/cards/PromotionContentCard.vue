<template>

  <div
    class="banner-c w-100 px-3 d-flex align-items-center rounded border border-grey justify-content-between"
    :class="{'bg-gradient' : bannerContent.status}"
  >
    <div class="py-3">
      <h5
        :class="{'text-white' : bannerContent.status}"
        class="px-2"
        style="line-height: 30px"
      >{{bannerContent.title.toUpperCase()}}</h5>
    </div>
    <div class="img-c d-flex justify-content-center">
      <span
        v-for="(item, index) in bannerContent.imageURLs"
        :key="index"
      >
        <img
          :src="item"
          alt=""
          class="banner_preview"
        >
      </span>

    </div>

    <div class="check-c d-flex justify-content-center">
      <button
        @click="itemActiveUpdate(bannerContent.id, bannerContent.status, 'promotion')"
        class="btn"
      >
        <unicon
          name="bookmark"
          :fill="bannerContent.status? 'red': 'blue'"
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
        @click="callDeleteDialog({id: bannerContent.id, stateElement: 'allPromotions', stateAction: 'deletePromotion'})"
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
  methods: {
    deleteBanner (id) {
      this.$store.dispatch('deleteBanner', id);
    }
  }
}
</script>

<style scoped>
.banner-c {
  min-height: 100px;
  cursor: pointer;
}
.banner-c:hover {
  background: rgb(204, 204, 204);
}
.banner_preview {
  height: 30px;
  width: 30px;
  margin: 2px;
}
.bg-gradient {
  background: rgb(108, 108, 108);
  background: linear-gradient(
    166deg,
    rgba(108, 108, 108, 1) 34%,
    rgba(59, 132, 150, 1) 67%,
    rgba(59, 132, 150, 1) 100%
  );
}
</style>