import { revealDelay } from '@/components/ui/reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { processSteps } from '@/data/home'

/** Quy trình 4 bước – kiểu Swiss: số lớn, vạch kẻ ngang, lưới 4 cột (mobile xếp dọc). */
export function ProcessTimeline() {
  return (
    <Section id="quy-trinh" tone="teal" labelledBy="quy-trinh-title">
      <SectionHeading
        id="quy-trinh-title"
        eyebrow="Quy trình"
        title="Quy Trình Thăm Khám Chuẩn Y Khoa"
        description="Bốn bước rõ ràng giúp bạn biết trước mình sẽ được khám gì, tư vấn ra sao, nhẹ nhàng ngay từ lần đầu đến phòng khám."
      />

      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            data-reveal="fade-up"
            style={revealDelay(index * 100)}
            className="relative border-t-2 border-accent/30 pt-6"
          >
            {/* Đoạn nhấn trên vạch: dài dần theo tiến trình */}
            <span
              className="absolute -top-0.5 left-0 h-0.5 bg-accent-dark"
              style={{ width: `${((index + 1) / processSteps.length) * 100}%` }}
              aria-hidden="true"
            />
            <span className="block text-5xl leading-none font-extrabold tracking-[-0.04em] text-primary tabular-nums lg:text-6xl">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-5 text-xl font-bold text-primary-dark">{step.title}</h3>
            <p className="mt-2 text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
