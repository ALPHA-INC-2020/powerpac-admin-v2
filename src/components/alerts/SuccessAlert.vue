<template>
  <CAlert
    :show.sync="dismissCountDown"
    closeButton
    color="success"
    fade
    v-if="isVisible"
  >
    {{successText}}
  </CAlert>
</template>

<script>
import { EventBus } from '../../main'
export default {
  data () {
    return {
      isVisible: false,
      successText: '',
      linkText: '',
      link: '',
      dismissCountDown: 10
    }
  },
  created () {
    EventBus.$on('success', (successText, linkText = null, link = null) => {
      this.successText = successText;
      this.linkText = linkText;
      this.link = link;
      this.isVisible = true;
    })
  }
}
</script>

<style>
</style>