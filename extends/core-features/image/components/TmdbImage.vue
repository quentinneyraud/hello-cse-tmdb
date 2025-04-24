<script setup lang="ts">
import { joinURL } from 'ufo'

type TmdbImageType = 'backdrop' | 'logo' | 'poster' | 'profile' | 'still'
interface TmdbImageProps {
  tmdbPath: string
  type?: TmdbImageType
}
const props = withDefaults(defineProps<TmdbImageProps>(), {
  type: 'backdrop',
})

const BASE_IMAGE_URL = 'http://image.tmdb.org/t/p/'
// see https://developer.themoviedb.org/reference/configuration-details
const AVAILABLE_SIZES_BY_TYPE: Record<TmdbImageType, number[]> = {
  backdrop: [300, 780, 1280],
  logo: [45, 92, 154, 185, 300, 500],
  poster: [92, 154, 185, 342, 500, 780],
  profile: [45, 185, 632],
  still: [92, 185, 300],
}

const src = computed(() => joinURL(BASE_IMAGE_URL, 'original', props.tmdbPath))
const srcset = computed(() => {
  const availableImageSizes = AVAILABLE_SIZES_BY_TYPE[props.type]

  return availableImageSizes
    .map(size => `${joinURL(BASE_IMAGE_URL, `w${size}`, props.tmdbPath)} ${size}w`)
    .join(', ')
})
</script>

<template>
  <img
    class="AppImage-image"
    :src="src"
    :srcset="srcset"
  >
</template>
