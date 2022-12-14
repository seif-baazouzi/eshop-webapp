export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'webapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }
    ]
  },

  loading: '~/components/Loading.vue',

  // server
  server: {
    port: 4200
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/css/global.css",
    "~/css/tables.css",
    "~/css/buttons.css",
    "~/css/containers.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
