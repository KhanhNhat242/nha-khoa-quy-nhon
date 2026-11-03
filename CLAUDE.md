# RULES DỰ ÁN — WEBSITE NHA KHOA QUY NHƠN

@AGENTS.md
@docs/REQUIREMENTS.md

Các rule dưới đây là **bắt buộc** cho mọi thay đổi (code, nội dung, ảnh, cấu hình), do người hay AI thực hiện. Mỗi rule có mã (vd. `R-C3`) để trích dẫn khi review. Khi rule mâu thuẫn với yêu cầu mới của người dùng: **dừng lại, chỉ ra rule bị ảnh hưởng, hỏi trước khi làm**, sau đó cập nhật rule/tài liệu cho khớp.

---

## A. Nguồn sự thật & quy trình

- **R-A1** `docs/REQUIREMENTS.md` là nguồn sự thật. Đọc phần liên quan trước khi làm bất kỳ việc gì.
- **R-A2** Yêu cầu mới / thay đổi phạm vi → **cập nhật `docs/REQUIREMENTS.md` trước** (đúng mục + thêm dòng vào mục 16 "Nhật ký thay đổi", ghi ngày dạng `dd/mm/yyyy`), rồi mới code.
- **R-A3** Không tự thêm trang, dịch vụ, tính năng, thư viện ngoài phạm vi tài liệu. Đề xuất thì ghi vào mục 13 và hỏi.
- **R-A4** Dữ liệu chưa xác nhận → comment `// TODO(xac-nhan): <mô tả>` tại chỗ dùng **và** có dòng tương ứng trong mục 13. Khi khách xác nhận: thay dữ liệu, xoá TODO, cập nhật mục 13 + nhật ký.
- **R-A5** Phiên bản Next.js là **16.4.x** (có thay đổi phá vỡ). Trước khi dùng API Next nào chưa chắc, đọc tài liệu trong `node_modules/next/dist/docs/` (xem `AGENTS.md`). Không viết theo trí nhớ về Next 13/14/15.

## B. Nội dung & dữ liệu

- **R-B1 Không bịa dữ kiện kiểm chứng được**: địa chỉ, giờ làm việc, tên/bằng cấp/số chứng chỉ hành nghề bác sĩ, số năm kinh nghiệm, số khách đã điều trị, giải thưởng, chứng nhận, thương hiệu vật liệu, số năm bảo hành, giá. Thiếu thì làm theo cột "Trong lúc chờ" ở mục 13.
- **R-B2** Mọi thông tin phòng khám (tên, SĐT, Zalo, Facebook, toạ độ, link Maps, địa chỉ, giờ, cờ `isDemo`) chỉ nằm ở **một file** `data/site.ts`. Component **không được hardcode** số điện thoại, link mạng xã hội, địa chỉ.
- **R-B3** Nội dung động (dịch vụ, bác sĩ, bảng giá, bài viết, danh mục ảnh, FAQ) là dữ liệu có kiểu TypeScript trong thư mục `data/`. Trang chỉ render từ dữ liệu, không nhúng nội dung dài vào JSX.
- **R-B4** Ngôn ngữ: **tiếng Việt có dấu đầy đủ**, chính tả chuẩn. Xưng "chúng tôi / Nha Khoa Quy Nhơn", gọi khách là "bạn" (hoặc "quý khách" ở văn bản trang trọng). Không trộn tiếng Anh khi có từ tiếng Việt tương đương. Không để lorem ipsum, "Hello world", text tiếng Anh mẫu.
- **R-B5 Ngôn từ quảng cáo y tế**: cấm "tốt nhất", "số 1", "duy nhất", "hàng đầu", "cam kết 100%", "không đau tuyệt đối", "vĩnh viễn", "trọn đời" và mọi hứa hẹn kết quả điều trị. Dùng cách nói thận trọng: "giảm ê buốt", "hạn chế đau", "kết quả tuỳ tình trạng răng của mỗi người". Bài kiến thức chỉ đưa thông tin phổ thông, luôn khuyên khách đến thăm khám.
- **R-B6 Giá**: hiển thị dạng bảng HTML (không phải ảnh), định dạng `1.500.000đ` (dấu chấm ngăn nghìn) qua 1 hàm dùng chung; luôn kèm ghi chú: *"Bảng giá mang tính tham khảo. Chi phí chính xác được bác sĩ tư vấn sau khi thăm khám."*
- **R-B7** Tên 5 dịch vụ, thứ tự và slug phải đúng mục 4 của tài liệu yêu cầu, giống nhau ở menu, footer, form, bảng giá, trang dịch vụ.
- **R-B8** Năm bản quyền ở footer tính tự động, không gõ cứng.

