<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'agreement': []
}>()
</script>

<template>
  <view class="auth-agreement">
    <view class="auth-agreement__check" role="checkbox" :aria-checked="modelValue" aria-label="同意用户协议" @tap="emit('update:modelValue', !modelValue)">
      <text class="auth-agreement__mark" :class="[{ 'auth-agreement__mark--checked': modelValue }]">{{ modelValue ? '✓' : '' }}</text>
      <text class="auth-agreement__label">我已阅读并同意</text>
    </view>
    <text class="auth-agreement__link" role="link" @tap="emit('agreement')">《用户协议》</text>
  </view>
</template>

<style scoped lang="scss">
.auth-agreement { display: flex; min-height: 50rpx; align-items: center; margin: 4rpx 0 30rpx; color: #8b96aa; font-size: 21rpx; }
.auth-agreement__check { display: flex; min-height: 50rpx; align-items: center; cursor: pointer; }
.auth-agreement__mark { display: flex; width: 28rpx; height: 28rpx; align-items: center; justify-content: center; margin-right: 12rpx; border: 2rpx solid #cdd6e6; border-radius: 10rpx; color: #fff; font-size: 18rpx; font-weight: 700; background: #fff; transition: background 160ms cubic-bezier(0.32, 0.72, 0, 1), border-color 160ms cubic-bezier(0.32, 0.72, 0, 1); }
.auth-agreement__mark--checked { border-color: #467bff; background: #467bff; }
.auth-agreement__link { color: #467bff; cursor: pointer; }
</style>
