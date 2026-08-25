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
  <button class="auth-button" :class="{ 'auth-button--disabled': disabled }" :disabled="disabled || loading" @tap="emit('tap')">
    {{ loading ? '处理中…' : label }}
  </button>
</template>

<style scoped lang="scss">
.auth-button {
  display: flex;
  width: 100%;
  height: 88rpx;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 44rpx;
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 88rpx;
  background: #0957de;
}
.auth-button::after {
  border: 0;
}
.auth-button:active {
  background: #0748be;
}
.auth-button--disabled {
  color: rgba(255, 255, 255, 0.9);
  background: #b8d4ff;
}
</style>
