import { describe, expect, it, vi } from 'vitest'
import { startWechatAuthorization } from './wechat-auth'

describe('startWechatAuthorization', () => {
  it('returns unsupported outside WeChat Mini Program', async () => {
    const result = await startWechatAuthorization({
      isWechatMiniProgram: () => false,
    })

    expect(result).toEqual({
      status: 'unsupported',
      message: '请在微信小程序中使用微信登录',
    })
  })

  it('uses a code and routes mock mode to phone binding without authenticating', async () => {
    const authenticate = vi.fn()
    const result = await startWechatAuthorization({
      mode: 'mock',
      isWechatMiniProgram: () => true,
      getCode: async () => 'mock-wechat-code',
      authenticate,
    })

    expect(result).toEqual({
      status: 'binding_required',
      code: 'mock-wechat-code',
      isMock: true,
    })
    expect(authenticate).not.toHaveBeenCalled()
  })

  it('does not claim an authenticated result when API mode is unconfigured', async () => {
    const result = await startWechatAuthorization({
      mode: 'api',
      isWechatMiniProgram: () => true,
      getCode: async () => 'server-code',
    })

    expect(result).toEqual({
      status: 'failed',
      message: '微信登录服务尚未配置',
    })
  })

  it('surfaces authorization failures', async () => {
    const result = await startWechatAuthorization({
      isWechatMiniProgram: () => true,
      getCode: async () => Promise.reject(new Error('用户取消授权')),
    })

    expect(result).toEqual({
      status: 'failed',
      message: '用户取消授权',
    })
  })
})
