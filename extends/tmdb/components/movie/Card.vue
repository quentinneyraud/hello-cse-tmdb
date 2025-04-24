<script setup lang="ts">
import type { Movie } from '../../types/tmdb'

const props = defineProps<Pick<Movie, 'id' | 'title' | 'poster_path'>>()

const alt = computed(() => `Poster of ${props.title} movie`)
</script>

<template>
  <NuxtLink
    :to="{
      name: 'id',
      params: {
        id: props.id,
      },
    }"
  >
    <div class="w-full aspect-[1500/2200] bg-amber-100">
      <TmdbImage
        v-if="props.poster_path"
        class="w-full h-full"
        type="poster"
        :alt="alt"
        :tmdb-path="props.poster_path"
      />
    </div>

    <p class="text-2xl">
      {{ props.title }}
    </p>
  </NuxtLink>
</template>
