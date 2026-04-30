import { reactive, ref } from 'vue'
import type { Article, Bookmark, Project, SiteConfig, ExportData } from '../types'
import { fetchPublicData, getGitHubConfig, writeFile } from '../utils/github'

/** localStorage 键名 */
const KEYS = {
  articles: 'site_articles',
  bookmarks: 'site_bookmarks',
  projects: 'site_projects',
  config: 'site_config',
  password: 'site_admin_password',
} as const

/** 默认站点配置 */
const DEFAULT_CONFIG: SiteConfig = {
  title: '涛哥的博客',
  subtitle: '记录技术与生活',
  bio: '一个热爱技术的开发者，在这里分享我的文章和收藏。',
  avatarUrl: '',
}

/** 从 localStorage 读取 JSON */
function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch {
    // 解析失败，返回默认值
  }
  return fallback
}

/** 保存 JSON 到 localStorage */
function saveJSON(key: string, data: unknown): void {
  localStorage.setItem(key, JSON.stringify(data))
}

/** 全局响应式状态 */
export const store = reactive({
  articles: loadJSON<Article[]>(KEYS.articles, []),
  bookmarks: loadJSON<Bookmark[]>(KEYS.bookmarks, []),
  projects: loadJSON<Project[]>(KEYS.projects, []),
  config: loadJSON<SiteConfig>(KEYS.config, { ...DEFAULT_CONFIG }),
})

/** 数据是否正在从远程加载 */
export const dataLoading = ref(false)

/** 数据是否已从远程加载过（避免重复请求） */
let remoteLoaded = false

// ==================== 远程数据加载 ====================

/**
 * 从 GitHub Pages 静态 JSON 加载数据
 * 成功则更新响应式状态和 localStorage
 * 失败则 fallback 到 localStorage 中的数据（静默）
 */
export async function loadFromGitHub(): Promise<void> {
  if (remoteLoaded) return
  dataLoading.value = true
  try {
    const [articles, bookmarks, projects, config] = await Promise.all([
      fetchPublicData<Article[]>('articles.json'),
      fetchPublicData<Bookmark[]>('bookmarks.json'),
      fetchPublicData<Project[]>('projects.json'),
      fetchPublicData<SiteConfig>('config.json'),
    ])

    store.articles = articles
    store.bookmarks = bookmarks
    store.projects = projects
    // config 可能是不完整的旧数据，合并默认值
    Object.assign(store.config, DEFAULT_CONFIG, config)

    // 同步到 localStorage 作为缓存
    saveJSON(KEYS.articles, store.articles)
    saveJSON(KEYS.bookmarks, store.bookmarks)
    saveJSON(KEYS.projects, store.projects)
    saveJSON(KEYS.config, store.config)

    remoteLoaded = true
  } catch {
    // 远程加载失败，沿用 localStorage 中的数据
    console.warn('[store] 从远程加载数据失败，使用本地缓存')
  } finally {
    dataLoading.value = false
  }
}

// ==================== GitHub 写入辅助 ====================

/**
 * 异步同步单个数据文件到 GitHub
 * 返回是否成功
 */
async function syncFileToGitHub(
  filePath: string,
  data: unknown,
  message: string,
): Promise<boolean> {
  const config = getGitHubConfig()
  if (!config) return false
  try {
    await writeFile(config, filePath, JSON.stringify(data, null, 2), message)
    return true
  } catch (e) {
    console.error(`[GitHub] 同步 ${filePath} 失败:`, e)
    return false
  }
}

/**
 * 全量同步所有数据到 GitHub
 * 返回是否全部成功
 */
export async function syncAllToGitHub(): Promise<boolean> {
  const results = await Promise.all([
    syncFileToGitHub('data/articles.json', store.articles, '同步文章数据'),
    syncFileToGitHub('data/bookmarks.json', store.bookmarks, '同步收藏数据'),
    syncFileToGitHub('data/projects.json', store.projects, '同步项目数据'),
    syncFileToGitHub('data/config.json', store.config, '同步站点配置'),
  ])
  return results.every(Boolean)
}

