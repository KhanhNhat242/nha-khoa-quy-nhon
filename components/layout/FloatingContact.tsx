'use client'

import { useEffect, useState } from 'react'
import { CalendarIcon, FacebookIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'
import { BOOKING_ANCHOR, site } from '@/data/site'

/**
 * Cụm liên hệ nổi (R-F1, R-F4).
 * - Mobile: thanh ngang mảnh dưới đáy màn hình.
 * - Từ tablet: cụm nút tròn góc dưới phải.
 * Cụm nút tròn hiện sau khi cuộn qua hero. Tự ẩn khi khu vực form đặt lịch hiện trên màn hình để không che nút Gửi.
 */
export function FloatingContact() {
  const [hidden, setHidden] = useState(false)
  // Desktop: hero đã có nút gọi/đặt lịch nên chỉ hiện cụm nút tròn khi cuộn qua màn hình đầu
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const target = document.getElementById(BOOKING_ANCHOR)
    if (!target || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: '0px 0px -15% 0px',
    })
    io.observe(target)
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* Mobile: thanh đáy */}
      <div
        className={`glass fixed inset-x-0 bottom-0 z-30 rounded-none border-x-0 border-b-0 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden ${
          hidden ? 'translate-y-full' : 'translate-y-0'
        }`}
        inert={hidden}
      >
        <div className="grid grid-cols-3 gap-2">
          <a
            href={site.phone.tel}
            className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-primary-light text-sm font-semibold text-primary"
          >
            <PhoneIcon className="size-5" />
            Gọi ngay
          </a>
          <a
            href={site.zalo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-zalo text-sm font-semibold text-white"
          >
            <ZaloIcon className="size-6" />
            Zalo
          </a>
          <a
            href={`#${BOOKING_ANCHOR}`}
            className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-primary text-sm font-semibold text-white"
          >
            <CalendarIcon className="size-5" />
            Đặt lịch
          </a>
        </div>
      </div>

      {/* Tablet / desktop: cụm nút tròn */}
      <div
        className={`glass fixed right-5 bottom-6 z-30 hidden flex-col items-center gap-2 rounded-2xl p-2 transition duration-300 md:flex ${
          hidden || !pastHero ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
        }`}
        inert={hidden || !pastHero}
      >
        <a
          href={site.facebook.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook Nha Khoa Quy Nhơn"
          className="grid size-12 place-items-center rounded-xl bg-primary-light text-primary transition hover:bg-line"
        >
          <FacebookIcon className="size-6" />
        </a>
        <a
          href={site.zalo.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Nhắn Zalo ${site.phone.display}`}
          className="grid size-12 place-items-center rounded-xl bg-zalo text-white transition hover:opacity-90"
        >
          <ZaloIcon className="size-7" />
        </a>
        <a
          href={site.phone.tel}
          aria-label={`Gọi ${site.phone.display}`}
          className="grid size-12 place-items-center rounded-xl bg-primary text-white transition hover:bg-primary-dark"
        >
                    <PhoneIcon className="size-6" />
        </a>
      </div>
    </>
  )
}
