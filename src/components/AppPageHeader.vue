<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  light?: boolean
  transparent?: boolean
  background?: string
}>(), {
  light: false,
  transparent: false,
  background: '',
})

let statusBarHeight = 0

try {
  statusBarHeight = uni.getWindowInfo?.().statusBarHeight || uni.getSystemInfoSync().statusBarHeight || 0
}
catch {
  statusBarHeight = 0
}

const safeAreaStyle = statusBarHeight > 0 ? { paddingTop: `${statusBarHeight}px` } : undefined
const headerStyle = props.background
  ? { ...safeAreaStyle, background: props.background }
  : safeAreaStyle
</script>

<template>
  <view class="app-page-header-anchor" :style="safeAreaStyle">
    <view
      class="app-page-header"
      :class="{
        'app-page-header--light': light,
        'app-page-header--transparent': transparent,
      }"
      :style="headerStyle"
    >
      <view class="app-page-header__bar">
        <view class="app-page-header__side app-page-header__side--left">
          <slot name="left" />
        </view>
        <text class="app-page-header__title">{{ title }}</text>
        <view class="app-page-header__side app-page-header__side--right">
          <slot name="right" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.app-page-header-anchor {
  height: 96rpx;
  box-sizing: content-box;
  padding-top: env(safe-area-inset-top);
}

.app-page-header {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  height: 96rpx;
  box-sizing: content-box;
  color: #202b3c;
  background: #fff;
  padding-top: env(safe-area-inset-top);
}

.app-page-header--transparent {
  background: transparent;
}

.app-page-header--light {
  color: #fff;
}

.app-page-header__bar {
  display: flex;
  position: relative;
  height: 96rpx;
  align-items: center;
  justify-content: center;
}

.app-page-header__title {
  max-width: calc(100% - 200rpx);
  overflow: hidden;
  font-size: 35rpx;
  font-weight: 700;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-page-header__side {
  display: flex;
  position: absolute;
  top: 0;
  width: 96rpx;
  height: 96rpx;
  align-items: center;
  justify-content: center;
}

.app-page-header__side--left {
  left: 24rpx;
}

.app-page-header__side--right {
  right: 24rpx;
}
</style>
