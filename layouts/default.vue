<template>
  <div class="wrapper">
    <nav class="navbar bg-white z-50">
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
        <a>EN</a>
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
  }
};
</script>

<style lang="sass">
html, *
  margin:0
  padding: 0
  font-family:"Inter",sans-serif

.wrapper
  @apply p-0 m-0
  .navbar
    @apply py-5 fixed w-full lg:px-12 flex
    div
      @apply hidden sm:block
      a
        @apply px-2.5
        &:last-child
          @apply pr-0

.page-wrapper
  @apply lg:px-12 pt-20
</style>
