import type { Metadata } from 'next'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { BookingSection } from '@/components/sections/BookingSection'
import { Doctors } from '@/components/sections/Doctors'
import { Facilities } from '@/components/sections/Facilities'
import { Hero } from '@/components/sections/Hero'
import { NewsSection } from '@/components/sections/NewsSection'
import { PriceTable } from '@/components/sections/PriceTable'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Testimonials } from '@/components/sections/Testimonials'
// import { WhyUs } from '@/components/sections/WhyUs' // section đang tắt trong trang
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: { absolute: `${site.name} – Chăm sóc nụ cười khỏe đẹp cho cả gia đình` },
  description:
    'Nha Khoa Quy Nhơn: khám tổng quát, răng sứ thẩm mỹ, niềng răng, trồng răng Implant, tẩy trắng răng. Chụp phim CT 3D, tư vấn rõ chi phí. Đặt lịch ngay.',
  alternates: { canonical: '/' },
}

/** JSON-LD chỉ chứa trường đã xác nhận (R-G4): không có địa chỉ, giờ mở cửa. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: site.name,
  url: site.url,
  telephone: site.phone.tel.replace('tel:', ''),
  sameAs: [site.facebook.href],
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.mapsDirections,
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />
      <ServicesGrid />
      {/* <WhyUs /> */}
      <BeforeAfter />
      <Doctors />
      <Facilities />
      {/* <ProcessTimeline /> */}
      <PriceTable />
      {/* <Testimonials /> */}
      <BookingSection />
      <NewsSection />
    </>
  )
}
