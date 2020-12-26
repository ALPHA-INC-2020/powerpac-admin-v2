<template>
  <div class="container-fluid">
    <div
      class="card"
      v-if="order"
    >
      <div class="card-header">
        Order Detail
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-2">
            <img
              :src="order.product.imageURLs[0]"
              alt=""
              class="order_detail_img"
            >
            <div class="btn btn-primary btn-block mt-1">
              {{order.order_status}}
            </div>
          </div>
          <div class="col-12 col-md-5">
            <div class="p-2">
              <p class="d-flex justify-content-between">
                <span>Ordered Time</span>
                <span>{{formatDateInTime}}</span>
              </p>
              <p class="d-flex justify-content-between">
                <span>Customer Name</span>
                <span>{{order.customer_name}}</span>
              </p>
              <p class="d-flex justify-content-between">
                <span>Customer Address</span>
                <span>{{order.customer_address}}</span>
              </p>
              <p class="d-flex justify-content-between">
                <span>Phone No</span>
                <span>{{order.phone_no}}</span>
              </p>
              <p class="d-flex justify-content-between">
                <span>Email</span>
                <span>{{order.email}}</span>
              </p>
            </div>
          </div>
          <div class="col-12 col-md-5">
            <div class="p-2">
              <p class="d-flex justify-content-between">
                <span>Product Name</span>
                <span>{{order.product.productName}}</span>
              </p>
              <p class="d-flex justify-content-between">
                <span>Product ID</span>
                <span>{{order.product.id}}</span>
              </p>
              <p class="d-flex justify-content-between">
                <span>Product Sale</span>
                <span>{{order.product.sale}}</span>
              </p>
              <p class="d-flex justify-content-between">
                <span>Product Price</span>
                <span>{{order.product.promoPrice}}</span>
              </p>
              <p class="d-flex justify-content-between">
                <span>Total Price</span>
                <span>{{order.product.promoPrice}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../main'
export default {
  data () {
    return {
      order: ''
    }
  },
  computed: {
    formatDateInTime () {
      return new Date(this.order.created_at).toLocaleString()
    }
  },
  created () {
    EventBus.$on('onRowClick', (payload) => {
      this.order = payload;
    })
  }
}
</script>

<style scoped>
.order_detail_img {
  height: 200px;
  width: 100%;
  border-radius: 4px;
}
</style>