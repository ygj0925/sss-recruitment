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
.auth-agreement {
  display: flex;
  min-height: 48rpx;
  align-items: center;
  margin: 2rpx 0 28rpx;
  color: #98a2b3;
  font-size: 22rpx;
}
.auth-agreement__check {
  display: flex;
  min-height: 48rpx;
  align-items: center;
}
.auth-agreement__mark {
  display: flex;
  width: 28rpx;
  height: 28rpx;
  align-items: center;
  justify-content: center;
  margin-right: 12rpx;
  border: 2rpx solid #d0d5dd;
  border-radius: 50%;
  color: #fff;
  font-size: 18rpx;
  font-weight: 700;
}
.auth-agreement__mark--checked {
  border-color: #0957de;
  background: #0957de;
}
.auth-agreement__link {
  color: #3b82f6;
}
</style>
