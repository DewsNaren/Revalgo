const dateText = document.querySelector(".date-text");
const menu = document.querySelector(".dropdown-menu");

dateText.addEventListener("click", () => {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

menu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const value = e.target.dataset.value;
    dateText.childNodes[0].data = e.target.textContent;
    menu.style.display = "none";

    handleSelection(value);
  }
});

function handleSelection(value) {
  calendar.style.display = "none";

  const today = new Date();
  let start, end;

  switch (value) {
    case "today":
      start = end = today;
      break;

    case "yesterday":
      start = end = new Date(today.setDate(today.getDate() - 1));
      break;

    case "lastMonth":
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      end = new Date(today.getFullYear(), today.getMonth(), 0);
      break;

    case "last6Months":
      start = new Date(today.setMonth(today.getMonth() - 6));
      end = new Date();
      break;

    case "custom":
      calendar.style.display = "block";
      return;
  }

  console.log("Start:", start);
  console.log("End:", end);
}

const startInput = document.getElementById("startInput");
const endInput = document.getElementById("endInput");
const calendar = document.getElementById("calendar");

let activeInput = null; // track which input is clicked

startInput.addEventListener("click", () => {
  activeInput = "start";
  showCalendar();
});

endInput.addEventListener("click", () => {
  activeInput = "end";
  showCalendar();
});

function showCalendar() {
  calendar.style.display = "block";
}

function format(date) {
  return date.toLocaleDateString("en-GB");
}

function selectDate(year, month, day) {
  const selected = new Date(year, month, day);

  if (activeInput === "start") {
    startInput.value = format(selected);
  }

  if (activeInput === "end") {
    endInput.value = format(selected);
  }

  calendar.style.display = "none"; // close after selection
}