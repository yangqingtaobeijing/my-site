<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTheme } from '../../utils/theme'

const router = useRouter()
const { nextThemeLabel, toggleTheme } = useTheme()

/** 退出登录 */
function logout() {
  sessionStorage.removeItem('admin_logged_in')
  router.push('/admin')
}

/** 导航菜单 */
const navItems = [
  { name: 'AdminArticles', label: '文章管理', icon: '📝' },
  { name: 'AdminBookmarks', label: '收藏管理', icon: '🔗' },
  { name: 'AdminAnalytics', label: '数据概览', icon: '📊' },
  { name: 'AdminProjects', label: '项目管理', icon: '🚀' },
  { name: 'AdminSettings', label: '站点设置', icon: '⚙️' },
]
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)] flex">
    <!-- 侧边栏 -->
    <aside class="w-56 bg-[var(--color-bg-elevated)] border-r border-[var(--color-border)] flex flex-col shrink-0">
      <div class="p-5 border-b border-[var(--color-border)]">
        <router-link to="/" class="text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-mono)]">
          ← 返回前台
        </router-link>
        <div class="mt-2 flex items-center justify-between gap-3">
          <h2 class="text-base font-semibold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">
            管理后台
          </h2>
          <button
            type="button"
            class="h-7 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-soft)] px-2 text-xs text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-mono)]"
            :aria-label="`切换到${nextThemeLabel}主题`"
            :title="`切换到${nextThemeLabel}主题`"
            @click="toggleTheme"
          >
            {{ nextThemeLabel }}
          </button>
        </div>
      </div>

      <nav class="flex-1 p-3 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="{ name: item.name }"
          class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text)] transition-colors"
          active-class="!bg-[var(--color-accent-dim)] !text-[var(--color-accent)] font-medium"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="p-3 border-t border-[var(--color-border)]">
        <button
          class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-subtle)] hover:text-red-400 hover:bg-red-400/10 transition-colors"
          @click="logout"
        >
          <span>🚪</span>
          <span>退出登录</span>
        </button>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1 p-8 overflow-auto">
      <router-view />
    </main>
  </div>
</template>
