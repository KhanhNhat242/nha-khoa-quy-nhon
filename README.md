# Website Nha Khoa Quy Nhơn

Website giới thiệu & đặt lịch cho Nha Khoa Quy Nhơn (Phiếu DEV 51). Next.js 16.4 · React 19.3 · TypeScript · Tailwind CSS v4 · antd v6.

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm run start
```

Tạo lại ảnh phái sinh (cắt từ `public/images/library/`, không sửa ảnh gốc):

```bash
node scripts/derive-images.mjs
```

## Tài liệu bắt buộc đọc trước khi sửa

- [`CLAUDE.md`](CLAUDE.md) – rule dự án (R-A … R-I).
- [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) – yêu cầu, nguồn sự thật duy nhất.

Tìm dữ liệu còn chờ khách xác nhận: `grep -rn "TODO(xac-nhan)" app components data lib`.
