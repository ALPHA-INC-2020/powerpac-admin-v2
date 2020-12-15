<template>
  <div class="accordion">
    <div
      class="header"
      @click="toggle"
    >
      <slot name="header">HINT</slot>
      <CBadge
        @click="actionhappen()"
        color="success"
        class="badge"
        v-if="active"
      > active </CBadge>
      <CIcon
        name="cil-caret-bottom"
        class="header-icon"
        v-bind:class="{ rotate: show }"
      ></CIcon>
    </div>
    <transition
      name="accordion"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
    >
      <div
        class="body"
        v-show="show"
      >
        <div class="body-inner">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    actionhappen () {
      this.show = !this.show
    },

    toggle: function () {
      this.show = !this.show;
    },
    beforeEnter: function (el) {
      el.style.height = '0';
    },
    enter: function (el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave: function (el) {
      el.style.height = '0';
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato");

.accordion {
  width: 100%;
  height: auto;
  font-family: Lato;
  margin-bottom: 20px;
  border: 1px solid rgb(179, 177, 177);
  border-radius: 2px;
}

.accordion .header {
  min-height: 40px;
  line-height: 40px;
  padding: 0 40px 0 8px;
  position: relative;
  cursor: pointer;
}

.accordion .header-icon {
  position: absolute;
  top: 13px;
  right: 8px;
  transform: rotate(0deg);
  transition-duration: 0.3s;
}
.badge {
  position: absolute;
  right: 40px;
  top: 13px;
}

.accordion .body {
  /*   display: none; */
  overflow: hidden;
  background-color: #fff;
  border-top: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  transition: 150ms ease-out;
}

.accordion .body-inner {
  padding: 8px;
  overflow-wrap: break-word;
  /*   white-space: pre-wrap; */
}

.accordion .header-icon.rotate {
  transform: rotate(180deg);
  transition-duration: 0.3s;
}

.accordion.purple {
  background-color: #8c618d;
}

.accordion.purple .body {
  border-color: #8c618d;
}
</style>