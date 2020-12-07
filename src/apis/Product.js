import Api from "./Api";

export default {
    getAllProducts() {
        return Api().get("/get/product");
    },
    uploadProduct(data) {
        return Api().post('/create/product', data)
    },
    deleteProduct(id) {
        return Api().post(`/delete/product/${id}`);
    },
    updateProduct(id, data) {
        return Api().post(`/update/product/${id}`, data)
    },
    updateSale(payload) {
        return Api().post(`/update/sale/${payload.id}`, payload)
    },
    updatePopular(payload) {
        return Api().post(`/update/isPopular/${payload.id}`, payload)
    },
    updateNewReleased(payload) {
        return Api().post(`/update/isNewRelease/${payload.id}`, payload)
    },
}