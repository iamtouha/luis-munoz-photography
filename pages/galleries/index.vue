<template>
  <div class="page-wrapper">
    <ul>
      <nuxt-link
        tag="li"
        class="cursor-pointer"
        :to="'/galleries/' + item.slug"
        v-for="item in galleries"
        :key="item.id"
      >
        {{ item.title_en }}
      </nuxt-link>
    </ul>
  </div>
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
