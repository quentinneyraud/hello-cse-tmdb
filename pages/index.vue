<script lang="ts" setup>
const query = ref('')
const queryDebounced = refDebounced(query, 300)

definePageMeta({
  keepalive: true,
})
</script>

<template>
  <main>
    <div class="w-full py-10 pointer-events-none">
      <UInput v-model="query" type="text" class="pointer-events-auto block w-1/2 mx-auto" size="xl" icon="i-lucide-search" placeholder="Chercher un film" color="neutral" variant="soft" />
    </div>

    <MovieSearchResultsList v-if="query" :query="queryDebounced" />
    <MovieTrendingList v-else />
  </main>
</template>
