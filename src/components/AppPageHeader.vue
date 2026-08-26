<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  light?: boolean
  transparent?: boolean
  background?: string
  scrolled?: boolean
  scrolledBackground?: string
  scrolledLight?: boolean
}>(), {
  light: false,
  transparent: false,
  background: '',
  scrolled: false,
  scrolledBackground: '#ffffff',
  scrolledLight: false,
})

let statusBarHeight = 0

try {
  statusBarHeight = uni.getWindowInfo?.().statusBarHeight || uni.getSystemInfoSync().statusBarHeight || 0
}
catch {
  statusBarHeight = 0
}

const safeAreaStyle = statusBarHeight > 0 ? { paddingTop: `${statusBarHeight}px` } : undefined
const headerStyle = computed(() => {
  const background = props.scrolled ? props.scrolledBackground : props.background
  return background ? { ...safeAreaStyle, background } : safeAreaStyle
})
</script>

<template>
  <view class="box-content h-96rpx pt-safe" :style="safeAreaStyle">
    <view
      class="transition-[background,box-shadow,color] fixed inset-x-0 top-0 z-100 box-content h-96rpx duration-180 ease-out pt-safe"
      :class="[
        scrolled ? 'shadow-[0_8rpx_24rpx_rgba(31,42,61,0.1)]' : '',
        scrolled ? (scrolledLight ? 'text-white' : 'text-[#202b3c]') : (light ? 'text-white' : 'text-[#202b3c]'),
        transparent && !scrolled ? 'bg-transparent' : 'bg-white',
      ]"
      :style="headerStyle"
    >
      <view class="relative h-96rpx flex items-center justify-center">
        <view class="absolute left-24rpx top-0 h-96rpx w-96rpx flex items-center justify-center">
          <slot name="left" />
        </view>
        <text class="max-w-[calc(100%_-_200rpx)] overflow-hidden text-ellipsis whitespace-nowrap text-35rpx font-700 leading-[1.35]">
          {{ title }}
        </text>
        <view class="absolute right-24rpx top-0 h-96rpx w-96rpx flex items-center justify-center">
          <slot name="right" />
        </view>
      </view>
    </view>
  </view>
</template>
