/** 分类颜色配置 */
export interface CategoryColors {
  bg: string
  text: string
  border: string
  dot: string
}

/** 默认分类颜色映射 */
const defaultColors: Record<string, CategoryColors> = {
  'AI 领域': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500' },
  '学习资源': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  '财务工具': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  'PM 工具': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
  '生活工具': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', dot: 'bg-cyan-500' },
  '效率工具': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-500' },
  '游戏娱乐': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
  'Vibe Coding': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500' },
  '美股研究': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  '自由职业': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', dot: 'bg-teal-500' },
  '其他': { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' },
}

export const defaultCategoryColor: CategoryColors = {
  bg: 'bg-gray-50',
  text: 'text-gray-600',
  border: 'border-gray-200',
  dot: 'bg-gray-400',
}

/** 备选颜色库（新增分类时自动分配） */
const fallbackPalette: CategoryColors[] = [
  { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', dot: 'bg-pink-500' },
  { bg: 'bg-lime-50', text: 'text-lime-700', border: 'border-lime-200', dot: 'bg-lime-500' },
  { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', dot: 'bg-sky-500' },
  { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200', dot: 'bg-fuchsia-500' },
  { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' },
]

/** 默认分类排序 */
const defaultOrder = [
  'Vibe Coding', '财务工具', 'AI 领域', 'PM 工具', '学习资源',
  '生活工具', '效率工具', '游戏娱乐', '美股研究', '自由职业', '其他',
]

// ---- localStorage 持久化 ----

const LS_KEY_ORDER = 'project_category_order'
const LS_KEY_CUSTOM = 'project_category_custom'

function loadOrder(): string[] {
  try {
    const raw = localStorage.getItem(LS_KEY_ORDER)
    if (raw) return JSON.parse(raw) as string[]
  } catch { /* ignore */ }
  return [...defaultOrder]
}

function saveOrder(order: string[]): void {
  localStorage.setItem(LS_KEY_ORDER, JSON.stringify(order))
}

function loadCustom(): string[] {
  try {
    const raw = localStorage.getItem(LS_KEY_CUSTOM)
    if (raw) return JSON.parse(raw) as string[]
  } catch { /* ignore */ }
  return []
}

function saveCustom(custom: string[]): void {
  localStorage.setItem(LS_KEY_CUSTOM, JSON.stringify(custom))
}

// ---- 对外接口 ----

/** 获取完整分类列表（默认 + 用户新增，按顺序） */
export function getCategoryList(): string[] {
  const order = loadOrder()
  return [...order]
}

/** 获取分类颜色 */
export function getCategoryColor(name: string): CategoryColors {
  if (defaultColors[name]) return defaultColors[name]
  // 用 hash 从调色板选一个稳定颜色
  const hash = name.split('').reduce((s, c) => s + c.charCodeAt(0), 0)
  return fallbackPalette[hash % fallbackPalette.length]
}

/** 更新分类列表（新增/重新排序） */
export function saveCategoryList(order: string[]): void {
  saveOrder(order)
}

/** 添加新分类 */
export function addCategory(name: string): string[] {
  const current = loadOrder()
  if (current.includes(name)) return current
  const updated = [...current, name]
  saveOrder(updated)
  return updated
}

/** 获取默认分类列表（兜底） */
export function getDefaultOrder(): string[] {
  return [...defaultOrder]
}
