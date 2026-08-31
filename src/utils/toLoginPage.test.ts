import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { toLoginPage } from './toLoginPage'

describe('toLoginPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('getCurrentPages', vi.fn().mockReturnValue([{
      route: 'pages/position/detail',
      $page: { fullPath: '/pages/position/detail?id=42&from=search' },
    }]))
  })

  afterEach(() => {
    toLoginPage.cancel()
    vi.useRealTimers()
  })

  it('automatically carries the complete current route as the login redirect', () => {
    toLoginPage()
    vi.advanceTimersByTime(500)

    expect(uni.navigateTo).toHaveBeenCalledWith({
      url: '/pages/auth/login?redirect=%2Fpages%2Fposition%2Fdetail%3Fid%3D42%26from%3Dsearch',
    })
  })

  it('keeps an explicitly supplied redirect unchanged', () => {
    toLoginPage({ queryString: '?redirect=%2Fpages%2Fnotification%2Findex' })
    vi.advanceTimersByTime(500)

    expect(uni.navigateTo).toHaveBeenCalledWith({
      url: '/pages/auth/login?redirect=%2Fpages%2Fnotification%2Findex',
    })
  })
})
