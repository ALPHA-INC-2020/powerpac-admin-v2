<template>
  <div>
    <app-page-title
      buttonText="New Promotion"
      buttonRoute="NewPromotion"
      :buttonEnabled="true"
      title="Promotions"
      titleIcon="pe-7s-pen"
    />
    <router-link :to="{name: 'NewBanner'}">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded="false"
        class="btn-shadow btn btn-success"
      >
        <span class="btn-icon-wrapper pr-2 opacity-7">
          <i class="fas fa-plus fa-w-20"></i>
        </span>
        New Banner
      </button>
    </router-link>

    <SuccessAlert />
    <ErrorAlert />
    <div
      v-if="!allBanners.length && loading"
      class="d-flex justify-content-center mt-5"
    >
      <div
        class="spinner-grow text-info"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      class="row mt-5"
      v-if="!loading && allBanners.length"
    >
      <div class="col-md-6 col-sm-12">
        <h2 class="mb-4">Banners</h2>
        <div
          class="my-2"
          v-for="(item, index) in allBanners"
          :key="index"
        >
          <PromotionBannerCard :bannerContent="item" />
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <h2 class="mb-4">Promotions</h2>
        <div
          class="my-2"
          v-for="(item, index) in allPromotions"
          :key="index"
        >
          <PromotionContentCard :bannerContent="item" />
        </div>
      </div>
    </div>

    <div
      v-if="!loading && !allBanners.length"
      class="d-flex flex-column mx-auto mt-5 w-25"
    >
      <img
        :src="nodataImg"
        alt=""
        class="no-data-image mx-auto"
      >
      <small class="text-muted mt-3 mx-auto">NO PROMOTIONS YET</small>
    </div>

    <DeleteDialog :type="Promotion" />
    <UpdateConfirm />
  </div>
</template>

<script>
import Promotion from '@/apis/Promotion'
import AppPageTitle from '@/components/AppPageTitle'
import { mapGetters } from 'vuex';
import PromotionBannerCard from '@/components/cards/PromotionBannerCard'
import PromotionContentCard from '@/components/cards/PromotionContentCard'
import DeleteDialog from '@/components/dialogs/DeleteDialog'
import UpdateConfirm from '@/components/dialogs/UpdateConfirm'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'
export default {
  data () {
    return {
      Promotion,
      loading: false,
      nodataImg: require('../../assets/images/nodata.svg'),
    }
  },
  components: {
    AppPageTitle,
    PromotionBannerCard,
    PromotionContentCard,
    DeleteDialog,
    SuccessAlert,
    ErrorAlert,
    UpdateConfirm
  },
  created () {
    this.loading = true

    if (this.$store.state['promotionModule'].allPromotions.length == 0) {
      this.$store.dispatch('loadPromotions').then(() => {
        this.loading = false
      })
    } else {
      this.loading = false
    }

    if (this.$store.state['promotionModule'].allBanners.length == 0) {
      this.$store.dispatch('loadBanners').then(() => {
        this.loading = false
      })
    } else {
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters({ allBanners: 'loadAllBanners', allPromotions: 'loadAllPromotions' })
  }

} 
</script>

<style scoped>
.no-data-image {
  height: 100px;
  width: 100px;
}
</style>