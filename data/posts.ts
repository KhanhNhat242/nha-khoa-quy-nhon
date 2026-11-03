import type { Post } from '@/types'

/** Bài kiến thức phổ thông (R-B5): không hứa hẹn kết quả, luôn khuyên thăm khám. */
export const posts: Post[] = [
  {
    slug: 'nieng-rang-o-do-tuoi-nao-phu-hop',
    title: 'Niềng răng ở độ tuổi nào là phù hợp? Điều phụ huynh nên biết',
    excerpt:
      'Thời điểm niềng răng phụ thuộc vào sự phát triển của xương hàm và răng vĩnh viễn. Cùng tìm hiểu các dấu hiệu nên đưa con đi kiểm tra sớm.',
    date: '2026-10-28',
    image: 'niengMacCaiXanh',
    body: [
      {
        paragraphs: [
          'Nhiều phụ huynh băn khoăn không biết khi nào nên cho con niềng răng. Thực tế, không có một độ tuổi chung cho tất cả, vì mỗi trẻ có tốc độ thay răng và phát triển xương hàm khác nhau.',
        ],
      },
      {
        heading: 'Dấu hiệu nên đưa trẻ đi kiểm tra',
        paragraphs: [
          'Răng mọc chen chúc, mọc lệch hoặc thưa nhiều; hàm trên và hàm dưới cắn không khớp; trẻ có thói quen mút tay, thở miệng kéo dài. Khi thấy những dấu hiệu này, việc thăm khám sớm giúp bác sĩ theo dõi và tư vấn thời điểm can thiệp phù hợp.',
        ],
      },
      {
        heading: 'Người lớn có niềng răng được không?',
        paragraphs: [
          'Người trưởng thành vẫn có thể chỉnh nha nếu răng và nướu khoẻ mạnh. Thời gian điều trị và phương pháp phù hợp sẽ được bác sĩ đánh giá dựa trên phim chụp và tình trạng răng của mỗi người.',
          'Để biết chính xác tình trạng của bạn hoặc của con, hãy đặt lịch để bác sĩ thăm khám và tư vấn trực tiếp.',
        ],
      },
    ],
  },
  {
    slug: 'vi-sao-can-chup-ct-3d-truoc-khi-trong-implant',
    title: 'Vì sao cần chụp phim CT 3D trước khi trồng răng Implant?',
    excerpt:
      'Phim CT 3D cho bác sĩ thấy rõ chiều cao, độ dày xương hàm và vị trí dây thần kinh, từ đó lên kế hoạch cấy ghép an toàn hơn.',
    date: '2026-10-20',
    image: 'ct3dHam',
    body: [
      {
        paragraphs: [
          'Trồng răng Implant là đặt một trụ nhỏ vào xương hàm để thay thế chân răng đã mất. Vì vậy, bác sĩ cần biết rõ xương hàm tại vị trí mất răng còn đủ để đặt trụ hay không.',
        ],
      },
      {
        heading: 'Phim CT 3D cho biết những gì?',
        paragraphs: [
          'Khác với phim hai chiều, phim CT 3D dựng lại hình ảnh xương hàm theo ba chiều. Bác sĩ có thể đo chiều cao, độ dày xương và xác định vị trí ống thần kinh, xoang hàm để chọn kích thước trụ và hướng đặt phù hợp.',
        ],
      },
      {
        heading: 'Khi nào cần ghép xương?',
        paragraphs: [
          'Nếu mất răng lâu năm, xương hàm có thể bị tiêu đi. Khi đó bác sĩ có thể tư vấn ghép xương trước hoặc cùng lúc cấy trụ. Mỗi trường hợp sẽ khác nhau, nên việc thăm khám và chụp phim là bước không thể bỏ qua.',
        ],
      },
    ],
  },
  {
    slug: 'cham-soc-rang-mieng-hang-ngay-cho-ca-gia-dinh',
    title: 'Chăm sóc răng miệng hằng ngày đúng cách cho cả gia đình',
    excerpt:
      'Chải răng đúng cách, dùng chỉ nha khoa và khám định kỳ là ba thói quen đơn giản giúp hạn chế sâu răng, viêm nướu cho mọi thành viên.',
    date: '2026-10-12',
    image: 'rangKhoe6Goc',
    body: [
      {
        heading: 'Chải răng ít nhất hai lần mỗi ngày',
        paragraphs: [
          'Dùng bàn chải lông mềm, chải nhẹ nhàng theo chuyển động tròn ở tất cả các mặt răng trong khoảng hai phút. Với trẻ nhỏ, phụ huynh nên chải cùng hoặc kiểm tra lại cho con.',
        ],
      },
      {
        heading: 'Làm sạch kẽ răng',
        paragraphs: [
          'Chỉ nha khoa hoặc bàn chải kẽ giúp lấy mảng bám ở nơi bàn chải khó chạm tới, nhất là với người đang niềng răng hoặc có răng sứ.',
        ],
      },
      {
        heading: 'Khám răng định kỳ',
        paragraphs: [
          'Nên khám răng và lấy cao răng định kỳ theo lịch bác sĩ hẹn, thường khoảng 6 tháng một lần. Thăm khám sớm giúp phát hiện các vấn đề nhỏ trước khi chúng trở nên phức tạp.',
        ],
      },
    ],
  },
]
