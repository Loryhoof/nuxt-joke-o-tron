// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    OPENAI_PK: process.env.OPENAI_PK,
    public: {

    }
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  app: {
    head: {
      title: "Joke-O-Tron",
      meta: [
        {
          name: 'description', content: "Generate a funny joke"
        }
      ]
    }
  }
})