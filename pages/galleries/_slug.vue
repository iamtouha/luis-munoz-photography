<template>
  <v-container>
    <v-row>
      <v-card flat>
        <v-card-title class="px-0">
          {{ gallery.title_en }}
        </v-card-title>
        <v-card-text class="px-0">
          {{ gallery.description_en }}
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="ma-0">
      <v-col
        class="pa-0"
        v-for="(col, i) in photoColumns"
        :cols="photoColumns.length > 1 ? '6' : '12'"
        :key="i + 'a'"
      >
        <v-row class="pa-1 ma-0" v-for="photo in col" :key="photo.url">
          <transition name="scroll-y-transition">
            <v-img
              :src="baseUrl + photo.url"
              :lazy-src="baseUrl + photo.formats.thumbnail.url"
              style="max-width:100%;"
            ></v-img>
          </transition>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
const query = gql`
  query($slug: String!) {
    galleries(where: { slug: $slug }) {
      slug
      id
      photos {
        url
        name
        formats
        width
        height
      }
      title_en
      title_esp
      description_en
      description_esp
    }
  }
`;
export default {
  name: "Gallery",
  async asyncData({ app, params }) {
    const provider = app.apolloProvider.defaultClient;
    const { data } = await provider.query({
      query,

      variables: {
        slug: params.slug
      }
    });
    return {
      gallery: data.galleries[0]
    };
  },
  data: () => ({
    gallery: {
      photos: []
    }
  }),
  computed: {
    photoColumns() {
      const mobile = this.$vuetify.breakpoint.smAndDown;
      let photos = [];
      if (mobile) {
        photos = this.gallery.photos.map(
          ({ name, formats, width, height, url }) => ({
            name,
            url,
            formats,
            grid_url: formats.medium.url,
            width,
            height
          })
        );
        return [photos];
      }
      photos = this.gallery.photos.map(
        ({ name, formats, width, height, url }) => ({
          name,
          url,
          formats,
          grid_url: formats.large.url,
          width,
          height
        })
      );
      const { columns } = photos.reduce(
        (acc, photo) => {
          if (acc.col1 <= acc.col2) {
            acc.columns[0].push(photo);
            acc.col1 += photo.height / photo.width;
          } else {
            acc.columns[1].push(photo);
            acc.col2 += photo.height / photo.width;
          }
          return acc;
        },
        {
          col1: 0,
          col2: 0,
          columns: [[], []]
        }
      );
      return columns;
    },
    baseUrl() {
      return process.env.BASE_URL || "http://localhost:1337";
    }
  }
};
</script>
