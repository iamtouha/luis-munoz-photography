// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Luis Munoz Photography",
  siteDescription: "A photography blog",
  plugins: [
    // {
    //   use: "gridsome-plugin-i18n",
    //   options: {
    //     locales: [ // locales list
    //       'it-it',
    //       'fr-fr',
    //       'de-de',
    //       'en-gb'
    //     ],
    //     pathAliases: { // path segment alias for each locales
    //       'it-it': 'it',
    //       'fr-fr': 'fr',
    //       'de-de': 'de',
    //       'en-gb': 'en'
    //     },
    //     fallbackLocale: 'en-gb', // fallback language
    //     defaultLocale: 'en-gb', // default language
    //     enablePathRewrite: true, // rewrite path with locale prefix, default: true
    //     rewriteDefaultLanguage: true, // rewrite default locale, default: true
    //     messages: {
    //       'it-it': require('./src/locales/it-it.json'), // Messages files
    //       'fr-fr': require('./src/locales/fr-fr.json'),
    //       'de-de': require('./src/locales/de-de.json'),
    //       'en-gb': require('./src/locales/en-gb.json'),
    //     }
    //   }
    // }
  ],
};
