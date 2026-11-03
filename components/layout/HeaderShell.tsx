'use client'

import { useEffect, useState, type ReactNode } from 'react'

/** Header dính – Glassmorphism điểm xuyết: kính mờ sáng, thêm viền + bóng khi đã cuộn. */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'border-line bg-surface/80 shadow-[0_8px_24px_-16px_rgb(15_23_42/0.25)]'
          : 'border-line/60 bg-surface/95'
      }`}
    >
      {children}
    </header>
  )
}
