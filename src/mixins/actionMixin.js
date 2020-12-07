import { EventBus } from '../main'

export default {
    methods: {
        callDeleteDialog({id, stateElement, stateAction}) {
            console.log(id);
            EventBus.$emit('callDeleteDialog', id, stateElement, stateAction);
        },
        callPopularConfirmBox(id, isPopular) {
            EventBus.$emit('callPopularConfirmBox', id, isPopular);
        },
        callNewReleasedConfirmBox(id, isNewRelease) {
            EventBus.$emit('callNewReleasedConfirmBox', id, isNewRelease)
        },
        changeStatusBox(id) {
            EventBus.$emit('changeStatusBox', id);
        },
        itemActiveUpdate(id, status, type) {
            EventBus.$emit('callUpdateConfirm', {id, status}, type);
        },
    }
}