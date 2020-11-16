<template>
  <v-card
    class="galleries-deck"
    :to="'galleries/' + gallery.slug"
    tile
    :elevation="hover ? 3 : 0"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <v-img
      height="500px"
      :lazy-src="baseUrl + gallery.photos[0].formats.thumbnail.url"
      :src="baseUrl + gallery.photos[0].url"
    ></v-img>
    <v-card-title>
      {{ gallery.title_en }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "GalleryPreviewCard",
  props: {
    gallery: Object
  },
  data() {
    return {
      hover: false
    };
  },
   computed: {
    baseUrl() {
      return process.env.BASE_URL || "http://localhost:1337";
    }
  }
};
</script>

<style>
.galleries-deck {
  transition-duration: 0.5s;
}
</style>
