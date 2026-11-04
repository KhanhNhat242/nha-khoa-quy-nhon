import Image from 'next/image'
import { buttonStyles } from '@/components/ui/button-styles'
import { CalendarIcon, PhoneIcon } from '@/components/ui/Icons'
import { Container } from '@/components/ui/Container'
import { ReflectiveImage } from '@/components/ui/ReflectiveImage'
import { RisingInk, type InkSegment } from '@/components/ui/RisingInk'
import { getImage } from '@/data/gallery'
import { BOOKING_ANCHOR, HERO_ID, site } from '@/data/site'

/**
 * Hero-Centric theo ảnh mẫu người dùng gửi (04/11/2026), màu phẳng (Flat – không gradient):
 * - Trái, nền trắng: tiêu đề (Rising Ink) · mô tả (Luminous Type) · nút Đặt lịch + liên kết Gọi ngay có icon tròn.
 * - Phải: mảng xanh ngọc phẳng cắt xéo mép trái, kéo lên tận mép trên (hero nằm dưới header trong suốt);
 *   ảnh thật `hero-img` dựng đứng đặt trong mảng, bo góc dưới trái lớn, nổi bồng bềnh như trên mặt nước (`.water-float`,
 *   lớp ngoài <figure> giữ animation hero-rise) và phản chiếu ánh sáng khi rê/chạm (ReflectiveImage); vài vòng tròn trang trí.
 * Cao vừa 1 màn hình (thanh trên cùng 2.75rem + header 4.5rem), tối đa 48rem trên màn desktop lớn.
 * Mobile: tiêu đề → mô tả → nút → ảnh (mảng ngọc xéo nằm sau ảnh).
 * `id={HERO_ID}` được HeaderShell dùng để biết đang ở phạm vi hero (menu dồn trái, header trong suốt).
 */
const titleSegments: InkSegment[] = [
  { text: 'Nụ cười ' },
  { text: 'khỏe đẹp', highlight: true },
  { break: true },
  { text: ' cho cả gia đình' },
]

/** Mảng ngọc: mép trái xéo; mép dưới thẳng để phủ kín tới đáy hero (không chừa khoảng trắng ở góc dưới phải) */
const panelShape = '[clip-path:polygon(24%_0,100%_0,100%_100%,6%_100%)]'

/** Vòng tròn trang trí (viền ngọc nhạt) */
function Ring({ className }: { className: string }) {
  return <span className={`pointer-events-none absolute rounded-full ${className}`} aria-hidden="true" />
}

export function Hero() {
  const photo = getImage('heroDieuTri')

  return (
    <section
      id={HERO_ID}
      aria-labelledby="hero-title"
      // Kéo lên nằm dưới header (h-16 / lg:h-[4.5rem]) để header trong suốt và mảng ngọc chạm mép trên
      className="relative isolate -mt-16 overflow-hidden bg-surface pt-16 lg:-mt-[4.5rem] lg:pt-[4.5rem]"
    >
      {/* Desktop: mảng ngọc nửa phải, cao hết hero */}
      <div className={`absolute inset-y-0 right-0 -z-10 hidden w-[52%] bg-accent-light lg:block ${panelShape}`} aria-hidden="true" />
      <Ring className="top-28 left-[3%] hidden size-24 border-[14px] border-accent/25 lg:block" />
      <Ring className="top-[38%] right-[1.5%] hidden size-36 border-[18px] border-surface/60 lg:block" />
      <Ring className="right-[6%] bottom-10 hidden size-16 border-[10px] border-accent/25 lg:block" />

      <Container className="relative grid grid-cols-1 items-center gap-y-10 pt-10 pb-14 sm:pt-14 sm:pb-16 lg:min-h-[min(calc(100svh-7.25rem),48rem)] lg:grid-cols-12 lg:gap-x-8 lg:py-10">
        {/* Trái: tiêu đề + mô tả + nút */}
        <div className="lg:col-span-6">
          <RisingInk
            id="hero-title"
            segments={titleSegments}
            highlightClassName="text-primary"
            markerClassName="inset-x-0 bottom-[0.06em] h-[0.28em] bg-accent/30"
            className="hero-rise text-[2.375rem] leading-[1.15] font-extrabold tracking-[-0.025em] text-primary-dark [--rise-delay:80ms] sm:text-[3.25rem] lg:text-[clamp(3rem,4.6vw,4.25rem)] lg:leading-[1.12]"
          />

          {/* Luminous Type: wrapper giữ animation hero-rise, <p> giữ animation vệt sáng */}
          <div className="hero-rise mt-6 [--rise-delay:160ms]">
            <p className="luminous-type max-w-lg text-lg text-pretty sm:text-xl sm:leading-relaxed">
              Thăm khám tận tâm cùng đội ngũ bác sĩ và hệ thống chẩn đoán hình ảnh 3D hiện đại, tư vấn rõ ràng từng bước
              ngay tại Quy Nhơn.
            </p>
          </div>

          <div className="hero-rise mt-9 flex flex-col gap-4 [--rise-delay:240ms] sm:flex-row sm:items-center sm:gap-6">
            <a href={`#${BOOKING_ANCHOR}`} className={`${buttonStyles.primary.replace('rounded-xl', 'rounded-full')} min-h-14 px-8 text-[1.0625rem]`}>
              <CalendarIcon className="size-5" />
              Đặt lịch tư vấn
            </a>
            <a
              href={site.phone.tel}
              className="group inline-flex min-h-14 items-center gap-3 self-start font-semibold text-primary sm:self-auto"
            >
              <span className="grid size-12 place-items-center rounded-full bg-surface text-primary shadow-[var(--shadow-lift)] ring-1 ring-line transition group-hover:bg-primary group-hover:text-white">
                <PhoneIcon className="size-5" />
              </span>
              Gọi ngay {site.phone.display}
            </a>
          </div>
        </div>

        {/* Phải: ảnh thật dựng đứng trong mảng ngọc */}
        <figure className="hero-rise relative mx-auto w-full max-w-[26rem] [--rise-delay:120ms] lg:col-span-5 lg:col-start-8 lg:mr-0 lg:max-w-none">
          {/* Mobile/tablet: mảng ngọc xéo nằm sau ảnh */}
          <div className={`absolute -inset-x-6 -inset-y-6 -z-10 bg-accent-light lg:hidden ${panelShape}`} aria-hidden="true" />
          {/* Lớp ngoài: bồng bềnh (water-float) · lớp trong: nghiêng + phản chiếu theo con trỏ (ReflectiveImage) */}
          <div className="water-float mx-auto w-full lg:w-[min(100%,calc((min(100svh,55rem)-14rem)*0.8))]">
            <ReflectiveImage className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] rounded-bl-[5rem] bg-primary-light shadow-[var(--shadow-lift)]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                preload
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 416px, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </ReflectiveImage>
          </div>
        </figure>
      </Container>
    </section>
  )
}
