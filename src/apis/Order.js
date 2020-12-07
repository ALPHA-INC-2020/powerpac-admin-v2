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
    }
}