<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  getGitHubConfig,
  fetchTrafficViews,
  fetchTrafficClones,
  fetchPopularPaths,
  fetchPopularReferrers,
  fetchAnalyticsHistory,
  saveAnalyticsSnapshot,
  fetchPublicData,
  type TrafficViews,
  type TrafficClones,
  type TrafficPath,
  type TrafficReferrer,
  type AnalyticsData,
  type AnalyticsSnapshot,
} from '../../utils/github'

interface Project {
  title: string
  url: string
}

interface ProjectStat {
  title: string
  repo: string
  views: number
  uniques: number
  status: 'ok' | 'error'
}

// ---- State ----
const loading = ref(true)
const error = ref('')
const hasToken = ref(true)

const views = ref<TrafficViews | null>(null)
const clones = ref<TrafficClones | null>(null)
const paths = ref<TrafficPath[]>([])
const referrers = ref<TrafficReferrer[]>([])
const history = ref<AnalyticsData>({ snapshots: [] })

const saving = ref(false)
const saveResult = ref<'success' | 'fail' | ''>('')

// ---- Project Stats ----
const projectStats = ref<ProjectStat[]>([])
const projectStatsLoading = ref(false)
const projectStatsError = ref('')

// ---- Derived ----
const todayViews = computed(() => views.value?.count ?? 0)
const todayUniques = computed(() => views.value?.uniques ?? 0)
const todayClones = computed(() => clones.value?.count ?? 0)

const dailyData = computed(() => {
  if (!views.value) return []
  return views.value.views.map((v) => {
    const dayLabel = v.timestamp.slice(5, 10) // MM-DD
    const cloneMatch = clones.value?.clones.find((c) => c.timestamp === v.timestamp)
    return {
      label: dayLabel,
      views: v.count,
      uniques: v.uniques,
      clones: cloneMatch?.count ?? 0,
    }
  })
})

const chartMax = computed(() => {
  const maxV = Math.max(...dailyData.value.map((d) => Math.max(d.views, d.uniques)), 1)
  // 向上取整到友好刻度
  return Math.ceil(maxV / 10) * 10
})

const topPaths = computed(() => paths.value.slice(0, 10))

const hasHistory = computed(() => history.value.snapshots.length > 0)

// ---- Actions ----
async function loadData() {
  const config = getGitHubConfig()
  if (!config) {
    hasToken.value = false
    loading.value = false
    return
  }
  hasToken.value = true
  loading.value = true
  error.value = ''

  try {
    const [v, c, p, r, h] = await Promise.all([
      fetchTrafficViews(config),
      fetchTrafficClones(config),
      fetchPopularPaths(config),
      fetchPopularReferrers(config),
      fetchAnalyticsHistory(),
    ])
    views.value = v
    clones.value = c
    paths.value = p
    referrers.value = r
    history.value = h
  } catch (e) {
    error.value = e instanceof Error ? e.message : '加载失败'
    // 如果全失败清空旧数据
    views.value = null
    clones.value = null
    paths.value = []
    referrers.value = []
  } finally {
    loading.value = false
  }
}

async function saveSnapshot() {
  const config = getGitHubConfig()
  if (!config || !views.value || !clones.value) return

  saving.value = true
  saveResult.value = ''

  const today = new Date().toISOString().slice(0, 10)
  const snapshot: AnalyticsSnapshot = {
    date: today,
    views: views.value.count,
    uniques: views.value.uniques,
    clones: clones.value.count,
  }

  const ok = await saveAnalyticsSnapshot(config, snapshot, history.value)
  saveResult.value = ok ? 'success' : 'fail'
  saving.value = false

  // 重新加载历史
  history.value = await fetchAnalyticsHistory()

  setTimeout(() => {
    saveResult.value = ''
  }, 2000)
}

/** 最大柱高度 px */
const MAX_BAR_H = 200

function barH(value: number): number {
  if (chartMax.value === 0) return 0
  return Math.max((value / chartMax.value) * MAX_BAR_H, 2)
}

