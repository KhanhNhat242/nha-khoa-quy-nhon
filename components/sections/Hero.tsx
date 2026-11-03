import Image from 'next/image'
import { buttonStyles } from '@/components/ui/button-styles'
import { CalendarIcon, PhoneIcon } from '@/components/ui/Icons'
import { Container } from '@/components/ui/Container'
import { RisingInk, type InkSegment } from '@/components/ui/RisingInk'
import { getImage } from '@/data/gallery'
import { BOOKING_ANCHOR, HERO_ID, site } from '@/data/site'

/**
 * Hero-Centric trên nền loang sáng (`.hero-wash` – ngoại lệ gradient chỉ cho hero, mục 6.1).
 * Desktop: lưới 3 hàng `1fr / auto / 1fr` → tiêu đề luôn nằm giữa màn hình theo chiều dọc.
 * Hàng trên: mô tả (trái, sát tiêu đề) · ảnh thật cỡ nhỏ đặt tuyệt đối góc trên phải (không đẩy lệch hàng).
 * Hàng dưới: 2 CTA ngay dưới tiêu đề, căn trái cùng mép chữ. Cao vừa 1 màn hình (thanh trên cùng 2.75rem + header 4.5rem), tối đa 48rem để màn desktop lớn không bị hero cao quá.
 * Mobile: tiêu đề → mô tả → CTA → ảnh.
 * Hiệu ứng chữ tự viết (không thêm thư viện – R-E1): Rising Ink cho tiêu đề, Luminous Type (`.luminous-type`) cho mô tả.
 * Tiêu đề in hoa cần line-height ≥ 1.14 để dấu tiếng Việt (Ụ, Ả, Ì) không chạm dòng kề.
 * `id={HERO_ID}` được HeaderShell dùng để biết đang ở phạm vi hero (menu dồn trái).
 */
const titleSegments: InkSegment[] = [
  { text: 'Nụ cười ' },
  { text: 'khỏe đẹp', highlight: true },
  { break: true },
  { text: ' cho cả gia đình' },
]

export function Hero() {
  const photo = getImage('heroDieuTri')

  return (
    <section
      id={HERO_ID}
      aria-labelledby="hero-title"
      // Kéo lên nằm dưới header (h-16 / lg:h-[4.5rem]) để header trong suốt hoà vào nền loang
      className="hero-wash -mt-16 pt-16 lg:-mt-[4.5rem] lg:pt-[4.5rem]"
    >
      <Container className="relative grid grid-cols-1 gap-y-7 pt-10 pb-14 sm:pt-14 sm:pb-16 lg:min-h-[min(calc(100svh-7.25rem),48rem)] lg:grid-cols-12 lg:grid-rows-[1fr_auto_1fr] lg:gap-x-8 lg:gap-y-0 lg:py-8">
        {/* Luminous Type: vệt sáng trôi qua đoạn mô tả. Wrapper giữ animation hero-rise, <p> giữ animation vệt sáng */}
        <div className="hero-rise order-2 [--rise-delay:160ms] lg:order-none lg:col-span-5 lg:row-start-1 lg:self-end lg:pb-6">
          <p className="luminous-type max-w-xl text-lg text-pretty sm:text-xl sm:leading-relaxed">
            Thăm khám tận tâm cùng đội ngũ bác sĩ và hệ thống chẩn đoán hình ảnh 3D hiện đại, tư vấn rõ ràng từng bước
            ngay tại Quy Nhơn.
          </p>
        </div>

        {/* Ảnh thật cỡ nhỏ góc trên phải – desktop đặt tuyệt đối để tiêu đề giữ đúng tâm dọc */}
        <figure className="hero-rise order-4 [--rise-delay:120ms] lg:absolute lg:top-8 lg:right-8 lg:order-none lg:w-[clamp(17rem,28%,22rem)]">
          {/* Lớp trong mang chuyển động bồng bềnh (lớp ngoài giữ animation hero-rise) */}
          <div className="water-float relative aspect-[16/11] overflow-hidden rounded-3xl bg-primary-light shadow-[var(--shadow-lift)]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              sizes="(min-width: 1024px) 352px, 100vw"
              className="object-cover object-[50%_28%]"
            />
          </div>
        </figure>

        {/* Tiêu đề lớn – hàng giữa của lưới 1fr/auto/1fr, hiệu ứng Rising Ink (chữ nổi 3D gần con trỏ).
            Chữ in hoa bằng CSS, nội dung viết hoa kiểu câu */}
        <RisingInk
          id="hero-title"
          segments={titleSegments}
          highlightClassName="text-primary"
          markerClassName="inset-x-0 bottom-[0.06em] h-[0.28em] bg-accent/30"
          className="hero-rise order-1 text-[2.25rem] leading-[1.18] font-extrabold tracking-[-0.025em] text-primary-dark uppercase [--rise-delay:80ms] sm:text-[3.25rem] lg:order-none lg:col-span-12 lg:row-start-2 lg:text-[clamp(3.5rem,6.6vw,6rem)] lg:leading-[1.14]"
        />

        {/* 2 CTA ngay dưới tiêu đề, căn trái cùng mép chữ: đọc tiêu đề xong là thấy hành động */}
        <div className="hero-rise order-3 flex flex-col gap-3 [--rise-delay:240ms] sm:flex-row sm:items-center lg:order-none lg:col-span-12 lg:row-start-3 lg:self-start lg:pt-8">
          <a href={`#${BOOKING_ANCHOR}`} className={`${buttonStyles.primary} min-h-14 px-7 text-[1.0625rem]`}>
            <CalendarIcon className="size-5" />
            Đặt lịch tư vấn
          </a>
          <a href={site.phone.tel} className={`${buttonStyles.outline} min-h-14 px-7 text-[1.0625rem]`}>
            <PhoneIcon className="size-5" />
            Gọi ngay {site.phone.display}
          </a>
        </div>
      </Container>
    </section>
  )
}
