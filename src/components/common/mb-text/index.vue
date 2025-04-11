<script lang="ts" setup>
interface Props {
  text: string | number | null
  prefix?: string | null
  noText?: string
}
const props = defineProps<Props>()

const hasText = computed(() => {
  if (props.text !== null && props.text !== undefined && props.text !== '') {
    return true
  } else {
    return false
  }
})

const getText = computed(() => {
  if (!hasText.value) {
    return ''
  } else {
    return props.text
  }
})

console.log('hasText', hasText.value)
console.log('getText', getText.value)
</script>

<template>
  <wd-text v-if="hasText" :text="getText" :prefix="prefix" :="$attrs" />
  <view v-else class="flex items-center text-color-4">
    <view>{{ prefix }}</view>
    <view>{{ noText ?? '暂无' }}</view>
  </view>
</template>

<style scoped></style>
