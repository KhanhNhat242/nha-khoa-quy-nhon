'use client'

import { Fragment, useEffect, useRef } from 'react'

/** Một đoạn chữ của tiêu đề; `highlight` bọc đoạn đó trong cụm từ khoá có vạch nhấn; `break` xuống dòng từ sm trở lên. */
export type InkSegment = { text: string; highlight?: boolean } | { break: true }

interface RisingInkProps {
  id: string
  segments: InkSegment[]
  className?: string
  /** Class cho cụm từ khoá (vd. màu chữ khác) */
  highlightClassName?: string
  /** Class cho vạch nhấn nằm dưới cụm từ khoá */
  markerClassName?: string
}

/** Bán kính ảnh hưởng của con trỏ, tính theo cỡ chữ */
const RADIUS_EM = 2
/** Hệ số "đuổi theo" mỗi khung hình – chữ nổi lên/hạ xuống mượt, không giật */
const EASE = 0.16

const segmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter('vi', { granularity: 'grapheme' }) : null

/** Tách theo grapheme để giữ nguyên chữ có dấu tiếng Việt (kể cả dạng tổ hợp NFD). */
const graphemes = (word: string) => (segmenter ? Array.from(segmenter.segment(word), (s) => s.segment) : Array.from(word))

function Word({ text }: { text: string }) {
  return (
    <span className="rising-ink-word">
      {graphemes(text).map((g, i) => (
        <span key={i} className="rising-ink-letter" data-ink="">
          {g}
        </span>
      ))}
    </span>
  )
}

/** Giữ khoảng trắng là text node thường để tiêu đề vẫn xuống dòng tự nhiên giữa các từ. */
function Words({ text }: { text: string }) {
  return text.split(/(\s+)/).map((part, i) =>
    part.trim() === '' ? <Fragment key={i}>{part ? ' ' : null}</Fragment> : <Word key={i} text={part} />,
  )
}

/**
 * Hiệu ứng "Rising Ink" (tự viết, lấy ý tưởng từ React Bits Pro – không dùng code/thư viện của họ):
 * từng chữ nổi lên khỏi mặt trang theo 3D khi con trỏ chuột đến gần.
 * - Trình đọc màn hình đọc câu đầy đủ từ thẻ `sr-only`; phần chữ tách lẻ là `aria-hidden`.
 * - Chỉ chạy với chuột/bút (`pointer: fine`) và khi không bật `prefers-reduced-motion`; mobile hiển thị chữ tĩnh.
 * - Không re-render React: ghi transform trực tiếp vào từng chữ trong rAF, dừng vòng lặp khi mọi chữ đã đứng yên;
 *   chữ ở trạng thái nghỉ không có transform (giữ chữ sắc nét, không tạo layer thừa).
 */
export function RisingInk({ id, segments, className = '', highlightClassName = '', markerClassName = '' }: RisingInkProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const fullText = segments
    .map((s) => ('break' in s ? ' ' : s.text))
    .join('')
    .replace(/\s+/g, ' ')
    .trim()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const letters = Array.from(root.querySelectorAll<HTMLElement>('[data-ink]'))
    const zone = root.closest('section') ?? root
    const current = new Float32Array(letters.length)
    let centers: { x: number; y: number }[] = []
    let radius = 120
    let pointer: { x: number; y: number } | null = null
    let frame = 0

    // Đo tâm từng chữ theo toạ độ trang (không phụ thuộc vị trí cuộn)
    const measure = () => {
      centers = letters.map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY }
      })
      radius = parseFloat(getComputedStyle(root).fontSize) * RADIUS_EM
    }

    const tick = () => {
      frame = 0
      let moving = false
      letters.forEach((el, i) => {
        let target = 0
        if (pointer && centers[i]) {
          const d = Math.hypot(pointer.x - centers[i].x, pointer.y - centers[i].y)
          const t = Math.max(0, 1 - d / radius)
          target = t * t * (3 - 2 * t) // smoothstep
        }
        const next = current[i] + (target - current[i]) * EASE
        current[i] = Math.abs(next - target) < 0.002 ? target : next
        if (current[i] !== target) moving = true

        const v = current[i]
        if (v < 0.002) {
          el.style.transform = ''
          el.style.textShadow = ''
        } else {
          el.style.transform = `translate3d(0, ${(-0.24 * v).toFixed(4)}em, ${(1.8 * v).toFixed(3)}rem) rotateX(${(-22 * v).toFixed(2)}deg) scale(${(1 + 0.02 * v).toFixed(4)})`
          el.style.textShadow = `0 ${(0.32 * v).toFixed(3)}em ${(0.28 * v).toFixed(3)}em color-mix(in oklab, var(--color-primary-dark) ${Math.round(32 * v)}%, transparent)`
        }
      })
      if (moving) frame = requestAnimationFrame(tick)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onEnter = () => measure()
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      if (!centers.length) measure()
      pointer = { x: event.pageX, y: event.pageY }
      schedule()
    }
    const onLeave = () => {
      pointer = null
      schedule()
    }
    const onResize = () => {
      if (centers.length) measure()
    }

    zone.addEventListener('pointerenter', onEnter)
    zone.addEventListener('pointermove', onMove)
    zone.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      zone.removeEventListener('pointerenter', onEnter)
      zone.removeEventListener('pointermove', onMove)
      zone.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
      letters.forEach((el) => {
        el.style.transform = ''
        el.style.textShadow = ''
      })
    }
  }, [])

  return (
    <h1 id={id} className={className}>
      <span className="sr-only">{fullText}</span>
      <span ref={rootRef} aria-hidden="true">
        {segments.map((segment, i) => {
          if ('break' in segment) return <br key={i} className="hidden sm:block" />
          if (segment.highlight) {
            return (
              <span key={i} className={`relative isolate whitespace-nowrap ${highlightClassName}`}>
                <Words text={segment.text} />
                <span className={`absolute -z-10 ${markerClassName}`} />
              </span>
            )
          }
          return <Words key={i} text={segment.text} />
        })}
      </span>
    </h1>
  )
}
