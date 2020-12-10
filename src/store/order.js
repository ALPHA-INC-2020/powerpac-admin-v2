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
        UPDATE_STATUS(state, payload){
            var index = state.allOrders.findIndex(obj=> obj.id === payload.id);
            state.allOrders[index].order_status = payload.status
        }
    },
    actions: {
        loadOrders({ commit }) {
            return Order.getAllOrders().then(res => {
                if (res.status === 200) {
                    commit('SET_ORDERS', res.data)
                }
            })
        },
        updateStatus({commit}, payload) {
            return new Promise((resolve, reject) => {
                Order.updateStatus(payload).then(res => {
                    if(res.status === 200) resolve(res.status)
                }).then(() => {
                    commit('UPDATE_STATUS', payload)
                }).catch(err => reject(err));
            })
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