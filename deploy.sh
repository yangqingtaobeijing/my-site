#!/bin/bash
# 部署脚本：构建 + 从线上保留已有数据 + 部署
set -e

OWNER="yangqingtaobeijing"
REPO="my-site"
BASE_URL="https://raw.githubusercontent.com/${OWNER}/${REPO}/gh-pages"

echo "📦 构建项目..."
npm run build

echo "📥 从线上拉取已有数据文件..."
for file in articles.json bookmarks.json config.json projects.json; do
  # 从 GitHub Pages 的 gh-pages 分支直接下载
  content=$(curl -sf "${BASE_URL}/data/${file}" 2>/dev/null) && {
    # 只保留非空数据
    if [ "$content" != "[]" ] && [ "$content" != "{}" ] && [ -n "$content" ]; then
      echo "$content" > "dist/data/${file}"
      echo "  ✓ 保留 data/${file}"
    else
      echo "  - data/${file} 为空，使用默认值"
    fi
  } || echo "  - data/${file} 不存在，使用默认值"
done

echo "🚀 部署到 GitHub Pages..."
npx gh-pages -d dist

echo "✅ 部署完成！"
