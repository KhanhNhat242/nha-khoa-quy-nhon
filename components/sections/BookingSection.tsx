import { BookingForm } from '@/components/forms/BookingForm'
import { buttonStyles } from '@/components/ui/button-styles'
import { ClockIcon, FacebookIcon, MapPinIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { BOOKING_ANCHOR, site } from '@/data/site'

const contactRow = 'flex min-h-12 min-w-0 items-center gap-4 rounded-xl px-2 transition hover:bg-primary-light'
const iconWrap = 'grid size-11 shrink-0 place-items-center rounded-xl bg-accent-light text-accent-dark'

export function BookingSection() {
  return (
    <Section id={BOOKING_ANCHOR} labelledBy="dat-lich-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Form đặt lịch */}
        <div data-reveal="fade-up" className="min-w-0 overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-soft)]">
          <div className="bg-primary px-6 py-7 text-white sm:px-8 sm:py-8">
            <div>
              <Eyebrow tone="light">Đặt lịch hẹn</Eyebrow>
              <h2 id="dat-lich-title" className="mt-4 text-[1.875rem] leading-tight font-bold tracking-[-0.02em] sm:text-[2.25rem]">
                Đặt Lịch Khám Cùng Bác Sĩ
              </h2>
              <p className="mt-3 max-w-md text-white/90">
                Để lại thông tin, phòng khám sẽ liên hệ xác nhận lịch hẹn phù hợp nhất cho bạn.
              </p>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <BookingForm />
          </div>
        </div>

        {/* Bản đồ + liên hệ */}
        <div data-reveal="fade-up" className="flex min-w-0 flex-col gap-6" style={revealDelay(120)}>
          <div className="card relative overflow-hidden rounded-3xl p-0">
            <iframe
              title={`Bản đồ đường đến ${site.name}`}
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-[4/3] w-full border-0 lg:aspect-[16/11]"
            />
          </div>

          <div className="card rounded-3xl p-4 sm:p-6">
            <ul className="grid grid-cols-1 gap-1">
              <li>
                <a href={site.phone.tel} className={contactRow}>
                  <span className={iconWrap}>
                    <PhoneIcon className="size-5" />
                  </span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    <span className="block text-sm text-muted">Hotline</span>
                    <span className="block font-bold text-primary-dark">{site.phone.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={site.zalo.href} target="_blank" rel="noopener noreferrer" className={contactRow}>
                  <span className={iconWrap}>
                    <ZaloIcon className="size-6" />
                  </span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    <span className="block text-sm text-muted">Nhắn tin Zalo</span>
                    <span className="block font-bold text-primary-dark">{site.zalo.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={site.facebook.href} target="_blank" rel="noopener noreferrer" className={contactRow}>
                  <span className={iconWrap}>
                    <FacebookIcon className="size-5" />
                  </span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    <span className="block text-sm text-muted">Facebook</span>
                    <span className="block font-bold text-primary-dark">facebook.com{site.facebook.display}</span>
                  </span>
                </a>
              </li>
              <li className={`${contactRow} hover:bg-transparent`}>
                <span className={iconWrap}>
                  <MapPinIcon className="size-5" />
                </span>
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  <span className="block text-sm text-muted">Địa chỉ</span>
                  <span className="block font-semibold text-ink">{site.address.display} – xem vị trí trên bản đồ</span>
                </span>
              </li>
              <li className={`${contactRow} hover:bg-transparent`}>
                <span className={iconWrap}>
                  <ClockIcon className="size-5" />
                </span>
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  <span className="block text-sm text-muted">Giờ làm việc</span>
                  <span className="block font-semibold text-ink">{site.openingHours.display}</span>
                </span>
              </li>
            </ul>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href={site.mapsDirections} target="_blank" rel="noopener noreferrer" className={buttonStyles.primary}>
                <MapPinIcon className="size-5" />
                Chỉ đường
              </a>
              <a href={site.phone.tel} className={buttonStyles.outline}>
                <PhoneIcon className="size-5" />
                Gọi ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
