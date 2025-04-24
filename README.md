# HelloCSE TMDB

> Movie interface based on TMDB API data.

## Setup

1. Make sure to install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and set `TMDB_API_KEY`.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Structure

### /extends

Le code est organisé en différents layers qui encapsulent une logique métier ou une features.

#### /extends/core-features

Les features internes à Nuxt et les setups d'outils.

#### /extends/comments

Tous les composants, types et stores relatifs aux aux films.

#### /extends/tmdb

Tous les composants, types, composables, routes API relatifs aux commentaires.

Dans `/extends/tmdb/server`, on crée une route qui commence par `/api/**`, utilisée en tant que proxy entre le client et l'API TMDB. Ca permet de cacher la clé API côté client et de mettre en place une logique supplémentaire avec le paramètre `pick` qui permet de réduire la taille des réponses API.

#### /extends/ui

Tous les composants relatif à l'UI.

## Links

- [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction)
- [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)
