import type { Comment } from '../types'
import type { Movie } from '~/extends/tmdb/types/tmdb'
import { defineStore } from 'pinia'

interface CommentsStoreState {
  [key: Movie['id']]: Comment[]
}

export const useCommentsStore = defineStore('comments', () => {
  const state = ref<CommentsStoreState>({})

  const getOrderedComments = computed(() => (movieId: Movie['id']) => {
    if (!state.value[movieId])
      return []
    return state.value[movieId].sort((a, b) => b.date - a.date)
  })

  function addCommentToMovie(movieId: number, data: Omit<Comment, 'date'>) {
    state.value[movieId] = (state.value[movieId] ?? []).concat({
      ...data,
      date: new Date().getTime(),
    })
  }

  return {
    state,
    // Getters
    getOrderedComments,

    // Actions
    addCommentToMovie,
  }
}, {
  persist: piniaPluginPersistedstate.localStorage(),
})
