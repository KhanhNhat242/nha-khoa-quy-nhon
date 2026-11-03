import Image from 'next/image'
import { revealDelay } from '@/components/ui/reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getImage } from '@/data/gallery'
import { facilities } from '@/data/home'

/** Vị trí từng ô trong lưới Bento 12 cột (desktop) / 2 cột (mobile); ảnh sảnh là dải ngang theo đúng tỉ lệ ảnh. */
const layout = [
  'col-span-2 lg:col-span-12',
  'col-span-2 lg:col-span-6',
  'col-span-1 lg:col-span-3',
  'col-span-1 lg:col-span-3',
]
const sizes = ['(min-width: 1280px) 1216px, 100vw', '(min-width: 1024px) 600px, 100vw', '(min-width: 1024px) 300px, 50vw', '(min-width: 1024px) 300px, 50vw']

/** Cơ sở vật chất – Bento Box Grid bằng ảnh thật của phòng khám. */
export function Facilities() {
  return (
    <Section id="co-so-vat-chat" labelledBy="co-so-vat-chat-title">
      <SectionHeading
        id="co-so-vat-chat-title"
        eyebrow="Cơ sở vật chất"
        title="Không Gian Sạch Sẽ, Thiết Bị Chẩn Đoán Hiện Đại"
        description="Hình ảnh thật tại phòng khám: sảnh đón tiếp, phòng tư vấn và hệ thống chụp phim giúp bác sĩ đánh giá chính xác trước khi điều trị."
      />

      <ul className="grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[14rem] lg:auto-rows-[17rem] lg:grid-cols-12 lg:gap-6">
        {facilities.map((facility, index) => {
          const image = getImage(facility.image)
          const big = index === 0
          return (
            <li
              key={facility.title}
              data-reveal="fade-up"
              style={revealDelay(index * 80)}
              className={`group relative overflow-hidden rounded-3xl bg-ink ${layout[index] ?? 'col-span-1 lg:col-span-3'}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes[index] ?? '50vw'}
                className="object-cover object-[50%_45%] transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-2xl bg-surface p-3 sm:bottom-4 sm:left-4 sm:max-w-sm sm:p-4">
                <h3 className={`font-bold text-primary-dark ${big ? 'text-lg sm:text-xl' : 'text-[0.9375rem] sm:text-base'}`}>
                  {facility.title}
                </h3>
                <p className={`mt-0.5 text-sm text-muted ${big ? 'max-sm:hidden' : 'hidden sm:block'}`}>
                  {facility.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
