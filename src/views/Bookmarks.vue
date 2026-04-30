<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { getBookmarks, loadFromGitHub, dataLoading } from '../store'
import { extractDomain } from '../utils/url'

const bookmarks = computed(() => getBookmarks().filter(b => !b.hidden))

onMounted(() => {
  loadFromGitHub()
})
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)]">
    <SiteHeader />

    <main class="mx-auto max-w-[800px] px-6 py-10">
      <h1 class="text-2xl font-bold text-[var(--color-text-bright)] mb-8">
        我的收藏
      </h1>

      <!-- 加载状态 -->
      <div v-if="dataLoading" class="text-center py-20">
        <p class="text-[var(--color-text-subtle)] text-sm font-[family-name:var(--font-mono)] animate-pulse">&gt;_ 加载中...</p>
      </div>

      <template v-else>
        <div v-if="bookmarks.length === 0" class="text-center py-20 text-[var(--color-text-muted)]">
          <p class="text-lg font-[family-name:var(--font-mono)]">&gt;_ 还没有收藏</p>
          <p class="text-sm mt-2 text-[var(--color-text-faint)]">去后台添加你喜欢的链接吧</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <a
            v-for="bookmark in bookmarks"
            :key="bookmark.id"
            :href="bookmark.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group block p-5 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] glow-border"
          >
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                {{ bookmark.title }}
              </h3>
              <!-- 外链图标 -->
              <svg class="w-4 h-4 text-[var(--color-text-faint)] group-hover:text-[var(--color-accent)] transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <p class="text-[var(--color-text-muted)] text-sm mt-2 leading-relaxed line-clamp-2">
              {{ bookmark.description }}
            </p>
            <!-- 域名用等宽小字 -->
            <div class="flex items-center gap-1.5 mt-3 text-xs text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)]">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
              </svg>
              {{ extractDomain(bookmark.url) }}
            </div>
          </a>
        </div>
      </template>
    </main>

    <SiteFooter />
  </div>
</template>
