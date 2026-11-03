import { revealDelay } from '@/components/ui/reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getImage } from '@/data/gallery'
import { posts } from '@/data/posts'
import { NewsCard } from './NewsCard'

/** Editorial Grid: 1 bài nổi bật (7 cột) + 2 bài nhỏ xếp dọc (5 cột). */
export function NewsSection() {
  const [lead, ...rest] = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  if (!lead) return null

  return (
    <Section id="tin-tuc" tone="canvas" labelledBy="tin-tuc-title">
      <SectionHeading
        id="tin-tuc-title"
        eyebrow="Kiến thức nha khoa"
        title="Cẩm nang chăm sóc răng miệng"
        description="Những thông tin phổ thông, dễ hiểu giúp bạn chủ động chăm sóc răng miệng cho bản thân và cả gia đình mỗi ngày."
      />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div data-reveal="fade-up" className="lg:col-span-7">
          <NewsCard post={lead} image={getImage(lead.image)} variant="featured" />
        </div>
        <ul className="grid content-start gap-8 border-line lg:col-span-5 lg:border-l lg:pl-8">
          {rest.map((post, index) => (
            <li
              key={post.slug}
              data-reveal="fade-up"
              style={revealDelay((index + 1) * 90)}
              className={index > 0 ? 'border-t border-line pt-8' : ''}
            >
              <NewsCard post={post} image={getImage(post.image)} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
