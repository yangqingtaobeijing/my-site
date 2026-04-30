<script setup lang="ts">
import { computed, ref } from 'vue'
import { getProjects, deleteProject, toggleProjectHidden } from '../../store'
import { extractDomain } from '../../utils/url'

const projects = computed(() => getProjects())

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
  const ok = await deleteProject(id)
  syncOk.value = ok
  syncMsg.value = ok ? '✓ 已同步到 GitHub' : '⚠ GitHub 同步失败，已删除本地'
  setTimeout(() => { syncMsg.value = '' }, 3000)
}

async function toggleHidden(id: string) {
  const ok = await toggleProjectHidden(id)
  syncOk.value = ok
  syncMsg.value = ok ? '✓ 已同步到 GitHub' : '⚠ GitHub 同步失败，已更新本地'
  setTimeout(() => { syncMsg.value = '' }, 3000)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">项目管理</h1>
      <router-link
        :to="{ name: 'AdminProjectNew' }"
        class="btn-primary text-sm"
      >
        + 新建项目
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
    <div v-if="projects.length === 0" class="text-center py-16 text-[var(--color-text-muted)]">
      <p class="text-lg font-[family-name:var(--font-mono)]">&gt;_ 暂无项目</p>
      <p class="text-sm mt-2 text-[var(--color-text-faint)]">点击上方按钮添加项目作品</p>
    </div>

    <!-- 项目列表 -->
    <div v-else class="bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
          <tr>
            <th class="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)]">名称</th>
            <th class="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-40">域名</th>
            <th class="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-40">标签</th>
            <th class="text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-16">状态</th>
            <th class="text-right px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-36">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color-border)]">
          <tr v-for="project in projects" :key="project.id" :class="['hover:bg-[var(--color-bg-elevated-soft)]', project.hidden ? 'opacity-50' : '']">
            <td class="px-5 py-3.5 text-[var(--color-text)]">{{ project.title }}</td>
            <td class="px-5 py-3.5 text-[var(--color-text-muted)] text-xs font-[family-name:var(--font-mono)]">{{ extractDomain(project.url) }}</td>
            <td class="px-5 py-3.5">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tag in (project.tags || [])"
                  :key="tag"
                  class="px-1.5 py-0.5 text-xs rounded bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-[family-name:var(--font-mono)]"
                >
                  {{ tag }}
                </span>
              </div>
            </td>
            <td class="px-5 py-3.5">
              <span :class="['text-xs px-2 py-0.5 rounded font-[family-name:var(--font-mono)]', project.hidden ? 'bg-gray-500/20 text-gray-400' : 'bg-emerald-500/10 text-emerald-400']">
                {{ project.hidden ? '隐藏' : '显示' }}
              </span>
            </td>
            <td class="px-5 py-3.5 text-right">
              <div v-if="deletingId === project.id" class="flex items-center justify-end gap-2">
                <button
                  class="text-red-400 hover:text-red-300 text-xs font-medium font-[family-name:var(--font-mono)]"
                  @click="doDelete(project.id)"
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
                  @click="toggleHidden(project.id)"
                >
                  {{ project.hidden ? '显示' : '隐藏' }}
                </button>
                <router-link
                  :to="{ name: 'AdminProjectEdit', params: { id: project.id } }"
                  class="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-xs font-medium font-[family-name:var(--font-mono)]"
                >
                  编辑
                </router-link>
                <button
                  class="text-[var(--color-text-subtle)] hover:text-red-400 text-xs font-[family-name:var(--font-mono)]"
                  @click="confirmDelete(project.id)"
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
