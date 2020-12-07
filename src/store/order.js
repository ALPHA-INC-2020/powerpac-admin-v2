import Order from '@/apis/Order'

export const orderModule = {
    state: {
        allOrders: []
    },
    mutations: {
        SET_ORDERS(state, payload) {
            state.allOrders = payload;
        },
        DELETE_ONE_ORDER(state, payload) {
            state.allOrders.splice(payload, 1);
        },

    },
    actions: {
        loadOrders({ commit }) {
            console.log("loading order");
            return Order.getAllOrders().then(res => {
                if (res.status === 200) {
                    commit('SET_ORDERS', res.data)
                }
            })
        },
        updateStatus({commit}, payload) {
            return Order.updateStatus(payload)
        },

        deleteOrder({

            commit,
            state
        }, id) {
            var index = state.allOrders.findIndex(element => element.id === id);
            commit('DELETE_ONE_ORDER', index)
        },
    },
    getters: {
        loadAllOrders(state) {
            return state.allOrders;
        }
    }
}