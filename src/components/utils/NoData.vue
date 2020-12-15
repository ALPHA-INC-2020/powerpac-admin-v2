<template>
  <div class="d-flex flex-column justify-content-center">
    <img
      src="@/assets/icons/nodata.svg"
      alt=""
      class="svg mt-5"
    >
    <div class="text-muted text-center mt-5">
      {{content}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String
    }
  }
}
</script>

<style scoped>
.svg {
  height: 100px;
  width: 100px;
}
</style>