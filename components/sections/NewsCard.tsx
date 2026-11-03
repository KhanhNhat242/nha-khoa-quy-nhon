'use client'

import { Modal } from 'antd'
import Image from 'next/image'
import { useState } from 'react'
import { buttonStyles } from '@/components/ui/button-styles'
import { ArrowRightIcon, CalendarIcon } from '@/components/ui/Icons'
import { CONSULT_OTHER } from '@/data/services'
import { formatDate } from '@/lib/format'
import { selectService } from '@/lib/select-service'
import type { GalleryImage, Post } from '@/types'

/**
 * Thẻ bài viết kiểu Editorial (chưa có trang /tin-tuc/[slug] → mở bài đọc trong cửa sổ, mục 6.5).
 * featured: bài lớn ảnh trên; compact: ảnh trái – chữ phải.
 */
export function NewsCard({ post, image, variant = 'compact' }: { post: Post; image: GalleryImage; variant?: 'featured' | 'compact' }) {
  const [open, setOpen] = useState(false)
  const titleId = `bai-${post.slug}`
  const featured = variant === 'featured'

  return (
    <article
      className={`group h-full ${featured ? 'flex flex-col' : 'grid grid-cols-[7.5rem_1fr] items-start gap-4 sm:grid-cols-[11rem_1fr] sm:gap-6'}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-ink ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={featured ? '(min-width: 1024px) 700px, 100vw' : '(min-width: 640px) 176px, 120px'}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex min-w-0 flex-1 flex-col ${featured ? 'pt-6' : ''}`}>
        <p className="flex items-center gap-2 text-sm text-muted">
          <span className="font-semibold tracking-[0.12em] text-accent-dark uppercase">Kiến thức</span>
          <span aria-hidden="true">·</span>
          <CalendarIcon className="size-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3
          id={titleId}
          className={`mt-2 font-bold tracking-[-0.01em] text-balance text-primary-dark ${
            featured ? 'text-2xl leading-tight lg:text-[2rem]' : 'line-clamp-3 text-lg leading-snug'
          }`}
        >
          {post.title}
        </h3>
        <p className={`mt-2 text-muted ${featured ? 'line-clamp-3 text-lg' : 'line-clamp-2 text-[0.9375rem] max-sm:hidden'}`}>
          {post.excerpt}
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-describedby={titleId}
          className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 self-start font-semibold text-primary transition-[gap] group-hover:gap-3"
        >
          Đọc bài viết
          <ArrowRightIcon className="size-5" />
        </button>
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={760}
        centered
        destroyOnHidden
        title={null}
        closable={{ 'aria-label': 'Đóng bài viết' }}
      >
        <div className="relative -mx-6 -mt-5 mb-6 aspect-[16/8] overflow-hidden rounded-t-2xl bg-ink">
          <Image src={image.src} alt={image.alt} fill sizes="760px" className="object-cover" />
        </div>
        <p className="flex items-center gap-2 text-sm text-muted">
          <CalendarIcon className="size-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h2 className="mt-2 text-2xl leading-snug font-bold text-primary-dark">{post.title}</h2>
        <div className="mt-4 space-y-5 text-base leading-relaxed text-ink">
          {post.body.map((block, index) => (
            <section key={block.heading ?? index}>
              {block.heading ? <h3 className="mb-2 text-lg font-bold text-primary-dark">{block.heading}</h3> : null}
              {block.paragraphs.map((p) => (
                <p key={p} className="mt-2 first:mt-0">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-primary-light p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-primary-dark">Cần bác sĩ tư vấn cho trường hợp của bạn?</p>
          <button
            type="button"
            className={buttonStyles.primary}
            onClick={() => {
              setOpen(false)
              selectService(CONSULT_OTHER.value)
            }}
          >
            Đặt lịch tư vấn
          </button>
        </div>
      </Modal>
    </article>
  )
}
