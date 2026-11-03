/**
 * Class nút dùng chung – áp cho <a>, <Link>, <button> (R-C7: một kiểu nút cho cả site).
 * Flat + Soft UI: màu phẳng, bo 12px, chuyển động 200ms, vùng chạm ≥ 48px.
 */
const base =
  'inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold whitespace-nowrap transition duration-200 [&>svg]:shrink-0 disabled:cursor-not-allowed disabled:opacity-60'

export const buttonStyles = {
  primary: `${base} bg-primary text-white hover:bg-primary-dark`,
  outline: `${base} border-2 border-primary/20 bg-surface text-primary hover:border-primary hover:bg-primary-light`,
  white: `${base} bg-surface text-primary-dark hover:bg-primary-light`,
  ghostLight: `${base} border border-white/40 text-white hover:bg-white/10`,
} as const
