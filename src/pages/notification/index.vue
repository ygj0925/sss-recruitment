<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue'

defineOptions({
  name: 'Notification',
})

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '通知',
    backgroundColor: '#F6F8FC',
  },
})

const notifications = [
  { title: '欢迎来到三生制药招聘', description: '完善你的求职意向，获取更精准的岗位推荐。', time: '刚刚', unread: true },
  { title: 'AI 助手已准备就绪', description: '聊一聊，让 AI 帮你发现匹配的职位。', time: '今天', unread: false },
]
</script>

<template>
  <view class="app-tab-page font-[Noto_Sans_SC,Microsoft_YaHei,sans-serif]">
    <AppPageHeader title="通知" />

    <view class="flex flex-col gap-18rpx p-24rpx">
      <view v-for="notification in notifications" :key="notification.title" class="relative flex items-start rounded-20rpx bg-white p-26rpx">
        <view class="i-carbon-notification mr-18rpx h-64rpx w-64rpx flex flex-[0_0_64rpx] items-center justify-center rounded-18rpx bg-brand-blue text-34rpx text-white" />
        <view class="min-w-0 flex-1">
          <view class="flex items-center justify-between">
            <text class="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-27rpx font-700">{{ notification.title }}</text>
            <text class="ml-12rpx text-24rpx text-[#9da7b5]">{{ notification.time }}</text>
          </view>
          <text class="mt-12rpx block text-23rpx text-[#8491a2] leading-[1.5]">{{ notification.description }}</text>
        </view>
        <view v-if="notification.unread" class="absolute right-20rpx top-20rpx h-12rpx w-12rpx rounded-full bg-[#ef5260]" />
      </view>
    </view>
  </view>
</template>
