'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Chiều cao header dính ở desktop (lg:h-[4.5rem]) – phần ghim nằm ngay dưới header */
const HEADER_OFFSET = 72
const PINNED_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
/** Mặt cong: góc xoay (độ) / độ tiến gần (px) theo khoảng cách tới tâm, tính bằng "số thẻ" */
const CURVE_DEG = 16
const CURVE_MAX_DEG = 30
const CURVE_Z = 46

/**
 * Carousel dịch vụ cuộn theo trang (scroll-driven):
 * - Desktop (≥1024px, không bật giảm chuyển động): section được "ghim" (sticky); cuộn dọc trong phạm vi section
 *   sẽ trượt dải thẻ sang ngang để xem các thẻ tiếp theo. Chiều cao section = chiều cao vùng ghim + quãng trượt.
 * - Mobile / giảm chuyển động: dải thẻ là thanh cuộn ngang thường có scroll-snap (vuốt bằng tay, dừng ở giữa thẻ).
 * - Mặt cong như ảnh mẫu (dải thẻ không bị nghiêng): thẻ càng xa tâm càng xoay hướng vào giữa và tiến gần người xem;
 *   mọi thẻ đều rõ nét, giữ màu gốc (người dùng bỏ làm mờ thẻ phụ 03/11/2026). Lề hai đầu = nửa khung − nửa thẻ
 *   để thẻ đầu/cuối cũng nằm được chính giữa. `prefers-reduced-motion`: không xoay.
 * - Bàn phím: Tab tới một thẻ đang nằm ngoài khung → cuộn trang tới vị trí đưa thẻ đó về giữa.
 * Chỉ ghi `transform` (không re-render React), cập nhật trong rAF.
 */
