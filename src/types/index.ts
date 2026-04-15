/** 文章类型 */
export interface Article {
  id: string
  type: 'local' | 'external' // 本地文章 or 外链
  title: string
  summary: string
  content?: string // 本地文章的 Markdown 内容
  externalUrl?: string // 外链 URL
  createdAt: string // ISO 8601 日期
  updatedAt: string // ISO 8601 日期
}

/** 收藏链接 */
export interface Bookmark {
  id: string
  title: string
  description: string
  url: string
  createdAt: string // ISO 8601 日期
}

/** 站点配置 */
export interface SiteConfig {
  title: string
  subtitle: string
  bio: string
  avatarUrl: string
}

/** 导出数据的完整结构 */
export interface ExportData {
  articles: Article[]
  bookmarks: Bookmark[]
  config: SiteConfig
  exportedAt: string
}
