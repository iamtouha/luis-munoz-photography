const nodeExternals = require("webpack-node-externals");

module.exports = function(api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/, /\.css$/, /\?vue&type=style/],
        }),
      ]);
    }
  });

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        strapi {
          galleries {
            slug
          }
        }
      }
    `);
    data.strapi.galleries.forEach((gallery) => {
      createPage({
        path: "/galleries/" + gallery.slug,
        component: "./src/templates/Gallery.vue",
        context: {
          slug: gallery.slug,
        },
      });
    });
  });
};
