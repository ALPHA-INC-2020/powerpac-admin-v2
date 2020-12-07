<template>
  <div
    class="confirmation_dialog fade-in"
    :style="isVisible? 'display:flex': 'display:none'"
  >

    <div class="confirm_child_box">
      <span
        class="delete_icon"
        @click="isVisible = false; isNew = ''"
      >
        <i class="fas fa-times"></i>
      </span>
      <div class="confirm_heading_text">
        <p v-if="isNew">Are you sure to <span class="text-danger">remove</span> from <b>New Released Product</b>. id - {{productId}}</p>
        <p v-else>Are you sure to <span class="text-success">add</span> to <b>New Released Product</b>. id - {{productId}}</p>
      </div>
      <div class="action_buttons">
        <div
          class="btn btn-success cancel_btn"
          @click="isVisible = false; isNew = ''"
        >Cancel <i class="fas fa-undo-alt"></i></div>
        <button
          class="btn btn-primary"
          type="button"
          @click="updateNewReleased()"
          :disabled=isLoading
        >{{ isLoading? 'Updating' : 'Change' }}<i
            class="fas fa-wrench"
            v-show="!isLoading"
          ></i> <span
            v-show="isLoading"
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span></button>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../main'

export default {
  created () {
    EventBus.$on('callNewReleasedConfirmBox', (id, isNewRelease) => {
      this.productId = id;
      this.isNew = isNewRelease;
      this.isVisible = true;
    });
  },
  data () {
    return {
      isNew: '',
      isLoading: false,
      isVisible: false,
      errorText: "Error on changing new released product",
      successText: "Successfully updated!",
      productId: ''
    }
  },
  methods: {
    updateNewReleased () {
      console.log("here")
      var payload = {
        id: this.productId,
        isNewRelease: this.isNew
      }
      this.isLoading = true;

      this.$store.dispatch('updateNewReleased', payload).then((res) => {
        if (res.status === 200) {
          this.isLoading = false;
          EventBus.$emit('success', this.successText)
          var index = this.$store.state.productModule.allProducts.findIndex(obj => obj.id == payload.id)
          this.$parent.allProducts[index].isNewRelease = !payload.isNewRelease
          this.isVisible = false
        } else {
          this.isLoading = false;
          this.isVisible = false
          EventBus.$emit('error_occur', this.errorText)
        }

      })
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