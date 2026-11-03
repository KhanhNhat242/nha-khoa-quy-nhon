import { getImage } from '@/data/gallery'
import { facilities } from '@/data/home'
import { FacilitiesStack, type ResolvedFacility } from './FacilitiesStack'

/** Điểm cắt riêng cho ảnh có chủ thể lệch tâm (khung 16:10) */
const positions: Record<string, string> = {
  maoRangSu: 'object-[50%_78%]',
}

/** Cơ sở vật chất – "trống xoay" dọc cuộn theo trang bằng ảnh thật (FacilitiesStack). */
export function Facilities() {
  const items: ResolvedFacility[] = facilities.map((facility) => ({
    ...facility,
    photo: getImage(facility.image),
    position: positions[facility.image],
  }))

  return (
    <section id="co-so-vat-chat" aria-labelledby="co-so-vat-chat-title" className="bg-surface">
      <FacilitiesStack items={items} title="Không gian, thiết bị và dụng cụ điều trị" />
    </section>
  )
}
