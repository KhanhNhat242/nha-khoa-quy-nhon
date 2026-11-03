import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** split: tiêu đề 7 cột trái + mô tả 5 cột phải (Swiss); left: xếp dọc căn trái; center: căn giữa */
  layout?: 'split' | 'left' | 'center'
  className?: string
}

/** Nhãn phụ kiểu Swiss: vạch nhấn + chữ in hoa nhỏ. */
export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.16em] uppercase ${
        tone === 'light' ? 'text-white/90' : 'text-accent-dark'
      }`}
    >
      <span className="h-0.5 w-8 bg-accent" aria-hidden="true" />
      {children}
    </span>
  )
}

const titleClass =
  'mt-4 text-[1.875rem] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-primary-dark sm:text-[2.5rem] lg:text-[2.875rem]'

/** Cụm tiêu đề section: nhãn phụ · H2 · mô tả (mục 6.4), lưới 12 cột kiểu Swiss. */
export function SectionHeading({ id, eyebrow, title, description, layout = 'split', className = '' }: SectionHeadingProps) {
  if (layout === 'split') {
    return (
      <div className={`mb-8 grid gap-4 lg:mb-14 lg:grid-cols-12 lg:items-end lg:gap-8 ${className}`}>
        <div className="lg:col-span-7">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={id} className={titleClass}>
            {title}
          </h2>
        </div>
        {description ? (
          <p className="max-w-xl text-base text-pretty text-muted sm:text-lg lg:col-span-5 lg:pb-1">{description}</p>
        ) : null}
      </div>
    )
  }

  const centered = layout === 'center'
  return (
    <div className={`mb-8 lg:mb-12 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className={titleClass}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 max-w-2xl text-base text-pretty text-muted sm:text-lg ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
