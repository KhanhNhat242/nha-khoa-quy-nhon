'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { buttonStyles } from '@/components/ui/button-styles'
import { CalendarIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'
import { Eyebrow } from '@/components/ui/SectionHeading'
import type { GalleryImage, TeamStory } from '@/types'

export type ResolvedStory = TeamStory & { photo: GalleryImage }

interface Props {
  stories: ResolvedStory[]
  title: string
  bookingHref: string
  nextSectionId: string
}

/** Quãng cuộn (svh) dành cho mỗi thẻ trong lúc khung nội dung đang được ghim */
const SCROLL_PER_STORY = 60

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Carousel "Đội ngũ bác sĩ" cuộn theo trang: khung nội dung được ghim (sticky) ngay dưới header,
 * cuộn dọc để chuyển lần lượt từng ảnh. Thẻ đang xem ở giữa, thẻ trước/sau thu nhỏ, mờ dần ở trên/dưới.
 * - Tiến độ cuộn ghi vào CSS variable `--story-progress` (thanh tiến trình chạy theo từng pixel, không re-render).
 * - Nút mũi tên cuộn tới thẻ kế tiếp; ở thẻ cuối thì sang section tiếp theo.
 * - `prefers-reduced-motion`: tắt chuyển tiếp, thẻ đổi ngay theo vị trí cuộn.
 */
export function TeamStories({ stories, title, bookingHref, nextSectionId }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!section || !sticky) return

    let frame = 0
    const update = () => {
      frame = 0
      const top = parseFloat(getComputedStyle(sticky).top) || 0
      const range = section.offsetHeight - sticky.offsetHeight
      const progress = range > 0 ? Math.min(1, Math.max(0, (top - section.getBoundingClientRect().top) / range)) : 0
      section.style.setProperty('--story-progress', progress.toFixed(4))
      setActiveIndex(Math.min(stories.length - 1, Math.floor(progress * stories.length)))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [stories.length])

  const goNext = () => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!section || !sticky) return
    const top = parseFloat(getComputedStyle(sticky).top) || 0
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - top
    const range = section.offsetHeight - sticky.offsetHeight
    const next = activeIndex + 1
    if (next < stories.length) {
      window.scrollTo({ top: sectionTop + ((next + 0.5) / stories.length) * range, behavior: 'smooth' })
    } else {
      document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isLast = activeIndex === stories.length - 1

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${100 + stories.length * SCROLL_PER_STORY}svh` }}>
      {/* Không đặt overflow-hidden ở khối ngoài: sẽ làm hỏng position: sticky của khung bên trong */}
      <div
        ref={stickyRef}
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden lg:top-[4.5rem] lg:h-[calc(100svh-4.5rem)]"
      >
        {/* Mobile dọc: [thanh tiến trình | tiêu đề / ảnh / nội dung]. Từ md: [ảnh | thanh tiến trình | tiêu đề + nội dung] */}
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] gap-x-5 gap-y-5 px-4 pt-6 pb-6 sm:gap-x-8 sm:px-6 md:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1fr)] md:grid-rows-[1fr_auto_auto_1fr] md:gap-x-12 md:gap-y-6 md:pt-8 md:pb-10 lg:gap-x-20 lg:px-8">
          {/* Thanh tiến trình: đoạn màu ngọc chạy xuống theo tiến độ cuộn */}
          <div className="col-start-1 row-span-3 row-start-1 flex justify-center md:col-start-2 md:row-span-4">
            <div
              data-reveal="up"
              style={revealDelay(150)}
              className="relative h-full w-1 self-center rounded-full bg-primary/15 md:h-[74%]"
              aria-hidden="true"
            >
              <div
                className="absolute inset-x-0 top-0 rounded-full bg-accent"
                style={{
                  height: `${100 / stories.length}%`,
                  transform: `translateY(calc(var(--story-progress, 0) * ${(stories.length - 1) * 100}%))`,
                }}
              />
            </div>
          </div>

          {/* Tiêu đề */}
          <div className="col-start-2 row-start-1 md:col-start-3 md:row-start-2">
            <div data-reveal="blur">
              <Eyebrow>Đội ngũ bác sĩ</Eyebrow>
              <h2
                id="doi-ngu-title"
                className="mt-3 text-[1.75rem] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-primary-dark sm:text-4xl lg:text-[2.75rem] [@media(max-height:760px)]:text-[1.75rem]"
              >
                {title}
              </h2>
            </div>
          </div>

          {/* Ảnh: thẻ đang xem ở giữa, thẻ trước/sau mờ dần ở trên/dưới.
              container-type: size để khung ảnh co theo cả chiều rộng lẫn chiều cao của ô (đơn vị cqw/cqh) */}
          <div
            data-reveal="up"
            style={revealDelay(100)}
            className="relative col-start-2 row-start-2 min-h-0 [container-type:size] [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)] md:col-start-1 md:row-span-4 md:row-start-1"
          >
            {stories.map((story, i) => {
              const offset = i - activeIndex
              const state =
                offset === 0
                  ? 'opacity-100 shadow-[var(--shadow-lift)]'
                  : Math.abs(offset) === 1
                    ? 'opacity-35 scale-[0.86] grayscale-[35%]'
                    : 'opacity-0 scale-75'
              return (
                <div
                  key={story.image}
                  aria-hidden={offset !== 0}
                  className={`absolute top-1/2 left-1/2 aspect-[4/3] w-[min(92cqw,120cqh)] overflow-hidden rounded-[2rem] bg-primary-light transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:w-[min(96cqw,110cqh)] ${state}`}
                  // Dời bằng thuộc tính translate (áp dụng sau scale nên không bị co theo).
                  // Bước 93% = (100% + 86%) / 2: thẻ bên cạnh thu nhỏ 0.86 vẫn cách thẻ giữa đúng 2rem
                  style={{ translate: `-50% calc(-50% + ${offset} * (93% + 2rem))` }}
                >
                  <Image
                    src={story.photo.src}
                    alt={story.photo.alt}
                    fill
                    sizes="(min-width: 768px) 560px, 80vw"
                    // Thẻ chưa tới lượt nằm ngoài khung nhìn → tải sẵn để cuộn nhanh không thấy khung trống (mỗi ảnh ~60KB)
                    loading="eager"
                    className={`object-cover ${story.position}`}
                  />
                </div>
              )
            })}
          </div>

          {/* Nội dung từng thẻ: xếp chồng cùng 1 ô lưới để chiều cao không nhảy khi đổi thẻ */}
          <div className="col-start-2 row-start-3 md:col-start-3 md:row-start-3 md:max-w-md">
            <div data-reveal="up" style={revealDelay(300)} className="grid">
              {stories.map((story, i) => (
                <div
                  key={story.title}
                  className={`col-start-1 row-start-1 transition-all duration-500 ease-out motion-reduce:transition-none ${
                    i === activeIndex
                      ? 'translate-y-0 opacity-100 delay-150'
                      : `pointer-events-none opacity-0 ${i < activeIndex ? '-translate-y-4' : 'translate-y-4'}`
                  }`}
                >
                  <p className="text-sm font-semibold tracking-[0.12em] text-accent-dark uppercase">
                    {pad(i + 1)} — {story.label}
                  </p>
                  <h3 className="mt-2 text-xl leading-snug font-bold text-primary-dark sm:text-2xl lg:text-[1.75rem] [@media(max-height:760px)]:text-lg">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-base text-muted sm:mt-3 sm:text-lg [@media(max-height:760px)]:line-clamp-2 [@media(max-height:760px)]:text-base">
                    {story.description}
                  </p>
                </div>
              ))}
            </div>

            <div data-reveal="up" style={revealDelay(450)} className="mt-5 flex flex-wrap items-center gap-4 sm:mt-8">
              <button
                type="button"
                onClick={goNext}
                aria-label={isLast ? 'Chuyển tới phần tiếp theo' : 'Xem ảnh tiếp theo'}
                className="group grid size-12 cursor-pointer place-items-center rounded-full border-2 border-primary/25 bg-surface text-primary-dark transition duration-300 hover:scale-105 hover:border-primary active:scale-95"
              >
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
                </svg>
              </button>
              <p className="text-sm tracking-[0.2em] text-muted tabular-nums" aria-live="polite">
                <span className="font-semibold text-primary-dark">{pad(activeIndex + 1)}</span> / {pad(stories.length)}
              </p>
              <a href={bookingHref} className={`${buttonStyles.primary} ml-auto max-sm:hidden`}>
                <CalendarIcon className="size-5" />
                Đặt lịch gặp bác sĩ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
