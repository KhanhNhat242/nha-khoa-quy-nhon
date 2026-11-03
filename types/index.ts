export type ServiceSlug =
  | 'kham-nha-khoa-tong-quat'
  | 'rang-su-tham-my'
  | 'nieng-rang-chinh-nha'
  | 'trong-rang-implant'
  | 'tay-trang-rang'

export type GalleryCategory = 'phong-kham' | 'doi-ngu' | 'ca-dieu-tri' | 'thiet-bi' | 'hoat-dong'

export type Privacy = 'none' | 'covered' | 'mouth-only' | 'face-visible'

export interface GalleryImage {
  src: string
  alt: string
  category: GalleryCategory
  service?: ServiceSlug
  privacy: Privacy
  width: number
  height: number
}

export interface SiteConfig {
  name: string
  shortDescription: string
  isDemo: boolean
  url: string
  phone: { display: string; tel: string }
  zalo: { display: string; href: string }
  facebook: { display: string; href: string }
  address: { display: string; confirmed: boolean }
  openingHours: { display: string; confirmed: boolean }
  geo: { lat: number; lng: number }
  mapsEmbed: string
  mapsDirections: string
  mapsPlace: string
}

export interface Service {
  slug: ServiceSlug
  name: string
  summary: string
  image: string
}

export interface Usp {
  title: string
  description: string
  image: string
}

export interface BeforeAfterCase {
  id: string
  before: string
  after: string
  condition: string
  solution: string
  service: ServiceSlug
}

export interface Facility {
  image: string
  title: string
  description: string
}

export interface Testimonial {
  name: string
  service: ServiceSlug
  quote: string
  source: 'google' | 'facebook' | 'video'
  /** Số sao gốc trên Google (1–5), chỉ có với nguồn google */
  rating?: number
  url: string
}

export interface Doctor {
  name: string
  title: string
  specialty: string
  /** null = chưa có thông tin xác nhận – hiển thị "Đang cập nhật", không tự điền (R-B1) */
  experience: string | null
  license: string | null
  strengths: string
  isSample: boolean
}

export interface ProcessStep {
  title: string
  description: string
}

export interface PriceItem {
  name: string
  price: number
  from?: boolean
  /** Dịch vụ đi kèm (vd. ghép xương) – không dùng để tính giá "từ…" của dịch vụ chính */
  addon?: boolean
  unit: string
  warranty: string
}

export interface PriceGroup {
  service: ServiceSlug
  items: PriceItem[]
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
  body: { heading?: string; paragraphs: string[] }[]
}

export interface NavItem {
  label: string
  href: string
}

/** Một thẻ trong carousel "Đội ngũ bác sĩ" (cuộn để xem từng ảnh). */
export interface TeamStory {
  label: string
  title: string
  description: string
  /** Khoá ảnh trong data/gallery.ts */
  image: string
  /** object-position giữ chủ thể nằm trong khung khi ảnh bị cắt (class Tailwind) */
  position: string
}
