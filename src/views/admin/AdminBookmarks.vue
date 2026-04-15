<script setup lang="ts">
import { computed, ref } from 'vue'
import { getBookmarks, deleteBookmark } from '../../store'
import { extractDomain } from '../../utils/url'

const bookmarks = computed(() => getBookmarks())

/** 删除确认 */
const deletingId = ref<string | null>(null)

function confirmDelete(id: string) {
  deletingId.value = id
}

function cancelDelete() {
  deletingId.value = null
}

function doDelete(id: string) {
  deleteBookmark(id)
  deletingId.value = null
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-gray-900">收藏管理</h1>
      <router-link
        :to="{ name: 'AdminBookmarkNew' }"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
      >
        + 新建收藏
      </router-link>
    </div>

    <!-- 空状态 -->
    <div v-if="bookmarks.length === 0" class="text-center py-16 text-gray-400">
      <p class="text-lg">暂无收藏</p>
      <p class="text-sm mt-2">点击上方按钮添加收藏链接</p>
    </div>

    <!-- 收藏列表 -->
    <div v-else class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="text-left px-5 py-3 font-medium text-gray-600">标题</th>
            <th class="text-left px-5 py-3 font-medium text-gray-600 w-40">域名</th>
            <th class="text-right px-5 py-3 font-medium text-gray-600 w-32">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="bookmark in bookmarks" :key="bookmark.id" class="hover:bg-gray-50/50">
            <td class="px-5 py-3.5 text-gray-900">{{ bookmark.title }}</td>
            <td class="px-5 py-3.5 text-gray-500 text-xs">{{ extractDomain(bookmark.url) }}</td>
            <td class="px-5 py-3.5 text-right">
              <div v-if="deletingId === bookmark.id" class="flex items-center justify-end gap-2">
                <button
                  class="text-red-600 hover:text-red-700 text-xs font-medium"
                  @click="doDelete(bookmark.id)"
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
                  :to="{ name: 'AdminBookmarkEdit', params: { id: bookmark.id } }"
                  class="text-indigo-600 hover:text-indigo-700 text-xs font-medium"
                >
                  编辑
                </router-link>
                <button
                  class="text-gray-400 hover:text-red-500 text-xs"
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
