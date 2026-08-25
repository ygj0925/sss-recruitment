import type { IAuthLoginRes } from '@/api/types/login'
import type { WechatAuthMode } from '@/pages/auth/auth'
import { getWechatAuthMode } from '@/pages/auth/auth'

export type WechatAuthorizationResult =
  | { status: 'binding_required'; code: string; isMock: boolean }
  | { status: 'authenticated'; code: string; token: IAuthLoginRes }
  | { status: 'unsupported'; message: string }
  | { status: 'failed'; message: string }

export interface WechatAuthorizationDependencies {
  mode?: WechatAuthMode
  isWechatMiniProgram?: () => boolean
  getCode?: () => Promise<string>
  authenticate?: (code: string) => Promise<IAuthLoginRes>
}

function detectWechatMiniProgram() {
  // #ifdef MP-WEIXIN
  return true
  // #endif
  return false
}

async function requestWechatCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (response) => {
        if (response.code) {
          resolve(response.code)
          return
        }
        reject(new Error('微信未返回登录凭证'))
      },
      fail: error => reject(new Error(error.errMsg || '微信授权失败，请重试')),
    })
  })
}

/**
 * Starts a WeChat Mini Program authorization attempt without mutating auth state.
 * Mock mode intentionally returns a phone-binding requirement and never writes tokens.
 */
export async function startWechatAuthorization(
  dependencies: WechatAuthorizationDependencies = {},
): Promise<WechatAuthorizationResult> {
  const isWechatMiniProgram = dependencies.isWechatMiniProgram ?? detectWechatMiniProgram
  if (!isWechatMiniProgram()) {
    return {
      status: 'unsupported',
      message: '请在微信小程序中使用微信登录',
    }
  }

  try {
    const code = await (dependencies.getCode ?? requestWechatCode)()
    const mode = dependencies.mode ?? getWechatAuthMode()

    if (mode === 'mock') {
      return {
        status: 'binding_required',
        code,
        isMock: true,
      }
    }

    if (!dependencies.authenticate) {
      return {
        status: 'failed',
        message: '微信登录服务尚未配置',
      }
    }

    return {
      status: 'authenticated',
      code,
      token: await dependencies.authenticate(code),
    }
  }
  catch (error) {
    const message = error instanceof Error ? error.message : '微信授权失败，请重试'
    return {
      status: 'failed',
      message,
    }
  }
}
