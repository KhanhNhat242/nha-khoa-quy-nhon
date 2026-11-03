import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { ConsultLink } from '@/components/ui/ConsultLink'
import { ArrowRightIcon, PhoneIcon } from '@/components/ui/Icons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getImage } from '@/data/gallery'
import { PRICE_NOTE, startingPrice } from '@/data/prices'
import { services } from '@/data/services'
import { site } from '@/data/site'
import { formatPrice } from '@/lib/format'
import type { Service } from '@/types'
import { ServicesCarousel } from './ServicesCarousel'

/** Dịch vụ được làm thẻ rộng hơn trong carousel (theo brief: Răng sứ & Implant). */
const featured = new Set<Service['slug']>(['rang-su-tham-my', 'trong-rang-implant'])

/** Kích thước thẻ: dùng min-height (không cố định) để chữ không bao giờ bị cắt; các thẻ trong dải cao bằng nhau (flex stretch). */
const slideBase =
  'group relative isolate flex shrink-0 snap-center flex-col justify-end overflow-hidden rounded-3xl bg-ink text-white min-h-[26rem] lg:min-h-[clamp(15rem,calc(100svh-27rem),28rem)]'
const slideWidth = { normal: 'w-[min(19rem,80vw)] lg:w-[21rem]', wide: 'w-[min(19rem,80vw)] sm:w-[26rem] lg:w-[30rem]' }

/**
 * 5 dịch vụ dạng carousel ngang (giữ đúng thứ tự R-B7): mỗi thẻ lấy ảnh minh hoạ làm nền, chữ trắng đè lên trên
 * lớp phủ tối dần từ dưới lên (đảm bảo tương phản ≥ 4.5:1 cho chữ trắng – R-C8). Desktop: cuộn trang để trượt
 * carousel (xem ServicesCarousel); mobile: vuốt ngang.
 */
export function ServicesGrid() {
  const reception = getImage('doiNguTiepDon')

  return (
    <section id="dich-vu" aria-labelledby="dich-vu-title" className="bg-canvas">
      <ServicesCarousel
        heading={
          <Container>
            <SectionHeading
              id="dich-vu-title"
              eyebrow="Dịch vụ"
              title="Mọi dịch vụ đều bắt đầu từ một buổi thăm khám"
              description="Bác sĩ khám, chụp phim khi cần, rồi mới lên kế hoạch điều trị và báo chi phí để bạn cân nhắc."
              className="lg:mb-8"
            />
          </Container>
        }
        footer={
          <p className="mt-4 flex flex-col gap-2 text-[0.9375rem] text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>{PRICE_NOTE}</span>
            <a
              href="#bang-gia"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-primary transition-[gap] hover:gap-3"
            >
              Xem bảng giá
              <ArrowRightIcon className="size-5" />
            </a>
          </p>
        }
      >
        {services.map((service) => (
          <ServiceSlide key={service.slug} service={service} wide={featured.has(service.slug)} />
        ))}

        {/* Thẻ cuối: gọi tư vấn – ảnh thật đội ngũ tiếp đón, phủ màu thương hiệu */}
        <li data-slide className={`${slideBase} ${slideWidth.normal}`}>
          <Image
            src={reception.src}
            alt={reception.alt}
            fill
            sizes="(min-width: 1024px) 336px, 80vw"
            className="-z-20 object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 -z-10 bg-primary/85" aria-hidden="true" />
          <div className="p-6 lg:p-7">
            <p className="text-2xl font-bold tracking-[-0.01em]">Chưa chắc mình cần dịch vụ nào?</p>
            <p className="mt-3 text-white/90">
              Gọi cho phòng khám và kể tình trạng răng của bạn, chúng tôi sẽ hẹn giờ để bác sĩ khám và tư vấn.
            </p>
            <a
              href={site.phone.tel}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-surface px-6 font-semibold text-primary-dark transition hover:bg-primary-light"
            >
              <PhoneIcon className="size-5" />
              Gọi {site.phone.display}
            </a>
          </div>
        </li>
      </ServicesCarousel>
    </section>
  )
}

function ServiceSlide({ service, wide }: { service: Service; wide: boolean }) {
  const image = getImage(service.image)
  const price = startingPrice(service.slug)

  return (
    <li data-slide className={`${slideBase} ${wide ? slideWidth.wide : slideWidth.normal}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={wide ? '(min-width: 1024px) 480px, (min-width: 640px) 416px, 80vw' : '(min-width: 1024px) 336px, 80vw'}
        className="-z-20 object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      {/* Lớp phủ chức năng cho tương phản chữ (không phải trang trí) – tối dần từ dưới lên */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/95 via-ink/60 to-ink/5" aria-hidden="true" />

      <article className="p-6 lg:p-7">
        <h3 className={`font-bold tracking-[-0.01em] ${wide ? 'text-2xl lg:text-[1.75rem]' : 'text-xl lg:text-2xl'}`}>
          {service.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.9375rem] text-white/90 [@media(max-height:700px)]:line-clamp-2">{service.summary}</p>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-white/20 pt-4">
          {price !== null ? (
            <p className="leading-tight">
              <span className="block text-sm whitespace-nowrap text-white/80">Giá tham khảo từ</span>
              <span className="text-xl font-bold tabular-nums">{formatPrice(price)}</span>
            </p>
          ) : null}
          <ConsultLink
            service={service.slug}
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-white transition-[gap] group-hover:gap-3"
            ariaLabel={`Đặt lịch tư vấn ${service.name}`}
          >
            Tư vấn
            <ArrowRightIcon className="size-5" />
          </ConsultLink>
        </div>
      </article>
    </li>
  )
}
