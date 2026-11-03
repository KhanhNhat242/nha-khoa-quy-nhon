import Image from 'next/image'
import { buttonStyles } from '@/components/ui/button-styles'
import { CountUp } from '@/components/ui/CountUp'
import { CalendarIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { doctors } from '@/data/doctors'
import { getImage } from '@/data/gallery'
import { BOOKING_ANCHOR, site } from '@/data/site'
import { stats } from '@/data/stats'

const PENDING = 'Đang cập nhật'

/** Chữ cái đầu của tên (bỏ "BS.") cho avatar chữ – chưa có ảnh chân dung (Q6). */
function initials(name: string) {
  const parts = name.replace(/^BS\.\s*/, '').trim().split(/\s+/)
  return parts[parts.length - 1]?.charAt(0).toUpperCase() ?? ''
}

/** Social Proof: ảnh đội ngũ thật, thẻ bác sĩ, dải số liệu (chỉ khi có số xác nhận – Q17). */
export function Doctors() {
  const team = getImage('doiNguTapThe')
  const confirmedStats = stats.filter((s): s is typeof s & { value: number } => s.value !== null)

  return (
    <Section id="doi-ngu" tone="blue" labelledBy="doi-ngu-title">
      <SectionHeading
        id="doi-ngu-title"
        eyebrow="Đội ngũ bác sĩ"
        title="Đội Ngũ Bác Sĩ Tận Tâm, Đồng Hành Cùng Bạn"
        description="Bác sĩ trực tiếp thăm khám, giải thích kỹ trên phim chụp và theo sát từng giai đoạn điều trị của bạn."
      />

      {confirmedStats.length > 0 ? (
        <dl className="mb-10 grid grid-cols-2 border-y border-line lg:mb-14 lg:grid-cols-4">
          {confirmedStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse py-6 lg:py-8 ${index > 0 ? 'lg:border-l lg:border-line lg:pl-8' : ''} ${index % 2 === 1 ? 'border-l border-line pl-6 lg:pl-8' : ''}`}
            >
              <dt className="mt-2 text-[0.9375rem] text-muted">{stat.label}</dt>
              <dd className="text-4xl font-extrabold tracking-[-0.02em] text-primary lg:text-5xl">
                <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-8">
        {/* Ảnh tiêu điểm */}
        <figure data-reveal="fade-up" className="lg:sticky lg:top-28 lg:col-span-5">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-primary-light">
            <Image
              src={team.src}
              alt={team.alt}
              fill
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover object-[50%_60%]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            Đội ngũ bác sĩ, điều dưỡng và nhân viên tiếp đón tại sảnh {site.name}.
          </figcaption>
        </figure>

        <div className="lg:col-span-7">
          <ul className="grid gap-4">
            {doctors.map((doctor, index) => (
              <li
                key={doctor.name}
                data-reveal="fade-up"
                style={revealDelay(index * 90)}
                className="card rounded-3xl p-5 transition-colors duration-200 hover:border-accent sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-2xl font-bold text-white"
                    aria-hidden="true"
                  >
                    {initials(doctor.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="flex flex-wrap items-center gap-2 text-lg font-bold text-primary-dark">
                      {doctor.name}
                      {doctor.isSample ? (
                        <span className="rounded-md bg-primary-light px-2 py-0.5 text-xs font-semibold text-primary">
                          Tên mẫu
                        </span>
                      ) : null}
                    </h3>
                    <p className="text-[0.9375rem] text-muted">{doctor.title}</p>
                  </div>
                </div>

                <dl className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.08em] text-muted uppercase">Chuyên khoa</dt>
                    <dd className="mt-0.5 font-semibold text-accent-dark">{doctor.specialty}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.08em] text-muted uppercase">Kinh nghiệm</dt>
                    <dd className={`mt-0.5 font-semibold ${doctor.experience ? 'text-ink' : 'text-muted italic'}`}>
                      {doctor.experience ?? PENDING}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.08em] text-muted uppercase">Chứng chỉ hành nghề</dt>
                    <dd className={`mt-0.5 font-semibold ${doctor.license ? 'text-ink' : 'text-muted italic'}`}>
                      {doctor.license ?? PENDING}
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 text-[0.9375rem] text-muted">{doctor.strengths}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={`#${BOOKING_ANCHOR}`} className={buttonStyles.primary}>
              <CalendarIcon className="size-5" />
              Đặt lịch gặp bác sĩ
            </a>
            {site.isDemo ? <p className="text-sm text-muted">Thông tin bác sĩ đang chờ phòng khám cập nhật.</p> : null}
          </div>
        </div>
      </div>
    </Section>
  )
}
