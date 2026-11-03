# TÀI LIỆU YÊU CẦU — WEBSITE NHA KHOA QUY NHƠN

> Nguồn: **Phiếu DEV 51 – Nha Khoa Quy Nhơn** (file `nha-khoa-quy-nhon.pdf`, sale ghi), cùng phần khảo sát tư liệu ảnh trong repo và 3 website tham khảo.
> Đây là **nguồn sự thật duy nhất (single source of truth)** cho dự án. Mọi thay đổi yêu cầu phải cập nhật file này trước khi code (xem mục 16 – Nhật ký thay đổi).
>
> Quy ước trong tài liệu:
> - **[PHIẾU]**: thông tin lấy nguyên văn từ phiếu.
> - **[SUY RA]**: dev diễn giải từ phiếu hoặc từ tư liệu, chưa được khách/sale xác nhận.
> - **[CHỜ XÁC NHẬN]**: thông tin còn thiếu, phải hỏi sale/khách. Chi tiết ở mục 13.

---

## 0. Thông tin phiếu

| Trường | Giá trị |
|---|---|
| STT phiếu | **51** [PHIẾU] |
| Ngày giao hồ sơ | **30/10/2026** [PHIẾU] |
| Sale phụ trách | **Minh Toàn** [PHIẾU] |
| Mã DN (file sale) | **DN0123** [PHIẾU] |
| Hạn giao demo | *(trống)*. Phiếu ghi "Nhắc: **SALE GHI HẠN**" → sale phải ghi hạn [CHỜ XÁC NHẬN] |
| Ưu tiên (GĐ chọn) | *(trống)* [CHỜ XÁC NHẬN] |
| Ngày gửi khách / Phản hồi của khách | *(trống, điền sau khi gửi demo)* |

---

## 1. Thông tin doanh nghiệp