export function ServicesCarousel({ heading, footer, children }: { heading: ReactNode; footer: ReactNode; children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const sticky = stickyRef.current
    const track = trackRef.current
    const bar = barRef.current
    if (!outer || !sticky || !track || !bar) return

    const mq = window.matchMedia(PINNED_QUERY)
    const reduced = window.matchMedia(REDUCED_QUERY)
    const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-slide]'))
    let distance = 0
    let frame = 0

    const centerOf = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2

    // Mặt cong + làm mờ thẻ phụ theo khoảng cách từ tâm thẻ tới tâm khung nhìn
    const applyFocus = () => {
      const trackLeft = track.getBoundingClientRect().left
      const viewCenter = sticky.getBoundingClientRect().left + sticky.clientWidth / 2
      const step = (slides[0]?.offsetWidth ?? 320) + (parseFloat(getComputedStyle(track).columnGap) || 0)
      for (const slide of slides) {
        const center = trackLeft + slide.offsetLeft - track.offsetLeft - track.scrollLeft + slide.offsetWidth / 2
        const d = (center - viewCenter) / step
        if (reduced.matches) {
          slide.style.transform = ''
          continue
        }
        const angle = Math.max(-CURVE_MAX_DEG, Math.min(CURVE_MAX_DEG, -d * CURVE_DEG))
        const z = Math.min(2, Math.abs(d)) * CURVE_Z
        slide.style.transform = `perspective(1000px) translateZ(${z.toFixed(1)}px) rotateY(${angle.toFixed(2)}deg)`
      }
    }

    const update = () => {
      frame = 0
      if (mq.matches && distance > 0) {
        const progress = Math.min(1, Math.max(0, (HEADER_OFFSET - outer.getBoundingClientRect().top) / distance))
        track.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px, 0, 0)`
        bar.style.transform = `scaleX(${progress.toFixed(4)})`
      }
      applyFocus()
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const setup = () => {
      if (!mq.matches) {
        outer.style.height = ''
        track.style.transform = ''
        bar.style.transform = ''
        distance = 0
        applyFocus()
        return
      }
      // Quãng trượt = từ tâm thẻ đầu tới tâm thẻ cuối (lề hai đầu đã căn để mỗi thẻ đều về được chính giữa)
      const first = slides[0]
      const last = slides[slides.length - 1]
      distance = first && last ? Math.max(0, centerOf(last) - centerOf(first)) : 0
      outer.style.height = `${sticky.offsetHeight + distance}px`
      update()
    }

    // Bàn phím: đưa thẻ đang được focus về giữa bằng cách cuộn trang tới đúng tiến độ
    const onFocusIn = (event: FocusEvent) => {
      if (!mq.matches || distance <= 0) return
      const slide = (event.target as HTMLElement).closest<HTMLElement>('[data-slide]')
      const first = slides[0]
      if (!slide || !first) return
      const progress = Math.min(1, Math.max(0, (centerOf(slide) - centerOf(first)) / distance))
      const outerTop = outer.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
      window.scrollTo({ top: outerTop + progress * distance, behavior: 'instant' })
    }

    // Kéo bằng chuột (nhấn giữ + kéo ngang). Cảm ứng dùng vuốt gốc của trình duyệt.
    // - Ghim (desktop): vị trí ngang gắn với vị trí cuộn trang 1:1 → kéo sang trái = cuộn trang xuống đúng bấy nhiêu px;
    //   thả chuột thì cuộn mượt tới thẻ gần nhất để thẻ dừng đúng giữa.
    // - Không ghim: kéo thẳng thanh cuộn ngang của dải thẻ.
    const DRAG_THRESHOLD = 6
    let drag: { id: number; x: number; scrollY: number; scrollLeft: number; moved: boolean } | null = null

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      drag = { id: event.pointerId, x: event.clientX, scrollY: window.scrollY, scrollLeft: track.scrollLeft, moved: false }
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return
      const dx = event.clientX - drag.x
      if (!drag.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return
        drag.moved = true
        track.setPointerCapture(drag.id)
        track.dataset.dragging = 'true'
      }
      if (mq.matches && distance > 0) window.scrollTo({ top: drag.scrollY - dx, behavior: 'instant' })
      else track.scrollLeft = drag.scrollLeft - dx
    }
    const onPointerUp = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return
      const moved = drag.moved
      drag = null
      delete track.dataset.dragging
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
      if (!moved || !mq.matches || distance <= 0 || !slides[0]) return
      // Dừng ở thẻ gần tâm nhất
      const progress = Math.min(1, Math.max(0, (HEADER_OFFSET - outer.getBoundingClientRect().top) / distance))
      const x = centerOf(slides[0]) + progress * distance
      const nearest = slides.reduce((a, b) => (Math.abs(centerOf(b) - x) < Math.abs(centerOf(a) - x) ? b : a))
      const target = (centerOf(nearest) - centerOf(slides[0])) / distance
      const outerTop = outer.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
      window.scrollTo({ top: outerTop + target * distance, behavior: 'smooth' })
    }
    // Vừa kéo xong thì chặn click (không mở nhầm link "Tư vấn" / "Gọi")
    let suppressClick = false
    const onClickCapture = (event: MouseEvent) => {
      if (suppressClick) {
        event.preventDefault()
        event.stopPropagation()
        suppressClick = false
      }
    }
    const markDragEnd = (event: PointerEvent) => {
      if (drag?.moved && event.pointerId === drag.id) suppressClick = true
      onPointerUp(event)
    }
    const onDragStart = (event: DragEvent) => event.preventDefault() // chặn kéo ảnh/link gốc của trình duyệt

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', markDragEnd)
    track.addEventListener('pointercancel', onPointerUp)
    track.addEventListener('click', onClickCapture, true)
    track.addEventListener('dragstart', onDragStart)

    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(track)
    ro.observe(sticky)
    window.addEventListener('scroll', schedule, { passive: true })
    track.addEventListener('scroll', schedule, { passive: true }) // mobile: vuốt ngang
    window.addEventListener('resize', setup)
    mq.addEventListener('change', setup)
    reduced.addEventListener('change', setup)
    track.addEventListener('focusin', onFocusIn)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('scroll', schedule)
      track.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', setup)
      mq.removeEventListener('change', setup)
      reduced.removeEventListener('change', setup)
      track.removeEventListener('focusin', onFocusIn)
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', markDragEnd)
      track.removeEventListener('pointercancel', onPointerUp)
      track.removeEventListener('click', onClickCapture, true)
      track.removeEventListener('dragstart', onDragStart)
    }
  }, [])

  return (
    <div ref={outerRef} className="relative">
      <div
        ref={stickyRef}
        className="py-14 md:py-20 lg:motion-safe:sticky lg:motion-safe:top-[4.5rem] lg:motion-safe:flex lg:motion-safe:h-[calc(100svh-4.5rem)] lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:overflow-x-clip lg:motion-safe:py-[clamp(0.75rem,3.5svh,2rem)]"
      >
        {heading}

        {/* Lề hai đầu = nửa khung − nửa thẻ thường (19rem mobile / 21rem desktop) → thẻ đầu, thẻ cuối nằm được chính giữa */}
        <ul
          ref={trackRef}
          aria-label="Danh sách dịch vụ"
          className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-min(9.5rem,40vw))] data-[dragging=true]:cursor-grabbing data-[dragging=true]:select-none py-6 sm:gap-6 lg:px-[calc(50%-10.5rem)] lg:motion-safe:snap-none lg:motion-safe:overflow-visible lg:motion-safe:py-4 lg:motion-safe:[@media(max-height:700px)]:py-2"
        >
          {children}
        </ul>

        {/* Thanh tiến độ (chỉ khi ghim) + ghi chú giá */}
        <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="hidden h-0.5 w-full overflow-hidden rounded-full bg-line lg:motion-safe:block" aria-hidden="true">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-accent" />
          </span>
          {footer}
        </div>
      </div>
    </div>
  )
}
