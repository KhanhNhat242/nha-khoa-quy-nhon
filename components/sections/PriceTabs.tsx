'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { ConsultLink } from '@/components/ui/ConsultLink'
import { formatPrice } from '@/lib/format'
import type { PriceGroup } from '@/types'

interface Props {
  groups: (PriceGroup & { serviceName: string })[]
}

const cell = 'flex items-baseline justify-between gap-4 md:table-cell md:border-t md:border-line md:px-5 md:py-4 md:align-middle'
const cellLabel = 'text-sm text-muted md:hidden'

/**
 * Tab bảng giá theo 5 dịch vụ (ARIA tabs, phím mũi tên / Home / End).
 * Nút tab dạng chip xuống dòng được nên đủ 5 tab ở màn hình 360px; mọi bảng có sẵn trong HTML.
 */
export function PriceTabs({ groups }: Props) {
  const [active, setActive] = useState(0)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const uid = useId()

  const focusTab = (index: number) => {
    const next = (index + groups.length) % groups.length
    setActive(next)
    tabsRef.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: groups.length - 1,
    }
    if (event.key in keys) {
      event.preventDefault()
      focusTab(keys[event.key])
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Chọn dịch vụ để xem giá" className="flex flex-wrap gap-1.5 self-start rounded-2xl bg-surface p-1.5 sm:inline-flex">
        {groups.map((group, index) => {
          const selected = index === active
          return (
            <button
              key={group.service}
              ref={(el) => {
                tabsRef.current[index] = el
              }}
              id={`${uid}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`min-h-11 cursor-pointer rounded-xl px-3.5 text-sm font-semibold transition-colors duration-200 sm:px-5 sm:text-[0.9375rem] ${
                selected
                  ? 'bg-primary text-white'
                  : 'text-ink hover:bg-primary-light hover:text-primary'
              }`}
            >
              {group.serviceName}
            </button>
          )
        })}
      </div>

      {groups.map((group, index) => (
        <div
          key={group.service}
          id={`${uid}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${index}`}
          hidden={index !== active}
          tabIndex={0}
          className="mt-6 focus-visible:outline-offset-4"
        >
          <table className="w-full border-separate border-spacing-0 text-left md:overflow-hidden md:rounded-2xl md:border md:border-line md:bg-surface md:shadow-[var(--shadow-soft)]">
            <caption className="sr-only">Bảng giá tham khảo – {group.serviceName}</caption>
            <thead className="hidden md:table-header-group">
              <tr className="bg-primary-light text-sm text-primary-dark">
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Dịch vụ
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Đơn giá tham khảo
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Đơn vị
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Bảo hành
                </th>
                <th scope="col" className="px-5 py-3.5 text-right font-semibold">
                  <span className="sr-only">Tư vấn</span>
                </th>
              </tr>
            </thead>
            <tbody className="block space-y-3 md:table-row-group md:space-y-0">
              {group.items.map((item) => (
                <tr
                  key={item.name}
                  className="card block space-y-2 p-4 shadow-none md:table-row md:rounded-none md:border-0 md:bg-transparent md:p-0 md:even:bg-primary-light/40"
                >
                  <th
                    scope="row"
                    className="block text-base font-semibold text-ink md:table-cell md:border-t md:border-line md:px-5 md:py-4 md:align-middle"
                  >
                    {item.name}
                  </th>
                  <td className={cell}>
                    <span className={cellLabel}>Đơn giá tham khảo</span>
                    <span className="font-bold whitespace-nowrap text-primary">
                      {item.from ? <span className="text-sm font-medium text-muted">Từ </span> : null}
                      {formatPrice(item.price)}
                    </span>
                  </td>
                  <td className={cell}>
                    <span className={cellLabel}>Đơn vị</span>
                    <span className="text-ink">{item.unit}</span>
                  </td>
                  <td className={cell}>
                    <span className={cellLabel}>Bảo hành</span>
                    <span className="text-muted">{item.warranty}</span>
                  </td>
                  <td className="block pt-1 md:table-cell md:border-t md:border-line md:px-5 md:py-3 md:text-right md:align-middle">
                    <ConsultLink
                      service={group.service}
                      ariaLabel={`Tư vấn ${item.name}`}
                      className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-primary/20 px-5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white md:w-auto"
                    >
                      Tư vấn
                    </ConsultLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
