const members = ["오율", "률", "우진", "루이"];

const statuses = {
  otp:      { symbol: "♥", label: "OTP" },
  good:     { symbol: "♥", label: "좋음" },
  like:     { symbol: "♥", label: "호감" },
  interest: { symbol: "♥", label: "관심있음" },
  none:     { symbol: "♡", label: "관심없음" },
  hate:     { symbol: "♥", label: "지뢰" }
};

const table = document.getElementById("rpsTable");
let selectedStatus = "otp";

function makeTable() {
  const head = document.createElement("tr");
  head.innerHTML = "<th></th>" + members.map(name => `<th>${name}</th>`).join("");
  table.appendChild(head);

  members.forEach((rowName, r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th>${rowName}</th>`;

    members.forEach((colName, c) => {
      const td = document.createElement("td");
      td.className = "cell";
      td.dataset.row = r;
      td.dataset.col = c;

      if (r !== c) {
        td.innerHTML = `<span class="pair">${rowName}${colName}</span><span class="mark" aria-hidden="true"></span>`;
        td.addEventListener("click", () => toggleCell(td));
      }

      tr.appendChild(td);
    });

    table.appendChild(tr);
  });
}

function toggleCell(td) {
  const current = td.dataset.status || "";
  if (current === selectedStatus) {
    td.dataset.status = "";
    td.className = "cell";
    td.querySelector(".mark").textContent = "";
    td.title = "";
  } else {
    td.dataset.status = selectedStatus;
    td.className = `cell status-${selectedStatus}`;
    td.querySelector(".mark").textContent = statuses[selectedStatus].symbol;
    td.title = statuses[selectedStatus].label;
  }
}

document.querySelectorAll(".legend button").forEach(button => {
  button.addEventListener("click", () => {
    selectedStatus = button.dataset.status;
    document.querySelectorAll(".legend button").forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
  });
});

document.getElementById("reset").addEventListener("click", () => {
  document.querySelectorAll("td.cell").forEach(td => {
    td.dataset.status = "";
    td.className = "cell";
    const mark = td.querySelector(".mark");
    if (mark) mark.textContent = "";
  });
});

document.getElementById("save").addEventListener("click", async () => {
  // 외부 라이브러리 없이 현재 표를 SVG로 만들어 PNG로 저장합니다.
  const clone = document.querySelector(".wrap").cloneNode(true);
  clone.querySelector(".actions")?.remove();
  clone.querySelector(".hint")?.remove();

  const width = 920, height = 720;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml"
           style="width:${width}px;height:${height}px;background:white;padding:42px;
                  font-family:Arial,'Noto Sans KR',sans-serif;">
        ${clone.outerHTML}
      </div>
    </foreignObject>
  </svg>`;

  const blob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);

    const a = document.createElement("a");
    a.download = "셋페스-취향표.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  img.src = url;
});

makeTable();
