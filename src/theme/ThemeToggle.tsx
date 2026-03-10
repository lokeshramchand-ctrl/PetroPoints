import { useTheme } from './theme'

type ThemeToggleProps = {
  variant?: 'floating' | 'inline'
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3c0 .2-.01.39-.01.59A9 9 0 0 0 21 12.79z" />
    </svg>
  )
}

export function ThemeToggle({ variant = 'floating' }: ThemeToggleProps) {
  const { mode, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className={`theme-toggle ${variant === 'inline' ? 'theme-toggle-inline' : ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="theme-toggle-icon">{mode === 'light' ? <MoonIcon /> : <SunIcon />}</span>
      <span className="theme-toggle-label">{mode === 'light' ? 'Dark' : 'Light'} Mode</span>
    </button>
  )
}
