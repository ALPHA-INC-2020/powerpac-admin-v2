<template>
  <div class="app-page-title">
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon">
          <i
            class="icon-gradient bg-mean-fruit"
            :class="titleIcon"
          >
          </i>
        </div>
        <div>
          {{ title }}
        </div>
      </div>
      <div
        class="page-title-actions"
        v-show="buttonEnabled"
      >
        <router-link :to="{ name: buttonRoute}">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded="false"
            class="btn-shadow btn btn-info"
          >
            <span class="btn-icon-wrapper pr-2 opacity-7">
              <i class="fas fa-plus fa-w-20"></i>
            </span>
            {{ buttonText }}
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttonEnabled: Boolean,
    buttonText: String,
    buttonRoute: String,
    buttonIcon: String,
    titleIcon: String,
    title: String,
  }
}
</script>

<style>
</style>