<script setup lang="ts">
import { ref } from 'vue'
import AppPageHeader from '@/components/AppPageHeader.vue'

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

const headerScrolled = ref(false)
const headerBackground = 'linear-gradient(160deg, #28b7f3 0%, #3d94f3 40%, #705fed 68%, #f6f8fc 100%)'
const scrolledHeaderBackground = 'linear-gradient(100deg, #27b5f4 0%, #3d91f3 58%, #5f73ee 100%)'

function handleScroll(event: { detail: { scrollTop?: number } }) {
  headerScrolled.value = (event.detail.scrollTop || 0) > 16
}
</script>

<template>
  <view class="auth-page" :class="{ 'auth-page--scrolled': headerScrolled }">
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

    <!-- #ifndef H5 -->
    <AppPageHeader
      :title="title"
      light
      :background="headerBackground"
      :scrolled="headerScrolled"
      :scrolled-background="scrolledHeaderBackground"
      scrolled-light
    >
      <template #left>
        <view v-if="showBack" class="auth-back" role="button" aria-label="返回" @tap="emit('back')">
          <text>‹</text>
        </view>
        <view v-else class="auth-back auth-back--placeholder" />
      </template>
      <template #right>
        <view class="auth-help" aria-label="帮助">
          ?
        </view>
      </template>
    </AppPageHeader>
    <!-- #endif -->

    <scroll-view class="auth-scroll" scroll-y @scroll="handleScroll">
      <view class="auth-content">
        <!-- #ifdef H5 -->
        <view class="auth-topbar">
          <view v-if="showBack" class="auth-back" role="button" aria-label="返回" @tap="emit('back')">
            <text>‹</text>
          </view>
          <view v-else class="auth-back auth-back--placeholder" />
          <view class="auth-help" aria-label="帮助">
            ?
          </view>
        </view>
        <!-- #endif -->
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
/* #ifdef H5 */
:global(page),
.auth-page {
  -webkit-tap-highlight-color: transparent;
}
/* #endif */

.auth-page {
  display: flex;
  height: 100vh;
  min-height: 100vh;
  flex-direction: column;
  color: #263249;
  background: #f3f6fc;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}

.auth-scroll {
  height: 0;
  flex: 1;
}

.auth-content {
  position: relative;
  box-sizing: border-box;
  min-height: 100%;
  padding-bottom: calc(44rpx + env(safe-area-inset-bottom));
  overflow: hidden;
}

.auth-content::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 350rpx;
  border-radius: 0 0 52rpx 52rpx;
  content: '';
  background: linear-gradient(160deg, #28b7f3 0%, #3d94f3 40%, #705fed 68%, #f6f8fc 100%);
}

.auth-topbar,
.auth-card {
  position: relative;
  z-index: 1;
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
  width: 64rpx;
  height: 64rpx;
  align-items: center;
  justify-content: center;
  border: 1rpx solid rgba(255, 255, 255, 0.22);
  border-radius: 20rpx;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  cursor: pointer;
  font-size: 48rpx;
  line-height: 1;
}

.auth-back:active,
.auth-help:active {
  opacity: 0.74;
}

.auth-back--placeholder {
  visibility: hidden;
}

.auth-help {
  font-size: 26rpx;
  font-weight: 700;
}

.auth-page--scrolled .auth-back,
.auth-page--scrolled .auth-help {
  border-color: rgba(255, 255, 255, 0.28);
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: none;
}

.auth-card {
  box-sizing: border-box;
  width: calc(100% - 48rpx);
  max-width: 680rpx;
  margin: 44rpx auto 0;
  padding: 42rpx 40rpx 56rpx;
  border: 1rpx solid rgba(232, 237, 247, 0.92);
  border-radius: 36rpx;
  background: #fff;
  box-shadow: 0 24rpx 60rpx rgba(54, 82, 145, 0.12);
}

.auth-mobile-logo {
  display: block;
  width: 92rpx;
  height: 92rpx;
  margin: 0 auto 30rpx;
}

.auth-heading {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 54rpx;
  text-align: center;
}

.auth-heading__title {
  color: #263249;
  font-size: 42rpx;
  font-weight: 700;
  line-height: 1.35;
}

.auth-heading__subtitle {
  margin-top: 14rpx;
  color: #9aa5b8;
  font-size: 23rpx;
  line-height: 1.55;
}

.auth-promo {
  display: none;
}

@media screen and (min-width: 768px) {
  .auth-page {
    display: flex;
    min-height: 100vh;
    padding: 0;
    flex-direction: row;
  }

  .auth-promo {
    display: flex;
    position: relative;
    box-sizing: border-box;
    width: 48%;
    min-height: 100vh;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    padding: 96rpx 11%;
    color: #fff;
    background: linear-gradient(145deg, #3065f4, #467bff 56%, #6b5ae8);
  }

  .auth-promo__logo {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 72rpx;
    filter: brightness(0) invert(1);
  }

  .auth-promo__copy {
    display: flex;
    position: relative;
    z-index: 1;
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
    border: 1rpx solid rgba(255, 255, 255, 0.14);
    border-radius: 50%;
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
    background: rgba(255, 255, 255, 0.08);
  }

  .auth-scroll {
    width: 52%;
    height: 100vh;
    flex: none;
  }

  .auth-content {
    display: flex;
    box-sizing: border-box;
    min-height: 100%;
    flex-direction: column;
    padding: 0;
  }

  .auth-content::before {
    display: none;
  }

  .auth-topbar {
    padding: 36rpx 64rpx 0;
  }

  .auth-back,
  .auth-help {
    border-color: #e8edf7;
    color: #467bff;
    background: #fff;
    box-shadow: 0 10rpx 26rpx rgba(54, 82, 145, 0.08);
  }

  .auth-card {
    width: calc(100% - 128rpx);
    margin: auto;
    padding: 88rpx 96rpx;
    border-radius: 40rpx;
  }

  .auth-mobile-logo {
    display: none;
  }
}
</style>
