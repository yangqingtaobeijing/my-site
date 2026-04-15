<script setup lang="ts">
import { computed } from 'vue'
import { store } from '../store'

const config = computed(() => store.config)
</script>

<template>
  <header class="border-b border-[#2a2a3a] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50">
    <div class="mx-auto max-w-[800px] px-6 py-4 flex items-center justify-between">
      <!-- 站点标题 -->
      <router-link to="/" class="flex items-center gap-3 group">
        <img
          v-if="config.avatarUrl"
          :src="config.avatarUrl"
          :alt="config.title"
          class="w-8 h-8 rounded-full object-cover border border-[#2a2a3a] group-hover:border-[#00d4aa] transition-all"
        />
        <div
          v-else
          class="w-8 h-8 rounded-full bg-[#1e1e2e] border border-[#2a2a3a] flex items-center justify-center text-[#00d4aa] text-xs font-bold font-[family-name:var(--font-mono)]"
        >
          {{ config.title.charAt(0) }}
        </div>
        <span class="text-base font-semibold text-[#e0e0e0] group-hover:text-[#00d4aa] transition-colors font-[family-name:var(--font-mono)]">
          {{ config.title }}
        </span>
      </router-link>

      <!-- 导航 -->
      <nav class="flex items-center gap-6 text-sm font-[family-name:var(--font-mono)]">
        <router-link
          to="/"
          class="text-[#666] hover:text-[#00d4aa] transition-colors link-underline"
          active-class="!text-[#00d4aa]"
          exact
        >
          <span class="text-[#00d4aa]/50 mr-1">&gt;_</span>文章
        </router-link>
        <router-link
          to="/bookmarks"
          class="text-[#666] hover:text-[#00d4aa] transition-colors link-underline"
          active-class="!text-[#00d4aa]"
        >
          <span class="text-[#00d4aa]/50 mr-1">&gt;_</span>收藏
        </router-link>
        <router-link
          to="/admin"
          class="text-[#333] hover:text-[#666] transition-colors text-xs"
          title="管理后台"
        >
          ⚙
        </router-link>
      </nav>
    </div>
  </header>
</template>
