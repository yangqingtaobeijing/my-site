/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue';
import SiteHeader from '../components/SiteHeader.vue';
import SiteFooter from '../components/SiteFooter.vue';
import { getProjects, loadFromGitHub, dataLoading } from '../store';
const openProject = (url) => window.open(url, '_blank');
const projects = computed(() => getProjects().filter(p => !p.hidden));
// 分类颜色映射
const categoryColors = {
    '美股研究': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    'AI 领域': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500' },
    '学习资源': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
    '财务工具': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    'PM 工具': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
    '生活工具': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', dot: 'bg-cyan-500' },
    '效率工具': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-500' },
    '游戏娱乐': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
    'Vibe Coding': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500' },
    '其他': { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' },
};
const defaultColor = { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' };
// 分类排序（美股研究倒数第二）
const categoryOrder = ['Vibe Coding', '财务工具', 'AI 领域', 'PM 工具', '学习资源', '生活工具', '效率工具', '游戏娱乐', '美股研究', '其他'];
// 按分类分组
const groupedProjects = computed(() => {
    const groups = {};
    for (const p of projects.value) {
        const cat = p.category || '其他';
        if (!groups[cat])
            groups[cat] = [];
        groups[cat].push(p);
    }
    return categoryOrder.filter(o => groups[o]).map(o => ({
        name: o,
        projects: groups[o],
        colors: categoryColors[o] || defaultColor,
    }));
});
// 当前高亮的分类（scroll-spy）
const activeCategory = ref('');
const sectionRefs = ref({});
let observer = null;
const setSectionRef = (name) => (el) => {
    if (el)
        sectionRefs.value[name] = el;
};
// 点击导航滚动到对应分类
const scrollToCategory = (name) => {
    activeCategory.value = name;
    const el = sectionRefs.value[name];
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};
onMounted(async () => {
    loadFromGitHub();
    await nextTick();
    // 等数据渲染后再设置 observer
    setTimeout(() => {
        const scrollContainer = document.getElementById('scroll-area');
        if (!scrollContainer)
            return;
        observer = new IntersectionObserver((entries) => {
            // 找当前视口中最靠顶的可见 section
            let topEntry = null;
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (!topEntry || entry.boundingClientRect.top < topEntry.boundingClientRect.top) {
                        topEntry = entry;
                    }
                }
            }
            if (topEntry) {
                const name = topEntry.target.dataset.category;
                if (name)
                    activeCategory.value = name;
            }
        }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
        for (const el of Object.values(sectionRefs.value)) {
            observer.observe(el);
        }
    }, 300);
});
onUnmounted(() => {
    if (observer)
        observer.disconnect();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-h-screen bg-[var(--color-bg)] flex flex-col" },
});
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg)]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
const __VLS_0 = SiteHeader;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "flex-1 mx-auto w-full max-w-[1200px] px-6 py-10 flex gap-8" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[1200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
    ...{ class: "w-48 shrink-0 sticky top-24 self-start" },
});
/** @type {__VLS_StyleScopedClasses['w-48']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-24']} */ ;
/** @type {__VLS_StyleScopedClasses['self-start']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-xs font-semibold text-[var(--color-text-faint)] uppercase tracking-wider mb-4 pl-3" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-faint)]']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wider']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "flex flex-col gap-0.5" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
for (const [group] of __VLS_vFor((__VLS_ctx.groupedProjects))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.scrollToCategory(group.name);
                // @ts-ignore
                [groupedProjects, scrollToCategory,];
            } },
        key: (group.name),
        ...{ class: "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left" },
        ...{ class: (__VLS_ctx.activeCategory === group.name
                ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-medium'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-card-soft)]') },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "w-1.5 h-1.5 rounded-full" },
        ...{ class: (group.colors.dot) },
    });
    /** @type {__VLS_StyleScopedClasses['w-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    (group.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs text-[var(--color-text-faint)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-faint)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (group.projects.length);
    // @ts-ignore
    [activeCategory,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "flex-1 min-w-0" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
if (__VLS_ctx.dataLoading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-20" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-20']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-[var(--color-text-subtle)] text-sm font-[family-name:var(--font-mono)] animate-pulse" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
}
else if (__VLS_ctx.projects.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-20 text-[var(--color-text-muted)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-lg font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm mt-2 text-[var(--color-text-faint)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-faint)]']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: "scroll-area",
    });
    for (const [group] of __VLS_vFor((__VLS_ctx.groupedProjects))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            key: (group.name),
            ref: (__VLS_ctx.setSectionRef(group.name)),
            'data-category': (group.name),
            ...{ class: "mb-12" },
        });
        /** @type {__VLS_StyleScopedClasses['mb-12']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center gap-3 mb-6" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
            ...{ class: "text-lg font-bold text-[var(--color-text-bright)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-bright)]']} */ ;
        (group.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs text-[var(--color-text-faint)] font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-faint)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
        (group.projects.length);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid gap-4 sm:grid-cols-2" },
        });
        /** @type {__VLS_StyleScopedClasses['grid']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
        for (const [project] of __VLS_vFor((group.projects))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.dataLoading))
                            return;
                        if (!!(__VLS_ctx.projects.length === 0))
                            return;
                        __VLS_ctx.openProject(project.url);
                        // @ts-ignore
                        [groupedProjects, dataLoading, projects, setSectionRef, openProject,];
                    } },
                key: (project.id),
                ...{ class: "group p-5 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] glow-border flex flex-col cursor-pointer" },
            });
            /** @type {__VLS_StyleScopedClasses['group']} */ ;
            /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
            /** @type {__VLS_StyleScopedClasses['border']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['glow-border']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            if (project.coverUrl) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
                    src: (project.coverUrl),
                    alt: (project.title),
                    ...{ class: "w-full h-36 object-cover rounded-lg mb-4 border border-[var(--color-border)]" },
                });
                /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
                /** @type {__VLS_StyleScopedClasses['h-36']} */ ;
                /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
                /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
                /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
                /** @type {__VLS_StyleScopedClasses['border']} */ ;
                /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
                ...{ class: "text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors" },
            });
            /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:text-[var(--color-accent)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
            (project.title);
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-[var(--color-text-muted)] text-sm mt-2 leading-relaxed line-clamp-3 flex-1" },
            });
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
            /** @type {__VLS_StyleScopedClasses['line-clamp-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
            (project.description);
            if (project.tags && project.tags.length) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "flex flex-wrap gap-1.5 mt-3" },
                });
                /** @type {__VLS_StyleScopedClasses['flex']} */ ;
                /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
                /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
                /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
                for (const [tag] of __VLS_vFor((project.tags))) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                        key: (tag),
                        ...{ class: "px-2 py-0.5 text-xs rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-[family-name:var(--font-mono)]" },
                    });
                    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
                    /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
                    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
                    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
                    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent-dim)]']} */ ;
                    /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
                    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
                    (tag);
                    // @ts-ignore
                    [];
                }
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ onClick: () => { } },
                ...{ class: "flex items-center gap-4 mt-4 pt-3 border-t border-[var(--color-border)]" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
            /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
            if (project.sourceUrl) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
                    href: (project.sourceUrl),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    ...{ class: "flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors font-[family-name:var(--font-mono)]" },
                });
                /** @type {__VLS_StyleScopedClasses['flex']} */ ;
                /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
                /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
                /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
                /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
                /** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-text)]']} */ ;
                /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
                /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                    ...{ class: "w-3.5 h-3.5" },
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                });
                /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
                /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                    'stroke-linecap': "round",
                    'stroke-linejoin': "round",
                    'stroke-width': "2",
                    d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                });
            }
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
    }
}
const __VLS_5 = SiteFooter;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
