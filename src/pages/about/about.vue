<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '关于三生制药招聘',
    backgroundColor: '#F6F8FC',
  },
})
</script>

<template>
  <view class="app-page px-24rpx py-32rpx">
    <view class="rounded-24rpx bg-white p-32rpx shadow-[0_12rpx_36rpx_rgba(42,92,178,0.08)]">
      <text class="block text-34rpx font-700">三生制药招聘</text>
      <text class="mt-14rpx block text-24rpx text-[#7f8ca1] leading-7">帮助你发现合适岗位、完善求职资料并持续跟进职业进展。</text>
    </view>
    <wd-cell-group custom-class="mt-24rpx overflow-hidden rounded-24rpx">
      <wd-cell title="服务版本" value="1.0.0" />
      <wd-cell title="用户协议" is-link to="/pages/auth/agreement" />
      <wd-cell title="隐私政策" is-link to="/pages/auth/privacy" />
    </wd-cell-group>
  </view>
</template>
