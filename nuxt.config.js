export default {
  target: "static",

  head: {
    title: "luis-munoz-photography",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: [],
  plugins: [{ src: "~/plugins/v-click-outside", ssr: false }],
  components: true,
  buildModules: ["@nuxtjs/tailwindcss"],

  modules: ["@nuxtjs/apollo", "nuxt-webfontloader", "nuxt-i18n"],

  i18n: {
    defaultLocale: "es",
    vueI18n: {
      locale: "es",
      fallbackLocale: "es",
      messages: { es: {}, en: {} }
    },
    locales: [
      { code: "en", name: "English" },
      { code: "es", name: "Español" }
    ]
  },
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
  build: {}
};
