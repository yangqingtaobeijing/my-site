<script setup lang="ts">
import { computed, ref } from 'vue'
import { getProjects, deleteProject } from '../../store'
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
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-white font-[family-name:var(--font-mono)]">项目管理</h1>
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
        syncOk ? 'text-[#00d4aa]' : 'text-amber-400',
      ]"
    >
      {{ syncMsg }}
    </p>

    <!-- 空状态 -->
    <div v-if="projects.length === 0" class="text-center py-16 text-[#666]">
      <p class="text-lg font-[family-name:var(--font-mono)]">&gt;_ 暂无项目</p>
      <p class="text-sm mt-2 text-[#444]">点击上方按钮添加项目作品</p>
    </div>

    <!-- 项目列表 -->
    <div v-else class="bg-[#1e1e2e] rounded-xl border border-[#2a2a3a] overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-[#161622] border-b border-[#2a2a3a]">
          <tr>
            <th class="text-left px-5 py-3 font-medium text-[#999] font-[family-name:var(--font-mono)]">名称</th>
            <th class="text-left px-5 py-3 font-medium text-[#999] font-[family-name:var(--font-mono)] w-40">域名</th>
            <th class="text-left px-5 py-3 font-medium text-[#999] font-[family-name:var(--font-mono)] w-40">标签</th>
            <th class="text-right px-5 py-3 font-medium text-[#999] font-[family-name:var(--font-mono)] w-32">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#2a2a3a]">
          <tr v-for="project in projects" :key="project.id" class="hover:bg-[#161622]/50">
            <td class="px-5 py-3.5 text-[#e0e0e0]">{{ project.title }}</td>
            <td class="px-5 py-3.5 text-[#666] text-xs font-[family-name:var(--font-mono)]">{{ extractDomain(project.url) }}</td>
            <td class="px-5 py-3.5">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tag in (project.tags || [])"
                  :key="tag"
                  class="px-1.5 py-0.5 text-xs rounded bg-[#00d4aa]/10 text-[#00d4aa] font-[family-name:var(--font-mono)]"
                >
                  {{ tag }}
                </span>
              </div>
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
                  class="text-[#666] hover:text-[#999] text-xs font-[family-name:var(--font-mono)]"
                  @click="cancelDelete"
                >
                  取消
                </button>
              </div>
              <div v-else class="flex items-center justify-end gap-3">
                <router-link
                  :to="{ name: 'AdminProjectEdit', params: { id: project.id } }"
                  class="text-[#00d4aa] hover:text-[#00d4aa]/80 text-xs font-medium font-[family-name:var(--font-mono)]"
                >
                  编辑
                </router-link>
                <button
                  class="text-[#555] hover:text-red-400 text-xs font-[family-name:var(--font-mono)]"
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
