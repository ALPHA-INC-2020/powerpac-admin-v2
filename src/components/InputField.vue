<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <span
        class="input-group-text"
        id="basic-addon1"
      >

        <unicon
          :name="icon"
          fill="black"
        ></unicon>
      </span>
    </div>
    <input
      @input="onInputChange"
      v-model="inputValue"
      type="text"
      class="form-control"
      :placeholder="placeholdingtext"
    >
  </div>
</template>

<script>

export default {
  props: {
    placeholdingtext: String,
    icon: String,
    vModel: String
  },
  data () {
    return {
      inputValue: this.vModel
    }
  },
  methods: {
    onInputChange () {
      this.$emit('input', this.inputValue)
    },
    clearFields () {
      this.inputValue = ''

    }
  },
  created () {
    this.$parent.$on('clearfield', this.clearFields);
  }
}
</script>

<style>
</style>