<script lang="ts" setup>
import type { MovieCredits } from '../../types/tmdb'

interface MovieCastingSliderProps {
  items?: MovieCredits['cast']
}
const props = defineProps<MovieCastingSliderProps>()
</script>

<template>
  <section class="container mx-auto px-10 py-10">
    <h2 class="text-5xl">
      Casting
    </h2>

    <UCarousel
      v-slot="{ item }"
      :items="props.items"
      class=" w-full mx-auto mt-10"
      :ui="{ item: 'basis-1/3' }"
    >
      <div>
        <TmdbImage type="still" :tmdb-path="item.profile_path!" class="aspect-square" />

        <p class="mt-5 text-2xl">
          {{ item.name }}
        </p>

        <p class="text-1xl mt-0.5 text-amber-100">
          {{ item.character }}
        </p>
      </div>
    </UCarousel>
  </section>
</template>
