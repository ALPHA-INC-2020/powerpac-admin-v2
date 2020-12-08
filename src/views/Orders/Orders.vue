<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CTableWrapper
          :items="allOrders"
          hover
          striped
          bordered
          small
          fixed
          :deleteAction="{action: 'deleteOrder', apiObj: Order}"
          caption="Orders"
          deleteExist
          statusUpdate
          :titleButton="{exist: false}"
          edit
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


export default {
  data () {
    return {
      Order
    }
  },
  components: { CTableWrapper },
  computed: {
    ...mapGetters({ allOrders: 'loadAllOrders' })
  },
  mounted () {
    if (this.allOrders.length == 0) this.$store.dispatch('loadOrders');
  },


}
</script>
