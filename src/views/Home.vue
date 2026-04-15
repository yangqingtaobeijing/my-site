<script setup lang="ts">
import { computed } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { store, getArticles } from '../store'
import { formatDate } from '../utils/date'

const config = computed(() => store.config)
const articles = computed(() => getArticles())
</script>

<template>
  <div class="min-h-screen bg-gray-50/50">
    <SiteHeader />

    <main class="mx-auto max-w-3xl px-6">
      <!-- 个人简介区域 -->
      <section class="py-12 border-b border-gray-100">
        <div class="flex items-start gap-5">
          <img
            v-if="config.avatarUrl"
            :src="config.avatarUrl"
            :alt="config.title"
            class="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
          />
          <div
            v-else
            class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0"
          >
            {{ config.title.charAt(0) }}
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ config.title }}</h1>
            <p v-if="config.subtitle" class="text-sm text-gray-500 mt-1">{{ config.subtitle }}</p>
            <p v-if="config.bio" class="text-gray-600 mt-3 leading-relaxed">{{ config.bio }}</p>
          </div>
        </div>
      </section>

      <!-- 文章列表 -->
      <section class="py-8">
        <div v-if="articles.length === 0" class="text-center py-20 text-gray-400">
          <p class="text-lg">还没有文章</p>
          <p class="text-sm mt-2">去后台添加第一篇文章吧 ✍️</p>
        </div>

        <article
          v-for="article in articles"
          :key="article.id"
          class="group py-6 border-b border-gray-100 last:border-b-0"
        >
          <router-link
            :to="{ name: 'ArticleDetail', params: { id: article.id } }"
            class="block"
          >
            <div class="flex items-center gap-2 mb-2">
              <time class="text-xs text-gray-400">{{ formatDate(article.createdAt) }}</time>
              <span
                v-if="article.type === 'external'"
                class="text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded"
              >
                外链
              </span>
            </div>
            <h2 class="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {{ article.title }}
            </h2>
            <p class="text-gray-500 mt-1.5 text-sm leading-relaxed line-clamp-2">
              {{ article.summary }}
            </p>
          </router-link>
        </article>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
