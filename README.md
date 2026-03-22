# 📅 FAP Exam to Google Calendar Extension

**FAP Exam to Google Calendar** là một Chrome Extension giúp sinh viên Đại học FPT (FPTU) tự động trích xuất lịch thi từ cổng đào tạo FAP và thêm vào Google Calendar chỉ với một cú click chuột.

---

## 📋 Mô tả Chrome Web Store

### Tóm tắt ngắn (Short Description — tối đa 132 ký tự)

```
Tự động trích xuất lịch thi từ FAP và thêm vào Google Calendar chỉ với 1 click. Không bao giờ bỏ lỡ kỳ thi!
```

---

### Mô tả chi tiết (Full Description)

```
Tiện ích hỗ trợ sinh viên FPTU tự động thêm lịch thi vào Google Calendar

🎓 Bạn có bao giờ bỏ lỡ một ca thi chỉ vì quên check FAP không? FAP Exam to Google Calendar giải quyết vấn đề đó ngay lập tức!

Thay vì phải nhìn lịch trên FAP rồi tự gõ tay từng môn vào Google Calendar, tiện ích này sẽ tự động phân tích bảng lịch thi và đặt một nút "+ Thêm vào Lịch" ngay bên cạnh mỗi môn — chỉ cần bấm là xong!


🌟 TÍNH NĂNG NỔI BẬT:

📅 Thêm lịch thi vào Google Calendar chỉ với 1 click
Không cần copy thủ công. Extension tự đọc môn học, ngày thi, ca thi, phòng thi và điền thẳng vào Google Calendar giúp bạn.

🕐 Hỗ trợ đầy đủ định dạng FPT
Tự động xử lý định dạng ngày kiểu Việt Nam (DD/MM/YYYY) và ca thi kiểu FPT (07h30-09h00) — chuyển đổi chính xác sang chuẩn Google Calendar.

📍 Điền đầy đủ thông tin
Sự kiện được tạo với đầy đủ: Tên môn, Mã môn, Phòng thi, Ca thi, Hình thức thi (Multiple Choice / Practical Exam) và múi giờ Việt Nam (GMT+7).

⚠️ Xử lý phòng thi chưa có
Nếu phòng thi chưa được FAP cập nhật, tiện ích sẽ ghi chú "TBA — Check FAP later" để nhắc bạn kiểm tra lại sau.

🔒 An toàn & minh bạch
Extension KHÔNG thu thập bất kỳ dữ liệu cá nhân nào. KHÔNG gửi thông tin đi đâu cả. Toàn bộ hoạt động diễn ra ngay trong trình duyệt của bạn.


📖 HƯỚNG DẪN SỬ DỤNG:

1. Cài đặt tiện ích từ Chrome Web Store
2. Đăng nhập vào FAP (https://fap.fpt.edu.vn)
3. Truy cập trang Exam Schedule:
   https://fap.fpt.edu.vn/Exam/ScheduleExams.aspx
4. Trang sẽ tự động hiển thị nút "+ Thêm vào Lịch" ở cuối mỗi dòng môn thi
5. Bấm vào nút — Google Calendar sẽ mở ra với thông tin đã điền sẵn
6. Xác nhận và lưu — xong!


⚠️ LƯU Ý:

- Tiện ích chỉ hoạt động trên trang Exam Schedule của FAP
- Phòng thi có thể chưa được FAP cập nhật — hãy kiểm tra lại FAP gần ngày thi
- Nếu bảng lịch thi chưa hiện nút, hãy thử tải lại trang (F5)


🔐 QUYỀN TRUY CẬP:

Tiện ích chỉ yêu cầu quyền đọc trang fap.fpt.edu.vn — không có quyền nào khác. Xem chi tiết tại Privacy Policy của chúng tôi.
```

---

## ✨ Tính năng chính
- 🚀 **Trích xuất tự động**: Tự động nhận diện môn học, ngày thi, ca thi và phòng thi từ trang FAP.
- 📅 **Tích hợp Google Calendar**: Tạo sự kiện lịch chỉ với 1 click qua URL Template (không cần quyền truy cập email).
- 🛠️ **Hỗ trợ định dạng FPT**: Xử lý ca thi (ví dụ: `07h30-09h00`) và ngày tháng (`DD/MM/YYYY`) chuẩn xác.

## 🛠️ Hướng dẫn cài đặt (Dành cho Developer)
1. Tải source code về máy hoặc `git clone`.
2. Mở trình duyệt Chrome, truy cập `chrome://extensions/`.
3. Bật **Developer mode** (Góc trên bên phải).
4. Chọn **Load unpacked** và trỏ đến thư mục `src`.

## 📦 Công nghệ sử dụng
- **Manifest V3** (Tiêu chuẩn mới nhất của Chrome Extension).
- **Vanilla JavaScript**: Để tối ưu hiệu năng và độ nhẹ.
- **CSS**: Styling cho nút bấm tích hợp vào giao diện FAP.

## 📄 Privacy Policy
Bạn có thể xem chính sách bảo mật tại: [Privacy Policy](src/privacy-policy.html)

---
*Lưu ý: Đây là dự án hỗ trợ sinh viên, không thuộc sở hữu chính thức của FPT University.*
