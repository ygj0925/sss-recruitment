<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  cancel: []
  confirm: [value: string]
}>()

const value = ref('')
const error = ref('')
const captcha = '0793'

function confirm() {
  if (value.value !== captcha) {
    error.value = '验证码不正确，请重新输入'
    return
  }
  emit('confirm', value.value)
}
</script>

<template>
  <view class="fixed inset-0 z-99 flex items-center justify-center bg-[rgba(35,50,82,0.5)] p-48rpx" @tap.self="emit('cancel')">
    <view class="box-border max-w-560rpx w-full border-1rpx border-white/72 rounded-34rpx bg-white px-40rpx pb-30rpx pt-48rpx shadow-[0_28rpx_70rpx_rgba(31,51,95,0.22)]" role="dialog" aria-label="图形验证码">
      <text class="block text-center text-32rpx text-#263249 font-700">安全验证</text>
      <text class="mt-12rpx block text-center text-22rpx text-#9aa5b8">请输入图形验证码后继续</text>
      <view class="mt-34rpx h-84rpx flex items-center border-2rpx border-#e8edf7 rounded-22rpx bg-#f8faff px-22rpx">
        <input v-model="value" class="min-w-0 flex-1 text-24rpx text-#263249" placeholder="图形验证码" :maxlength="4">
        <text class="py-0 pl-20rpx pr-10rpx text-36rpx text-#467bff font-700 tracking-6rpx italic">{{ captcha }}</text>
      </view>
      <text v-if="error" class="mt-12rpx block text-20rpx text-#e95d63">{{ error }}</text>
      <view class="mt-40rpx flex justify-between border-t-1rpx border-#edf1f8 px-84rpx py-28rpx text-26rpx text-#7f8aa0 -mx-40rpx -mb-30rpx">
        <text class="cursor-pointer" role="button" @tap="emit('cancel')">取消</text>
        <text class="cursor-pointer text-#467bff font-700" role="button" @tap="confirm">确定</text>
      </view>
    </view>
  </view>
</template>
