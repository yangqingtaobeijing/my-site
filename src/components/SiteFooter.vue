<script setup lang="ts">
// 页脚组件
</script>

<template>
  <footer class="border-t border-[var(--color-border)] py-8 mt-16">
    <div class="mx-auto max-w-[800px] px-6 text-center text-sm text-[var(--color-text-faint)] font-[family-name:var(--font-mono)]">
      <p>
        © {{ new Date().getFullYear() }} · 用 <span class="text-[var(--color-accent)]">❤</span> 构建
      </p>

    </div>
  </footer>
</template>
