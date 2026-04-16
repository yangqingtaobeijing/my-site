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

/** 保存状态 */
const saving = ref(false)
const syncStatus = ref<'success' | 'fail' | ''>('')

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
async function handleSave() {
  if (!title.value.trim()) {
    alert('请输入标题')
    return
  }
  if (!url.value.trim()) {
    alert('请输入链接地址')
    return
  }

  saving.value = true
  syncStatus.value = ''

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

  let ghOk: boolean
  if (isEdit.value) {
    ghOk = await updateBookmark(bookmark)
  } else {
    ghOk = await addBookmark(bookmark)
  }

  saving.value = false
  syncStatus.value = ghOk ? 'success' : 'fail'

  // 短暂显示同步状态后跳转
  setTimeout(() => {
    router.push({ name: 'AdminBookmarks' })
  }, ghOk ? 800 : 2000)
}
</script>

<template>
  <div class="max-w-xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">
        {{ isEdit ? '编辑收藏' : '新建收藏' }}
      </h1>
      <router-link
        :to="{ name: 'AdminBookmarks' }"
        class="text-sm text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-mono)]"
      >
        ← 返回列表
      </router-link>
    </div>

    <form @submit.prevent="handleSave" class="space-y-5">
      <!-- 标题 -->
      <div>
        <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">标题</label>
        <input
          v-model="title"
          type="text"
          placeholder="收藏名称"
          class="admin-input"
        />
      </div>

      <!-- 描述 -->
      <div>
        <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">描述</label>
        <textarea
          v-model="description"
          placeholder="简短描述"
          rows="3"
          class="admin-input resize-none"
        />
      </div>

      <!-- URL -->
      <div>
        <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">链接地址</label>
        <input
          v-model="url"
          type="url"
          placeholder="https://example.com"
          class="admin-input"
        />
      </div>

      <!-- 操作按钮 + 同步状态 -->
      <div class="flex items-center gap-3 pt-4">
        <button
          type="submit"
          class="btn-primary"
          :disabled="saving"
        >
          {{ saving ? '保存中...' : isEdit ? '保存修改' : '添加收藏' }}
        </button>
        <router-link
          :to="{ name: 'AdminBookmarks' }"
          class="btn-secondary"
        >
          取消
        </router-link>
        <span
          v-if="syncStatus === 'success'"
          class="text-[var(--color-accent)] text-sm font-[family-name:var(--font-mono)]"
        >✓ 已同步到 GitHub</span>
        <span
          v-if="syncStatus === 'fail'"
          class="text-amber-400 text-sm font-[family-name:var(--font-mono)]"
        >⚠ GitHub 同步失败，已保存到本地</span>
      </div>
    </form>
  </div>
</template>
