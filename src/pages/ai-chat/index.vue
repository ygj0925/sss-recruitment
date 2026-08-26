<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue'

defineOptions({
  name: 'AiChat',
})

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'AI 聊天',
    backgroundColor: '#F6F8FC',
  },
})

const inputValue = ref('')
const messages = ref([
  { id: 1, role: 'assistant', content: '你好，我是麟才。告诉我你的意向城市、岗位或专业，我来帮你匹配合适的机会。' },
])
const quickQuestions = ['帮我推荐上海的研发岗位', '我想了解校园招聘', '如何完善在线简历']

function sendMessage(content = inputValue.value) {
  const message = content.trim()
  if (!message) {
    return
  }

  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: message,
  })
  inputValue.value = ''
  messages.value.push({
    id: Date.now() + 1,
    role: 'assistant',
    content: '我已收到你的需求。当前演示环境会在接入职位服务后，返回与你最匹配的岗位与投递建议。',
  })
}
</script>

<template>
  <view class="app-tab-page font-[Noto_Sans_SC,Microsoft_YaHei,sans-serif]">
    <AppPageHeader title="AI 聊天" />

    <view class="px-24rpx pb-112rpx pt-26rpx">
      <view class="flex items-center rounded-22rpx p-26rpx text-white bg-brand-header">
        <view class="i-carbon-chat mr-18rpx h-72rpx w-72rpx flex items-center justify-center rounded-18rpx bg-white text-40rpx text-brand-violet" />
        <view>
          <text class="block text-28rpx font-700">麟才寻你 · AI 助手</text>
          <text class="mt-8rpx block text-22rpx opacity-80">聊一聊，发现更适合你的职业机会</text>
        </view>
      </view>

      <view class="mt-30rpx flex flex-col gap-20rpx">
        <view v-for="message in messages" :key="message.id" class="flex items-start" :class="{ 'justify-end': message.role === 'user' }">
          <view v-if="message.role === 'assistant'" class="i-carbon-chat mr-14rpx h-58rpx w-58rpx flex flex-[0_0_58rpx] items-center justify-center rounded-18rpx bg-brand-violet text-30rpx text-white" />
          <text class="max-w-[78%] rounded-18rpx px-22rpx py-19rpx text-25rpx leading-[1.6]" :class="message.role === 'user' ? 'bg-brand-violet text-white' : 'bg-white text-app-ink'">{{ message.content }}</text>
        </view>
      </view>

      <view class="mt-34rpx">
        <text class="text-23rpx text-[#7f8997]">你可以这样问我</text>
        <view class="mt-16rpx flex flex-wrap gap-14rpx">
          <text v-for="question in quickQuestions" :key="question" class="cursor-pointer rounded-28rpx bg-[#eef0ff] px-18rpx py-13rpx text-22rpx text-brand-violet active:opacity-74" role="button" @tap="sendMessage(question)">{{ question }}</text>
        </view>
      </view>
    </view>

    <view class="fixed inset-x-0 bottom-[var(--app-page-bottom-safe)] z-20 box-border bg-white px-24rpx py-18rpx">
      <view class="h-76rpx flex items-center rounded-16rpx bg-[#f3f4f8] pl-24rpx">
        <input v-model="inputValue" class="min-w-0 flex-1 text-25rpx" confirm-type="send" placeholder="输入你的求职问题" @confirm="sendMessage()">
        <view class="i-carbon-send-alt h-76rpx w-76rpx flex cursor-pointer items-center justify-center rounded-16rpx bg-brand-violet text-34rpx text-white active:opacity-74" role="button" @tap="sendMessage()" />
      </view>
    </view>
  </view>
</template>
