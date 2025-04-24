<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })

onMounted(() => {
  if (import.meta.dev)
    console.error(props.error)
})
</script>

<template>
  <main class="container mx-auto text-center h-[100dvh] flex flex-col justify-center items-center">
    <h1 class="text-8xl">
      Error 404
    </h1>

    <p class="mt-2 text-2xl">
      This page doesn't exist
    </p>

    <UButton variant="ghost" class="mt-10" label="Go to home page" @click="handleError" />
  </main>
</template>

<style scoped lang="scss">
.Error {
  flex-direction: column;
  gap: toRem(30);

  min-height: 100dvh;
}
</style>
