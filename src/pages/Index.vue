<template>
  <Layout>
    <v-container>
      <transition-group class="row" name="fade">
        <v-col
          v-show="loaded"
          v-for="gallery in $page.strapi.galleries"
          :key="gallery.id"
          cols="12"
          md="6"
        >
          <v-card flat tile :to="'/galleries/' + gallery.slug">
            <v-img
              :lazy-src="baseUrl + gallery.photos[0].url"
              style="max-width:100%"
              :src="baseUrl + gallery.photos[0].url"
            />
          </v-card>
        </v-col>
      </transition-group>
    </v-container>
  </Layout>
</template>
<page-query>
{
  strapi {
    galleries{
      id
      slug
      title_en
      title_esp
      photos{
        url
      }
    }
  }
}
</page-query>
<script>
export default {
  name: "Home",
  metaInfo: {
    title: "Welcome!",
  },
  data: () => ({
    // galleries: [],
    loaded: false,
  }),
  mounted() {
    this.loaded = true;
  },
  computed: {
    galleries() {
      return [];
      // return this.$page.allStrapiGallery.edges.map(({ node }) => node);
    },
    baseUrl() {
      return process.env.BASE_URL || "http://localhost:1337";
    },
  },

  methods: {},
};
</script>
