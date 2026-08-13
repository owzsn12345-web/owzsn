const members = ["뉼", "룰", "닟", "뤼"];
const displayNames = ["오율", "률", "우진", "루이"];

const table = document.getElementById("chart");
const picker = document.getElementById("picker");

let selectedCell = null;


// =========================
// 표 만들기
// =========================

const head = document.createElement("tr");

head.innerHTML =
  "<th></th>" +
  displayNames.map(name => `<th>${name}</th>`).join("");

table.appendChild(head);


members.forEach((row, r) => {

  const tr = document.createElement("tr");

  tr.innerHTML = `<th>${displayNames[r]}</th>`;

  members.forEach((col, c) => {

    const td = document.createElement("td");

    // 자기 자신
    if (r === c) {

      td.textContent = "—";
      td.style.background = "#fff";

    } else {

      // 우진 × 률 = 딘룰
      if (row === "닟" && col === "룰") {
        td.textContent = "딘룰";
      } else {
        td.textContent = row + col;
      }

      td.addEventListener("click", e => {

        selectedCell = td;

        const rect = td.getBoundingClientRect();

        picker.style.left =
          Math.min(rect.left, window.innerWidth - 190) + "px";

        picker.style.top =
          (rect.bottom + 6) + "px";

        picker.classList.add("show");

        e.stopPropagation();
      });

    }

    tr.appendChild(td);

  });

  table.appendChild(tr);

});


// =========================
// 색상 선택
// =========================

picker.addEventListener("click", e => {

  const btn = e.target.closest("button");

  if (!btn || !selectedCell) return;

  const color = btn.dataset.color;

  if (color === "clear") {
    selectedCell.removeAttribute("data-color");
  } else {
    selectedCell.dataset.color = color;
  }

  picker.classList.remove("show");

  selectedCell = null;

});


// =========================
// 바깥 클릭하면 색상 메뉴 닫기
// =========================

document.addEventListener("click", e => {

  if (
    !e.target.closest("#picker") &&
    !e.target.closest("td")
  ) {
    picker.classList.remove("show");
  }

});


// =========================
// 전체 초기화
// =========================

document.getElementById("reset").onclick = () => {

  document
    .querySelectorAll("td[data-color]")
    .forEach(td => {
      td.removeAttribute("data-color");
    });

};


// =========================
// 전체 이미지 저장
// =========================

document.getElementById("save").onclick = async () => {

  picker.classList.remove("show");

  const target = document.querySelector(".wrap");

  const canvas = await html2canvas(target, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true
  });

  const link = document.createElement("a");

  link.download = "샷페스_취향표.png";

  link.href = canvas.toDataURL("image/png");

  link.click();

};
