#!/bin/bash
# 部署脚本：构建 + 智能合并线上数据 + 部署
set -e

OWNER="yangqingtaobeijing"
REPO="my-site"
BASE_URL="https://raw.githubusercontent.com/${OWNER}/${REPO}/gh-pages"

echo "📦 构建项目..."
npm run build

echo "📥 合并数据文件..."
for file in articles.json bookmarks.json config.json projects.json; do
  local_file="dist/data/${file}"
  local_content=$(cat "$local_file" 2>/dev/null || echo "")
  remote_content=$(curl -sf "${BASE_URL}/data/${file}" 2>/dev/null || echo "")

  # 如果本地有实质内容（不是空数组/空对象），优先用本地
  if [ -n "$local_content" ] && [ "$local_content" != "[]" ] && [ "$local_content" != "{}" ]; then
    echo "  ✓ 使用本地 data/${file}"
  # 否则如果线上有实质内容，用线上的
  elif [ -n "$remote_content" ] && [ "$remote_content" != "[]" ] && [ "$remote_content" != "{}" ]; then
    echo "$remote_content" > "$local_file"
    echo "  ✓ 使用线上 data/${file}"
  else
    echo "  - data/${file} 均为空，使用默认值"
  fi
done

echo "🚀 部署到 GitHub Pages..."
npx gh-pages -d dist

echo "✅ 部署完成！"
