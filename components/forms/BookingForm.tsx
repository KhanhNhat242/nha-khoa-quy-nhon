'use client'

import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from 'react'
import { buttonStyles } from '@/components/ui/button-styles'
import { CheckIcon, ChevronDownIcon } from '@/components/ui/Icons'
import { CONSULT_OTHER, services } from '@/data/services'
import { submitBooking } from '@/lib/actions/booking'
import {
  NOTE_MAX,
  SESSIONS,
  readBookingForm,
  todayInVietnam,
  validateBooking,
  type BookingErrors,
  type BookingField,
  type BookingState,
} from '@/lib/booking'
import { SELECT_SERVICE_EVENT } from '@/lib/select-service'

const initialState: BookingState = { status: 'idle' }

const inputClass =
  'block min-h-12 w-full min-w-0 rounded-xl border border-line bg-surface px-4 text-base text-ink transition outline-none placeholder:text-muted/70 focus:border-primary focus:ring-3 focus:ring-primary/20 aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/15'

const noopSubscribe = () => () => {}

/** Ngày hôm nay (chỉ tính ở trình duyệt, tránh lệch giữa lúc prerender và lúc xem). */
function useToday() {
  return useSyncExternalStore(
    noopSubscribe,
    () => todayInVietnam(new Date()),
    () => '',
  )
}

/** Form đặt lịch – mục 9 tài liệu yêu cầu. */
export function BookingForm({ defaultService = '' }: { defaultService?: string }) {
  const [round, setRound] = useState(0)
  return <BookingFormInner key={round} defaultService={defaultService} onReset={() => setRound((n) => n + 1)} />
}

