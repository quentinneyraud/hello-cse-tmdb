<script lang="ts" setup>
const route = useRoute()
const movieId = route.params.id as string

const { data: movie, error, status } = await useAsyncData(movieId, () => {
  return getMovieById(Number.parseInt(movieId), {
    append_to_response: 'credits',
    pick: ['id', 'title', 'overview', 'poster_path', 'vote_average', 'vote_count', 'genres', 'credits'],
  })
})

if (status.value === 'error' || error.value || !movie.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

const director = computed(() => {
  return movie.value?.credits?.crew?.find(crewMember => crewMember.gender === 2)
})
</script>

<template>
  <div>
    <MovieHeading
      :id="movie!.id"
      :title="movie!.title"
      :overview="movie!.overview"
      :poster_path="movie!.poster_path"
      :vote_average="movie!.vote_average"
      :vote_count="movie!.vote_count"
      :genres="movie!.genres"
      :director="director"
    />

    <MovieCastingSlider
      v-if="movie!.credits?.cast?.length"
      class="mt-20"
      :items="movie!.credits.cast"
    />

    <CommentsSection
      class="mt-20"
      :movie-id="parseInt(movieId)"
    />
  </div>
</template>
