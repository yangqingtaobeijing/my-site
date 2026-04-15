<script setup lang="ts">
// 页脚组件
</script>

<template>
  <footer class="border-t border-[#2a2a3a] py-8 mt-16">
    <div class="mx-auto max-w-[800px] px-6 text-center text-sm text-[#333] font-[family-name:var(--font-mono)]">
      <p>
        <span class="text-[#00d4aa]/40">$</span>
        echo "© {{ new Date().getFullYear() }} · built with <span class="text-[#00d4aa]">❤</span>"
        <span class="cursor-blink" />
      </p>
    </div>
  </footer>
</template>
