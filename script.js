const members = ["뉼", "룰", "닟", "뤼"];
const displayNames = ["오율", "률", "우진", "루이"];

const table = document.getElementById("chart");
const picker = document.getElementById("picker");

let selectedCell = null;


/* =========================
   표 만들기
========================= */

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

    /* 자기 자신 */
    if (r === c) {

      td.textContent = "—";
      td.style.background = "#fff";

    } else {

      /*
        우진 × 률 = 딘룰
      */
      if (row === "닟" && col === "룰") {
        td.textContent = "딘룰";
      } else {
        td.textContent = row + col;
      }

      td.addEventListener("click", e => {

        selectedCell = td;

        const rect = td.getBoundingClientRect();

        picker.style.left =
          Math.min(
            rect.left,
            window.innerWidth - 190
          ) + "px";

        picker.style.top =
          rect.bottom + 6 + "px";

        picker.classList.add("show");

        e.stopPropagation();
      });
    }

    tr.appendChild(td);

  });

  table.appendChild(tr);

});


/* =========================
   색상 선택
========================= */

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


/* =========================
   바깥 클릭하면 선택창 닫기
========================= */

document.addEventListener("click", e => {

  if (
    !e.target.closest("#picker") &&
    !e.target.closest("td")
  ) {
    picker.classList.remove("show");
  }

});


/* =========================
   전체 초기화
========================= */

document.getElementById("reset").onclick = () => {

  document
    .querySelectorAll("td[data-color]")
    .forEach(td => {
      td.removeAttribute("data-color");
    });

};


/* =========================
   이미지 저장
   제목 + 항목 + 표 전체 저장
========================= */

document.getElementById("save").onclick = async () => {

  const target = document.getElementById("captureArea");

  /* 선택창은 이미지에 나오지 않게 */
  picker.classList.remove("show");

  try {

    const canvas = await html2canvas(target, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false
    });

    const link = document.createElement("a");

    link.download = "샷페스_취향표.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

  } catch (error) {

    console.error(error);

    alert("이미지 저장에 실패했어요. 페이지를 새로고침한 뒤 다시 눌러주세요.");

  }

};
