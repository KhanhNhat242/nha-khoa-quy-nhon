import { BookingForm } from '@/components/forms/BookingForm'
import { buttonStyles } from '@/components/ui/button-styles'
import { Container } from '@/components/ui/Container'
import { ArrowRightIcon, ClockIcon, FacebookIcon, MapPinIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'
import { BOOKING_ANCHOR, site } from '@/data/site'

const infoRow = 'flex min-h-11 min-w-0 items-center gap-3 text-white/85 [overflow-wrap:anywhere]'

/**
 * Đặt lịch – 2 cột trên nền `primary-dark` (cùng token với thanh trên cùng & footer):
 * trái là lời mời + hotline cỡ lớn + Gọi/Zalo + địa chỉ, giờ, bản đồ (R-F3); phải là thẻ form nền trắng.
 * Focus ring trên nền đậm đổi sang trắng để vẫn nhìn thấy (R-C8).
 */
export function BookingSection() {
  return (
    <section id={BOOKING_ANCHOR} aria-labelledby="dat-lich-title" className="bg-primary-dark py-14 text-white md:py-20 lg:py-24">
      <Container>
        {/* Desktop: [lời mời + hotline / địa chỉ + bản đồ] | form cao suốt 2 hàng. Mobile: lời mời → form → địa chỉ + bản đồ */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8">
          {/* Trái trên: lời mời + hotline + Gọi/Zalo */}
          <div data-reveal="fade-up" className="min-w-0 lg:col-span-5 lg:row-start-1 [&_:focus-visible]:outline-white">
            <h2 id="dat-lich-title" className="text-[2rem] leading-[1.15] font-bold tracking-[-0.02em] text-balance sm:text-[2.5rem]">
              Đặt lịch thăm khám tại {site.name}
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/85">
              Để lại thông tin, phòng khám sẽ gọi lại để xác nhận giờ hẹn với bạn. Cần tư vấn ngay, bạn gọi hotline hoặc nhắn Zalo.
            </p>

            <div className="mt-8 border-t border-white/15 pt-8">
              <p className="text-sm font-semibold tracking-[0.14em] text-white/75 uppercase">Hotline</p>
              <a
                href={site.phone.tel}
                className="mt-1 inline-block text-[2.5rem] leading-tight font-extrabold tracking-[-0.02em] tabular-nums hover:text-accent-light sm:text-5xl"
              >
                {site.phone.display}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={site.phone.tel} className={buttonStyles.white}>
                  <PhoneIcon className="size-5" />
                  Gọi ngay
                </a>
                <a href={site.zalo.href} target="_blank" rel="noopener noreferrer" className={buttonStyles.ghostLight}>
                  <ZaloIcon className="size-5" />
                  Chat Zalo
                </a>
              </div>
            </div>
          </div>

          {/* Trái dưới: địa chỉ, giờ, Facebook + bản đồ (R-F3) */}
          <div data-reveal="fade-up" className="order-last min-w-0 lg:order-none lg:col-span-5 lg:row-start-2 [&_:focus-visible]:outline-white">

            <div className="mt-6 overflow-hidden rounded-2xl bg-primary ring-1 ring-white/15">
              <iframe
                title={`Bản đồ đường đến ${site.name}`}
                src={site.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[16/9] w-full border-0 lg:aspect-[5/2]"
              />
            </div>
            <a
              href={site.mapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-white transition-[gap] hover:gap-3"
            >
              Chỉ đường trên Google Maps
              <ArrowRightIcon className="size-5" />
            </a>
          </div>

          {/* Cột phải: thẻ form nền trắng */}
          <div
            data-reveal="fade-up"
            style={revealDelay(120)}
            className="min-w-0 self-start rounded-3xl bg-surface p-6 text-ink shadow-[var(--shadow-lift)] sm:p-8 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:p-10"
          >
            <h3 className="text-2xl font-bold text-primary-dark">Thông tin đặt lịch</h3>
            <p className="mt-1 mb-7 text-[0.9375rem] text-muted">
              Các mục có dấu <span className="font-semibold text-danger">*</span> là bắt buộc.
            </p>
            <BookingForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
