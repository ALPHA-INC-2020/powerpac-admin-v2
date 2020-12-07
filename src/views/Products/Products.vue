<template>
  <div>
    <app-page-title
      buttonText="New Product"
      buttonRoute="NewProduct"
      :buttonEnabled="true"
      title="Products"
      titleIcon="pe-7s-server"
    />
    <ErrorAlert />
    <SuccessAlert />
    <DxDataGrid
      id="gridContainer"
      :data-source="allProducts"
      :hover-state-enabled="true"
      @exporting="onExporting"
    >
      <DxPaging :page-size=20 />
      <DxPager
        :show-page-size-selector="true"
        :show-info="true"
      />
      <DxExport :enabled="true" />
      <DxSearchPanel :visible="true" />
      <DxColumn
        data-field="id"
        :width="60"
      />
      <DxColumn
        data-field="model"
        :width="100"
      />
      <DxColumn
        data-field="productName"
        :min-width="150"
      />
      <DxColumn
        data-field="realPrice"
        :width="70"
      />
      <DxColumn
        data-field="brand"
        :width="90"
      />
      <DxColumn
        :allow-sorting="false"
        data-field="sale"
        cell-template="stock"
        :width="70"
      />
      <DxColumn
        :allow-sorting="false"
        data-field="imageURLs"
        cell-template="photo"
        caption="Photo"
        :width="50"
      />
      <DxColumn
        :allow-sorting="false"
        data-field="type"
        :width="70"
      />
      <DxColumn
        caption="Actions"
        :allow-sorting="false"
        cell-template="actions"
        data-field="id"
        :width="250"
      />

      <template #stock="{ data }">
        <saleBadge :sale_text="data.value" />
      </template>

      <template #photo="{ data }">
        <img
          :src="data.value[0]"
          alt="product"
          class="product_image"
        >
      </template>

      <template #actions="{ data }">
        <div>
          <button
            class="btn btn-labeled btn-sm"
            @click="callNewReleasedConfirmBox(data.value, data.data.isNewRelease)"
          >
            <span class="btn-label">
              <unicon
                v-if="data.data.isNewRelease"
                name="file-plus"
                fill="blue"
              ></unicon>
              <unicon
                v-else
                name="file-plus"
                fill="grey"
              ></unicon>
            </span>
          </button>
          <button
            class="btn btn-labeled btn-sm"
            @click="callPopularConfirmBox(data.value, data.data.isPopular)"
          >
            <span class="btn-label">
              <unicon
                v-if="data.data.isPopular"
                name="star"
                fill="blue"
              ></unicon>
              <unicon
                v-else
                name="star"
                fill="grey"
              ></unicon>
            </span>
          </button>
          <router-link :to="{name: 'UpdateProduct', params: {id: data.value}}">
            <button class="btn">
              <span class="btn-label">
                <unicon
                  name="edit"
                  fill="grey"
                ></unicon>
              </span>
            </button>
          </router-link>
          <button
            class="btn btn-labeled btn-sm"
            @click="callDeleteDialog(data.value)"
          >
            <span class="btn-label">
              <unicon
                name="trash"
                fill="grey"
              ></unicon>
            </span>
          </button>
          <button
            class="btn btn-small"
            @click="changeStatusBox(data.value)"
          >
            <span class="btn-label">
              <unicon
                name="setting"
                fill="grey"
              ></unicon>
            </span>
          </button>
        </div>
      </template>

    </DxDataGrid>
    <StatusDialog
      :options="options"
      title="Sale"
      action="updateSale"
      value="sale"
      parentValue="allProducts"
      module="productModule"
    />
    <DeleteDialog
      :type="Product"
      action="deleteProduct"
    />
    <PopularDialog />
    <NewReleaseDialog />
  </div>
</template>

<script>
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxExport } from 'devextreme-vue/data-grid';
import { DxSearchPanel } from 'devextreme-vue/tree-list'
import saleBadge from "@/components/saleBadge.vue";
import AppPageTitle from "../../components/AppPageTitle.vue";
import { mapGetters } from 'vuex'
import ErrorAlert from '@/components/alerts/ErrorAlert'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import DeleteDialog from '@/components/dialogs/DeleteDialog'
import PopularDialog from '@/components/dialogs/PopularDialog'
import NewReleaseDialog from '@/components/dialogs/NewReleaseDialog'
import StatusDialog from '@/components/dialogs/StatusDialog'
import helper from '@/helpers/export'
import actionsMixin from '@/mixins/actionMixin'
import Product from '@/apis/Product'

export default {
  name: "BasicExample",
  mixins: [actionsMixin],
  components: {
    AppPageTitle,
    saleBadge,
    DeleteDialog,
    PopularDialog,
    NewReleaseDialog,
    StatusDialog,
    ErrorAlert,
    SuccessAlert,
    DxDataGrid,
    DxColumn,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxExport
  },
  data () {
    return {
      Product,
      filter: "",
      showColumnLines: false,
      showRowLines: true,
      showBorders: true,
      rowAlternationEnabled: true,
      options: [
        { value: 'onsale', text: 'On Sale', color: 'success' },
        { value: 'preorder', text: 'Pre Order', color: 'primary' },
        { value: 'outstock', text: 'Out of Stock', color: 'danger' },
      ]
    };
  },
  mounted () {
    if (this.allProducts.length == 0) this.$store.dispatch('loadProducts');
  },
  computed: {
    ...mapGetters({ allProducts: 'loadAllProducts' })
  },
  methods: {
    imageUrlAlt (event) {
      event.target.src =
        "https://mobuloustech.com/yodapi/public/img/imagenotfound.jpg";
    },
    onExporting (e) {
      helper.onExporting(e);
    }
  },
};
</script>

<style scoped>
.product_image {
  width: 30px;
  height: 30px;
}
</style>