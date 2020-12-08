<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CTableWrapper
          :items="allProducts"
          hover
          striped
          bordered
          small
          fixed
          :deleteAction="{action: 'deleteProduct', apiObj: Product}"
          deleteExist
          statusUpdate
          :titleButton="{exist: true, link: 'newProduct', buttonText: 'Create New Product'}"
          edit
          newRelease
          popular
          caption="Products"
          :fields=" ['id', 'model', 'productName', 'realPrice', 'brand', 'sale','imageURLs','type', 'actions']"
        />

      </CCol>
    </CRow>

  </div>
</template>

<script>
import CTableWrapper from '../base/Table.vue'
import { mapGetters } from 'vuex';
import Product from '@/apis/Product.js'
export default {
  data () {
    return {
      Product
    }
  },
  components: { CTableWrapper },
  computed: {

    ...mapGetters({ allProducts: 'loadAllProducts' })
  },
  mounted () {
    if (this.allProducts.length == 0) this.$store.dispatch('loadProducts');
  },


}
</script>
