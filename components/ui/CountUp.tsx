'use client'

import { useEffect, useRef, useState } from 'react'

/** Số đếm tăng dần khi cuộn tới; tôn trọng prefers-reduced-motion (hiện ngay giá trị cuối). */
export function CountUp({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const duration = 1200
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        setDisplay(value * (1 - (1 - t) ** 3))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      setDisplay(0)
      frame = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  const text = display.toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return (
    <span ref={ref} className="tabular-nums">
      {/* Trình đọc màn hình luôn nhận giá trị cuối */}
      <span aria-hidden="true">
        {text}
        {suffix}
      </span>
      <span className="sr-only">
        {value.toLocaleString('vi-VN')}
        {suffix}
      </span>
    </span>
  )
}
