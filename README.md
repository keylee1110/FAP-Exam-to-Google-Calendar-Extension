# 📅 FAP Exam to Google Calendar Extension

**FAP Exam to Google Calendar** là một Chrome Extension giúp sinh viên Đại học FPT (FPTU) tự động trích xuất lịch thi từ cổng đào tạo FAP và thêm vào Google Calendar chỉ với một cú click chuột.

## ✨ Tính năng chính
- 🚀 **Trích xuất tự động**: Tự động nhận diện môn học, ngày thi, ca thi và phòng thi từ trang FAP.
- 📅 **Tích hợp Google Calendar**: Tạo sự kiện lịch chỉ với 1 click qua URL Template (không cần quyền truy cập email).
- 🛠️ **Hỗ trợ định dạng FPT**: Xử lý ca thi (ví dụ: `07h30-09h00`) và ngày tháng (`DD/MM/YYYY`) chuẩn xác.
- 📍 **Điền đầy đủ thông tin**: Sự kiện bao gồm Tên môn, Phòng thi, Hình thức thi và múi giờ GMT+7.

## 📖 Hướng dẫn sử dụng
1. Cài đặt tiện ích vào trình duyệt Chrome.
2. Đăng nhập vào [FAP](https://fap.fpt.edu.vn).
3. Truy cập trang **Exam Schedule** (Lịch thi).
4. Nút **"+ Thêm vào Lịch"** sẽ tự động xuất hiện ở cuối mỗi dòng môn thi.
5. Bấm vào nút để mở Google Calendar với thông tin đã điền sẵn, sau đó nhấn **Lưu**.

## 🛠️ Hướng dẫn cài đặt (Dành cho Developer)
1. Tải source code về máy hoặc `git clone`.
2. Mở trình duyệt Chrome, truy cập `chrome://extensions/`.
3. Bật **Developer mode** (Góc trên bên phải).
4. Chọn **Load unpacked** và trỏ đến thư mục `src`.

## ⚠️ Lưu ý
- Tiện ích chỉ hoạt động trên trang **ScheduleExams.aspx** của FAP.
- Phòng thi có thể chưa được cập nhật sớm trên FAP, hãy kiểm tra lại trước ngày thi.
- Nếu không thấy nút xuất hiện, hãy thử tải lại trang (F5).

## 📄 Privacy Policy
Bạn có thể xem chính sách bảo mật tại: [Privacy Policy](privacy-policy.html)

---
*Lưu ý: Đây là dự án hỗ trợ sinh viên, không thuộc sở hữu chính thức của FPT University.*
