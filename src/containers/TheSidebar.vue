<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand
      class="d-md-down-none"
      to="/"
    >
      <img
        src="@/assets/images/nav_brand.png"
        alt=""
        class="nav_brand_image"
      >

    </CSidebarBrand>

    <CRenderFunction
      flat
      :content-to-render="$options.nav"
    />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  }
}
</script>


<style scoped>
.nav_brand_image {
  width: 100%;
  height: 80px;
}
</style>