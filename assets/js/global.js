const header=document.querySelector("header");
const globalWrapper=document.querySelector(".global-wrapper");
function setGlobalWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  globalWrapper.style.height=`calc(100vh - ${headerHeight}px)`;
}

setGlobalWrapperHeight();

window.addEventListener('resize',setGlobalWrapperHeight)


//Datepicker
const filterWrapper = document.querySelector(".filter-wrapper");
const dateTexts = filterWrapper.querySelectorAll(".date-text");

const startPicker = document.querySelector(".start-datepicker");
const endPicker = document.querySelector(".end-datepicker");

const datepickers = document.querySelectorAll(".datepicker");

const minDate = new Date(2025, 4, 1);
const maxDate = new Date(2026, 3, 30);

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
  const yearEl = datePicker.querySelector(".year");

  let today = new Date();
  let current = new Date(today);
  let selectedDate = null;

  // const START_YEAR = today.getFullYear() - 200;
  // const END_YEAR = today.getFullYear() - 3;


  // for (let y = START_YEAR; y <= END_YEAR; y++) {
  //   const div = document.createElement("div");
  //   div.className = "year-item";
  //   div.textContent = y;

  //   div.addEventListener("click", () => {
  //     current.setFullYear(y);
  //     selectedYear = y;
  //     yearEl.textContent=y;

  //     datePicker.querySelector(".datepicker-calendar").classList.remove("not-active");

  //     renderCalendar();
  //   });

  // }

  // yearToggle.addEventListener("click", (e) => {
  //   e.stopPropagation();
  //   yearDropdown.classList.toggle("active");
  //   datePicker.querySelector(".datepicker-calendar").classList.toggle("not-active");
  // });

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = MONTHS[month];
    yearEl.textContent=year;

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

    // days.forEach(d => {
    //   const btn = document.createElement("button");
    //   btn.classList.add("date");
    //   btn.type = "button";
    //   btn.textContent = d.day;

    //   if (d.faded) btn.classList.add("faded");

    //   if (d.date.toDateString() === today.toDateString() && !d.faded) {
    //     btn.classList.add("current-date");
    //   }

    //   if (selectedDate && d.date.toDateString() === selectedDate.toDateString() && !d.faded) {
    //     btn.classList.add("current-day");
    //   }

    //   btn.addEventListener("click", () => {
    //     selectedDate = d.date;

    //     datesContainer.querySelectorAll(".date").forEach(b => b.classList.remove("current-day"));
    //     btn.classList.add("current-day");

    //     getSelectedDate(datePicker);

    //     datePicker.classList.remove("active");
    //   });

    //   datesContainer.appendChild(btn);
    // });

      days.forEach((d, index) => {

    const btn = document.createElement("button");

    btn.classList.add("date");

    btn.type = "button";

    btn.textContent = d.day;

    const isOutOfRange =d.date < minDate || d.date > maxDate;

    if (d.faded)
    btn.classList.add("faded");

    if (isOutOfRange) {
      btn.classList.add("disabled");
      btn.disabled = true;
    }

    if (
      selectedDate &&
      d.date.toDateString() ===
      selectedDate.toDateString() &&
      !btn.classList.contains("faded")
    ) {
      btn.classList.add("current-day");
    }

    btn.addEventListener("click", () => {

    if (isOutOfRange) return;

      const allButtons =
      datesContainer.querySelectorAll(".date");

      selectedDate = d.date;

      allButtons.forEach(b =>
        b.classList.remove("current-day")
      );

      btn.classList.add("current-day");

      datePicker.classList.remove("active");

      getSelectedDate(datePicker);
      // console.log(startDate)

  });

    datesContainer.appendChild(btn);

  });
  }

  prevBtn.addEventListener("click", () => {
    const prevMonth =
    new Date(current.getFullYear(),current.getMonth() - 1,1);

  if (
    prevMonth.getFullYear() < minDate.getFullYear()
    ||
    (
      prevMonth.getFullYear() === minDate.getFullYear()
      &&
      prevMonth.getMonth() < minDate.getMonth()
    )
  ) {
    return;
  }
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    const nextMonth =
    new Date(
      current.getFullYear(),
      current.getMonth() + 1,
      1
    );

  if (
    nextMonth.getFullYear() > maxDate.getFullYear()
    ||
    (
      nextMonth.getFullYear() === maxDate.getFullYear()
      &&
      nextMonth.getMonth() > maxDate.getMonth()
    )
  ) {
    return;
  }
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
  const yearEl=datePicker.querySelector(".year");
  const monthIndex = MONTHS.findIndex(m => m === monthNameEl.textContent) + 1;
  selectedMonth = padZero(monthIndex);
  console.log(selectedYear)

  const dates = datePicker.querySelectorAll(".date");

  dates.forEach(d => {
    if(d.classList.contains("current-day")){
      selectedDatee = padZero(Number(d.textContent));
    }
  });

  const trigger = datePicker._trigger;

  if (trigger) {
    trigger.childNodes[0].textContent = `${selectedMonth}/${selectedDatee}/${yearEl.textContent}`;
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

const searchText=document.querySelector(".search-text");
const totalItem=document.querySelector(".total-item");
const filterTable=document.querySelector(".filter-table");
const tBody=filterTable.querySelector("tbody");
const paginationWrapper=document.querySelector(".pagination-wrapper");
const pagination=paginationWrapper.querySelector(".pagination");
const showText=document.querySelector(".show-text");
const rowSelect=document.querySelector(".rows-select");
let currentPage=1;
let itemsPerPage=15;

if(sessionStorage.getItem("searchedItem")){
  searchText.textContent=sessionStorage.getItem("searchedItem");
}
let totalQuotes=[];

if(sessionStorage.getItem("searchedQuotes")){
  totalQuotes=JSON.parse(sessionStorage.getItem("searchedQuotes"))
  totalItem.textContent=`${totalQuotes.length} items`;
  createPagination(currentPage)

  renderFilterTable(currentPage)
}

function renderFilterTable(currentPage){
  const startIndex=currentPage-1;
  const endIndex=startIndex+itemsPerPage;
  const paginatedData=totalQuotes.slice(startIndex,endIndex);
  showText.textContent=`Showing ${startIndex+1} to ${(itemsPerPage > totalQuotes.length)?totalQuotes.length:endIndex} of ${totalQuotes.length} entries`
  tBody.innerHTML="";
  if(paginatedData){
    paginatedData.forEach(d=>{
    tBody.innerHTML+=`
      <tr>
        <td><img src="./assets/images/dashboard/${d.mode}_icon.png" alt="${d.mode}"></td>
          <td><a href="./recent-quote.html" class="quote-id-data">#${d.id}</a></td>
              <td>${d.name} / ${d.number}</td>
              <td>${d.received_date}</td>
          <td>${d.approved_date}</td>
          <td class=${d.status === "approved" ? "approved" : d.status === "pending" ? "pending" : ""} }>
          <span>${d.status}</span></td>
          <td><span>${d.total_line_no}</span></td>
          <td>$${d.total_price}</td>
        </tr>                               
    `
    })
  }
 
}

function createPagination(currentPage) {
    const totalPages = Math.ceil(totalQuotes.length / itemsPerPage);

    let pageHtml = "";



    if (currentPage > 1) {
        pageHtml += `<button class="prev " type="button" onclick="updatePage(${currentPage - 1})">&lt;</button>`;
    }


    for (let i = 1; i <= totalPages; i++) {
        pageHtml += `
        <button class="page ${i === currentPage ? 'active' : ''}" type="button" onclick="updatePage(${i})">${i}</button>`;
    }

    if (currentPage < totalPages) {
        pageHtml += `<button class="next " type="button" onclick="updatePage(${currentPage + 1})">&gt;</button>`;
    }


    pagination.innerHTML=pageHtml;
}
console.log(rowSelect)
rowSelect.addEventListener('change', (e) => {
  const value = e.target.value;
  console.log(value)
  if(totalQuotes.length > value){
    itemsPerPage=value;
    updatePage(1)
  }
});
function updatePage(crntPage){
  createPagination(crntPage);
  renderFilterTable(crntPage)
}


