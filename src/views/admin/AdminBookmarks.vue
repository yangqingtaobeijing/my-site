<script setup lang="ts">
import { computed, ref } from 'vue'
import { getBookmarks, deleteBookmark, toggleBookmarkHidden } from '../../store'
import { extractDomain } from '../../utils/url'

const bookmarks = computed(() => getBookmarks())

/** 删除确认 */
const deletingId = ref<string | null>(null)

/** 同步状态提示 */
const syncMsg = ref('')
const syncOk = ref(true)

function confirmDelete(id: string) {
  deletingId.value = id
}

function cancelDelete() {
  deletingId.value = null
}

async function doDelete(id: string) {
  deletingId.value = null
  const ok = await deleteBookmark(id)
  syncOk.value = ok
  syncMsg.value = ok ? '✓ 已同步到 GitHub' : '⚠ GitHub 同步失败，已删除本地'
  setTimeout(() => { syncMsg.value = '' }, 3000)
}

async function toggleHidden(id: string) {
  const ok = await toggleBookmarkHidden(id)
  syncOk.value = ok
  syncMsg.value = ok ? '✓ 已同步到 GitHub' : '⚠ GitHub 同步失败，已更新本地'
  setTimeout(() => { syncMsg.value = '' }, 3000)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">收藏管理</h1>
      <router-link
        :to="{ name: 'AdminBookmarkNew' }"
        class="btn-primary text-sm"
      >
        + 新建收藏
      </router-link>
    </div>

    <!-- 同步状态提示 -->
    <p
      v-if="syncMsg"
      :class="[
        'text-sm mb-4 font-[family-name:var(--font-mono)]',
        syncOk ? 'text-[var(--color-accent)]' : 'text-amber-400',
      ]"
    >
      {{ syncMsg }}
    </p>

    <!-- 空状态 -->
    <div v-if="bookmarks.length === 0" class="text-center py-16 text-[var(--color-text-muted)]">
      <p class="text-lg font-[family-name:var(--font-mono)]">&gt;_ 暂无收藏</p>
      <p class="text-sm mt-2 text-[var(--color-text-faint)]">点击上方按钮添加收藏链接</p>
    </div>

    <!-- 收藏列表 -->
    <div v-else class="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
          <tr>
            <th class="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)]">标题</th>
            <th class="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-40">域名</th>
            <th class="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-16">状态</th>
            <th class="text-right px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-36">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color-border)]">
          <tr v-for="bookmark in bookmarks" :key="bookmark.id" :class="['hover:bg-[var(--color-bg-elevated-soft)]', bookmark.hidden ? 'opacity-50' : '']">
            <td class="px-5 py-3.5 text-[var(--color-text)]">{{ bookmark.title }}</td>
            <td class="px-5 py-3.5 text-[var(--color-text-muted)] text-xs font-[family-name:var(--font-mono)]">{{ extractDomain(bookmark.url) }}</td>
            <td class="px-5 py-3.5">
              <span :class="['text-xs px-2 py-0.5 rounded font-[family-name:var(--font-mono)]', bookmark.hidden ? 'bg-gray-500/20 text-gray-400' : 'bg-emerald-500/10 text-emerald-400']">
                {{ bookmark.hidden ? '隐藏' : '显示' }}
              </span>
            </td>
            <td class="px-5 py-3.5 text-right">
              <div v-if="deletingId === bookmark.id" class="flex items-center justify-end gap-2">
                <button
                  class="text-red-400 hover:text-red-300 text-xs font-medium font-[family-name:var(--font-mono)]"
                  @click="doDelete(bookmark.id)"
                >
                  确认删除
                </button>
                <button
                  class="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] text-xs font-[family-name:var(--font-mono)]"
                  @click="cancelDelete"
                >
                  取消
                </button>
              </div>
              <div v-else class="flex items-center justify-end gap-3">
                <button
                  class="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-xs font-[family-name:var(--font-mono)]"
                  @click="toggleHidden(bookmark.id)"
                >
                  {{ bookmark.hidden ? '显示' : '隐藏' }}
                </button>
                <router-link
                  :to="{ name: 'AdminBookmarkEdit', params: { id: bookmark.id } }"
                  class="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-xs font-medium font-[family-name:var(--font-mono)]"
                >
                  编辑
                </router-link>
                <button
                  class="text-[var(--color-text-subtle)] hover:text-red-400 text-xs font-[family-name:var(--font-mono)]"
                  @click="confirmDelete(bookmark.id)"
                >
                  删除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
