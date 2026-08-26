<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'agreement': []
  'privacy': []
}>()
</script>

<template>
  <view class="auth-agreement">
    <wd-checkbox
      :model-value="modelValue"
      type="square"
      checked-color="#467bff"
      custom-class="auth-agreement__checkbox"
      @update:model-value="emit('update:modelValue', $event)"
    >
      <text>我已阅读并同意</text>
    </wd-checkbox>
    <text class="auth-agreement__link" role="link" @tap="emit('agreement')">《用户协议》</text>
    <text class="auth-agreement__join">和</text>
    <text class="auth-agreement__link" role="link" @tap="emit('privacy')">《隐私政策》</text>
  </view>
</template>

<style scoped lang="scss">
.auth-agreement {
  display: flex;
  min-height: 54rpx;
  align-items: center;
  flex-wrap: wrap;
  margin: 4rpx 0 30rpx;
  color: #7f8ca1;
  font-size: 23rpx;
  line-height: 1.6;
}

.auth-agreement :deep(.auth-agreement__checkbox) {
  margin-right: 4rpx;
}

.auth-agreement__link {
  color: #3478f6;
  cursor: pointer;
}

.auth-agreement__join {
  margin: 0 4rpx;
}
</style>
