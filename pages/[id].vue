<script lang="ts" setup>
const route = useRoute()
const movieId = route.params.id as string

const { data, error, status } = await useAsyncData(movieId, () => {
  return getMovieById(Number.parseInt(movieId), {
    append_to_response: 'videos',
  })
})

if (status.value === 'error' || error.value || !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}
</script>

<template>
  <div>
    <p>Movie : {{ movieId }}</p>

    <p>{{ data?.title }}</p>
    <CommentsSection :movie-id="parseInt(movieId)" />
  </div>
</template>
