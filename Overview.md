

# 📋 Technical Overview: FAP Exam Schedule to Google Calendar Extension

## 1. Mục tiêu (Objective)
Xây dựng một Chrome Extension (Manifest V3) hỗ trợ sinh viên trường Đại học FPT (FPTU) tự động trích xuất lịch thi từ trang Web đào tạo (FAP) và thêm vào Google Calendar của cá nhân chỉ với một cú click.

## 2. Phạm vi áp dụng (Scope)
* **URL đích:** `https://fap.fpt.edu.vn/Exam/ScheduleExams.aspx`
* **Đối tượng xử lý:** Bảng HTML nằm trong div `#ctl00_mainContent_divContent`.

## 3. Cấu trúc dữ liệu cần trích xuất (Data Schema)
Mỗi hàng (`<tr>`) trong bảng lịch thi chứa các thông tin sau:
* **Subject Name:** Tên môn học (Cột 3).
* **Date:** Ngày thi (Cột 4) - Format hiện tại: `DD/MM/YYYY`.
* **Room No:** Phòng thi (Cột 5) - Có thể trống (Null/Empty).
* **Time:** Ca thi (Cột 6) - Format hiện tại: `07h30-09h00`.
* **Exam Form:** Hình thức thi (Cột 7) - Để đưa vào phần mô tả (Description).



## 4. Luồng xử lý kỹ thuật (Technical Workflow)

### Bước 1: Content Script Injection
Extension sẽ inject một file `content.js` vào trang FAP để:
* Quét toàn bộ các dòng trong thẻ `<tbody>` của bảng lịch thi.
* Chèn thêm một cột mới hoặc một nút bấm (Button) "Add to Calendar" vào cuối mỗi dòng thi.

### Bước 2: Chuẩn hóa dữ liệu (Data Normalization)
Vì Google Calendar yêu cầu định dạng thời gian chuẩn (ISO 8601), cần xử lý:
* **Date:** Chuyển `31/03/2026` -> `20260331`.
* **Time:** Tách chuỗi `07h30-09h00` thành `StartTime (07:30)` và `EndTime (09:00)`.
* **Múi giờ:** Mặc định là `Asia/Ho_Chi_Minh` (GMT+7).

### Bước 3: Phương thức tích hợp (Integration Method)
Ưu tiên triển khai theo 2 cấp độ:
* **Cấp độ 1 (Quick Win):** Sử dụng **Google Calendar Web Interception**. Tạo một đường dẫn URL Template: `https://www.google.com/calendar/render?action=TEMPLATE&text={Subject}&dates={Start}/{End}&details={Form}&location={Room}`. Khi bấm nút, trình duyệt mở tab mới với thông tin điền sẵn.
* **Cấp độ 2 (Advanced):** Sử dụng `chrome.identity` để lấy OAuth2 token và gọi trực tiếp **Google Calendar API** để thêm sự kiện ngầm (Background sync).

## 5. Các kịch bản ngoại lệ (Edge Cases)
* **Phòng thi trống:** Nếu cột `Room No` không có dữ liệu, hiển thị "TBA" hoặc "Check FAP later".
* **Môn thi trùng tên:** Phân biệt bằng `SubjectCode` để tránh nhầm lẫn.
* **Thay đổi DOM:** Nếu FAP thay đổi cấu trúc bảng, cần cơ chế báo lỗi hoặc cập nhật Selector.
