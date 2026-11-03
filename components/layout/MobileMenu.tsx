'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { buttonStyles } from '@/components/ui/button-styles'
import { CalendarIcon, CloseIcon, MenuIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'
import { BOOKING_ANCHOR, homeNav, site } from '@/data/site'

const subscribe = () => () => {}

/** true sau khi hydrate – để portal chỉ render ở trình duyệt. */
function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false)
}

export function MobileMenu() {
  const isClient = useIsClient()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    // Khoá cuộn trang phía sau: trang cuộn trên <html> nên phải khoá cả html lẫn body
    // (mobile thường bỏ qua overflow của riêng body). Không dùng position: fixed để giữ nguyên vị trí cuộn.
    const html = document.documentElement
    const previous = { html: html.style.overflow, body: document.body.style.overflow, overscroll: html.style.overscrollBehavior }
    html.style.overflow = 'hidden'
    html.style.overscrollBehavior = 'none'
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = previous.html
      html.style.overscrollBehavior = previous.overscroll
      document.body.style.overflow = previous.body
      window.removeEventListener('keydown', onKey)
      toggle?.focus()
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        className="grid size-11 place-items-center rounded-full text-primary-dark hover:bg-primary-light"
        aria-label="Mở menu"
        aria-expanded={open}
        aria-controls="menu-di-dong"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="size-6" />
      </button>

      {isClient
        ? createPortal(
            <>
      <div
        className={`fixed inset-0 z-50 touch-none bg-ink/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        id="menu-di-dong"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        // Điện thoại (< 640px): phủ kín toàn màn hình, cao đúng 100dvh (không hụt khi thanh địa chỉ ẩn/hiện);
        // từ sm: ngăn kéo bên phải cao full màn hình
        className={`fixed top-0 right-0 z-50 flex h-dvh w-full flex-col overscroll-contain bg-surface shadow-2xl transition-transform duration-300 ease-out sm:w-[min(24rem,88vw)] motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <span className="font-bold text-primary-dark">{site.name}</span>
          <button
            ref={closeRef}
            type="button"
            className="grid size-11 place-items-center rounded-full hover:bg-primary-light"
            aria-label="Đóng menu"
            onClick={close}
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <nav aria-label="Menu di động" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <ul className="space-y-1">
            {homeNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-ink hover:bg-primary-light hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-line p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <a href={`#${BOOKING_ANCHOR}`} onClick={close} className={`${buttonStyles.primary} w-full`}>
            <CalendarIcon className="size-5" />
            Đặt lịch tư vấn
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a href={site.phone.tel} className={`${buttonStyles.outline} px-3 text-sm`}>
              <PhoneIcon className="size-5" />
              Gọi ngay
            </a>
            <a
              href={site.zalo.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonStyles.outline} px-3 text-sm`}
            >
              <ZaloIcon className="size-6 text-zalo" />
              Nhắn Zalo
            </a>
          </div>
        </div>
      </div>
            </>,
            document.body,
          )
        : null}
    </div>
  )
}
