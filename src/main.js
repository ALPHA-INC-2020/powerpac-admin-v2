import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import VueCollapse from 'vue-faq-accordion'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/index.js'

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(VueCollapse)
Vue.prototype.$log = console.log.bind(console)
export const EventBus = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
