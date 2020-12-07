<template>
  <div
    class="alert alert-danger"
    role="alert"
    :style="isVisible? 'display: block': 'display:none'"
  >
    {{ errorText}}
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import { EventBus } from '../../main'
export default {
  data () {
    return {
      isVisible: false,
      errorText: ''
    }
  },
  created () {
    EventBus.$on('error_occur', (errorText) => {
      this.errorText = errorText;
      this.isVisible = true;
    })
  }
}
</script>

<style>
</style>