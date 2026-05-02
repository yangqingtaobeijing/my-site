/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SiteHeader from '../components/SiteHeader.vue';
import SiteFooter from '../components/SiteFooter.vue';
import { getArticleById, loadFromGitHub, dataLoading } from '../store';
import { renderMarkdown } from '../utils/markdown';
import { formatDate } from '../utils/date';
const route = useRoute();
const router = useRouter();
onMounted(() => {
    loadFromGitHub();
});
const article = computed(() => {
    const id = route.params.id;
    return getArticleById(id);
});
const renderedContent = computed(() => {
    if (article.value?.type === 'local' && article.value.content) {
        return renderMarkdown(article.value.content);
    }
    return '';
});
/** 返回首页 */
function goBack() {
    router.push('/');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-h-screen bg-[var(--color-bg)]" },
});
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg)]']} */ ;
const __VLS_0 = SiteHeader;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "mx-auto max-w-[800px] px-6 py-10" },
});
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[800px]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
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
else if (!__VLS_ctx.article) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-20" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-20']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-[var(--color-text-muted)] text-lg font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.goBack) },
        ...{ class: "mt-4 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent-hover)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.goBack) },
        ...{ class: "text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] text-sm mb-8 inline-flex items-center gap-1 transition-colors font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "mb-10" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-3xl font-bold text-[var(--color-text-bright)] leading-tight font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-bright)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.article.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-3 mt-4 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.time, __VLS_intrinsics.time)({
        ...{ class: "text-[var(--color-text-subtle)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.formatDate(__VLS_ctx.article.createdAt));
    if (__VLS_ctx.article.type === 'external') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "bg-[var(--color-accent-dim)] text-[var(--color-accent)] px-2 py-0.5 rounded text-xs font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent-dim)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-4 text-[var(--color-text-secondary)] leading-relaxed" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    (__VLS_ctx.article.summary);
    if (__VLS_ctx.article.type === 'local' && __VLS_ctx.renderedContent) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "markdown-body" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.renderedContent) }, null, null);
        /** @type {__VLS_StyleScopedClasses['markdown-body']} */ ;
    }
    if (__VLS_ctx.article.type === 'external' && __VLS_ctx.article.externalUrl) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mt-8 p-8 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] text-center" },
        });
        /** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-[var(--color-text-muted)] mb-5 font-[family-name:var(--font-mono)] text-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
            href: (__VLS_ctx.article.externalUrl),
            target: "_blank",
            rel: "noopener noreferrer",
            ...{ class: "inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-accent-contrast)] px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold" },
        });
        /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent-contrast)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:opacity-90']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-4 h-4" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "2",
            d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14",
        });
    }
}
const __VLS_5 = SiteFooter;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
// @ts-ignore
[dataLoading, article, article, article, article, article, article, article, article, article, goBack, goBack, formatDate, renderedContent, renderedContent,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
