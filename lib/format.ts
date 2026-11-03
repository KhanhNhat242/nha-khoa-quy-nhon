/** Định dạng giá: 1500000 → "1.500.000đ" (R-B6). */
export function formatPrice(value: number): string {
  const digits = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${digits}đ`
}

/** "2026-10-28" → "28/10/2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
