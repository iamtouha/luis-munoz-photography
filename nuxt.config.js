export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "luis-munoz-photography",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: "~/plugins/v-click-outside", ssr: false }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/apollo", "nuxt-webfontloader"],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.API_ENDPOINT || "https://luismunoz.herokuapp.com/graphql"
      }
    }
  },
  webfontloader: {
    google: {
      families: ["Inter:wght@400;700&display=swap"]
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
