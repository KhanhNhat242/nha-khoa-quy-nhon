'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { HERO_ID } from '@/data/site'

/** Hero còn chiếm ít nhất chừng này px dưới mép trên viewport thì vẫn tính là "đang ở hero". */
const HERO_EXIT_OFFSET = 160

/**
 * Header dính – Glassmorphism điểm xuyết: kính mờ sáng, thêm viền + bóng khi đã cuộn.
 * Ghi trạng thái lên `data-*` để phần con đổi kiểu bằng biến thể `group-data-*` của Tailwind:
 * - `data-hero="true"`: đang trong phạm vi hero → header trong suốt (hoà vào nền hero, mảng ngọc chạm mép trên), menu dồn trái dạng viên thuốc.
 * - `data-ready="true"`: đã đo xong lần đầu → mới bật transition (tránh menu "trượt" khi vừa tải trang).
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const [inHero, setInHero] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      setScrolled(window.scrollY > 48)
      const hero = document.getElementById(HERO_ID)
      setInHero(hero ? hero.getBoundingClientRect().bottom > HERO_EXIT_OFFSET : false)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    // Bật transition sau khung hình đầu tiên, khi vị trí menu đã đúng
    const readyFrame = requestAnimationFrame(() => setReady(true))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(readyFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header
      data-hero={inHero}
      data-ready={ready}
      className={`group/header sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ${
        inHero
          ? // Trong hero: trong suốt để nền hero (kéo lên nằm dưới header) hiện xuyên qua;
            // khi đã cuộn trong hero thì thêm kính mờ trắng 55% để chữ/ảnh chạy bên dưới không làm khó đọc menu, hotline.
            `border-transparent ${scrolled ? 'bg-surface/55 backdrop-blur-xl backdrop-saturate-150' : 'bg-transparent'}`
          : scrolled
            ? 'border-line bg-surface/80 shadow-[0_8px_24px_-16px_rgb(15_23_42/0.25)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-line/60 bg-surface/95 backdrop-blur-xl backdrop-saturate-150'
      }`}
    >
      {children}
    </header>
  )
}
