import type { CSSProperties } from 'react'

/** Độ trễ cho hệ `data-reveal` – xuất hiện tuần tự. */
export function revealDelay(ms: number): CSSProperties {
  return { '--reveal-delay': `${ms}ms` } as CSSProperties
}
