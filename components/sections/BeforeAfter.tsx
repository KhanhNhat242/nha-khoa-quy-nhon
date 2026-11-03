import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getImage } from '@/data/gallery'
import { caseTabs, cases } from '@/data/home'
import { BeforeAfterSlider, type ResolvedCase } from './BeforeAfterSlider'

export function BeforeAfter() {
  const resolved: ResolvedCase[] = cases.map((c) => ({
    id: c.id,
    service: c.service,
    condition: c.condition,
    solution: c.solution,
    before: getImage(c.before),
    after: getImage(c.after),
  }))
  // Chỉ hiện tab có ca thật
  const tabs = caseTabs.filter((t) => resolved.some((c) => c.service === t.value))

  return (
    <Section id="truoc-sau" labelledBy="truoc-sau-title">
      <SectionHeading
        id="truoc-sau-title"
        eyebrow="Kết quả thực tế"
        title="Hành Trình Thay Đổi Nụ Cười Thực Tế"
        description="Chọn dịch vụ rồi kéo thanh trượt để tự so sánh trước và sau điều trị của những khách hàng đã đồng hành cùng phòng khám."
      />
      <div data-reveal="fade-up">
        <BeforeAfterSlider cases={resolved} tabs={tabs} />
      </div>
    </Section>
  )
}
