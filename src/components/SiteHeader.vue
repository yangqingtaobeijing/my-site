<script setup lang="ts">
import { computed } from 'vue'
import { store } from '../store'
import { useTheme } from '../utils/theme'

const config = computed(() => store.config)
const { nextThemeLabel, toggleTheme } = useTheme()
</script>

<template>
  <header class="border-b border-[var(--color-border)] bg-[var(--color-header-bg)] backdrop-blur-md sticky top-0 z-50">
    <div class="mx-auto max-w-[800px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <!-- 站点标题：手机端只显示图标 -->
      <router-link to="/" class="flex items-center gap-2 sm:gap-3 group shrink-0">
        <img
          v-if="config.avatarUrl"
          :src="config.avatarUrl"
          :alt="config.title"
          class="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-all"
        />
        <div
          v-else
          class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] text-xs font-bold font-[family-name:var(--font-mono)]"
        >
          {{ config.title.charAt(0) }}
        </div>
        <span class="hidden sm:inline text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-mono)]">
          {{ config.title }}
        </span>
      </router-link>

      <!-- 导航：手机端缩小间距和字号，隐藏 >_ 前缀 -->
      <nav class="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-[family-name:var(--font-mono)]">
        <router-link
          to="/"
          class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors link-underline whitespace-nowrap"
          active-class="!text-[var(--color-accent)]"
          exact
        >
          <span class="hidden sm:inline text-[var(--color-accent-muted)] mr-1">&gt;_</span>文章
        </router-link>
        <router-link
          to="/bookmarks"
          class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors link-underline whitespace-nowrap"
          active-class="!text-[var(--color-accent)]"
        >
          <span class="hidden sm:inline text-[var(--color-accent-muted)] mr-1">&gt;_</span>收藏
        </router-link>
        <router-link
          to="/projects"
          class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors link-underline whitespace-nowrap"
          active-class="!text-[var(--color-accent)]"
        >
          <span class="hidden sm:inline text-[var(--color-accent-muted)] mr-1">&gt;_</span>Vibe Coding
        </router-link>
        <router-link
          to="/admin"
          class="text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors text-xs"
          title="管理后台"
        >
          ⚙
        </router-link>
        <button
          type="button"
          class="h-8 min-w-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-soft)] px-2 text-xs text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          :aria-label="`切换到${nextThemeLabel}主题`"
          :title="`切换到${nextThemeLabel}主题`"
          @click="toggleTheme"
        >
          {{ nextThemeLabel }}
        </button>
      </nav>
    </div>
  </header>
</template>
