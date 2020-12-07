<template>
  <div
    class="sale_badge"
    :class="sale_text"
  >
    {{ sale_text }}
  </div>
</template>

<script>
export default {
  props: ['sale_text']
}
</script>

<style scoped>
.sale_badge {
  color: white;
  text-align: center;
  border-radius: 5px;
  height: 23px;
  justify-content: center;
  align-items: center;
  padding: 2px;
  font-size: 12px;
}
.onsale {
  background: #5bdb5b;
}
.outstock,
.cancel {
  background: #ff471a;
}
.preorder {
  background: #3377ff;
}
.confirm {
  background: blue;
}
.inprogress {
  background: #387d8e;
}
.pending {
  background: orange;
}
.complete {
  background: green;
}
</style>