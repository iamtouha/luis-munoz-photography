<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="gallery in galleries"
        :key="gallery.id"
        :to="'/galleries/' + gallery.slug"
      >
        <v-list-item-title>{{ gallery.title_en }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

const query = gql`
  {
    galleries {
      id
      title_en
      slug
    }
  }
`;
export default {
  name: "Galleries",
  async asyncData({ app }) {
    const provider = app.apolloProvider.defaultClient;
    const resp = await provider.query({ query }).catch(console.log);
    return {
      galleries: resp.data.galleries
    };
  },
  data: () => ({
    galleries: []
  })
};
</script>

<style></style>
