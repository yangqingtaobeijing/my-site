/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getArticleById, addArticle, updateArticle } from '../../store';
import { generateId } from '../../utils/id';
import { renderMarkdown } from '../../utils/markdown';
const route = useRoute();
const router = useRouter();
/** 是否是编辑模式 */
const isEdit = computed(() => !!route.params.id);
/** 文章类型 */
const articleType = ref('local');
/** 表单字段 */
const title = ref('');
const summary = ref('');
const content = ref('');
const externalUrl = ref('');
/** 预览模式 */
const showPreview = ref(false);
const previewHtml = computed(() => renderMarkdown(content.value));
/** 保存状态 */
const saving = ref(false);
const syncStatus = ref('');
/** 加载已有文章数据 */
onMounted(() => {
    if (isEdit.value) {
        const article = getArticleById(route.params.id);
        if (article) {
            articleType.value = article.type;
            title.value = article.title;
            summary.value = article.summary;
            content.value = article.content || '';
            externalUrl.value = article.externalUrl || '';
        }
    }
});
/** 保存文章 */
async function handleSave() {
    if (!title.value.trim()) {
        alert('请输入标题');
        return;
    }
    if (!summary.value.trim()) {
        alert('请输入摘要');
        return;
    }
    if (articleType.value === 'local' && !content.value.trim()) {
        alert('请输入文章内容');
        return;
    }
    if (articleType.value === 'external' && !externalUrl.value.trim()) {
        alert('请输入外链 URL');
        return;
    }
    saving.value = true;
    syncStatus.value = '';
    const now = new Date().toISOString();
    const article = {
        id: isEdit.value ? route.params.id : generateId(),
        type: articleType.value,
        title: title.value.trim(),
        summary: summary.value.trim(),
        content: articleType.value === 'local' ? content.value : undefined,
        externalUrl: articleType.value === 'external' ? externalUrl.value.trim() : undefined,
        createdAt: isEdit.value
            ? (getArticleById(route.params.id)?.createdAt || now)
            : now,
        updatedAt: now,
    };
    let ghOk;
    if (isEdit.value) {
        ghOk = await updateArticle(article);
    }
    else {
        ghOk = await addArticle(article);
    }
    saving.value = false;
    syncStatus.value = ghOk ? 'success' : 'fail';
    // 短暂显示同步状态后跳转
    setTimeout(() => {
        router.push({ name: 'AdminArticles' });
    }, ghOk ? 800 : 2000);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-3xl" },
});
/** @type {__VLS_StyleScopedClasses['max-w-3xl']} */ ;
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
(__VLS_ctx.isEdit ? '编辑文章' : '新建文章');
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: ({ name: 'AdminArticles' }),
    ...{ class: "text-sm text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-mono)]" },
}));
const __VLS_2 = __VLS_1({
    to: ({ name: 'AdminArticles' }),
    ...{ class: "text-sm text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-mono)]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-subtle)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[isEdit,];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.handleSave) },
    ...{ class: "space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-sm text-[var(--color-text-secondary)] mb-2 font-[family-name:var(--font-mono)]" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.articleType = 'local';
            // @ts-ignore
            [handleSave, articleType,];
        } },
    type: "button",
    ...{ class: ([
            'px-4 py-2 rounded-lg text-sm border transition-colors font-[family-name:var(--font-mono)]',
            __VLS_ctx.articleType === 'local'
                ? 'bg-[var(--color-accent-dim)] border-[var(--color-accent-border)] text-[var(--color-accent)]'
                : 'bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)]',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.articleType = 'external';
            // @ts-ignore
            [articleType, articleType,];
        } },
    type: "button",
    ...{ class: ([
            'px-4 py-2 rounded-lg text-sm border transition-colors font-[family-name:var(--font-mono)]',
            __VLS_ctx.articleType === 'external'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)]',
        ]) },
});
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    value: (__VLS_ctx.title),
    type: "text",
    placeholder: "文章标题",
    ...{ class: "admin-input" },
});
/** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
    value: (__VLS_ctx.summary),
    placeholder: "简短描述文章内容",
    rows: "2",
    ...{ class: "admin-input resize-none" },
});
/** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
/** @type {__VLS_StyleScopedClasses['resize-none']} */ ;
if (__VLS_ctx.articleType === 'local') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between mb-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "text-sm text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.articleType === 'local'))
                    return;
                __VLS_ctx.showPreview = !__VLS_ctx.showPreview;
                // @ts-ignore
                [articleType, articleType, title, summary, showPreview, showPreview,];
            } },
        type: "button",
        ...{ class: "text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent-hover)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.showPreview ? '&lt; 编辑' : '预览 &gt;');
    if (__VLS_ctx.showPreview) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "markdown-body p-5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg min-h-[300px]" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.previewHtml) }, null, null);
        /** @type {__VLS_StyleScopedClasses['markdown-body']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['min-h-[300px]']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.textarea)({
            value: (__VLS_ctx.content),
            placeholder: "在这里写 Markdown 内容...",
            rows: "16",
            ...{ class: "admin-input font-[family-name:var(--font-mono)] resize-y" },
        });
        /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['resize-y']} */ ;
    }
}
if (__VLS_ctx.articleType === 'external') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "block text-sm text-[var(--color-text-secondary)] mb-1.5 font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-text-secondary)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "url",
        placeholder: "https://mp.weixin.qq.com/s/...",
        ...{ class: "admin-input" },
    });
    (__VLS_ctx.externalUrl);
    /** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3 pt-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "submit",
    ...{ class: "btn-primary" },
    disabled: (__VLS_ctx.saving),
});
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
(__VLS_ctx.saving ? '保存中...' : __VLS_ctx.isEdit ? '保存修改' : '发布文章');
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    to: ({ name: 'AdminArticles' }),
    ...{ class: "btn-secondary" },
}));
const __VLS_8 = __VLS_7({
    to: ({ name: 'AdminArticles' }),
    ...{ class: "btn-secondary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
// @ts-ignore
[isEdit, articleType, showPreview, showPreview, previewHtml, content, externalUrl, saving, saving,];
var __VLS_9;
if (__VLS_ctx.syncStatus === 'success') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[var(--color-accent)] text-sm font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
}
if (__VLS_ctx.syncStatus === 'fail') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-amber-400 text-sm font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['text-amber-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
}
// @ts-ignore
[syncStatus, syncStatus,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
