<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBookmarkById, addBookmark, updateBookmark } from '../../store'
import { generateId } from '../../utils/id'
import type { Bookmark } from '../../types'

const route = useRoute()
const router = useRouter()

/** 是否是编辑模式 */
const isEdit = computed(() => !!route.params.id)

/** 表单字段 */
const title = ref('')
const description = ref('')
const url = ref('')

/** 加载已有数据 */
onMounted(() => {
  if (isEdit.value) {
    const bookmark = getBookmarkById(route.params.id as string)
    if (bookmark) {
      title.value = bookmark.title
      description.value = bookmark.description
      url.value = bookmark.url
    }
  }
})

/** 保存 */
function handleSave() {
  if (!title.value.trim()) {
    alert('请输入标题')
    return
  }
  if (!url.value.trim()) {
    alert('请输入链接地址')
    return
  }

  const now = new Date().toISOString()
  const bookmark: Bookmark = {
    id: isEdit.value ? (route.params.id as string) : generateId(),
    title: title.value.trim(),
    description: description.value.trim(),
    url: url.value.trim(),
    createdAt: isEdit.value
      ? (getBookmarkById(route.params.id as string)?.createdAt || now)
      : now,
  }

  if (isEdit.value) {
    updateBookmark(bookmark)
  } else {
    addBookmark(bookmark)
  }

  router.push({ name: 'AdminBookmarks' })
}
</script>

<template>
  <div class="max-w-xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-gray-900">
        {{ isEdit ? '编辑收藏' : '新建收藏' }}
      </h1>
      <router-link
        :to="{ name: 'AdminBookmarks' }"
        class="text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        ← 返回列表
      </router-link>
    </div>

    <form @submit.prevent="handleSave" class="space-y-5">
      <!-- 标题 -->
      <div>
        <label class="block text-sm text-gray-600 mb-1.5">标题</label>
        <input
          v-model="title"
          type="text"
          placeholder="收藏名称"
          class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
      </div>

      <!-- 描述 -->
      <div>
        <label class="block text-sm text-gray-600 mb-1.5">描述</label>
        <textarea
          v-model="description"
          placeholder="简短描述"
          rows="3"
          class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
        />
      </div>

      <!-- URL -->
      <div>
        <label class="block text-sm text-gray-600 mb-1.5">链接地址</label>
        <input
          v-model="url"
          type="url"
          placeholder="https://example.com"
          class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          {{ isEdit ? '保存修改' : '添加收藏' }}
        </button>
        <router-link
          :to="{ name: 'AdminBookmarks' }"
          class="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
        >
          取消
        </router-link>
      </div>
    </form>
  </div>
</template>
