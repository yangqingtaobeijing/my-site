import { Marked } from 'marked'
import hljs from 'highlight.js'

/** 创建配置好的 marked 实例 */
const marked = new Marked({
  gfm: true,
  breaks: true,
})

/** 自定义渲染器：代码高亮 */
marked.use({
  renderer: {
    code({ text, lang }: { text: string; lang?: string }) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
      const highlighted = hljs.highlight(text, { language }).value
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
    },
  },
})

/**
 * 将 Markdown 文本渲染为 HTML
 */
export function renderMarkdown(content: string): string {
  const result = marked.parse(content)
  if (typeof result === 'string') return result
  // marked v18 parse 返回 string
  return String(result)
}