function repoFromUrl(url: string): string | null {
  const m = url.match(/yangqingtaobeijing\.github\.io\/([^/#?]+)/)
  return m ? m[1] : null
}

async function loadProjectStats() {
  const config = getGitHubConfig()
  if (!config) return
  projectStatsLoading.value = true
  projectStatsError.value = ''
  try {
    const projects = await fetchPublicData<Project[]>('projects.json')
    const githubProjects = projects.filter((p) => repoFromUrl(p.url || ''))
    const results = await Promise.allSettled(
      githubProjects.map(async (p) => {
        const repo = repoFromUrl(p.url)!
        const res = await fetch(`https://api.github.com/repos/${config.owner}/${repo}/traffic/views`, {
          headers: { Authorization: `Bearer ${config.token}`, Accept: 'application/vnd.github.v3+json' },
        })
        if (!res.ok) throw new Error(`${res.status}`)
        const data = await res.json() as { count: number; uniques: number }
        return { title: p.title, repo, views: data.count, uniques: data.uniques, status: 'ok' as const }
      })
    )
    projectStats.value = results
      .map((r, i) => r.status === 'fulfilled' ? r.value : { title: githubProjects[i].title, repo: repoFromUrl(githubProjects[i].url)!, views: 0, uniques: 0, status: 'error' as const })
      .sort((a, b) => b.views - a.views)
  } catch (e) {
    projectStatsError.value = e instanceof Error ? e.message : '加载失败'
  } finally {
    projectStatsLoading.value = false
  }
}

onMounted(() => {
  loadData()
  loadProjectStats()
})
</script>

<template>
  <div class="max-w-4xl">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">
        数据概览
      </h1>
      <button
        class="text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] font-[family-name:var(--font-mono)]"
        @click="loadData"
      >
        ↻ 刷新
      </button>
    </div>

    <!-- No token -->
    <div v-if="!hasToken && !loading" class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-8 text-center">
      <p class="text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] mb-3">需要配置 GitHub Token 才能获取流量数据</p>
      <router-link to="/admin/settings" class="text-sm text-[var(--color-accent)] hover:underline font-[family-name:var(--font-mono)]">
        → 前往站点设置
      </router-link>
    </div>

    <!-- Error -->
    <div v-if="error && !loading" class="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
      <p class="text-red-400 text-sm font-[family-name:var(--font-mono)]">{{ error }}</p>
      <button
        class="mt-3 text-xs text-[var(--color-accent)] hover:underline font-[family-name:var(--font-mono)]"
        @click="loadData"
      >
        重试
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="space-y-6">
      <div class="grid grid-cols-3 gap-4">
        <div v-for="i in 3" :key="i" class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 animate-pulse">
          <div class="h-4 w-16 bg-[var(--color-bg-card-soft)] rounded mb-2" />
          <div class="h-8 w-24 bg-[var(--color-bg-card-soft)] rounded" />
        </div>
      </div>
      <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 animate-pulse">
        <div class="h-4 w-24 bg-[var(--color-bg-card-soft)] rounded mb-3" />
        <div class="space-y-2">
          <div v-for="i in 7" :key="i" class="flex gap-2 items-end h-[220px]" />
        </div>
      </div>
    </div>

    <!-- Data -->
    <template v-if="!loading && hasToken && !error">
      <!-- 今日概览卡片 -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
          <div class="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] mb-1">浏览量</div>
          <div class="text-2xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">{{ todayViews.toLocaleString() }}</div>
          <div class="text-xs text-[var(--color-text-subtle)] mt-1 font-[family-name:var(--font-mono)]">独立访客 {{ todayUniques.toLocaleString() }}</div>
        </div>
        <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
          <div class="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] mb-1">独立访客</div>
          <div class="text-2xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">{{ todayUniques.toLocaleString() }}</div>
          <div class="text-xs text-[var(--color-text-subtle)] mt-1 font-[family-name:var(--font-mono)]">过去 14 天</div>
        </div>
        <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
          <div class="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] mb-1">克隆数</div>
          <div class="text-2xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">{{ todayClones.toLocaleString() }}</div>
          <div class="text-xs text-[var(--color-text-subtle)] mt-1 font-[family-name:var(--font-mono)]">git clone 次数</div>
        </div>
      </div>

      <!-- 14 天趋势图 -->
      <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 mb-6">
        <h3 class="text-sm font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] mb-4">近 14 天趋势</h3>

        <!-- 图例 -->
        <div class="flex items-center gap-4 mb-4">
          <span class="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]">
            <span class="w-3 h-3 rounded-sm bg-[var(--color-accent)] inline-block" /> 浏览量
          </span>
          <span class="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]">
            <span class="w-3 h-3 rounded-sm bg-[var(--color-accent-dim)] inline-block" /> 独立访客
          </span>
        </div>

        <!-- 柱状图 -->
        <div v-if="dailyData.length > 0" class="relative" style="height: 240px">
          <!-- 刻度线 -->
          <div class="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-[10px] text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)] text-right pr-2">
            <span>{{ chartMax }}</span>
            <span>{{ Math.round(chartMax / 2) }}</span>
            <span>0</span>
          </div>

          <div class="ml-10 flex items-end gap-1" style="height: 200px">
            <div
              v-for="(day, i) in dailyData"
              :key="i"
              class="flex-1 flex flex-col items-center justify-end"
              style="height: 100%"
            >
              <!-- 双柱 -->
              <div class="flex items-end gap-px">
                <div
                  class="w-2 rounded-t-sm bg-[var(--color-accent)] opacity-80 hover:opacity-100 transition-opacity"
                  :style="{ height: barH(day.views) + 'px' }"
                  :title="`${day.label} 浏览量: ${day.views}`"
                />
                <div
                  class="w-2 rounded-t-sm bg-[var(--color-text-subtle)] opacity-50 hover:opacity-70 transition-opacity"
                  :style="{ height: barH(day.uniques) + 'px' }"
                  :title="`${day.label} 独立访客: ${day.uniques}`"
                />
              </div>
              <!-- 标签 -->
              <span class="text-[10px] text-[var(--color-text-muted)] mt-1 font-[family-name:var(--font-mono)] leading-tight">{{ day.label }}</span>
            </div>
          </div>
        </div>

        <div v-else class="text-sm text-[var(--color-text-muted)] text-center py-8 font-[family-name:var(--font-mono)]">
          暂无趋势数据
        </div>
      </div>

      <!-- 热门页面 + 流量来源 -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <!-- 热门页面 -->
        <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
          <h3 class="text-sm font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] mb-3">热门页面 Top 10</h3>
          <div v-if="topPaths.length > 0" class="space-y-1">
            <div
              v-for="(p, i) in topPaths"
              :key="p.path"
              class="flex items-center justify-between py-2 px-2 rounded hover:bg-[var(--color-bg-card-soft)] transition-colors"
            >
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-xs text-[var(--color-text-muted)] w-5 shrink-0 font-[family-name:var(--font-mono)]">#{{ i + 1 }}</span>
                <span class="text-sm text-[var(--color-text)] truncate font-[family-name:var(--font-mono)]" :title="p.path">{{ p.path }}</span>
              </div>
              <div class="flex items-center gap-3 shrink-0 ml-2">
                <span class="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]">{{ p.count }}</span>
                <span class="text-xs text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)]">{{ p.uniques }} 人</span>
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-[var(--color-text-muted)] text-center py-8 font-[family-name:var(--font-mono)]">
            暂无数据
          </div>
        </div>

        <!-- 流量来源 -->
        <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
          <h3 class="text-sm font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] mb-3">流量来源</h3>
          <div v-if="referrers.length > 0" class="space-y-1">
            <div
              v-for="(r, i) in referrers"
              :key="r.referrer"
              class="flex items-center justify-between py-2 px-2 rounded hover:bg-[var(--color-bg-card-soft)] transition-colors"
            >
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-xs text-[var(--color-text-muted)] w-5 shrink-0 font-[family-name:var(--font-mono)]">#{{ i + 1 }}</span>
                <span class="text-sm text-[var(--color-text)] truncate font-[family-name:var(--font-mono)]" :title="r.referrer">{{ r.referrer || '直接访问' }}</span>
              </div>
              <div class="flex items-center gap-3 shrink-0 ml-2">
                <span class="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]">{{ r.count }}</span>
                <span class="text-xs text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)]">{{ r.uniques }} 人</span>
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-[var(--color-text-muted)] text-center py-8 font-[family-name:var(--font-mono)]">
            暂无数据
          </div>
        </div>
      </div>

      <!-- 项目浏览排行 -->
      <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)]">项目浏览排行</h3>
          <button class="text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] font-[family-name:var(--font-mono)]" @click="loadProjectStats">↻ 刷新</button>
        </div>
        <div v-if="projectStatsLoading" class="space-y-3">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="flex justify-between mb-1">
              <div class="h-3 w-32 bg-[var(--color-bg-card-soft)] rounded" />
              <div class="h-3 w-16 bg-[var(--color-bg-card-soft)] rounded" />
            </div>
            <div class="h-1.5 bg-[var(--color-bg-card-soft)] rounded-full" />
          </div>
        </div>
        <div v-else-if="projectStatsError" class="text-sm text-red-400 text-center py-4 font-[family-name:var(--font-mono)]">{{ projectStatsError }}</div>
        <div v-else-if="projectStats.length > 0" class="space-y-3">
          <div v-for="(p, i) in projectStats" :key="p.repo" class="group">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-xs text-[var(--color-text-muted)] w-5 shrink-0 font-[family-name:var(--font-mono)]">#{{ i + 1 }}</span>
                <span class="text-sm text-[var(--color-text)] truncate font-[family-name:var(--font-mono)]" :title="p.title">{{ p.title }}</span>
                <span v-if="p.status === 'error'" class="text-xs text-red-400 font-[family-name:var(--font-mono)]">无权限</span>
              </div>
              <div class="flex items-center gap-3 shrink-0 ml-2">
                <span class="text-xs font-medium text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">{{ p.views.toLocaleString() }} 次</span>
                <span class="text-xs text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)]">{{ p.uniques }} 人</span>
              </div>
            </div>
            <div class="h-1 bg-[var(--color-bg-card-soft)] rounded-full overflow-hidden">
              <div class="h-full bg-[var(--color-accent)] rounded-full opacity-70 transition-all" :style="{ width: projectStats[0].views > 0 ? (p.views / projectStats[0].views * 100) + '%' : '0%' }" />
            </div>
          </div>
        </div>
        <div v-else class="text-sm text-[var(--color-text-muted)] text-center py-4 font-[family-name:var(--font-mono)]">暂无数据</div>
      </div>

      <!-- 历史快照 -->
      <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)]">历史快照</h3>
          <div class="flex items-center gap-2">
            <span v-if="saveResult === 'success'" class="text-xs text-green-400 font-[family-name:var(--font-mono)]">✓ 已保存</span>
            <span v-if="saveResult === 'fail'" class="text-xs text-red-400 font-[family-name:var(--font-mono)]">✗ 保存失败</span>
            <button
              class="text-xs px-3 py-1.5 rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)] hover:brightness-110 font-[family-name:var(--font-mono)] disabled:opacity-50"
              :disabled="saving"
              @click="saveSnapshot"
            >
              {{ saving ? '保存中...' : '+ 保存今日快照' }}
            </button>
          </div>
        </div>
        <div v-if="hasHistory" class="flex items-end gap-1" style="height: 120px">
          <div
            v-for="snap in history.snapshots"
            :key="snap.date"
            class="flex-1 flex flex-col items-center justify-end"
            style="height: 100%"
          >
            <div
              class="w-full max-w-[30px] rounded-t-sm bg-[var(--color-accent)] opacity-60 hover:opacity-100 transition-opacity cursor-default"
              :style="{ height: (snap.views / Math.max(...history.snapshots.map(s => s.views), 1)) * 100 + 'px' }"
              :title="`${snap.date}: ${snap.views} 浏览 / ${snap.uniques} 访客`"
            />
            <span class="text-[9px] text-[var(--color-text-muted)] mt-1 font-[family-name:var(--font-mono)]">{{ snap.date.slice(5) }}</span>
          </div>
        </div>
        <div v-else class="text-sm text-[var(--color-text-muted)] text-center py-4 font-[family-name:var(--font-mono)]">
          点击上方按钮保存第一份快照
        </div>
      </div>
    </template>
  </div>
</template>