// ==================== 文章操作 ====================

/** 获取所有文章（按创建日期倒序） */
export function getArticles(): Article[] {
  return [...store.articles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

/** 根据 ID 获取文章 */
export function getArticleById(id: string): Article | undefined {
  return store.articles.find((a) => a.id === id)
}

/** 添加文章，返回 GitHub 同步结果 */
export async function addArticle(article: Article): Promise<boolean> {
  store.articles.push(article)
  saveJSON(KEYS.articles, store.articles)
  return syncFileToGitHub('data/articles.json', store.articles, `新建文章: ${article.title}`)
}

/** 更新文章，返回 GitHub 同步结果 */
export async function updateArticle(article: Article): Promise<boolean> {
  const index = store.articles.findIndex((a) => a.id === article.id)
  if (index !== -1) {
    store.articles[index] = article
    saveJSON(KEYS.articles, store.articles)
    return syncFileToGitHub('data/articles.json', store.articles, `更新文章: ${article.title}`)
  }
  return false
}

/** 切换文章隐藏状态，返回 GitHub 同步结果 */
export async function toggleArticleHidden(id: string): Promise<boolean> {
  const article = store.articles.find((a) => a.id === id)
  if (!article) return false
  article.hidden = !article.hidden
  saveJSON(KEYS.articles, store.articles)
  return syncFileToGitHub('data/articles.json', store.articles, `${article.hidden ? '隐藏' : '显示'}文章: ${article.title}`)
}

/** 删除文章，返回 GitHub 同步结果 */
export async function deleteArticle(id: string): Promise<boolean> {
  const article = store.articles.find((a) => a.id === id)
  store.articles = store.articles.filter((a) => a.id !== id)
  saveJSON(KEYS.articles, store.articles)
  return syncFileToGitHub(
    'data/articles.json',
    store.articles,
    `删除文章: ${article?.title || id}`,
  )
}

// ==================== 收藏操作 ====================

/** 获取所有收藏（按创建日期倒序） */
export function getBookmarks(): Bookmark[] {
  return [...store.bookmarks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

/** 根据 ID 获取收藏 */
export function getBookmarkById(id: string): Bookmark | undefined {
  return store.bookmarks.find((b) => b.id === id)
}

/** 添加收藏，返回 GitHub 同步结果 */
export async function addBookmark(bookmark: Bookmark): Promise<boolean> {
  store.bookmarks.push(bookmark)
  saveJSON(KEYS.bookmarks, store.bookmarks)
  return syncFileToGitHub('data/bookmarks.json', store.bookmarks, `新建收藏: ${bookmark.title}`)
}

/** 更新收藏，返回 GitHub 同步结果 */
export async function updateBookmark(bookmark: Bookmark): Promise<boolean> {
  const index = store.bookmarks.findIndex((b) => b.id === bookmark.id)
  if (index !== -1) {
    store.bookmarks[index] = bookmark
    saveJSON(KEYS.bookmarks, store.bookmarks)
    return syncFileToGitHub('data/bookmarks.json', store.bookmarks, `更新收藏: ${bookmark.title}`)
  }
  return false
}

/** 切换收藏隐藏状态，返回 GitHub 同步结果 */
export async function toggleBookmarkHidden(id: string): Promise<boolean> {
  const bookmark = store.bookmarks.find((b) => b.id === id)
  if (!bookmark) return false
  bookmark.hidden = !bookmark.hidden
  saveJSON(KEYS.bookmarks, store.bookmarks)
  return syncFileToGitHub('data/bookmarks.json', store.bookmarks, `${bookmark.hidden ? '隐藏' : '显示'}收藏: ${bookmark.title}`)
}

/** 删除收藏，返回 GitHub 同步结果 */
export async function deleteBookmark(id: string): Promise<boolean> {
  const bookmark = store.bookmarks.find((b) => b.id === id)
  store.bookmarks = store.bookmarks.filter((b) => b.id !== id)
  saveJSON(KEYS.bookmarks, store.bookmarks)
  return syncFileToGitHub(
    'data/bookmarks.json',
    store.bookmarks,
    `删除收藏: ${bookmark?.title || id}`,
  )
}

// ==================== 项目操作 ====================

/** 获取所有项目（按创建日期倒序） */
export function getProjects(): Project[] {
  return [...store.projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

/** 根据 ID 获取项目 */
export function getProjectById(id: string): Project | undefined {
  return store.projects.find((p) => p.id === id)
}

/** 添加项目，返回 GitHub 同步结果 */
export async function addProject(project: Project): Promise<boolean> {
  store.projects.push(project)
  saveJSON(KEYS.projects, store.projects)
  return syncFileToGitHub('data/projects.json', store.projects, `新建项目: ${project.title}`)
}

/** 更新项目，返回 GitHub 同步结果 */
export async function updateProject(project: Project): Promise<boolean> {
  const index = store.projects.findIndex((p) => p.id === project.id)
  if (index !== -1) {
    store.projects[index] = project
    saveJSON(KEYS.projects, store.projects)
    return syncFileToGitHub('data/projects.json', store.projects, `更新项目: ${project.title}`)
  }
  return false
}

/** 切换项目隐藏状态，返回 GitHub 同步结果 */
export async function toggleProjectHidden(id: string): Promise<boolean> {
  const project = store.projects.find((p) => p.id === id)
  if (!project) return false
  project.hidden = !project.hidden
  saveJSON(KEYS.projects, store.projects)
  return syncFileToGitHub('data/projects.json', store.projects, `${project.hidden ? '隐藏' : '显示'}项目: ${project.title}`)
}

/** 删除项目，返回 GitHub 同步结果 */
export async function deleteProject(id: string): Promise<boolean> {
  const project = store.projects.find((p) => p.id === id)
  store.projects = store.projects.filter((p) => p.id !== id)
  saveJSON(KEYS.projects, store.projects)
  return syncFileToGitHub(
    'data/projects.json',
    store.projects,
    `删除项目: ${project?.title || id}`,
  )
}

// ==================== 站点配置 ====================

/** 获取站点配置 */
export function getSiteConfig(): SiteConfig {
  return store.config
}

/** 更新站点配置，返回 GitHub 同步结果 */
export async function updateSiteConfig(config: SiteConfig): Promise<boolean> {
  Object.assign(store.config, config)
  saveJSON(KEYS.config, store.config)
  return syncFileToGitHub('data/config.json', store.config, '更新站点配置')
}

// ==================== 密码管理 ====================

/** 获取已存储的密码哈希 */
export function getPasswordHash(): string | null {
  return localStorage.getItem(KEYS.password)
}

/** 设置密码哈希 */
export function setPasswordHash(hash: string): void {
  localStorage.setItem(KEYS.password, hash)
}

// ==================== 数据导入导出 ====================

/** 导出所有数据 */
export function exportData(): ExportData {
  return {
    articles: store.articles,
    bookmarks: store.bookmarks,
    projects: store.projects,
    config: store.config,
    exportedAt: new Date().toISOString(),
  }
}

/** 导入数据（覆盖当前数据） */
export function importData(data: ExportData): void {
  store.articles = data.articles || []
  store.bookmarks = data.bookmarks || []
  store.projects = data.projects || []
  if (data.config) {
    Object.assign(store.config, data.config)
  }
  saveJSON(KEYS.articles, store.articles)
  saveJSON(KEYS.bookmarks, store.bookmarks)
  saveJSON(KEYS.projects, store.projects)
  saveJSON(KEYS.config, store.config)
}