## C. Thương hiệu & thiết kế

- **R-C1 Không có logo**: dùng **wordmark chữ** "Nha Khoa Quy Nhơn" (component `components/layout/Logo.tsx`), có thể kèm icon răng dạng line đơn giản. Không vẽ lại/trace logo trong ảnh khi chưa có file gốc từ khách.
- **R-C2** **Cấm dùng `public/images/mainlogo-img1.jpg`** (logo homestay của template cũ) và mọi tàn dư homestay (tiêu đề "Booking Homestay", màu be `#EFE8DC`, `.glass-panel` tông kem).
- **R-C3 Màu**: chỉ dùng token trong mục 6.1 của tài liệu, khai báo trong `@theme` của `app/globals.css` (Tailwind v4 → class `bg-primary`, `text-ink`, `border-line`…) và đồng bộ sang `ConfigProvider` của antd. **Không viết mã hex rời** trong component. `accent` (`#14B8A6`) không dùng làm màu chữ trên nền trắng — dùng `accent-dark`.
- **R-C4** Chỉ giao diện sáng; không thêm dark mode.
- **R-C5 Font**: **Be Vietnam Pro** qua `next/font/google` với `subsets: ['vietnamese', 'latin']`, gắn biến CSS vào `<html>`. Không dùng font không có subset tiếng Việt.
- **R-C6 Mobile-first**: kiểm tra ở 360px, 768px, 1280px. Không cuộn ngang. Vùng chạm ≥ 44×44px. Body ≥ 16px.
- **R-C7 Tối giản & tin cậy**: mỗi section một thông điệp, nhiều khoảng trắng, bo góc/bóng đổ nhất quán (dùng chung class/component, không mỗi chỗ một kiểu). Không thêm hiệu ứng rối mắt; animation dùng hệ `data-reveal` có sẵn và phải tôn trọng `prefers-reduced-motion`. Ngoại lệ đã duyệt (03/11/2026): hiệu ứng chữ Rising Ink (`components/ui/RisingInk.tsx`) cho H1 hero và Luminous Type (`.luminous-type`) cho mô tả hero – tự viết, không thêm thư viện.
- **R-C8 Khả năng tiếp cận**: HTML ngữ nghĩa (`header/nav/main/section/footer`), mỗi trang **một H1**, thứ bậc heading không nhảy cóc, mọi input có `label`, nút chỉ có icon phải có `aria-label`, focus nhìn thấy được, tương phản chữ ≥ 4.5:1.

## D. Ảnh

