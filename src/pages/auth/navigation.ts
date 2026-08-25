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
  uni.reLaunch({ url: target })
}
