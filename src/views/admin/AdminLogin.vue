<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPasswordHash, setPasswordHash } from '../../store'
import { sha256 } from '../../utils/crypto'

const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const error = ref('')

/** 是否已设置密码 */
const hasPassword = computed(() => getPasswordHash() !== null)

/** 设置密码（首次） */
async function handleSetPassword() {
  error.value = ''
  if (!password.value) {
    error.value = '请输入密码'
    return
  }
  if (password.value.length < 4) {
    error.value = '密码至少 4 个字符'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = '两次密码不一致'
    return
  }
  const hash = await sha256(password.value)
  setPasswordHash(hash)
  sessionStorage.setItem('admin_logged_in', 'true')
  router.push('/admin/articles')
}

/** 验证密码 */
async function handleLogin() {
  error.value = ''
  if (!password.value) {
    error.value = '请输入密码'
    return
  }
  const hash = await sha256(password.value)
  if (hash === getPasswordHash()) {
    sessionStorage.setItem('admin_logged_in', 'true')
    router.push('/admin/articles')
  } else {
    error.value = '密码错误'
  }
}

function handleSubmit() {
  if (hasPassword.value) {
    handleLogin()
  } else {
    handleSetPassword()
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] dot-grid-bg flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="bg-[#1e1e2e] rounded-xl border border-[#2a2a3a] p-8">
        <!-- 终端风格标题 -->
        <div class="flex items-center gap-2 mb-6">
          <div class="flex gap-1.5">
            <span class="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span class="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span class="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span class="text-xs text-[#555] font-[family-name:var(--font-mono)] ml-2">admin@site ~ %</span>
        </div>

        <h1 class="text-xl font-bold text-white text-center mb-2 font-[family-name:var(--font-mono)]">
          管理后台
        </h1>
        <p class="text-sm text-[#666] text-center mb-8 font-[family-name:var(--font-mono)]">
          {{ hasPassword ? '// 请输入密码登录' : '// 首次使用，请设置管理密码' }}
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">密码</label>
            <input
              v-model="password"
              type="password"
              :placeholder="hasPassword ? '输入管理密码' : '设置管理密码'"
              class="admin-input"
            />
          </div>

          <div v-if="!hasPassword">
            <label class="block text-sm text-[#999] mb-1.5 font-[family-name:var(--font-mono)]">确认密码</label>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="再输一次"
              class="admin-input"
            />
          </div>

          <p v-if="error" class="text-red-400 text-sm font-[family-name:var(--font-mono)]">
            <span class="text-red-500">✗</span> {{ error }}
          </p>

          <button
            type="submit"
            class="w-full btn-primary"
          >
            {{ hasPassword ? '登录' : '设置密码并进入' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <router-link to="/" class="text-xs text-[#555] hover:text-[#00d4aa] transition-colors font-[family-name:var(--font-mono)]">
            ← cd /home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
