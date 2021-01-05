<template>
  <div class="wrapper">
    <nav class="navbar">
      <logo />
      <div>
        <nuxt-link
          v-for="{ name, path } in routes"
          :key="name"
          tag="a"
          :to="path"
        >
          {{ name }}
        </nuxt-link>
        <a class="uppercase cursor-pointer w-10" @click="switchLang">
          {{ $i18n.locale }}
        </a>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>
<script>
export default {
  name: "DefaultLayout",
  data: () => ({
    routes: [
      { name: "Architecture", path: "/architecture" },
      { name: "Editorial", path: "/editorial" },
      { name: "Product", path: "/product" },
      { name: "About Me", path: "/aboutme" }
    ]
  }),
  computed: {
    scrollTop() {
      return document?.documentElement.scrollTop;
    }
  },
  methods: {
    switchLang() {
      const locale = this.$i18n.locale;
      this.$i18n.locale = locale === "es" ? "en" : "es";
    }
  }
};
</script>

<style lang="sass">
html, *
  margin:0
  padding: 0
  font-family:"Inter",sans-serif

.wrapper
  @apply p-0 m-0 transition dark:bg-black dark:text-white
  .navbar
    @apply py-5 fixed w-full lg:px-12 flex transition bg-white dark:bg-black z-50
    div
      @apply hidden sm:block
      a
        @apply px-2.5
        &:last-child
          @apply pr-0

.page-wrapper
  @apply lg:px-12 pt-20
</style>
