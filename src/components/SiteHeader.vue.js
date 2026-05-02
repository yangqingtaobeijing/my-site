/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
import { store } from '../store';
import { useTheme } from '../utils/theme';
const config = computed(() => store.config);
const { nextThemeLabel, toggleTheme } = useTheme();
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "border-b border-[var(--color-border)] bg-[var(--color-header-bg)] backdrop-blur-md sticky top-0 z-50" },
});
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--color-header-bg)]']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mx-auto max-w-[800px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[800px]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "flex items-center gap-2 sm:gap-3 group shrink-0" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "flex items-center gap-2 sm:gap-3 group shrink-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.config.avatarUrl) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.config.avatarUrl),
        alt: (__VLS_ctx.config.title),
        ...{ class: "w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-all" },
    });
    /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:w-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['group-hover:border-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] text-xs font-bold font-[family-name:var(--font-mono)]" },
    });
    /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:w-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:h-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[var(--color-accent)]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
    (__VLS_ctx.config.title.charAt(0));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hidden sm:inline text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-mono)]" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text)]']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:text-[var(--color-accent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
(__VLS_ctx.config.title);
// @ts-ignore
[config, config, config, config, config,];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-[family-name:var(--font-mono)]" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-[family-name:var(--font-mono)]']} */ ;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    to: "/",
    ...{ class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors link-underline whitespace-nowrap" },
    activeClass: "!text-[var(--color-accent)]",
    exact: true,
}));
const __VLS_8 = __VLS_7({
    to: "/",
    ...{ class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors link-underline whitespace-nowrap" },
    activeClass: "!text-[var(--color-accent)]",
    exact: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['link-underline']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hidden sm:inline text-[var(--color-accent-muted)] mr-1" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-accent-muted)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
// @ts-ignore
[];
var __VLS_9;
let __VLS_12;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    to: "/bookmarks",
    ...{ class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors link-underline whitespace-nowrap" },
    activeClass: "!text-[var(--color-accent)]",
}));
const __VLS_14 = __VLS_13({
    to: "/bookmarks",
    ...{ class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors link-underline whitespace-nowrap" },
    activeClass: "!text-[var(--color-accent)]",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['link-underline']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hidden sm:inline text-[var(--color-accent-muted)] mr-1" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-accent-muted)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
// @ts-ignore
[];
var __VLS_15;
let __VLS_18;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    to: "/projects",
    ...{ class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors link-underline whitespace-nowrap" },
    activeClass: "!text-[var(--color-accent)]",
}));
const __VLS_20 = __VLS_19({
    to: "/projects",
    ...{ class: "text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors link-underline whitespace-nowrap" },
    activeClass: "!text-[var(--color-accent)]",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['link-underline']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
const { default: __VLS_23 } = __VLS_21.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hidden sm:inline text-[var(--color-accent-muted)] mr-1" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-accent-muted)]']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
// @ts-ignore
[];
var __VLS_21;
let __VLS_24;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    to: "/admin",
    ...{ class: "text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors text-xs" },
    title: "管理后台",
}));
const __VLS_26 = __VLS_25({
    to: "/admin",
    ...{ class: "text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors text-xs" },
    title: "管理后台",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-faint)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-text-muted)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
const { default: __VLS_29 } = __VLS_27.slots;
// @ts-ignore
[];
var __VLS_27;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggleTheme) },
    type: "button",
    ...{ class: "h-8 min-w-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-soft)] px-2 text-xs text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors" },
    'aria-label': (`切换到${__VLS_ctx.nextThemeLabel}主题`),
    title: (`切换到${__VLS_ctx.nextThemeLabel}主题`),
});
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[var(--color-border)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--color-bg-card-soft)]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[var(--color-text-muted)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-[var(--color-accent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[var(--color-accent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
(__VLS_ctx.nextThemeLabel);
// @ts-ignore
[toggleTheme, nextThemeLabel, nextThemeLabel, nextThemeLabel,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
