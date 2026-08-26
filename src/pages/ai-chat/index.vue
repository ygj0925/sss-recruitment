<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue'
import FgTabbar from '@/tabbar/index.vue'

defineOptions({
  name: 'AiChat',
})

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'AI 聊天',
    backgroundColor: '#F4F7FB',
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
  <view class="ai-page">
    <AppPageHeader title="AI 聊天" />

    <view class="ai-content">
      <view class="ai-welcome">
        <view class="ai-welcome__icon i-carbon-chat" />
        <view>
          <text class="ai-welcome__title">麟才寻你 · AI 助手</text>
          <text class="ai-welcome__description">聊一聊，发现更适合你的职业机会</text>
        </view>
      </view>

      <view class="message-list">
        <view v-for="message in messages" :key="message.id" class="message-row" :class="`message-row--${message.role}`">
          <view v-if="message.role === 'assistant'" class="message-row__avatar i-carbon-chat" />
          <text class="message-row__bubble">{{ message.content }}</text>
        </view>
      </view>

      <view class="quick-questions">
        <text class="quick-questions__label">你可以这样问我</text>
        <view class="quick-questions__items">
          <text v-for="question in quickQuestions" :key="question" role="button" @tap="sendMessage(question)">{{ question }}</text>
        </view>
      </view>
    </view>

    <view class="chat-input pb-safe">
      <view class="chat-input__bar">
        <input v-model="inputValue" confirm-type="send" placeholder="输入你的求职问题" @confirm="sendMessage()">
        <view class="chat-input__send i-carbon-send-alt" role="button" @tap="sendMessage()" />
      </view>
    </view>
    <!-- #ifndef MP-WEIXIN -->
    <FgTabbar />
    <!-- #endif -->
  </view>
</template>

<style scoped lang="scss">
.ai-page {
  min-height: 100vh;
  padding-bottom: calc(260rpx + env(safe-area-inset-bottom));
  color: #25203a;
  background: #f7f5fb;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}

.ai-content {
  padding: 26rpx 24rpx calc(260rpx + env(safe-area-inset-bottom));
}

.ai-welcome {
  display: flex;
  align-items: center;
  padding: 26rpx;
  border-radius: 22rpx;
  color: #fff;
  background: linear-gradient(115deg, #7132d7, #9a58e8);
}

.ai-welcome__icon,
.message-row__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18rpx;
}

.ai-welcome__icon {
  width: 72rpx;
  height: 72rpx;
  margin-right: 18rpx;
  color: #7132d7;
  background: #fff;
  font-size: 40rpx;
}

.ai-welcome__title,
.ai-welcome__description {
  display: block;
}

.ai-welcome__title {
  font-size: 28rpx;
  font-weight: 700;
}

.ai-welcome__description {
  margin-top: 8rpx;
  font-size: 22rpx;
  opacity: 0.8;
}

.message-list {
  display: flex;
  gap: 20rpx;
  margin-top: 30rpx;
  flex-direction: column;
}

.message-row {
  display: flex;
  align-items: flex-start;
}

.message-row--user {
  justify-content: flex-end;
}

.message-row__avatar {
  width: 58rpx;
  height: 58rpx;
  flex: 0 0 58rpx;
  margin-right: 14rpx;
  color: #fff;
  background: #7c32d9;
  font-size: 30rpx;
}

.message-row__bubble {
  max-width: 78%;
  padding: 19rpx 22rpx;
  border-radius: 18rpx;
  color: #3b3349;
  background: #fff;
  font-size: 25rpx;
  line-height: 1.6;
}

.message-row--user .message-row__bubble {
  color: #fff;
  background: #7c32d9;
}

.quick-questions {
  margin-top: 34rpx;
}

.quick-questions__label {
  color: #8a8296;
  font-size: 23rpx;
}

.quick-questions__items {
  display: flex;
  gap: 14rpx;
  flex-wrap: wrap;
  margin-top: 16rpx;
}

.quick-questions__items text {
  padding: 13rpx 18rpx;
  border-radius: 28rpx;
  color: #7541ca;
  background: #eee4ff;
  font-size: 22rpx;
}

.chat-input {
  position: fixed;
  z-index: 20;
  right: 0;
  bottom: calc(108rpx + env(safe-area-inset-bottom));
  left: 0;
  padding: 18rpx 24rpx;
  background: #fff;
}

.chat-input__bar {
  display: flex;
  height: 76rpx;
  align-items: center;
  padding-left: 24rpx;
  border-radius: 16rpx;
  background: #f3f4f8;
}

.chat-input input {
  min-width: 0;
  flex: 1;
  font-size: 25rpx;
}

.chat-input__send {
  display: flex;
  width: 76rpx;
  height: 76rpx;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
  color: #fff;
  background: #7c32d9;
  font-size: 34rpx;
}
</style>
