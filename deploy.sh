#!/bin/bash
# 部署脚本：构建 + 智能合并线上数据 + 部署
set -e

OWNER="yangqingtaobeijing"
REPO="my-site"
BASE_URL="https://raw.githubusercontent.com/${OWNER}/${REPO}/gh-pages"

echo "📦 构建项目..."
npm run build

echo "📥 拉取线上数据（线上数据优先）..."
for file in articles.json bookmarks.json config.json projects.json; do
  local_file="dist/data/${file}"
  remote_content=$(curl -sf "${BASE_URL}/data/${file}" 2>/dev/null || echo "")

  # 永远优先用线上数据，线上有内容就覆盖本地构建产物
  if [ -n "$remote_content" ] && [ "$remote_content" != "[]" ] && [ "$remote_content" != "{}" ]; then
    echo "$remote_content" > "$local_file"
    echo "  ✓ 使用线上 data/${file}"
  else
    echo "  - 线上 data/${file} 为空，保留本地构建产物"
  fi
done

echo "🚀 部署到 GitHub Pages..."
npx gh-pages -d dist

echo "✅ 部署完成！"
