/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getBookmarkById, addBookmark, updateBookmark } from '../../store';
import { generateId } from '../../utils/id';
const route = useRoute();
const router = useRouter();
/** 是否是编辑模式 */
const isEdit = computed(() => !!route.params.id);
/** 表单字段 */
const title = ref('');
const description = ref('');
const url = ref('');
/** 保存状态 */
const saving = ref(false);
const syncStatus = ref('');
/** 加载已有数据 */
onMounted(() => {
    if (isEdit.value) {
        const bookmark = getBookmarkById(route.params.id);
        if (bookmark) {
            title.value = bookmark.title;
            description.value = bookmark.description;
            url.value = bookmark.url;
        }
    }
});
/** 保存 */
async function handleSave() {
    if (!title.value.trim()) {
        alert('请输入标题');
        return;
    }
    if (!url.value.trim()) {
        alert('请输入链接地址');
        return;
    }
    saving.value = true;
    syncStatus.value = '';
    const now = new Date().toISOString();
    const bookmark = {
        id: isEdit.value ? route.params.id : generateId(),
        title: title.value.trim(),
        description: description.value.trim(),
        url: url.value.trim(),
        createdAt: isEdit.value
            ? (getBookmarkById(route.params.id)?.createdAt || now)
            : now,
    };
    let ghOk;
    if (isEdit.value) {
        ghOk = await updateBookmark(bookmark);
    }
    else {
        ghOk = await addBookmark(bookmark);
    }
    saving.value = false;
    syncStatus.value = ghOk ? 'success' : 'fail';
    // 短暂显示同步状态后跳转
    setTimeout(() => {
        router.push({ name: 'AdminBookmarks' });
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
    ...{ class: "max-w-xl" },
});
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
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
(__VLS_ctx.isEdit ? '编辑收藏' : '新建收藏');
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: ({ name: 'AdminBookmarks' }),
    ...{ class: "text-sm text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-mono)]" },
}));
const __VLS_2 = __VLS_1({
    to: ({ name: 'AdminBookmarks' }),
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
    placeholder: "收藏名称",
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
    value: (__VLS_ctx.description),
    placeholder: "简短描述",
    rows: "3",
    ...{ class: "admin-input resize-none" },
});
/** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
/** @type {__VLS_StyleScopedClasses['resize-none']} */ ;
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
    placeholder: "https://example.com",
    ...{ class: "admin-input" },
});
(__VLS_ctx.url);
/** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
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
(__VLS_ctx.saving ? '保存中...' : __VLS_ctx.isEdit ? '保存修改' : '添加收藏');
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    to: ({ name: 'AdminBookmarks' }),
    ...{ class: "btn-secondary" },
}));
const __VLS_8 = __VLS_7({
    to: ({ name: 'AdminBookmarks' }),
    ...{ class: "btn-secondary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
// @ts-ignore
[isEdit, handleSave, title, description, url, saving, saving,];
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
