import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Suspense } from 'react'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { TopBar } from '@/components/layout/TopBar'
import { AntdProvider } from '@/components/providers/AntdProvider'
import { RevealObserver } from '@/components/ui/RevealObserver'
import { getImage } from '@/data/gallery'
import { site } from '@/data/site'
import { colors } from '@/lib/tokens'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-be-vietnam-pro',
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const ogImage = getImage('doiNguTapThe')

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Chăm sóc nụ cười cho cả gia đình`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  // R-G3: bản demo chặn index
  robots: site.isDemo ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: site.name,
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }],
  },
}

export const viewport: Viewport = {
  themeColor: colors.primary,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Suspense fallback={null}>
          <AntdRegistry layer>
            <AntdProvider>
              <a
                href="#noi-dung"
                className="sr-only z-50 rounded-full bg-primary px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
              >
                Bỏ qua đến nội dung chính
              </a>
              <TopBar />
              <Header />
              <main id="noi-dung" className="flex-1">
                {children}
              </main>
              <Footer />
              <FloatingContact />
              <RevealObserver />
            </AntdProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  )
}
