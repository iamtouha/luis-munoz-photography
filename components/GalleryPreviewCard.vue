<template>
  <v-card
    class="galleries-deck"
    :to="'galleries/' + gallery.slug"
    tile
    :elevation="hover ? 3 : 0"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <transition name="fade">
      <v-img
        height="500px"
        aspect-ratio="1"
        :lazy-src="baseUrl + gallery.photos[0].formats.thumbnail.url"
        :src="baseUrl + photoUrl"
      ></v-img>
    </transition>

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
      return process.env.BASE_URL;
    },
    photoUrl() {
      const mobile = this.$vuetify.breakpoint.smAndDown;
      if (mobile) return this.gallery.photos[0].formats.small.url;
      return this.gallery.photos[0].formats.medium.url;
    }
  }
};
</script>

<style lang="scss">
.galleries-deck {
  transition-duration: 0.5s;
}
</style>
