import Api from './Api';

export default {
    getAllFAQs() {
        return Api().get('/get/faqs')
    },
    deleteFAQ(id) {
        return Api().post(`/delete/faq/${id}`)
    },
    updateFAQ(payload) {
        return Api().post(`/update/faq/${payload.id}`, payload)
    },
    uploadFAQ(payload) {
        return Api().post('/create/faq', payload)
    }
}