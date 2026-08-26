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
  <view class="mb-24rpx">
    <view
      class="box-border min-h-96rpx flex items-center border-2rpx border-#e8edf7 rounded-26rpx bg-#f8faff px-24rpx shadow-[inset_0_1rpx_0_rgba(255,255,255,0.85)] transition-colors duration-200 ease-out"
      :class="{
        'border-#e95d63 bg-#fff8f8': error,
        'bg-#f1f4fa text-#aeb9ca': disabled,
      }"
    >
      <text v-if="icon" class="mr-16rpx h-42rpx w-42rpx flex items-center justify-center rounded-14rpx bg-#eaf7ff text-center text-26rpx text-#2a9ff2">{{ icon }}</text>
      <input
        class="min-w-0 flex-1 text-26rpx text-#263249"
        :value="modelValue"
        :type="actualType"
        :password="password && !showPassword"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        @input="updateValue"
        @blur="emit('blur')"
      >
      <text
        v-if="password"
        class="min-w-64rpx cursor-pointer pl-16rpx text-right text-28rpx text-#8390a6"
        role="button"
        :aria-label="showPassword ? '隐藏密码' : '显示密码'"
        @tap="showPassword = !showPassword"
      >
        {{ showPassword ? '◉' : '◌' }}
      </text>
      <text v-else-if="actionText" class="min-w-64rpx cursor-pointer pl-16rpx text-right text-22rpx text-#2a9ff2 font-700" role="button" @tap="emit('action')">{{ actionText }}</text>
    </view>
    <text v-if="error" class="block px-22rpx pt-9rpx text-21rpx text-#e95d63 leading-1.4">{{ error }}</text>
  </view>
</template>
