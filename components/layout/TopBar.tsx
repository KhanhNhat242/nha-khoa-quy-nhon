import { Container } from '@/components/ui/Container'
import { ClockIcon, FacebookIcon, MapPinIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'
import { site } from '@/data/site'

const item = 'min-h-11 items-center gap-2 transition hover:text-white'

/** Thanh trên cùng: địa chỉ · giờ làm việc · hotline (mục 8.1). Không dính khi cuộn. */
export function TopBar() {
  return (
    <div className="bg-primary-dark text-sm text-white/90">
      <Container className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6">
          <a
            href={site.mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} hidden md:inline-flex`}
          >
            <MapPinIcon className="size-4 shrink-0 text-accent" />
            {site.address.display} · Chỉ đường
          </a>
          <span className="inline-flex min-h-11 min-w-0 items-center gap-2">
            <ClockIcon className="size-4 shrink-0 text-accent" />
            <span className="truncate">{site.openingHours.display}</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-5">
          <a href={site.phone.tel} className={`${item} inline-flex font-semibold whitespace-nowrap text-white`}>
            <PhoneIcon className="size-4 text-accent" />
            <span className="hidden sm:inline">Hotline:</span> {site.phone.display}
          </a>
          <a
            href={site.zalo.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} hidden md:inline-flex`}
            aria-label="Nhắn Zalo Nha Khoa Quy Nhơn"
          >
            <ZaloIcon className="size-5" />
          </a>
          <a
            href={site.facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} hidden md:inline-flex`}
            aria-label="Facebook Nha Khoa Quy Nhơn"
          >
            <FacebookIcon className="size-4" />
          </a>
        </div>
      </Container>
    </div>
  )
}
