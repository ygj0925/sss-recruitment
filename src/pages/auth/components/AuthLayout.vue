<script setup lang="ts">
import { ref } from 'vue'
import AppPageHeader from '@/components/AppPageHeader.vue'

withDefaults(defineProps<{
  title: string
  subtitle?: string
  showBack?: boolean
}>(), {
  subtitle: '',
  showBack: true,
})

const emit = defineEmits<{
  back: []
}>()

const headerScrolled = ref(false)
const headerBackground = 'var(--app-brand-hero)'
const scrolledHeaderBackground = 'var(--app-brand-header)'
const h5DesktopClasses = {
  root: '',
  scroll: '',
  content: '',
  decoration: '',
  card: '',
  logo: '',
}

// #ifdef H5
Object.assign(h5DesktopClasses, {
  root: 'md:flex-row',
  scroll: 'md:h-full md:w-52% md:flex-none',
  content: 'md:flex md:flex-col md:p-0',
  decoration: 'md:hidden',
  card: 'md:my-auto md:w-[calc(100%-128rpx)] md:rounded-40rpx md:px-96rpx md:py-88rpx',
  logo: 'md:hidden',
})
// #endif

function handleScroll(event: { detail: { scrollTop?: number } }) {
  headerScrolled.value = (event.detail.scrollTop || 0) > 16
}
</script>

<template>
  <view class="h-[var(--app-viewport-height)] max-h-[var(--app-viewport-height)] flex flex-col overflow-hidden bg-app-surface text-app-ink font-sans" :class="h5DesktopClasses.root">
    <!-- #ifdef H5 -->
    <view class="relative box-border hidden w-48% flex-col justify-center overflow-hidden px-11% py-96rpx text-white bg-brand-hero md:flex">
      <image class="relative z-1 mb-72rpx h-120rpx w-120rpx brightness-0 invert" src="/static/logo.svg" mode="aspectFit" />
      <view class="relative z-1 flex flex-col">
        <text class="text-22rpx font-700 tracking-5rpx opacity-75">SSS RECRUITMENT</text>
        <text class="mt-28rpx block text-64rpx font-700 leading-1.25">遇见更好的职业机会</text>
        <text class="mt-32rpx block max-w-580rpx text-28rpx leading-1.8 opacity-82">安全、清晰、连贯地管理你的求职与职业发展。</text>
      </view>
      <view class="absolute bottom--160rpx right--180rpx h-640rpx w-640rpx border-1rpx border-white/14 rounded-full" />
      <view class="absolute right-100rpx top-90rpx h-180rpx w-180rpx border-1rpx border-white/14 rounded-full bg-white/8" />
    </view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <AppPageHeader
      :title="title"
      light
      :background="headerBackground"
      :scrolled="headerScrolled"
      :scrolled-background="scrolledHeaderBackground"
      scrolled-light
    >
      <template #left>
        <view
          v-if="showBack"
          class="h-64rpx w-64rpx flex cursor-pointer items-center justify-center border-1rpx rounded-20rpx text-48rpx text-white leading-none active:opacity-74"
          :class="headerScrolled ? 'border-white/28 bg-white/14' : 'border-white/22 bg-white/12'"
          role="button"
          aria-label="返回"
          @tap="emit('back')"
        >
          <text>‹</text>
        </view>
        <view v-else class="invisible h-64rpx w-64rpx" />
      </template>
      <template #right>
        <view
          class="h-64rpx w-64rpx flex cursor-pointer items-center justify-center border-1rpx rounded-20rpx text-26rpx text-white font-700 leading-none active:opacity-74"
          :class="headerScrolled ? 'border-white/28 bg-white/14' : 'border-white/22 bg-white/12'"
          aria-label="帮助"
        >
          ?
        </view>
      </template>
    </AppPageHeader>
    <!-- #endif -->

    <scroll-view class="h-0 flex-1" :class="h5DesktopClasses.scroll" scroll-y @scroll="handleScroll">
      <view class="relative box-border min-h-full overflow-hidden pb-[calc(44rpx+env(safe-area-inset-bottom))]" :class="h5DesktopClasses.content">
        <view class="absolute inset-x-0 top-0 h-350rpx rounded-b-52rpx bg-brand-hero" :class="h5DesktopClasses.decoration" />
        <!-- #ifdef H5 -->
        <view class="relative z-1 flex items-center justify-between px-36rpx pt-24rpx md:px-64rpx md:pt-36rpx">
          <view
            v-if="showBack"
            class="h-64rpx w-64rpx flex cursor-pointer items-center justify-center border-1rpx rounded-20rpx text-48rpx leading-none shadow-none md:border-[#e8edf7] md:bg-white md:text-brand-blue active:opacity-74 md:shadow-[0_10rpx_26rpx_rgba(54,82,145,0.08)]"
            :class="headerScrolled ? 'border-white/28 bg-white/14 text-white' : 'border-white/22 bg-white/12 text-white'"
            role="button"
            aria-label="返回"
            @tap="emit('back')"
          >
            <text>‹</text>
          </view>
          <view v-else class="invisible h-64rpx w-64rpx" />
          <view
            class="h-64rpx w-64rpx flex cursor-pointer items-center justify-center border-1rpx rounded-20rpx text-26rpx font-700 leading-none shadow-none md:border-[#e8edf7] md:bg-white md:text-brand-blue active:opacity-74 md:shadow-[0_10rpx_26rpx_rgba(54,82,145,0.08)]"
            :class="headerScrolled ? 'border-white/28 bg-white/14 text-white' : 'border-white/22 bg-white/12 text-white'"
            aria-label="帮助"
          >
            ?
          </view>
        </view>
        <!-- #endif -->
        <view class="relative z-1 mx-auto mt-44rpx box-border max-w-680rpx w-[calc(100%-48rpx)] border-1rpx border-[rgba(232,237,247,0.92)] rounded-36rpx bg-white px-40rpx pb-56rpx pt-42rpx shadow-[0_24rpx_60rpx_rgba(54,82,145,0.12)]" :class="h5DesktopClasses.card">
          <slot name="brand">
            <image class="mx-auto mb-30rpx block h-92rpx w-92rpx" :class="h5DesktopClasses.logo" src="/static/logo.svg" mode="aspectFit" />
          </slot>
          <view class="mb-54rpx flex flex-col items-center text-center">
            <text class="text-42rpx text-app-ink font-700 leading-1.35">{{ title }}</text>
            <text v-if="subtitle" class="mt-14rpx block text-23rpx text-[#7f8997] leading-1.55">{{ subtitle }}</text>
          </view>
          <slot />
        </view>
      </view>
    </scroll-view>
  </view>
</template>
