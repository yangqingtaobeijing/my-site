<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { getArticleById } from '../store'
import { renderMarkdown } from '../utils/markdown'
import { formatDate } from '../utils/date'

const route = useRoute()
const router = useRouter()

const article = computed(() => {
  const id = route.params.id as string
  return getArticleById(id)
})

const renderedContent = computed(() => {
  if (article.value?.type === 'local' && article.value.content) {
    return renderMarkdown(article.value.content)
  }
  return ''
})

/** 返回首页 */
function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50/50">
    <SiteHeader />

    <main class="mx-auto max-w-3xl px-6 py-10">
      <!-- 文章不存在 -->
      <div v-if="!article" class="text-center py-20">
        <p class="text-gray-400 text-lg">文章不存在</p>
        <button
          class="mt-4 text-indigo-600 hover:text-indigo-700 text-sm"
          @click="goBack"
        >
          ← 返回首页
        </button>
      </div>

      <!-- 文章存在 -->
      <template v-else>
        <!-- 返回链接 -->
        <button
          class="text-gray-400 hover:text-gray-600 text-sm mb-8 inline-flex items-center gap-1 transition-colors"
          @click="goBack"
        >
          ← 返回
        </button>

        <!-- 文章头部 -->
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 leading-tight">
            {{ article.title }}
          </h1>
          <div class="flex items-center gap-3 mt-4 text-sm text-gray-400">
            <time>{{ formatDate(article.createdAt) }}</time>
            <span
              v-if="article.type === 'external'"
              class="bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-xs"
            >
              外链文章
            </span>
          </div>
          <p class="mt-4 text-gray-500 leading-relaxed">{{ article.summary }}</p>
        </header>

        <!-- 本地文章：Markdown 渲染 -->
        <div
          v-if="article.type === 'local' && renderedContent"
          class="markdown-body"
          v-html="renderedContent"
        />

        <!-- 外链文章：跳转按钮 -->
        <div
          v-if="article.type === 'external' && article.externalUrl"
          class="mt-8 p-6 bg-white rounded-xl border border-gray-200 text-center"
        >
          <p class="text-gray-500 mb-4">这是一篇外链文章，点击下方按钮阅读原文</p>
          <a
            :href="article.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            阅读原文
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </template>
    </main>

    <SiteFooter />
  </div>
</template>
