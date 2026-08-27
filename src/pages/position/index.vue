<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue'

defineOptions({
  name: 'Position',
})

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '职位',
    backgroundColor: '#EDF6FF',
  },
})

const jobs = [
  { title: '生物药研发高级研究员', location: '上海', education: '硕士', experience: '3-5年', salary: '25-40K', tags: ['创新药', '生物药'] },
  { title: '医学联络官（MSL）', location: '北京', education: '本科', experience: '1-3年', salary: '20-35K', tags: ['医学事务', '临床沟通'] },
  { title: '质量注册专员', location: '沈阳', education: '本科', experience: '经验不限', salary: '12-18K', tags: ['药品注册', '质量体系'] },
  { title: '招商主管', location: '广州', education: '大专', experience: '3-5年', salary: '15-25K', tags: ['招商主管', '医药商业'] },
]

function showJobDetail() {
  uni.showToast({
    title: '岗位详情即将开放',
    icon: 'none',
  })
}
</script>

<template>
  <view class="app-tab-page font-[Noto_Sans_SC,Microsoft_YaHei,sans-serif]">
    <AppPageHeader title="职位" />

    <view class="px-24rpx pt-24rpx">
      <view class="h-82rpx flex items-center rounded-16rpx bg-white px-24rpx text-25rpx text-[#9ba6b5]" role="button" @tap="showJobDetail">
        <view class="i-carbon-search mr-12rpx text-30rpx text-brand-blue" />
        <text>搜索职位、城市或关键词</text>
      </view>

      <view class="flex justify-between px-10rpx pb-22rpx pt-28rpx text-25rpx text-[#8c98a8]">
        <text class="text-brand-blue font-700">推荐</text>
        <text>研发</text>
        <text>医学</text>
        <text>市场</text>
        <text>职能</text>
      </view>

      <view class="flex flex-col gap-18rpx">
        <view v-for="job in jobs" :key="job.title" class="cursor-pointer rounded-20rpx bg-white p-28rpx active:opacity-74" role="button" @tap="showJobDetail">
          <view class="flex items-center justify-between">
            <text class="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-29rpx font-700">{{ job.title }}</text>
            <text class="ml-18rpx text-27rpx text-[#ff7311] font-700">{{ job.salary }}</text>
          </view>
          <text class="mt-16rpx block text-23rpx text-[#8491a2]">{{ job.location }} · {{ job.education }} · {{ job.experience }}</text>
          <view class="mt-20rpx flex gap-12rpx">
            <text v-for="tag in job.tags" :key="tag" class="rounded-8rpx bg-[#eff5ff] px-12rpx py-5rpx text-22rpx text-brand-blue">{{ tag }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