| Trường | Giá trị trong phiếu | Ghi chú cho dev |
|---|---|---|
| Tên doanh nghiệp | **Nha Khoa Quy Nhơn** [PHIẾU] | Tên hiển thị chính trên web. Ảnh thực tế có biển hiệu/backdrop ghi "NHA KHOA QUY NHƠN **Dr Thảo**" và "**QUY NHƠN DENTAL CLINIC**". Chưa dùng tên mở rộng khi chưa xác nhận [CHỜ XÁC NHẬN]. |
| Ngành | Nha khoa / Y tế / Phòng khám [PHIẾU] | |
| Tỉnh / TP | Quy Nhơn [PHIẾU] | |
| Người liên hệ | `982474703` [PHIẾU] | Ô này ghi **một dãy số chứ không phải tên người**, nhiều khả năng là SĐT thiếu số 0 đầu (`0982 474 703`). **Không hiển thị công khai** cho đến khi xác nhận [CHỜ XÁC NHẬN]. |
| SĐT / Zalo | **076 275 6899** [PHIẾU] | Hotline + Zalo công khai. `tel:+84762756899` · Zalo: `https://zalo.me/0762756899` |
| Facebook Page | https://www.facebook.com/nhakhoaquynhon [PHIẾU] | |
| Google Maps | [link trong phiếu](https://www.google.com/maps/place/Nha+Khoa+Quy+Nh%C6%A1n/@13.8073207,109.1447385,17z/data=!3m1!4b1!4m6!3m5!1s0x316f156515ddd7eb:0x665a65ac91fd09a3!8m2!3d13.8073207!4d109.1473134!16s%2Fg%2F11rmt3bw_j) [PHIẾU] | Toạ độ ghim: **13.8073207, 109.1473134**. Embed: `https://www.google.com/maps?q=13.8073207,109.1473134&hl=vi&z=17&output=embed` |
| Địa chỉ dạng chữ | *(phiếu không có)* | Không tự bịa số nhà/tên đường [CHỜ XÁC NHẬN] |
| Website hiện tại | *(trống)* | Coi như chưa có website [SUY RA] |
| Khách đồng ý xem demo? | *(trống)* | [CHỜ XÁC NHẬN] |
| Giờ làm việc | *(phiếu không có)* | [CHỜ XÁC NHẬN] |
| Email | *(phiếu không có)* | [CHỜ XÁC NHẬN] |

---

## 2. Mục tiêu website

- **[PHIẾU]** Giới thiệu công ty/dịch vụ.
- **[SUY RA]** Với một phòng khám, mục tiêu chuyển đổi thực tế là khách **gọi điện / nhắn Zalo / để lại form đặt lịch tư vấn**. Mọi trang phải luôn có lối ra tới 3 hành động này.

## 3. Khách hàng mục tiêu

**[PHIẾU]** Người dân tại Quy Nhơn và khu vực lân cận; người có nhu cầu chăm sóc răng miệng, phục hình hoặc thẩm mỹ răng; cá nhân và gia đình có nhu cầu khám nha khoa.

Hệ quả thiết kế **[SUY RA]**:
- Đa số truy cập bằng **điện thoại** → thiết kế mobile-first, nút gọi/Zalo luôn trong tầm tay.
- Nhiều độ tuổi (cả phụ huynh, người lớn tuổi) → chữ đủ lớn (body ≥ 16px), tương phản tốt, câu chữ dễ hiểu, tránh thuật ngữ chưa giải thích.
- Khách địa phương → nhấn mạnh địa chỉ, bản đồ, chỉ đường, "gần bạn".
- Có gia đình/trẻ em → giọng văn thân thiện, trấn an, không gây sợ.

## 4. Dịch vụ chính (5 mục)

**[PHIẾU]** Đúng 5 dịch vụ, giữ đúng thứ tự:

| # | Tên hiển thị | Slug (URL) |
|---|---|---|
| 1 | Khám nha khoa tổng quát | `kham-nha-khoa-tong-quat` |
| 2 | Răng sứ thẩm mỹ | `rang-su-tham-my` |
| 3 | Niềng răng / Chỉnh nha | `nieng-rang-chinh-nha` |
| 4 | Trồng răng Implant | `trong-rang-implant` |
| 5 | Tẩy trắng răng | `tay-trang-rang` |

Không thêm dịch vụ khác vào menu/danh sách khi chưa được xác nhận (ví dụ: nhổ răng khôn, nha khoa trẻ em…). Nếu cần, ghi vào mục 13 trước.

## 5. Điểm mạnh / khác biệt (USP)

**[PHIẾU]** "Đề xuất nhấn mạnh **đội ngũ bác sĩ**, **cơ sở vật chất**, **quy trình tư vấn** và **chăm sóc khách hàng**."

→ 4 trụ cột này là xương sống của khối "Vì sao chọn chúng tôi" và phải được minh hoạ bằng **ảnh thực tế** (ảnh đội ngũ, ảnh phòng khám, ảnh thiết bị/phim CT…), không dùng icon chung chung thay cho bằng chứng.

## 6. Phong cách & màu sắc

**[PHIẾU]** "Xanh dương – trắng – xanh ngọc nhạt; phong cách nha khoa hiện đại, sạch sẽ, tin cậy, tối giản; **ưu tiên hình ảnh thực tế**."

### 6.1 Bảng màu (design tokens) [cập nhật 03/11/2026 theo bộ style Trust & Authority — đã đo tương phản WCAG]

| Token | Hex | Vai trò | Tương phản |
|---|---|---|---|
| `primary` | `#1E40AF` | Xanh dương chủ đạo (Trust & Authority): nút chính, link, tiêu đề nhấn | 8.72:1 trên trắng ✔ |
| `primary-dark` | `#1E3A8A` | Tiêu đề lớn, thanh trên cùng, footer, hover | 10.36:1 ✔ |
| `primary-light` | `#EFF6FF` | Nền section xen kẽ | (nền) — `primary` trên nền này 8.01:1 |
| `accent` | `#14B8A6` | Xanh ngọc nhấn phụ: đường kẻ, icon, tay kéo slider | 2.49:1 ✘ **không dùng làm màu chữ** |
| `accent-dark` | `#0F766E` | Khi cần chữ màu xanh ngọc | 5.47:1 trên trắng, 4.86:1 trên `accent-light` ✔ |
| `accent-light` | `#CCFBF1` | Nền khu vực xanh ngọc nhạt | (nền) |
| `canvas` | `#F5F5F7` | Nền khối Dịch vụ (Bento) và ô phụ | (nền) — `muted` 6.96:1 |
| `ink` | `#0F172A` | Chữ chính | 17.85:1 ✔ |
| `muted` | `#475569` | Chữ phụ, mô tả | 7.58:1 trên trắng (đạt mức 7:1 của Accessible & Ethical) ✔ |
| `line` | `#E2E8F0` | Viền, đường chia | (viền) |
| `surface` | `#FFFFFF` | Nền chính | — |
| `zalo` | `#0068FF` | Chỉ dùng cho nút Zalo (chữ trắng 4.75:1) | — |
| `danger` | `#B42318` | Chỉ dùng cho thông báo lỗi form | 6.57:1 ✔ |

**Bộ style (03/11/2026):** lưới & typography theo *Swiss Modernism 2.0* (lưới 12 cột, tiêu đề căn trái, không hoạ tiết trang trí) · bề mặt thẻ & bóng theo *Soft UI Evolution* (bo 16–24px, bóng nhiều lớp rất nhẹ, chuyển động 200–300ms) · màu phẳng theo *Flat Design* (không gradient) · bố cục nội dung theo *Trust & Authority* · *Accessible & Ethical* là chuẩn nền (focus ring 3px, chữ phụ ≥ 7:1, vùng chạm ≥ 44px). Style bổ trợ: Hero-Centric (hero), Bento Box Grid (Dịch vụ, Cơ sở vật chất), Editorial Grid (Tin tức), Social Proof (Bác sĩ, Cảm nhận), Glassmorphism chỉ điểm xuyết ở header + nút nổi.

- **Chỉ có giao diện sáng (light).** Nền trắng là một phần nhận diện; bỏ khối `prefers-color-scheme: dark` cũ của template.
- Không dùng tông be/nâu/cam của template homestay cũ (`#EFE8DC`, `rgba(255,253,249,…)`).

### 6.2 Chữ (typography)
- Font phải hỗ trợ **tiếng Việt** (subset `vietnamese`). Mặc định: **Be Vietnam Pro** qua `next/font/google` (font thiết kế riêng cho tiếng Việt, dấu đẹp và cân hơn) thay cho Geist của template. Bỏ `font-family: Arial` trong `globals.css` vì nó đang ghi đè font của `next/font`.
- Body ≥ 16px, line-height ~1.6. Tiêu đề rõ thứ bậc H1 → H2 → H3; mỗi trang đúng **một H1**.

### 6.3 Tinh thần thiết kế
- Hiện đại, sạch, nhiều khoảng trắng, bo góc vừa phải, bóng đổ nhẹ. Tối giản: mỗi section một thông điệp.
- **Ảnh thật của phòng khám là chủ đạo.** Không dùng ảnh stock người nước ngoài, không dùng ảnh AI giả làm ảnh phòng khám.
- Hiệu ứng nhẹ: tái sử dụng hệ thống `data-reveal` có sẵn trong `app/globals.css` (đã tôn trọng `prefers-reduced-motion`). Biến thể `fade-up`: nhích 16px, ~400ms, xuất hiện tuần tự cho thẻ dịch vụ và 4 trụ cột USP.

### 6.4 Quy chuẩn khoảng cách & mật độ chữ (brief thiết kế landing — 03/11/2026)
- **Padding dọc mỗi section**: desktop ≥1280px 88–112px (`lg:py-24`/`lg:py-28`) · tablet 768px 64–80px (`md:py-16`/`md:py-20`) · mobile 360px 48–56px (`py-12`/`py-14`).
- **Khoảng cách tiêu đề section → nội dung**: 40–48px desktop (`lg:mb-12`), 28–32px mobile (`mb-8`).
- **Lưới card**: gap 24–32px (`gap-6`/`gap-8`), bo góc 16px (`rounded-2xl`), viền mảnh `line` + bóng đổ rất nhẹ (dùng chung class `.card`).
- **Nhịp nền xen kẽ** thay cho đường kẻ ngang: Trắng → `primary-light` → Trắng → `accent-light`…
- **Cụm tiêu đề section**: nhãn phụ 2–4 từ (in hoa nhỏ, nền `accent-light`, chữ `accent-dark`) · H2 6–10 từ, màu `primary-dark` · mô tả 18–28 từ, `max-w-2xl`, màu `muted`.
- **Card**: H3 3–6 từ · mô tả 15–22 từ (2–3 dòng).
- `accent` chỉ dùng cho gạch chân trang trí dưới từ khoá H1, nền icon, đường nối timeline, viền hover, tay kéo thanh trượt trước/sau — không làm màu chữ.

### 6.5 Bố cục Trang chủ (landing 1 trang)
Thứ tự section (nền): 0. Thanh trên cùng (`primary-dark`) · 1. Hero – chữ trái nền trắng, ảnh thật tràn nửa phải, cao vừa 1 màn hình (trắng) · 2. 5 dịch vụ – Bento, phóng to Răng sứ & Implant, giá "từ…" từ `data/prices.ts` + ghi chú giá tham khảo (`canvas`) · 3. Vì sao chọn – 4 trụ cột bằng ảnh thật (trắng) · 4. Trước/Sau – tab Răng sứ / Niềng răng / Implant + thanh kéo (`primary-light`) · 5. Đội ngũ bác sĩ – Social Proof: thẻ có avatar, chuyên khoa, kinh nghiệm, chứng chỉ hành nghề ("Đang cập nhật" khi chưa có – R-B1/Q6); dải số liệu đếm tăng chỉ hiện khi có số đã xác nhận (Q17) (trắng) · 6. Cơ sở vật chất – Bento ảnh thật (`accent-light`) · 7. Quy trình 4 bước (trắng) · 8. Bảng giá theo tab (`primary-light`) · 9. Cảm nhận khách hàng – thẻ đánh giá sao chỉ hiện đánh giá thật được cho phép (Q16), khi chưa có thì dẫn tới Google Maps & Facebook (trắng) · 10. Form đặt lịch + bản đồ + giờ (`accent-light`) · 11. Tin tức – Editorial Grid 1 bài lớn + 2 bài nhỏ, chữ sans-serif (trắng).
- Trong lúc chưa có trang con `/dich-vu/[slug]`, `/tin-tuc/[slug]`: nút trên thẻ dịch vụ / bảng giá dẫn tới form trong trang và **chọn sẵn dịch vụ**; thẻ tin tức mở bài đọc trong cửa sổ (antd Modal). Tab bảng giá dùng tablist ARIA tự viết dạng chip (xuống dòng được, đủ 5 tab ở 360px) thay cho antd Tabs. Không để link chết. Khi xây trang con thì đổi về link chi tiết.
- Ảnh trước/sau ghép dọc và ảnh có bệnh nhân được **cắt thành ảnh phái sinh** trong `public/images/derived/` bằng `scripts/derive-images.mjs` (dùng `sharp` có sẵn của Next, không sửa ảnh gốc – R-D6). Mỗi ảnh phái sinh có mục riêng trong `data/gallery.ts`.

## 7. Website tham khảo khách thích

**[PHIẾU]** https://nhakhoavietmy.com.vn/ · https://nhakhoavananh.vn/ · https://jandentist.vn/

Tóm tắt các điểm chung nên học (đã khảo sát ngày 02/11/2026):
- Header có **hotline + nút "Đặt lịch"**; cụm **nút nổi** Gọi / Zalo / Messenger.
- Trang chủ: Banner → Dịch vụ (card) → Vì sao chọn chúng tôi → Đội ngũ bác sĩ → Ca trước/sau → Cơ sở vật chất → Cảm nhận khách hàng → Form đặt lịch → Tin tức → Footer.
- Trang chi tiết dịch vụ: Hero + CTA → Dịch vụ là gì / lợi ích → Ai nên làm (chỉ định) → **Quy trình các bước** → Ca thực tế → Bác sĩ → **FAQ** → Form.
- Bảng giá dạng **bảng HTML (chữ, không phải ảnh)**, chia tab theo dịch vụ, cột: Dịch vụ | Đơn giá | Đơn vị | Bảo hành, có nút "Tư vấn" mỗi dòng và ghi chú điều kiện giá.
- Form ngắn: Họ tên, SĐT, Dịch vụ quan tâm, thời gian mong muốn, ghi chú, **ô đồng ý xử lý dữ liệu cá nhân**.

Lỗi của các site tham khảo **không được lặp lại**: bảng giá dạng ảnh; thông tin bảo hành mâu thuẫn giữa các khối; hotline hiển thị khác số trong link `tel:`; năm bản quyền cũ; nội dung mẫu "Hello world"/lorem ipsum/testimonial tiếng Anh sót lại; link `#` chết.

## 8. Sơ đồ trang (sitemap) & chức năng

**[PHIẾU]** Chức năng cần có: *Trang chủ; Giới thiệu; Danh sách dịch vụ; Chi tiết dịch vụ; Đội ngũ bác sĩ; Hình ảnh phòng khám; Bảng giá tham khảo; Tin tức/kiến thức nha khoa; Form đăng ký tư vấn hoặc đặt lịch; Nút gọi điện; Zalo; Google Maps.*

| # | Trang | Route | Nội dung bắt buộc |
|---|---|---|---|
| 1 | Trang chủ | `/` | Hero (ảnh thật + thông điệp + 2 CTA: Đặt lịch / Gọi ngay) · 5 dịch vụ · 4 trụ cột USP · Đội ngũ bác sĩ (rút gọn) · Ca trước/sau · Hình ảnh phòng khám (rút gọn) · Quy trình thăm khám · Form đặt lịch · Tin tức mới · Bản đồ |
| 2 | Giới thiệu | `/gioi-thieu` | Câu chuyện/sứ mệnh · 4 trụ cột USP · Ảnh đội ngũ & phòng khám · Hoạt động tập thể · CTA |
| 3 | Danh sách dịch vụ | `/dich-vu` | 5 card dịch vụ (ảnh, mô tả ngắn, link chi tiết) · CTA |
| 4 | Chi tiết dịch vụ | `/dich-vu/[slug]` | Hero + CTA · Giới thiệu dịch vụ · Lợi ích · Ai nên làm · Quy trình các bước · Ca thực tế (nếu có ảnh phù hợp) · Giá tham khảo (link `/bang-gia`) · FAQ · Form đặt lịch (chọn sẵn dịch vụ). Chỉ 5 slug ở mục 4; slug khác → `notFound()`. |
| 5 | Đội ngũ bác sĩ | `/doi-ngu-bac-si` | Ảnh tập thể · Card bác sĩ (ảnh, họ tên, chức danh, thế mạnh) |
| 6 | Hình ảnh phòng khám | `/hinh-anh` | Thư viện ảnh có lọc theo nhóm (Phòng khám & thiết bị · Đội ngũ · Ca điều trị · Hoạt động) + xem ảnh lớn (lightbox) |
| 7 | Bảng giá tham khảo | `/bang-gia` | Bảng theo tab 5 dịch vụ · Ghi chú "giá tham khảo" · CTA tư vấn mỗi dòng |
| 8 | Tin tức / Kiến thức | `/tin-tuc`, `/tin-tuc/[slug]` | Danh sách bài (ảnh, tiêu đề, tóm tắt, ngày) · Chi tiết bài · Bài liên quan · CTA |
| 9 | Liên hệ & Đặt lịch | `/lien-he` | Form đặt lịch · SĐT/Zalo/Facebook · Google Maps nhúng + nút "Chỉ đường" · Giờ làm việc |
| — | 404 | `not-found.tsx` | Thông báo tiếng Việt + về trang chủ + hotline |

### 8.1 Thành phần dùng chung toàn site
- **Thanh trên cùng** (không dính): địa chỉ · giờ làm việc · hotline · Zalo/Facebook (mobile rút gọn: giờ làm việc + hotline).
- **Header** (dính khi cuộn): wordmark "Nha Khoa Quy Nhơn" · menu · hotline · nút "Đặt lịch". Mobile: menu ngăn kéo, hotline + Đặt lịch vẫn hiện.
- **Cụm nút nổi** (góc dưới phải, mọi trang): **Gọi** (`tel:`), **Zalo**, (tuỳ chọn) **Facebook/Messenger**. Không che nội dung/form trên mobile.
- **Footer**: tên phòng khám, hotline, Zalo, Facebook, địa chỉ/bản đồ, giờ làm việc, menu nhanh, 5 dịch vụ, © năm hiện tại (tính tự động).
- **Menu chính**: Trang chủ · Giới thiệu · Dịch vụ (dropdown 5 mục) · Đội ngũ bác sĩ · Hình ảnh · Bảng giá · Tin tức · Liên hệ.

## 9. Form đăng ký tư vấn / đặt lịch

| Trường | Bắt buộc | Kiểu / kiểm tra |
|---|---|---|
| Họ và tên | ✔ | 2–60 ký tự |
| Số điện thoại | ✔ | SĐT di động VN: `^(0|\+84)(3|5|7|8|9)\d{8}$` (bỏ khoảng trắng/dấu chấm trước khi kiểm) |
| Dịch vụ quan tâm | ✔ | 5 dịch vụ mục 4 + "Chưa rõ, cần bác sĩ tư vấn" |
| Ngày mong muốn | – | Không cho chọn ngày quá khứ |
| Buổi | – | Sáng / Chiều / Tối |
| Ghi chú / tình trạng răng | – | ≤ 500 ký tự |
| Đồng ý cho phòng khám liên hệ & xử lý thông tin | ✔ | Checkbox |

- Kiểm tra dữ liệu **cả phía client và phía server** (Server Action).
- Có trạng thái đang gửi / thành công / lỗi bằng tiếng Việt; chống bấm gửi nhiều lần.
- **Bản demo:** chưa có nơi nhận dữ liệu (email / Google Sheets / Zalo OA) → Server Action chỉ kiểm tra hợp lệ rồi trả thành công, đánh dấu `TODO(xac-nhan)` kênh nhận [CHỜ XÁC NHẬN]. Không ghi log thông tin cá nhân của khách ra console/file.
- Form xuất hiện ở: Trang chủ, mỗi trang chi tiết dịch vụ (chọn sẵn dịch vụ), `/lien-he`.

## 10. Liên hệ & CTA

| Kênh | Hiển thị | Link |
|---|---|---|
| Gọi điện | 076 275 6899 | `tel:+84762756899` |
| Zalo | Zalo 076 275 6899 | `https://zalo.me/0762756899` |
| Facebook | /nhakhoaquynhon | `https://www.facebook.com/nhakhoaquynhon` |
| Google Maps | Nhúng bản đồ + nút "Chỉ đường" | Toạ độ `13.8073207,109.1473134` |

Số hiển thị và số trong link **phải là một**. Tất cả lấy từ một file cấu hình duy nhất (xem rule trong `CLAUDE.md`).

## 11. Tư liệu ảnh & logo (hiện trạng repo)

- **Logo:** Phiếu ghi Link Logo và Link ảnh **cùng một thư mục Drive**, mục "Lưu ý / điều cần tránh" ghi **"không có logo"** → khách **chưa có file logo**. Header/footer dùng **wordmark chữ** "Nha Khoa Quy Nhơn" (font thương hiệu, màu `primary-dark`, có thể kèm 1 icon răng đơn giản dạng line). Không vẽ/trace lại logo răng xuất hiện trên đồng phục trong ảnh khi chưa được khách cung cấp file gốc.
- ⚠️ `public/images/mainlogo-img1.jpg` là **logo homestay (cây thông + ngôi nhà) còn sót từ template cũ**, **không phải** của khách → **cấm sử dụng**, sẽ xoá khi dọn template.
- **Thư viện ảnh:** `public/images/library/` gồm **209 ảnh** (`001`→`209`, 204 JPG + 5 PNG, tổng ~52 MB, ảnh gốc 1–2K px), tên file theo ID Facebook nên **không mô tả nội dung**. Các nhóm đã thấy khi khảo sát mẫu:
  - Đội ngũ bác sĩ & nhân viên chụp tập thể tại sảnh phòng khám (vd. `001`).
  - Ca **trước/sau** (răng sứ, niềng răng…), ảnh ghép dọc 2 tầng; một số ảnh đã che mắt bằng sticker, **một số để lộ mặt, có ảnh trẻ em** (vd. `015`, `030`, `180`).
  - Ảnh phim CT 3D / X-quang (vd. `060`) → minh hoạ thiết bị chẩn đoán.
  - Ảnh sự kiện nội bộ (Year End Party…) (vd. `120`) → chỉ dùng cho mục hoạt động/văn hoá, không dùng cho trang dịch vụ.
- Nội thất thật của phòng khám: tông trắng, gỗ ấm, cây trang trí; nhân viên mặc scrub xanh rêu → ảnh có sắc ấm, cần nền trắng/xanh nhạt để cân bằng với bảng màu.
- Ảnh phải được lập **danh mục** (catalog) trước khi dùng — xem rule trong `CLAUDE.md`.

## 12. Các trường phiếu bỏ trống → giả định mặc định

| Trường | Giả định đang áp dụng | Trạng thái |
|---|---|---|
| Ngôn ngữ | **Chỉ tiếng Việt** (`<html lang="vi">`), không làm đa ngôn ngữ | [SUY RA] |
| Nội dung sẵn có (giới thiệu, bảng giá, giờ mở cửa) | Không có → dev viết nội dung mẫu đúng chuyên môn, mọi số liệu cụ thể đánh dấu chờ xác nhận | [SUY RA] |
| Website hiện tại | Chưa có | [SUY RA] |
| Khách đồng ý xem demo | Chưa rõ, vẫn làm demo theo phiếu | [CHỜ XÁC NHẬN] |
| Hạn giao demo / Ưu tiên | Chưa có | [CHỜ XÁC NHẬN] |

## 13. Dữ liệu chờ xác nhận (open questions)

Mọi chỗ trong code dùng dữ liệu dưới đây phải có comment `// TODO(xac-nhan): <mô tả>` để tìm lại bằng `grep -rn "TODO(xac-nhan)"`.

| # | Câu hỏi | Hỏi ai | Trong lúc chờ |
|---|---|---|---|
| Q1 | Địa chỉ đầy đủ dạng chữ? | Sale/khách | Hiển thị "Quy Nhơn" + bản đồ theo toạ độ (không ghi tên tỉnh cho tới khi khách xác nhận địa chỉ theo địa giới hành chính mới). Lưu ý: ghim Google Maps nằm cạnh Đường 638, không ở khu trung tâm → không viết "trung tâm Quy Nhơn" |
| Q2 | Giờ làm việc? | Sale/khách | Ẩn dòng giờ hoặc ghi "Liên hệ để được hẹn giờ" — không tự đặt giờ |
| Q3 | Ô "Người liên hệ" = `982474703` là gì (SĐT `0982 474 703`)? Tên người liên hệ? | Sale | Không hiển thị |
| Q4 | Tên thương hiệu đầy đủ có kèm "Dr Thảo" / "Quy Nhơn Dental Clinic" không? | Sale/khách | Dùng "Nha Khoa Quy Nhơn" |
| Q5 | Có file logo gốc không (ảnh có logo răng trên đồng phục)? | Sale/khách | Wordmark chữ |
| Q6 | Danh sách bác sĩ: họ tên, chức danh, chuyên môn, ảnh chân dung? | Khách | Dùng tên mẫu dạng "BS. Nguyễn Văn A" (rõ là mẫu), không bịa bằng cấp/số chứng chỉ hành nghề |
| Q7 | Bảng giá thực tế 5 dịch vụ? | Khách | Bảng giá mẫu, đánh dấu chờ xác nhận + ghi chú "giá tham khảo" |
| Q8 | Chính sách bảo hành từng dịch vụ? | Khách | Không ghi số năm bảo hành |
| Q9 | Kênh nhận form đặt lịch (email / Google Sheets / Zalo OA)? | Sale/khách | Server Action giả lập thành công |
| Q10 | Được phép dùng ảnh trước/sau lộ mặt (đặc biệt trẻ em) không? | Khách | Chỉ dùng ảnh đã che mắt hoặc cắt sát vùng miệng. **Ngoại lệ đã được người dùng duyệt (03/11/2026):** ảnh hero `021` (bác sĩ + bạn trẻ thả tim, lộ mặt) — phải hỏi khách đồng ý trước khi gửi demo/công khai; nếu không đồng ý thì đổi sang ảnh đội ngũ `001` trong `data/gallery.ts`. |
| Q11 | Email, Messenger, TikTok/YouTube? | Sale/khách | Chỉ hiện Facebook |
| Q12 | Hạn giao demo, mức ưu tiên? | Sale/GĐ | — |
| Q13 | Tên miền & nơi deploy chính thức? | Sale | Demo `noindex` |
| Q14 | Loại điều trị cụ thể của từng ca trước/sau (mắc cài kim loại, sứ…)? | Khách | Chú thích theo tình trạng nhìn thấy trên ảnh + tên dịch vụ chung, không ghi vật liệu/thương hiệu |
| Q15 | Phòng khám có tư vấn / khám ban đầu miễn phí không? | Khách | Không ghi "miễn phí"; dùng "Gọi tư vấn" |
| Q17 | Số liệu cho dải "con số" (năm hoạt động, số khách đã điều trị, số bác sĩ, điểm đánh giá Google)? | Khách | Không hiển thị dải số liệu cho tới khi có số đã xác nhận (`data/stats.ts` để `null`) |
| Q16 | Đánh giá Google / video cảm nhận nào được phép trích dẫn trên web (kèm sự đồng ý của khách hàng)? | Khách | Không tự viết đánh giá; section Cảm nhận dẫn link tới đánh giá thật trên Google Maps & Facebook |

## 14. Quy trình phiếu (phần dev phải làm)

Phiếu ghi "Dev điền **3** ô vàng" nhưng thực tế có **4** ô vàng; dev điền đủ cả 4 trên sheet:
1. **Dev phụ trách** — chọn tên.
2. **Trạng thái demo** — chọn trạng thái.
3. **Link demo** — dán link.
4. **Trạng thái gửi sale** — khi xong chọn "**Xong – chờ sale gửi**" (phiếu sẽ tự đóng).

## 15. Tiêu chí nghiệm thu bản demo

- [ ] Đủ 9 trang ở mục 8 + trang 404; menu, link nội bộ không có link chết/`#`.
- [ ] 5 trang chi tiết dịch vụ đúng tên, đúng thứ tự mục 4.
- [ ] Nút Gọi / Zalo / Facebook / Chỉ đường hoạt động đúng số & link ở mục 10, có mặt trên mọi trang.
- [ ] Form đặt lịch kiểm tra dữ liệu đúng mục 9, hiển thị trạng thái tiếng Việt.
- [ ] Google Maps nhúng đúng vị trí.
- [ ] Đúng bảng màu & font mục 6; không còn dấu vết template homestay (tiêu đề "Booking Homestay", logo cây thông, màu be, `lang="en"`).
- [ ] Hiển thị tốt ở 360px, 768px, 1280px+; không cuộn ngang.
- [ ] Ảnh dùng `next/image`, có `alt` tiếng Việt mô tả; không dùng ảnh vi phạm mục 11/Q10.
- [ ] `npm run lint` và `npm run build` không lỗi.
- [ ] Mỗi trang có `title`/`description` riêng; site demo đang `noindex`.
- [ ] Mọi dữ liệu chưa xác nhận đều có `TODO(xac-nhan)` và nằm trong bảng mục 13.

## 16. Nhật ký thay đổi yêu cầu

| Ngày | Thay đổi | Nguồn / người yêu cầu |
|---|---|---|
| 02/11/2026 | Khởi tạo tài liệu từ Phiếu DEV 51 + khảo sát ảnh + 3 website tham khảo | Phiếu sale (Minh Toàn) |
| 03/11/2026 | Thêm token màu `danger` (lỗi form) vào 6.1; thêm mục 6.4 (quy chuẩn spacing & mật độ chữ), 6.5 (bố cục landing 9 section, ảnh phái sinh, CTA trong trang khi chưa có trang con); ngoại lệ ảnh hero `021` ở Q10; thêm Q14, Q15. Dọn template: xoá logo homestay + SVG mẫu (đã được duyệt). | Brief thiết kế landing của người dùng |
| 03/11/2026 | Đối chiếu danh sách section mới: thêm thanh trên cùng, giá "từ…" trên thẻ dịch vụ, tab Răng sứ / Niềng răng / Implant cho trước–sau (thêm ca 199, 201, 203, 086), trường kinh nghiệm & chứng chỉ hành nghề cho thẻ bác sĩ, section Cơ sở vật chất (bento), section Cảm nhận khách hàng (Q16). Cập nhật 6.5, 8.1. | Danh sách section của người dùng |
| 03/11/2026 | Đổi bảng màu 6.1 sang bộ Trust & Authority (#1E40AF / #CCFBF1 / #14B8A6, thêm `canvas` #F5F5F7); áp bộ style Swiss Modernism 2.0 + Soft UI Evolution + Flat + Accessible & Ethical, style bổ trợ theo từng khối; hero giữ ảnh 021 tràn nửa phải; số liệu/đánh giá sao chỉ hiện khi có dữ liệu thật (thêm Q17). | Yêu cầu restyle của người dùng |
| 03/11/2026 | Người dùng tắt section "Vì sao chọn" và mục menu tương ứng; sắp lại nhịp nền: Dịch vụ (`canvas`) · Trước/Sau (trắng) · Bác sĩ (`primary-light`) · Cơ sở vật chất (trắng) · Quy trình (`accent-light`) · Bảng giá (trắng) · Cảm nhận (`primary-light`) · Đặt lịch (trắng) · Tin tức (`canvas`). | Người dùng |
