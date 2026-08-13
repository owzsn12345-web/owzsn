const members = ["뉼", "룰", "닟", "뤼"];
const displayNames = ["오율", "률", "우진", "루이"];

const table = document.getElementById("chart");
const picker = document.getElementById("picker");

let selectedCell = null;


// ==========================
// 표 만들기
// ==========================

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

      // 닟룰만 딘룰
      if (row === "닟" && col === "룰") {
        td.textContent = "딘룰";
      } else {
        td.textContent = row + col;
      }

      // 칸 클릭
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


// ==========================
// 색깔 선택
// ==========================

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


// ==========================
// 바깥 누르면 선택창 닫기
// ==========================

document.addEventListener("click", e => {

  if (
    !e.target.closest("#picker") &&
    !e.target.closest("td")
  ) {

    picker.classList.remove("show");

  }

});


// ==========================
// 전체 초기화
// ==========================

document.getElementById("reset").onclick = () => {

  document
    .querySelectorAll("#chart td[data-color]")
    .forEach(td => {

      td.removeAttribute("data-color");

    });

};


// ==========================
// 전체 이미지 저장
// ==========================

document.getElementById("save").onclick = async () => {

  // 색깔 선택창 숨기기
  picker.classList.remove("show");

  // 저장할 영역
  const captureArea =
    document.getElementById("captureArea");

  try {

    const canvas = await html2canvas(
      captureArea,
      {
        backgroundColor: "#ffffff",

        scale: 3,

        useCORS: true,

        logging: false,

        // 화면에 실제 보이는 크기 그대로 캡처
        width: captureArea.scrollWidth,

        height: captureArea.scrollHeight
      }
    );


    // PNG 생성
    const image =
      canvas.toDataURL("image/png");


    // 다운로드
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
      "이미지 저장에 실패했어요. 페이지를 새로고침한 후 다시 시도해주세요."
    );

  }

};
