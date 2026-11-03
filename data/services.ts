import type { Service } from '@/types'

/** Đúng 5 dịch vụ, đúng thứ tự & slug ở mục 4 tài liệu yêu cầu (R-B7). */
export const services: Service[] = [
  {
    slug: 'kham-nha-khoa-tong-quat',
    name: 'Khám nha khoa tổng quát',
    summary:
      'Kiểm tra toàn diện răng, nướu và khớp cắn, chụp phim khi cần để phát hiện sớm vấn đề và tư vấn hướng xử lý.',
    image: 'phimToanCanh',
  },
  {
    slug: 'rang-su-tham-my',
    name: 'Răng sứ thẩm mỹ',
    summary:
      'Cải thiện răng xỉn màu, mẻ vỡ hoặc thưa nhẹ; bác sĩ tư vấn loại sứ và màu răng phù hợp với gương mặt bạn.',
    // TODO(xac-nhan): Q14 – ảnh ca 199 suy ra là răng sứ, chờ khách xác nhận
    image: 'ca199Sau',
  },
  {
    slug: 'nieng-rang-chinh-nha',
    name: 'Niềng răng / Chỉnh nha',
    summary:
      'Sắp xếp lại răng chen chúc, thưa, lệch khớp cắn; theo dõi định kỳ từng giai đoạn cho cả trẻ em và người lớn.',
    image: 'niengMacCai',
  },
  {
    slug: 'trong-rang-implant',
    name: 'Trồng răng Implant',
    summary:
      'Phục hồi răng đã mất; chụp CT 3D để đánh giá xương hàm, vị trí dây thần kinh trước khi lên kế hoạch.',
    image: 'ct3dThanKinh',
  },
  {
    slug: 'tay-trang-rang',
    name: 'Tẩy trắng răng',
    summary:
      'Làm sáng màu răng ố vàng do ăn uống, thói quen; bác sĩ kiểm tra trước để hạn chế ê buốt sau tẩy trắng.',
    // TODO(xac-nhan): Q14 – chưa có ảnh ca tẩy trắng; tạm dùng ảnh hàm răng đều sau điều trị
    image: 'ca044Sau',
  },
]

export const CONSULT_OTHER = { value: 'chua-ro', label: 'Chưa rõ, cần bác sĩ tư vấn' } as const
