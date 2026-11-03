'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { revealDelay } from '@/components/ui/reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import type { Facility, GalleryImage } from '@/types'

export type ResolvedFacility = Facility & { photo: GalleryImage; position?: string }

/** Quãng cuộn (svh) cho mỗi ảnh trong lúc khung được ghim */
const SCROLL_PER_ITEM = 42
/** Mặt trống cong: góc nghiêng mỗi bậc / tối đa (độ), thu nhỏ mỗi bậc */
const TILT_DEG = 26
const TILT_MAX = 46
const SHRINK = 0.15

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Cơ sở vật chất – "trống xoay" dọc cuộn theo trang (theo ảnh mẫu người dùng gửi, nền sáng theo R-C4).
 * Khung được ghim ngay dưới header; cuộn dọc trong phạm vi section làm cả dải ảnh trượt liên tục lên trên.
 * Mọi ảnh rõ nét, giữ màu gốc; ảnh phía trên/dưới nhỏ dần, nghiêng ra xa (mép ngoài lùi vào trong).
 * Bên trái: số thứ tự lớn + tiêu đề/mô tả ảnh đang xem.
 * Ghi transform/filter thẳng vào DOM trong rAF (không re-render mỗi pixel); chỉ chỉ số ảnh đang xem là state.
 * `prefers-reduced-motion`: bỏ nghiêng 3D, vẫn đổi ảnh theo vị trí cuộn.
 */
export function FacilitiesStack({ items, title }: { items: ResolvedFacility[]; title: string }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    const stage = stageRef.current
    if (!section || !sticky || !stage) return
    const cards = Array.from(stage.querySelectorAll<HTMLElement>('[data-card]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const top = parseFloat(getComputedStyle(sticky).top) || 0
      const range = section.offsetHeight - sticky.offsetHeight
      const progress = range > 0 ? Math.min(1, Math.max(0, (top - section.getBoundingClientRect().top) / range)) : 0
      const pos = progress * (cards.length - 1)
      const cardH = cards[0]?.offsetHeight ?? 300

      cards.forEach((card, i) => {
        const o = i - pos
        const a = Math.abs(o)
        // Bậc 1 cách 68% chiều cao thẻ, các bậc sau xít lại (40%) như mặt trống cong – ảnh phụ chỉ ló ra một phần
        const y = Math.sign(o) * (a <= 1 ? a * 0.68 : 0.68 + (a - 1) * 0.4) * cardH
        const scale = 1 - Math.min(a, 2.5) * SHRINK
        const tilt = Math.max(-TILT_MAX, Math.min(TILT_MAX, -o * TILT_DEG))
        card.style.transform = reduced.matches
          ? `translate3d(-50%, calc(-50% + ${y.toFixed(1)}px), 0) scale(${scale.toFixed(3)})`
          : `translate3d(-50%, calc(-50% + ${y.toFixed(1)}px), 0) perspective(900px) rotateX(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        // Mọi ảnh rõ nét, giữ màu gốc (người dùng bỏ làm mờ 03/11/2026); chỉ ảnh xa (> 1.8 bậc) mờ dần khi ra khỏi khung
        card.style.opacity = a > 2.6 ? '0' : a > 1.8 ? (1 - (a - 1.8) / 0.8).toFixed(3) : '1'
        card.style.zIndex = String(100 - Math.round(a * 10))
      })
      setActive(Math.min(cards.length - 1, Math.round(pos)))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    reduced.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
    }
  }, [])


  return (
    <div ref={sectionRef} className="relative" style={{ height: `${100 + items.length * SCROLL_PER_ITEM}svh` }}>
      {/* Không đặt overflow-hidden ở khối ngoài: sẽ làm hỏng position: sticky */}
      <div ref={stickyRef} className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden lg:top-[4.5rem] lg:h-[calc(100svh-4.5rem)]">
        <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_minmax(0,1fr)] gap-y-4 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:grid-rows-1 lg:gap-x-8 lg:px-8 lg:py-10">
          {/* Cột trái: tiêu đề section + số thứ tự lớn + nội dung ảnh đang xem */}
          <div className="lg:col-span-4 lg:self-center">
            <div data-reveal="blur">
              <Eyebrow>Cơ sở vật chất</Eyebrow>
              <h2
                id="co-so-vat-chat-title"
                className="mt-3 text-[1.625rem] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-primary-dark sm:text-3xl lg:text-[2.5rem]"
              >
                {title}
              </h2>
            </div>

            <div data-reveal="up" style={revealDelay(200)} className="mt-4 flex items-end gap-4 lg:mt-10 lg:block">
              <p className="text-5xl leading-none font-light tracking-[-0.04em] text-primary tabular-nums lg:text-[5.5rem]" aria-hidden="true">
                {pad(active + 1)}
              </p>
              <span className="mb-2 h-0.5 w-10 shrink-0 bg-accent lg:mt-5 lg:mb-0 lg:block" aria-hidden="true" />
              {/* Nội dung từng ảnh xếp chồng cùng 1 ô lưới để chiều cao không nhảy khi đổi ảnh */}
              <div className="grid min-w-0 lg:mt-5" aria-live="polite">
                {items.map((item, i) => (
                  <div
                    key={item.title}
                    aria-hidden={i !== active}
                    className={`col-start-1 row-start-1 transition-all duration-500 ease-out motion-reduce:transition-none ${
                      i === active ? 'translate-y-0 opacity-100' : `pointer-events-none opacity-0 ${i < active ? '-translate-y-3' : 'translate-y-3'}`
                    }`}
                  >
                    <h3 className="text-lg font-bold text-primary-dark lg:text-2xl">{item.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] text-muted max-lg:line-clamp-2 lg:mt-2 lg:text-base">{item.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 hidden text-sm tracking-[0.2em] text-muted tabular-nums lg:block">
                <span className="font-semibold text-primary-dark">{pad(active + 1)}</span> / {pad(items.length)}
              </p>
            </div>
          </div>

          {/* Trống ảnh xoay dọc – mobile: cắt trong khung để ảnh phụ không đè lên chữ; mép trên/dưới mờ dần */}
          <div ref={stageRef} data-reveal="up" style={revealDelay(100)} className="relative min-h-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-lg:overflow-hidden lg:col-span-6 lg:col-start-6">
            {items.map((item, i) => (
              <figure
                key={item.title}
                data-card
                aria-hidden={i !== active}
                className="absolute top-1/2 left-1/2 aspect-[16/10] w-[min(100%,34rem,calc((100svh-24rem)*1.6))] overflow-hidden rounded-3xl bg-canvas shadow-[var(--shadow-lift)] max-lg:w-[min(100%,calc((100svh-22rem)*1.6))]"
                style={{ transform: `translate3d(-50%, calc(-50% + ${i * 100}%), 0)` }}
              >
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 544px, 92vw"
                  loading="eager"
                  className={`object-cover ${item.position ?? 'object-[50%_45%]'}`}
                />
              </figure>
            ))}
          </div>

          {/* Cột phải: chữ dọc + vạch, như ảnh mẫu */}
          <div className="hidden items-center justify-end gap-4 lg:col-span-1 lg:col-start-12 lg:flex" aria-hidden="true">
            <span className="h-40 w-px bg-line" />
            <span className="text-xs font-semibold tracking-[0.3em] text-muted uppercase [writing-mode:vertical-rl]">
              Ảnh thật · Nha Khoa Quy Nhơn
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
