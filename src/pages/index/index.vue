<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue'
import FgTabbar from '@/tabbar/index.vue'

defineOptions({
  name: 'Home',
})

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
    backgroundColor: '#F4F7FB',
  },
})

const banners = [
  {
    title: '加入三生 · 共创新生',
    description: '构建你与三生的每一次相遇',
    background: 'linear-gradient(118deg, #216de5 0%, #297ff3 54%, #3e91f6 100%)',
  },
  {
    title: '遇见更好的职业机会',
    description: '与优秀的人一起，成就专业价值',
    background: 'linear-gradient(118deg, #5367e8 0%, #7269ee 52%, #9277ef 100%)',
  },
]

const quickEntries = [
  { title: '社会招聘', icon: 'i-carbon-document' },
  { title: '校园招聘', icon: 'i-carbon-bookmark' },
  { title: '求职工作台', icon: 'i-carbon-task' },
  { title: '内部推荐', icon: 'i-carbon-chat' },
]

const popularJobs = [
  { title: '生物药研发高级研究员', detail: '上海 · 硕士 · 3-5年', salary: '25-40K' },
  { title: '医学联络官（MSL）', detail: '北京 · 本科 · 1-3年', salary: '20-35K' },
  { title: '质量注册专员', detail: '沈阳 · 本科 · 经验不限', salary: '12-18K' },
]

function switchToTab(pagePath: string) {
  uni.switchTab({
    url: `/${pagePath}`,
  })
}
</script>

<template>
  <view class="home-page">
    <AppPageHeader title="三生制药招聘" />

    <view class="home-content">
      <swiper
        class="home-banner"
        circular
        autoplay
        :interval="4200"
        :duration="420"
        indicator-dots
        indicator-color="rgba(255, 255, 255, 0.45)"
        indicator-active-color="#FFFFFF"
      >
        <swiper-item v-for="banner in banners" :key="banner.title">
          <view class="home-banner__slide" :style="{ background: banner.background }">
            <text class="home-banner__title">{{ banner.title }}</text>
            <text class="home-banner__description">{{ banner.description }}</text>
          </view>
        </swiper-item>
      </swiper>

      <view class="ai-entry" role="button" @tap="switchToTab('pages/ai-chat/index')">
        <view class="ai-entry__icon i-carbon-chat" />
        <view class="ai-entry__copy">
          <text class="ai-entry__title">麟才寻你 · AI 对话</text>
          <text class="ai-entry__description">AI 帮你匹配岗位、一键投递</text>
        </view>
        <view class="ai-entry__action">
          <text>聊一聊</text>
          <view class="i-carbon-arrow-right" />
        </view>
      </view>

      <view class="quick-card">
        <view
          v-for="entry in quickEntries"
          :key="entry.title"
          class="quick-entry"
          role="button"
          @tap="switchToTab(entry.title === '求职工作台' ? 'pages/me/me' : 'pages/position/index')"
        >
          <view v-if="entry.title === '社会招聘'" class="quick-entry__icon quick-entry__icon--blue">
            <view class="quick-entry__symbol i-carbon-document" />
          </view>
          <view v-else-if="entry.title === '校园招聘'" class="quick-entry__icon quick-entry__icon--cyan">
            <view class="quick-entry__symbol i-carbon-bookmark" />
          </view>
          <view v-else-if="entry.title === '求职工作台'" class="quick-entry__icon quick-entry__icon--green">
            <view class="quick-entry__symbol i-carbon-task" />
          </view>
          <view v-else class="quick-entry__icon quick-entry__icon--orange">
            <view class="quick-entry__symbol i-carbon-chat" />
          </view>
          <text>{{ entry.title }}</text>
        </view>
      </view>

      <view class="section-heading">
        <text class="section-heading__title">热门岗位</text>
        <view class="section-heading__action" role="button" @tap="switchToTab('pages/position/index')">
          <text>查看全部</text>
          <view class="i-carbon-chevron-right" />
        </view>
      </view>

      <view class="job-list">
        <view v-for="job in popularJobs" :key="job.title" class="job-card" role="button" @tap="switchToTab('pages/position/index')">
          <view class="job-card__main">
            <text class="job-card__title">{{ job.title }}</text>
            <text class="job-card__detail">{{ job.detail }}</text>
          </view>
          <text class="job-card__salary">{{ job.salary }}</text>
        </view>
      </view>
    </view>
    <!-- #ifndef MP-WEIXIN -->
    <FgTabbar />
    <!-- #endif -->
  </view>
