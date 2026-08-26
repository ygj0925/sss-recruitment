<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarBackgroundColor: '#3478F6',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '我的',
    backgroundColorTop: '#3478F6',
  },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()
const { userInfo } = storeToRefs(userStore)
const profileName = computed(() => userInfo.value.username || '求职者')
const profileInitial = computed(() => profileName.value.slice(0, 1))

function handleLogin() {
  uni.navigateTo({
    url: `${LOGIN_PAGE}`,
  })
}

function handleProfileTap() {
  if (!tokenStore.hasLogin) {
    handleLogin()
  }
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
    <view class="profile-nav pt-safe">
      <view class="profile-nav__bar">
        <text>我的</text>
      </view>
    </view>
    <view class="profile-header">
      <view class="profile-nav-spacer pt-safe" />
      <view
        class="profile-user"
        :class="{ 'profile-user--clickable': !tokenStore.hasLogin }"
        :role="tokenStore.hasLogin ? undefined : 'button'"
        @tap="handleProfileTap"
      >
        <view class="profile-avatar">
          <text v-if="tokenStore.hasLogin">{{ profileInitial }}</text>
          <view v-else class="profile-avatar__icon i-carbon-user-avatar" />
        </view>
        <view class="profile-user__main">
          <text class="profile-user__name">{{ tokenStore.hasLogin ? profileName : '登录 / 注册' }}</text>
          <text class="profile-user__description">
            {{ tokenStore.hasLogin ? '查看并完善你的求职资料' : '登录后管理简历、投递与沟通' }}
          </text>
        </view>
        <view v-if="!tokenStore.hasLogin" class="profile-user__arrow i-carbon-chevron-right" />
      </view>
    </view>

    <view class="profile-content">
      <view class="resume-card">
        <view class="resume-card__heading">
          <view>
            <text class="resume-card__title">我的在线简历</text>
            <text class="resume-card__subtitle">完善资料，获得更精准的职位推荐</text>
          </view>
          <view class="resume-card__action">
            <text>{{ tokenStore.hasLogin ? '继续完善' : '登录查看' }}</text>
            <view class="i-carbon-chevron-right" />
          </view>
        </view>
        <view class="resume-progress">
          <view class="resume-progress__track">
            <view class="resume-progress__value" :class="{ 'resume-progress__value--logged-in': tokenStore.hasLogin }" />
          </view>
          <text class="resume-progress__text">{{ tokenStore.hasLogin ? '简历完整度 42%' : '登录后查看简历完整度' }}</text>
        </view>
        <view class="resume-shortcuts">
          <view class="resume-shortcut">
            <view class="resume-shortcut__icon i-carbon-document" />
            <text>编辑简历</text>
          </view>
          <view class="resume-shortcut">
            <view class="resume-shortcut__icon i-carbon-task" />
            <text>投递记录</text>
          </view>
          <view class="resume-shortcut">
            <view class="resume-shortcut__icon i-carbon-bookmark" />
            <text>职位收藏</text>
          </view>
          <view class="resume-shortcut">
            <view class="resume-shortcut__icon i-carbon-chat" />
            <text>面试沟通</text>
          </view>
        </view>
      </view>

      <view class="profile-section">
        <text class="profile-section__title">求职服务</text>
        <view class="profile-list">
          <view class="profile-list__item">
            <view class="profile-list__icon i-carbon-location" />
            <view class="profile-list__copy">
              <text class="profile-list__label">求职意向</text>
              <text class="profile-list__description">设置期望职位与工作城市</text>
            </view>
            <view class="profile-list__arrow i-carbon-chevron-right" />
          </view>
          <view class="profile-list__item">
            <view class="profile-list__icon i-carbon-notification" />
            <view class="profile-list__copy">
              <text class="profile-list__label">消息通知</text>
              <text class="profile-list__description">职位进展与面试提醒</text>
            </view>
            <view class="profile-list__arrow i-carbon-chevron-right" />
          </view>
          <view class="profile-list__item">
            <view class="profile-list__icon i-carbon-help" />
            <view class="profile-list__copy">
              <text class="profile-list__label">帮助与反馈</text>
              <text class="profile-list__description">常见问题与意见反馈</text>
            </view>
            <view class="profile-list__arrow i-carbon-chevron-right" />
          </view>
          <view class="profile-list__item">
            <view class="profile-list__icon i-carbon-settings" />
            <view class="profile-list__copy">
              <text class="profile-list__label">账号设置</text>
              <text class="profile-list__description">隐私、安全与个人信息</text>
            </view>
            <view class="profile-list__arrow i-carbon-chevron-right" />
          </view>
        </view>
      </view>

      <view v-if="!tokenStore.hasLogin" class="login-panel">
        <text class="login-panel__title">登录后使用完整求职服务</text>
        <text class="login-panel__description">同步简历、投递记录与面试消息</text>
        <navigator :url="LOGIN_PAGE" open-type="navigate" hover-class="none" class="login-panel__button">前往登录</navigator>
      </view>

      <view v-else class="logout-button" role="button" @tap="handleLogout">
        <view class="i-carbon-logout" />
        <text>退出登录</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
/* #ifdef H5 */
:global(page),
.profile-page {
  -webkit-tap-highlight-color: transparent;
}
/* #endif */

.profile-page {
  min-height: 100vh;
  padding-bottom: 44rpx;
  color: #1f2a3d;
  background: #f4f7fb;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}

.profile-header {
  box-sizing: border-box;
  min-height: 390rpx;
  padding: 0 32rpx 94rpx;
  color: #fff;
  background: linear-gradient(125deg, #164de5 0%, #2372f5 26%, #2f9bff 52%, #527df5 74%, #7765eb 100%);
}

.profile-nav {
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  left: 0;
  color: #fff;
  background: linear-gradient(125deg, #164de5 0%, #2372f5 26%, #2f9bff 52%, #527df5 74%, #7765eb 100%);
}

.profile-nav-spacer {
  height: 88rpx;
}

.profile-nav__bar {
  display: flex;
  height: 88rpx;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
  font-weight: 600;
  line-height: 88rpx;
}

.profile-user {
  display: flex;
  align-items: center;
  margin-top: 28rpx;
}

.profile-user--clickable {
  cursor: pointer;
}

.profile-user--clickable:active {
  opacity: 0.82;
}

.profile-avatar {
  display: flex;
  width: 108rpx;
  height: 108rpx;
  flex: 0 0 108rpx;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.38);
  border-radius: 50%;
  color: #3478f6;
  font-size: 42rpx;
  font-weight: 700;
  background: #fff;
}

.profile-avatar__icon {
  font-size: 54rpx;
}

.profile-user__main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.profile-user__name {
  overflow: hidden;
  font-size: 38rpx;
  font-weight: 700;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-user__description {
  margin-top: 10rpx;
  font-size: 25rpx;
  line-height: 1.45;
  opacity: 0.82;
}

.profile-user__arrow {
  margin-left: 20rpx;
  font-size: 34rpx;
  opacity: 0.85;
}

.profile-content {
  margin-top: -58rpx;
  padding: 0 24rpx;
}

.resume-card,
.profile-list,
.login-panel,
.logout-button {
  border-radius: 24rpx;
  background: #fff;
}

.resume-card {
  padding: 30rpx 28rpx 0;
  box-shadow: 0 10rpx 32rpx rgba(52, 93, 160, 0.08);
}

.resume-card__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.resume-card__title {
  display: block;
  color: #1f2a3d;
  font-size: 31rpx;
  font-weight: 700;
  line-height: 1.4;
}

.resume-card__subtitle {
  display: block;
  margin-top: 9rpx;
  color: #8a96a8;
  font-size: 23rpx;
  line-height: 1.45;
}

.resume-card__action {
  display: flex;
  min-height: 48rpx;
  align-items: center;
  margin-left: 20rpx;
  color: #3478f6;
  cursor: pointer;
  font-size: 23rpx;
  font-weight: 600;
  white-space: nowrap;
}

.resume-card__action view {
  margin-left: 4rpx;
  font-size: 24rpx;
}

.resume-progress {
  margin-top: 24rpx;
}

.resume-progress__track {
  height: 8rpx;
  overflow: hidden;
  border-radius: 8rpx;
  background: #e8eef8;
}

.resume-progress__value {
  width: 12%;
  height: 100%;
  border-radius: inherit;
  background: #ff8a34;
}

.resume-progress__value--logged-in {
  width: 42%;
}

.resume-progress__text {
  display: block;
  margin-top: 12rpx;
  color: #9aa5b5;
  font-size: 22rpx;
}

.resume-shortcuts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 26rpx -28rpx 0;
  border-top: 1rpx solid #edf1f7;
}

.resume-shortcut {
  display: flex;
  min-width: 0;
  align-items: center;
  padding: 26rpx 4rpx 28rpx;
  color: #526077;
  cursor: pointer;
  flex-direction: column;
  font-size: 22rpx;
  line-height: 1.4;
}

.resume-shortcut:active {
  background: #f7f9fd;
}

.resume-shortcut__icon {
  margin-bottom: 13rpx;
  color: #3478f6;
  font-size: 36rpx;
}

.profile-section {
  margin-top: 34rpx;
}

.profile-section__title {
  display: block;
  margin: 0 8rpx 16rpx;
  color: #1f2a3d;
  font-size: 30rpx;
  font-weight: 700;
}

.profile-list {
  padding: 0 28rpx;
}

.profile-list__item {
  display: flex;
  min-height: 116rpx;
  align-items: center;
  border-bottom: 1rpx solid #edf1f7;
  cursor: pointer;
}

.profile-list__item:last-child {
  border-bottom: 0;
}

.profile-list__item:active {
  opacity: 0.7;
}

.profile-list__icon {
  display: flex;
  width: 48rpx;
  flex: 0 0 48rpx;
  align-items: center;
  justify-content: center;
  margin-right: 18rpx;
  color: #3478f6;
  font-size: 32rpx;
}

.profile-list__copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.profile-list__label {
  color: #263249;
  font-size: 27rpx;
  font-weight: 600;
}

.profile-list__description {
  margin-top: 7rpx;
  overflow: hidden;
  color: #9aa5b5;
  font-size: 22rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-list__arrow {
  margin-left: 16rpx;
  color: #bec7d4;
  font-size: 28rpx;
}

.login-panel {
  display: flex;
  align-items: center;
  margin-top: 24rpx;
  padding: 30rpx 28rpx;
  flex-direction: column;
  text-align: center;
}

.login-panel__title {
  color: #263249;
  font-size: 27rpx;
  font-weight: 600;
}

.login-panel__description {
  margin-top: 10rpx;
  color: #9aa5b5;
  font-size: 23rpx;
}

.login-panel__button {
  display: flex;
  width: 100%;
  min-height: 84rpx;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  margin-top: 26rpx;
  border-radius: 14rpx;
  color: #fff;
  background: #3478f6;
  cursor: pointer;
  font-size: 28rpx;
  font-weight: 600;
  transition: opacity 180ms cubic-bezier(0.32, 0.72, 0, 1), transform 180ms cubic-bezier(0.32, 0.72, 0, 1);
}

.login-panel__button:active {
  opacity: 0.88;
  transform: scale(0.99);
}

.logout-button {
  display: flex;
  min-height: 92rpx;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  margin-top: 24rpx;
  color: #df555b;
  cursor: pointer;
  font-size: 27rpx;
  font-weight: 600;
}

.logout-button:active {
  background: #fff7f7;
}

@media (prefers-reduced-motion: reduce) {
  .login-panel__button {
    transition: none;
  }
}
</style>
