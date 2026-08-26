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
  <view class="tabbar-item">
    <view
      v-if="item.iconType === 'unocss' || item.iconType === 'iconfont'"
      class="tabbar-item__icon"
      :class="item.icon"
    />
    <image
      v-else-if="item.iconType === 'image'"
      :src="getImageByIndex(index, item)"
      mode="aspectFit"
      class="tabbar-item__image"
    />
    <view v-if="!isBulge" class="tabbar-item__label">
      {{ getI18nText(item.text) }}
    </view>
    <view v-if="item.badge" class="tabbar-item__badge rounded-full">
      {{ item.badge === 'dot' ? '' : item.badge > 99 ? '99+' : item.badge }}
    </view>
  </view>
</template>

<style scoped lang="scss">
.tabbar-item {
  display: flex;
  position: relative;
  min-width: 0;
  align-items: center;
  justify-content: center;
  color: inherit;
  flex-direction: column;
}

.tabbar-item__icon {
  width: 42rpx;
  height: 42rpx;
  color: inherit;
  font-size: 42rpx;
  line-height: 1;
}

.tabbar-item__image {
  width: 42rpx;
  height: 42rpx;
}

.tabbar-item__label {
  margin-top: 6rpx;
  color: inherit;
  font-size: 21rpx;
  line-height: 1.2;
  white-space: nowrap;
}

.tabbar-item__badge {
  position: absolute;
  top: 8rpx;
  right: 8rpx;
  display: flex;
  min-width: 12rpx;
  height: 12rpx;
  align-items: center;
  justify-content: center;
  padding: 0 5rpx;
  border-radius: 16rpx;
  color: #fff;
  background: #f05d69;
  font-size: 18rpx;
}
</style>
