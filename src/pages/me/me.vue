<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue'
import FgTabbar from '@/tabbar/index.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { AGREEMENT_PAGE, LOGIN_PAGE, PRIVACY_PAGE } from '@/router/config'
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
const profileStats = computed(() => [
  { label: '投递', value: tokenStore.hasLogin ? '0' : '**' },
  { label: '收藏', value: tokenStore.hasLogin ? '0' : '**' },
  { label: '面试', value: tokenStore.hasLogin ? '0' : '**' },
  { label: '足迹', value: tokenStore.hasLogin ? '0' : '**' },
])
const resumeShortcuts = [
  { label: '在线简历', icon: 'i-carbon-document' },
  { label: '附件简历', icon: 'i-carbon-attachment' },
  { label: '求职意向', icon: 'i-carbon-favorite' },
  { label: '简历模板', icon: 'i-carbon-template' },
]

const profileHeaderBackground = 'linear-gradient(132deg, #2f7cf7 0%, #438ff7 42%, #5a79ed 73%, #6e63e8 100%)'

function handleLogin() {
  uni.navigateTo({
    url: LOGIN_PAGE,
  })
}

function handleProfileTap() {
  if (!tokenStore.hasLogin) {
    handleLogin()
  }
}

function handleLegalTap(url: string) {
  uni.navigateTo({ url })
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
      }
    },
  })
}
</script>

<template>
  <view class="profile-page">
    <view class="profile-header">
      <AppPageHeader title="我的" light :background="profileHeaderBackground" />
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
          <text class="profile-user__name">{{ tokenStore.hasLogin ? profileName : '点击登录/注册' }}</text>
          <text class="profile-user__description">
            {{ tokenStore.hasLogin ? '查看并完善你的求职资料' : '可解锁全部信息' }}
          </text>
        </view>
      </view>

      <view class="profile-stats">
        <view v-for="stat in profileStats" :key="stat.label" class="profile-stat">
          <text class="profile-stat__value">{{ stat.value }}</text>
          <text class="profile-stat__label">{{ stat.label }}</text>
        </view>
      </view>
    </view>

    <view class="profile-content">
      <view class="resume-card">
        <view class="resume-shortcuts">
          <view
            v-for="shortcut in resumeShortcuts"
            :key="shortcut.label"
            class="resume-shortcut"
            role="button"
            @tap="handleProfileTap"
          >
            <view class="resume-shortcut__icon" :class="[shortcut.icon]" />
            <text>{{ shortcut.label }}</text>
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
          <view class="profile-list__item" role="link" @tap="handleLegalTap(AGREEMENT_PAGE)">
            <view class="profile-list__icon i-carbon-document" />
            <view class="profile-list__copy">
              <text class="profile-list__label">用户协议</text>
              <text class="profile-list__description">了解服务使用规则</text>
            </view>
            <view class="profile-list__arrow i-carbon-chevron-right" />
          </view>
          <view class="profile-list__item" role="link" @tap="handleLegalTap(PRIVACY_PAGE)">
            <view class="profile-list__icon i-carbon-locked" />
            <view class="profile-list__copy">
              <text class="profile-list__label">隐私政策</text>
              <text class="profile-list__description">了解个人信息处理方式</text>
            </view>
            <view class="profile-list__arrow i-carbon-chevron-right" />
          </view>
        </view>
      </view>

      <view v-if="!tokenStore.hasLogin" class="login-panel">
        <text class="login-panel__title">登录后使用完整求职服务</text>
        <text class="login-panel__description">同步简历、投递记录与面试消息</text>
        <navigator :url="LOGIN_PAGE" open-type="navigate" hover-class="none" class="login-panel__button">
          前往登录
        </navigator>
      </view>

      <view v-else class="logout-button" role="button" @tap="handleLogout">
        <view class="i-carbon-logout" />
        <text>退出登录</text>
      </view>
    </view>
    <!-- #ifndef MP-WEIXIN -->
    <FgTabbar />
    <!-- #endif -->
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
  min-height: 650rpx;
  padding: 0 52rpx 156rpx;
  color: #fff;
  background: linear-gradient(132deg, #2f7cf7 0%, #438ff7 42%, #5a79ed 73%, #6e63e8 100%);
}

.profile-user {
  display: flex;
  align-items: center;
  margin-top: 68rpx;
}

.profile-user--clickable {
  cursor: pointer;
}

.profile-user--clickable:active {
  opacity: 0.82;
}

.profile-avatar {
  display: flex;
  width: 112rpx;
  height: 112rpx;
  flex: 0 0 112rpx;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.22);
  border-radius: 50%;
  color: #fff;
  font-size: 44rpx;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 2rpx 8rpx rgba(255, 255, 255, 0.14);
}

.profile-avatar__icon {
  font-size: 64rpx;
}

.profile-user__main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.profile-user__name {
  overflow: hidden;
  font-size: 44rpx;
  font-weight: 700;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-user__description {
  margin-top: 8rpx;
  font-size: 29rpx;
  line-height: 1.45;
  opacity: 0.78;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 62rpx;
}

.profile-stat {
  display: flex;
  min-width: 0;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.profile-stat__value {
  font-size: 37rpx;
  font-weight: 700;
  line-height: 1.3;
}

.profile-stat__label {
  margin-top: 12rpx;
  font-size: 29rpx;
  line-height: 1.35;
  opacity: 0.75;
}

.profile-content {
  position: relative;
  z-index: 1;
  margin-top: -78rpx;
  padding: 0 32rpx;
}

.resume-card,
.profile-list,
.login-panel,
.logout-button {
  border-radius: 28rpx;
  background: #fff;
}

.resume-card {
  padding: 30rpx 4rpx;
  box-shadow: 0 16rpx 40rpx rgba(42, 92, 178, 0.12);
}

.resume-shortcuts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.resume-shortcut {
  display: flex;
  min-width: 0;
  min-height: 158rpx;
  align-items: center;
  justify-content: center;
  color: #1f2a3d;
  cursor: pointer;
  flex-direction: column;
  font-size: 27rpx;
  line-height: 1.4;
}

.resume-shortcut:active {
  background: #f7f9fd;
}

.resume-shortcut__icon {
  margin-bottom: 18rpx;
  color: #5d96f5;
  font-size: 56rpx;
}

.profile-section {
  margin-top: 34rpx;
}

.profile-section__title {
  display: block;
  margin: 0 8rpx 16rpx;
  color: #1f2a3d;
  font-size: 32rpx;
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
  font-size: 34rpx;
}

.profile-list__copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.profile-list__label {
  color: #263249;
  font-size: 29rpx;
  font-weight: 600;
}

.profile-list__description {
  margin-top: 7rpx;
  overflow: hidden;
  color: #9aa5b5;
  font-size: 24rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-list__arrow {
  margin-left: 16rpx;
  color: #bec7d4;
  font-size: 30rpx;
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
  font-size: 29rpx;
  font-weight: 600;
}

.login-panel__description {
  margin-top: 10rpx;
  color: #9aa5b5;
  font-size: 25rpx;
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
  font-size: 30rpx;
  font-weight: 600;
  transition:
    opacity 180ms cubic-bezier(0.32, 0.72, 0, 1),
    transform 180ms cubic-bezier(0.32, 0.72, 0, 1);
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
  font-size: 29rpx;
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
