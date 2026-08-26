<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()
const { userInfo } = storeToRefs(userStore)
const profileName = computed(() => userInfo.value.username || '求职者')
const profileInitial = computed(() => profileName.value.slice(0, 1))
const profileSummary = computed(() => tokenStore.hasLogin ? `账号：${profileName.value} · 求职档案已同步` : '登录后同步简历、沟通与投递进度')

async function handleLogin() {
  // #ifdef MP-WEIXIN
  await tokenStore.wxLogin()

  // #endif
  // #ifndef MP-WEIXIN
  uni.navigateTo({
    url: `${LOGIN_PAGE}`,
  })
  // #endif
}

function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        useTokenStore().logout()
        uni.showToast({
          title: '退出登录成功',
          icon: 'success',
        })
        // #ifdef MP-WEIXIN
        // uni.reLaunch({ url: '/pages/index/index' })
        // #endif
        // #ifndef MP-WEIXIN
        // uni.navigateTo({ url: LOGIN_PAGE })
        // #endif
      }
    },
  })
}
</script>

<template>
  <view class="profile-page">
    <view class="profile-hero">
      <view class="profile-hero__top">
        <text class="profile-hero__eyebrow">CAREER CENTER</text>
        <view class="profile-hero__status" :class="{ 'profile-hero__status--active': tokenStore.hasLogin }">
          <view class="profile-hero__status-dot" />
          <text>{{ tokenStore.hasLogin ? '已认证' : '待登录' }}</text>
        </view>
      </view>
      <view class="profile-identity">
        <view class="profile-avatar"><text>{{ profileInitial }}</text></view>
        <view class="profile-identity__copy">
          <text class="profile-identity__name">{{ tokenStore.hasLogin ? profileName : '开启你的求职档案' }}</text>
          <text class="profile-identity__subtitle">{{ tokenStore.hasLogin ? '让好机会主动找到你' : '登录后管理简历、沟通与投递' }}</text>
        </view>
      </view>
      <view v-if="!tokenStore.hasLogin" class="profile-login" role="button" @tap="handleLogin">
        <text>立即登录</text>
        <view class="profile-login__arrow i-carbon-arrow-right" />
      </view>
    </view>

    <view class="profile-body">
      <view class="profile-resume-card">
        <view class="profile-resume-card__head">
          <view>
            <text class="profile-section-label">在线简历</text>
            <text class="profile-resume-card__title">让好机会更快发现你</text>
          </view>
          <view class="profile-resume-card__mark i-carbon-document" />
        </view>
        <view class="profile-resume-card__progress">
          <view class="profile-resume-card__progress-track"><view class="profile-resume-card__progress-value" /></view>
          <text>完善简历，提升被看见的机会</text>
        </view>
      </view>

      <view class="profile-tools">
        <view class="profile-tool">
          <view class="profile-tool__icon profile-tool__icon--blue i-carbon-portfolio" />
          <text>我的简历</text>
        </view>
        <view class="profile-tool">
          <view class="profile-tool__icon profile-tool__icon--violet i-carbon-task" />
          <text>投递记录</text>
        </view>
        <view class="profile-tool">
          <view class="profile-tool__icon profile-tool__icon--orange i-carbon-chat" />
          <text>面试沟通</text>
        </view>
        <view class="profile-tool">
          <view class="profile-tool__icon profile-tool__icon--green i-carbon-bookmark" />
          <text>收藏职位</text>
        </view>
      </view>

      <view class="profile-menu">
        <view class="profile-menu__item">
          <view class="profile-menu__icon profile-menu__icon--blue i-carbon-user-avatar" />
          <text class="profile-menu__label">求职偏好</text>
          <text class="profile-menu__detail">完善意向，推荐更精准</text>
          <view class="profile-menu__arrow i-carbon-chevron-right" />
        </view>
        <view class="profile-menu__item">
          <view class="profile-menu__icon profile-menu__icon--violet i-carbon-notification" />
          <text class="profile-menu__label">消息提醒</text>
          <text class="profile-menu__detail">及时掌握职位动态</text>
          <view class="profile-menu__arrow i-carbon-chevron-right" />
        </view>
        <view class="profile-menu__item">
          <view class="profile-menu__icon profile-menu__icon--green i-carbon-settings" />
          <text class="profile-menu__label">账号设置</text>
          <text class="profile-menu__detail">管理个人与隐私信息</text>
          <view class="profile-menu__arrow i-carbon-chevron-right" />
        </view>
      </view>

      <view class="profile-account" :class="{ 'profile-account--logged-in': tokenStore.hasLogin }">
        <view class="profile-account__indicator" />
        <text>{{ profileSummary }}</text>
      </view>

      <view v-if="tokenStore.hasLogin" class="profile-logout" role="button" @tap="handleLogout">
        <view class="profile-logout__icon i-carbon-logout" />
        <text>退出当前账号</text>
      </view>
      <view v-else class="profile-tip">
        <text>登录后即可解锁完整求职服务</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.profile-page {
  min-height: 100vh;
  padding-bottom: calc(48rpx + env(safe-area-inset-bottom));
  overflow: hidden;
  color: #263249;
  background: #f3f6fc;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}
.profile-hero {
  position: relative;
  min-height: 366rpx;
  box-sizing: border-box;
  padding: 42rpx 40rpx 112rpx;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(132deg, #3065f4 0%, #467bff 52%, #6b5ae8 100%);
  border-radius: 0 0 52rpx 52rpx;
}
.profile-hero::after {
  position: absolute;
  right: -116rpx;
  bottom: -154rpx;
  width: 352rpx;
  height: 352rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  content: '';
}
.profile-hero__top,
.profile-identity,
.profile-login {
  position: relative;
  z-index: 1;
}
.profile-hero__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.profile-hero__eyebrow {
  font-size: 20rpx;
  font-weight: 700;
  letter-spacing: 2.6rpx;
  opacity: 0.78;
}
.profile-hero__status {
  display: flex;
  align-items: center;
  gap: 10rpx;
  padding: 10rpx 16rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 999rpx;
  background: rgba(18, 50, 166, 0.18);
  font-size: 20rpx;
}
.profile-hero__status-dot,
.profile-account__indicator {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #dce7ff;
}
.profile-hero__status--active .profile-hero__status-dot,
.profile-account--logged-in .profile-account__indicator {
  background: #7ee6b2;
  box-shadow: 0 0 0 6rpx rgba(126, 230, 178, 0.18);
}
.profile-identity {
  display: flex;
  align-items: center;
  margin-top: 48rpx;
}
.profile-avatar {
  display: flex;
  width: 100rpx;
  height: 100rpx;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  border: 5rpx solid rgba(255, 255, 255, 0.22);
  border-radius: 36rpx;
  color: #467bff;
  font-size: 44rpx;
  font-weight: 700;
  background: #fff;
  box-shadow: 0 16rpx 34rpx rgba(21, 59, 167, 0.18);
}
.profile-identity__copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}
.profile-identity__name {
  overflow: hidden;
  font-size: 34rpx;
  font-weight: 700;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.profile-identity__subtitle {
  margin-top: 8rpx;
  font-size: 22rpx;
  opacity: 0.8;
}
.profile-login {
  display: flex;
  width: fit-content;
  min-height: 62rpx;
  align-items: center;
  gap: 14rpx;
  margin-top: 34rpx;
  padding: 0 12rpx 0 22rpx;
  border-radius: 999rpx;
  color: #3065f4;
  font-size: 24rpx;
  font-weight: 700;
  background: #fff;
  cursor: pointer;
  transition: transform 180ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 180ms cubic-bezier(0.32, 0.72, 0, 1);
}
.profile-login:active {
  transform: scale(0.98);
}
.profile-login__arrow {
  display: flex;
  width: 42rpx;
  height: 42rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  background: #467bff;
}
.profile-body {
  position: relative;
  z-index: 2;
  margin-top: -52rpx;
  padding: 0 24rpx;
}
.profile-resume-card,
.profile-tools,
.profile-menu,
.profile-account,
.profile-logout,
.profile-tip {
  border: 1rpx solid rgba(227, 234, 247, 0.92);
  border-radius: 32rpx;
  background: #fff;
  box-shadow: 0 18rpx 44rpx rgba(54, 82, 145, 0.08);
}
.profile-resume-card {
  padding: 30rpx 32rpx;
}
.profile-resume-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.profile-section-label {
  display: block;
  color: #9aa5b8;
  font-size: 20rpx;
  letter-spacing: 1rpx;
}
.profile-resume-card__title {
  display: block;
  margin-top: 8rpx;
  color: #263249;
  font-size: 28rpx;
  font-weight: 700;
}
.profile-resume-card__mark {
  display: flex;
  width: 64rpx;
  height: 64rpx;
  align-items: center;
  justify-content: center;
  border-radius: 22rpx;
  color: #467bff;
  font-size: 34rpx;
  background: #eef3ff;
}
.profile-resume-card__progress {
  margin-top: 28rpx;
}
.profile-resume-card__progress-track {
  height: 10rpx;
  overflow: hidden;
  border-radius: 999rpx;
  background: #e8edf7;
}
.profile-resume-card__progress-value {
  display: block;
  width: 42%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #467bff, #6b5ae8);
}
.profile-resume-card__progress text {
  display: block;
  margin-top: 14rpx;
  color: #9aa5b8;
  font-size: 20rpx;
}
.profile-tools {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8rpx;
  margin-top: 20rpx;
  padding: 28rpx 10rpx 24rpx;
}
.profile-tool {
  display: flex;
  min-width: 0;
  align-items: center;
  flex-direction: column;
  color: #566278;
  font-size: 20rpx;
  line-height: 1.4;
  text-align: center;
}
.profile-tool__icon {
  display: flex;
  width: 68rpx;
  height: 68rpx;
  align-items: center;
  justify-content: center;
  margin-bottom: 14rpx;
  border-radius: 24rpx;
  font-size: 34rpx;
}
.profile-tool__icon--blue { color: #467bff; background: #eef3ff; }
.profile-tool__icon--violet { color: #725ee8; background: #f1efff; }
.profile-tool__icon--orange { color: #ff842d; background: #fff1e7; }
.profile-tool__icon--green { color: #1eae72; background: #eaf9f1; }
.profile-menu {
  margin-top: 20rpx;
  padding: 0 28rpx;
}
.profile-menu__item {
  display: flex;
  min-height: 116rpx;
  align-items: center;
  border-bottom: 1rpx solid #eef2f8;
}
.profile-menu__item:last-child { border-bottom: 0; }
.profile-menu__icon {
  display: flex;
  width: 54rpx;
  height: 54rpx;
  align-items: center;
  justify-content: center;
  margin-right: 18rpx;
  border-radius: 18rpx;
  font-size: 30rpx;
}
.profile-menu__icon--blue { color: #467bff; background: #eef3ff; }
.profile-menu__icon--violet { color: #725ee8; background: #f1efff; }
.profile-menu__icon--green { color: #1eae72; background: #eaf9f1; }
.profile-menu__label { color: #263249; font-size: 26rpx; font-weight: 600; }
.profile-menu__detail { min-width: 0; flex: 1; margin-left: 14rpx; overflow: hidden; color: #9aa5b8; font-size: 20rpx; text-align: right; text-overflow: ellipsis; white-space: nowrap; }
.profile-menu__arrow { margin-left: 10rpx; color: #b6c0d0; font-size: 28rpx; }
.profile-account,
.profile-tip {
  display: flex;
  min-height: 70rpx;
  align-items: center;
  gap: 14rpx;
  margin-top: 20rpx;
  padding: 0 24rpx;
  color: #7f8aa0;
  font-size: 20rpx;
  box-shadow: none;
}
.profile-logout {
  display: flex;
  min-height: 92rpx;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  margin-top: 20rpx;
  color: #e0565b;
  font-size: 26rpx;
  font-weight: 600;
  cursor: pointer;
  transition: transform 180ms cubic-bezier(0.32, 0.72, 0, 1), background 180ms cubic-bezier(0.32, 0.72, 0, 1);
}
.profile-logout:active { transform: scale(0.985); background: #fff7f7; }
.profile-logout__icon { font-size: 28rpx; }
.profile-tip { justify-content: center; }
</style>
