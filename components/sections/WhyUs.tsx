import Image from 'next/image'
import { buttonStyles } from '@/components/ui/button-styles'
import { CalendarIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getImage } from '@/data/gallery'
import { usps } from '@/data/home'
import { BOOKING_ANCHOR } from '@/data/site'

/** Ảnh cần căn lại vùng hiển thị trong khung 4:3 */
const focus: Record<string, string> = { bacSiKeChungNhan: 'object-[50%_88%]' }

export function WhyUs() {
  return (
    <Section id="vi-sao-chon" labelledBy="vi-sao-chon-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Cột trái cố định khi cuộn */}
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading
            id="vi-sao-chon-title"
            layout="left"
            eyebrow="Vì sao chọn chúng tôi"
            title="Bốn điều bạn nhận được khi khám tại đây"
            description="Bốn điều chúng tôi giữ trong mỗi lần thăm khám, để bạn và người thân luôn hiểu rõ, yên tâm trước mọi quyết định điều trị."
            className="lg:mb-8"
          />
          <figure className="border-l-2 border-accent pl-5">
            <blockquote className="text-[1.0625rem] text-ink">
              “Mỗi kế hoạch điều trị đều bắt đầu từ việc lắng nghe bạn và quan sát kỹ trên phim chụp.”
            </blockquote>
            <figcaption className="mt-2 text-sm font-semibold text-accent-dark">— Đội ngũ Nha Khoa Quy Nhơn</figcaption>
          </figure>
          <a href={`#${BOOKING_ANCHOR}`} className={`${buttonStyles.primary} mt-8`}>
            <CalendarIcon className="size-5" />
            Đặt lịch thăm khám
          </a>
        </div>

        {/* 4 trụ cột, so le nhẹ */}
        <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:gap-6">
          {usps.map((usp, index) => {
            const image = getImage(usp.image)
            return (
              <li
                key={usp.title}
                data-reveal="fade-up"
                style={revealDelay(index * 90)}
                className={index % 2 === 1 ? 'sm:mt-12' : ''}
              >
                <article className="card group h-full overflow-hidden rounded-3xl transition duration-300 hover:border-accent hover:shadow-[var(--shadow-lift)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      className={`object-cover transition duration-500 group-hover:scale-[1.03] ${focus[usp.image] ?? ''}`}
                    />
                  </div>
                  <div className="p-6 lg:p-7">
                    <span className="text-sm font-bold tracking-[0.14em] text-accent-dark tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-xl font-bold tracking-[-0.01em] text-primary-dark">{usp.title}</h3>
                    <p className="mt-2 text-muted">{usp.description}</p>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
