<template>
  <div
    class="confirmation_dialog fade-in"
    :style="isVisible? 'display:flex': 'display:none'"
  >

    <div class="confirm_child_box">
      <span
        class="delete_icon"
        @click="isVisible = false"
      >
        <i class="fas fa-times"></i>
      </span>
      <div class="confirm_heading_text">
        <p>Are you sure to change this {{type}}?</p>
      </div>
      <div class="action_buttons">
        <div
          class="btn btn-danger cancel_btn"
          @click="isVisible = false"
        >Cancel <i class="fas fa-undo-alt"></i></div>
        <div
          class="btn btn-info"
          @click="updateActiveProduct()"
        > <span
            v-if="buttonLoading"
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>Change<i class="fas fa-wrench"></i> </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../main'
import Promotion from '@/apis/Promotion'


export default {
  data () {
    return {
      isVisible: false,
      payload: null,
      buttonLoading: false,
      type: ''
    }
  },
  created () {
    EventBus.$on('callUpdateConfirm', (payload, type) => {
      this.type = type
      this.payload = payload
      this.isVisible = true;
    });
  },

  methods: {
    updateActiveProduct () {
      this.buttonLoading = true;

      if (this.type === 'banner') {
        Promotion.setActiveBanner(this.payload).then(res => {

          if (res.status === 200) {
            this.$store.dispatch('updateActiveBanner', res.data);
            this.buttonLoading = false;
            this.isVisible = false;
          }
        })
      }

      if (this.type === 'promotion') {
        Promotion.setActivePromotion(this.payload).then(res => {
          if (res.status === 200) {
            this.$store.dispatch('updateActivePromotion', res.data);
            this.buttonLoading = false;
            this.isVisible = false;
          }
        })
      }
    }

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