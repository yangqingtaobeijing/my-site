<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { getProjects, loadFromGitHub, dataLoading } from '../store'

const openProject = (url: string) => window.open(url, '_blank')

const projects = computed(() => getProjects().filter(p => !p.hidden))

// 分类颜色映射
const categoryColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  '美股研究': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'AI 领域': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500' },
  '学习资源': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  '财务工具': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  'PM 工具': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
  '生活工具': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', dot: 'bg-cyan-500' },
  '效率工具': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-500' },
  '游戏娱乐': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
  '其他': { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' },
}
const defaultColor = { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' }

// 分类排序（美股研究倒数第二）
const categoryOrder = ['财务工具', 'AI 领域', 'PM 工具', '学习资源', '生活工具', '效率工具', '游戏娱乐', '美股研究', '其他']

// 按分类分组
const groupedProjects = computed(() => {
  const groups: Record<string, typeof projects.value> = {}
  for (const p of projects.value) {
    const cat = p.category || '其他'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(p)
  }
  return categoryOrder.filter(o => groups[o]).map(o => ({
    name: o,
    projects: groups[o],
    colors: categoryColors[o] || defaultColor,
  }))
})

// 当前高亮的分类（scroll-spy）
const activeCategory = ref<string>('')
const sectionRefs = ref<Record<string, HTMLElement>>({})
let observer: IntersectionObserver | null = null

const setSectionRef = (name: string) => (el: any) => {
  if (el) sectionRefs.value[name] = el
}

// 点击导航滚动到对应分类
const scrollToCategory = (name: string) => {
  activeCategory.value = name
  const el = sectionRefs.value[name]
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(async () => {
  loadFromGitHub()
  await nextTick()
  // 等数据渲染后再设置 observer
  setTimeout(() => {
    const scrollContainer = document.getElementById('scroll-area')
    if (!scrollContainer) return
    observer = new IntersectionObserver((entries) => {
      // 找当前视口中最靠顶的可见 section
      let topEntry: IntersectionObserverEntry | null = null
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!topEntry || entry.boundingClientRect.top < topEntry.boundingClientRect.top) {
            topEntry = entry
          }
        }
      }
      if (topEntry) {
        const name = (topEntry.target as HTMLElement).dataset.category
        if (name) activeCategory.value = name
      }
    }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 })

    for (const el of Object.values(sectionRefs.value)) {
      observer.observe(el)
    }
  }, 300)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)] flex flex-col">
    <SiteHeader />

    <main class="flex-1 mx-auto w-full max-w-[1200px] px-6 py-10 flex gap-8">
      <!-- 左侧二级导航 -->
      <aside class="w-48 shrink-0 sticky top-24 self-start">
        <h2 class="text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-wider mb-4 pl-3">
          分类
        </h2>
        <nav class="flex flex-col gap-0.5">
          <button
            v-for="group in groupedProjects"
            :key="group.name"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left"
            :class="activeCategory === group.name
              ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-medium'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-card-soft)]'
            "
            @click="scrollToCategory(group.name)"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="group.colors.dot" />
            <span class="flex-1">{{ group.name }}</span>
            <span class="text-xs text-[var(--color-text-faint)] font-[family-name:var(--font-mono)]">{{ group.projects.length }}</span>
          </button>
        </nav>
      </aside>

      <!-- 右侧项目列表 -->
      <section class="flex-1 min-w-0">
        <!-- 加载状态 -->
        <div v-if="dataLoading" class="text-center py-20">
          <p class="text-[var(--color-text-subtle)] text-sm font-[family-name:var(--font-mono)] animate-pulse">&gt;_ 加载中...</p>
        </div>

        <template v-else-if="projects.length === 0">
          <div class="text-center py-20 text-[var(--color-text-muted)]">
            <p class="text-lg font-[family-name:var(--font-mono)]">&gt;_ 还没有项目</p>
            <p class="text-sm mt-2 text-[var(--color-text-faint)]">去后台添加你的项目作品吧</p>
          </div>
        </template>

        <template v-else>
          <!-- 连续滚动区域 -->
          <div id="scroll-area">
            <section
              v-for="group in groupedProjects"
              :key="group.name"
              :ref="setSectionRef(group.name)"
              :data-category="group.name"
              class="mb-12"
            >
              <!-- 分类标题 -->
              <div class="flex items-center gap-3 mb-6">
                <h2 class="text-lg font-bold text-[var(--color-text-bright)]">
                  {{ group.name }}
                </h2>
                <span class="text-xs text-[var(--color-text-faint)] font-[family-name:var(--font-mono)]">{{ group.projects.length }} 个项目</span>
              </div>

              <!-- 项目卡片网格 -->
              <div class="grid gap-4 sm:grid-cols-2">
                <div
                  v-for="project in group.projects"
                  :key="project.id"
                  class="group p-5 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] glow-border flex flex-col cursor-pointer"
                  @click="openProject(project.url)"
                >
                  <img
                    v-if="project.coverUrl"
                    :src="project.coverUrl"
                    :alt="project.title"
                    class="w-full h-36 object-cover rounded-lg mb-4 border border-[var(--color-border)]"
                  />

                  <h3 class="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {{ project.title }}
                  </h3>

                  <p class="text-[var(--color-text-muted)] text-sm mt-2 leading-relaxed line-clamp-3 flex-1">
                    {{ project.description }}
                  </p>

                  <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-1.5 mt-3">
                    <span
                      v-for="tag in project.tags"
                      :key="tag"
                      class="px-2 py-0.5 text-xs rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-[family-name:var(--font-mono)]"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <div class="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--color-border)]" @click.stop>
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
            </section>
          </div>
        </template>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
