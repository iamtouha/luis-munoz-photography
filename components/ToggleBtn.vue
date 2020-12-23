<template>
  <label for="toogleA" class="flex items-center cursor-pointer">
    <!-- toggle -->
    <div class="relative">
      <!-- input -->
      <input id="toogleA" v-model="toggle" type="checkbox" class="hidden" />
      <!-- line -->
      <div
        :class="[toggle ? 'bg-gray-400' : 'bg-gray-200']"
        class="toggle__line w-9 h-5 bg-gray-200 rounded-full shadow-inner"
      ></div>
      <!-- dot -->
      <div
        class="toggle__dot absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
      ></div>
    </div>
  </label>
</template>

<script>
export default {
  name: "ToggleButton",
  props: {
    value: Boolean
  },
  data() {
    return {
      toggle: false
    };
  },
  watch: {
    toggle(val) {
      this.$emit("input", val);
    }
  },
  created() {
    this.toggle = this.value;
  }
};
</script>

<style scoped>
.toggle__line {
  transition: background 0.3s ease-in-out;
}
.toggle__dot {
  top: 0.2rem;
  left: 0.25rem;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
}
</style>
