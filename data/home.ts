import type { BeforeAfterCase, Facility, ProcessStep, ServiceSlug, Usp } from '@/types'

/** 4 trụ cột USP theo mục 5 tài liệu yêu cầu – minh hoạ bằng ảnh thật. */
export const usps: Usp[] = [
  {
    title: 'Đội ngũ bác sĩ tận tâm',
    description:
      'Bác sĩ trực tiếp thăm khám, lắng nghe mong muốn và giải thích dễ hiểu để bạn cùng gia đình an tâm lựa chọn.',
    image: 'bacSiKeChungNhan',
  },
  {
    title: 'Cơ sở vật chất hiện đại',
    description:
      'Chụp phim và dựng hình CT 3D giúp bác sĩ quan sát rõ xương hàm, chân răng trước khi lên kế hoạch điều trị.',
    image: 'ct3dSo',
  },
  {
    title: 'Quy trình tư vấn rõ ràng',
    description:
      'Phác đồ, thời gian và chi phí được trình bày trên phim chụp của chính bạn trước khi bắt đầu điều trị.',
    image: 'phimToanCanhDanhDau',
  },
  {
    title: 'Chăm sóc khách hàng chu đáo',
    description:
      'Nhân viên đón tiếp, hướng dẫn và theo dõi sau điều trị, nhắc lịch tái khám để nụ cười được chăm sóc lâu dài.',
    image: 'doiNguTiepDon',
  },
]

/** Tab trước/sau theo dịch vụ. */
export const caseTabs: { value: ServiceSlug; label: string }[] = [
  { value: 'rang-su-tham-my', label: 'Răng sứ' },
  { value: 'nieng-rang-chinh-nha', label: 'Niềng răng' },
  { value: 'trong-rang-implant', label: 'Implant' },
]

// TODO(xac-nhan): Q14 – loại khí cụ/phác đồ cụ thể của từng ca; hiện ghi theo tình trạng nhìn thấy trên ảnh
export const cases: BeforeAfterCase[] = [
  {
    id: 'ca-199',
    before: 'ca199Truoc',
    after: 'ca199Sau',
    condition: 'Răng xỉn màu, kích thước chưa đều',
    solution: 'Phục hình răng sứ thẩm mỹ',
    service: 'rang-su-tham-my',
  },
  {
    id: 'ca-201',
    before: 'ca201Truoc',
    after: 'ca201Sau',
    condition: 'Răng khấp khểnh nhẹ, có kẽ hở',
    solution: 'Răng sứ cải thiện đường cười',
    service: 'rang-su-tham-my',
  },
  {
    id: 'ca-203',
    before: 'ca203Truoc',
    after: 'ca203Sau',
    condition: 'Răng mòn, kém đều, khớp cắn lệch',
    solution: 'Răng sứ phục hồi hình dáng',
    service: 'rang-su-tham-my',
  },
  {
    id: 'ca-044',
    before: 'ca044Truoc',
    after: 'ca044Sau',
    condition: 'Răng cửa chen chúc, mọc lệch',
    solution: 'Niềng răng chỉnh nha',
    service: 'nieng-rang-chinh-nha',
  },
  {
    id: 'ca-047',
    before: 'ca047Truoc',
    after: 'ca047Sau',
    condition: 'Thưa kẽ răng cửa, lệch hàm dưới',
    solution: 'Niềng răng đóng khe thưa',
    service: 'nieng-rang-chinh-nha',
  },
  {
    id: 'ca-045',
    before: 'ca045Truoc',
    after: 'ca045Sau',
    condition: 'Răng lệch lạc, khớp cắn chưa khít',
    solution: 'Chỉnh nha cải thiện khớp cắn',
    service: 'nieng-rang-chinh-nha',
  },
  {
    id: 'ca-046',
    before: 'ca046Truoc',
    after: 'ca046Sau',
    condition: 'Răng chen chúc, răng cửa bên chìa',
    solution: 'Niềng răng sắp đều cung răng',
    service: 'nieng-rang-chinh-nha',
  },
  {
    id: 'ca-019',
    before: 'ca019Truoc',
    after: 'ca019Sau',
    condition: 'Răng thưa, hở nhiều kẽ hai hàm',
    solution: 'Niềng răng khép kẽ thưa',
    service: 'nieng-rang-chinh-nha',
  },
  {
    id: 'ca-086',
    before: 'ca086Truoc',
    after: 'ca086Sau',
    condition: 'Mất răng hàm dưới hai bên',
    solution: 'Cấy ghép 2 trụ Implant',
    service: 'trong-rang-implant',
  },
]

/** Lưới bento Cơ sở vật chất – phần tử đầu là ô lớn. */
export const facilities: Facility[] = [
  {
    image: 'sanhPhongKham',
    title: 'Sảnh đón tiếp rộng, thoáng',
    description: 'Không gian sáng, cây xanh và gỗ ấm giúp bạn thư giãn trong lúc chờ khám.',
  },
  {
    image: 'phongTuVan',
    title: 'Phòng tư vấn riêng',
    description: 'Bác sĩ trao đổi trực tiếp, giải thích phác đồ và chi phí trên phim chụp.',
  },
  {
    image: 'ct3dHam',
    title: 'Chụp CT 3D',
    description: 'Dựng hình xương hàm ba chiều trước khi cấy Implant, chỉnh nha.',
  },
  {
    image: 'phimSoNghieng',
    title: 'Phim sọ nghiêng',
    description: 'Phân tích khớp cắn, xương hàm để lập kế hoạch niềng răng.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    title: 'Đặt lịch & Tiếp đón',
    description: 'Đặt lịch qua điện thoại, Zalo hoặc form; nhân viên đón tiếp và hướng dẫn bạn chu đáo.',
  },
  {
    title: 'Chụp phim & Thăm khám',
    description: 'Bác sĩ khám răng, nướu, khớp cắn và chỉ định chụp phim khi cần để đánh giá kỹ.',
  },
  {
    title: 'Tư vấn phác đồ & Chi phí',
    description: 'Giải thích rõ các lựa chọn, thời gian điều trị và chi phí trước khi bạn quyết định.',
  },
  {
    title: 'Điều trị & Chăm sóc định kỳ',
    description: 'Thực hiện theo phác đồ đã thống nhất, hướng dẫn chăm sóc tại nhà và hẹn tái khám.',
  },
]
