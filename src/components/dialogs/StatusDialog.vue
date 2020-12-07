<template>
  <div
    class="confirmation_dialog fade-in"
    :style="isVisible? 'display: flex': 'display: none'"
  >
    <div class="confirm_child_box">
      <span
        class="delete_icon"
        @click="isVisible = false"
      >
        <i class="fas fa-times"></i>
      </span>
      <div class="confirm_heading_text">
        <div class="d-flex justify-content-between">
          <p> Update {{title}} <span v-show="status != ''">to {{status}} </span> </p>
          <p>Product Id - {{ productId }}</p>
        </div>
      </div>
      <div class="body_container">
        <div
          class="btn-group btn-group-toggle mx-1"
          data-toggle="buttons"
          v-for="(item,i) in options"
          :key="i"
        >

          <label
            class="btn btn-sm"
            :class="'btn-'+ item.color"
          >
            <input
              type="radio"
              name="options"
              :value="item.value"
              autocomplete="off"
              checked
              v-model="status"
            > {{item.text}}
          </label>
        </div>
      </div>
      <div class="action_buttons mt-3">
        <div
          class="btn btn-danger cancel_btn"
          @click="isVisible = false"
        >Cancel <i class="fas fa-undo-alt"></i></div>
        <div
          class="btn btn-success"
          @click="updateSale()"
        >Save <i class="fas fa-save"></i> </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../main'
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    parentValue: {
      type: String,
      required: true
    },
    module: {
      type: String,
      required: true
    }

  },
  data () {
    return {
      status: '',
      isVisible: false,
      productId: ''
    }
  },
  created () {
    EventBus.$on('changeStatusBox', (id) => {
      this.productId = id;
      this.isVisible = true;
    });
  },
  methods: {
    updateSale () {
      var payload = {
        id: this.productId,
        status: this.status
      }
      this.$store.dispatch(this.action, payload).then((res) => {
        console.log(this.$store.state.productModule)
        if (res.status === 200) {
          var index = this.$store.state[this.module][this.parentValue].findIndex(obj => obj.id == payload.id)
          console.log(index)
          this.$parent[this.parentValue][index][this.value] = payload.status
          this.isVisible = false
          EventBus.$emit('success', "Status Updated Successfully 🎉")
        } else {
          this.isVisible = false
          EventBus.$emit('error_occur', "Error on updating status!")

        }

      }).catch((err) => {
        this.isVisible = false
        EventBus.$emit('error_occur', `Error on updating status!${err}`)
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
    width: 80%;
  }
  .confirm_child_box {
    left: 10%;
  }
}
.confirm_child_box {
  width: 40%;
  height: 220px;
  transition: 0.5s ease-in-out;
  background: white;
  border-radius: 5px;
  position: absolute;
  top: 100px;
  left: 30%;
}
.confirm_heading_text {
  width: 100%;
  height: 10%;
  padding: 50px;
}
.body_container {
  width: 100%;
  padding: 0px 60px;
}
.action_buttons {
  height: 40%;
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