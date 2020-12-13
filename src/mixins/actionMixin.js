import { EventBus } from '../main'

export default {
    methods: {
        callDeleteDialog({id, stateElement, stateAction}) {
            EventBus.$emit('callDeleteDialog', id, stateElement, stateAction);
        },
        callAdditionalConfirmBox(id, status, type) {
            EventBus.$emit('callAdditionalConfirmBox', id, status, type);
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