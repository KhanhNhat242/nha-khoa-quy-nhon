import Image from 'next/image'
import { buttonStyles } from '@/components/ui/button-styles'
import { CalendarIcon, CheckIcon, PhoneIcon, ShieldIcon } from '@/components/ui/Icons'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { getImage } from '@/data/gallery'
import { BOOKING_ANCHOR, site } from '@/data/site'

const highlights = ['Chụp phim CT 3D', 'Tư vấn rõ chi phí', 'Theo dõi sau điều trị']

/**
 * Hero-Centric: chữ trái trên nền trắng, ảnh thật tràn nửa phải và cao hết màn hình đầu
 * (thanh trên cùng 2.75rem + header 4.5rem + hero = 100svh).
 */
export function Hero() {
  const main = getImage('heroBacSiThaTim')
  const ct = getImage('ct3dHam')

  return (
    <section aria-labelledby="hero-title" className="relative bg-surface lg:min-h-[calc(100svh-7.25rem)]">
      <Container className="grid lg:min-h-[calc(100svh-7.25rem)] lg:grid-cols-12 lg:items-center">
        <div className="py-10 sm:py-14 lg:col-span-6 lg:py-16 lg:pr-8 xl:pr-12">
          <div className="hero-rise">
            <Eyebrow>Nha Khoa Uy Tín Quy Nhơn</Eyebrow>
          </div>

          <h1
            id="hero-title"
            className="hero-rise mt-6 text-[2.375rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-primary-dark [--rise-delay:80ms] sm:text-[3.25rem] lg:text-[3.5rem] xl:text-[4rem]"
          >
            Chăm Sóc{' '}
            <span className="relative isolate whitespace-nowrap text-primary">
              Nụ Cười Khỏe Đẹp
              <span className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.32em] bg-accent-light" aria-hidden="true" />
            </span>{' '}
            Cho Cả Gia Đình
          </h1>

          <p className="hero-rise mt-6 max-w-xl text-lg text-pretty text-muted [--rise-delay:160ms] sm:text-xl sm:leading-relaxed">
            Thăm khám tận tâm cùng đội ngũ bác sĩ và hệ thống chẩn đoán hình ảnh 3D hiện đại, tư vấn rõ ràng từng bước
            ngay tại Quy Nhơn.
          </p>

          <div className="hero-rise mt-8 flex flex-col gap-3 [--rise-delay:240ms] sm:flex-row">
            <a href={`#${BOOKING_ANCHOR}`} className={`${buttonStyles.primary} min-h-14 px-7 text-[1.0625rem]`}>
              <CalendarIcon className="size-5" />
              Đặt lịch tư vấn
            </a>
            <a href={site.phone.tel} className={`${buttonStyles.outline} min-h-14 px-7 text-[1.0625rem]`}>
              <PhoneIcon className="size-5" />
              Gọi ngay {site.phone.display}
            </a>
          </div>

          <ul className="hero-rise mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6 [--rise-delay:320ms]">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.9375rem] font-medium whitespace-nowrap text-ink">
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-accent text-white">
                  <CheckIcon className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Ảnh thật tràn sát mép phải; mobile: ảnh tràn hết bề ngang dưới phần chữ */}
      <div className="hero-rise relative aspect-[4/5] w-full overflow-hidden bg-primary-light [--rise-delay:120ms] sm:aspect-[16/11] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[46%] lg:rounded-bl-[2.5rem]">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          preload
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover object-[50%_35%]"
        />

        {/* Nhãn kính mờ điểm xuyết trên ảnh thật */}
        <div className="glass absolute bottom-5 left-4 flex max-w-[20rem] items-center gap-3 rounded-2xl p-2.5 pr-4 sm:left-6 lg:bottom-10 lg:left-8">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-ink">
            <Image src={ct.src} alt={ct.alt} fill sizes="56px" className="object-cover" />
          </div>
          <div className="leading-snug">
            <span className="flex items-center gap-1.5 text-[0.9375rem] font-bold whitespace-nowrap text-primary-dark">
              <ShieldIcon className="size-4 text-accent-dark" />
              Chẩn đoán hình ảnh 3D
            </span>
            <span className="mt-0.5 block text-[0.8125rem] text-muted">Quan sát rõ xương hàm, chân răng</span>
          </div>
        </div>
      </div>
    </section>
  )
}
