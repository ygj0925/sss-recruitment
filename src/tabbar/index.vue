<script setup lang="ts">
import { ref } from 'vue'
import { customTabbarEnable, needHideNativeTabbar } from './config'
import { setTabbarItem } from './i18n'
import { normalizeRoutePath, tabbarList, tabbarStore } from './store'
import TabbarItem from './TabbarItem.vue'

// #ifdef MP-WEIXIN
defineOptions({
  virtualHost: true,
})
// #endif

const AI_PAGE_PATH = '/pages/ai-chat/index'
const shouldShowTabbar = ref(true)

function syncTabbarVisibility() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  shouldShowTabbar.value = normalizeRoutePath(currentPage?.route) !== AI_PAGE_PATH
}

function handleClickBulge(index: number) {
  const item = tabbarList.value[index]
  if (!item) {
    return
  }

  uni.switchTab({
    url: item.pagePath,
    success() {
      tabbarStore.setCurIdx(index)
    },
  })
}

function handleClick(index: number) {
  if (index === tabbarStore.curIdx) {
    return
  }
  const list = tabbarList.value
  if (!list[index]) {
    return
  }
  if (list[index].isBulge) {
    handleClickBulge(index)
    return
  }
  const url = list[index].pagePath
  tabbarStore.setCurIdx(index)
  uni.switchTab({ url })
}

// #ifndef MP-WEIXIN || MP-ALIPAY
onLoad(() => {
  needHideNativeTabbar
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
  })
})
// #endif

// #ifdef MP-ALIPAY
onMounted(() => {
  customTabbarEnable
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
  })
})
// #endif

const activeColor = 'var(--wot-color-theme, #1890ff)'
const inactiveColor = '#666'

function getColorByIndex(index: number) {
  return tabbarStore.curIdx === index ? activeColor : inactiveColor
}

onShow(() => {
  syncTabbarVisibility()
  tabbarStore.syncCurIdxByCurrentPageAsync()
  setTabbarItem()
})

onMounted(syncTabbarVisibility)
</script>

<template>
  <view v-if="customTabbarEnable && shouldShowTabbar">
    <view class="border-and-fixed bg-white" @touchmove.stop.prevent>
      <view class="h-50px flex items-center">
        <view
          v-for="(item, index) in tabbarList"
          :key="index"
          class="flex flex-1 flex-col items-center justify-center"
          :style="{ color: getColorByIndex(index) }"
          @click="handleClick(index)"
        >
          <view v-if="item.isBulge" class="relative">
            <view class="bulge">
              <TabbarItem :item="item" :index="index" class="text-center" is-bulge />
            </view>
          </view>
          <TabbarItem v-else :item="item" :index="index" class="relative px-3 text-center" />
        </view>
      </view>

      <view class="pb-safe" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.border-and-fixed {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  border-top: 1px solid #eee;
}

.bulge {
  position: absolute;
  top: -20px;
  left: 50%;
  width: 250rpx;
  height: 250rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: inset 0 0 0 1px #fefefe;
  transform: translateX(-50%) scale(0.5) translateY(-33%);
  transform-origin: top center;
}
</style>
