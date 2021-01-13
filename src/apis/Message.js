import Api from './Api';

export default {
    getAllMessages() {
        return Api().get('/get/message')
    }
}