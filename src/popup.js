/**
 * popup.js — FPT Helper
 * Reads exam data saved by content.js and renders the Chưa thi / Đã thi tabs.
 */

let activeTab = "upcoming";

/** Build Google Calendar URL for an exam object */
function buildCalUrl(exam) {
  const { subjectCode, subjectName, dateStr, roomNo, timeStr, examForm } = exam;
  if (!dateStr || !timeStr) return null;

  const [day, month, year] = dateStr.trim().split("/");
  const [rawStart, rawEnd] = timeStr.trim().split("-");
  if (!rawStart || !rawEnd) return null;

  const toCompact = (t) => t.replace("h", "") + "00";
  const dates = `${year}${month}${day}T${toCompact(rawStart)}/${year}${month}${day}T${toCompact(rawEnd)}`;

  const title    = encodeURIComponent(`[${subjectCode}] ${subjectName}`);
  const details  = encodeURIComponent(
    `📚 Môn: ${subjectName} (${subjectCode})\n` +
    `📋 Hình thức: ${examForm}\n` +
    `🏫 Phòng: ${roomNo || "TBA"}\n` +
    `⏰ Ca thi: ${timeStr}\n` +
    `📅 Ngày thi: ${dateStr}`
  );
  const location = encodeURIComponent(roomNo ? `Phòng ${roomNo}, Đại học FPT` : "TBA");

  return `https://www.google.com/calendar/render?action=TEMPLATE` +
    `&text=${title}&dates=${dates}&details=${details}&location=${location}&ctz=Asia/Ho_Chi_Minh`;
}

/** Return badge HTML based on days remaining */
function daysBadge(days) {
  if (days === null) return "";
  if (days === 0)  return `<span class="badge badge-today">Hôm nay</span>`;
  if (days === 1)  return `<span class="badge badge-urgent">Còn 1 ngày</span>`;
  if (days <= 3)   return `<span class="badge badge-urgent">Còn ${days} ngày</span>`;
  if (days <= 7)   return `<span class="badge badge-soon">Còn ${days} ngày</span>`;
  return `<span class="badge badge-ok">Còn ${days} ngày</span>`;
}

/** Render a single exam card */
function renderCard(exam) {
  const { subjectCode, subjectName, dateStr, roomNo, timeStr, examForm, days, isPast } = exam;
  const badge = isPast
    ? `<span class="badge badge-done">Đã thi</span>`
    : daysBadge(days);

  const calUrl = buildCalUrl(exam);
  const calBtn = (!isPast && calUrl)
    ? `<button class="btn-add-cal-mini" data-url="${calUrl}">📅 Thêm vào Google Calendar</button>`
    : "";

  return `
    <div class="exam-card ${isPast ? "past" : ""}">
      <div class="card-header">
        <span class="subject-code">${subjectCode}</span>
        ${badge}
      </div>
      <div class="card-detail"><span class="detail-icon">📋</span><span>Phương thức: ${examForm || "—"}</span></div>
      <div class="card-detail"><span class="detail-icon">🏫</span><span>Phòng: ${roomNo || "TBA"}</span></div>
      <div class="card-detail"><span class="detail-icon">📅</span><span>Ngày thi: ${dateStr}</span></div>
      <div class="card-detail"><span class="detail-icon">⏰</span><span>Thời gian: ${timeStr}</span></div>
      ${calBtn}
    </div>`;
}

/** Render list for active tab */
function renderList(exams) {
  const listEl = document.getElementById("exam-list");
  const filtered = activeTab === "upcoming"
    ? exams.filter(e => !e.isPast)
    : exams.filter(e => e.isPast);

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${activeTab === "upcoming" ? "🎉" : "📭"}</div>
        <p>${activeTab === "upcoming" ? "Không còn môn thi nào sắp tới!" : "Chưa có môn thi nào đã qua."}</p>
      </div>`;
    return;
  }

  listEl.innerHTML = filtered.map(renderCard).join("");

  listEl.querySelectorAll(".btn-add-cal-mini").forEach(btn => {
    btn.addEventListener("click", () => {
      chrome.tabs.create({ url: btn.dataset.url });
    });
  });
}

/** Switch active tab */
function switchTab(tab, exams) {
  activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach(el => {
    el.classList.toggle("active", el.dataset.tab === tab);
  });
  renderList(exams);
}

/** Show schedule view with data */
function renderScheduleView(exams) {
  const upcoming = exams.filter(e => !e.isPast);
  const past     = exams.filter(e => e.isPast);

  document.getElementById("view-no-data").style.display  = "none";
  document.getElementById("view-schedule").style.display = "block";

  document.getElementById("count-upcoming").textContent = upcoming.length;
  document.getElementById("count-past").textContent     = past.length;

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab, exams));
  });

  renderList(exams);
}

/** Entry point */
document.addEventListener("DOMContentLoaded", () => {
  // Load exam data
  chrome.storage.local.get(["fapExams"], (result) => {
    const exams = result.fapExams;

    if (!exams || exams.length === 0) {
      document.getElementById("view-no-data").style.display  = "block";
      document.getElementById("view-schedule").style.display = "none";
    } else {
      renderScheduleView(exams);
    }
  });

  // Sync button → open FAP exam page so content.js re-runs and updates storage
  document.getElementById("btn-sync").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://fap.fpt.edu.vn/Exam/ScheduleExams.aspx" });
  });
});
