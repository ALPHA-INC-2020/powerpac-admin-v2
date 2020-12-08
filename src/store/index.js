import Vue from 'vue'
import Vuex from 'vuex'
import {
  productModule
} from './product';
import {
  promotionModule
} from './promotion';
import {
  cloudinaryModule
} from './cloudinary';
import {
  orderModule
} from './order'


Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  auth: {
    login: false,
    user: [],
  },
}

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  },
  LOGIN(state, status) {
    state.auth.login = status;
    state.auth.user = [];
  },

  AUTH_USER(state, user) {
    state.auth.user = user;
  },
}

const getters = {
  isLoggedIn(state) {
    return state.auth.login
  }
}

const modules = {
  productModule: productModule,
  orderModule: orderModule,
  promotionModule: promotionModule,
  cloudinaryModule: cloudinaryModule
}

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  getters,
  modules
})