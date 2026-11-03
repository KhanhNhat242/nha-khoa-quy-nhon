import Image from 'next/image'
import { ConsultLink } from '@/components/ui/ConsultLink'
import { ArrowRightIcon, PhoneIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getImage } from '@/data/gallery'
import { PRICE_NOTE, startingPrice } from '@/data/prices'
import { services } from '@/data/services'
import { site } from '@/data/site'
import { formatPrice } from '@/lib/format'
import type { Service } from '@/types'

/** Dịch vụ được phóng to trong lưới Bento (theo brief: Răng sứ & Implant). */
const featured = new Set<Service['slug']>(['rang-su-tham-my', 'trong-rang-implant'])

/** Bento Box Grid: lưới 12 cột, giữ đúng thứ tự 5 dịch vụ (R-B7), thẻ lớn/nhỏ xen kẽ. */
export function ServicesGrid() {
  return (
    <Section id="dich-vu" tone="canvas" labelledBy="dich-vu-title">
      <SectionHeading
        id="dich-vu-title"
        eyebrow="Dịch vụ chính"
        title="Giải Pháp Nha Khoa Toàn Diện & An Toàn"
        description="Từ khám định kỳ đến phục hình và thẩm mỹ, mỗi dịch vụ đều bắt đầu bằng thăm khám kỹ và kế hoạch điều trị phù hợp riêng với bạn."
      />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} large={featured.has(service.slug)} />
        ))}

        {/* Ô gọi tư vấn – màu phẳng */}
        <li data-reveal="fade-up" style={revealDelay(5 * 70)} className="lg:col-span-4">
          <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-primary p-7 text-white">
            <div>
              <p className="text-xl font-bold">Chưa chắc mình cần dịch vụ nào?</p>
              <p className="mt-2 text-white/85">Bác sĩ sẽ thăm khám và tư vấn hướng điều trị phù hợp cho bạn.</p>
            </div>
            <a
              href={site.phone.tel}
              className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-surface px-6 font-semibold text-primary-dark transition hover:bg-primary-light"
            >
              <PhoneIcon className="size-5" />
              Gọi {site.phone.display}
            </a>
          </div>
        </li>

        {/* Ô bảng giá */}
        <li data-reveal="fade-up" style={revealDelay(6 * 70)} className="md:col-span-2 lg:col-span-4">
          <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-line bg-surface p-7">
            <div>
              <p className="text-xl font-bold text-primary-dark">Minh bạch chi phí</p>
              <p className="mt-2 text-[0.9375rem] text-muted">{PRICE_NOTE}</p>
            </div>
            <a
              href="#bang-gia"
              className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-primary transition-[gap] hover:gap-3"
            >
              Xem bảng giá tham khảo
              <ArrowRightIcon className="size-5" />
            </a>
          </div>
        </li>
      </ul>
    </Section>
  )
}

function ServiceCard({ service, index, large }: { service: Service; index: number; large: boolean }) {
  const image = getImage(service.image)
  const price = startingPrice(service.slug)

  return (
    <li data-reveal="fade-up" style={revealDelay(index * 70)} className={large ? 'lg:col-span-8' : 'lg:col-span-4'}>
      <article
        className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-soft)] transition duration-300 hover:border-accent hover:shadow-[var(--shadow-lift)] ${
          large ? 'lg:flex-row' : ''
        }`}
      >
        <div
          className={`relative shrink-0 overflow-hidden bg-ink ${
            large ? 'aspect-[16/10] lg:aspect-auto lg:min-h-80 lg:w-[55%]' : 'aspect-[16/10]'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={large ? '(min-width: 1024px) 460px, (min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw'}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute top-4 left-4 rounded-lg bg-surface px-2.5 py-1 text-sm font-bold text-primary-dark tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className={`flex flex-1 flex-col ${large ? 'p-7 lg:p-9' : 'p-6 lg:p-7'}`}>
          <h3 className={`font-bold tracking-[-0.01em] text-primary-dark ${large ? 'text-2xl lg:text-[1.75rem]' : 'text-xl'}`}>
            {service.name}
          </h3>
          <p className={`mt-3 text-muted ${large ? 'lg:text-lg' : ''}`}>{service.summary}</p>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-3 pt-6">
            {price !== null ? (
              <p className="leading-tight">
                <span className="block text-sm text-muted">Giá tham khảo từ</span>
                <span className="text-xl font-bold text-primary tabular-nums">{formatPrice(price)}</span>
              </p>
            ) : null}
            <ConsultLink
              service={service.slug}
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary transition-[gap] group-hover:gap-3"
              ariaLabel={`Đặt lịch tư vấn ${service.name}`}
            >
              Tư vấn dịch vụ này
              <ArrowRightIcon className="size-5" />
            </ConsultLink>
          </div>
        </div>
      </article>
    </li>
  )
}
