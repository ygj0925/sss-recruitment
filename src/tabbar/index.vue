<script setup lang="ts">
import { customTabbarEnable, needHideNativeTabbar, tabbarCacheEnable } from './config'
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
  if (tabbarCacheEnable) {
    uni.switchTab({ url: item.pagePath })
  }
  else {
    uni.navigateTo({ url: item.pagePath })
  }
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

const activeColor = 'var(--wot-color-theme, #3478f6)'
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
  <view class="custom-tabbar-spacer">
    <view class="custom-tabbar" @touchmove.stop.prevent>
      <view class="custom-tabbar__items">
        <view
          v-for="(item, index) in tabbarList"
          :key="item.pagePath"
          class="custom-tabbar__item"
          :style="{ color: getColorByIndex(index) }"
          @click="handleClick(index)"
        >
          <TabbarItem :item="item" :index="index" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.custom-tabbar-spacer {
  height: 108rpx;
  padding-bottom: env(safe-area-inset-bottom);
}

.custom-tabbar {
  position: fixed;
  z-index: 1000;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1rpx solid #e8edf4;
  background: #fff;
  box-shadow: 0 -4rpx 18rpx rgba(44, 70, 118, 0.05);
}

.custom-tabbar__items {
  display: flex;
  height: 108rpx;
  align-items: stretch;
}

.custom-tabbar__item {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.custom-tabbar__item:active {
  opacity: 0.72;
}
</style>
