<template>
  <v-app>
    <v-app-bar app light flat hide-on-scroll color="white">
      <v-toolbar-title>
        <Logo />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          class="text-none"
          v-for="{ name, path } in routes"
          :key="name"
          :to="path"
        >
          {{ name }}
        </v-btn>
        <v-btn text class="text-none">
          EN
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefautLayout",
  data: () => ({
    routes: [
      {
        name: "Architecture",
        path: "/"
      },
      {
        name: "Editorial",
        path: "/"
      },
      {
        name: "Product",
        path: "/"
      }
    ]
  })
};
</script>

