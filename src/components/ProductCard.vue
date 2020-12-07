<template>
  <div
    class="alert alert-info mb-2"
    role="alert"
  >
    <div class="row">
      <div class="col-sm-2 text-center">
        <img
          :src="ordered_product.product.imageURLs[0]"
          alt=""
          class="w-50 h-75"
        >
        <p
          :class="order_color(ordered_product.order_status)"
          class="text-white text-center p-1 rounded-sm mt-1 w-50 mx-auto"
        >{{ordered_product.order_status}}</p>
      </div>
      <div class="col-sm">
        <div class="p-2">
          <p class="d-flex justify-content-between">
            <span>Ordered At</span>
            <span>{{formatDateInTime(ordered_product.created_at)}}</span>
          </p>
          <p class="d-flex justify-content-between">
            <span>Customer Name</span>
            <span>{{ordered_product.customer_name}}</span>
          </p>
          <p class="d-flex justify-content-between">
            <span>Customer Address</span>
            <span>{{ordered_product.customer_address}}</span>
          </p>
          <p class="d-flex justify-content-between">
            <span>Phone No</span>
            <span>{{ordered_product.phone_no}}</span>
          </p>
          <p class="d-flex justify-content-between">
            <span>Email</span>
            <span>{{ordered_product.email}}</span>
          </p>
        </div>
      </div>
      <div class="col-sm">
        <div class="p-2">
          <p class="d-flex justify-content-between">
            <span>Product Name</span>
            <span>{{ordered_product.product.productName}}</span>
          </p>
          <p class="d-flex justify-content-between">
            <span>Product ID</span>
            <span>{{ordered_product.product.id}}</span>
          </p>
          <p class="d-flex justify-content-between">
            <span>Product Sale</span>
            <span>{{ordered_product.product.sale}}</span>
          </p>
          <p class="d-flex justify-content-between">
            <span>Product Price</span>
            <span>{{ordered_product.product.promoPrice}}</span>
          </p>
          <p class="d-flex justify-content-between">
            <span>Total Price</span>
            <span>{{ordered_product.product.promoPrice}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ordered_product: {
      type: Object,
      required: true
    }
  },
  methods: {
    order_color (status) {
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
    },
    formatDateInTime (date) {
      return new Date(date).toLocaleString()
    }
  }

}
</script>
