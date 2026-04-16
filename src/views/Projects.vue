<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { getProjects, loadFromGitHub, dataLoading } from '../store'

const projects = computed(() => getProjects())

onMounted(() => {
  loadFromGitHub()
})
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)]">
    <SiteHeader />

    <main class="mx-auto max-w-[800px] px-6 py-10">
      <h1 class="text-2xl font-bold text-[var(--color-text-bright)] mb-8">
        Vibe Coding
      </h1>

      <!-- 加载状态 -->
      <div v-if="dataLoading" class="text-center py-20">
        <p class="text-[var(--color-text-subtle)] text-sm font-[family-name:var(--font-mono)] animate-pulse">&gt;_ 加载中...</p>
      </div>

      <template v-else>
        <div v-if="projects.length === 0" class="text-center py-20 text-[var(--color-text-muted)]">
          <p class="text-lg font-[family-name:var(--font-mono)]">&gt;_ 还没有项目</p>
          <p class="text-sm mt-2 text-[var(--color-text-faint)]">去后台添加你的项目作品吧</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div
            v-for="project in projects"
            :key="project.id"
            class="group p-5 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] glow-border flex flex-col"
          >
            <!-- 封面图 -->
            <img
              v-if="project.coverUrl"
              :src="project.coverUrl"
              :alt="project.title"
              class="w-full h-36 object-cover rounded-lg mb-4 border border-[var(--color-border)]"
            />

            <!-- 项目名称 -->
            <h3 class="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
              {{ project.title }}
            </h3>

            <!-- 描述 -->
            <p class="text-[var(--color-text-muted)] text-sm mt-2 leading-relaxed line-clamp-3 flex-1">
              {{ project.description }}
            </p>

            <!-- 标签 -->
            <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2 py-0.5 text-xs rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-[family-name:var(--font-mono)]"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 底部链接 -->
            <div class="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--color-border)]">
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors font-[family-name:var(--font-mono)]"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                打开项目
              </a>
              <a
                v-if="project.sourceUrl"
                :href="project.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors font-[family-name:var(--font-mono)]"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                查看源码
              </a>
            </div>
          </div>
        </div>
      </template>
    </main>

    <SiteFooter />
  </div>
</template>
