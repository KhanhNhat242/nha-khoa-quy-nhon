import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonStyles } from '@/components/ui/button-styles'
import { PhoneIcon, ToothIcon } from '@/components/ui/Icons'
import { Container } from '@/components/ui/Container'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Không tìm thấy trang',
  description: 'Trang bạn tìm không tồn tại hoặc đã được chuyển. Quay về trang chủ Nha Khoa Quy Nhơn hoặc gọi hotline để được hỗ trợ.',
}

export default function NotFound() {
  return (
    <section className="bg-linear-to-b from-primary-light to-surface py-20 lg:py-28">
      <Container className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary text-white">
          <ToothIcon className="size-9" />
        </span>
        <p className="mt-6 text-sm font-semibold tracking-[0.12em] text-accent-dark uppercase">Lỗi 404</p>
        <h1 className="mt-3 text-3xl font-bold text-primary-dark sm:text-4xl">Không tìm thấy trang bạn cần</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Đường dẫn có thể đã thay đổi. Bạn có thể quay về trang chủ hoặc gọi cho chúng tôi để được hỗ trợ.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonStyles.primary}>
            Về trang chủ
          </Link>
          <a href={site.phone.tel} className={buttonStyles.outline}>
            <PhoneIcon className="size-5" />
            Gọi {site.phone.display}
          </a>
        </div>
      </Container>
    </section>
  )
}
