import type { Doctor } from '@/types'

// TODO(xac-nhan): Q6 – họ tên, chức danh, chuyên khoa, số năm kinh nghiệm, số chứng chỉ hành nghề, ảnh chân dung.
// Đang dùng tên mẫu; `experience`/`license` để null → hiển thị "Đang cập nhật" (không tự điền – R-B1).
export const doctors: Doctor[] = [
  {
    name: 'BS. Nguyễn Văn A',
    title: 'Bác sĩ Răng Hàm Mặt',
    specialty: 'Chỉnh nha',
    experience: null,
    license: null,
    strengths: 'Phụ trách tư vấn chỉnh nha, theo dõi tiến trình niềng răng cho trẻ em và người lớn.',
    isSample: true,
  },
  {
    name: 'BS. Trần Thị B',
    title: 'Bác sĩ Răng Hàm Mặt',
    specialty: 'Phục hình – Thẩm mỹ',
    experience: null,
    license: null,
    strengths: 'Phụ trách phục hình răng sứ, tẩy trắng; chú trọng màu răng tự nhiên, hài hoà gương mặt.',
    isSample: true,
  },
  {
    name: 'BS. Lê Văn C',
    title: 'Bác sĩ Răng Hàm Mặt',
    specialty: 'Implant – Tổng quát',
    experience: null,
    license: null,
    strengths: 'Phụ trách khám tổng quát và trồng răng Implant, lập kế hoạch dựa trên phim CT 3D.',
    isSample: true,
  },
]
