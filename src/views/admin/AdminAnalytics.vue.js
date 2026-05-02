/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, onMounted } from 'vue';
import { getGitHubConfig, fetchTrafficViews, fetchTrafficClones, fetchPopularPaths, fetchPopularReferrers, fetchAnalyticsHistory, saveAnalyticsSnapshot, } from '../../utils/github';
// ---- State ----
const loading = ref(true);
const error = ref('');
const hasToken = ref(true);
const views = ref(null);
const clones = ref(null);
const paths = ref([]);
const referrers = ref([]);
const history = ref({ snapshots: [] });
const saving = ref(false);
const saveResult = ref('');
// ---- Derived ----
const todayViews = computed(() => views.value?.count ?? 0);
const todayUniques = computed(() => views.value?.uniques ?? 0);
const todayClones = computed(() => clones.value?.count ?? 0);
const dailyData = computed(() => {
    if (!views.value)
        return [];
    return views.value.views.map((v) => {
        const dayLabel = v.timestamp.slice(5, 10); // MM-DD
        const cloneMatch = clones.value?.clones.find((c) => c.timestamp === v.timestamp);
        return {
            label: dayLabel,
            views: v.count,
            uniques: v.uniques,
            clones: cloneMatch?.count ?? 0,
        };
    });
});
const chartMax = computed(() => {
    const maxV = Math.max(...dailyData.value.map((d) => Math.max(d.views, d.uniques)), 1);
    // 向上取整到友好刻度
    return Math.ceil(maxV / 10) * 10;
});
const topPaths = computed(() => paths.value.slice(0, 10));
const hasHistory = computed(() => history.value.snapshots.length > 0);
// ---- Actions ----
async function loadData() {
    const config = getGitHubConfig();
    if (!config) {
        hasToken.value = false;
        loading.value = false;
        return;
    }
    hasToken.value = true;
    loading.value = true;
    error.value = '';
    try {
        const [v, c, p, r, h] = await Promise.all([
            fetchTrafficViews(config),
            fetchTrafficClones(config),
            fetchPopularPaths(config),
            fetchPopularReferrers(config),
            fetchAnalyticsHistory(),
        ]);
        views.value = v;
        clones.value = c;
        paths.value = p;
        referrers.value = r;
        history.value = h;
    }
    catch (e) {
        error.value = e instanceof Error ? e.message : '加载失败';
        // 如果全失败清空旧数据
        views.value = null;
        clones.value = null;
        paths.value = [];
        referrers.value = [];
    }
    finally {
        loading.value = false;
    }
}
async function saveSnapshot() {
    const config = getGitHubConfig();
    if (!config || !views.value || !clones.value)
        return;
    saving.value = true;
    saveResult.value = '';
    const today = new Date().toISOString().slice(0, 10);
    const snapshot = {
        date: today,
        views: views.value.count,
        uniques: views.value.uniques,
        clones: clones.value.count,
    };
    const ok = await saveAnalyticsSnapshot(config, snapshot, history.value);
    saveResult.value = ok ? 'success' : 'fail';
    saving.value = false;
    // 重新加载历史
    history.value = await fetchAnalyticsHistory();
    setTimeout(() => {
        saveResult.value = '';
    }, 2000);
}
/** 最大柱高度 px */
const MAX_BAR_H = 200;
function barH(value) {
    if (chartMax.value === 0)
        return 0;
    return Math.max((value / chartMax.value) * MAX_BAR_H, 2);
}
onMounted(loadData);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-4xl" },
});
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between mb-6" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]" },
});
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-bright)]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.loadData) },
    ...{ class: "text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] font-[family-name:var(--font-mono)]" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
if (!__VLS_ctx.hasToken && !__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-8 text-center" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    let __VLS_0;
    /** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
    routerLink;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        to: "/admin/settings",
        ...{ class: "text-sm text-[var(--color-accent)] hover:underline font-[family-name:var(--font-mono)]" },
    }));
    const __VLS_2 = __VLS_1({
        to: "/admin/settings",
        ...{ class: "text-sm text-[var(--color-accent)] hover:underline font-[family-name:var(--font-mono)]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    const { default: __VLS_5 } = __VLS_3.slots;
    // @ts-ignore
    [loadData, hasToken, loading,];
    var __VLS_3;
}
if (__VLS_ctx.error && !__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-red-500/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-red-500/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-red-400 text-sm font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.error);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.loadData) },
        ...{ class: "mt-3 text-xs text-[var(--color-accent)] hover:underline font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
}
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-6" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-3 gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    for (const [i] of __VLS_vFor((3))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (i),
            ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 animate-pulse" },
        });
        /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "h-4 w-16 bg-[var(--color-bg-card-soft)] rounded mb-2" },
        });
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-16']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card-soft)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "h-8 w-24 bg-[var(--color-bg-card-soft)] rounded" },
        });
        /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-24']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card-soft)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        // @ts-ignore
        [loadData, loading, loading, error, error,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 animate-pulse" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "h-4 w-24 bg-[var(--color-bg-card-soft)] rounded mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card-soft)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    for (const [i] of __VLS_vFor((7))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            key: (i),
            ...{ class: "flex gap-2 items-end h-[220px]" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-[220px]']} */ ;
        // @ts-ignore
        [];
    }
}
if (!__VLS_ctx.loading && __VLS_ctx.hasToken && !__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-3 gap-4 mb-6" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-2xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-bright)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.todayViews.toLocaleString());
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs text-[var(--color-text-subtle)] mt-1 font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.todayUniques.toLocaleString());
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-2xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-bright)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.todayUniques.toLocaleString());
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs text-[var(--color-text-subtle)] mt-1 font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-2xl font-bold text-[var(--color-text-bright)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-bright)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.todayClones.toLocaleString());
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs text-[var(--color-text-subtle)] mt-1 font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 mb-6" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-sm font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-4 mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "w-3 h-3 rounded-sm bg-[var(--color-accent)] inline-block" },
    });
    /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "w-3 h-3 rounded-sm bg-[var(--color-accent-dim)] inline-block" },
    });
    /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent-dim)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
    if (__VLS_ctx.dailyData.length > 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "relative" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['relative']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-[10px] text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)] text-right pr-2" },
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['bottom-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        /** @type {__VLS_StyleScopedClasses['pr-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.chartMax);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (Math.round(__VLS_ctx.chartMax / 2));
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "ml-10 flex items-end gap-1" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['ml-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        for (const [day, i] of __VLS_vFor((__VLS_ctx.dailyData))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (i),
                ...{ class: "flex-1 flex flex-col items-center justify-end" },
                ...{ style: {} },
            });
            /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-end gap-px" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-px']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: "w-2 rounded-t-sm bg-[var(--color-accent)] opacity-80 hover:opacity-100 transition-opacity" },
                ...{ style: ({ height: __VLS_ctx.barH(day.views) + 'px' }) },
                title: (`${day.label} 浏览量: ${day.views}`),
            });
            /** @type {__VLS_StyleScopedClasses['w-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-t-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['opacity-80']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: "w-2 rounded-t-sm bg-[var(--color-text-subtle)] opacity-50 hover:opacity-70 transition-opacity" },
                ...{ style: ({ height: __VLS_ctx.barH(day.uniques) + 'px' }) },
                title: (`${day.label} 独立访客: ${day.uniques}`),
            });
            /** @type {__VLS_StyleScopedClasses['w-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-t-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-[var(--color-text-subtle)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:opacity-70']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-[10px] text-[var(--color-text-muted)] mt-1 font-[family-name:var(--font-mono)] leading-tight" },
            });
            /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
            (day.label);
            // @ts-ignore
            [hasToken, loading, error, todayViews, todayUniques, todayUniques, todayClones, dailyData, dailyData, chartMax, chartMax, barH, barH,];
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-sm text-[var(--color-text-muted)] text-center py-8 font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-6 mb-6" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-sm font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    if (__VLS_ctx.topPaths.length > 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "space-y-1" },
        });
        /** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
        for (const [p, i] of __VLS_vFor((__VLS_ctx.topPaths))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (p.path),
                ...{ class: "flex items-center justify-between py-2 px-2 rounded hover:bg-[var(--color-bg-card-soft)] transition-colors" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:bg-[var(--color-bg-card-soft)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center gap-2 min-w-0" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-xs text-[var(--color-text-muted)] w-5 shrink-0 font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (i + 1);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-sm text-[var(--color-text)] truncate font-[family-name:var(--font-mono)]" },
                title: (p.path),
            });
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (p.path);
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center gap-3 shrink-0 ml-2" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (p.count);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-xs text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (p.uniques);
            // @ts-ignore
            [topPaths, topPaths,];
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-sm text-[var(--color-text-muted)] text-center py-8 font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-sm font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    if (__VLS_ctx.referrers.length > 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "space-y-1" },
        });
        /** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
        for (const [r, i] of __VLS_vFor((__VLS_ctx.referrers))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (r.referrer),
                ...{ class: "flex items-center justify-between py-2 px-2 rounded hover:bg-[var(--color-bg-card-soft)] transition-colors" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:bg-[var(--color-bg-card-soft)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center gap-2 min-w-0" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-xs text-[var(--color-text-muted)] w-5 shrink-0 font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (i + 1);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-sm text-[var(--color-text)] truncate font-[family-name:var(--font-mono)]" },
                title: (r.referrer),
            });
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (r.referrer || '直接访问');
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center gap-3 shrink-0 ml-2" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (r.count);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-xs text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (r.uniques);
            // @ts-ignore
            [referrers, referrers,];
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-sm text-[var(--color-text-muted)] text-center py-8 font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-sm font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    if (__VLS_ctx.saveResult === 'success') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs text-green-400 font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-green-400']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    }
    if (__VLS_ctx.saveResult === 'fail') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs text-red-400 font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.saveSnapshot) },
        ...{ class: "text-xs px-3 py-1.5 rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)] hover:brightness-110 font-[family-name:var(--font-mono)] disabled:opacity-50" },
        disabled: (__VLS_ctx.saving),
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent-dim)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:brightness-110']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
    (__VLS_ctx.saving ? '保存中...' : '+ 保存今日快照');
    if (__VLS_ctx.hasHistory) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-end gap-1" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        for (const [snap] of __VLS_vFor((__VLS_ctx.history.snapshots))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (snap.date),
                ...{ class: "flex-1 flex flex-col items-center justify-end" },
                ...{ style: {} },
            });
            /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: "w-full max-w-[30px] rounded-t-sm bg-[var(--color-accent)] opacity-60 hover:opacity-100 transition-opacity cursor-default" },
                ...{ style: ({ height: (snap.views / Math.max(...__VLS_ctx.history.snapshots.map(s => s.views), 1)) * 100 + 'px' }) },
                title: (`${snap.date}: ${snap.views} 浏览 / ${snap.uniques} 访客`),
            });
            /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['max-w-[30px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-t-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-default']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-[9px] text-[var(--color-text-muted)] mt-1 font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-[9px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (snap.date.slice(5));
            // @ts-ignore
            [saveResult, saveResult, saveSnapshot, saving, saving, hasHistory, history, history,];
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-sm text-[var(--color-text-muted)] text-center py-4 font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
