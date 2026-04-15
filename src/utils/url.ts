/**
 * 从 URL 中提取域名
 */
export function extractDomain(url: string): string {
  try {
    const u = new URL(url)
    return u.hostname
  } catch {
    return url
  }
}
