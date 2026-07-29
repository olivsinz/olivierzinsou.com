const COLORS = {
  Architecture: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
  Tooling: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  CSS: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400',
}

const DEFAULT_COLOR = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'

export function categoryColor(category) {
  return COLORS[category] ?? DEFAULT_COLOR
}
