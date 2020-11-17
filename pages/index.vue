<template>
  <v-container>
    <transition-group class="row" name="scroll-y-reverse-transition">
      <v-col
        v-show="loaded"
        v-for="gallery in galleries"
        :key="gallery.slug"
        cols="12"
        md="6"
      >
        <gallery-preview-card :gallery="gallery" />
      </v-col>
    </transition-group>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import GalleryPreviewCard from "~/components/GalleryPreviewCard.vue";
const query = gql`
  {
    galleries {
      slug
      id
      photos {
        url
        name
        width
        height
        formats
      }
      title_en
      title_esp
    }
  }
`;
export default {
  name: "Home",
  components: { GalleryPreviewCard },
  asyncData: async function({ app }) {
    const provider = app.apolloProvider.defaultClient;
    const { data } = await provider.query({
      query
    });
    return {
      galleries: data.galleries
    };
  },
  data: () => ({
    galleries: [],
    loaded: false
  }),
  mounted() {
    this.loaded = true;
  }
};
</script>
