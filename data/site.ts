import type { NavItem, SiteConfig } from '@/types'

const lat = 13.8073207
const lng = 109.1473134

/** Nguồn duy nhất cho mọi thông tin liên hệ của phòng khám (R-B2). */
export const site: SiteConfig = {
  name: 'Nha Khoa Quy Nhơn',
  shortDescription:
    'Nha Khoa Quy Nhơn – khám tổng quát, răng sứ thẩm mỹ, niềng răng, trồng răng Implant và tẩy trắng răng. Đặt lịch tư vấn nhanh qua điện thoại hoặc Zalo.',
  // TODO(xac-nhan): Q13 – tắt cờ demo khi khách duyệt và có tên miền chính thức
  isDemo: true,
  // TODO(xac-nhan): Q13 – tên miền chính thức
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  phone: { display: '076 275 6899', tel: 'tel:+84762756899' },
  zalo: { display: 'Zalo 076 275 6899', href: 'https://zalo.me/0762756899' },
  facebook: { display: '/nhakhoaquynhon', href: 'https://www.facebook.com/nhakhoaquynhon' },
  // TODO(xac-nhan): Q1 – địa chỉ đầy đủ dạng chữ
  address: { display: 'Quy Nhơn', confirmed: false },
  // TODO(xac-nhan): Q2 – giờ làm việc
  openingHours: { display: 'Liên hệ để được hẹn giờ', confirmed: false },
  geo: { lat, lng },
  mapsEmbed: `https://www.google.com/maps?q=${lat},${lng}&hl=vi&z=17&output=embed`,
  mapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
  /** Trang địa điểm trên Google Maps (link trong phiếu) – nơi khách xem đánh giá thật */
  mapsPlace:
    'https://www.google.com/maps/place/Nha+Khoa+Quy+Nh%C6%A1n/@13.8073207,109.1447385,17z/data=!3m1!4b1!4m6!3m5!1s0x316f156515ddd7eb:0x665a65ac91fd09a3!8m2!3d13.8073207!4d109.1473134!16s%2Fg%2F11rmt3bw_j',
}

/** Menu của landing page: neo tới các section trong trang chủ. */
export const homeNav: NavItem[] = [
  { label: 'Dịch vụ', href: '/#dich-vu' },
  // { label: 'Vì sao chọn', href: '/#vi-sao-chon' },
  { label: 'Kết quả', href: '/#truoc-sau' },
  { label: 'Bác sĩ', href: '/#doi-ngu' },
  // { label: 'Quy trình', href: '/#quy-trinh' },
  { label: 'Bảng giá', href: '/#bang-gia' },
  { label: 'Kiến thức', href: '/#tin-tuc' },
  { label: 'Liên hệ', href: '/#dat-lich' },
]

export const BOOKING_ANCHOR = 'dat-lich'
/** id của section hero – header dùng để biết đang ở phạm vi hero (menu dồn trái). */
export const HERO_ID = 'trang-chu'
