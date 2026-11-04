'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Góc nghiêng tối đa (độ) khi con trỏ ở mép ảnh */
const TILT_DEG = 10
/** Lò xo giảm chấn (cùng hệ số với React Bits ReflectiveCard): nảy nhẹ rồi dừng êm */
const STIFFNESS = 120
const DAMPING = 16
/** Intro: bắt đầu hơi nghiêng, lò xo mềm hơn trong khoảng thời gian này */
const INTRO_MS = 1400

interface Props {
  children: ReactNode
  /** Class cho khung ảnh (bo góc, tỉ lệ, bóng…) – áp lên lớp được nghiêng */
  className?: string
}

/**
 * Hiệu ứng "phản chiếu" cho ảnh – tự viết theo ý tưởng React Bits ReflectiveCard (không dùng code/thư viện của họ,
 * không WebGL, không video/webcam – R-E1, R-D1): ảnh nghiêng 3D theo con trỏ bằng lò xo, quầng chói chạy theo chuột,
 * vệt sáng chéo như mặt kim loại bóng trượt theo góc nghiêng, viền sáng mảnh. Ảnh luôn rõ nét.
 * - Chuột: rê để nghiêng; cảm ứng: chạm-kéo để nghiêng (touch-action: pan-y – vẫn cuộn trang dọc được).
 * - `prefers-reduced-motion`: không nghiêng, không intro, không chói.
 * - Chỉ ghi CSS variable trong rAF và dừng vòng lặp khi đã đứng yên.
 */
export function ReflectiveImage({ children, className = '' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const x = { p: 0.62, v: 0, target: 0 }
    const y = { p: -0.55, v: 0, target: 0 }
    const light = { p: 0.8, target: 0 }
    const pointer = { x: 0.5, y: 0.5 }
    let slowUntil = performance.now() + INTRO_MS
    let touchId: number | null = null
    let raf = 0
    let last = performance.now()

    const write = () => {
      const s = root.style
      s.setProperty('--ri-rx', `${(y.p * TILT_DEG).toFixed(3)}deg`)
      s.setProperty('--ri-ry', `${(-x.p * TILT_DEG).toFixed(3)}deg`)
      s.setProperty('--ri-gx', `${(pointer.x * 100).toFixed(2)}%`)
      s.setProperty('--ri-gy', `${(pointer.y * 100).toFixed(2)}%`)
      s.setProperty('--ri-glare', light.p.toFixed(3))
      // vệt sáng chéo trượt theo góc nghiêng (−1…1 → 0%…100%)
      s.setProperty('--ri-sweep', `${(50 + (x.p - y.p) * 28).toFixed(2)}%`)
    }

    const frame = (now: number) => {
      raf = 0
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      const slow = now < slowUntil
      const k = slow ? 24 : STIFFNESS
      const c = slow ? 9 : DAMPING
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)))
      const h = dt / steps
      for (let i = 0; i < steps; i++) {
        for (const axis of [x, y]) {
          axis.v += (k * (axis.target - axis.p) - c * axis.v) * h
          axis.p += axis.v * h
        }
      }
      const tau = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45
      light.p += (light.target - light.p) * (1 - Math.exp(-dt / tau))

      const moving =
        Math.abs(x.target - x.p) > 0.0005 ||
        Math.abs(y.target - y.p) > 0.0005 ||
        Math.abs(x.v) > 0.0005 ||
        Math.abs(y.v) > 0.0005 ||
        Math.abs(light.target - light.p) > 0.002
      if (!moving) {
        x.p = x.target
        y.p = y.target
        x.v = y.v = 0
        light.p = light.target
      }
      write()
      if (moving) raf = requestAnimationFrame(frame)
    }
    const wake = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const aimAt = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const nx = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      const ny = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
      pointer.x = nx
      pointer.y = ny
      x.target = nx * 2 - 1
      y.target = ny * 2 - 1
      light.target = 1
      slowUntil = 0
      wake()
    }
    const release = () => {
      x.target = 0
      y.target = 0
      light.target = 0
      wake()
    }

    const onEnter = (e: PointerEvent) => e.pointerType === 'mouse' && aimAt(e)
    const onMove = (e: PointerEvent) => (e.pointerType === 'mouse' || e.pointerId === touchId) && aimAt(e)
    const onLeave = (e: PointerEvent) => e.pointerType === 'mouse' && release()
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      touchId = e.pointerId
      aimAt(e)
    }
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== touchId) return
      touchId = null
      release()
    }

    root.addEventListener('pointerenter', onEnter)
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('pointerdown', onDown)
    root.addEventListener('pointerup', onUp)
    root.addEventListener('pointercancel', onUp)
    write()
    wake()
    return () => {
      cancelAnimationFrame(raf)
      root.removeEventListener('pointerenter', onEnter)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onUp)
    }
  }, [])

  return (
    <div ref={rootRef} className="reflective-image">
      <div className={`reflective-image__body ${className}`}>
        {children}
        <span className="reflective-image__shine" aria-hidden="true" />
        <span className="reflective-image__glare" aria-hidden="true" />
        <span className="reflective-image__rim" aria-hidden="true" />
      </div>
    </div>
  )
}
