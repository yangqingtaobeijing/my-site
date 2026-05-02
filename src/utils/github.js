/**
 * 从相对路径读取公开数据（前台展示用，不需要 token）
 * 本地开发和 GitHub Pages 都能用
 */
export async function fetchPublicData(filePath) {
    const base = import.meta.env.BASE_URL;
    const url = `${base}data/${filePath}`;
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) {
        throw new Error(`读取 ${filePath} 失败: ${res.status}`);
    }
    return res.json();
}
/**
 * 通过 GitHub API 获取文件的 sha 值（更新文件时需要）
 * 如果文件不存在返回 null
 */
export async function getFileSha(config, path) {
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${config.token}`,
            Accept: 'application/vnd.github.v3+json',
        },
    });
    if (res.status === 404)
        return null;
    if (!res.ok) {
        throw new Error(`获取文件 sha 失败: ${res.status}`);
    }
    const data = await res.json();
    return data.sha;
}
/**
 * 通过 GitHub Contents API 写入/更新文件
 * 内容会自动 base64 编码
 */
export async function writeFile(config, path, content, message) {
    // 先获取已有文件的 sha（如果存在）
    const sha = await getFileSha(config, path);
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;
    const body = {
        message,
        content: btoa(unescape(encodeURIComponent(content))),
        branch: config.branch,
    };
    if (sha) {
        body.sha = sha;
    }
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${config.token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(`写入 GitHub 失败: ${res.status} ${errData.message || ''}`);
    }
}
/**
 * 测试 GitHub 连接（尝试获取仓库信息）
 */
export async function testConnection(config) {
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${config.token}`,
            Accept: 'application/vnd.github.v3+json',
        },
    });
    return res.ok;
}
async function fetchTraffic(config, endpoint) {
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/traffic/${endpoint}`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${config.token}`,
            Accept: 'application/vnd.github.v3+json',
        },
    });
    if (!res.ok) {
        throw new Error(`Traffic API ${endpoint} 失败: ${res.status}`);
    }
    return res.json();
}
export async function fetchTrafficViews(config) {
    return fetchTraffic(config, 'views');
}
export async function fetchTrafficClones(config) {
    return fetchTraffic(config, 'clones');
}
export async function fetchPopularPaths(config) {
    return fetchTraffic(config, 'popular/paths');
}
export async function fetchPopularReferrers(config) {
    return fetchTraffic(config, 'popular/referrers');
}
/** 从 GitHub Pages 读取历史分析数据 */
export async function fetchAnalyticsHistory() {
    try {
        return await fetchPublicData('analytics.json');
    }
    catch {
        return { snapshots: [] };
    }
}
/** 保存历史快照到 GitHub */
export async function saveAnalyticsSnapshot(config, snapshot, existing) {
    const filtered = existing.snapshots.filter((s) => s.date !== snapshot.date);
    const data = {
        snapshots: [...filtered, snapshot].sort((a, b) => a.date.localeCompare(b.date)),
    };
    try {
        await writeFile(config, 'data/analytics.json', JSON.stringify(data, null, 2), `保存分析快照 ${snapshot.date}`);
        return true;
    }
    catch (e) {
        console.error('[Analytics] 保存快照失败:', e);
        return false;
    }
}
// ==================== localStorage 中的 GitHub 配置管理 ====================
const GH_KEYS = {
    owner: 'github_owner',
    repo: 'github_repo',
    branch: 'github_branch',
    token: 'github_token',
};
/** 从 localStorage 获取 GitHub 配置，缺少 token 则返回 null */
export function getGitHubConfig() {
    const token = localStorage.getItem(GH_KEYS.token);
    if (!token)
        return null;
    return {
        owner: localStorage.getItem(GH_KEYS.owner) || 'yangqingtaobeijing',
        repo: localStorage.getItem(GH_KEYS.repo) || 'my-site',
        branch: localStorage.getItem(GH_KEYS.branch) || 'gh-pages',
        token,
    };
}
/** 保存 GitHub 配置到 localStorage */
export function saveGitHubConfig(config) {
    localStorage.setItem(GH_KEYS.owner, config.owner);
    localStorage.setItem(GH_KEYS.repo, config.repo);
    localStorage.setItem(GH_KEYS.branch, config.branch);
    localStorage.setItem(GH_KEYS.token, config.token);
}
/** 获取 GitHub 配置各字段（即使 token 为空也返回，用于表单回显） */
export function getGitHubFields() {
    return {
        owner: localStorage.getItem(GH_KEYS.owner) || 'yangqingtaobeijing',
        repo: localStorage.getItem(GH_KEYS.repo) || 'my-site',
        branch: localStorage.getItem(GH_KEYS.branch) || 'gh-pages',
        token: localStorage.getItem(GH_KEYS.token) || '',
    };
}
