import Api from "./Api";

export default {
    getAllOrders() {
        return Api().get('get/order');
    },
    updateStatus(payload) {
        return Api().post(`/order/updateStatus/${payload.id}`, payload)
    },
    deleteOrder(id) {
        return Api().post(`/delete/order/${id}`)
    },
    getRecent() {
        return Api().get('/order/get/recent')
    },
    getSale() {
        return Api().get('/order/get/total_sale')
    },
    getToday() {
        return Api().get('/order/get/today');
    },

    getOrderChartData() {
        return Api().get('/get/order/date');
    },
    getSaleChart() {
        return Api().get('get/order/sale/chart');
    }
}