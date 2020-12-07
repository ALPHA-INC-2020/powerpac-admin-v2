import Vue from "vue";
import Vuex from "vuex";
// import {
//     productModule
// } from "./product";
// import {
//     orderModule
// } from "./order"
// import { promotionModule } from "./promotion"
// import { cloudinaryModule } from './cloudinary'

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    // modules: {
    //     productModule: productModule,
    //     orderModule: orderModule,
    //     promotionModule: promotionModule,
    //     cloudinaryModule: cloudinaryModule
    // },
    state: {
        auth: {
            login: false,
            user: [],
        },
    },

    getters: {
        isLoggedIn(state) {
            return state.auth.login;
        },
    },

    mutations: {
        LOGIN(state, status) {
            state.auth.login = status;
            state.auth.user = [];
        },

        AUTH_USER(state, user) {
            state.auth.user = user;
        },
    },

    actions: {},
});