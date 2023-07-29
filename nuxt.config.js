// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{
          href: 'https://fonts.googleapis.com',
          rel: 'preconnect'
        },
        {
          href: 'https://fonts.gstatic.com',
          rel: 'preconnect',
          crossorigin: true
        }, {
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap',
          rel: 'stylesheet'
        }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
   
  },

  ssr: true,

  css: [
    '~/assets/css/main.css',
    '~/assets/css/bottom-sheet.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-icon'],

  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
      siteKey: process.env.CAPTCHA_SITE_KEY,
      secretKey: process.env.CAPTCHA_SECRET_KEY
    }
  },

  components: [{
    path: '~/components', // will get any components nested in let's say /components/test too
    pathPrefix: false
  }],

  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  }
})
