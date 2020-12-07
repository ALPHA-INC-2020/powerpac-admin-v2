<template>
  <div class="card mb-3 widget-content bg-arielle-smile">
    <div class="widget-content-wrapper text-white">
      <div class="widget-content-left">
        <div class="widget-heading">Orders</div>
      </div>
      <div class="widget-content-right">
        <div class="widget-numbers text-white"><span>{{ orderLength }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderLength: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
</style>