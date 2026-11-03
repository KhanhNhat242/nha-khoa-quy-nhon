import Link from 'next/link'
import { ToothIcon } from '@/components/ui/Icons'
import { site } from '@/data/site'

/** Wordmark chữ "Nha Khoa Quy Nhơn" (R-C1 – khách chưa có file logo). */
export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const light = tone === 'light'
  return (
    <Link href="/" className="group inline-flex min-h-11 items-center gap-2 sm:gap-2.5" aria-label={`${site.name} – Trang chủ`}>
      <span
        className={`grid size-9 shrink-0 place-items-center rounded-xl sm:size-10 transition group-hover:rotate-[-6deg] ${
          light ? 'bg-white/10 text-white ring-1 ring-white/25' : 'bg-primary text-white'
        }`}
      >
        <ToothIcon className="size-5 sm:size-6" />
      </span>
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span
          className={`text-[0.6875rem] font-semibold tracking-[0.22em] uppercase ${light ? 'text-white/75' : 'text-accent-dark'}`}
        >
          Nha Khoa
        </span>
        <span className={`mt-1 text-lg font-extrabold tracking-[-0.02em] sm:text-xl ${light ? 'text-white' : 'text-primary-dark'}`}>
          Quy Nhơn
        </span>
      </span>
    </Link>
  )
}
