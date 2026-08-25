<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  subtitle?: string
  showBack?: boolean
}>(), {
  subtitle: '',
  showBack: true,
})

const emit = defineEmits<{
  back: []
}>()
</script>

<template>
  <view class="auth-page pt-safe pb-safe">
    <!-- #ifdef H5 -->
    <view class="auth-promo">
      <image class="auth-promo__logo" src="/static/logo.svg" mode="aspectFit" />
      <view class="auth-promo__copy">
        <text class="auth-promo__eyebrow">SSS RECRUITMENT</text>
        <text class="auth-promo__title">遇见更好的职业机会</text>
        <text class="auth-promo__description">安全、清晰、连贯地管理你的求职与职业发展。</text>
      </view>
      <view class="auth-promo__orb auth-promo__orb--one" />
      <view class="auth-promo__orb auth-promo__orb--two" />
    </view>
    <!-- #endif -->

    <scroll-view class="auth-scroll" scroll-y>
      <view class="auth-content">
        <view class="auth-topbar">
          <view v-if="showBack" class="auth-back" role="button" aria-label="返回" @tap="emit('back')">
            <text>‹</text>
          </view>
          <view v-else class="auth-back auth-back--placeholder" />
          <view class="auth-help" aria-label="帮助">
            ?
          </view>
        </view>
        <view class="auth-card">
          <slot name="brand">
            <image class="auth-mobile-logo" src="/static/logo.svg" mode="aspectFit" />
          </slot>
          <view class="auth-heading">
            <text class="auth-heading__title">{{ title }}</text>
            <text v-if="subtitle" class="auth-heading__subtitle">{{ subtitle }}</text>
          </view>
          <slot />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  background: #f7f9fc;
  color: #1f2937;
}

.auth-scroll {
  height: 100vh;
}
.auth-content {
  min-height: 100%;
}
.auth-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 36rpx 0;
}
.auth-back,
.auth-help {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  color: #1f2937;
  font-size: 52rpx;
  line-height: 1;
}
.auth-back--placeholder {
  visibility: hidden;
}
.auth-help {
  border: 2rpx solid #98a2b3;
  border-radius: 50%;
  color: #98a2b3;
  font-size: 28rpx;
  font-weight: 700;
}
.auth-card {
  box-sizing: border-box;
  width: 100%;
  max-width: 680rpx;
  margin: 72rpx auto 0;
  padding: 0 48rpx 64rpx;
}
.auth-mobile-logo {
  display: block;
  width: 104rpx;
  height: 104rpx;
  margin: 0 auto 40rpx;
}
.auth-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64rpx;
  text-align: center;
}
.auth-heading__title {
  font-size: 44rpx;
  font-weight: 700;
  line-height: 1.35;
}
.auth-heading__subtitle {
  margin-top: 16rpx;
  color: #98a2b3;
  font-size: 24rpx;
  line-height: 1.5;
}
.auth-promo {
  display: none;
}

@media screen and (min-width: 768px) {
  .auth-page {
    display: flex;
    min-height: 100vh;
    padding: 0;
  }
  .auth-promo {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 48%;
    min-height: 100vh;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    padding: 96rpx 11%;
    color: #fff;
    background: linear-gradient(145deg, #0748be, #0957de 56%, #3b82f6);
  }
  .auth-promo__logo {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 72rpx;
    filter: brightness(0) invert(1);
  }
  .auth-promo__copy {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
  }
  .auth-promo__eyebrow {
    font-size: 22rpx;
    font-weight: 700;
    letter-spacing: 5rpx;
    opacity: 0.75;
  }
  .auth-promo__title {
    margin-top: 28rpx;
    font-size: 64rpx;
    font-weight: 700;
    line-height: 1.25;
  }
  .auth-promo__description {
    max-width: 580rpx;
    margin-top: 32rpx;
    font-size: 28rpx;
    line-height: 1.8;
    opacity: 0.82;
  }
  .auth-promo__orb {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
  .auth-promo__orb--one {
    right: -180rpx;
    bottom: -160rpx;
    width: 640rpx;
    height: 640rpx;
  }
  .auth-promo__orb--two {
    top: 90rpx;
    right: 100rpx;
    width: 180rpx;
    height: 180rpx;
  }
  .auth-scroll {
    width: 52%;
    height: 100vh;
  }
  .auth-content {
    display: flex;
    box-sizing: border-box;
    min-height: 100%;
    flex-direction: column;
  }
  .auth-topbar {
    padding: 36rpx 64rpx 0;
  }
  .auth-card {
    margin: auto;
    padding: 88rpx 96rpx;
    border-radius: 36rpx;
    background: #fff;
    box-shadow: 0 32rpx 80rpx rgba(9, 87, 222, 0.1);
  }
  .auth-mobile-logo {
    display: none;
  }
}
</style>
