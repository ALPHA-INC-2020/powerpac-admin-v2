<template>
  <CModal
    title="Confirmation!"
    color="warning"
    :show.sync="isVisible"
  >
    Are you sure to {{status? 'remove from' : 'add to'}} {{type}}
    <template #footer>
      <CButton
        @click="isVisible = false"
        color="danger"
      >Discard</CButton>
      <CButton
        @click="updateAdditionalStatus()"
        color="success"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Save</span>
        <CSpinner
          v-else
          color="light"
          size="sm"
        />
      </CButton>
    </template>
  </CModal>
</template>

<script>
import { EventBus } from '../../main'

export default {
  created () {
    EventBus.$on('callAdditionalConfirmBox', (id, status, type) => {
      this.productId = id;
      this.status = status;
      this.type = type
      this.isVisible = true;
    });
  },
  data () {
    return {
      type: '',
      status: '',
      isLoading: false,
      isVisible: false,
      errorText: "Error on changing popularproduct",
      successText: "Successfully updated!",
      productId: ''
    }
  },
  methods: {
    updateAdditionalStatus () {
      var payload = {
        id: this.productId,
        status: this.status,
        type: this.type
      }
      this.isLoading = true;

      this.$store.dispatch('updateAdditionalStatus', payload).then((res) => {
        if (res === 200) {
          this.isLoading = false;
          EventBus.$emit('success', this.successText)

          this.isVisible = false
        } else {
          this.isLoading = false;
          this.isVisible = false
          EventBus.$emit('error_occur', this.errorText)
        }

      })
    },
  }

}
</script>

<style scoped>
.confirmation_dialog {
  position: fixed;
  top: 0;
  left: 100px;
  background: #534e4e28;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.delete_icon {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 1001;
  cursor: pointer;
}
.delete_icon:hover .fa-times {
  color: red;
  transition: 0.3s ease-in-out;
}
@media screen and (max-width: 991px) {
  .confirmation_dialog {
    left: 0;
  }
  .confirm_child_box {
    width: 60%;
  }
}
.confirm_child_box {
  width: 40%;
  height: 200px;
  transition: 0.5s ease-in-out;
  background: white;
  border-radius: 5px;
  position: relative;
}
.confirm_heading_text {
  width: 100%;
  height: 70%;
  padding: 50px;
}
.action_buttons {
  height: 30%;
  width: auto;
  padding-right: 30px;
  float: right;
}
.cancel_btn {
  margin-right: 5px;
}
.fade-in {
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>