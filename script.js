const members = ["뉼", "룰", "닟", "뤼"];
const displayNames = ["오율", "률", "우진", "루이"];

const table = document.getElementById("chart");
const picker = document.getElementById("picker");

let selectedCell = null;


/* ================================
   표 생성
================================ */

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

    } else {

      // 우진 × 률 = 딘룰
      if (row === "닟" && col === "룰") {
        td.textContent = "딘룰";
      } else {
        td.textContent = row + col;
      }

      // 칸 누르기
      td.addEventListener("click", (e) => {

        e.stopPropagation();

        selectedCell = td;

        // 선택창 먼저 표시
        picker.classList.add("show");

        // 위치 초기화
        picker.style.left = "0px";
        picker.style.top = "0px";

        requestAnimationFrame(() => {

          const rect = td.getBoundingClientRect();

          const pickerWidth = 190;
          const pickerHeight = picker.offsetHeight;

          const gap = 8;
          const margin = 10;

          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;


          /* ----------------------------
             가로 위치
          ---------------------------- */

          let left = rect.left;

          if (left + pickerWidth > screenWidth - margin) {
            left = screenWidth - pickerWidth - margin;
          }

          if (left < margin) {
            left = margin;
          }


          /* ----------------------------
             세로 위치
          ---------------------------- */

          // 기본: 칸 아래
          let top = rect.bottom + gap;

          // 아래 공간 부족 → 칸 위
          if (
            top + pickerHeight >
            screenHeight - margin
          ) {

            top = rect.top - pickerHeight - gap;

          }

          // 위쪽도 부족하면 화면 위쪽에 고정
          if (top < margin) {
            top = margin;
          }


          picker.style.left = `${left}px`;
          picker.style.top = `${top}px`;

        });

      });

    }

    tr.appendChild(td);

  });

  table.appendChild(tr);

});


/* ================================
   색깔 선택
================================ */

picker.addEventListener("click", (e) => {

  const button = e.target.closest("button");

  if (!button || !selectedCell) {
    return;
  }

  const color = button.dataset.color;


  // 색 지우기
  if (color === "clear") {

    selectedCell.removeAttribute("data-color");

  }

  // 색 적용
  else {

    selectedCell.dataset.color = color;

  }


  picker.classList.remove("show");

  selectedCell = null;

  e.stopPropagation();

});


/* ================================
   바깥 클릭 → 선택창 닫기
================================ */

document.addEventListener("click", (e) => {

  if (
    !e.target.closest("#picker") &&
    !e.target.closest("td")
  ) {

    picker.classList.remove("show");

    selectedCell = null;

  }

});


/* ================================
   화면 크기 변경 → 닫기
================================ */

window.addEventListener("resize", () => {

  picker.classList.remove("show");

  selectedCell = null;

});


/* ================================
   전체 초기화
================================ */

document.getElementById("reset").addEventListener("click", () => {

  document
    .querySelectorAll("#chart td[data-color]")
    .forEach(td => {
      td.removeAttribute("data-color");
    });

});


/* ================================
   이미지 저장
================================ */

document.getElementById("save").addEventListener("click", async () => {

  // 선택창 숨기기
  picker.classList.remove("show");
  selectedCell = null;

  const target =
    document.getElementById("captureArea");

  try {

    const canvas = await html2canvas(target, {

      backgroundColor: "#ffffff",

      scale: 2,

      useCORS: true,

      logging: false,

      width: target.scrollWidth,

      height: target.scrollHeight

    });


    const image =
      canvas.toDataURL("image/png");


    const link =
      document.createElement("a");

    link.download =
      "샷페스_취향표.png";

    link.href = image;

    document.body.appendChild(link);

    link.click();

    link.remove();

  } catch (error) {

    console.error(error);

    alert(
      "이미지 저장에 실패했어요.\n" +
      "페이지를 새로고침한 후 다시 시도해주세요."
    );

  }

});
