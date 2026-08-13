const members = ["뉼","룰","닟","뤼"];
const table = document.getElementById("chart");
const picker = document.getElementById("picker");
let selectedCell = null;

const colors = ["otp","good","like","interest","none","special","hate"];

const head = document.createElement("tr");
head.innerHTML = "<th></th>" + members.map(x => `<th>${x}</th>`).join("");
table.appendChild(head);

members.forEach((row, r) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<th>${row}</th>`;
  members.forEach((col, c) => {
    const td = document.createElement("td");
    if (r === c) {
      td.textContent = "—";
      td.style.background = "#fff";
    } else {
      td.textContent = row + col;
      td.addEventListener("click", e => {
        selectedCell = td;
        const rect = td.getBoundingClientRect();
        picker.style.left = Math.min(rect.left, window.innerWidth - 190) + "px";
        picker.style.top = (rect.bottom + 6) + "px";
        picker.classList.add("show");
        e.stopPropagation();
      });
    }
    tr.appendChild(td);
  });
  table.appendChild(tr);
});

picker.addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn || !selectedCell) return;
  const color = btn.dataset.color;
  if (color === "clear") selectedCell.removeAttribute("data-color");
  else selectedCell.dataset.color = color;
  picker.classList.remove("show");
  selectedCell = null;
});

document.addEventListener("click", e => {
  if (!e.target.closest("#picker") && !e.target.closest("td")) picker.classList.remove("show");
});

document.getElementById("reset").onclick = () => {
  document.querySelectorAll("td[data-color]").forEach(td => td.removeAttribute("data-color"));
};

document.getElementById("save").onclick = () => {
  alert("완성된 표는 기기에서 화면 캡처로 저장하면 가장 깔끔해요!");
};
