<script setup lang="ts">
import { reactive, ref } from 'vue'
import { wxLogin } from '@/api/login'
import { AGREEMENT_PAGE, BIND_PHONE_PAGE, PRIVACY_PAGE, REGISTER_PAGE, RESET_PASSWORD_PAGE } from '@/router/config'
import { startWechatAuthorization } from '@/service/auth/wechat-auth'
import { useTokenStore } from '@/store/token'
import AuthAgreement from './components/AuthAgreement.vue'
import AuthButton from './components/AuthButton.vue'
import AuthInput from './components/AuthInput.vue'
import AuthLayout from './components/AuthLayout.vue'
import AuthSocialLogin from './components/AuthSocialLogin.vue'
import { normalizePhone, validatePassword, validatePhone } from './auth'
import { navigateAfterAuthenticated } from './navigation'

definePage({
  excludeLoginPath: true,
  style: {
    navigationStyle: 'custom',
    navigationBarBackgroundColor: '#2C8CF4',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '账号密码登录',
    backgroundColorTop: '#2C8CF4',
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

onLoad((options) => {
  redirectUrl.value = typeof options?.redirect === 'string' ? options.redirect : ''
})

function goBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
    return
  }
  uni.reLaunch({ url: '/pages/index/index' })
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
  errors.agreement = form.agreed ? '' : '请先阅读并同意《用户协议》和《隐私政策》'
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
    errors.agreement = '请先阅读并同意《用户协议》和《隐私政策》'
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
    <view class="flex items-start justify-between">
      <view class="min-w-0 flex-1">
        <AuthAgreement v-model="form.agreed" @agreement="goTo(AGREEMENT_PAGE)" @privacy="goTo(PRIVACY_PAGE)" />
      </view>
      <text class="mb-30rpx ml-20rpx mt-4rpx min-h-50rpx cursor-pointer whitespace-nowrap text-21rpx text-#467bff font-600" role="link" @tap="goTo(RESET_PASSWORD_PAGE)">忘记密码？</text>
    </view>
    <text v-if="errors.agreement" class="mb-24rpx mt--14rpx block text-center text-22rpx text-#e95d63 leading-1.5">{{ errors.agreement }}</text>
    <AuthButton :disabled="loading" :loading="loading" @tap="submitAccountLogin" />
    <text class="mt-26rpx block min-h-74rpx cursor-pointer text-center text-24rpx text-#467bff font-600 leading-74rpx" role="link" @tap="goTo(REGISTER_PAGE)">使用验证码登录 / 注册</text>
    <text
      v-if="feedback"
      class="mb-24rpx mt--14rpx block text-center text-22rpx leading-1.5"
      :class="{
        'text-#e95d63': feedbackType === 'error',
        'text-#467bff': feedbackType === 'info',
        'text-#1eae72': feedbackType === 'success',
      }"
    >
      {{ feedback }}
    </text>
    <AuthSocialLogin @wechat="loginWithWechat" @unavailable="provider => showFeedback(`${provider} 登录暂未开放`)" />
  </AuthLayout>
</template>
