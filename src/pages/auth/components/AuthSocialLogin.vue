<script setup lang="ts">
const emit = defineEmits<{
  wechat: []
  unavailable: [provider: string]
}>()
</script>

<template>
  <view class="auth-social">
    <view class="auth-social__divider">
      <view /><text>其他登录方式</text><view />
    </view>
    <view class="auth-social__list">
      <view class="auth-social__item" role="button" aria-label="微信登录" @tap="emit('wechat')">
        <text class="auth-social__icon auth-social__icon--wechat">微</text>
      </view>
      <view class="auth-social__item" role="button" aria-label="QQ 登录" @tap="emit('unavailable', 'QQ')">
        <text class="auth-social__icon auth-social__icon--qq">Q</text>
      </view>
      <view class="auth-social__item" role="button" aria-label="Apple 登录" @tap="emit('unavailable', 'Apple')">
        <text class="auth-social__icon auth-social__icon--apple">●</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.auth-social {
  margin-top: 104rpx;
}
.auth-social__divider {
  display: flex;
  align-items: center;
  gap: 20rpx;
  color: #98a2b3;
  font-size: 20rpx;
}
.auth-social__divider view {
  height: 2rpx;
  flex: 1;
  background: #e4e7ec;
}
.auth-social__list {
  display: flex;
  justify-content: center;
  gap: 40rpx;
  margin-top: 32rpx;
}
.auth-social__item {
  display: flex;
  width: 80rpx;
  height: 80rpx;
  align-items: center;
  justify-content: center;
}
.auth-social__icon {
  display: flex;
  width: 58rpx;
  height: 58rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 26rpx;
  font-weight: 700;
}
.auth-social__icon--wechat {
  background: #07c160;
}
.auth-social__icon--qq {
  background: #2485db;
}
.auth-social__icon--apple {
  background: #24292f;
  font-size: 18rpx;
}
</style>
