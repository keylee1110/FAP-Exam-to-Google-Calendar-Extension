chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addEvent") {
    // Gọi chrome.identity lấy token
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      if (chrome.runtime.lastError || !token) {
        let errMsg = chrome.runtime.lastError ? chrome.runtime.lastError.message : "Authentication failed.";
        sendResponse({ error: errMsg });
        return;
      }

      const d = request.eventData;
      // Convert từ 31/03/2026 -> 2026-03-31
      const [day, month, year] = d.dateStr.trim().split("/");
      // Convert từ 07h30-09h00 -> 07:30:00 và 09:00:00
      const [startTime, endTime] = d.timeStr.trim().split("-");
      const formatTime = (t) => t.replace("h", ":") + ":00";
      
      const startDateTime = `${year}-${month}-${day}T${formatTime(startTime)}`;
      const endDateTime = `${year}-${month}-${day}T${formatTime(endTime)}`;

      // Tạo payload cho Google Calendar API
      const event = {
        summary: `[Thi ${d.subjectCode}] ${d.subjectName}`,
        location: d.roomNo ? `Phòng ${d.roomNo}, Đại học FPT` : "TBA",
        description: `Môn thi: ${d.subjectName} (${d.subjectCode})\nHình thức thi: ${d.examForm}\nPhòng thi: ${d.roomNo || 'TBA'}\nCa thi: ${d.timeStr}\nNgày thi: ${d.dateStr}`,
        start: {
          dateTime: startDateTime,
          timeZone: "Asia/Ho_Chi_Minh"
        },
        end: {
          dateTime: endDateTime,
          timeZone: "Asia/Ho_Chi_Minh"
        }
      };

      // Gọi API thêm event
      fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
           sendResponse({ error: data.error.message });
        } else {
           sendResponse({ success: true, link: data.htmlLink });
        }
      })
      .catch(err => {
        sendResponse({ error: err.toString() });
      });
    });

    // Trả về true để báo Chrome chờ phản hồi bất đồng bộ (async sendResponse)
    return true; 
  }
});
