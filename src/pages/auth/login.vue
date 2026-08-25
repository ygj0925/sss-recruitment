<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { wxLogin } from '@/api/login'
import { AGREEMENT_PAGE, BIND_PHONE_PAGE, REGISTER_PAGE, RESET_PASSWORD_PAGE } from '@/router/config'
import { startWechatAuthorization } from '@/service/auth/wechat-auth'
import { useTokenStore } from '@/store/token'
import AuthAgreement from './components/AuthAgreement.vue'
import AuthButton from './components/AuthButton.vue'
import AuthInput from './components/AuthInput.vue'
import AuthLayout from './components/AuthLayout.vue'
import AuthSocialLogin from './components/AuthSocialLogin.vue'
import { canSubmitAccountLogin, normalizePhone, validatePassword, validatePhone } from './auth'
import { navigateAfterAuthenticated } from './navigation'

definePage({
  excludeLoginPath: true,
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '账号密码登录',
  },
})

const tokenStore = useTokenStore()
const form = reactive({
  phone: '',
  password: '',
  agreed: false,
})
const errors = reactive({
  phone: '',
  password: '',
  agreement: '',
})
const feedback = ref('')
const feedbackType = ref<'error' | 'info' | 'success'>('info')
const loading = ref(false)
const redirectUrl = ref('')
const canSubmit = computed(() => canSubmitAccountLogin(form))

onLoad((options) => {
  redirectUrl.value = typeof options?.redirect === 'string' ? options.redirect : ''
})

function goBack() {
  uni.navigateBack()
}

function goTo(url: string) {
  uni.navigateTo({ url })
}

function checkField(field: 'phone' | 'password') {
  errors[field] = field === 'phone' ? validatePhone(form.phone) : validatePassword(form.password)
}

function updatePhone(value: string) {
  form.phone = normalizePhone(value)
  if (errors.phone) {
    checkField('phone')
  }
}

function validateForm() {
  checkField('phone')
  checkField('password')
  errors.agreement = form.agreed ? '' : '请先阅读并同意用户协议'
  return !errors.phone && !errors.password && !errors.agreement
}

function showFeedback(message: string, type: 'error' | 'info' | 'success' = 'info') {
  feedback.value = message
  feedbackType.value = type
}

async function submitAccountLogin() {
  if (!validateForm()) {
    return
  }

  loading.value = true
  try {
    await tokenStore.login({
      username: form.phone,
      password: form.password,
    })
    navigateAfterAuthenticated(redirectUrl.value)
  }
  catch {
    showFeedback('账号或密码不正确，请检查后重试。', 'error')
  }
  finally {
    loading.value = false
  }
}

async function loginWithWechat() {
  if (!form.agreed) {
    errors.agreement = '请先阅读并同意用户协议'
    return
  }

  loading.value = true
  const result = await startWechatAuthorization({
    authenticate: code => wxLogin({ code }),
  })
  loading.value = false

  if (result.status === 'binding_required') {
    const query = `?wechatCode=${encodeURIComponent(result.code)}&mock=${result.isMock ? '1' : '0'}`
    goTo(`${BIND_PHONE_PAGE}${query}`)
    return
  }

  if (result.status === 'authenticated') {
    try {
      await tokenStore.completeExternalLogin(result.token)
      navigateAfterAuthenticated(redirectUrl.value)
    }
    catch {
      showFeedback('微信登录状态初始化失败，请重新尝试。', 'error')
    }
    return
  }

  showFeedback(result.message, 'error')
}
</script>

<template>
  <AuthLayout title="账号密码登录" subtitle="请使用已注册的账号密码" @back="goBack">
    <AuthInput v-model="form.phone" icon="⌕" placeholder="请输入手机号" input-type="number" :maxlength="11" :error="errors.phone" @blur="checkField('phone')" @update:model-value="updatePhone" />
    <AuthInput v-model="form.password" icon="⌑" placeholder="请输入 6-20 位密码" password :maxlength="20" :error="errors.password" @blur="checkField('password')" />
    <view class="login-options">
      <view class="login-options__agreement">
        <AuthAgreement v-model="form.agreed" @agreement="goTo(AGREEMENT_PAGE)" />
      </view>
      <text class="login-options__forgot" role="link" @tap="goTo(RESET_PASSWORD_PAGE)">忘记密码？</text>
    </view>
    <text v-if="errors.agreement" class="login-error">{{ errors.agreement }}</text>
    <AuthButton :disabled="!canSubmit" :loading="loading" @tap="submitAccountLogin" />
    <text class="login-switch" role="link" @tap="goTo(REGISTER_PAGE)">使用验证码登录 / 注册</text>
    <text v-if="feedback" class="login-feedback" :class="[`login-feedback--${feedbackType}`]">{{ feedback }}</text>
    <AuthSocialLogin @wechat="loginWithWechat" @unavailable="provider => showFeedback(`${provider} 登录暂未开放`)" />
  </AuthLayout>
</template>

<style scoped lang="scss">
.login-options {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.login-options__agreement {
  min-width: 0;
  flex: 1;
}
.login-options__forgot {
  min-height: 48rpx;
  margin: 2rpx 0 28rpx 20rpx;
  color: #3b82f6;
  font-size: 22rpx;
  white-space: nowrap;
}
.login-error,
.login-feedback {
  display: block;
  margin: -14rpx 0 22rpx;
  font-size: 22rpx;
  line-height: 1.5;
  text-align: center;
}
.login-error,
.login-feedback--error {
  color: #e5484d;
}
.login-feedback--info {
  color: #3b82f6;
}
.login-feedback--success {
  color: #0f9f6e;
}
.login-switch {
  display: block;
  min-height: 72rpx;
  margin-top: 26rpx;
  color: #3b82f6;
  font-size: 24rpx;
  line-height: 72rpx;
  text-align: center;
}
</style>
