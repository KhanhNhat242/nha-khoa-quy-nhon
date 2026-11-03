import type { PriceGroup } from '@/types'

/** Ghi chú bắt buộc kèm bảng giá (R-B6). */
export const PRICE_NOTE =
  'Bảng giá mang tính tham khảo. Chi phí chính xác được bác sĩ tư vấn sau khi thăm khám.'

// TODO(xac-nhan): Q8 – chính sách bảo hành từng dịch vụ; không ghi số năm khi chưa xác nhận
const WARRANTY = 'Theo tư vấn'

// TODO(xac-nhan): Q7 – toàn bộ đơn giá dưới đây là GIÁ MẪU cho bản demo, chờ phòng khám cung cấp bảng giá thật
export const priceGroups: PriceGroup[] = [
  {
    service: 'kham-nha-khoa-tong-quat',
    items: [
      { name: 'Khám và tư vấn răng miệng', price: 100000, unit: 'Lần', warranty: '—' },
      { name: 'Chụp phim X-quang toàn cảnh', price: 150000, unit: 'Phim', warranty: '—' },
      { name: 'Chụp phim CT 3D', price: 500000, unit: 'Phim', warranty: '—' },
      { name: 'Lấy cao răng, đánh bóng', price: 200000, unit: '2 hàm', warranty: '—' },
      { name: 'Trám răng thẩm mỹ', price: 300000, from: true, unit: 'Răng', warranty: WARRANTY },
    ],
  },
  {
    service: 'rang-su-tham-my',
    items: [
      { name: 'Răng sứ kim loại', price: 1500000, unit: 'Răng', warranty: WARRANTY },
      { name: 'Răng toàn sứ', price: 4000000, from: true, unit: 'Răng', warranty: WARRANTY },
      { name: 'Mặt dán sứ', price: 6000000, from: true, unit: 'Răng', warranty: WARRANTY },
    ],
  },
  {
    service: 'nieng-rang-chinh-nha',
    items: [
      { name: 'Niềng răng mắc cài kim loại', price: 25000000, from: true, unit: 'Liệu trình', warranty: WARRANTY },
      { name: 'Niềng răng mắc cài sứ', price: 35000000, from: true, unit: 'Liệu trình', warranty: WARRANTY },
      { name: 'Niềng răng khay trong suốt', price: 60000000, from: true, unit: 'Liệu trình', warranty: WARRANTY },
    ],
  },
  {
    service: 'trong-rang-implant',
    items: [
      { name: 'Cấy ghép Implant (trụ + răng sứ)', price: 15000000, from: true, unit: 'Răng', warranty: WARRANTY },
      { name: 'Ghép xương hỗ trợ', price: 5000000, from: true, addon: true, unit: 'Vị trí', warranty: WARRANTY },
    ],
  },
  {
    service: 'tay-trang-rang',
    items: [
      { name: 'Tẩy trắng răng tại phòng khám', price: 2000000, unit: '2 hàm', warranty: '—' },
      { name: 'Tẩy trắng răng tại nhà (kèm máng)', price: 1200000, unit: 'Bộ', warranty: '—' },
    ],
  },
]

/** Giá thấp nhất của một dịch vụ – dùng cho nhãn "Từ …" trên thẻ dịch vụ. */
export function startingPrice(service: PriceGroup['service']): number | null {
  const items = (priceGroups.find((g) => g.service === service)?.items ?? []).filter((i) => !i.addon)
  return items.length ? Math.min(...items.map((i) => i.price)) : null
}
