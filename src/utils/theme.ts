import { computed, ref } from 'vue'

export type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'site-theme'
const theme = ref<Theme>(readStoredTheme())

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light'
}

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  return isTheme(stored) ? stored : 'dark'
}

function applyTheme(themeValue: Theme) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.dataset.theme = themeValue
}

export function initTheme() {
  theme.value = readStoredTheme()
  applyTheme(theme.value)
}

export function useTheme() {
  const isLightTheme = computed(() => theme.value === 'light')
  const nextThemeLabel = computed(() => (theme.value === 'dark' ? '浅色' : '深色'))

  function setTheme(themeValue: Theme) {
    theme.value = themeValue
    window.localStorage.setItem(THEME_STORAGE_KEY, themeValue)
    applyTheme(themeValue)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    isLightTheme,
    nextThemeLabel,
    setTheme,
    toggleTheme,
  }
}
