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
.auth-social { margin-top: 80rpx; }
.auth-social__divider { display: flex; align-items: center; gap: 20rpx; color: #a2acbc; font-size: 20rpx; }
.auth-social__divider view { height: 1rpx; flex: 1; background: #e8edf7; }
.auth-social__list { display: flex; justify-content: center; gap: 34rpx; margin-top: 30rpx; }
.auth-social__item { display: flex; width: 82rpx; height: 82rpx; align-items: center; justify-content: center; border: 1rpx solid #e8edf7; border-radius: 26rpx; background: #fff; cursor: pointer; box-shadow: 0 10rpx 24rpx rgba(54, 82, 145, 0.06); transition: transform 180ms cubic-bezier(0.32, 0.72, 0, 1), background 180ms cubic-bezier(0.32, 0.72, 0, 1); }
.auth-social__item:active { transform: scale(0.94); background: #f8faff; }
.auth-social__icon { display: flex; width: 52rpx; height: 52rpx; align-items: center; justify-content: center; border-radius: 18rpx; color: #fff; font-size: 24rpx; font-weight: 700; }
.auth-social__icon--wechat { background: #12bd70; }
.auth-social__icon--qq { background: #4f8cf4; }
.auth-social__icon--apple { background: #263249; font-size: 18rpx; }
</style>
