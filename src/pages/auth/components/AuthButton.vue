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
  height: 96rpx;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 28rpx;
  color: #fff;
  background: linear-gradient(105deg, #3065f4, #467bff 58%, #5c71f3);
  box-shadow: 0 16rpx 30rpx rgba(61, 107, 246, 0.24);
  cursor: pointer;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 96rpx;
  transition: transform 180ms cubic-bezier(0.32, 0.72, 0, 1), opacity 180ms cubic-bezier(0.32, 0.72, 0, 1);
}
.auth-button::after { border: 0; }
.auth-button:active { transform: scale(0.985); opacity: 0.9; }
.auth-button--disabled,
.auth-button[disabled] { color: rgba(255, 255, 255, 0.9); background: #b9c9f6; box-shadow: none; cursor: not-allowed; }
</style>
