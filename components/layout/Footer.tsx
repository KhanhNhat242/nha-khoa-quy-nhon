import { ConsultLink } from '@/components/ui/ConsultLink'
import { Container } from '@/components/ui/Container'
import { ClockIcon, FacebookIcon, MapPinIcon, PhoneIcon, ZaloIcon } from '@/components/ui/Icons'
import { services } from '@/data/services'
import { homeNav, site } from '@/data/site'
import { CopyrightYear } from './CopyrightYear'
import { Logo } from './Logo'

const linkClass = 'inline-flex min-h-11 items-center gap-3 text-white/80 transition hover:text-white'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-dark pb-24 text-white/80 md:pb-0">
      <Container className="relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-16">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-[0.9375rem] text-white/75">
            Phòng khám nha khoa tại Quy Nhơn, đồng hành chăm sóc nụ cười cho bạn và cả gia đình bằng sự tận tâm và quy
            trình rõ ràng.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Nha Khoa Quy Nhơn"
              className="grid size-11 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={site.zalo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nhắn Zalo Nha Khoa Quy Nhơn"
              className="grid size-11 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            >
              <ZaloIcon className="size-6" />
            </a>
          </div>
        </div>

        <nav aria-labelledby="footer-menu">
          <h2 id="footer-menu" className="text-base font-semibold text-white">
            Liên kết nhanh
          </h2>
          <ul className="mt-3">
            {homeNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="text-base font-semibold text-white">
            Dịch vụ
          </h2>
          <ul className="mt-3">
            {services.map((service) => (
              <li key={service.slug}>
                <ConsultLink service={service.slug} className={linkClass}>
                  {service.name}
                </ConsultLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base font-semibold text-white">Liên hệ</h2>
          <ul className="mt-3">
            <li>
              <a href={site.phone.tel} className={linkClass}>
                <PhoneIcon className="size-5 shrink-0 text-accent" />
                Hotline: <strong className="font-semibold text-white">{site.phone.display}</strong>
              </a>
            </li>
            <li>
              <a href={site.zalo.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <ZaloIcon className="size-5 shrink-0 text-accent" />
                {site.zalo.display}
              </a>
            </li>
            <li>
              <a href={site.facebook.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <FacebookIcon className="size-5 shrink-0 text-accent" />
                facebook.com{site.facebook.display}
              </a>
            </li>
            <li>
              <a href={site.mapsDirections} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <MapPinIcon className="size-5 shrink-0 text-accent" />
                {site.address.display} · Chỉ đường
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-3">
              <ClockIcon className="size-5 shrink-0 text-accent" />
              {site.openingHours.display}
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. Bảo lưu mọi quyền.
          </p>
          {site.isDemo ? <p>Bản demo – một số thông tin đang chờ phòng khám xác nhận.</p> : null}
        </Container>
      </div>
    </footer>
  )
}
