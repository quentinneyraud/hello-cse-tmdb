import process from 'node:process'

export default defineNuxtConfig({
  runtimeConfig: {
    TMDB_API_KEY: process.env.TMDB_API_KEY || '',
  },
})
