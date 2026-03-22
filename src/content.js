function processExamTable() {
  const tableContainer = document.getElementById("ctl00_mainContent_divContent");
  if (!tableContainer) return;

  const table = tableContainer.querySelector("table");
  if (!table) return;

  const thead = table.querySelector("thead tr");
  if (thead) {
    const th = document.createElement("th");
    th.textContent = "Google Calendar";
    th.style.width = "120px";
    th.style.textAlign = "center";
    thead.appendChild(th);
  }

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length < 9) return;

    const subjectCode = cells[1].innerText.trim();
    const subjectName = cells[2].innerText.trim();
    const dateStr = cells[3].innerText.trim();
    const roomNo = cells[4].innerText.trim() || undefined; 
    const timeStr = cells[5].innerText.trim();
    const examForm = cells[6].innerText.trim();
    
    const td = document.createElement("td");
    td.style.textAlign = "center";
    
    const btn = document.createElement("button");
    btn.textContent = "+ Đẩy lên Lịch";
    btn.className = "fap-ext-btn-add-cal";
    
    btn.onclick = () => {
      // Đổi trạng thái hiển thị tránh click nhiều lần
      btn.textContent = "Đang xử lý...";
      btn.disabled = true;
      btn.style.opacity = "0.7";

      const msg = {
        action: "addEvent",
        eventData: {
          subjectCode,
          subjectName,
          dateStr,
          timeStr,
          roomNo,
          examForm
        }
      };

      // Gửi message tới Background script (background.js) để gọi API ngầm
      chrome.runtime.sendMessage(msg, (response) => {
        if (chrome.runtime.lastError || (response && response.error)) {
          console.error("Lỗi thêm sự kiện:", chrome.runtime.lastError || response.error);
          btn.textContent = "Lỗi!";
          btn.style.backgroundColor = "#d93025";
          btn.disabled = false;
          btn.style.opacity = "1";
        } else if (response && response.success) {
          btn.textContent = "Thành công ✓";
          btn.style.backgroundColor = "#188038";
          btn.style.opacity = "1";
        }
      });
    };

    td.appendChild(btn);
    // Append at the end of the row
    row.appendChild(td);
  });
}

window.addEventListener('load', () => {
  setTimeout(processExamTable, 500);
});
