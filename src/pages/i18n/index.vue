<script setup lang="ts">
import i18n, { t } from '@/locale/index'
import { setTabbarItem } from '@/tabbar/i18n'

definePage({
  style: {
    navigationBarTitleText: '%i18n.title%',
    backgroundColor: '#EDF6FF',
  },
})

const current = ref(uni.getLocale())
const languages = [
  { value: 'zh-Hans', name: '简体中文' },
  { value: 'en', name: 'English' },
]

function radioChange(evt: any) {
  current.value = evt.detail.value
  uni.setLocale(evt.detail.value)
  i18n.global.locale = evt.detail.value
  setTabbarItem()
  uni.setNavigationBarTitle({ title: t('i18n.title') })
}
</script>

<template>
  <view class="app-page px-24rpx py-32rpx">
    <view class="rounded-24rpx bg-white p-32rpx shadow-[0_12rpx_36rpx_rgba(42,92,178,0.08)]">
      <text class="block text-32rpx font-700">{{ $t('i18n.title') }}</text>
      <text class="mt-12rpx block text-24rpx text-[#7f8ca1] leading-7">选择语言后，应用标题和已配置的文本会立即更新。</text>
    </view>
    <wd-cell-group custom-class="mt-24rpx overflow-hidden rounded-24rpx">
      <radio-group @change="radioChange">
        <label v-for="language in languages" :key="language.value" class="min-h-100rpx flex items-center justify-between px-28rpx">
          <text class="text-27rpx">{{ language.name }}</text>
          <radio :value="language.value" :checked="language.value === current" color="#2C8CF4" />
        </label>
      </radio-group>
    </wd-cell-group>
  </view>
</template>
