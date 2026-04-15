<script setup lang="ts">
import { computed } from 'vue'
import { store } from '../store'

const config = computed(() => store.config)
</script>

<template>
  <header class="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
    <div class="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
      <!-- 站点标题 -->
      <router-link to="/" class="flex items-center gap-3 group">
        <img
          v-if="config.avatarUrl"
          :src="config.avatarUrl"
          :alt="config.title"
          class="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-gray-300 transition-all"
        />
        <div
          v-else
          class="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold"
        >
          {{ config.title.charAt(0) }}
        </div>
        <span class="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {{ config.title }}
        </span>
      </router-link>

      <!-- 导航 -->
      <nav class="flex items-center gap-6 text-sm">
        <router-link
          to="/"
          class="text-gray-600 hover:text-gray-900 transition-colors"
          active-class="!text-gray-900 font-medium"
          exact
        >
          文章
        </router-link>
        <router-link
          to="/bookmarks"
          class="text-gray-600 hover:text-gray-900 transition-colors"
          active-class="!text-gray-900 font-medium"
        >
          收藏
        </router-link>
        <router-link
          to="/admin"
          class="text-gray-400 hover:text-gray-600 transition-colors text-xs"
          title="管理后台"
        >
          ⚙
        </router-link>
      </nav>
    </div>
  </header>
</template>
