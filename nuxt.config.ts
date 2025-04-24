export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  extends: [
    './extends/core-features/eslint',
    './extends/core-features/typescript',
    './extends/tmdb',
    './extends/ui',
  ],
})
