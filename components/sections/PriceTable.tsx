import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PRICE_NOTE, priceGroups } from '@/data/prices'
import { services } from '@/data/services'
import { site } from '@/data/site'
import { PriceTabs } from './PriceTabs'

export function PriceTable() {
  const groups = priceGroups.map((group) => ({
    ...group,
    serviceName: services.find((s) => s.slug === group.service)?.name ?? group.service,
  }))

  return (
    <Section id="bang-gia" labelledBy="bang-gia-title">
      <SectionHeading
        id="bang-gia-title"
        eyebrow="Minh bạch chi phí"
        title="Bảng Giá Tham Khảo Các Dịch Vụ Phổ Biến"
        description="Chọn từng dịch vụ để xem mức giá tham khảo. Bác sĩ sẽ báo chi phí cụ thể sau khi thăm khám và thống nhất phác đồ cùng bạn."
      />

      <div data-reveal="fade-up" className="card rounded-3xl p-4 sm:p-6 lg:p-10">
        <PriceTabs groups={groups} />
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border-l-4 border-accent bg-canvas p-4 text-[0.9375rem] text-ink sm:flex-row sm:items-center sm:justify-between">
          <p>
            <strong className="font-semibold text-accent-dark">Lưu ý: </strong>
            {PRICE_NOTE}
          </p>
          {site.isDemo ? (
            <span className="shrink-0 self-start rounded-lg bg-accent-light px-3 py-1 text-sm font-semibold text-accent-dark sm:self-auto">
              Giá mẫu – chờ cập nhật
            </span>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
