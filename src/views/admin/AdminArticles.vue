<script setup lang="ts">
import { computed, ref } from 'vue'
import { getArticles, deleteArticle } from '../../store'
import { formatDateShort } from '../../utils/date'

const articles = computed(() => getArticles())

/** 删除确认 */
const deletingId = ref<string | null>(null)

function confirmDelete(id: string) {
  deletingId.value = id
}

function cancelDelete() {
  deletingId.value = null
}

function doDelete(id: string) {
  deleteArticle(id)
  deletingId.value = null
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-gray-900">文章管理</h1>
      <router-link
        :to="{ name: 'AdminArticleNew' }"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
      >
        + 新建文章
      </router-link>
    </div>

    <!-- 空状态 -->
    <div v-if="articles.length === 0" class="text-center py-16 text-gray-400">
      <p class="text-lg">暂无文章</p>
      <p class="text-sm mt-2">点击上方按钮创建第一篇文章</p>
    </div>

    <!-- 文章列表 -->
    <div v-else class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="text-left px-5 py-3 font-medium text-gray-600">标题</th>
            <th class="text-left px-5 py-3 font-medium text-gray-600 w-20">类型</th>
            <th class="text-left px-5 py-3 font-medium text-gray-600 w-28">日期</th>
            <th class="text-right px-5 py-3 font-medium text-gray-600 w-32">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="article in articles" :key="article.id" class="hover:bg-gray-50/50">
            <td class="px-5 py-3.5 text-gray-900">{{ article.title }}</td>
            <td class="px-5 py-3.5">
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded',
                  article.type === 'local'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-amber-50 text-amber-600',
                ]"
              >
                {{ article.type === 'local' ? '本地' : '外链' }}
              </span>
            </td>
            <td class="px-5 py-3.5 text-gray-500">{{ formatDateShort(article.createdAt) }}</td>
            <td class="px-5 py-3.5 text-right">
              <div v-if="deletingId === article.id" class="flex items-center justify-end gap-2">
                <button
                  class="text-red-600 hover:text-red-700 text-xs font-medium"
                  @click="doDelete(article.id)"
                >
                  确认删除
                </button>
                <button
                  class="text-gray-400 hover:text-gray-600 text-xs"
                  @click="cancelDelete"
                >
                  取消
                </button>
              </div>
              <div v-else class="flex items-center justify-end gap-3">
                <router-link
                  :to="{ name: 'AdminArticleEdit', params: { id: article.id } }"
                  class="text-indigo-600 hover:text-indigo-700 text-xs font-medium"
                >
                  编辑
                </router-link>
                <button
                  class="text-gray-400 hover:text-red-500 text-xs"
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
