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
      <h1 class="text-xl font-bold text-white font-[family-name:var(--font-mono)]">
        {{ isEdit ? '编辑文章' : '新建文章' }}
      </h1>
      <router-link
        :to="{ name: 'AdminArticles' }"
        class="text-sm text-[#555] hover:text-[#00d4aa] transition-colors font-[family-name:var(--font-mono)]"
      >
        ← 返回列表
      </router-link>
    </div>

    <form @submit.prevent="handleSave" class="space-y-5">
      <!-- 文章类型 -->
      <div>
        <label class="block text-sm text-[#999] mb-2 font-[family-name:var(--font-mono)]">文章类型</label>
        <div class="flex gap-3">
          <button
            type="button"
            :class="[
              'px-4 py-2 rounded-lg text-sm border transition-colors font-[family-name:var(--font-mono)]',
              articleType === 'local'
                ? 'bg-[#00d4aa]/10 border-[#00d4aa]/30 text-[#00d4aa]'
                : 'bg-[#1e1e2e] border-[#2a2a3a] text-[#666] hover:border-[#444]',
            ]"
            @click="articleType = 'local'"
          >
            ✍️ 写文章
          </button>
          <button
            type="button"
            :class="[
              'px-4 py-2 rounded-lg text-sm border transition-colors font-[family-name:var(--font-mono)]',
              articleType === 'external'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-[#1e1e2e] border-[#2a2a3a] text-[#666] hover:border-[#444]',
            ]"
            @click="articleType = 'external'"
          >
            🔗 贴链接
          </button>
        </div>
      </div>

      <!-- 标题 -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">标题</label>
        <input
          v-model="title"
          type="text"
          placeholder="文章标题"
          class="admin-input"
        />
      </div>

      <!-- 摘要 -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">摘要</label>
        <textarea
          v-model="summary"
          placeholder="简短描述文章内容"
          rows="2"
          class="admin-input resize-none"
        />
      </div>

      <!-- 本地文章：Markdown 编辑器 -->
      <div v-if="articleType === 'local'">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-sm text-[#999] font-[family-name:var(--font-mono)]">内容（Markdown）</label>
          <button
            type="button"
            class="text-xs text-[#00d4aa] hover:text-[#00d4aa]/80 font-[family-name:var(--font-mono)]"
            @click="showPreview = !showPreview"
          >
            {{ showPreview ? '&lt; 编辑' : '预览 &gt;' }}
          </button>
        </div>
        <div
          v-if="showPreview"
          class="markdown-body p-5 bg-[#1e1e2e] border border-[#2a2a3a] rounded-lg min-h-[300px]"
          v-html="previewHtml"
        />
        <textarea
          v-else
          v-model="content"
          placeholder="在这里写 Markdown 内容..."
          rows="16"
          class="admin-input font-[family-name:var(--font-mono)] resize-y"
        />
      </div>

      <!-- 外链文章：URL -->
      <div v-if="articleType === 'external'">
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">公众号链接</label>
        <input
          v-model="externalUrl"
          type="url"
          placeholder="https://mp.weixin.qq.com/s/..."
          class="admin-input"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          class="btn-primary"
        >
          {{ isEdit ? '保存修改' : '发布文章' }}
        </button>
        <router-link
          :to="{ name: 'AdminArticles' }"
          class="btn-secondary"
        >
          取消
        </router-link>
      </div>
    </form>
  </div>
</template>
