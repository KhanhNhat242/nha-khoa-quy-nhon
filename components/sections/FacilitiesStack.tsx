'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { revealDelay } from '@/components/ui/reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import type { Facility, GalleryImage } from '@/types'

export type ResolvedFacility = Facility & { photo: GalleryImage; position?: string }

/** Quãng cuộn (svh) cho mỗi ảnh trong lúc khung được ghim */
const SCROLL_PER_ITEM = 42
/** Vòng cung: mỗi ảnh lệch nhau ARC_STEP độ trên một đường tròn bán kính = ARC_RADIUS × bề ngang ảnh */
const ARC_STEP = 12
const ARC_RADIUS = 5.2

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Cơ sở vật chất – carousel vòng cung (arc carousel) cuộn theo trang (nền sáng theo R-C4).
 * Khung được ghim ngay dưới header; cuộn dọc trong phạm vi section làm các ảnh trượt dọc theo một cung tròn:
 * ảnh giữa cao nhất và thẳng đứng, ảnh hai bên thấp dần và xoay nghiêng theo đường cung. Trên carousel chỉ có ảnh,
 * mọi ảnh rõ nét, giữ màu gốc.
 * Bố cục: tiêu đề section + bộ đếm ở trên · carousel ngang ở giữa · số thứ tự + tiêu đề/mô tả ảnh đang xem ở dưới
 * (lướt tới ảnh nào thì hiện chữ của ảnh đó).
 * Ghi transform/filter thẳng vào DOM trong rAF (không re-render mỗi pixel); chỉ chỉ số ảnh đang xem là state.
 * `prefers-reduced-motion`: ảnh xếp thẳng hàng ngang (không xoay theo cung), vẫn đổi ảnh theo vị trí cuộn.
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
      const cardW = cards[0]?.offsetWidth ?? 480

      cards.forEach((card, i) => {
        const o = i - pos
        const a = Math.abs(o)
        // Vị trí trên cung tròn: lệch ngang R·sin(θ), hạ xuống R·(1 − cos θ), xoay đúng góc θ theo đường cung
        const radius = ARC_RADIUS * cardW
        const theta = (o * ARC_STEP * Math.PI) / 180
        const x = reduced.matches ? o * cardW * 1.08 : radius * Math.sin(theta)
        const y = reduced.matches ? 0 : radius * (1 - Math.cos(theta))
        const rotate = reduced.matches ? 0 : o * ARC_STEP
        card.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0) rotate(${rotate.toFixed(2)}deg)`
        // Mỗi lượt chỉ hiện 5 ảnh (1 chính + 2 mỗi bên): ảnh xa hơn 2 bậc mờ dần rồi ẩn hẳn khi trượt ra/vào
        card.style.opacity = a >= 2.5 ? '0' : a > 2 ? (1 - (a - 2) / 0.5).toFixed(3) : '1'
        card.style.visibility = a >= 2.5 ? 'hidden' : ''
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
      <div ref={stickyRef} className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden pt-6 pb-24 lg:top-[4.5rem] lg:h-[calc(100svh-4.5rem)] lg:justify-start lg:py-8">
        {/* Trên: tiêu đề section + bộ đếm */}
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div data-reveal="blur" className="min-w-0">
            <Eyebrow>Cơ sở vật chất</Eyebrow>
            <h2
              id="co-so-vat-chat-title"
              className="mt-3 text-[1.625rem] leading-[1.15] font-bold tracking-[-0.02em] text-primary-dark sm:text-3xl lg:mb-15 lg:text-[2.5rem]"
            >
              {title}
            </h2>
          </div>
          <p className="hidden shrink-0 pb-1 text-sm tracking-[0.2em] text-muted tabular-nums sm:block" aria-hidden="true">
            <span className="font-semibold text-primary-dark">{pad(active + 1)}</span> / {pad(items.length)}
          </p>
        </div>

        {/* Giữa: carousel vòng cung chỉ có ảnh, trải hết bề ngang (ảnh rìa bị cắt ở mép màn hình) */}
        <div
          ref={stageRef}
          data-reveal="up"
          style={revealDelay(100)}
          className="relative my-6 h-[min(92vw,50svh)] shrink-0 lg:my-4 lg:h-auto lg:min-h-0 lg:flex-1"
        >
          {items.map((item, i) => (
            <figure
              key={item.title}
              data-card
              aria-hidden={i !== active}
              className="absolute top-[40%] left-1/2 aspect-[3/4] w-[min(60vw,calc(40svh*0.75))] origin-center overflow-hidden rounded-3xl bg-canvas shadow-[var(--shadow-lift)] lg:w-[min(22rem,calc((100svh-26rem)*0.75))]"
              style={{ transform: `translate3d(calc(-50% + ${i * 100}%), -50%, 0)` }}
            >
              <Image
                src={item.photo.src}
                alt={item.photo.alt}
                fill
                sizes="(min-width: 1024px) 352px, 60vw"
                loading="eager"
                className={`object-cover ${item.position ?? 'object-[50%_45%]'}`}
              />
            </figure>
          ))}
        </div>

        {/* Dưới: số thứ tự + nội dung ảnh đang xem (xếp chồng cùng 1 ô lưới để chiều cao không nhảy) */}
        <div data-reveal="up" style={revealDelay(200)} className="mx-auto flex w-full max-w-3xl items-start gap-4 px-4 sm:gap-6 sm:px-6">
          <p className="text-4xl leading-none font-light tracking-[-0.04em] text-primary tabular-nums sm:text-5xl lg:text-6xl" aria-hidden="true">
            {pad(active + 1)}
          </p>
          <span className="mt-4 h-0.5 w-8 shrink-0 bg-accent sm:mt-5 sm:w-10" aria-hidden="true" />
          <div className="grid min-w-0 flex-1" aria-live="polite">
            {items.map((item, i) => (
              <div
                key={item.title}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 transition-all duration-500 ease-out motion-reduce:transition-none ${i === active ? 'translate-x-0 opacity-100' : `pointer-events-none opacity-0 ${i < active ? '-translate-x-4' : 'translate-x-4'}`
                  }`}
              >
                <h3 className="text-lg font-bold text-primary-dark lg:text-2xl">{item.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-muted lg:mt-2 lg:text-base [@media(max-height:700px)]:line-clamp-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
