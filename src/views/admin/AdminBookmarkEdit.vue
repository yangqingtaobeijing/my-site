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
      <h1 class="text-xl font-bold text-white font-[family-name:var(--font-mono)]">
        {{ isEdit ? '编辑收藏' : '新建收藏' }}
      </h1>
      <router-link
        :to="{ name: 'AdminBookmarks' }"
        class="text-sm text-[#555] hover:text-[#00d4aa] transition-colors font-[family-name:var(--font-mono)]"
      >
        ← 返回列表
      </router-link>
    </div>

    <form @submit.prevent="handleSave" class="space-y-5">
      <!-- 标题 -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">标题</label>
        <input
          v-model="title"
          type="text"
          placeholder="收藏名称"
          class="admin-input"
        />
      </div>

      <!-- 描述 -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">描述</label>
        <textarea
          v-model="description"
          placeholder="简短描述"
          rows="3"
          class="admin-input resize-none"
        />
      </div>

      <!-- URL -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">链接地址</label>
        <input
          v-model="url"
          type="url"
          placeholder="https://example.com"
          class="admin-input"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          class="btn-primary"
        >
          {{ isEdit ? '保存修改' : '添加收藏' }}
        </button>
        <router-link
          :to="{ name: 'AdminBookmarks' }"
          class="btn-secondary"
        >
          取消
        </router-link>
      </div>
    </form>
  </div>
</template>
