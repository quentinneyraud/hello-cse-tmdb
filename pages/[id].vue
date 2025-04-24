<script lang="ts" setup>
const route = useRoute()
const movieId = route.params.id
</script>

<template>
  <p>Movie : {{ movieId }}</p>
</template>
