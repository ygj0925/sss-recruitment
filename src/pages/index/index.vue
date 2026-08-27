<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue'

defineOptions({
  name: 'Home',
})

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
    backgroundColor: '#EDF6FF',
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
  { title: '社会招聘', iconClass: 'i-carbon-document', backgroundClass: 'bg-brand-blue', pagePath: 'pages/position/index' },
  { title: '校园招聘', iconClass: 'i-carbon-bookmark', backgroundClass: 'bg-[#25bec3]', pagePath: 'pages/position/index' },
  { title: '求职工作台', iconClass: 'i-carbon-task', backgroundClass: 'bg-[#16bd8e]', pagePath: 'pages/me/me' },
  { title: '内部推荐', iconClass: 'i-carbon-chat', backgroundClass: 'bg-[#ff7c0b]', pagePath: 'pages/position/index' },
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
  <view class="app-tab-page font-['Noto_Sans_SC','Microsoft_YaHei',sans-serif]">
    <AppPageHeader title="三生制药招聘" />

    <view class="px-20rpx pt-24rpx">
      <swiper
        class="h-218rpx overflow-hidden rounded-22rpx"
        circular
        autoplay
        :interval="4200"
        :duration="420"
        indicator-dots
        indicator-color="rgba(255, 255, 255, 0.45)"
        indicator-active-color="#FFFFFF"
      >
        <swiper-item v-for="banner in banners" :key="banner.title">
          <view
            class="box-border h-full flex flex-col items-center justify-center px-40rpx pb-24rpx text-white"
            :style="{ background: banner.background }"
          >
            <text class="text-37rpx font-700 tracking-2rpx">{{ banner.title }}</text>
            <text class="mt-14rpx text-24rpx opacity-86">{{ banner.description }}</text>
          </view>
        </swiper-item>
      </swiper>

      <view
        class="mt-26rpx min-h-124rpx flex cursor-pointer items-center rounded-22rpx bg-[#eef0ff] px-26rpx active:opacity-76"
        role="button"
        @tap="switchToTab('pages/ai-chat/index')"
      >
        <view class="i-carbon-chat h-80rpx w-80rpx center rounded-20rpx bg-brand-violet text-45rpx text-white" />
        <view class="ml-20rpx min-w-0 flex flex-1 flex-col">
          <text class="text-27rpx text-app-ink font-700">麟才寻你 · AI 对话</text>
          <text class="mt-8rpx text-21rpx text-[#7f8997]">AI 帮你匹配岗位、一键投递</text>
        </view>
        <view class="h-56rpx flex items-center rounded-28rpx bg-brand-violet px-18rpx text-24rpx text-white font-600">
          <text>聊一聊</text>
          <view class="i-carbon-arrow-right ml-4rpx text-23rpx" />
        </view>
      </view>

      <view class="grid grid-cols-2 mt-24rpx gap-x-16rpx gap-y-30rpx app-card px-20rpx pb-32rpx pt-34rpx">
        <view
          v-for="entry in quickEntries"
          :key="entry.title"
          class="flex flex-col cursor-pointer items-center text-25rpx font-600 active:opacity-76"
          role="button"
          @tap="switchToTab(entry.pagePath)"
        >
          <view class="mb-14rpx h-78rpx w-78rpx center rounded-20rpx text-42rpx text-white" :class="entry.backgroundClass">
            <view class="block h-44rpx w-44rpx text-44rpx text-white leading-1" :class="entry.iconClass" />
          </view>
          <text>{{ entry.title }}</text>
        </view>
      </view>

      <view class="mx-10rpx mb-16rpx mt-34rpx flex items-center justify-between">
        <text class="text-31rpx font-700">热门岗位</text>
        <view
          class="flex cursor-pointer items-center text-23rpx text-[#7f8997] active:opacity-74"
          role="button"
          @tap="switchToTab('pages/position/index')"
        >
          <text>查看全部</text>
          <view class="i-carbon-chevron-right ml-2rpx text-26rpx" />
        </view>
      </view>

      <view class="app-card px-26rpx">
        <view
          v-for="job in popularJobs"
          :key="job.title"
          class="min-h-118rpx flex cursor-pointer items-center border-b-1rpx border-b-[#edf1f6] border-b-solid last:border-b-0 active:opacity-76"
          role="button"
          @tap="switchToTab('pages/position/index')"
        >
          <view class="min-w-0 flex flex-1 flex-col">
            <text class="overflow-hidden text-ellipsis whitespace-nowrap text-27rpx font-600">{{ job.title }}</text>
            <text class="mt-12rpx text-21rpx text-[#7f8997]">{{ job.detail }}</text>
          </view>
          <text class="ml-20rpx text-25rpx text-[#ff7311] font-700">{{ job.salary }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
