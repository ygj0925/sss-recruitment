<script setup lang="ts">
import type { CustomTabBarItem } from './types'
import { getI18nText } from './i18n'
import { tabbarStore } from './store'

defineProps<{
  item: CustomTabBarItem
  index: number
  isBulge?: boolean
}>()

function getImageByIndex(index: number, item: CustomTabBarItem) {
  if (!item.iconActive) {
    return item.icon
  }
  return tabbarStore.curIdx === index ? item.iconActive : item.icon
}
</script>

<template>
  <view class="relative min-w-0 flex flex-col items-center justify-center color-inherit">
    <view
      v-if="item.iconType === 'unocss' || item.iconType === 'iconfont'"
      class="h-42rpx w-42rpx text-42rpx color-inherit leading-none"
      :class="item.icon"
      aria-hidden="true"
    />
    <image
      v-else-if="item.iconType === 'image'"
      :src="getImageByIndex(index, item)"
      mode="aspectFit"
      class="h-42rpx w-42rpx"
      aria-hidden="true"
    />
    <view v-if="!isBulge" class="mt-6rpx whitespace-nowrap text-21rpx color-inherit leading-[1.2]">
      {{ getI18nText(item.text) }}
    </view>
    <view
      v-if="item.badge"
      class="absolute right-8rpx top-8rpx h-12rpx min-w-12rpx flex items-center justify-center rounded-full bg-[#f05d69] px-5rpx text-18rpx text-white"
    >
      {{ item.badge === 'dot' ? '' : item.badge > 99 ? '99+' : item.badge }}
    </view>
  </view>
</template>
