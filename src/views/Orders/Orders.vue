<template>
  <div>
    <app-page-title
      :buttonEnabled="false"
      title="Orders"
      titleIcon="pe-7s-portfolio"
    />

    <ProductCard
      :ordered_product="selectedRowNotes"
      v-if="showOrderInfo"
    />
    <SuccessAlert />
    <ErrorAlert />

    <DxDataGrid
      id="gridContainer"
      :data-source="allOrders"
      :hover-state-enabled="true"
      @exporting="onExporting"
      :selection="{ mode: 'single' }"
      :show-borders="true"
      @selection-changed="onSelectionChanged"
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
        data-field="customer_name"
        :width="200"
      />
      <DxColumn
        data-field="customer_address"
        :min-width="150"
      />
      <DxColumn
        data-field="phone_no"
        :width="170"
      />
      <DxColumn
        data-field="email"
        :width="220"
      />
      <DxColumn
        :allow-sorting="false"
        data-field="order_status"
        cell-template="order_status"
        :width="100"
      />
      <DxColumn
        caption="Actions"
        :allow-sorting="false"
        cell-template="actions"
        data-field="id"
        :width="100"
      />

      <template #order_status="{ data }">
        <saleBadge :sale_text="data.value" />
      </template>
      <template #actions="{ data }">
        <div>

          <button
            class="btn btn-labeled btn-sm"
            @click="callDeleteDialog({id: data.value, stateElement: 'allOrders', stateAction: 'deleteOrder'} )"
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
      title="Order Status"
      action="updateStatus"
      value="order_status"
      parentValue="allOrders"
      module="orderModule"
    />
    <DeleteDialog :type="Order" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppPageTitle from "../../components/AppPageTitle.vue";
import ErrorAlert from '@/components/alerts/ErrorAlert'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import DeleteDialog from '@/components/dialogs/DeleteDialog'
import ProductCard from '@/components/ProductCard'
import StatusDialog from '@/components/dialogs/StatusDialog'
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxExport } from 'devextreme-vue/data-grid';
import { DxSearchPanel } from 'devextreme-vue/tree-list'
import helper from '@/helpers/export'
import actionMixin from '@/mixins/actionMixin'
import saleBadge from '@/components/saleBadge'
import Order from '@/apis/Order'

export default {
  components: {
    AppPageTitle,
    ErrorAlert,
    SuccessAlert,
    StatusDialog,
    ProductCard,
    DeleteDialog,
    saleBadge,
    DxDataGrid,
    DxColumn,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxExport
  },
  computed: {
    ...mapGetters({ allOrders: 'loadAllOrders' })
  },
  mixins: [actionMixin],
  data () {
    return {
      Order,
      showOrderInfo: false,
      selectedRowNotes: '',
      selectedRowPicture: '',
      showColumnLines: false,
      showRowLines: true,
      showBorders: true,
      rowAlternationEnabled: true,
      options: [
        { value: 'complete', text: 'Completed', color: 'success' },
        { value: 'confirm', text: 'Confirmed', color: 'primary' },
        { value: 'inprogress', text: 'In Progress', color: 'info' },
        { value: 'pending', text: 'Pending', color: 'warning' },
        { value: 'cancel', text: 'Cancel', color: 'danger' }
      ]
    }
  },
  mounted () {
    if (this.allOrders.length == 0) this.$store.dispatch('loadOrders');
  },
  methods: {
    onSelectionChanged ({ selectedRowsData }) {
      const data = selectedRowsData[0];
      this.showOrderInfo = !!data;
      this.selectedRowNotes = data;
    },
    onExporting (e) {
      helper.onExporting(e);
    },
    getOrderStatus (status) {
      let color;
      switch (status) {
        case 'pending':
          color = 'bg-warning'
          break;
        case 'complete':
          color = 'bg-success'
          break;
        case 'cancel':
          color = 'bg-danger'
          break;
        case 'inprogress':
          color = 'bg-info'
          break;
        case 'confirm':
          color = 'bg-primary'
          break;
      }
      return color
    }
  }
}
</script>

<style>
#employee-info .employee-photo {
  height: 100px;
  float: left;
  padding: 20px;
}
#employee-info .employee-notes {
  padding-top: 20px;
  text-align: justify;
}
.dark #employee-info .employee-notes {
  color: rgb(181, 181, 181);
}
</style>