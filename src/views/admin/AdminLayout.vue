<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

/** 退出登录 */
function logout() {
  sessionStorage.removeItem('admin_logged_in')
  router.push('/admin')
}

/** 导航菜单 */
const navItems = [
  { name: 'AdminArticles', label: '文章管理', icon: '📝' },
  { name: 'AdminBookmarks', label: '收藏管理', icon: '🔗' },
  { name: 'AdminSettings', label: '站点设置', icon: '⚙️' },
]
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] flex">
    <!-- 侧边栏 -->
    <aside class="w-56 bg-[#161622] border-r border-[#2a2a3a] flex flex-col shrink-0">
      <div class="p-5 border-b border-[#2a2a3a]">
        <router-link to="/" class="text-xs text-[#555] hover:text-[#00d4aa] transition-colors font-[family-name:var(--font-mono)]">
          ← 返回前台
        </router-link>
        <h2 class="text-base font-semibold text-white mt-2 font-[family-name:var(--font-mono)]">
          管理后台
        </h2>
      </div>

      <nav class="flex-1 p-3 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="{ name: item.name }"
          class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#999] hover:bg-[#1e1e2e] hover:text-[#e0e0e0] transition-colors"
          active-class="!bg-[#00d4aa]/10 !text-[#00d4aa] font-medium"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="p-3 border-t border-[#2a2a3a]">
        <button
          class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#555] hover:text-red-400 hover:bg-red-400/10 transition-colors"
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
