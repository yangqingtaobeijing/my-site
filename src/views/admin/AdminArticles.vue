<script setup lang="ts">
import { computed, ref } from 'vue'
import { getArticles, deleteArticle } from '../../store'
import { formatDateShort } from '../../utils/date'

const articles = computed(() => getArticles())

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
  const ok = await deleteArticle(id)
  syncOk.value = ok
  syncMsg.value = ok ? '✓ 已同步到 GitHub' : '⚠ GitHub 同步失败，已删除本地'
  setTimeout(() => { syncMsg.value = '' }, 3000)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-white font-[family-name:var(--font-mono)]">文章管理</h1>
      <router-link
        :to="{ name: 'AdminArticleNew' }"
        class="btn-primary text-sm"
      >
        + 新建文章
      </router-link>
    </div>

    <!-- 同步状态提示 -->
    <p
      v-if="syncMsg"
      :class="[
        'text-sm mb-4 font-[family-name:var(--font-mono)]',
        syncOk ? 'text-[#00d4aa]' : 'text-amber-400',
      ]"
    >
      {{ syncMsg }}
    </p>

    <!-- 空状态 -->
    <div v-if="articles.length === 0" class="text-center py-16 text-[#666]">
      <p class="text-lg font-[family-name:var(--font-mono)]">&gt;_ 暂无文章</p>
      <p class="text-sm mt-2 text-[#444]">点击上方按钮创建第一篇文章</p>
    </div>

    <!-- 文章列表 -->
    <div v-else class="bg-[#1e1e2e] rounded-xl border border-[#2a2a3a] overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-[#161622] border-b border-[#2a2a3a]">
          <tr>
            <th class="text-left px-5 py-3 font-medium text-[#999] font-[family-name:var(--font-mono)]">标题</th>
            <th class="text-left px-5 py-3 font-medium text-[#999] font-[family-name:var(--font-mono)] w-20">类型</th>
            <th class="text-left px-5 py-3 font-medium text-[#999] font-[family-name:var(--font-mono)] w-28">日期</th>
            <th class="text-right px-5 py-3 font-medium text-[#999] font-[family-name:var(--font-mono)] w-32">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#2a2a3a]">
          <tr v-for="article in articles" :key="article.id" class="hover:bg-[#161622]/50">
            <td class="px-5 py-3.5 text-[#e0e0e0]">{{ article.title }}</td>
            <td class="px-5 py-3.5">
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded font-[family-name:var(--font-mono)]',
                  article.type === 'local'
                    ? 'bg-[#00d4aa]/10 text-[#00d4aa]'
                    : 'bg-amber-500/10 text-amber-400',
                ]"
              >
                {{ article.type === 'local' ? '本地' : '外链' }}
              </span>
            </td>
            <td class="px-5 py-3.5 text-[#666] font-[family-name:var(--font-mono)]">{{ formatDateShort(article.createdAt) }}</td>
            <td class="px-5 py-3.5 text-right">
              <div v-if="deletingId === article.id" class="flex items-center justify-end gap-2">
                <button
                  class="text-red-400 hover:text-red-300 text-xs font-medium font-[family-name:var(--font-mono)]"
                  @click="doDelete(article.id)"
                >
                  确认删除
                </button>
                <button
                  class="text-[#666] hover:text-[#999] text-xs font-[family-name:var(--font-mono)]"
                  @click="cancelDelete"
                >
                  取消
                </button>
              </div>
              <div v-else class="flex items-center justify-end gap-3">
                <router-link
                  :to="{ name: 'AdminArticleEdit', params: { id: article.id } }"
                  class="text-[#00d4aa] hover:text-[#00d4aa]/80 text-xs font-medium font-[family-name:var(--font-mono)]"
                >
                  编辑
                </router-link>
                <button
                  class="text-[#555] hover:text-red-400 text-xs font-[family-name:var(--font-mono)]"
                  @click="confirmDelete(article.id)"
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
