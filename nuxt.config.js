import colors from "vuetify/es5/util/colors";

export default {
  target: "static",

  head: {
    titleTemplate: "%s - Luis Munoz Photography",
    title: "luis-munoz-photography",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" }
    ]
  },
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:1337"
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ["@nuxtjs/vuetify"],

  modules: ["@nuxtjs/apollo", "nuxt-webfontloader"],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.API_ENDPOINT || "http://localhost:1337/graphql"
      }
    }
  },

  webfontloader: {
    google: {
      families: ["Inter:wght@400;700&display=swap"]
    }
  },
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    defaultAssets: {
      font: false
    },
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: "#77BFE6",
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    }
  }
};
