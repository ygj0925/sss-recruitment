<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue'
import FgTabbar from '@/tabbar/index.vue'

defineOptions({
  name: 'Notification',
})

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '通知',
    backgroundColor: '#F4F7FB',
  },
})

const notifications = [
  { title: '欢迎来到三生制药招聘', description: '完善你的求职意向，获取更精准的岗位推荐。', time: '刚刚', unread: true },
  { title: 'AI 助手已准备就绪', description: '聊一聊，让 AI 帮你发现匹配的职位。', time: '今天', unread: false },
]
</script>

<template>
  <view class="notification-page">
    <AppPageHeader title="通知" />

    <view class="notification-content">
      <view v-for="notification in notifications" :key="notification.title" class="notification-card">
        <view class="notification-card__icon i-carbon-notification" />
        <view class="notification-card__copy">
          <view class="notification-card__heading">
            <text class="notification-card__title">{{ notification.title }}</text>
            <text class="notification-card__time">{{ notification.time }}</text>
          </view>
          <text class="notification-card__description">{{ notification.description }}</text>
        </view>
        <view v-if="notification.unread" class="notification-card__dot" />
      </view>
    </view>
    <!-- #ifndef MP-WEIXIN -->
    <FgTabbar />
    <!-- #endif -->
  </view>
</template>

<style scoped lang="scss">
.notification-page {
  min-height: 100vh;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
  color: #202b3c;
  background: #f4f7fb;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}

.notification-content {
  display: flex;
  gap: 18rpx;
  padding: 24rpx;
  flex-direction: column;
}

.notification-card {
  display: flex;
  position: relative;
  align-items: flex-start;
  padding: 26rpx;
  border-radius: 20rpx;
  background: #fff;
}

.notification-card__icon {
  display: flex;
  width: 64rpx;
  height: 64rpx;
  flex: 0 0 64rpx;
  align-items: center;
  justify-content: center;
  margin-right: 18rpx;
  border-radius: 18rpx;
  color: #fff;
  background: #4c85ef;
  font-size: 34rpx;
}

.notification-card__copy {
  min-width: 0;
  flex: 1;
}

.notification-card__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-card__title {
  overflow: hidden;
  min-width: 0;
  flex: 1;
  font-size: 27rpx;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notification-card__time {
  margin-left: 12rpx;
  color: #9da7b5;
  font-size: 24rpx;
}

.notification-card__description {
  display: block;
  margin-top: 12rpx;
  color: #8491a2;
  font-size: 23rpx;
  line-height: 1.5;
}

.notification-card__dot {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #ef5260;
}
</style>
