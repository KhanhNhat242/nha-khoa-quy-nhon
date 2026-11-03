import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ToothIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 5.5c-1.4-1-2.8-1.6-4.3-1.4C5.2 4.4 3.8 6.6 4 9.2c.2 2.2 1.2 3.6 1.7 5.6.5 2 .6 5.2 2.4 5.2 1.6 0 1.6-3.4 2.4-4.9.4-.7.9-1 1.5-1s1.1.3 1.5 1c.8 1.5.8 4.9 2.4 4.9 1.8 0 1.9-3.2 2.4-5.2.5-2 1.5-3.4 1.7-5.6.2-2.6-1.2-4.8-3.7-5.1-1.5-.2-2.9.4-4.3 1.4Z" />
    </Base>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 4.9 4.9l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </Base>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Base>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5 6v5.5c0 4.3 2.9 7.8 7 9.5 4.1-1.7 7-5.2 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Base>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Base>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  )
}

export function ScanIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10" />
    </Base>
  )
}

export function ChatIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 18.5 3.5 21l.5-3.7A8 8 0 1 1 7.4 19.6Z" />
      <path d="M8.5 11h7M8.5 14h4.5" />
    </Base>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 20s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />
    </Base>
  )
}

export function UserIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </Base>
  )
}

export function SliderHandleIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
    </Base>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  )
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M4 18v-5.5C4 8.4 6.2 5.7 10 5v2.6c-2 .6-3 2-3.1 4H10V18H4Zm10 0v-5.5c0-4.1 2.2-6.8 6-7.5v2.6c-2 .6-3 2-3.1 4H20V18h-6Z" />
    </svg>
  )
}

export function ExternalIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Base>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.6V21h3.2Z" />
    </svg>
  )
}

/** Chữ "Zalo" cách điệu trong khung bo tròn – không dùng logo thương hiệu dạng ảnh. */
export function ZaloIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M12 3C6.5 3 2.5 6.6 2.5 11c0 2.4 1.2 4.6 3.1 6l-.6 3.2 3.4-1.7c1.1.3 2.3.5 3.6.5 5.5 0 9.5-3.6 9.5-8s-4-8-9.5-8Z"
        fill="currentColor"
      />
      <text
        x="12"
        y="13.6"
        textAnchor="middle"
        fontSize="6.2"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        fill="var(--color-zalo)"
      >
        Zalo
      </text>
    </svg>
  )
}
