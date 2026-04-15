<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProjectById, addProject, updateProject } from '../../store'
import { generateId } from '../../utils/id'
import type { Project } from '../../types'

const route = useRoute()
const router = useRouter()

/** 是否是编辑模式 */
const isEdit = computed(() => !!route.params.id)

/** 表单字段 */
const title = ref('')
const description = ref('')
const url = ref('')
const sourceUrl = ref('')
const coverUrl = ref('')
const tagInput = ref('')
const tags = ref<string[]>([])

/** 保存状态 */
const saving = ref(false)
const syncStatus = ref<'success' | 'fail' | ''>('')

/** 加载已有数据 */
onMounted(() => {
  if (isEdit.value) {
    const project = getProjectById(route.params.id as string)
    if (project) {
      title.value = project.title
      description.value = project.description
      url.value = project.url
      sourceUrl.value = project.sourceUrl || ''
      coverUrl.value = project.coverUrl || ''
      tags.value = project.tags ? [...project.tags] : []
    }
  }
})

/** 添加标签 */
function addTag() {
  const val = tagInput.value.trim()
  if (val && !tags.value.includes(val)) {
    tags.value.push(val)
  }
  tagInput.value = ''
}

/** 删除标签 */
function removeTag(index: number) {
  tags.value.splice(index, 1)
}

/** 保存 */
async function handleSave() {
  if (!title.value.trim()) {
    alert('请输入项目名称')
    return
  }
  if (!url.value.trim()) {
    alert('请输入项目链接')
    return
  }

  saving.value = true
  syncStatus.value = ''

  const now = new Date().toISOString()
  const project: Project = {
    id: isEdit.value ? (route.params.id as string) : generateId(),
    title: title.value.trim(),
    description: description.value.trim(),
    url: url.value.trim(),
    sourceUrl: sourceUrl.value.trim() || undefined,
    coverUrl: coverUrl.value.trim() || undefined,
    tags: tags.value.length > 0 ? [...tags.value] : undefined,
    createdAt: isEdit.value
      ? (getProjectById(route.params.id as string)?.createdAt || now)
      : now,
  }

  let ghOk: boolean
  if (isEdit.value) {
    ghOk = await updateProject(project)
  } else {
    ghOk = await addProject(project)
  }

  saving.value = false
  syncStatus.value = ghOk ? 'success' : 'fail'

  // 短暂显示同步状态后跳转
  setTimeout(() => {
    router.push({ name: 'AdminProjects' })
  }, ghOk ? 800 : 2000)
}
</script>

<template>
  <div class="max-w-xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-white font-[family-name:var(--font-mono)]">
        {{ isEdit ? '编辑项目' : '新建项目' }}
      </h1>
      <router-link
        :to="{ name: 'AdminProjects' }"
        class="text-sm text-[#555] hover:text-[#00d4aa] transition-colors font-[family-name:var(--font-mono)]"
      >
        ← 返回列表
      </router-link>
    </div>

    <form @submit.prevent="handleSave" class="space-y-5">
      <!-- 项目名称 -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">项目名称</label>
        <input
          v-model="title"
          type="text"
          placeholder="我的项目"
          class="admin-input"
        />
      </div>

      <!-- 描述 -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">项目描述</label>
        <textarea
          v-model="description"
          placeholder="简短描述这个项目"
          rows="3"
          class="admin-input resize-none"
        />
      </div>

      <!-- 项目链接 -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">项目链接</label>
        <input
          v-model="url"
          type="url"
          placeholder="https://example.github.io/project"
          class="admin-input"
        />
      </div>

      <!-- 源码链接 -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">源码链接（可选）</label>
        <input
          v-model="sourceUrl"
          type="url"
          placeholder="https://github.com/user/repo"
          class="admin-input"
        />
      </div>

      <!-- 封面图 URL -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">封面图 URL（可选）</label>
        <input
          v-model="coverUrl"
          type="url"
          placeholder="https://example.com/cover.png"
          class="admin-input"
        />
      </div>

      <!-- 标签 -->
      <div>
        <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">标签</label>
        <div class="flex gap-2">
          <input
            v-model="tagInput"
            type="text"
            placeholder="输入标签后按回车"
            class="admin-input flex-1"
            @keydown.enter.prevent="addTag"
          />
          <button
            type="button"
            class="btn-secondary text-sm shrink-0"
            @click="addTag"
          >
            添加
          </button>
        </div>
        <div v-if="tags.length" class="flex flex-wrap gap-1.5 mt-2">
          <span
            v-for="(tag, index) in tags"
            :key="tag"
            class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-md bg-[#00d4aa]/10 text-[#00d4aa] font-[family-name:var(--font-mono)]"
          >
            {{ tag }}
            <button
              type="button"
              class="hover:text-red-400 transition-colors"
              @click="removeTag(index)"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- 操作按钮 + 同步状态 -->
      <div class="flex items-center gap-3 pt-4">
        <button
          type="submit"
          class="btn-primary"
          :disabled="saving"
        >
          {{ saving ? '保存中...' : isEdit ? '保存修改' : '添加项目' }}
        </button>
        <router-link
          :to="{ name: 'AdminProjects' }"
          class="btn-secondary"
        >
          取消
        </router-link>
        <span
          v-if="syncStatus === 'success'"
          class="text-[#00d4aa] text-sm font-[family-name:var(--font-mono)]"
        >✓ 已同步到 GitHub</span>
        <span
          v-if="syncStatus === 'fail'"
          class="text-amber-400 text-sm font-[family-name:var(--font-mono)]"
        >⚠ GitHub 同步失败，已保存到本地</span>
      </div>
    </form>
  </div>
</template>
