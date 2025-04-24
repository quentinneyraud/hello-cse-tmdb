<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

interface CommentFormProps {
  onSubmit: (event: FormSubmitEvent<CommentFormSchema>) => void
}
const props = defineProps<CommentFormProps>()

const schema = z.object({
  name: z.string().min(3).max(50).regex(/[a-z]/i),
  message: z.string().min(3).max(500),
  rating: z.number(),
})

export type CommentFormSchema = z.output<typeof schema>

const state = reactive<Partial<CommentFormSchema>>({
  name: '',
  message: '',
  rating: 5,
})
</script>

<template>
  <div>
    <p class="text-2xl">
      Add a comment
    </p>

    <UForm class="mt-10 flex flex-col gap-5 items-start" :schema="schema" :state="state" @submit="props.onSubmit">
      <UFormField class="w-full" label="Your name" name="name">
        <UInput v-model="state.name" class="w-full" required />
      </UFormField>

      <UFormField class="w-full" label="Message" name="message">
        <UTextarea v-model="state.message" class="w-full" required />
      </UFormField>

      <UFormField class="w-full" label="Rate this movie" name="rating">
        <UInputNumber v-model="state.rating" class="w-full" required :min="0" :max="10" />
      </UFormField>

      <UButton type="submit">
        Submit !
      </UButton>
    </UForm>
  </div>
</template>
