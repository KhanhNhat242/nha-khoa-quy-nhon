/**
 * Tạo ảnh phái sinh từ thư viện ảnh gốc (không sửa ảnh gốc – R-D6).
 * - Tách ảnh ghép dọc "trước / sau" thành 2 file riêng cho thanh kéo so sánh.
 * - Cắt riêng vùng cần dùng (bác sĩ, ảnh CT) để không tải phần có mặt bệnh nhân (R-D3).
 *
 * Chạy: node scripts/derive-images.mjs
 * Dùng `sharp` có sẵn trong node_modules (dependency của Next.js) – không thêm thư viện.
 */
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'public/images/library')
const outDir = path.join(root, 'public/images/derived')

/** @type {Array<{ out: string, src: string, rect: { left: number, top: number, width: number, height: number } }>} */
const jobs = [
  // Ca chỉnh nha: ảnh 2 tầng (trên: trước, dưới: sau), khung 2048×1536, viền xám 18px
  ...['044', '045', '046', '047'].flatMap((id) => [
    { out: `ca-${id}-truoc`, src: id, rect: { left: 18, top: 19, width: 2012, height: 740 } },
    { out: `ca-${id}-sau`, src: id, rect: { left: 18, top: 777, width: 2012, height: 740 } },
  ]),
  { out: 'ca-019-truoc', src: '019', rect: { left: 16, top: 31, width: 1985, height: 1000 } },
  { out: 'ca-019-sau', src: '019', rect: { left: 16, top: 1047, width: 1985, height: 1000 } },
  // Ca răng sứ: 2 tầng, tầng sau có viền nướu sau gắn sứ
  { out: 'ca-199-truoc', src: '199', rect: { left: 16, top: 52, width: 1708, height: 982 } },
  { out: 'ca-199-sau', src: '199', rect: { left: 16, top: 1050, width: 1708, height: 982 } },
  { out: 'ca-201-truoc', src: '201', rect: { left: 14, top: 14, width: 1508, height: 1003 } },
  { out: 'ca-201-sau', src: '201', rect: { left: 14, top: 1031, width: 1508, height: 1003 } },
  { out: 'ca-203-truoc', src: '203', rect: { left: 15, top: 13, width: 1694, height: 1008 } },
  { out: 'ca-203-sau', src: '203', rect: { left: 15, top: 1036, width: 1694, height: 1008 } },
  // Ca Implant: phim toàn cảnh trước (mất răng) / sau (2 trụ Implant), bỏ dải chữ dọc bên trái
  { out: 'ca-086-truoc', src: '086', rect: { left: 110, top: 17, width: 1920, height: 758 } },
  { out: 'ca-086-sau', src: '086', rect: { left: 110, top: 793, width: 1920, height: 758 } },
  // Cơ sở vật chất – chỉ lấy phần không có gương mặt
  { out: 'sanh-phong-kham', src: '001', rect: { left: 0, top: 0, width: 2027, height: 540 } },
  { out: 'phong-tu-van', src: '007', rect: { left: 0, top: 0, width: 1884, height: 600 } },
  // Tầng giữa ảnh 023: đang gắn mắc cài (dây thun xanh)
  { out: 'nieng-mac-cai-xanh', src: '023', rect: { left: 10, top: 689, width: 1346, height: 668 } },
  // Cận cảnh mắc cài (tầng trên ảnh 056)
  { out: 'nieng-mac-cai', src: '056', rect: { left: 0, top: 0, width: 1924, height: 1012 } },
  // Phim CT 3D
  { out: 'ct-3d-ham', src: '060', rect: { left: 40, top: 10, width: 1316, height: 980 } },
  { out: 'ct-3d-so', src: '060', rect: { left: 40, top: 1029, width: 1316, height: 958 } },
  { out: 'ct-3d-than-kinh', src: '032', rect: { left: 14, top: 1029, width: 1342, height: 1009 } },
  // Bác sĩ trước kệ giấy chứng nhận – cắt bỏ hoàn toàn bệnh nhân bên phải
  { out: 'bac-si-ke-chung-nhan', src: '007', rect: { left: 0, top: 300, width: 900, height: 1125 } },
  // Nhân viên tiếp đón (áo be) trong ảnh tập thể tại sảnh
  { out: 'doi-ngu-tiep-don', src: '001', rect: { left: 1250, top: 560, width: 777, height: 583 } },
]

const files = await readdir(srcDir)
await mkdir(outDir, { recursive: true })

for (const job of jobs) {
  const file = files.find((f) => f.startsWith(`${job.src}-`))
  if (!file) throw new Error(`Không tìm thấy ảnh gốc ${job.src}`)
  const dest = path.join(outDir, `${job.out}.jpg`)
  const info = await sharp(path.join(srcDir, file))
    .extract(job.rect)
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(dest)
  process.stdout.write(`${job.out}.jpg ${info.width}x${info.height}\n`)
}
