<template>
  <div class="card mb-3 widget-content bg-midnight-bloom">
    <div class="widget-content-wrapper text-white">
      <div class="widget-content-left">
        <div class="widget-heading">Total Products</div>
        <!-- <div class="widget-subheading">Last year expenses</div> -->
      </div>
      <div class="widget-content-right">
        <div class="widget-numbers text-white"><span>{{ productLength }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productLength: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
</style>