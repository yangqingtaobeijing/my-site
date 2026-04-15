import { reactive } from 'vue'
import type { Article, Bookmark, SiteConfig, ExportData } from '../types'

/** localStorage 键名 */
const KEYS = {
  articles: 'site_articles',
  bookmarks: 'site_bookmarks',
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
  config: loadJSON<SiteConfig>(KEYS.config, { ...DEFAULT_CONFIG }),
})

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

/** 添加文章 */
export function addArticle(article: Article): void {
  store.articles.push(article)
  saveJSON(KEYS.articles, store.articles)
}

/** 更新文章 */
export function updateArticle(article: Article): void {
  const index = store.articles.findIndex((a) => a.id === article.id)
  if (index !== -1) {
    store.articles[index] = article
    saveJSON(KEYS.articles, store.articles)
  }
}

/** 删除文章 */
export function deleteArticle(id: string): void {
  store.articles = store.articles.filter((a) => a.id !== id)
  saveJSON(KEYS.articles, store.articles)
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

/** 添加收藏 */
export function addBookmark(bookmark: Bookmark): void {
  store.bookmarks.push(bookmark)
  saveJSON(KEYS.bookmarks, store.bookmarks)
}

/** 更新收藏 */
export function updateBookmark(bookmark: Bookmark): void {
  const index = store.bookmarks.findIndex((b) => b.id === bookmark.id)
  if (index !== -1) {
    store.bookmarks[index] = bookmark
    saveJSON(KEYS.bookmarks, store.bookmarks)
  }
}

/** 删除收藏 */
export function deleteBookmark(id: string): void {
  store.bookmarks = store.bookmarks.filter((b) => b.id !== id)
  saveJSON(KEYS.bookmarks, store.bookmarks)
}

// ==================== 站点配置 ====================

/** 获取站点配置 */
export function getSiteConfig(): SiteConfig {
  return store.config
}

/** 更新站点配置 */
export function updateSiteConfig(config: SiteConfig): void {
  Object.assign(store.config, config)
  saveJSON(KEYS.config, store.config)
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
    config: store.config,
    exportedAt: new Date().toISOString(),
  }
}

/** 导入数据（覆盖当前数据） */
export function importData(data: ExportData): void {
  store.articles = data.articles || []
  store.bookmarks = data.bookmarks || []
  if (data.config) {
    Object.assign(store.config, data.config)
  }
  saveJSON(KEYS.articles, store.articles)
  saveJSON(KEYS.bookmarks, store.bookmarks)
  saveJSON(KEYS.config, store.config)
}
