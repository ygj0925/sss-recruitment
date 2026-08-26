<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from 'vue'
import AuthAgreement from './components/AuthAgreement.vue'
import AuthButton from './components/AuthButton.vue'
import AuthCaptchaModal from './components/AuthCaptchaModal.vue'
import AuthInput from './components/AuthInput.vue'
import AuthLayout from './components/AuthLayout.vue'
import { canSubmitPhoneCode, normalizePhone, validatePhone, validateVerificationCode } from './auth'

definePage({
  excludeLoginPath: true,
  style: { navigationStyle: 'custom', navigationBarTitleText: '验证码登录/注册' },
})

const form = reactive({ phone: '', code: '', agreed: false })
const errors = reactive({ phone: '', code: '', agreement: '' })
const showCaptcha = ref(false)
const seconds = ref(0)
const feedback = ref('')
let timer: ReturnType<typeof setInterval> | undefined
const canSubmit = computed(() => canSubmitPhoneCode(form))

function goTo(url: string) {
  uni.navigateTo({ url })
}

function goBack() {
  uni.navigateBack()
}

function updatePhone(value: string) {
  form.phone = normalizePhone(value)
  if (errors.phone) {
    checkPhone()
  }
}

function checkPhone() {
  errors.phone = validatePhone(form.phone)
}

function checkCode() {
  errors.code = validateVerificationCode(form.code)
}

function startCountdown() {
  seconds.value = 60
  timer = setInterval(() => {
    seconds.value -= 1
    if (seconds.value <= 0 && timer) {
      clearInterval(timer)
      timer = undefined
    }
  }, 1000)
}

function requestCode() {
  checkPhone()
  if (errors.phone || seconds.value) {
    return
  }
  showCaptcha.value = true
}

function confirmCaptcha() {
  showCaptcha.value = false
  startCountdown()
  feedback.value = '验证码已发送（开发演示，不会发送真实短信）'
}

function submit() {
  checkPhone()
  checkCode()
  errors.agreement = form.agreed ? '' : '请先阅读并同意用户协议'
  if (!canSubmit.value) {
    return
  }
  feedback.value = '验证码登录/注册服务待接入，本次不会创建账号。'
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <AuthLayout title="验证码登录/注册" subtitle="未注册的手机号将自动注册" @back="goBack">
    <AuthInput v-model="form.phone" icon="⌕" placeholder="请输入手机号" input-type="number" :maxlength="11" :error="errors.phone" @blur="checkPhone" @update:model-value="updatePhone" />
    <AuthInput v-model="form.code" icon="◇" placeholder="请输入验证码" input-type="number" :maxlength="6" :error="errors.code" :action-text="seconds ? `${seconds}s` : '发送验证码'" @blur="checkCode" @action="requestCode" />
    <AuthAgreement v-model="form.agreed" @agreement="goTo('/pages/auth/agreement')" />
    <text v-if="errors.agreement" class="register-error">{{ errors.agreement }}</text>
    <AuthButton label="登录 / 注册" :disabled="!canSubmit" @tap="submit" />
    <text class="register-switch" role="link" @tap="goTo('/pages/auth/login')">使用账号密码登录</text>
    <text v-if="feedback" class="register-feedback">{{ feedback }}</text>
    <AuthCaptchaModal v-if="showCaptcha" @cancel="showCaptcha = false" @confirm="confirmCaptcha" />
  </AuthLayout>
</template>

<style scoped lang="scss">
.register-error,
.register-feedback { display: block; margin: -16rpx 0 24rpx; font-size: 22rpx; line-height: 1.5; text-align: center; }
.register-error { color: #e95d63; }
.register-feedback { color: #467bff; }
.register-switch { display: block; min-height: 74rpx; margin-top: 26rpx; color: #467bff; cursor: pointer; font-size: 24rpx; font-weight: 600; line-height: 74rpx; text-align: center; }
</style>
