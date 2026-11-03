export interface Stat {
  label: string
  /** null = chưa xác nhận → không hiển thị (R-B1). */
  value: number | null
  suffix?: string
  decimals?: number
}

// TODO(xac-nhan): Q17 – số liệu thật (năm hoạt động, khách đã điều trị, số bác sĩ, điểm Google).
// Chỉ điền số đã được phòng khám xác nhận; dải số liệu tự ẩn khi tất cả đều null.
export const stats: Stat[] = [
  { label: 'Năm đồng hành cùng khách hàng', value: null, suffix: '+' },
  { label: 'Khách hàng đã điều trị', value: null, suffix: '+' },
  { label: 'Bác sĩ & điều dưỡng', value: null },
  { label: 'Điểm đánh giá Google', value: null, suffix: '/5', decimals: 1 },
]
