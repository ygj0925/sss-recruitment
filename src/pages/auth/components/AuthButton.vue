<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  disabled?: boolean
  loading?: boolean
}>(), {
  label: '登录',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  tap: []
}>()
</script>

<template>
  <wd-button
    round
    block
    type="primary"
    size="large"
    custom-class="!mt-0.5 !min-h-96rpx !rounded-28rpx !text-sm !font-700 !shadow-[0_16rpx_30rpx_rgba(45,111,230,0.24)] !transition-[opacity,transform,box-shadow] !duration-180 !ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:!transition-none"
    custom-style="background: var(--app-brand-blue);"
    :disabled="disabled"
    :loading="loading"
    @click="emit('tap')"
  >
    {{ label }}
  </wd-button>
</template>