- **R-D1** Ưu tiên **ảnh thật** trong `public/images/library/`. Không dùng ảnh stock người nước ngoài hoặc ảnh AI giả làm ảnh phòng khám.
- **R-D2 Mở xem ảnh trước khi dùng.** Tên file không mô tả nội dung → mỗi ảnh được dùng phải có mục trong danh mục `data/gallery.ts` gồm: `src`, `alt` (tiếng Việt, mô tả đúng nội dung), `category` (`phong-kham` | `doi-ngu` | `ca-dieu-tri` | `thiet-bi` | `hoat-dong`), `service?` (slug), `privacy` (`none` | `covered` | `mouth-only` | `face-visible`), `width`, `height`. Component lấy ảnh từ danh mục, không gõ đường dẫn ảnh rời.
- **R-D3 Quyền riêng tư bệnh nhân**: chỉ dùng ảnh ca điều trị có `privacy` là `covered` hoặc `mouth-only`. Ảnh `face-visible` (đặc biệt **trẻ em**) **không được dùng** cho đến khi khách xác nhận (Q10); có thể cắt sát vùng miệng bằng `object-position` thì ghi `mouth-only`. (Ngoại lệ ảnh hero `021` đã bỏ từ 03/11/2026 – hero dùng `public/images/hero-img.jpg`.) Ảnh cắt bỏ hẳn bệnh nhân / tách tầng trước-sau nằm ở `public/images/derived/` (tạo bằng `node scripts/derive-images.mjs`).
- **R-D4** Đúng ngữ cảnh: ảnh sự kiện/tiệc (`hoat-dong`) không dùng cho trang dịch vụ, hero hay bảng giá.
- **R-D5** Luôn dùng `next/image` với `sizes` hợp lý; chỉ ảnh hero đầu trang mới đặt ưu tiên tải bằng prop `preload` (Next 16 đã deprecate `priority`, không dùng). Ảnh gốc rất nặng (~52 MB tổng) → không dùng `<img>` thô, không `unoptimized`.
- **R-D6** Không đổi tên, không xoá, không ghi đè file ảnh gốc trong `public/images/library/` nếu không được yêu cầu.

## E. Kỹ thuật

