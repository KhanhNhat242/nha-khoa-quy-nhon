import { buttonStyles } from '@/components/ui/button-styles'
import { ExternalIcon, FacebookIcon, MapPinIcon, QuoteIcon, StarIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BOOKING_ANCHOR, site } from '@/data/site'
import { services } from '@/data/services'
import { testimonials } from '@/data/testimonials'

const sourceLabel = { google: 'Đánh giá Google', facebook: 'Facebook', video: 'Video cảm nhận' } as const

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-accent-dark" role="img" aria-label={`Đánh giá ${rating} trên 5 sao`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={`size-5 ${i < rating ? '' : 'opacity-25'}`} />
      ))}
    </span>
  )
}

/**
 * Social Proof – Cảm nhận khách hàng. Chỉ hiển thị đánh giá THẬT đã được cho phép (Q16).
 * Khi chưa có dữ liệu: dẫn tới đánh giá gốc trên Google Maps & Facebook, không tự viết đánh giá.
 */
export function Testimonials() {
  const hasReviews = testimonials.length > 0

  return (
    <Section id="cam-nhan" tone="blue" labelledBy="cam-nhan-title">
      <SectionHeading
        id="cam-nhan-title"
        eyebrow="Cảm nhận khách hàng"
        title="Khách hàng nói gì về Nha Khoa Quy Nhơn"
        description="Đánh giá thật từ những khách hàng đã thăm khám và điều trị, được trích từ Google Maps và Facebook của phòng khám."
      />

      {hasReviews ? (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((t, index) => (
            <li key={`${t.name}-${index}`} data-reveal="fade-up" style={revealDelay(index * 80)}>
              <figure className="card flex h-full flex-col rounded-3xl p-6 lg:p-7">
                <div className="flex items-center justify-between">
                  {t.rating ? <Stars rating={t.rating} /> : <QuoteIcon className="size-7 text-accent" />}
                  <span className="text-sm text-muted">{sourceLabel[t.source]}</span>
                </div>
                <blockquote className="mt-4 flex-1 text-[1.0625rem] text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <span className="block font-semibold text-primary-dark">{t.name}</span>
                  <span className="block text-sm text-muted">
                    {services.find((s) => s.slug === t.service)?.name}
                  </span>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Xem bản gốc
                    <ExternalIcon className="size-4" />
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <a
            href={site.mapsPlace}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal="fade-up"
            className="group card flex flex-col justify-between gap-8 rounded-3xl p-7 transition duration-300 hover:border-accent hover:shadow-[var(--shadow-lift)] lg:col-span-5 lg:p-9"
          >
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-light text-primary">
                <MapPinIcon className="size-6" />
              </span>
              <p className="mt-6 text-2xl font-bold tracking-[-0.01em] text-primary-dark">Đánh giá trên Google Maps</p>
              <p className="mt-2 text-muted">
                Đọc nhận xét và số sao do chính khách hàng để lại trên trang Google Maps của phòng khám.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold text-primary transition-[gap] group-hover:gap-3">
              Xem đánh giá
              <ExternalIcon className="size-5" />
            </span>
          </a>

          <a
            href={site.facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal="fade-up"
            style={revealDelay(90)}
            className="group card flex flex-col justify-between gap-8 rounded-3xl p-7 transition duration-300 hover:border-accent hover:shadow-[var(--shadow-lift)] lg:col-span-4 lg:p-9"
          >
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-light text-primary">
                <FacebookIcon className="size-6" />
              </span>
              <p className="mt-6 text-2xl font-bold tracking-[-0.01em] text-primary-dark">Cảm nhận trên Facebook</p>
              <p className="mt-2 text-muted">Hình ảnh, video và chia sẻ của khách hàng trên fanpage Nha Khoa Quy Nhơn.</p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold text-primary transition-[gap] group-hover:gap-3">
              Mở fanpage
              <ExternalIcon className="size-5" />
            </span>
          </a>

          <div
            data-reveal="fade-up"
            style={revealDelay(180)}
            className="flex flex-col justify-between gap-6 rounded-3xl bg-primary p-7 text-white lg:col-span-3 lg:p-8"
          >
            <QuoteIcon className="size-9 text-accent" />
            <p className="text-lg font-semibold">Trải nghiệm của bạn là thước đo của chúng tôi.</p>
            <a href={`#${BOOKING_ANCHOR}`} className={`${buttonStyles.white} self-start`}>
              Đặt lịch ngay
            </a>
          </div>
        </div>
      )}
    </Section>
  )
}
