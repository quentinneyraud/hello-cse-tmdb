<script lang="ts" setup>
import type { Movie } from '../../types/tmdb'

const items = ref<Movie[]>([])
const currentPage = ref(1)
const canLoadMore = ref(false)

// Initial data
const { data, error } = await useAsyncData('trending', () => getTrendingMovies('week', { page: currentPage.value }))
if (error.value) {
  throw new Error('404')
}
if (data.value?.results) {
  items.value.push(...data.value.results)
}
if (data.value?.total_pages) {
  canLoadMore.value = currentPage.value < data.value.total_pages
}

// Infinite scroll
async function loadMore() {
  canLoadMore.value = false
  currentPage.value++

  const { total_pages, results } = await getTrendingMovies('week', { page: currentPage.value })

  if (results && total_pages) {
    items.value.push(...results)
    canLoadMore.value = currentPage.value < total_pages
  }
}
</script>

<template>
  <InfiniteList
    class="px-5 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10"
    :items="items"
    :can-load-more="canLoadMore"
    @load-more="loadMore"
  >
    <template #item="{ item: movie }">
      <MovieCard
        :id="movie.id"
        :poster_path="movie.poster_path"
        :title="movie.title"
      />
    </template>
  </InfiniteList>
</template>
