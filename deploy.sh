#!/bin/bash
# 部署脚本：构建 + 保留 gh-pages 上的数据文件 + 部署
set -e

echo "📦 构建项目..."
npm run build

echo "📥 从 gh-pages 分支拉取已有数据文件..."
# 尝试从 gh-pages 分支获取 data/ 下的 JSON 文件，覆盖到 dist/data/
for file in articles.json bookmarks.json config.json projects.json; do
  content=$(git show gh-pages:data/$file 2>/dev/null) && {
    # 只保留非空数据（不是空数组或空对象的才覆盖）
    if [ "$content" != "[]" ] && [ "$content" != "{}" ]; then
      echo "$content" > dist/data/$file
      echo "  ✓ 保留 data/$file"
    else
      echo "  - data/$file 为空，使用默认值"
    fi
  } || echo "  - data/$file 不存在，使用默认值"
done

echo "🚀 部署到 GitHub Pages..."
npx gh-pages -d dist

echo "✅ 部署完成！"
