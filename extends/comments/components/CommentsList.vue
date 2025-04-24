<script lang="ts" setup>
import type { Comment } from '../types'

interface CommentsListProps {
  comments: Comment[]
}
const props = defineProps<CommentsListProps>()
</script>

<template>
  <div>
    <ul v-if="comments.length" class="flex flex-col gap-10">
      <Comment
        v-for="comment in props.comments"
        :key="comment.date"
        :message="comment.message"
        :date="comment.date"
        :name="comment.name"
        :rating="comment.rating"
      />
    </ul>

    <p v-else>
      Be the first to comment this movie
    </p>
  </div>
</template>
