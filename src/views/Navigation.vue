<template>
  <div>
  <SiteHeader />
  <div class="mx-auto max-w-[800px] px-6 py-12">
    <div class="mb-10">
      <h1 class="text-2xl font-bold text-[var(--color-text)] font-[family-name:var(--font-mono)] mb-2">
        <span class="text-[var(--color-accent-muted)] mr-2">&gt;_</span>站内导航
      </h1>
    </div>
    <div class="text-center py-20">
      <p class="text-lg text-[var(--color-text-muted)]">站内链接已迁移到</p>
      <a href="#/projects" class="inline-block mt-4 px-6 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors font-[family-name:var(--font-mono)]">
         Vibe Coding →
      </a>
    </div>
  </div>
  <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
</script>
