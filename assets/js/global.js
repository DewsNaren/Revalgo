const header=document.querySelector("header");
const globalWrapper=document.querySelector(".global-wrapper");
// const popupOverlay=document.querySelector(".popup-overlay");
function setGlobalWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  globalWrapper.style.height=`calc(100vh - ${headerHeight}px)`;
//   popupOverlay.style.height=`calc(100vh - ${headerHeight}px)`
}

setGlobalWrapperHeight();

window.addEventListener('resize',setGlobalWrapperHeight)


//Datepicker
const filterWrapper = document.querySelector(".filter-wrapper");
const dateTexts = filterWrapper.querySelectorAll(".date-text");

const startPicker = document.querySelector(".start-datepicker");
const endPicker = document.querySelector(".end-datepicker");

const datepickers = document.querySelectorAll(".datepicker");

function padZero(num){
  return num > 9 ? num : "0" + num;
}

let selectedMonth;
let selectedDatee;
let selectedYear = new Date().getFullYear();

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS = ["S","M","T","W","T","F","S"];

//create datepicker
function createDatepicker(datePicker) {

  const monthNameEl = datePicker.querySelector(".month-name");
  const datesContainer = datePicker.querySelector(".dates");
  const prevBtn = datePicker.querySelector(".prev-month");
  const nextBtn = datePicker.querySelector(".next-month");
  const yearToggle = datePicker.querySelector(".year-toggle");
  const yearDropdown = datePicker.querySelector(".year-dropdown");

  let today = new Date();
  let current = new Date(today);
  let selectedDate = null;

  const START_YEAR = today.getFullYear() - 200;
  const END_YEAR = today.getFullYear() - 3;

  yearDropdown.innerHTML = "";

  for (let y = START_YEAR; y <= END_YEAR; y++) {
    const div = document.createElement("div");
    div.className = "year-item";
    div.textContent = y;

    div.addEventListener("click", () => {
      current.setFullYear(y);
      selectedYear = y;

      yearToggle.innerHTML = `${y} <img class="down-arrow" src="./assets/images/dashboard/down-arrow-blue.png">`;

      yearDropdown.classList.remove("active");
      datePicker.querySelector(".datepicker-calendar").classList.remove("not-active");

      renderCalendar();
    });

    yearDropdown.appendChild(div);
  }

  yearToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    yearDropdown.classList.toggle("active");
    datePicker.querySelector(".datepicker-calendar").classList.toggle("not-active");
  });

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = MONTHS[month];
    yearToggle.innerHTML = `${year} <img class="down-arrow" src="./assets/images/dashboard/down-arrow-blue.png">`;

    datesContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    let days = [];

    for (let i = firstDay; i > 0; i--) {
      days.push({
        day: prevLastDate - i + 1,
        faded: true,
        date: new Date(year, month - 1, prevLastDate - i + 1)
      });
    }

    for (let i = 1; i <= lastDate; i++) {
      days.push({
        day: i,
        faded: false,
        date: new Date(year, month, i)
      });
    }

    const nextDays = 42 - days.length;

    for (let i = 1; i <= nextDays; i++) {
      days.push({
        day: i,
        faded: true,
        date: new Date(year, month + 1, i)
      });
    }

    days.forEach(d => {
      const btn = document.createElement("button");
      btn.classList.add("date");
      btn.type = "button";
      btn.textContent = d.day;

      if (d.faded) btn.classList.add("faded");

      if (d.date.toDateString() === today.toDateString() && !d.faded) {
        btn.classList.add("current-date");
      }

      if (selectedDate && d.date.toDateString() === selectedDate.toDateString() && !d.faded) {
        btn.classList.add("current-day");
      }

      btn.addEventListener("click", () => {
        selectedDate = d.date;

        datesContainer.querySelectorAll(".date").forEach(b => b.classList.remove("current-day"));
        btn.classList.add("current-day");

        getSelectedDate(datePicker);

        datePicker.classList.remove("active");
      });

      datesContainer.appendChild(btn);
    });
  }

  prevBtn.addEventListener("click", () => {
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    current.setMonth(current.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
}


datepickers.forEach(dp => createDatepicker(dp));



datepickers.forEach(datepicker => {
  const days = datepicker.querySelector(".days");

  DAYS.forEach(d => {
    const span = document.createElement("span");
    span.className = "day";
    span.textContent = d;
    days.appendChild(span);
  });
});

//open datepicker

function openDatepicker(trigger, datePicker) {

  const rect = trigger.getBoundingClientRect();

  document.querySelectorAll(".datepicker").forEach(dp => dp.classList.remove("active"));

  datePicker.style.position = "fixed";
  datePicker.style.top = rect.bottom + 5 + "px";
  datePicker.style.left = rect.left + "px";
  datePicker.style.zIndex = "9999";

  const pickerWidth = datePicker.offsetWidth || 300;
  const viewportWidth = window.innerWidth;

  if (rect.left + pickerWidth > viewportWidth) {
    datePicker.style.left = (viewportWidth - pickerWidth - 10) + "px";
  }

  datePicker.classList.add("active");

  datePicker._trigger = trigger;
}


//open datepicker on click
dateTexts.forEach(dateText => {
  dateText.addEventListener("click", () => {

    dateTexts.forEach(text => text.classList.remove("active"));
    dateText.classList.add("active");
    if (dateText.classList.contains("start-text")) {
      openDatepicker(dateText, startPicker);
    } else {
      openDatepicker(dateText, endPicker);
    }

  });

});


// get selected date and update text

function getSelectedDate(datePicker){

  const monthNameEl = datePicker.querySelector(".month-name");

  const monthIndex = MONTHS.findIndex(m => m === monthNameEl.textContent) + 1;
  selectedMonth = padZero(monthIndex);

  const dates = datePicker.querySelectorAll(".date");

  dates.forEach(d => {
    if(d.classList.contains("current-day")){
      selectedDatee = padZero(Number(d.textContent));
    }
  });

  const trigger = datePicker._trigger;

  if (trigger) {
    trigger.childNodes[0].textContent = `${selectedMonth}/${selectedDatee}/${selectedYear}`;
    dateTexts.forEach(text => text.classList.remove("active"));
  }
}



// outside close
document.addEventListener("click", (e) => {
  const dp = document.querySelector(".datepicker.active");
  if (!dp) return;

  const trigger = dp._trigger;

  if (!trigger.contains(e.target) && !dp.contains(e.target)) {
    dp.classList.remove("active");
      dateTexts.forEach(text => text.classList.remove("active"));
    dp.querySelector(".year-dropdown").classList.remove("active");
    dp.querySelector(".datepicker-calendar").classList.remove("not-active");
  }

});

function handleScroll() {
  const activePicker = document.querySelector(".datepicker.active");
  if (!activePicker) return;

  const trigger = activePicker._trigger;
  if (!trigger) return;

  const rect = trigger.getBoundingClientRect();

  activePicker.style.top = rect.bottom + 5 + "px";
  activePicker.style.left = rect.left + "px";
}

window.addEventListener("resize", handleScroll);

filterWrapper.addEventListener("scroll", handleScroll);

