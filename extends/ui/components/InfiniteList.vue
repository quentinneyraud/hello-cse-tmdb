<script lang="ts" setup generic="K extends { id: string | number, [key:string]: any }">
interface InfiniteListProps {
  canLoadMore: boolean
  items: (K)[]
}
const props = defineProps<InfiniteListProps>()

const emit = defineEmits(['loadMore'])
const el = useTemplateRef<HTMLElement>('el')

const { reset } = useInfiniteScroll(
  window,
  () => {
    emit('loadMore')
  },
  {
    distance: 100,
    interval: 500,
    canLoadMore: () => props.canLoadMore,
  },
)

defineExpose({
  reset,
})
</script>

<template>
  <ul ref="el">
    <li v-for="item in props.items" :key="item.id">
      <slot name="item" :item="item as K" />
    </li>
  </ul>
</template>
