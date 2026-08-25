import { describe, expect, it } from 'vitest'
import { DEFAULT_AUTH_REDIRECT, navigateAfterAuthenticated, resolveAuthRedirect } from './navigation'

describe('resolveAuthRedirect', () => {
  it('uses the home page when a redirect is absent or malformed', () => {
    expect(resolveAuthRedirect()).toBe(DEFAULT_AUTH_REDIRECT)
    expect(resolveAuthRedirect('%E0%A4%A')).toBe(DEFAULT_AUTH_REDIRECT)
  })

  it('accepts only internal uni-app routes', () => {
    expect(resolveAuthRedirect(encodeURIComponent('/pages/me/me?tab=profile'))).toBe('/pages/me/me?tab=profile')
    expect(resolveAuthRedirect('https%3A%2F%2Fevil.example')).toBe(DEFAULT_AUTH_REDIRECT)
    expect(resolveAuthRedirect('%2F%2Fevil.example')).toBe(DEFAULT_AUTH_REDIRECT)
  })

  it('uses the platform-appropriate navigation method after authentication', () => {
    navigateAfterAuthenticated('/pages/index/index')
    expect(uni.switchTab).toHaveBeenCalledWith({ url: '/pages/index/index' })

    navigateAfterAuthenticated('/pages/auth/agreement')
    expect(uni.reLaunch).toHaveBeenCalledWith({ url: '/pages/auth/agreement' })
  })
})
