import type { ReactNode } from 'react'
import { Container } from './Container'

/** Nhịp nền phẳng xen kẽ (mục 6.5) – Flat Design, không gradient. */
const tones = {
  white: 'bg-surface',
  blue: 'bg-primary-light',
  teal: 'bg-accent-light',
  canvas: 'bg-canvas',
} as const

export type SectionTone = keyof typeof tones

interface SectionProps {
  id?: string
  tone?: SectionTone
  labelledBy?: string
  className?: string
  children: ReactNode
}

/** Padding dọc theo bội số 8px (Swiss): 56px mobile · 80px tablet · 104px desktop. */
export function Section({ id, tone = 'white', labelledBy, className = '', children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-14 md:py-20 lg:py-26 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
