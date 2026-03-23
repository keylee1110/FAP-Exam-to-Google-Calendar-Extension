/**
 * FAP Exam to Google Calendar — Content Script
 * 1. Injects "Add to Calendar" buttons (Level 1: URL Template)
 * 2. Parses all exam rows and saves structured data to chrome.storage.local
 *    so the popup can display Chưa thi / Đã thi tabs.
 */

/** Convert FAP date "DD/MM/YYYY" to a Date object (midnight local time) */
function parseExamDate(dateStr) {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.trim().split("/");
  if (!day || !month || !year) return null;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

/** Convert FAP date/time into Google Calendar date-time range format */
function buildGCalDates(dateStr, timeStr) {
  if (!dateStr || !timeStr) return "";
  const [day, month, year] = dateStr.trim().split("/");
  const [rawStart, rawEnd] = timeStr.trim().split("-");
  const toCompact = (t) => t.replace("h", "") + "00";
  const start = `${year}${month}${day}T${toCompact(rawStart)}`;
  const end   = `${year}${month}${day}T${toCompact(rawEnd)}`;
  return `${start}/${end}`;
}

/** Calculate how many days until exam date (negative = already past) */
function daysUntil(examDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = examDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function processExamTable() {
  const container = document.getElementById("ctl00_mainContent_divContent");
  if (!container) return;

  const table = container.querySelector("table");
  if (!table) return;

  // ── Inject header column ────────────────────────────────────────────────
  const theadRow = table.querySelector("thead tr");
  if (theadRow && !theadRow.querySelector(".fap-ext-th")) {
    const th = document.createElement("th");
    th.className = "fap-ext-th";
    th.textContent = "Google Calendar";
    th.style.cssText = "width:130px; text-align:center;";
    theadRow.appendChild(th);
  }

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const exams = [];

  tbody.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length < 6) return;

    const subjectCode = cells[1]?.innerText.trim() || "";
    const subjectName = cells[2]?.innerText.trim() || "";
    const dateStr     = cells[3]?.innerText.trim() || "";
    const roomNo      = cells[4]?.innerText.trim() || "";
    const timeStr     = cells[5]?.innerText.trim() || "";
    const examForm    = cells[6]?.innerText.trim() || "";

    // ── Save to structured array ──────────────────────────────────────────
    const examDate = parseExamDate(dateStr);
    const days = examDate ? daysUntil(examDate) : null;
    const isPast = examDate ? examDate < today : false;

    exams.push({ subjectCode, subjectName, dateStr, roomNo, timeStr, examForm, days, isPast });

    // ── Inject "Add to Calendar" button ───────────────────────────────────
    if (row.querySelector(".fap-ext-td")) return; // already injected

    const dates    = buildGCalDates(dateStr, timeStr);
    const title    = encodeURIComponent(`[${subjectCode}] ${subjectName}`);
    const details  = encodeURIComponent(
      `📚 Môn: ${subjectName} (${subjectCode})\n` +
      `📋 Hình thức: ${examForm}\n` +
      `🏫 Phòng: ${roomNo || "TBA — Check FAP later"}\n` +
      `⏰ Ca thi: ${timeStr}\n` +
      `📅 Ngày thi: ${dateStr}`
    );
    const location = encodeURIComponent(
      roomNo ? `Phòng ${roomNo}, Đại học FPT` : "TBA"
    );

    const calUrl =
      `https://www.google.com/calendar/render?action=TEMPLATE` +
      `&text=${title}` +
      `&dates=${dates}` +
      `&details=${details}` +
      `&location=${location}` +
      `&ctz=Asia/Ho_Chi_Minh`;

    const td  = document.createElement("td");
    td.className = "fap-ext-td";
    td.style.cssText = "text-align:center; padding: 4px 6px;";

    const btn = document.createElement("button");
    btn.textContent = "+ Thêm vào Lịch";
    btn.className   = "fap-ext-btn-add-cal";
    btn.addEventListener("click", () => window.open(calUrl, "_blank"));

    td.appendChild(btn);
    row.appendChild(td);
  });

  // ── Persist exam data for popup ─────────────────────────────────────────
  if (exams.length > 0) {
    chrome.storage.local.set({ fapExams: exams, fapExamsUpdatedAt: Date.now() });
  }
}

window.addEventListener("load", () => {
  setTimeout(processExamTable, 500);
});
