import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const THEME_STORAGE_KEY = 'petropoints.theme'

type ThemeMode = 'light' | 'dark'

type ThemeContextValue = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function resolveInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedMode === 'light' || savedMode === 'dark') {
    document.documentElement.setAttribute('data-theme', savedMode)
    document.documentElement.style.colorScheme = savedMode
    return savedMode
  }

  const initialMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', initialMode)
  document.documentElement.style.colorScheme = initialMode
  return initialMode
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => resolveInitialTheme())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    document.documentElement.style.colorScheme = mode
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  }, [mode])

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode,
      toggleTheme: () => setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}
