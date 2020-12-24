import Promotion from '@/apis/Promotion'

export const promotionModule = {
    state: {
        allBanners: [],
        activeBanner: '',
        allPromotions: []
    },
    mutations: {
        SET_BANNERS(state, payload) {
            state.allBanners = payload;
        },
        SET_PROMOTION(state, payload) {
            state.allPromotions = payload
        },
        DELETE_ONE_RECORD(state, {id, stateElement}){
            state[stateElement].splice(id, 1);
        },
        ACTIVE_BANNER(state, payload) {
            state.allBanners = payload
        },
        ACTIVE_PROMOTION(state, payload){
            state.allPromotions = payload
        },
        ADD_ONE_BANNER(state,payload) {
            state.allBanners.push(payload);
        },
        ADD_ONE_PROMOTION(state,payload) {
            console.log(state.allPromotions)
            state.allPromotions.push(payload);
        }
    },
    actions: {
        loadBanners( {commit}) {
            return Promotion.getAllBanners().then(res => {
                console.log(res);
                commit('SET_BANNERS', res.data)
            })
        },
        deleteBanner({commit, state} , id) {
            var index = state.allBanners.findIndex(element => element.id == id);
            commit('DELETE_ONE_RECORD', {id : index, stateElement: 'allBanners'})
        },
        deletePromotion({commit, state}, id) {
            console.log("it works")
            var index = state.allPromotions.findIndex(element=> element.id == id);
            commit('DELETE_ONE_RECORD', {id: index, stateElement: 'allPromotions'});
        },
        updateActiveBanner({commit}, payload) {
            return commit('ACTIVE_BANNER', payload);
        },
        updateActivePromotion({commit}, payload) {
            return commit('ACTIVE_PROMOTION', payload)
        },
        loadPromotions({commit}) {
            return Promotion.getAllPromotions().then(res => {
            commit('SET_PROMOTION', res.data)
            })
        }
    },
    getters: {
        loadAllBanners(state) {
            return state.allBanners
        },
        loadAllPromotions(state) {
            return state.allPromotions
        }
    }
}