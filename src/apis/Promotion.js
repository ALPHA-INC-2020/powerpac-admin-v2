import Api from './Api';

export default {
    getAllBanners() {
        return Api().get('/get/banner');
    },
    deleteBanner(id) {
        return Api().post(`/delete/banner/${id}`)
    },
    setActiveBanner(payload) {
        return Api().post(`/set/banner/active/${payload.id}`, payload)
    },
    uploadBanner(payload) {
        return Api().post(`/create/banner` , payload)
    },
    getAllPromotions() {
        return Api().get('/get/promotion');
    },
    setActivePromotion(payload) {
        return Api().post(`/set/promotion/active/${payload.id}`, payload)
    },
    deletePromotion(id) {
        return Api().post(`/delete/promotion/${id}`);
    },
    createPromotion(payload) {
        return Api().post('/create/promotion/', payload)
    }

}

