<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSiteConfig, updateSiteConfig, getPasswordHash, setPasswordHash, exportData, importData, syncAllToGitHub } from '../../store'
import { sha256 } from '../../utils/crypto'
import { getGitHubFields, saveGitHubConfig, testConnection } from '../../utils/github'
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

  // 加载 GitHub 配置
  const ghFields = getGitHubFields()
  ghOwner.value = ghFields.owner
  ghRepo.value = ghFields.repo
  ghBranch.value = ghFields.branch
  ghToken.value = ghFields.token
})

async function saveConfig() {
  await updateSiteConfig({
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

// ==================== GitHub 同步设置 ====================
const ghOwner = ref('')
const ghRepo = ref('')
const ghBranch = ref('')
const ghToken = ref('')
const ghSaved = ref(false)
const ghTesting = ref(false)
const ghTestResult = ref<'success' | 'fail' | ''>('')
const ghSyncing = ref(false)
const ghSyncResult = ref<'success' | 'fail' | ''>('')

function saveGitHub() {
  saveGitHubConfig({
    owner: ghOwner.value.trim(),
    repo: ghRepo.value.trim(),
    branch: ghBranch.value.trim(),
    token: ghToken.value.trim(),
  })
  ghSaved.value = true
  setTimeout(() => { ghSaved.value = false }, 2000)
}

async function handleTestConnection() {
  ghTesting.value = true
  ghTestResult.value = ''
  try {
    const ok = await testConnection({
      owner: ghOwner.value.trim(),
      repo: ghRepo.value.trim(),
      branch: ghBranch.value.trim(),
      token: ghToken.value.trim(),
    })
    ghTestResult.value = ok ? 'success' : 'fail'
  } catch {
    ghTestResult.value = 'fail'
  } finally {
    ghTesting.value = false
    setTimeout(() => { ghTestResult.value = '' }, 3000)
  }
}

async function handleSyncAll() {
  ghSyncing.value = true
  ghSyncResult.value = ''
  // 先保存配置
  saveGitHub()
  try {
    const ok = await syncAllToGitHub()
    ghSyncResult.value = ok ? 'success' : 'fail'
  } catch {
    ghSyncResult.value = 'fail'
  } finally {
    ghSyncing.value = false
    setTimeout(() => { ghSyncResult.value = '' }, 3000)
  }
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
    <h1 class="text-xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]">站点设置</h1>

    <!-- 基本信息 -->
    <section>
      <h2 class="text-base font-semibold text-[var(--color-text)] mb-4 font-[family-name:var(--font-mono)]">基本信息</h2>
      <form @submit.prevent="saveConfig" class="space-y-4">
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">网站标题</label>
          <input
            v-model="siteTitle"
            type="text"
            class="admin-input"
          />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">副标题</label>
          <input
            v-model="subtitle"
            type="text"
            class="admin-input"
          />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">个人简介</label>
          <textarea
            v-model="bio"
            rows="3"
            class="admin-input resize-none"
          />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">头像 URL</label>
          <input
            v-model="avatarUrl"
            type="url"
            placeholder="https://example.com/avatar.jpg（可选）"
            class="admin-input"
          />
        </div>
        <div class="flex items-center gap-3 pt-2">
          <button
            type="submit"
            class="btn-primary"
          >
            保存设置
          </button>
          <span v-if="configSaved" class="text-[var(--color-accent)] text-sm font-[family-name:var(--font-mono)]">✓ 已保存</span>
        </div>
      </form>
    </section>

    <!-- GitHub 同步设置 -->
    <section class="border-t border-[var(--color-border)] pt-8">
      <h2 class="text-base font-semibold text-[var(--color-text)] mb-2 font-[family-name:var(--font-mono)]">GitHub 同步</h2>
      <p class="text-sm text-[var(--color-text-muted)] mb-4">
        配置后，文章和收藏数据会自动同步到 GitHub 仓库，通过 GitHub Pages 发布。
      </p>
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">Owner</label>
          <input
            v-model="ghOwner"
            type="text"
            placeholder="yangqingtaobeijing"
            class="admin-input"
          />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">Repo</label>
          <input
            v-model="ghRepo"
            type="text"
            placeholder="my-site"
            class="admin-input"
          />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">Branch</label>
          <input
            v-model="ghBranch"
            type="text"
            placeholder="gh-pages"
            class="admin-input"
          />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">
            Personal Access Token
          </label>
          <input
            v-model="ghToken"
            type="password"
            placeholder="ghp_xxxx..."
            class="admin-input"
          />
          <p class="text-xs text-[var(--color-text-faint)] mt-1.5">
            在
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
            >GitHub Settings → Tokens</a>
            创建，需要 <code class="text-[var(--color-accent-soft)]">repo</code> 权限
          </p>
        </div>
        <div class="flex items-center gap-3 pt-2 flex-wrap">
          <button
            type="button"
            class="btn-primary"
            @click="saveGitHub"
          >
            保存配置
          </button>
          <button
            type="button"
            class="btn-secondary"
            :disabled="ghTesting"
            @click="handleTestConnection"
          >
            {{ ghTesting ? '测试中...' : '🔌 测试连接' }}
          </button>
          <button
            type="button"
            class="btn-secondary"
            :disabled="ghSyncing"
            @click="handleSyncAll"
          >
            {{ ghSyncing ? '同步中...' : '🔄 全量同步到 GitHub' }}
          </button>
        </div>
        <div class="flex items-center gap-3">
          <span v-if="ghSaved" class="text-[var(--color-accent)] text-sm font-[family-name:var(--font-mono)]">✓ 配置已保存</span>
          <span
            v-if="ghTestResult === 'success'"
            class="text-[var(--color-accent)] text-sm font-[family-name:var(--font-mono)]"
          >✓ 连接成功</span>
          <span
            v-if="ghTestResult === 'fail'"
            class="text-red-400 text-sm font-[family-name:var(--font-mono)]"
          >✗ 连接失败，请检查配置</span>
          <span
            v-if="ghSyncResult === 'success'"
            class="text-[var(--color-accent)] text-sm font-[family-name:var(--font-mono)]"
          >✓ 全量同步完成</span>
          <span
            v-if="ghSyncResult === 'fail'"
            class="text-red-400 text-sm font-[family-name:var(--font-mono)]"
          >✗ 同步失败，请检查配置和网络</span>
        </div>
      </div>
    </section>

    <!-- 修改密码 -->
    <section class="border-t border-[var(--color-border)] pt-8">
      <h2 class="text-base font-semibold text-[var(--color-text)] mb-4 font-[family-name:var(--font-mono)]">修改密码</h2>
      <form @submit.prevent="changePassword" class="space-y-4">
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">旧密码</label>
          <input
            v-model="oldPassword"
            type="password"
            class="admin-input"
          />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">新密码</label>
          <input
            v-model="newPassword"
            type="password"
            class="admin-input"
          />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]">确认新密码</label>
          <input
            v-model="confirmNewPassword"
            type="password"
            class="admin-input"
          />
        </div>
        <p v-if="passwordError" class="text-red-400 text-sm font-[family-name:var(--font-mono)]">
          <span class="text-red-500">✗</span> {{ passwordError }}
        </p>
        <div class="flex items-center gap-3 pt-2">
          <button
            type="submit"
            class="btn-primary"
          >
            修改密码
          </button>
          <span v-if="passwordSaved" class="text-[var(--color-accent)] text-sm font-[family-name:var(--font-mono)]">✓ 密码已修改</span>
        </div>
      </form>
    </section>

    <!-- 数据导入导出 -->
    <section class="border-t border-[var(--color-border)] pt-8">
      <h2 class="text-base font-semibold text-[var(--color-text)] mb-2 font-[family-name:var(--font-mono)]">数据管理</h2>
      <p class="text-sm text-[var(--color-text-muted)] mb-4">
        导出数据可以备份到其他地方，换浏览器时通过导入恢复数据。
      </p>
      <div class="flex gap-3">
        <button
          class="btn-secondary"
          @click="handleExport"
        >
          📦 导出数据
        </button>
        <button
          class="btn-secondary"
          @click="handleImport"
        >
          📥 导入数据
        </button>
      </div>
      <span v-if="importSuccess" class="text-[var(--color-accent)] text-sm mt-2 block font-[family-name:var(--font-mono)]">✓ 导入成功</span>
    </section>
  </div>
</template>
