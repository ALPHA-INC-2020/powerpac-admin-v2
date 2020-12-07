<template>
  <div class="card mb-3 widget-content bg-premium-dark">
    <div class="widget-content-wrapper text-white">
      <div class="widget-content-left">
        <div class="widget-heading">Total Sales</div>
      </div>
      <div class="widget-content-right">
        <div class="widget-numbers text-warning"><span>{{totalIncome}} mmk</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalIncome: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
</style>