<script setup lang="ts">
import FgTabbar from '@/tabbar/index.vue'

defineOptions({
  name: 'Position',
})

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '职位',
    backgroundColor: '#F4F7FB',
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
  <view class="position-page">
    <view class="position-nav pt-safe">
      <view class="position-nav__bar">
        <text>职位</text>
      </view>
    </view>

    <view class="position-content">
      <view class="search-entry" role="button" @tap="showJobDetail">
        <view class="i-carbon-search" />
        <text>搜索职位、城市或关键词</text>
      </view>

      <view class="filter-row">
        <text class="filter-row__active">推荐</text>
        <text>研发</text>
        <text>医学</text>
        <text>市场</text>
        <text>职能</text>
      </view>

      <view class="job-list">
        <view v-for="job in jobs" :key="job.title" class="job-card" role="button" @tap="showJobDetail">
          <view class="job-card__top">
            <text class="job-card__title">{{ job.title }}</text>
            <text class="job-card__salary">{{ job.salary }}</text>
          </view>
          <text class="job-card__detail">{{ job.location }} · {{ job.education }} · {{ job.experience }}</text>
          <view class="job-card__tags">
            <text v-for="tag in job.tags" :key="tag">{{ tag }}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- #ifndef MP-WEIXIN -->
    <FgTabbar />
    <!-- #endif -->
  </view>
</template>

<style scoped lang="scss">
.position-page {
  min-height: 100vh;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
  color: #202b3c;
  background: #f4f7fb;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}

.position-nav {
  background: #fff;
}

.position-nav__bar {
  display: flex;
  height: 96rpx;
  align-items: center;
  justify-content: center;
  font-size: 35rpx;
  font-weight: 700;
}

.position-content {
  padding: 24rpx 24rpx 0;
}

.search-entry {
  display: flex;
  height: 82rpx;
  align-items: center;
  padding: 0 24rpx;
  border-radius: 16rpx;
  color: #9ba6b5;
  background: #fff;
  font-size: 25rpx;
}

.search-entry view {
  margin-right: 12rpx;
  color: #4f83ed;
  font-size: 30rpx;
}

.filter-row {
  display: flex;
  justify-content: space-between;
  padding: 28rpx 10rpx 22rpx;
  color: #8c98a8;
  font-size: 25rpx;
}

.filter-row__active {
  color: #3478f6;
  font-weight: 700;
}

.job-list {
  display: flex;
  gap: 18rpx;
  flex-direction: column;
}

.job-card {
  padding: 28rpx;
  border-radius: 20rpx;
  background: #fff;
  cursor: pointer;
}

.job-card:active {
  opacity: 0.74;
}

.job-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.job-card__title {
  overflow: hidden;
  min-width: 0;
  flex: 1;
  font-size: 29rpx;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.job-card__salary {
  margin-left: 18rpx;
  color: #ff7311;
  font-size: 27rpx;
  font-weight: 700;
}

.job-card__detail {
  display: block;
  margin-top: 16rpx;
  color: #8491a2;
  font-size: 23rpx;
}

.job-card__tags {
  display: flex;
  gap: 12rpx;
  margin-top: 20rpx;
}

.job-card__tags text {
  padding: 5rpx 12rpx;
  border-radius: 8rpx;
  color: #4e7fe0;
  background: #eff5ff;
  font-size: 22rpx;
}
</style>
