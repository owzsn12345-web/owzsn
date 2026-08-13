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

  // 왼쪽 행 이름
  tr.innerHTML = `<th>${displayNames[r]}</th>`;

  members.forEach((col, c) => {

    const td = document.createElement("td");

    // 자기 자신
    if (r === c) {

      td.textContent = "—";

    } else {

      // 닟 + 룰 = 딘룰
      if (row === "닟" && col === "룰") {
        td.textContent = "딘룰";
      } else {
        td.textContent = row + col;
      }

      // 칸 클릭 → 색깔 선택창
      td.addEventListener("click", e => {

        selectedCell = td;

        const rect = td.getBoundingClientRect();

        picker.style.left =
          Math.min(
            rect.left,
            window.innerWidth - 190
          ) + "px";

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


/* =========================
   색깔 선택
========================= */

picker.addEventListener("click", e => {

  const button = e.target.closest("button");

  if (!button || !selectedCell) return;

  const color = button.dataset.color;

  if (color === "clear") {

    selectedCell.removeAttribute("data-color");

  } else {

    selectedCell.dataset.color = color;

  }

  picker.classList.remove("show");

  selectedCell = null;

});


/* =========================
   화면 아무 곳 클릭
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

document.getElementById("reset").addEventListener("click", () => {

  document
    .querySelectorAll("#chart td[data-color]")
    .forEach(td => {
      td.removeAttribute("data-color");
    });

});


/* =========================
   이미지 저장
========================= */

document.getElementById("save").addEventListener("click", async () => {

  // 색깔 선택창 숨김
  picker.classList.remove("show");

  const target = document.getElementById("captureArea");

  try {

    const canvas = await html2canvas(target, {

      backgroundColor: "#ffffff",

      scale: 2,

      useCORS: true,

      logging: false,

      width: target.scrollWidth,

      height: target.scrollHeight

    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.download = "샷페스_취향표.png";

    link.href = image;

    document.body.appendChild(link);

    link.click();

    link.remove();

  } catch (error) {

    console.error(error);

    alert(
      "이미지 저장에 실패했어요. " +
      "페이지를 새로고침하고 다시 시도해주세요."
    );

  }

});
