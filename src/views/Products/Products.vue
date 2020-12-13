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
          :updateAction="{action: 'updateSale'}"
          :deleteAction="{action: 'deleteProduct', apiObj: Product}"
          deleteExist
          statusUpdate
          :titleButton="{exist: true, link: 'newProduct', buttonText: 'Create New Product'}"
          :edit="{exist: true, route: 'updateProduct'}"
          newRelease
          popular
          caption="Products"
          :statusOptions="options"
          :fields=" ['id', 'model', 'productName', 'realPrice', 'brand', 'sale','additional','imageURLs','type', 'actions']"
          :additional="true"
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
      Product,
      options: [
        { value: 'onsale', text: 'On Sale', color: 'success' },
        { value: 'preorder', text: 'Pre Order', color: 'primary' },
        { value: 'outstock', text: 'Out of Stock', color: 'danger' },
      ]
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
