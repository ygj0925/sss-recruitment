<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder: string
  icon?: string
  error?: string
  password?: boolean
  inputType?: 'text' | 'number'
  maxlength?: number
  actionText?: string
  disabled?: boolean
}>(), {
  icon: '',
  error: '',
  password: false,
  inputType: 'text',
  maxlength: 64,
  actionText: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
  'action': []
}>()

const showPassword = ref(false)
const actualType = computed(() => props.password ? 'text' : props.inputType)

function updateValue(event: { detail: { value: string } }) {
  emit('update:modelValue', event.detail.value)
}
</script>

<template>
  <view class="auth-field">
    <view class="auth-field__control" :class="{ 'auth-field__control--error': error, 'auth-field__control--disabled': disabled }">
      <text v-if="icon" class="auth-field__icon">{{ icon }}</text>
      <input
        class="auth-field__input"
        :value="modelValue"
        :type="actualType"
        :password="password && !showPassword"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        @input="updateValue"
        @blur="emit('blur')"
      >
      <text v-if="password" class="auth-field__suffix" role="button" :aria-label="showPassword ? '隐藏密码' : '显示密码'" @tap="showPassword = !showPassword">
        {{ showPassword ? '◉' : '◌' }}
      </text>
      <text v-else-if="actionText" class="auth-field__action" role="button" @tap="emit('action')">{{ actionText }}</text>
    </view>
    <text v-if="error" class="auth-field__error">{{ error }}</text>
  </view>
</template>

<style scoped lang="scss">
.auth-field {
  margin-bottom: 24rpx;
}
.auth-field__control {
  display: flex;
  box-sizing: border-box;
  min-height: 88rpx;
  align-items: center;
  padding: 0 28rpx;
  border: 2rpx solid transparent;
  border-radius: 44rpx;
  background: #fff;
  box-shadow: 0 8rpx 24rpx rgba(31, 41, 55, 0.04);
}
.auth-field__control--error {
  border-color: #e5484d;
}
.auth-field__control--disabled {
  background: #f2f4f7;
}
.auth-field__icon {
  width: 36rpx;
  margin-right: 16rpx;
  color: #98a2b3;
  font-size: 28rpx;
  text-align: center;
}
.auth-field__input {
  min-width: 0;
  flex: 1;
  color: #1f2937;
  font-size: 26rpx;
}
.auth-field__suffix,
.auth-field__action {
  min-width: 64rpx;
  padding-left: 16rpx;
  color: #98a2b3;
  font-size: 28rpx;
  text-align: right;
}
.auth-field__action {
  color: #0957de;
  font-size: 22rpx;
  font-weight: 600;
}
.auth-field__error {
  display: block;
  padding: 8rpx 24rpx 0;
  color: #e5484d;
  font-size: 22rpx;
  line-height: 1.4;
}
</style>
