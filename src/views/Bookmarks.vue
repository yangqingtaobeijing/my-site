<script setup lang="ts">
import { computed } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { getBookmarks } from '../store'
import { extractDomain } from '../utils/url'

const bookmarks = computed(() => getBookmarks())
</script>

<template>
  <div class="min-h-screen bg-gray-50/50">
    <SiteHeader />

    <main class="mx-auto max-w-3xl px-6 py-10">
      <h1 class="text-2xl font-bold text-gray-900 mb-8">收藏</h1>

      <div v-if="bookmarks.length === 0" class="text-center py-20 text-gray-400">
        <p class="text-lg">还没有收藏</p>
        <p class="text-sm mt-2">去后台添加你喜欢的链接吧 🔗</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <a
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          :href="bookmark.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group block p-5 bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all"
        >
          <h3 class="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {{ bookmark.title }}
          </h3>
          <p class="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">
            {{ bookmark.description }}
          </p>
          <div class="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
            </svg>
            {{ extractDomain(bookmark.url) }}
          </div>
        </a>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>
