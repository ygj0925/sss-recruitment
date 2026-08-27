import { safeAreaInsets, systemInfo } from '@/utils/systemInfo'

interface MenuButtonRect {
  top: number
  bottom: number
  left: number
  height: number
}

let menuButtonRect: MenuButtonRect | null = null

// #ifdef MP-WEIXIN
menuButtonRect = uni.getMenuButtonBoundingClientRect()
// #endif

const statusBarHeight = Number(systemInfo?.statusBarHeight || safeAreaInsets?.top || 0)
const navigationBarHeight = menuButtonRect
  ? (menuButtonRect.top - statusBarHeight) * 2 + menuButtonRect.height
  : 44
const rightPadding = menuButtonRect
  ? Number(systemInfo?.windowWidth || 0) - menuButtonRect.left + 8
  : 24

export const aiHeaderMetrics = {
  height: statusBarHeight + navigationBarHeight,
  statusBarHeight,
  rightPadding,
}
