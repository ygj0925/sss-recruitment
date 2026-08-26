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
    custom-class="auth-button"
    :disabled="disabled"
    :loading="loading"
    @click="emit('tap')"
  >
    {{ label }}
  </wd-button>
</template>

<style scoped lang="scss">
:deep(.auth-button) {
  min-height: 96rpx;
  margin-top: 4rpx;
  border-radius: 28rpx;
  background: linear-gradient(105deg, #3065f4, #467bff 58%, #5c71f3);
  box-shadow: 0 16rpx 30rpx rgba(61, 107, 246, 0.24);
  font-size: 29rpx;
  font-weight: 700;
}
</style>
