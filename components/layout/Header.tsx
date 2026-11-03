import { buttonStyles } from '@/components/ui/button-styles'
import { CalendarIcon, PhoneIcon } from '@/components/ui/Icons'
import { BOOKING_ANCHOR, homeNav, site } from '@/data/site'
import { HeaderShell } from './HeaderShell'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

export function Header() {
  return (
    <HeaderShell>
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-1 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Logo />

        {/*
          Menu (≥1280px): đặt tuyệt đối trong hàng header.
          - Trong hero: dồn trái ngay sau logo (left 13rem = lề 2rem + logo ~9.25rem + khoảng cách), dạng viên thuốc có viền.
          - Ra khỏi hero: trượt về giữa (left 50% + dịch -50%). Chỉ animate `left`/`translate` của riêng phần tử này.
        */}
        <nav
          aria-label="Menu chính"
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[hero=true]/header:left-52 group-data-[hero=true]/header:translate-x-0 group-data-[ready=true]/header:transition-[left,translate] group-data-[ready=true]/header:duration-700 motion-reduce:!transition-none xl:block"
        >
          <ul className="flex items-center gap-1 rounded-full border border-transparent px-1.5 transition-[background-color,border-color] duration-500 group-data-[hero=true]/header:border-line group-data-[hero=true]/header:bg-canvas">
            {homeNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium text-ink transition-colors after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:text-primary hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <a
            href={site.phone.tel}
            className="hidden items-center gap-2.5 rounded-full py-1 pr-2 text-left lg:flex"
            aria-label={`Gọi hotline ${site.phone.display}`}
          >
            <span className="grid size-10 place-items-center rounded-xl bg-accent-light text-accent-dark">
              <PhoneIcon className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-muted">Hotline</span>
              <span className="block font-bold text-primary-dark">{site.phone.display}</span>
            </span>
          </a>
          <a
            href={site.phone.tel}
            className="grid size-11 place-items-center rounded-xl text-primary hover:bg-primary-light lg:hidden"
            aria-label={`Gọi hotline ${site.phone.display}`}
          >
            <PhoneIcon className="size-5" />
          </a>
          <a href={`#${BOOKING_ANCHOR}`} className={`${buttonStyles.primary} min-h-11 px-4 text-sm whitespace-nowrap sm:px-5 sm:text-base`}>
            <CalendarIcon className="hidden size-5 sm:block" />
            Đặt lịch
          </a>
          <MobileMenu />
        </div>
      </div>
    </HeaderShell>
  )
}
