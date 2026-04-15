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
  <div class="min-h-screen bg-gray-50 flex">
    <!-- 侧边栏 -->
    <aside class="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div class="p-5 border-b border-gray-100">
        <router-link to="/" class="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← 返回前台
        </router-link>
        <h2 class="text-base font-semibold text-gray-900 mt-2">管理后台</h2>
      </div>

      <nav class="flex-1 p-3 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="{ name: item.name }"
          class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          active-class="!bg-indigo-50 !text-indigo-700 font-medium"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="p-3 border-t border-gray-100">
        <button
          class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
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
