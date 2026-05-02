/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, ref } from 'vue';
import { getProjects, deleteProject, toggleProjectHidden } from '../../store';
import { extractDomain } from '../../utils/url';
const projects = computed(() => getProjects());
/** 删除确认 */
const deletingId = ref(null);
/** 同步状态提示 */
const syncMsg = ref('');
const syncOk = ref(true);
function confirmDelete(id) {
    deletingId.value = id;
}
function cancelDelete() {
    deletingId.value = null;
}
async function doDelete(id) {
    deletingId.value = null;
    const ok = await deleteProject(id);
    syncOk.value = ok;
    syncMsg.value = ok ? '✓ 已同步到 GitHub' : '⚠ GitHub 同步失败，已删除本地';
    setTimeout(() => { syncMsg.value = ''; }, 3000);
}
async function toggleHidden(id) {
    const ok = await toggleProjectHidden(id);
    syncOk.value = ok;
    syncMsg.value = ok ? '✓ 已同步到 GitHub' : '⚠ GitHub 同步失败，已更新本地';
    setTimeout(() => { syncMsg.value = ''; }, 3000);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
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
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: ({ name: 'AdminProjectNew' }),
    ...{ class: "btn-primary text-sm" },
}));
const __VLS_2 = __VLS_1({
    to: ({ name: 'AdminProjectNew' }),
    ...{ class: "btn-primary text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
var __VLS_3;
if (__VLS_ctx.syncMsg) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: ([
                'text-sm mb-4 font-[family-name:var(--font-mono)]',
                __VLS_ctx.syncOk ? 'text-[var(--color-accent)]' : 'text-amber-400',
            ]) },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.syncMsg);
}
if (__VLS_ctx.projects.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-16 text-[var(--color-text-muted)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-16']} */ ;
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
        ...{ class: "bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] overflow-hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.table, __VLS_intrinsics.table)({
        ...{ class: "w-full text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({
        ...{ class: "bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]" },
    });
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-elevated)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
        ...{ class: "text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
        ...{ class: "text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-40" },
    });
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-40']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
        ...{ class: "text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-40" },
    });
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-40']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
        ...{ class: "text-left px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-16" },
    });
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-16']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
        ...{ class: "text-right px-5 py-3 font-medium text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] w-36" },
    });
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-36']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({
        ...{ class: "divide-y divide-[var(--color-border)]" },
    });
    /** @type {__VLS_StyleScopedClasses['divide-y']} */ ;
    /** @type {__VLS_StyleScopedClasses['divide-[var(--color-border)]']} */ ;
    for (const [project] of __VLS_vFor((__VLS_ctx.projects))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (project.id),
            ...{ class: (['hover:bg-[var(--color-bg-elevated-soft)]', project.hidden ? 'opacity-50' : '']) },
        });
        /** @type {__VLS_StyleScopedClasses['hover:bg-[var(--color-bg-elevated-soft)]']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
            ...{ class: "px-5 py-3.5 text-[var(--color-text)]" },
        });
        /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
        (project.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
            ...{ class: "px-5 py-3.5 text-[var(--color-text-muted)] text-xs font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
        (__VLS_ctx.extractDomain(project.url));
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
            ...{ class: "px-5 py-3.5" },
        });
        /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex flex-wrap gap-1" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        for (const [tag] of __VLS_vFor(((project.tags || [])))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                key: (tag),
                ...{ class: "px-1.5 py-0.5 text-xs rounded bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent-dim)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (tag);
            // @ts-ignore
            [syncMsg, syncMsg, syncOk, projects, projects, extractDomain,];
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
            ...{ class: "px-5 py-3.5" },
        });
        /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: (['text-xs px-2 py-0.5 rounded font-[family-name:var(--font-mono)]', project.hidden ? 'bg-gray-500/20 text-gray-400' : 'bg-emerald-500/10 text-emerald-400']) },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
        (project.hidden ? '隐藏' : '显示');
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
            ...{ class: "px-5 py-3.5 text-right" },
        });
        /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        if (__VLS_ctx.deletingId === project.id) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center justify-end gap-2" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.projects.length === 0))
                            return;
                        if (!(__VLS_ctx.deletingId === project.id))
                            return;
                        __VLS_ctx.doDelete(project.id);
                        // @ts-ignore
                        [deletingId, doDelete,];
                    } },
                ...{ class: "text-red-400 hover:text-red-300 text-xs font-medium font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-red-300']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (__VLS_ctx.cancelDelete) },
                ...{ class: "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] text-xs font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-text-secondary)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center justify-end gap-3" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.projects.length === 0))
                            return;
                        if (!!(__VLS_ctx.deletingId === project.id))
                            return;
                        __VLS_ctx.toggleHidden(project.id);
                        // @ts-ignore
                        [cancelDelete, toggleHidden,];
                    } },
                ...{ class: "text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-xs font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-text)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            (project.hidden ? '显示' : '隐藏');
            let __VLS_6;
            /** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
            routerLink;
            // @ts-ignore
            const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
                to: ({ name: 'AdminProjectEdit', params: { id: project.id } }),
                ...{ class: "text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-xs font-medium font-[family-name:var(--font-mono)]" },
            }));
            const __VLS_8 = __VLS_7({
                to: ({ name: 'AdminProjectEdit', params: { id: project.id } }),
                ...{ class: "text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-xs font-medium font-[family-name:var(--font-mono)]" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_7));
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent-hover)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
            const { default: __VLS_11 } = __VLS_9.slots;
            // @ts-ignore
            [];
            var __VLS_9;
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.projects.length === 0))
                            return;
                        if (!!(__VLS_ctx.deletingId === project.id))
                            return;
                        __VLS_ctx.confirmDelete(project.id);
                        // @ts-ignore
                        [confirmDelete,];
                    } },
                ...{ class: "text-[var(--color-text-subtle)] hover:text-red-400 text-xs font-[family-name:var(--font-mono)]" },
            });
            /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
            /** @type {__VLS_StyleScopedClasses['hover:text-red-400']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
        }
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
