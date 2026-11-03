import { BOOKING_ANCHOR } from '@/data/site'

/** Sự kiện trình duyệt để chọn sẵn dịch vụ trong form đặt lịch trên cùng trang. */
export const SELECT_SERVICE_EVENT = 'nkqn:chon-dich-vu'

export function selectService(slug: string): void {
  window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: slug }))
  document.getElementById(BOOKING_ANCHOR)?.scrollIntoView({ block: 'start' })
}