- **R-E1 Stack cố định**: Next.js 16.4 (App Router, Turbopack) · React 19.3 · TypeScript strict · Tailwind CSS v4 · antd v6 (+ `@ant-design/nextjs-registry`). Không thêm thư viện UI/CSS khác; thêm bất kỳ dependency nào phải nêu lý do và hỏi trước.
- **R-E2 Server Components mặc định.** `'use client'` chỉ đặt ở **component lá cần tương tác** (menu mobile, form, lightbox, tab, nút nổi…), không đặt ở `page.tsx`/`layout.tsx`.
- **R-E3** `cacheComponents: true` đang bật: không dùng route segment config cũ (`export const dynamic = …`, `revalidate`, `fetchCache`). Dữ liệu tĩnh từ `data/` là import thường; nếu cần cache dùng `'use cache'` + `cacheLife`, dữ liệu theo request thì bọc `<Suspense>` — theo `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.
- **R-E4 Route động**: `params` là **Promise** → `const { slug } = await params`; dùng helper toàn cục `PageProps<'/dich-vu/[slug]'>`/`LayoutProps`. Có `generateStaticParams` cho `/dich-vu/[slug]` và `/tin-tuc/[slug]`; slug không tồn tại → `notFound()`.
- **R-E5 Form**: dùng **Server Action** (`'use server'`) + `useActionState` ở client component; validate lại phía server; không log dữ liệu cá nhân; kênh nhận dữ liệu là `TODO(xac-nhan)` (Q9).
- **R-E6 antd**: chỉ dùng cho control phức tạp (Form/Input/Select/DatePicker, Collapse cho FAQ, Tabs, Modal, Image preview, Drawer). Bọc trong client component. `ConfigProvider` cấu hình `locale={viVN}` và theme token khớp R-C3 (`colorPrimary: '#1E40AF'`, font Be Vietnam Pro, `borderRadius` thống nhất). Phần trình bày tĩnh dùng Tailwind + HTML ngữ nghĩa.
- **R-E7 Cấu trúc thư mục** (import qua alias `@/`):
  ```
  app/                    # route: page.tsx, layout.tsx, not-found.tsx, sitemap.ts, robots.ts
    dich-vu/[slug]/page.tsx  tin-tuc/[slug]/page.tsx  gioi-thieu/  doi-ngu-bac-si/  hinh-anh/  bang-gia/  lien-he/
  components/
    layout/               # Header, Footer, Logo, FloatingContact, MobileMenu
    sections/             # các khối trang: Hero, ServicesGrid, WhyUs, Doctors, BeforeAfter, ...
    forms/                # BookingForm (client) 
    ui/                   # Container, SectionHeading, Button, ... (dùng chung)
  data/                   # site.ts, services.ts, doctors.ts, prices.ts, posts.ts, gallery.ts, faqs.ts
  lib/                    # hàm tiện ích: format giá, chuẩn hoá SĐT, seo, actions/
  types/                  # kiểu dữ liệu dùng chung
  ```
- **R-E8 TypeScript**: không `any`, không `@ts-ignore`; kiểu dữ liệu cho mọi file trong `data/`. Component đặt tên PascalCase, file component `PascalCase.tsx`; route và slug dùng **tiếng Việt không dấu, gạch nối** (`trong-rang-implant`).
- **R-E9** Dùng `next/link` cho link nội bộ; link ngoài (Zalo, Facebook, Maps) có `target="_blank" rel="noopener noreferrer"`; link gọi dùng `tel:+84…`. Không để `href="#"`.
- **R-E10** Không đặt secret/API key trong code; biến môi trường đặt trong `.env.local` (đã được `.gitignore`).

## F. Chức năng bắt buộc toàn site

- **R-F1** Mọi trang có: Header (hotline + nút "Đặt lịch"), cụm nút nổi **Gọi / Zalo** (+ Facebook), Footer — render từ `app/layout.tsx`, không lặp lại trong từng trang.
- **R-F2** Mỗi trang nội dung kết thúc bằng một CTA (đặt lịch / gọi / Zalo). Trang chi tiết dịch vụ có form với dịch vụ được chọn sẵn.
- **R-F3** Google Maps nhúng bằng `<iframe>` theo toạ độ trong `data/site.ts`, có `title`, `loading="lazy"`, kèm nút "Chỉ đường" mở Google Maps.
- **R-F4** Cụm nút nổi không che nút gửi form hay nội dung quan trọng trên mobile.

## G. SEO & metadata

- **R-G1** `<html lang="vi">`. `metadata` gốc có `title.template: '%s | Nha Khoa Quy Nhơn'`; mỗi trang có `title` + `description` riêng (tiếng Việt, ~150 ký tự). Trang động dùng `generateMetadata`.
- **R-G2** Có `app/sitemap.ts`, `app/robots.ts`, Open Graph (ảnh thật của phòng khám).
- **R-G3** Khi `site.isDemo === true`: `robots` chặn index (`noindex, nofollow`). Chỉ tắt khi khách duyệt và có tên miền chính thức (Q13).
- **R-G4** JSON-LD `Dentist` chỉ chứa trường **đã xác nhận** (không đưa địa chỉ/giờ mở cửa tự đoán).

## H. Hoàn thành công việc (Definition of Done)

Một thay đổi chỉ được coi là xong khi:
1. `npm run lint` và `npm run build` chạy **không lỗi** (báo lại nguyên văn lỗi nếu có, không giấu).
2. Đã kiểm tra hiển thị ở 360px / 768px / 1280px với trang bị ảnh hưởng.
3. Không còn text tiếng Anh mẫu, link `#`, `console.log`, ảnh sai ngữ cảnh.
4. Dữ liệu chưa xác nhận có `TODO(xac-nhan)` + nằm trong mục 13.
5. Nếu thay đổi phạm vi/thiết kế: `docs/REQUIREMENTS.md` đã được cập nhật kèm nhật ký.
6. Đối chiếu lại checklist mục 15 của tài liệu yêu cầu với phần vừa làm.

## I. Việc dọn template bắt buộc (làm trước khi xây trang)

Template hiện tại còn tàn dư dự án homestay — phải xử lý trước (đã hoàn tất 03/11/2026):
- [x] `app/layout.tsx`: `title: "Booking Homestay"` → metadata Nha Khoa Quy Nhơn; `lang="en"` → `"vi"`; thay Geist bằng Be Vietnam Pro.
- [x] `app/globals.css`: bỏ `font-family: Arial…`, bỏ khối dark mode, bỏ `border-color: #EFE8DC` và `.glass-panel` tông kem; khai báo token màu R-C3 trong `@theme`.
- [x] `app/page.tsx`: bỏ `'use client'` và nội dung placeholder.
- [x] Xoá `public/images/mainlogo-img1.jpg` và các SVG mẫu không dùng (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) — xác nhận với người dùng trước khi xoá.
- [x] `package.json` `name` → `nha-khoa-quy-nhon`; `README.md` viết lại ngắn gọn (cách chạy + trỏ tới `CLAUDE.md` và `docs/REQUIREMENTS.md`).
