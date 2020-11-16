<template>
  <Layout>
    <v-container>
      <v-card flat>
        <v-card-title class="px-0">
          {{ gallery.title_en }}
        </v-card-title>
        <v-card-text class="px-0">
          {{ gallery.description_en }}
        </v-card-text>
      </v-card>
      <v-row class="ma-0">
        <v-col class="pa-0" v-for="(col, i) in photoColumns" :key="i + 'a'">
          <v-row class="pa-1 ma-0" v-for="photo in col" :key="photo.url">
            <g-image
              :src="baseUrl + photo.url"
              style="max-width:100%;"
            ></g-image>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>
query($slug:String!){
   strapi{ galleries(where:{slug:$slug}){
        id
        title_en
        title_esp
        description_en
        description_esp
        photos{
            height
            width 
            name
            url
            formats
        }
    }}
}
</page-query>
<script>
import chunk from "lodash.chunk";

export default {
  name: "Gallery",
  metaInfo() {
    return {
      title: this.gallery.title_en,
    };
  },
  data: () => ({}),
  computed: {
    gallery() {
      return this.$page.strapi.galleries[0];
    },
    photoColumns() {
      const mobile = this.$vuetify.breakpoint.smAndDown;
      if (mobile) {
        return [this.gallery.photos];
      }
      const { columns } = this.gallery.photos.reduce(
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
          columns: [[], []],
        }
      );
      return columns;
    },
    baseUrl() {
      return process.env.BASE_URL || "http://localhost:1337";
    },
  },
};
</script>

<style></style>
