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
.auth-field { margin-bottom: 24rpx; }
.auth-field__control {
  display: flex;
  box-sizing: border-box;
  min-height: 96rpx;
  align-items: center;
  padding: 0 24rpx;
  border: 2rpx solid #e8edf7;
  border-radius: 26rpx;
  background: #f8faff;
  box-shadow: inset 0 1rpx 0 rgba(255, 255, 255, 0.85);
  transition: border-color 180ms cubic-bezier(0.32, 0.72, 0, 1), background 180ms cubic-bezier(0.32, 0.72, 0, 1);
}
.auth-field__control--error { border-color: #e95d63; background: #fff8f8; }
.auth-field__control--disabled { color: #aeb9ca; background: #f1f4fa; }
.auth-field__icon {
  display: flex;
  width: 42rpx;
  height: 42rpx;
  align-items: center;
  justify-content: center;
  margin-right: 16rpx;
  border-radius: 14rpx;
  color: #467bff;
  background: #eef3ff;
  font-size: 26rpx;
  text-align: center;
}
.auth-field__input { min-width: 0; flex: 1; color: #263249; font-size: 26rpx; }
.auth-field__suffix,
.auth-field__action { min-width: 64rpx; padding-left: 16rpx; color: #8390a6; font-size: 28rpx; text-align: right; cursor: pointer; }
.auth-field__action { color: #467bff; font-size: 22rpx; font-weight: 700; }
.auth-field__error { display: block; padding: 9rpx 22rpx 0; color: #e95d63; font-size: 21rpx; line-height: 1.4; }
</style>
