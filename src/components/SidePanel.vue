<template>
  <div class="app-sidebar sidebar-shadow">
    <div class="scrollbar-sidebar">
      <div class="app-sidebar__inner">
        <ul class="vertical-nav-menu">
          <li class="app-sidebar__heading">{{ user.name }} - {{ user.email}}</li>
          <li
            v-for="(navItem,index) in navItems"
            :key="index"
          >
            <router-link :to="{name: navItem.link}">
              <i
                class="metismenu-icon"
                :class="navItem.icon"
              ></i>
              {{ navItem.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {

      navItems: [
        {
          link: 'Dashboard',
          icon: 'pe-7s-rocket',
          title: 'Dashboard'
        },
        {
          link: 'Products',
          icon: 'pe-7s-shopbag',
          title: 'Products'
        },
        {
          link: 'Orders',
          icon: 'pe-7s-ticket',
          title: 'Orders'
        },
        {
          link: 'Promotions',
          icon: 'pe-7s-ticket',
          title: 'Promotions'
        }
      ]

    }
  }
}
</script>

<style scoped>
.app-sidebar__heading {
  font-size: 10px;
}
</style>