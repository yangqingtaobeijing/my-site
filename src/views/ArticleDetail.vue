<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { getArticleById, loadFromGitHub, dataLoading } from '../store'
import { renderMarkdown } from '../utils/markdown'
import { formatDate } from '../utils/date'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  loadFromGitHub()
})

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
  <div class="min-h-screen bg-[var(--color-bg)]">
    <SiteHeader />

    <main class="mx-auto max-w-[800px] px-6 py-10">
      <!-- 加载中 -->
      <div v-if="dataLoading" class="text-center py-20">
        <p class="text-[var(--color-text-subtle)] text-sm font-[family-name:var(--font-mono)] animate-pulse">&gt;_ 加载中...</p>
      </div>

      <!-- 文章不存在 -->
      <div v-else-if="!article" class="text-center py-20">
        <p class="text-[var(--color-text-muted)] text-lg font-[family-name:var(--font-mono)]">&gt;_ 404 文章不存在</p>
        <button
          class="mt-4 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-[family-name:var(--font-mono)]"
          @click="goBack"
        >
          ← cd /home
        </button>
      </div>

      <!-- 文章存在 -->
      <template v-else>
        <!-- 返回链接 -->
        <button
          class="text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] text-sm mb-8 inline-flex items-center gap-1 transition-colors font-[family-name:var(--font-mono)]"
          @click="goBack"
        >
          ← 返回
        </button>

        <!-- 文章头部 -->
        <header class="mb-10">
          <h1 class="text-3xl font-bold text-[var(--color-text-bright)] leading-tight font-[family-name:var(--font-mono)]">
            {{ article.title }}
          </h1>
          <div class="flex items-center gap-3 mt-4 text-sm">
            <time class="text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)]">{{ formatDate(article.createdAt) }}</time>
            <span
              v-if="article.type === 'external'"
              class="bg-[var(--color-accent-dim)] text-[var(--color-accent)] px-2 py-0.5 rounded text-xs font-[family-name:var(--font-mono)]"
            >
              外链文章 ↗
            </span>
          </div>
          <p class="mt-4 text-[var(--color-text-secondary)] leading-relaxed">{{ article.summary }}</p>
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
          class="mt-8 p-8 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] text-center"
        >
          <p class="text-[var(--color-text-muted)] mb-5 font-[family-name:var(--font-mono)] text-sm">// 这是一篇外链文章，点击下方按钮阅读原文</p>
          <a
            :href="article.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-accent-contrast)] px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
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
