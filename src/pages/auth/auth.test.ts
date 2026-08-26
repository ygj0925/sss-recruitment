import { describe, expect, it } from 'vitest'
import {
  canSubmitAccountLogin,
  canSubmitPhoneCode,
  normalizePhone,
  validatePassword,
  validatePhone,
  validateVerificationCode,
} from './auth'

describe('authentication form helpers', () => {
  it('normalizes and validates mainland phone numbers', () => {
    expect(normalizePhone('138 0013 8000')).toBe('13800138000')
    expect(validatePhone('138 0013 8000')).toBe('')
    expect(validatePhone('138001380')).toBe('请输入正确的 11 位手机号')
  })

  it('requires a 6-20 character password', () => {
    expect(validatePassword('')).toBe('请输入密码')
    expect(validatePassword('12345')).toBe('密码长度应为 6-20 位')
    expect(validatePassword('secure12')).toBe('')
  })

  it('validates verification code length and account-login availability', () => {
    expect(validateVerificationCode('abc')).toBe('验证码应为 4-6 位数字')
    expect(canSubmitAccountLogin({ phone: '13800138000', password: 'secure12', agreed: false })).toBe(true)
    expect(canSubmitAccountLogin({ phone: '13800138000', password: 'secure12', agreed: true })).toBe(true)
    expect(canSubmitPhoneCode({ phone: '13800138000', code: '123456', agreed: false })).toBe(true)
    expect(canSubmitPhoneCode({ phone: '13800138000', code: '123456', agreed: true })).toBe(true)
  })
})
