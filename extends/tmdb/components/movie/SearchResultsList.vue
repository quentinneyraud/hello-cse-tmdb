<script lang="ts" setup>
import type { ComponentExposed } from 'vue-component-type-helpers'
import type { Movie } from '../../types/tmdb'
import InfiniteList from '~/extends/ui/components/InfiniteList.vue'

const props = defineProps<{ query: string }>()
const infiniteListRef = useTemplateRef<ComponentExposed<typeof InfiniteList>>('infiniteList')
const items = ref<Movie[]>([])
const currentPage = ref(1)
const canLoadMore = ref(false)

async function loadCurrentPage() {
  const { total_pages, results } = await searchMovie({ page: currentPage.value, query: props.query })

  if (results && total_pages) {
    items.value.push(...results)
    canLoadMore.value = currentPage.value < total_pages
  }
}

function loadMore() {
  currentPage.value++
  loadCurrentPage()
}

watch(() => [props.query], () => {
  infiniteListRef.value!.reset()
  items.value = []

  currentPage.value = 1
  loadCurrentPage()
})

loadCurrentPage()
</script>

<template>
  <InfiniteList
    ref="infiniteList"
    class="px-5 py-10 grid grid-cols-5 gap-x-5 gap-y-10"
    :items="items"
    :can-load-more="canLoadMore"
    @load-more="loadMore"
  >
    <template #item="{ item: movie }">
      <MovieCard
        :id="4"
        :poster_path="movie.poster_path"
        :title="movie.title"
      />
    </template>
  </InfiniteList>
</template>
