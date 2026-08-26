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
    custom-style="min-height: 96rpx; margin-top: 4rpx; border-radius: 28rpx; background: linear-gradient(105deg, #27b5f4 0%, #3c91f3 56%, #6c60ed 100%); box-shadow: 0 16rpx 30rpx rgba(55, 139, 241, 0.26); font-size: 29rpx; font-weight: 700;"
    :disabled="disabled"
    :loading="loading"
    @click="emit('tap')"
  >
    {{ label }}
  </wd-button>
</template>