</template>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
  color: #1e293b;
  background: #f4f7fb;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}

.home-content {
  padding: 24rpx 20rpx 0;
}

.home-banner {
  height: 218rpx;
  overflow: hidden;
  border-radius: 22rpx;
}

.home-banner__slide {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  align-items: center;
  padding: 0 40rpx 24rpx;
  color: #fff;
  flex-direction: column;
  justify-content: center;
}

.home-banner__title {
  font-size: 37rpx;
  font-weight: 700;
  letter-spacing: 2rpx;
}

.home-banner__description {
  margin-top: 14rpx;
  font-size: 24rpx;
  opacity: 0.86;
}

.ai-entry {
  display: flex;
  min-height: 124rpx;
  align-items: center;
  margin-top: 26rpx;
  padding: 0 26rpx;
  border-radius: 22rpx;
  background: linear-gradient(100deg, #f7e9ff 0%, #f3e8ff 46%, #efe3ff 100%);
  cursor: pointer;
}

.ai-entry:active,
.quick-entry:active,
.job-card:active {
  opacity: 0.76;
}

.ai-entry__icon {
  display: flex;
  width: 80rpx;
  height: 80rpx;
  align-items: center;
  justify-content: center;
  border-radius: 20rpx;
  color: #fff;
  font-size: 45rpx;
  background: #7c32d9;
}

.ai-entry__copy {
  display: flex;
  min-width: 0;
  flex: 1;
  margin-left: 20rpx;
  flex-direction: column;
}

.ai-entry__title {
  color: #2d2638;
  font-size: 27rpx;
  font-weight: 700;
}

.ai-entry__description {
  margin-top: 8rpx;
  color: #897c94;
  font-size: 21rpx;
}

.ai-entry__action {
  display: flex;
  height: 56rpx;
  align-items: center;
  padding: 0 18rpx;
  border-radius: 28rpx;
  color: #fff;
  background: #7c32d9;
  font-size: 24rpx;
  font-weight: 600;
}

.ai-entry__action view {
  margin-left: 4rpx;
  font-size: 23rpx;
}

.quick-card,
.job-list {
  border-radius: 22rpx;
  background: #fff;
}

.quick-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx 16rpx;
  margin-top: 24rpx;
  padding: 34rpx 20rpx 32rpx;
}

.quick-entry {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  font-size: 25rpx;
  font-weight: 600;
}

.quick-entry__icon {
  display: flex;
  width: 78rpx;
  height: 78rpx;
  align-items: center;
  justify-content: center;
  margin-bottom: 14rpx;
  border-radius: 20rpx;
  color: #fff;
  font-size: 42rpx;
}

.quick-entry__icon :deep(.wd-icon) {
  display: block;
  line-height: 1;
}

.quick-entry__symbol {
  display: block;
  width: 44rpx;
  height: 44rpx;
  color: #fff;
  font-size: 44rpx;
  line-height: 1;
}

.quick-entry__icon--blue {
  background:
    linear-gradient(#fff, #fff) center / 34rpx 28rpx no-repeat,
    #2571e6;
}

.quick-entry__icon--cyan {
  background: radial-gradient(circle, #fff 0 17rpx, transparent 18rpx), #25bec3;
}

.quick-entry__icon--green {
  background:
    linear-gradient(#fff, #fff) center / 12rpx 34rpx no-repeat,
    #16bd8e;
}

.quick-entry__icon--orange {
  background: radial-gradient(circle, #fff 0 17rpx, transparent 18rpx), #ff7c0b;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 34rpx 10rpx 16rpx;
}

.section-heading__title {
  font-size: 31rpx;
  font-weight: 700;
}

.section-heading__action {
  display: flex;
  align-items: center;
  color: #8d99a9;
  font-size: 23rpx;
}

.section-heading__action view {
  margin-left: 2rpx;
  font-size: 26rpx;
}

.job-list {
  padding: 0 26rpx;
}

.job-card {
  display: flex;
  min-height: 118rpx;
  align-items: center;
  border-bottom: 1rpx solid #edf1f6;
  cursor: pointer;
}

.job-card:last-child {
  border-bottom: 0;
}

.job-card__main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.job-card__title {
  overflow: hidden;
  font-size: 27rpx;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.job-card__detail {
  margin-top: 12rpx;
  color: #909bad;
  font-size: 21rpx;
}

.job-card__salary {
  margin-left: 20rpx;
  color: #ff7311;
  font-size: 25rpx;
  font-weight: 700;
}
</style>
