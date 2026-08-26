<script setup lang="ts">
import { customTabbarEnable, needHideNativeTabbar } from './config'
import { setTabbarItem } from './i18n'
import { tabbarList, tabbarStore } from './store'
import TabbarItem from './TabbarItem.vue'

// #ifdef MP-WEIXIN
defineOptions({
  virtualHost: true,
})
// #endif

function handleClickBulge() {
  uni.showToast({
    title: '点击了中间操作按钮',
    icon: 'none',
  })
}

function handleClick(index: number) {
  if (index === tabbarStore.curIdx) {
    return
  }

  const item = tabbarList.value[index]
  if (!item) {
    return
  }

  if (item.isBulge) {
    handleClickBulge()
    return
  }

  tabbarStore.setCurIdx(index)
  uni.switchTab({ url: item.pagePath })
}

// #ifndef MP-WEIXIN || MP-ALIPAY
onLoad(() => {
  if (needHideNativeTabbar) {
    uni.hideTabBar({
      fail(err) {
        console.log('hideTabBar fail: ', err)
      },
    })
  }
})
// #endif

// #ifdef MP-ALIPAY
onMounted(() => {
  if (customTabbarEnable) {
    uni.hideTabBar({
      fail(err) {
        console.log('hideTabBar fail: ', err)
      },
    })
  }
})
// #endif

const activeColor = 'var(--app-brand-blue, #2c8cf4)'
const inactiveColor = '#7f8997'

function getColorByIndex(index: number) {
  return tabbarStore.curIdx === index ? activeColor : inactiveColor
}

onShow(() => {
  tabbarStore.syncCurIdxByCurrentPageAsync()
  setTabbarItem()
})
</script>

<template>
  <view
    class="fixed inset-x-0 bottom-0 z-1000 box-border border-t-1rpx border-t-[#e8edf4] border-t-solid bg-white shadow-[0_-4rpx_18rpx_rgba(44,70,118,0.05)] pb-safe"
    role="navigation"
    aria-label="主导航"
    @touchmove.stop.prevent
  >
    <view class="h-108rpx flex items-stretch">
      <view
        v-for="(item, index) in tabbarList"
        :key="item.pagePath"
        class="min-w-0 flex flex-1 cursor-pointer items-center justify-center active:opacity-72"
        :style="{ color: getColorByIndex(index) }"
        role="button"
        :aria-current="tabbarStore.curIdx === index ? 'page' : undefined"
        @click="handleClick(index)"
      >
        <TabbarItem :item="item" :index="index" />
      </view>
    </view>
  </view>
</template>
