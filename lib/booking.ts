import { CONSULT_OTHER, services } from '@/data/services'

/** Kiểm tra dữ liệu form đặt lịch – dùng chung cho client và Server Action (mục 9). */

export const PHONE_PATTERN = /^(0|\+84)(3|5|7|8|9)\d{8}$/

export const SESSIONS = [
  { value: 'sang', label: 'Sáng' },
  { value: 'chieu', label: 'Chiều' },
  { value: 'toi', label: 'Tối' },
] as const

export const NOTE_MAX = 500

export type BookingField = 'name' | 'phone' | 'service' | 'date' | 'session' | 'note' | 'consent'

export type BookingErrors = Partial<Record<BookingField, string>>

export interface BookingInput {
  name: string
  phone: string
  service: string
  date: string
  session: string
  note: string
  consent: boolean
}

export function normalizePhone(raw: string): string {
  return raw.replace(/[\s.\-()]/g, '')
}

const serviceValues = new Set<string>([...services.map((s) => s.slug), CONSULT_OTHER.value])
const sessionValues = new Set<string>(SESSIONS.map((s) => s.value))

/** `today` dạng YYYY-MM-DD theo giờ Việt Nam; truyền từ nơi gọi để hàm thuần tuý. */
export function validateBooking(input: BookingInput, today: string): BookingErrors {
  const errors: BookingErrors = {}
  const name = input.name.trim()
  if (name.length < 2 || name.length > 60) errors.name = 'Vui lòng nhập họ tên từ 2 đến 60 ký tự.'

  if (!PHONE_PATTERN.test(normalizePhone(input.phone)))
    errors.phone = 'Số điện thoại di động chưa đúng (ví dụ: 0912 345 678).'

  if (!serviceValues.has(input.service)) errors.service = 'Vui lòng chọn dịch vụ bạn quan tâm.'

  if (input.date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) errors.date = 'Ngày chưa hợp lệ.'
    else if (input.date < today) errors.date = 'Vui lòng chọn ngày từ hôm nay trở đi.'
  }

  if (input.session && !sessionValues.has(input.session)) errors.session = 'Buổi chưa hợp lệ.'

  if (input.note.length > NOTE_MAX) errors.note = `Ghi chú tối đa ${NOTE_MAX} ký tự.`

  if (!input.consent) errors.consent = 'Vui lòng đồng ý để phòng khám liên hệ với bạn.'

  return errors
}

export function readBookingForm(formData: FormData): BookingInput {
  const text = (key: string) => {
    const value = formData.get(key)
    return typeof value === 'string' ? value : ''
  }
  return {
    name: text('name'),
    phone: text('phone'),
    service: text('service'),
    date: text('date'),
    session: text('session'),
    note: text('note'),
    consent: formData.get('consent') === 'on',
  }
}

/** Ngày hôm nay theo múi giờ Việt Nam, dạng YYYY-MM-DD. */
export function todayInVietnam(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export type BookingState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; errors: BookingErrors }
