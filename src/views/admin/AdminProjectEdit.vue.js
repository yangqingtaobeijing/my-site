/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProjectById, addProject, updateProject } from '../../store';
import { generateId } from '../../utils/id';
const route = useRoute();
const router = useRouter();
/** 是否是编辑模式 */
const isEdit = computed(() => !!route.params.id);
/** 表单字段 */
const title = ref('');
const description = ref('');
const url = ref('');
const sourceUrl = ref('');
const coverUrl = ref('');
const tagInput = ref('');
const tags = ref([]);
/** 保存状态 */
const saving = ref(false);
const syncStatus = ref('');
/** 加载已有数据 */
onMounted(() => {
    if (isEdit.value) {
        const project = getProjectById(route.params.id);
        if (project) {
            title.value = project.title;
            description.value = project.description;
            url.value = project.url;
            sourceUrl.value = project.sourceUrl || '';
            coverUrl.value = project.coverUrl || '';
            tags.value = project.tags ? [...project.tags] : [];
        }
    }
});
/** 添加标签 */
function addTag() {
    const val = tagInput.value.trim();
    if (val && !tags.value.includes(val)) {
        tags.value.push(val);
    }
    tagInput.value = '';
}
/** 删除标签 */
function removeTag(index) {
    tags.value.splice(index, 1);
}
/** 保存 */
async function handleSave() {
    if (!title.value.trim()) {
        alert('请输入项目名称');
        return;
    }
    if (!url.value.trim()) {
        alert('请输入项目链接');
        return;
    }
    saving.value = true;
    syncStatus.value = '';
    const now = new Date().toISOString();
    const project = {
        id: isEdit.value ? route.params.id : generateId(),
        title: title.value.trim(),
        description: description.value.trim(),
        url: url.value.trim(),
        sourceUrl: sourceUrl.value.trim() || undefined,
        coverUrl: coverUrl.value.trim() || undefined,
        tags: tags.value.length > 0 ? [...tags.value] : undefined,
        createdAt: isEdit.value
            ? (getProjectById(route.params.id)?.createdAt || now)
            : now,
    };
    let ghOk;
    if (isEdit.value) {
        ghOk = await updateProject(project);
    }
    else {
        ghOk = await addProject(project);
    }
    saving.value = false;
    syncStatus.value = ghOk ? 'success' : 'fail';
    // 短暂显示同步状态后跳转
    setTimeout(() => {
        router.push({ name: 'AdminProjects' });
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
(__VLS_ctx.isEdit ? '编辑项目' : '新建项目');
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: ({ name: 'AdminProjects' }),
    ...{ class: "text-sm text-[var(--color-text-subtle)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-mono)]" },
}));
const __VLS_2 = __VLS_1({
    to: ({ name: 'AdminProjects' }),
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
    placeholder: "我的项目",
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
    placeholder: "简短描述这个项目",
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
    placeholder: "https://example.github.io/project",
    ...{ class: "admin-input" },
});
(__VLS_ctx.url);
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
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    type: "url",
    placeholder: "https://github.com/user/repo",
    ...{ class: "admin-input" },
});
(__VLS_ctx.sourceUrl);
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
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    type: "url",
    placeholder: "https://example.com/cover.png",
    ...{ class: "admin-input" },
});
(__VLS_ctx.coverUrl);
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onKeydown: (__VLS_ctx.addTag) },
    value: (__VLS_ctx.tagInput),
    type: "text",
    placeholder: "输入标签后按回车",
    ...{ class: "admin-input flex-1" },
});
/** @type {__VLS_StyleScopedClasses['admin-input']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.addTag) },
    type: "button",
    ...{ class: "btn-secondary text-sm shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
if (__VLS_ctx.tags.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-wrap gap-1.5 mt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    for (const [tag, index] of __VLS_vFor((__VLS_ctx.tags))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            key: (tag),
            ...{ class: "inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-[family-name:var(--font-mono)]" },
        });
        /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-[var(--color-accent-dim)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
        (tag);
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.tags.length))
                        return;
                    __VLS_ctx.removeTag(index);
                    // @ts-ignore
                    [handleSave, title, description, url, sourceUrl, coverUrl, addTag, addTag, tagInput, tags, tags, removeTag,];
                } },
            type: "button",
            ...{ class: "hover:text-red-400 transition-colors" },
        });
        /** @type {__VLS_StyleScopedClasses['hover:text-red-400']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        // @ts-ignore
        [];
    }
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
(__VLS_ctx.saving ? '保存中...' : __VLS_ctx.isEdit ? '保存修改' : '添加项目');
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    to: ({ name: 'AdminProjects' }),
    ...{ class: "btn-secondary" },
}));
const __VLS_8 = __VLS_7({
    to: ({ name: 'AdminProjects' }),
    ...{ class: "btn-secondary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
// @ts-ignore
[isEdit, saving, saving,];
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
