<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CommentFormSchema } from './CommentForm.vue'
import type { Movie } from '~/extends/tmdb/types/tmdb'
import { useCommentsStore } from '../stores/comments'

interface CommentsSectionProps {
  movieId: Movie['id']
}
const props = defineProps<CommentsSectionProps>()

const commentsStore = useCommentsStore()
const { getOrderedComments } = storeToRefs(commentsStore)

const toast = useToast()
function onCommentFormSubmit(event: FormSubmitEvent<CommentFormSchema>) {
  commentsStore.addCommentToMovie(props.movieId, {
    name: event.data.name,
    message: event.data.message,
    rating: event.data.rating,
  })

  toast.add({
    title: 'Comment added  🎉',
    color: 'success',
  })
}
</script>

<template>
  <section class="container mx-auto px-10 pb-20">
    <h2 class="text-5xl">
      Comments
    </h2>

    <CommentsList class="mt-10" :comments="getOrderedComments(props.movieId)" />

    <CommentForm class="mt-10" @submit="onCommentFormSubmit" />
  </section>
</template>
