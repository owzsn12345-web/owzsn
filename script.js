const members = ["뉼", "룰", "닟", "뤼"];
const displayNames = ["오율", "률", "우진", "루이"];

const table = document.getElementById("chart");
const picker = document.getElementById("picker");

let selectedCell = null;

// 색상 종류
const colors = [
  "otp",
  "good",
  "like",
  "interest",
  "none",
  "special",
  "hate"
];

// ====================
// 표 만들기
// ====================

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
      td.style.background = "#fff";
    } else {
      // 닟 + 룰 = 딘룰
      if (row === "닟" && col === "룰") {
        td.textContent = "딘룰";
      } else {
        td.textContent = row + col;
      }

      // 칸을 누르면 색상 선택창 표시
      td.addEventListener("click", e => {
        selectedCell = td;

        const rect = td.getBoundingClientRect();

        picker.style.left =
          Math.min(rect.left, window.innerWidth - 190) + "px";

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

// ====================
// 색깔 선택
// ====================

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

// 표 밖을 누르면 색상 선택창 닫기
document.addEventListener("click", e => {
  if (
    !e.target.closest("#picker") &&
    !e.target.closest("td")
  ) {
    picker.classList.remove("show");
  }
});

// ====================
// 전체 초기화
// ====================

document.getElementById("reset").onclick = () => {
  document
    .querySelectorAll("td[data-color]")
    .forEach(td => {
      td.removeAttribute("data-color");
    });
};

// ====================
// 이미지 저장
// ====================

document.getElementById("save").onclick = async () => {
  try {
    // html2canvas가 없으면 불러오기
    if (typeof html2canvas === "undefined") {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
      });
    }

    // 색상 선택창 숨기기
    picker.classList.remove("show");

    // 표를 이미지로 만들기
    const canvas = await html2canvas(table, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true
    });

    // PNG 이미지 만들기
    const image = canvas.toDataURL("image/png");

    // 이미지 저장
    const link = document.createElement("a");

    link.href = image;
    link.download = "샷페스_취향표.png";

    document.body.appendChild(link);
    link.click();
    link.remove();

  } catch (error) {
    console.error(error);

    alert(
      "이미지 저장에 실패했어요. 잠시 후 다시 눌러주세요!"
    );
  }
};
