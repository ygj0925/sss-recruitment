<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  align?: 'center' | 'left'
  prominent?: boolean
  light?: boolean
  transparent?: boolean
  background?: string
  scrolled?: boolean
  scrolledBackground?: string
  scrolledLight?: boolean
}>(), {
  align: 'center',
  prominent: false,
  light: false,
  transparent: false,
  background: '',
  scrolled: false,
  scrolledBackground: 'rgba(237, 246, 255, 0.96)',
  scrolledLight: false,
})

let statusBarHeight = 0

try {
  statusBarHeight = uni.getWindowInfo?.().statusBarHeight || uni.getSystemInfoSync().statusBarHeight || 0
}
catch {
  statusBarHeight = 0
}

let safeAreaTop = `${statusBarHeight}px`
// #ifdef H5
safeAreaTop = 'env(safe-area-inset-top)'
// #endif

const safeAreaStyle = { paddingTop: safeAreaTop }
const headerStyle = computed(() => {
  const background = props.scrolled ? props.scrolledBackground : props.background
  return background ? { ...safeAreaStyle, background } : safeAreaStyle
})
</script>

<template>
  <view class="box-content h-96rpx" :style="safeAreaStyle">
    <view
      class="app-page-header transition-[background,box-shadow,color] fixed inset-x-0 top-0 z-100 box-content h-96rpx duration-180 ease-out"
      :class="[
        scrolled ? 'app-page-header--scrolled' : '',
        scrolled ? (scrolledLight ? 'text-white' : 'text-[#121c39]') : (light ? 'text-white' : 'text-[#121c39]'),
        transparent && !scrolled ? 'bg-transparent' : 'bg-[rgba(237,246,255,0.96)]',
      ]"
      :style="headerStyle"
    >
      <view
        class="relative h-96rpx flex items-center px-24rpx"
        :class="align === 'left' ? 'justify-start' : 'justify-center'"
      >
        <view class="absolute left-24rpx top-0 h-96rpx w-96rpx flex items-center justify-center">
          <slot name="left" />
        </view>
        <text
          class="overflow-hidden text-ellipsis whitespace-nowrap leading-[1.35] tracking-1rpx"
          :class="[
            align === 'left' ? 'max-w-[calc(100%_-_130rpx)]' : 'max-w-[calc(100%_-_220rpx)]',
            prominent ? 'text-40rpx font-700' : 'text-34rpx font-600',
          ]"
        >
          {{ title }}
        </text>
        <view class="absolute right-24rpx top-0 h-96rpx w-96rpx flex items-center justify-center">
          <slot name="right" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.app-page-header {
  border-bottom: 1rpx solid transparent;
}

.app-page-header--scrolled {
  border-bottom-color: rgba(107, 139, 204, 0.14);
  box-shadow: 0 8rpx 24rpx rgba(55, 94, 174, 0.1);
}
</style>
