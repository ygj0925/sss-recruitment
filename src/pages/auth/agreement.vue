<script setup lang="ts">
import AuthLayout from './components/AuthLayout.vue'

definePage({
  excludeLoginPath: true,
  style: { navigationStyle: 'custom', navigationBarTitleText: '用户协议' },
})

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <AuthLayout title="用户协议" subtitle="请仔细阅读以下内容" @back="goBack">
    <view class="agreement-content">
      <text class="agreement-content__updated">更新日期：2026 年 8 月 26 日</text>
      <text class="agreement-content__heading">一、服务说明</text>
      <text>本协议用于说明本应用向你提供账号登录、求职信息浏览与职业服务时的基本规则。使用服务前，请确认你已理解并同意本协议。</text>
      <text class="agreement-content__heading">二、账号与安全</text>
      <text>请妥善保管你的登录凭证，不得将账号提供给他人使用。你应对通过本人账号发生的操作负责；发现异常时请及时联系我们。</text>
      <text class="agreement-content__heading">三、信息使用</text>
      <text>我们仅在实现服务、安全保障和法律法规允许的范围内处理必要信息。涉及手机号、微信授权凭证等信息时，会在具体操作前向你说明用途。</text>
      <text class="agreement-content__heading">四、开发演示说明</text>
      <text>当前认证流程中的短信、注册、绑定和密码重置为前端演示交互，尚未连接生产服务，不会创建账号、修改密码或保存模拟登录态。</text>
      <text class="agreement-content__heading">五、联系我们</text>
      <text>如对本协议或服务有疑问，请通过项目运营方提供的正式支持渠道联系。</text>
    </view>
  </AuthLayout>
</template>

<style scoped lang="scss">
.agreement-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  color: #475467;
  font-size: 24rpx;
  line-height: 1.85;
}
.agreement-content__updated {
  color: #98a2b3;
  font-size: 22rpx;
}
.agreement-content__heading {
  margin-top: 20rpx;
  color: #1f2937;
  font-size: 28rpx;
  font-weight: 700;
}
</style>
