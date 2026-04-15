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

/** 项目作品 */
export interface Project {
  id: string
  title: string          // 项目名称
  description: string    // 项目描述
  url: string           // 项目链接（如 GitHub Pages 地址）
  sourceUrl?: string    // 源码链接（如 GitHub 仓库，可选）
  tags?: string[]       // 标签（如 ['Vue', 'TypeScript', '游戏']）
  coverUrl?: string     // 封面图 URL（可选）
  createdAt: string     // ISO 8601 日期
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
  projects: Project[]
  config: SiteConfig
  exportedAt: string
}

/** GitHub API 配置 */
export interface GitHubConfig {
  owner: string      // 如 'yangqingtaobeijing'
  repo: string       // 如 'my-site'
  branch: string     // 'gh-pages'
  token: string      // Personal Access Token
}
