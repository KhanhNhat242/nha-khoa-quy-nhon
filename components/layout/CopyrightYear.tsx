import { cacheLife } from 'next/cache'

/** Năm bản quyền tính tự động (R-B8); cache theo ngày để vẫn prerender được với cacheComponents. */
export async function CopyrightYear() {
  'use cache'
  cacheLife('days')
  return <>{new Date().getFullYear()}</>
}
