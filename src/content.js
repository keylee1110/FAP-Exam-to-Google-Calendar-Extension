/**
 * FAP Exam to Google Calendar — Content Script (Level 1: URL Template)
 * Injects "Add to Calendar" buttons into each row of the FAP exam schedule table.
 */

/**
 * Converts FAP date/time into Google Calendar's date-time range format.
 * Input:  dateStr = "31/03/2026", timeStr = "07h30-09h00"
 * Output: "20260331T073000/20260331T090000"
 */
function buildGCalDates(dateStr, timeStr) {
  if (!dateStr || !timeStr) return "";

  // "31/03/2026" → ["31", "03", "2026"]
  const [day, month, year] = dateStr.trim().split("/");

  // "07h30-09h00" → ["07h30", "09h00"]
  const [rawStart, rawEnd] = timeStr.trim().split("-");

  // "07h30" → "073000"
  const toCompact = (t) => t.replace("h", "") + "00";

  const start = `${year}${month}${day}T${toCompact(rawStart)}`;
  const end   = `${year}${month}${day}T${toCompact(rawEnd)}`;

  return `${start}/${end}`;
}

function processExamTable() {
  const container = document.getElementById("ctl00_mainContent_divContent");
  if (!container) return;

  const table = container.querySelector("table");
  if (!table) return;

  // Add header column
  const theadRow = table.querySelector("thead tr");
  if (theadRow) {
    const th = document.createElement("th");
    th.textContent = "Google Calendar";
    th.style.cssText = "width:130px; text-align:center;";
    theadRow.appendChild(th);
  }

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  tbody.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    // Table has 10 columns (No, SubjectCode, SubjectName, Date, Room, Time, ExamForm, Exam, DateOfPublication, ...)
    if (cells.length < 6) return;

    // Column indices based on Table structure.txt
    const subjectCode = cells[1]?.innerText.trim() || "";
    const subjectName = cells[2]?.innerText.trim() || "";
    const dateStr     = cells[3]?.innerText.trim() || "";
    const roomNo      = cells[4]?.innerText.trim() || ""; // may be empty
    const timeStr     = cells[5]?.innerText.trim() || "";
    const examForm    = cells[6]?.innerText.trim() || "";

    // Build the Google Calendar URL
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

    // Build cell + button
    const td  = document.createElement("td");
    td.style.cssText = "text-align:center; padding: 4px 6px;";

    const btn = document.createElement("button");
    btn.textContent = "+ Thêm vào Lịch";
    btn.className   = "fap-ext-btn-add-cal";

    btn.addEventListener("click", () => {
      window.open(calUrl, "_blank");
    });

    td.appendChild(btn);
    row.appendChild(td);
  });
}

// Run after page fully loads (FAP uses server-side rendering, no lazy loading)
window.addEventListener("load", () => {
  setTimeout(processExamTable, 500);
});
