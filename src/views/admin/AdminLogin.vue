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
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 class="text-xl font-bold text-gray-900 text-center mb-2">管理后台</h1>
        <p class="text-sm text-gray-500 text-center mb-8">
          {{ hasPassword ? '请输入密码登录' : '首次使用，请设置管理密码' }}
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1.5">密码</label>
            <input
              v-model="password"
              type="password"
              :placeholder="hasPassword ? '输入管理密码' : '设置管理密码'"
              class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>

          <div v-if="!hasPassword">
            <label class="block text-sm text-gray-600 mb-1.5">确认密码</label>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="再输一次"
              class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>

          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            {{ hasPassword ? '登录' : '设置密码并进入' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <router-link to="/" class="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← 返回前台
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
