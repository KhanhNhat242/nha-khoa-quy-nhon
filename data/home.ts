import type { BeforeAfterCase, Facility, ProcessStep, ServiceSlug, TeamStory, Usp } from '@/types'

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

/** Lưới bento Cơ sở vật chất – thứ tự khớp với `layout` trong `components/sections/Facilities.tsx`. */
export const facilities: Facility[] = [
  {
    image: 'phongDieuTri',
    title: 'Phòng điều trị',
    description: 'Ghế nha có đèn chiếu, bồn súc miệng và khay dụng cụ, bố trí tách biệt để bác sĩ thao tác thuận tiện.',
  },
  {
    image: 'bacSiThucHanh',
    title: 'Thực hành chuyên môn',
    description: 'Bác sĩ mặc áo choàng vô trùng, thực hành kỹ thuật trên mô hình cùng dụng cụ chuyên dụng.',
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
  {
    image: 'maoRangSu',
    title: 'Răng sứ hoàn thiện',
    description: 'Bộ mão sứ được xếp theo vị trí từng răng trên cung hàm trước khi gắn.',
  },
  {
    image: 'dungCuImplant',
    title: 'Dụng cụ cấy ghép Implant',
    description: 'Mũi khoan và dụng cụ chuyên dụng sắp theo kích cỡ, chuẩn bị sẵn cho ca cấy ghép.',
  },
  {
    image: 'vatTuDieuTri',
    title: 'Vật tư sau một ca điều trị',
    description: 'Ống thuốc tê, kim tiêm và kéo phẫu thuật được dùng trong một ca điều trị.',
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

/**
 * Carousel "Đội ngũ bác sĩ" – ảnh thật do người dùng cung cấp (`public/images/doctors1–6.jpg`).
 * Mô tả chỉ nêu điều nhìn thấy trong ảnh: không gắn tên, chức danh, bằng cấp (R-B1, Q6).
 */
export const teamStories: TeamStory[] = [
  {
    label: 'Đội ngũ',
    title: 'Một tập thể, một cách chăm sóc',
    description: 'Bác sĩ, điều dưỡng và nhân viên tiếp đón cùng làm việc tại phòng khám, phối hợp với nhau trong từng ca của bạn.',
    image: 'doiNgu1',
    position: 'object-[50%_60%]',
  },
  {
    label: 'Bác sĩ',
    title: 'Những người trực tiếp khám cho bạn',
    description: 'Các bác sĩ thăm khám, giải thích trên phim chụp và theo dõi bạn trong suốt quá trình điều trị.',
    image: 'doiNgu2',
    position: 'object-[50%_35%]',
  },
  {
    label: 'Tinh thần',
    title: 'Vui vẻ để bạn bớt lo lắng',
    description: 'Không khí thân thiện giúp cả người lớn và trẻ nhỏ thấy nhẹ nhàng hơn mỗi lần đến phòng khám.',
    image: 'doiNgu3',
    position: 'object-[50%_40%]',
  },
  {
    label: 'Tri ân',
    title: 'Biết ơn những người thầy',
    description: 'Đội ngũ cùng nhau tri ân người thầy đã đồng hành trên con đường làm nghề.',
    image: 'doiNgu4',
    position: 'object-[50%_50%]',
  },
  {
    label: 'Gắn kết',
    title: 'Cả phòng khám là một nhà',
    description: 'Từ lễ tân đến bác sĩ, mọi người cùng chung một mong muốn: bạn được chăm sóc chu đáo trong từng lần đến khám.',
    image: 'doiNgu5',
    position: 'object-[50%_55%]',
  },
  {
    label: 'Học hỏi',
    title: 'Không ngừng trau dồi tay nghề',
    description: 'Bác sĩ tham gia các buổi thực hành chuyên môn trên mô hình để cập nhật kỹ thuật điều trị.',
    image: 'doiNgu6',
    position: 'object-[50%_55%]',
  },
]
