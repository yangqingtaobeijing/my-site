<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { store, getArticles, loadFromGitHub, dataLoading } from '../store'
import { formatDate } from '../utils/date'

const config = computed(() => store.config)
const articles = computed(() => getArticles().filter(a => !a.hidden))

onMounted(() => {
  loadFromGitHub()
})
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)]">
    <SiteHeader />

    <main class="mx-auto max-w-[800px] px-6">
      <!-- 个人简介区域 -->
      <section class="py-16 border-b border-[var(--color-border)]">
        <div class="flex items-start gap-6">
          <!-- 头像（带发光边框） -->
          <img
            v-if="config.avatarUrl"
            :src="config.avatarUrl"
            :alt="config.title"
            class="w-20 h-20 rounded-full object-cover avatar-glow shrink-0"
          />
          <div
            v-else
            class="w-20 h-20 rounded-full bg-[var(--color-bg-card)] avatar-glow flex items-center justify-center text-[var(--color-accent)] text-2xl font-bold font-[family-name:var(--font-mono)] shrink-0"
          >
            {{ config.title.charAt(0) }}
          </div>
          <div>
            <!-- 名字用等宽大字体 -->
            <h1 class="text-3xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">
              {{ config.title }}
            </h1>
            <p v-if="config.subtitle" class="text-sm text-[var(--color-accent)] mt-1 font-[family-name:var(--font-mono)]">
              {{ config.subtitle }}
            </p>
            <p v-if="config.bio" class="text-[var(--color-text-secondary)] mt-4 leading-relaxed">
              {{ config.bio }}
            </p>
          </div>
        </div>
      </section>

      <!-- 加载状态 -->
      <section v-if="dataLoading" class="py-20 text-center">
        <p class="text-[var(--color-text-subtle)] text-sm font-[family-name:var(--font-mono)] animate-pulse">&gt;_ 加载中...</p>
      </section>

      <!-- 文章列表 -->
      <section v-else class="py-10">
        <div v-if="articles.length === 0" class="text-center py-20 text-[var(--color-text-muted)]">
          <p class="text-lg font-[family-name:var(--font-mono)]">&gt;_ 还没有文章</p>
          <p class="text-sm mt-2 text-[var(--color-text-faint)]">去后台添加第一篇文章吧</p>
        </div>

        <article
          v-for="article in articles"
          :key="article.id"
          class="group py-5 border-b border-[var(--color-border-subtle)] last:border-b-0"
        >
          <router-link
            :to="{ name: 'ArticleDetail', params: { id: article.id } }"
            class="block px-4 py-3 -mx-4 rounded-lg hover:bg-[var(--color-bg-card-soft)] transition-all"
          >
            <div class="flex items-center gap-3 mb-2">
              <!-- 日期用等宽字体 -->
              <time class="text-xs text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)]">
                {{ formatDate(article.createdAt) }}
              </time>
              <!-- 文章类型标签 -->
              <span
                v-if="article.type === 'external'"
                class="text-xs bg-[var(--color-accent-dim)] text-[var(--color-accent)] px-2 py-0.5 rounded font-[family-name:var(--font-mono)]"
              >
                外链 ↗
              </span>
              <span
                v-else
                class="text-xs bg-[var(--color-bg-card)] text-[var(--color-text-muted)] px-2 py-0.5 rounded font-[family-name:var(--font-mono)]"
              >
                原创
              </span>
            </div>
            <h2 class="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
              {{ article.title }}
            </h2>
            <p class="text-[var(--color-text-muted)] mt-1.5 text-sm leading-relaxed line-clamp-2">
              {{ article.summary }}
            </p>
          </router-link>
        </article>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
