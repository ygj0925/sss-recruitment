import type { CustomTabBarItem } from './types'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TabbarItem from './TabbarItem.vue'

const storeState = vi.hoisted(() => ({ backToTopPath: '' }))

// mock tabbar store，避免 uni.getStorageSync 在模块加载时执行
vi.mock('./store', () => ({
  tabbarStore: {
    curIdx: 0,
    isBackToTopPath: (path: string) => storeState.backToTopPath === path,
  },
}))

const baseItem: CustomTabBarItem = {
  text: '首页',
  pagePath: 'pages/index/index',
  iconType: 'unocss',
  icon: 'i-carbon-home',
}

describe('tabbarItem', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    storeState.backToTopPath = ''
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  it('渲染 text 文本', () => {
    wrapper = mount(TabbarItem, {
      props: { item: baseItem, index: 0 },
    })
    expect(wrapper.text()).toContain('首页')
  })

  it('isBulge=true 时不渲染文本', () => {
    wrapper = mount(TabbarItem, {
      props: { item: baseItem, index: 0, isBulge: true },
    })
    expect(wrapper.text()).not.toContain('首页')
  })

  it('iconType=unocss 时渲染图标 class', () => {
    wrapper = mount(TabbarItem, {
      props: { item: baseItem, index: 0 },
    })
    expect(wrapper.html()).toContain('i-carbon-home')
  })

  it('回顶部状态覆盖职位图标和文本', () => {
    const item: CustomTabBarItem = {
      ...baseItem,
      text: '职位',
      pagePath: 'pages/position/index',
      icon: 'i-carbon-task',
    }
    storeState.backToTopPath = item.pagePath

    wrapper = mount(TabbarItem, {
      props: { item, index: 1 },
    })

    expect(wrapper.text()).toContain('回顶部')
    expect(wrapper.html()).toContain('i-carbon-up-to-top')
    expect(wrapper.html()).not.toContain('i-carbon-task')
  })

  it('badge=dot 时渲染小红点（包含 rounded-full 样式）', () => {
    const item: CustomTabBarItem = { ...baseItem, badge: 'dot' }
    wrapper = mount(TabbarItem, {
      props: { item, index: 0 },
    })
    expect(wrapper.html()).toContain('rounded-full')
  })

  it('badge 为数字时渲染数字角标', () => {
    const item: CustomTabBarItem = { ...baseItem, badge: 5 }
    wrapper = mount(TabbarItem, {
      props: { item, index: 0 },
    })
    expect(wrapper.text()).toContain('5')
  })

  it('badge > 99 时显示 99+', () => {
    const item: CustomTabBarItem = { ...baseItem, badge: 100 }
    wrapper = mount(TabbarItem, {
      props: { item, index: 0 },
    })
    expect(wrapper.text()).toContain('99+')
  })
})
