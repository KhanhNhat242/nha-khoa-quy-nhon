'use client'

import type { ReactNode } from 'react'
import { BOOKING_ANCHOR } from '@/data/site'
import { selectService } from '@/lib/select-service'

interface ConsultLinkProps {
  service: string
  className?: string
  children: ReactNode
  ariaLabel?: string
}

/** Link tới form đặt lịch trong trang và chọn sẵn dịch vụ (không JS: vẫn cuộn tới form). */
export function ConsultLink({ service, className, children, ariaLabel }: ConsultLinkProps) {
  return (
    <a
      href={`#${BOOKING_ANCHOR}`}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        event.preventDefault()
        selectService(service)
        history.replaceState(null, '', `#${BOOKING_ANCHOR}`)
      }}
    >
      {children}
    </a>
  )
}
