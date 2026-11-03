'use client'

import Image from 'next/image'
import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { SliderHandleIcon } from '@/components/ui/Icons'
import type { GalleryImage } from '@/types'

export interface ResolvedCase {
  id: string
  service: string
  condition: string
  solution: string
  before: GalleryImage
  after: GalleryImage
}

interface Props {
  cases: ResolvedCase[]
  tabs: { value: string; label: string }[]
}

export function BeforeAfterSlider({ cases, tabs }: Props) {
  const [tab, setTab] = useState(tabs[0]?.value ?? '')
  const [activeId, setActiveId] = useState(cases.find((c) => c.service === tabs[0]?.value)?.id)
  const [position, setPosition] = useState(50)
  const frameRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const dragging = useRef(false)
  const uid = useId()

  const visible = cases.filter((c) => c.service === tab)
  const active = visible.find((c) => c.id === activeId) ?? visible[0]

  const updateFromPointer = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect) return
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    updateFromPointer(event.clientX)
  }
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) updateFromPointer(event.clientX)
  }
  const stopDragging = () => {
    dragging.current = false
  }

  const chooseTab = (index: number) => {
    const next = tabs[(index + tabs.length) % tabs.length]
    setTab(next.value)
    setActiveId(cases.find((c) => c.service === next.value)?.id)
    setPosition(50)
    tabRefs.current[(index + tabs.length) % tabs.length]?.focus()
  }

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const map: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 }
    if (event.key in map) {
      event.preventDefault()
      chooseTab(map[event.key])
    }
  }

  if (!active) return null
  const activeTabIndex = tabs.findIndex((t) => t.value === tab)

  return (
    <div>
      {/* Tab dịch vụ – điều khiển phân đoạn phẳng */}
      <div
        role="tablist"
        aria-label="Chọn dịch vụ"
        className="inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-line bg-surface p-1.5"
      >
        {tabs.map((t, index) => {
          const selected = t.value === tab
          return (
            <button
              key={t.value}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              id={`${uid}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => chooseTab(index)}
              onKeyDown={(event) => onTabKey(event, index)}
              className={`min-h-11 cursor-pointer rounded-xl px-5 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-200 sm:px-7 ${
                selected ? 'bg-primary text-white' : 'text-ink hover:bg-primary-light hover:text-primary'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${activeTabIndex}`}
        className="mt-6 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8"
      >
        <div className="min-w-0 lg:col-span-8">
          {/* Khung so sánh */}
          <div
            ref={frameRef}
            className="group/frame relative aspect-[16/9] cursor-ew-resize touch-pan-y overflow-hidden rounded-3xl bg-ink shadow-[var(--shadow-soft)] select-none sm:aspect-[12/5]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            <Image
              key={`${active.id}-sau`}
              src={active.after.src}
              alt={active.after.alt}
              fill
              sizes="(min-width: 1024px) 820px, 100vw"
              className="lightbox-fade pointer-events-none object-cover"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
              <Image
                key={`${active.id}-truoc`}
                src={active.before.src}
                alt={active.before.alt}
                fill
                sizes="(min-width: 1024px) 820px, 100vw"
                className="lightbox-fade pointer-events-none object-cover"
                draggable={false}
              />
            </div>

            <span className="absolute top-4 left-4 rounded-lg bg-surface px-3 py-1 text-sm font-semibold text-primary-dark">
              Trước
            </span>
            <span className="absolute top-4 right-4 rounded-lg bg-accent-dark px-3 py-1 text-sm font-semibold text-white">
              Sau
            </span>

            {/* Đường chia + tay kéo */}
            <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }} aria-hidden="true">
              <div className="absolute inset-y-0 -ml-px w-0.5 bg-white" />
              <div className="absolute top-1/2 -ml-6 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-accent text-white ring-4 ring-white transition group-has-[input:focus-visible]/frame:ring-primary">
                <SliderHandleIcon className="size-6" />
              </div>
            </div>

            <label htmlFor={`${uid}-range`} className="sr-only">
              Kéo để so sánh ảnh trước và sau điều trị
            </label>
            <input
              id={`${uid}-range`}
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(position)}
              onChange={(event) => setPosition(Number(event.target.value))}
              className="sr-only"
            />
          </div>

          {/* Chú thích ca */}
          <dl className="mt-4 grid gap-4 rounded-2xl bg-surface p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <dt className="text-sm text-muted">Tình trạng ban đầu</dt>
              <dd className="mt-1 text-lg font-semibold text-primary-dark">{active.condition}</dd>
            </div>
            <div className="sm:border-l sm:border-line sm:pl-6">
              <dt className="text-sm text-muted">Giải pháp điều trị</dt>
              <dd className="mt-1 text-lg font-semibold text-accent-dark">{active.solution}</dd>
            </div>
          </dl>
        </div>

        {/* Danh sách ca trong tab */}
        <div className="lg:col-span-4">
          <ul className="space-y-3">
            {visible.map((c, index) => {
              const selected = c.id === active.id
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setActiveId(c.id)
                      setPosition(50)
                    }}
                    className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 bg-surface p-3 text-left transition-colors duration-200 ${
                      selected ? 'border-accent' : 'border-transparent hover:border-line'
                    }`}
                  >
                    <span className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-xl bg-ink sm:w-28">
                      <Image src={c.after.src} alt="" fill sizes="112px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-muted tabular-nums">
                        Ca {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="block font-semibold text-primary-dark">{c.condition}</span>
                      <span className="block text-sm text-accent-dark">{c.solution}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="mt-5 text-sm text-muted">
            Ảnh thật tại phòng khám (ảnh trong miệng đã cắt sát vùng miệng hoặc phim X-quang) để bảo vệ quyền riêng tư.
            Kết quả tuỳ tình trạng răng của mỗi người.
          </p>
        </div>
      </div>
    </div>
  )
}
