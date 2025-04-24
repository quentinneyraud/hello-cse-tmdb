<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'
import type { MovieCredits, MovieDetail } from '../../types/tmdb'

type MovieHeadingProps =
  Pick<MovieDetail, 'id' | 'title' | 'genres' | 'overview' | 'poster_path' | 'vote_average' | 'vote_count'>
  & {
    director?: NonNullable<MovieCredits['crew']>[number]
  }
const props = defineProps<MovieHeadingProps>()

const items = ref<BreadcrumbItem[]>([
  {
    label: 'Home',
    to: '/',
  },
  {
    label: props.title,
    to: `/${props.id}`,
  },
])
</script>

<template>
  <header class="container mx-auto px-10 py-10">
    <UBreadcrumb :items="items" />

    <div class="mt-10 flex gap-20 flex-col md:flex-row">
      <div class="basis-1/3 shrink-0">
        <TmdbImage v-if="props.poster_path" class="w-full aspect-[1500/2200]" :tmdb-path="props.poster_path" />
      </div>

      <div>
        <h1 class="text-8xl">
          {{ props.title }}
        </h1>

        <ul class="flex gap-2">
          <UBadge v-for="genre in props.genres" :key="genre.id" color="neutral" variant="outline" as="li">
            {{ genre.name }}
          </UBadge>
        </ul>

        <p v-if="director" class="mt-2">
          <span class="font-bold">Director:</span> {{ props.director?.name }}
        </p>

        <p class="mt-2">
          <span class="font-bold">Rating:</span> {{ props.vote_average }} from {{ vote_count }} users
        </p>

        <p class="mt-10">
          {{ props.overview }}
        </p>
      </div>
    </div>
  </header>
</template>
