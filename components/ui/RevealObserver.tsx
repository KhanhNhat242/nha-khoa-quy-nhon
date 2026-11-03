'use client'

import { useEffect } from 'react'

/** Gắn class `is-revealed` cho phần tử `[data-reveal]` khi cuộn tới (hệ animation có sẵn). */
export function RevealObserver() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    const observeAll = () =>
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => io.observe(el))
    observeAll()

    // Phần tử render lại sau khi lọc (vd. danh sách ca trước/sau)
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
