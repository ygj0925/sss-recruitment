<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  disabled?: boolean
  loading?: boolean
}>(), {
  label: '登录',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  tap: []
}>()
</script>

<template>
  <wd-button
    round
    block
    type="primary"
    size="large"
    custom-class="!mt-4rpx !min-h-96rpx !rounded-28rpx !text-29rpx !font-700 !shadow-[0_16rpx_30rpx_rgba(55,139,241,0.26)]"
    custom-style="background: var(--app-brand-header);"
    :disabled="disabled"
    :loading="loading"
    @click="emit('tap')"
  >
    {{ label }}
  </wd-button>
</template>
