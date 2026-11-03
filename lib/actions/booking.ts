'use server'

import { readBookingForm, todayInVietnam, validateBooking, type BookingState } from '@/lib/booking'

export async function submitBooking(_prev: BookingState, formData: FormData): Promise<BookingState> {
  const input = readBookingForm(formData)
  const errors = validateBooking(input, todayInVietnam(new Date()))

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Vui lòng kiểm tra lại các thông tin được đánh dấu.', errors }
  }

  // TODO(xac-nhan): Q9 – kênh nhận dữ liệu đặt lịch (email / Google Sheets / Zalo OA).
  // Bản demo chỉ kiểm tra hợp lệ rồi trả về thành công; KHÔNG ghi log thông tin cá nhân (R-E5).

  return {
    status: 'success',
    message: 'Cảm ơn bạn! Phòng khám đã nhận thông tin và sẽ gọi lại để xác nhận lịch hẹn trong thời gian sớm nhất.',
  }
}
