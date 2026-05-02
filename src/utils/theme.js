import { computed, ref } from 'vue';
const THEME_STORAGE_KEY = 'site-theme';
const themeOrder = ['orange', 'dark', 'light'];
const themeLabels = { dark: '深色', light: '浅色', orange: '橙色' };
const theme = ref(readStoredTheme());
function isTheme(value) {
    return value === 'dark' || value === 'light' || value === 'orange';
}
function readStoredTheme() {
    if (typeof window === 'undefined') {
        return 'orange';
    }
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : 'orange';
}
function applyTheme(themeValue) {
    if (typeof document === 'undefined') {
        return;
    }
    document.documentElement.dataset.theme = themeValue;
}
export function initTheme() {
    theme.value = readStoredTheme();
    applyTheme(theme.value);
}
export function useTheme() {
    const isLightTheme = computed(() => theme.value === 'light');
    const currentThemeLabel = computed(() => themeLabels[theme.value]);
    const nextThemeLabel = computed(() => {
        const idx = themeOrder.indexOf(theme.value);
        const next = themeOrder[(idx + 1) % themeOrder.length];
        return themeLabels[next];
    });
    function setTheme(themeValue) {
        theme.value = themeValue;
        window.localStorage.setItem(THEME_STORAGE_KEY, themeValue);
        applyTheme(themeValue);
    }
    function toggleTheme() {
        const idx = themeOrder.indexOf(theme.value);
        const next = themeOrder[(idx + 1) % themeOrder.length];
        setTheme(next);
    }
    return {
        theme,
        isLightTheme,
        currentThemeLabel,
        nextThemeLabel,
        setTheme,
        toggleTheme,
    };
}