function BookingFormInner({ defaultService, onReset }: { defaultService: string; onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitBooking, initialState)
  const [clientErrors, setClientErrors] = useState<BookingErrors>({})
  const [service, setService] = useState(defaultService)
  const [noteLength, setNoteLength] = useState(0)
  const today = useToday()
  const uid = useId()

  // Nhận sự kiện "chọn sẵn dịch vụ" từ thẻ dịch vụ / bảng giá trên cùng trang
  useEffect(() => {
    const onSelect = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail
      setService(slug)
      setClientErrors((prev) => ({ ...prev, service: undefined }))
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect)
  }, [])

  const serverErrors = state.status === 'error' ? state.errors : {}
  const errors: BookingErrors = { ...serverErrors, ...clientErrors }
  const fieldId = (field: BookingField) => `${uid}-${field}`
  const errorId = (field: BookingField) => `${uid}-${field}-loi`
  const invalidProps = (field: BookingField) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? errorId(field) : undefined,
  })

  const clearError = (field: BookingField) => {
    if (errors[field]) setClientErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const formData = new FormData(form)
    const found = validateBooking(readBookingForm(formData), today || todayInVietnam(new Date()))
    // Giữ khoá có giá trị undefined để ghi đè lỗi cũ từ server
    const next: BookingErrors = {}
    for (const key of ['name', 'phone', 'service', 'date', 'session', 'note', 'consent'] as BookingField[]) {
      next[key] = found[key]
    }
    setClientErrors(next)
    const firstInvalid = (Object.keys(found) as BookingField[])[0]
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus()
      return
    }
    startTransition(() => formAction(formData))
  }

  if (state.status === 'success') {
    return (
      <div className="py-6 text-center" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent-light text-accent-dark">
          <CheckIcon className="size-8" />
        </span>
        <p className="mt-5 text-xl font-bold text-primary-dark">Đăng ký thành công</p>
        <p className="mx-auto mt-2 max-w-sm text-muted">{state.message}</p>
        <button type="button" onClick={onReset} className={`${buttonStyles.outline} mt-6`}>
          Đặt thêm lịch khác
        </button>
      </div>
    )
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Họ và tên" required htmlFor={fieldId('name')} error={errors.name} errorId={errorId('name')}>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={60}
            placeholder="Nguyễn Văn An"
            className={inputClass}
            onChange={() => clearError('name')}
            {...invalidProps('name')}
          />
        </Field>
        <Field label="Số điện thoại" required htmlFor={fieldId('phone')} error={errors.phone} errorId={errorId('phone')}>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="0912 345 678"
            className={inputClass}
            onChange={() => clearError('phone')}
            {...invalidProps('phone')}
          />
        </Field>
      </div>

      <Field
        label="Dịch vụ quan tâm"
        required
        htmlFor={fieldId('service')}
        error={errors.service}
        errorId={errorId('service')}
      >
        <div className="relative">
        <select
          id={fieldId('service')}
          name="service"
          required
          value={service}
          onChange={(event) => {
            setService(event.target.value)
            clearError('service')
          }}
          className={`${inputClass} appearance-none pr-11`}
          {...invalidProps('service')}
        >
          <option value="" disabled>
            Chọn dịch vụ
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value={CONSULT_OTHER.value}>{CONSULT_OTHER.label}</option>
        </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted" />
        </div>
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Ngày mong muốn" htmlFor={fieldId('date')} error={errors.date} errorId={errorId('date')}>
          <input
            id={fieldId('date')}
            name="date"
            type="date"
            min={today || undefined}
            className={inputClass}
            onChange={() => clearError('date')}
            {...invalidProps('date')}
          />
        </Field>
        <fieldset aria-describedby={errors.session ? errorId('session') : undefined}>
          <legend className="mb-2 block text-[0.9375rem] font-semibold text-ink">Buổi</legend>
          <div className="grid grid-cols-3 gap-2">
            {SESSIONS.map((s) => (
              <label key={s.value} className="relative">
                <input type="radio" name="session" value={s.value} className="peer sr-only" />
                <span className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-line bg-surface text-[0.9375rem] font-medium text-ink transition peer-checked:border-primary peer-checked:bg-primary-light peer-checked:text-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary/20 hover:border-primary/50">
                  {s.label}
                </span>
              </label>
            ))}
          </div>
          {errors.session ? <ErrorText id={errorId('session')}>{errors.session}</ErrorText> : null}
        </fieldset>
      </div>

      <Field
        label="Ghi chú / tình trạng răng"
        htmlFor={fieldId('note')}
        error={errors.note}
        errorId={errorId('note')}
        hint={`${noteLength}/${NOTE_MAX}`}
      >
        <textarea
          id={fieldId('note')}
          name="note"
          rows={3}
          maxLength={NOTE_MAX}
          placeholder="Ví dụ: răng ê buốt khi uống lạnh, muốn tư vấn niềng răng cho con…"
          className={`${inputClass} resize-y py-3`}
          onChange={(event) => {
            setNoteLength(event.target.value.length)
            clearError('note')
          }}
          {...invalidProps('note')}
        />
      </Field>

      <div>
        <label htmlFor={fieldId('consent')} className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-ink">
          <input
            id={fieldId('consent')}
            name="consent"
            type="checkbox"
            required
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-primary"
            onChange={() => clearError('consent')}
            {...invalidProps('consent')}
          />
          <span>
            Tôi đồng ý để Nha Khoa Quy Nhơn liên hệ và xử lý thông tin trên nhằm sắp xếp lịch hẹn, tư vấn.{' '}
            <span className="text-danger" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.consent ? <ErrorText id={errorId('consent')}>{errors.consent}</ErrorText> : null}
      </div>

      {state.status === 'error' ? (
        <p role="alert" className="rounded-xl bg-danger/5 px-4 py-3 text-[0.9375rem] text-danger">
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className={`${buttonStyles.primary} min-h-14 w-full text-[1.0625rem]`}>
        {pending ? (
          <>
            <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            Đang gửi…
          </>
        ) : (
          'Gửi đăng ký đặt lịch'
        )}
      </button>
      <p className="-mt-1 text-center text-sm text-muted">
        Thông tin của bạn chỉ dùng để phòng khám liên hệ xác nhận lịch hẹn.
      </p>
    </form>
  )
}

function Field({
  label,
  required,
  htmlFor,
  error,
  errorId,
  hint,
  children,
}: {
  label: string
  required?: boolean
  htmlFor: string
  error?: string
  errorId: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-[0.9375rem] font-semibold text-ink">
          {label}
          {required ? (
            <span className="text-danger" aria-hidden="true">
              {' '}
              *
            </span>
          ) : null}
        </label>
        {hint ? <span className="text-sm text-muted">{hint}</span> : null}
      </div>
      {children}
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  )
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-danger">
      {children}
    </p>
  )
}
