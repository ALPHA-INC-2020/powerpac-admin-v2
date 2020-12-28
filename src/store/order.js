import Order from '@/apis/Order'

export const orderModule = {
    state: {
        allOrders: [],
        todayOrderCount: '',
        totalSaleAmount: '',
        recentOrders:'',
        orderChart: '',
        saleChart: ''
    },
    mutations: {
        SET_ORDERS(state, payload) {
            state.allOrders = payload;
        },
        SET_TOTAL_SALE(state, payload) {
            state.totalSaleAmount = payload
        },
        SET_ORDER_CHART(state, payload) {
            state.orderChart = payload
        },
        SET_SALE_CHART(state, payload) {
            state.saleChart = payload
        },
        DELETE_ONE_ORDER(state, payload) {
            state.allOrders.splice(payload, 1);
        },
        UPDATE_STATUS(state, payload){
            var index = state.allOrders.findIndex(obj=> obj.id === payload.id);
            state.allOrders[index].order_status = payload.status
        },
        SET_TODAY_COUNT(state, payload) {
            state.todayOrderCount = payload
        }
    },
    actions: {
        loadOrders({ commit }) {
            return Order.getAllOrders().then(res => {
                if (res.status === 200) {
                    commit('SET_ORDERS', res.data)
                }
            }).then(() => {
                Order.getOrderChartData().then(res => {
                commit('SET_ORDER_CHART', res.data);
                })
            }).then(() => {
                Order.getSale().then(res => {
                    commit('SET_TOTAL_SALE', res.data);
                })
            }).then(() => {
                Order.getSaleChart().then(res => {
                    commit('SET_SALE_CHART', res.data)
                })
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
        loadTodayOrderCount({commit}) {
            return Order.getToday().then(res => {
                if(res.status === 200) {
                    console.log(res)
                    commit('SET_TODAY_COUNT', res.data);
                }
            });
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
        },
        loadTodayOrderCount(state) {
            return state.todayOrderCount;
        },
        getOrderChartData(state) {
            return state.orderChart
        },
        getTotalSale(state) {
            return state.totalSaleAmount
        },
        getSaleChartData(state) {
            return state.saleChart
        }
    }
}