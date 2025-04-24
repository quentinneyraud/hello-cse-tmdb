<script lang="ts" setup>
import type { Comment } from '../types'
import { useTimeAgo } from '@vueuse/core'

type CommentProps = Comment
const props = defineProps<CommentProps>()

const timeAgo = computed(() => useTimeAgo(props.date))
const readableDate = computed(() => useDateFormat(props.date, 'DD/MM/YYYY HH:mm', { locales: 'fr-FR' }))
</script>

<template>
  <UCard as="li" variant="soft" class="w-full border-0" :ui="{ header: 'p-10' }">
    <template #header>
      Added by <span class="font-bold">{{ props.name }}</span> {{ timeAgo }} ({{ readableDate }})
    </template>

    <p>{{ props.message }}</p>

    <template #footer>
      Rating: {{ props.rating }}
    </template>
  </UCard>
</template>
