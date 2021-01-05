<template>
  <label for="toogleA" class="flex items-center cursor-pointer">
    <!-- toggle -->
    <div class="relative">
      <!-- input -->
      <input id="toogleA" v-model="toggle" type="checkbox" class="hidden" />
      <!-- line -->
      <div
        class="transition toggle__line w-9 h-5 bg-gray-900 dark:bg-white rounded-full shadow-inner"
      ></div>
      <!-- dot -->
      <div
        class="transition toggle__dot absolute w-3.5 h-3.5 dark:bg-gray-900 bg-white transit rounded-full shadow inset-y-0 left-0"
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
      const el = document.getElementsByTagName("html");
      if (val) {
        el[0]?.classList.add("dark");
        this.$store.commit("DARK_MODE_TOGGLE");
      } else {
        el[0]?.classList.remove("dark");
        this.$store.commit("LIGHT_MODE_TOGGLE");
      }
    }
  }
};
</script>

<style scoped>
.toggle__dot {
  top: 0.2rem;
  left: 0.25rem;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
}
</style>
