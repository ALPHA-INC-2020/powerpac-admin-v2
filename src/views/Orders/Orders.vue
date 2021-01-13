<template>
  <div>
    <CRow>
      <OrderDetail />
      <CCol sm="12">
        <CTableWrapper
          statusAlter='status'
          :items="allOrders"
          hover
          striped
          bordered
          small
          fixed
          :updateAction="{action: 'updateStatus'}"
          :deleteAction="{action: 'deleteOrder', apiObj: Order}"
          caption="Orders"
          deleteExist
          view
          statusUpdate
          edit
          :statusOptions="options"
          :fields=" ['id', 'customer_name', 'customer_address', 'phone_no', 'email', 'status', 'actions']"
        />

      </CCol>
    </CRow>

  </div>
</template>

<script>
import CTableWrapper from '../base/Table.vue'
import { mapGetters } from 'vuex';
import Order from '@/apis/Order.js'
import OrderDetail from '@/components/OrderDetail'

export default {
  data () {
    return {
      Order,
      options: [
        { value: 'complete', text: 'Completed', color: 'success' },
        { value: 'confirm', text: 'Confirmed', color: 'primary' },
        { value: 'inprogress', text: 'In Progress', color: 'info' },
        { value: 'pending', text: 'Pending', color: 'warning' },
        { value: 'cancel', text: 'Cancel', color: 'danger' }
      ]
    }
  },
  components: { CTableWrapper, OrderDetail },
  computed: {
    ...mapGetters({ allOrders: 'loadAllOrders' })
  },
  mounted () {
    if (this.allOrders.length == 0) this.$store.dispatch('loadOrders');
  },



}
</script>
