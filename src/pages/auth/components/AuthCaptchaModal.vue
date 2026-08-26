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
  <view class="captcha-mask" @tap.self="emit('cancel')">
    <view class="captcha-modal" role="dialog" aria-label="图形验证码">
      <text class="captcha-modal__title">安全验证</text>
      <text class="captcha-modal__description">请输入图形验证码后继续</text>
      <view class="captcha-modal__row">
        <input v-model="value" class="captcha-modal__input" placeholder="图形验证码" :maxlength="4">
        <text class="captcha-modal__code">{{ captcha }}</text>
      </view>
      <text v-if="error" class="captcha-modal__error">{{ error }}</text>
      <view class="captcha-modal__actions">
        <text role="button" @tap="emit('cancel')">取消</text>
        <text class="captcha-modal__confirm" role="button" @tap="confirm">确定</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.captcha-mask { position: fixed; z-index: 99; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; justify-content: center; padding: 48rpx; background: rgba(35, 50, 82, 0.5); }
.captcha-modal { box-sizing: border-box; width: 100%; max-width: 560rpx; padding: 48rpx 40rpx 30rpx; border: 1rpx solid rgba(255, 255, 255, 0.72); border-radius: 34rpx; background: #fff; box-shadow: 0 28rpx 70rpx rgba(31, 51, 95, 0.22); }
.captcha-modal__title,
.captcha-modal__description { display: block; text-align: center; }
.captcha-modal__title { color: #263249; font-size: 32rpx; font-weight: 700; }
.captcha-modal__description { margin-top: 12rpx; color: #9aa5b8; font-size: 22rpx; }
.captcha-modal__row { display: flex; height: 84rpx; align-items: center; margin-top: 34rpx; padding: 0 22rpx; border: 2rpx solid #e8edf7; border-radius: 22rpx; background: #f8faff; }
.captcha-modal__input { min-width: 0; flex: 1; color: #263249; font-size: 24rpx; }
.captcha-modal__code { padding: 0 10rpx 0 20rpx; color: #467bff; font-size: 36rpx; font-style: italic; font-weight: 700; letter-spacing: 6rpx; }
.captcha-modal__error { display: block; margin-top: 12rpx; color: #e95d63; font-size: 20rpx; }
.captcha-modal__actions { display: flex; justify-content: space-between; margin: 40rpx -40rpx -30rpx; padding: 28rpx 84rpx; border-top: 1rpx solid #edf1f8; color: #7f8aa0; font-size: 26rpx; }
.captcha-modal__confirm { color: #467bff; font-weight: 700; }
</style>
