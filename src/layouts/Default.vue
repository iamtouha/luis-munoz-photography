<template>
  <v-app>
    <v-app-bar app flat color="white">
      <v-toolbar-title>Luis Munoz Photography</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/" text exact class="transparent">Home</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<static-query>
query {
metadata{
    siteName
  }
}
</static-query>
