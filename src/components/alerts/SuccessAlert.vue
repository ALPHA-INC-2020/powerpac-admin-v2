<template>
  <div
    class="alert alert-success mt-3"
    role="alert"
    :style="isVisible? 'display: block': 'display:none'"
  >
    {{ successText}} <router-link
      v-show="link != null"
      :to="{name: link}"
    ><small> {{ linkText }}</small></router-link>
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
      successText: '',
      linkText: '',
      link: ''
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