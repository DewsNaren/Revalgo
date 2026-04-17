const dateText = document.querySelector(".date-text");
const menu = document.querySelector(".dropdown-menu");

dateText.addEventListener("click", () => {
  if(!datePicker.classList.contains("active")){
    menu.classList.toggle("active");
  }
  
});

menu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const value = e.target.dataset.value;
    dateText.childNodes[0].data = e.target.textContent;
    menu.classList.remove("active");

    handleSelection(value);
  }
});

function handleSelection(value) {
  datePicker.classList.remove("active");

  const today = new Date();
  let start, end;

  switch (value) {
    case "today":
      start = end = today;
      break;

    case "yesterday":
      start = end = new Date(today.setDate(today.getDate() - 1));
      break;
    case "lastWeek": {
      const current = new Date();

      const day = current.getDay();
      const diff = (day === 0 ? 6 : day - 1); 


      end = new Date(current);
      end.setDate(current.getDate() - diff - 1);

   
      start = new Date(end);
      start.setDate(end.getDate() - 6);
      break;
    }

    case "lastMonth":
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      end = new Date(today.getFullYear(), today.getMonth(), 0);
      break;

    case "last6Months":
      start = new Date(today.setMonth(today.getMonth() - 6));
      end = new Date();
      break;

    case "custom":
      datePicker.classList.add("active");
      return;
  }

  console.log("Start:", start);
  console.log("End:", end);
}

const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const datePicker = document.querySelector(".date-picker");

let activeDate = null; 

startDate.addEventListener("click", () => {
  activeDate = "start";
  showCalendar();
});

endDate.addEventListener("click", () => {
  activeDate = "end";
  showCalendar();
});

function showCalendar() {
  datePicker.classList.add("active");
}

function format(date) {
  return date.toLocaleDateString("en-GB");
}

function selectDate(year, month, day) {
  const selected = new Date(year, month, day);

  if (activeDate === "start") {
    startDate.value = format(selected);
  }

  if (activeDate === "end") {
    endDate.value = format(selected);
  }

  datePicker.classList.remove("active");
}