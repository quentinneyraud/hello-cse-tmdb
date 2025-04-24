<script lang="ts" setup>
const trending = await getTrendingMovies('week')
console.log('trending:', trending)

const searchedMovie = await searchMovie({
  query: 'tarantino',
})
console.log('searchedMovie:', searchedMovie)

const movieDetail = await getMovieById(searchedMovie.results![0].id!, { append_to_response: 'videos' })
console.log('movieDetail:', movieDetail)
</script>

<template>
  <div>
    <h1>trending</h1>
    <pre>{{ trending }}</pre>

    <h1>searched</h1>
    <pre>{{ searchedMovie }}</pre>

    <h1>detail</h1>
    <pre>{{ movieDetail }}</pre>
  </div>
</template>
