<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from 'vue'
import AuthButton from './components/AuthButton.vue'
import AuthCaptchaModal from './components/AuthCaptchaModal.vue'
import AuthInput from './components/AuthInput.vue'
import AuthLayout from './components/AuthLayout.vue'
import { normalizePhone, validatePhone, validateVerificationCode } from './auth'

definePage({
  excludeLoginPath: true,
  style: { navigationStyle: 'custom', navigationBarTitleText: '重置密码' },
})

const form = reactive({ phone: '', code: '' })
const errors = reactive({ phone: '', code: '' })
const showCaptcha = ref(false)
const seconds = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
const canContinue = computed(() => !validatePhone(form.phone) && !validateVerificationCode(form.code))

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

function requestCode() {
  checkPhone()
  if (!errors.phone && !seconds.value) {
    showCaptcha.value = true
  }
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

function confirmCaptcha() {
  showCaptcha.value = false
  startCountdown()
}

function continueToSetPassword() {
  checkPhone()
  checkCode()
  if (canContinue.value) {
    uni.navigateTo({ url: `/pages/auth/set-password?phone=${encodeURIComponent(form.phone)}` })
  }
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <AuthLayout title="重置密码" subtitle="验证手机号后设置新密码" @back="goBack">
    <AuthInput v-model="form.phone" icon="⌕" placeholder="请输入手机号" input-type="number" :maxlength="11" :error="errors.phone" @blur="checkPhone" @update:model-value="updatePhone" />
    <AuthInput v-model="form.code" icon="◇" placeholder="请输入验证码" input-type="number" :maxlength="6" :error="errors.code" :action-text="seconds ? `${seconds}s` : '发送验证码'" @blur="checkCode" @action="requestCode" />
    <AuthButton label="下一步" :disabled="!canContinue" @tap="continueToSetPassword" />
    <AuthCaptchaModal v-if="showCaptcha" @cancel="showCaptcha = false" @confirm="showCaptcha = false; startCountdown()" />
  </AuthLayout>
</template>
