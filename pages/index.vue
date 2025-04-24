<script lang="ts" setup>
const { data: trendingMovies } = useLazyAsyncData('trending', async () => await getTrendingMovies('week', { page: 1 }))
</script>

<template>
  <div class="px-5 grid grid-cols-5 gap-x-5 gap-y-10">
    <MovieCard
      v-for="movie in trendingMovies?.results"
      :id="4"
      :key="movie.id"
      :poster_path="movie.poster_path"
      :title="movie.title"
    />
  </div>
</template>
