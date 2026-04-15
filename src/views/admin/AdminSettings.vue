<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSiteConfig, updateSiteConfig, getPasswordHash, setPasswordHash, exportData, importData } from '../../store'
import { sha256 } from '../../utils/crypto'
import type { ExportData } from '../../types'

// ==================== 站点设置 ====================
const siteTitle = ref('')
const subtitle = ref('')
const bio = ref('')
const avatarUrl = ref('')
const configSaved = ref(false)

onMounted(() => {
  const config = getSiteConfig()
  siteTitle.value = config.title
  subtitle.value = config.subtitle
  bio.value = config.bio
  avatarUrl.value = config.avatarUrl
})

function saveConfig() {
  updateSiteConfig({
    title: siteTitle.value.trim(),
    subtitle: subtitle.value.trim(),
    bio: bio.value.trim(),
    avatarUrl: avatarUrl.value.trim(),
  })
  configSaved.value = true
  setTimeout(() => { configSaved.value = false }, 2000)
}

// ==================== 修改密码 ====================
const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const passwordError = ref('')
const passwordSaved = ref(false)

async function changePassword() {
  passwordError.value = ''

  if (!oldPassword.value) {
    passwordError.value = '请输入旧密码'
    return
  }
  const oldHash = await sha256(oldPassword.value)
  if (oldHash !== getPasswordHash()) {
    passwordError.value = '旧密码错误'
    return
  }
  if (!newPassword.value || newPassword.value.length < 4) {
    passwordError.value = '新密码至少 4 个字符'
    return
  }
  if (newPassword.value !== confirmNewPassword.value) {
    passwordError.value = '两次新密码不一致'
    return
  }

  const newHash = await sha256(newPassword.value)
  setPasswordHash(newHash)
  oldPassword.value = ''
  newPassword.value = ''
  confirmNewPassword.value = ''
  passwordSaved.value = true
  setTimeout(() => { passwordSaved.value = false }, 2000)
}

// ==================== 数据导入导出 ====================
const importSuccess = ref(false)

/** 导出数据为 JSON 文件 */
function handleExport() {
  const data = exportData()
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `site-backup-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/** 导入数据 */
function handleImport() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return

    const confirmed = confirm('导入将覆盖当前所有数据，确定继续吗？')
    if (!confirmed) return

    try {
      const text = await file.text()
      const data = JSON.parse(text) as ExportData
      importData(data)

      // 刷新页面数据
      const config = getSiteConfig()
      siteTitle.value = config.title
      subtitle.value = config.subtitle
      bio.value = config.bio
      avatarUrl.value = config.avatarUrl

      importSuccess.value = true
      setTimeout(() => { importSuccess.value = false }, 2000)
    } catch {
      alert('导入失败：文件格式不正确')
    }
  }
  input.click()
}
</script>

<template>
  <div class="max-w-xl space-y-10">
    <h1 class="text-xl font-bold text-gray-900">站点设置</h1>

    <!-- 基本信息 -->
    <section>
      <h2 class="text-base font-semibold text-gray-800 mb-4">基本信息</h2>
      <form @submit.prevent="saveConfig" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1.5">网站标题</label>
          <input
            v-model="siteTitle"
            type="text"
            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1.5">副标题</label>
          <input
            v-model="subtitle"
            type="text"
            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1.5">个人简介</label>
          <textarea
            v-model="bio"
            rows="3"
            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1.5">头像 URL</label>
          <input
            v-model="avatarUrl"
            type="url"
            placeholder="https://example.com/avatar.jpg（可选）"
            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <div class="flex items-center gap-3 pt-2">
          <button
            type="submit"
            class="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            保存设置
          </button>
          <span v-if="configSaved" class="text-green-600 text-sm">✓ 已保存</span>
        </div>
      </form>
    </section>

    <!-- 修改密码 -->
    <section class="border-t border-gray-200 pt-8">
      <h2 class="text-base font-semibold text-gray-800 mb-4">修改密码</h2>
      <form @submit.prevent="changePassword" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1.5">旧密码</label>
          <input
            v-model="oldPassword"
            type="password"
            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1.5">新密码</label>
          <input
            v-model="newPassword"
            type="password"
            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1.5">确认新密码</label>
          <input
            v-model="confirmNewPassword"
            type="password"
            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
        <div class="flex items-center gap-3 pt-2">
          <button
            type="submit"
            class="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            修改密码
          </button>
          <span v-if="passwordSaved" class="text-green-600 text-sm">✓ 密码已修改</span>
        </div>
      </form>
    </section>

    <!-- 数据导入导出 -->
    <section class="border-t border-gray-200 pt-8">
      <h2 class="text-base font-semibold text-gray-800 mb-2">数据管理</h2>
      <p class="text-sm text-gray-500 mb-4">
        导出数据可以备份到其他地方，换浏览器时通过导入恢复数据。
      </p>
      <div class="flex gap-3">
        <button
          class="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          @click="handleExport"
        >
          📦 导出数据
        </button>
        <button
          class="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          @click="handleImport"
        >
          📥 导入数据
        </button>
      </div>
      <span v-if="importSuccess" class="text-green-600 text-sm mt-2 block">✓ 导入成功</span>
    </section>
  </div>
</template>
