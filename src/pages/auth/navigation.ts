import { isPageTabbar } from '@/tabbar/store'

export const DEFAULT_AUTH_REDIRECT = '/pages/index/index'

/**
 * Returns only internal uni-app routes, preventing an untrusted redirect query
 * from navigating authentication flows to an external URL.
 */
export function resolveAuthRedirect(redirect?: string): string {
  if (!redirect) {
    return DEFAULT_AUTH_REDIRECT
  }

  try {
    const target = decodeURIComponent(redirect)
    if (target.startsWith('/') && !target.startsWith('//')) {
      return target
    }
  }
  catch {
    // Malformed redirect values fall back to the home page.
  }

  return DEFAULT_AUTH_REDIRECT
}

export function navigateAfterAuthenticated(redirect?: string) {
  const target = resolveAuthRedirect(redirect)
  if (isPageTabbar(target)) {
    uni.switchTab({ url: target })
    return
  }

  // 登录页通常由 navigateTo 打开，来源页仍在页面栈中。直接返回可保留来源页的
  // 表单、滚动位置和查询参数；直接唤起登录页时则走下面的安全重定向兜底。
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }
  uni.reLaunch({ url: target })
}
