import { getImage } from '@/data/gallery'
import { teamStories } from '@/data/home'
import { BOOKING_ANCHOR } from '@/data/site'
import { TeamStories, type ResolvedStory } from './TeamStories'

/**
 * Đội ngũ bác sĩ – carousel ảnh thật cuộn theo trang (TeamStories).
 * Không còn thẻ thông tin từng bác sĩ (tên mẫu, chuyên khoa, chứng chỉ) – người dùng bỏ 03/11/2026;
 * dữ liệu `data/doctors.ts` giữ lại cho trang /doi-ngu-bac-si sau này (Q6).
 */
export function Doctors() {
  const stories: ResolvedStory[] = teamStories.map((story) => ({ ...story, photo: getImage(story.image) }))

  return (
    <section id="doi-ngu" aria-labelledby="doi-ngu-title" className="bg-primary-light">
      <TeamStories
        stories={stories}
        title="Người trực tiếp khám và theo dõi ca của bạn"
        bookingHref={`#${BOOKING_ANCHOR}`}
        nextSectionId="co-so-vat-chat"
      />
    </section>
  )
}
