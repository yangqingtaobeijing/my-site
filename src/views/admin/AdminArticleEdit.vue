<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleById, addArticle, updateArticle } from '../../store'
import { generateId } from '../../utils/id'
import { renderMarkdown } from '../../utils/markdown'
import type { Article } from '../../types'

const route = useRoute()
const router = useRouter()

/** 是否是编辑模式 */
const isEdit = computed(() => !!route.params.id)

/** 文章类型 */
const articleType = ref<'local' | 'external'>('local')

/** 表单字段 */
const title = ref('')
const summary = ref('')
const content = ref('')
const externalUrl = ref('')

/** 预览模式 */
const showPreview = ref(false)

const previewHtml = computed(() => renderMarkdown(content.value))

/** 加载已有文章数据 */
onMounted(() => {
  if (isEdit.value) {
    const article = getArticleById(route.params.id as string)
    if (article) {
      articleType.value = article.type
      title.value = article.title
      summary.value = article.summary
      content.value = article.content || ''
      externalUrl.value = article.externalUrl || ''
    }
  }
})

/** 保存文章 */
function handleSave() {
  if (!title.value.trim()) {
    alert('请输入标题')
    return
  }
  if (!summary.value.trim()) {
    alert('请输入摘要')
    return
  }
  if (articleType.value === 'local' && !content.value.trim()) {
    alert('请输入文章内容')
    return
  }
  if (articleType.value === 'external' && !externalUrl.value.trim()) {
    alert('请输入外链 URL')
    return
  }

  const now = new Date().toISOString()
  const article: Article = {
    id: isEdit.value ? (route.params.id as string) : generateId(),
    type: articleType.value,
    title: title.value.trim(),
    summary: summary.value.trim(),
    content: articleType.value === 'local' ? content.value : undefined,
    externalUrl: articleType.value === 'external' ? externalUrl.value.trim() : undefined,
    createdAt: isEdit.value
      ? (getArticleById(route.params.id as string)?.createdAt || now)
      : now,
    updatedAt: now,
  }

  if (isEdit.value) {
    updateArticle(article)
  } else {
    addArticle(article)
  }

  router.push({ name: 'AdminArticles' })
}
</script>

<template>
  <div class="max-w-3xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-gray-900">
        {{ isEdit ? '编辑文章' : '新建文章' }}
      </h1>
      <router-link
        :to="{ name: 'AdminArticles' }"
        class="text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        ← 返回列表
      </router-link>
    </div>

    <form @submit.prevent="handleSave" class="space-y-5">
      <!-- 文章类型 -->
      <div>
        <label class="block text-sm text-gray-600 mb-2">文章类型</label>
        <div class="flex gap-3">
          <button
            type="button"
            :class="[
              'px-4 py-2 rounded-lg text-sm border transition-colors',
              articleType === 'local'
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
            ]"
            @click="articleType = 'local'"
          >
            ✍️ 写文章
          </button>
          <button
            type="button"
            :class="[
              'px-4 py-2 rounded-lg text-sm border transition-colors',
              articleType === 'external'
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
            ]"
            @click="articleType = 'external'"
          >
            🔗 贴链接
          </button>
        </div>
      </div>

      <!-- 标题 -->
      <div>
        <label class="block text-sm text-gray-600 mb-1.5">标题</label>
        <input
          v-model="title"
          type="text"
          placeholder="文章标题"
          class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
      </div>

      <!-- 摘要 -->
      <div>
        <label class="block text-sm text-gray-600 mb-1.5">摘要</label>
        <textarea
          v-model="summary"
          placeholder="简短描述文章内容"
          rows="2"
          class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
        />
      </div>

      <!-- 本地文章：Markdown 编辑器 -->
      <div v-if="articleType === 'local'">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-sm text-gray-600">内容（Markdown）</label>
          <button
            type="button"
            class="text-xs text-indigo-600 hover:text-indigo-700"
            @click="showPreview = !showPreview"
          >
            {{ showPreview ? '编辑' : '预览' }}
          </button>
        </div>
        <div v-if="showPreview" class="markdown-body p-5 bg-white border border-gray-200 rounded-lg min-h-[300px]" v-html="previewHtml" />
        <textarea
          v-else
          v-model="content"
          placeholder="在这里写 Markdown 内容..."
          rows="16"
          class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-mono resize-y"
        />
      </div>

      <!-- 外链文章：URL -->
      <div v-if="articleType === 'external'">
        <label class="block text-sm text-gray-600 mb-1.5">公众号链接</label>
        <input
          v-model="externalUrl"
          type="url"
          placeholder="https://mp.weixin.qq.com/s/..."
          class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          {{ isEdit ? '保存修改' : '发布文章' }}
        </button>
        <router-link
          :to="{ name: 'AdminArticles' }"
          class="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
        >
          取消
        </router-link>
      </div>
    </form>
  </div>
</template>
