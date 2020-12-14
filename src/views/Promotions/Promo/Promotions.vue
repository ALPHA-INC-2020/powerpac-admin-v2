<template>
  <div>
    <SuccessAlert />
    <ErrorAlert />
    <CRow>

      <CCol
        sm="12"
        md="6"
      >

        <h1>Promotions</h1>
        <div v-if="loadingPromotion">loading ...</div>
        <div v-else>
          <accordion
            v-for="(promotion,index) in allPromotions"
            :key="index"
            :active="promotion.status"
          >
            <div slot="header">{{promotion.title}}</div>
            <div class="d-flex justify-content-between">
              <div class="d-flex">
                <div
                  v-for="(img, index) in promotion.imageURLs"
                  :key="index"
                  class="image-container"
                >
                  <img
                    :src="img"
                    :alt="promotion.title"
                    class="promo-image"
                  >
                </div>
              </div>
              <div class="d-flex align-items-center">
                <CButton @click="itemActiveUpdate(promotion.id, promotion.status, 'promotion')">
                  <CIcon
                    class="action-icons"
                    color="success"
                    :class="promotion.status? 'red': 'green'"
                    name="cil-bookmark"
                    v-c-tooltip.hover.click="promotion.status? 'deactivate' : 'active'"
                  ></CIcon>
                </CButton>
                <CButton @click="callDeleteDialog(promotion.id, 'allPromotions', 'deletePromotion')">
                  <CIcon
                    class="action-icons"
                    name="cil-trash"
                    v-c-tooltip.hover.click="'delete'"
                  ></CIcon>
                </CButton>
              </div>
            </div>
            <div class="p-2 mt-3">
              <p
                class="promo-content"
                v-html="promotion.content"
              ></p>
            </div>
          </accordion>

        </div>
      </CCol>
      <CCol
        sm="12"
        md="6"
      >
        <h1>Banners</h1>
        <div v-if="loadingBanners">loading ...</div>
        <div v-else>
          <accordion
            v-for="(banner,index) in allBanners"
            :key="index"
            :active="banner.status"
          >
            <div slot="header">{{banner.banner_title}}</div>
            <div class="d-flex justify-content-between">
              <img
                :src="banner.image"
                :alt="banner.banner_title"
                class="banner-image"
              >
              <div
                class="d-flex flex-column justify-content-center"
                v-if="!banner.status"
              >
                <CButton @click="itemActiveUpdate(banner.id, banner.status, 'banner')">
                  <CIcon
                    class="mb-2 pointer"
                    :class="banner.status? 'red' : 'green'"
                    name="cil-bookmark"
                    v-c-tooltip.hover.click="banner.status? 'deactivate' : 'active'"
                  ></CIcon>
                </CButton>
                <CButton>
                  <CIcon
                    class="pointer"
                    name="cil-trash"
                    v-c-tooltip.hover.click="'delete'"
                  ></CIcon>
                </CButton>
              </div>
            </div>
          </accordion>
        </div>
      </CCol>
      <updateConfirm />
    </CRow>
  </div>

</template>

<script>
import Accordion from '@/components/Accordion.vue'
import { mapGetters } from 'vuex';
import actionMixin from '@/mixins/actionMixin'
import updateConfirm from '@/components/dialogs/UpdateConfirm.vue'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'
import DeleteDialog from '@/components/dialogs/DeleteDialog'


export default {
  mixins: [actionMixin],
  data () {
    return {
      loadingPromotion: false,
      loadingBanners: false
    }
  },
  components: {
    Accordion,
    updateConfirm,
    SuccessAlert,
    ErrorAlert
  },
  computed: {
    ...mapGetters({ allBanners: 'loadAllBanners', allPromotions: 'loadAllPromotions' })
  },
  created () {
    this.loadingPromotion = true
    this.loadingBanners = true

    if (this.$store.state['promotionModule'].allPromotions.length == 0) {
      this.$store.dispatch('loadPromotions').then(() => {
        this.loadingPromotion = false;
      })
    } else {
      this.loadingPromotion = false;
    }

    if (this.$store.state['promotionModule'].allBanners.length == 0) {
      this.$store.dispatch('loadBanners').then(() => {
        this.loadingBanners = false
      })
    } else {
      this.loadingBanners = false;
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.image-container {
  height: 40px;
  width: 40px;
  margin-right: 10px;
}
.promo-image {
  height: 100%;
  width: 100%;
}
.banner-image {
  width: 100%;
  padding: 10px;
  height: 180px;
}
.action-icons {
  cursor: pointer;
  margin-right: 10px;
}
.green {
  color: green;
}
.red {
  color: red;
}
.promo-content {
  font-size: 12px;
  color: grey;
}
</style>