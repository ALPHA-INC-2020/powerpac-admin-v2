<template>
  <CAlert
    :show.sync="dismissCountDown"
    closeButton
    color="danger"
    fade
    v-if="isVisible"
  >
    {{errorText}}
  </CAlert>
</template>

<script>
import { EventBus } from '../../main'
export default {
  data () {
    return {
      isVisible: false,
      errorText: '',
      linkText: '',
      link: '',
      dismissCountDown: 10
    }
  },
  created () {
    EventBus.$on('error_occur', (errorText, linkText = null, link = null) => {
      this.errorText = errorText;
      this.linkText = linkText;
      this.link = link;
      this.isVisible = true;
    })
  }
}
</script>

<style>
</style>