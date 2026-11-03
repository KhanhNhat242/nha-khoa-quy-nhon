'use client'

import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import type { ReactNode } from 'react'
import { colors } from '@/lib/tokens'

/** antd dùng locale tiếng Việt + theme token khớp bảng màu (R-E6). */
export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: colors.primary,
          colorText: colors.ink,
          colorTextSecondary: colors.muted,
          colorBorder: colors.line,
          colorError: colors.danger,
          colorLink: colors.primary,
          fontFamily: 'var(--font-be-vietnam-pro), ui-sans-serif, system-ui, sans-serif',
          fontSize: 16,
          borderRadius: 12,
        },
        components: {
          Tabs: { itemColor: colors.muted, itemSelectedColor: colors.primary, inkBarColor: colors.accent },
          Modal: { borderRadiusLG: 16 },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
