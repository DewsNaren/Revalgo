const filterWrapper = document.querySelector(".filter-wrapper");
const dateTexts = filterWrapper.querySelectorAll(".date-text");
const datepickers = document.querySelectorAll(".datepicker");


const searchText = document.querySelector(".search-text");
const totalItem = document.querySelector(".total-item");
const filterTable = document.querySelector(".filter-table");
const tBody = filterTable.querySelector("tbody");

const selectAllChipsBtn = document.querySelector(".select-all-btn");
const clearAllFilterBtn = document.querySelector(".clear-all-filter-btn");
const statusContainer = document.querySelector(".status-container");
const statusChipContainer = document.querySelector(".status-chip-container");

let isName=false;


function padZero(num) {
  return num > 9 ? num : "0" + num;
}

let selectedMonth;
let selectedDatee;
let selectedYear = new Date().getFullYear();

const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 100);
const maxDate = new Date();

const MONTHS = [
  "January","February","March","April",
  "May","June","July","August",
  "September","October","November","December",
];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

//create datepicker
function createDatepicker(datePicker) {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  const maxDate =  new Date();  
  const monthNameEl = datePicker.querySelector(".month-name");
  const datesContainer = datePicker.querySelector(".dates");
  const prevBtn = datePicker.querySelector(".prev-month");
  const nextBtn = datePicker.querySelector(".next-month");
  const yearEl = datePicker.querySelector(".year");

  let today = new Date();

  let current = new Date(today);

  if (current < minDate) {
    current = new Date(minDate);
  }

  if (current > maxDate) {
    current = new Date(maxDate);
  }
  let selectedDate = null;

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = MONTHS[month];
    yearEl.textContent = year;

    datesContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    let days = [];

    for (let i = firstDay; i > 0; i--) {
      days.push({
        day: prevLastDate - i + 1,
        faded: true,
        date: new Date(year, month - 1, prevLastDate - i + 1),
      });
    }

    for (let i = 1; i <= lastDate; i++) {
      days.push({
        day: i,
        faded: false,
        date: new Date(year, month, i),
      });
    }

    const nextDays = 42 - days.length;

    for (let i = 1; i <= nextDays; i++) {
      days.push({
        day: i,
        faded: true,
        date: new Date(year, month + 1, i),
      });
    }


    days.forEach((d, index) => {
      const btn = document.createElement("button");

      btn.classList.add("date");

      btn.type = "button";

      btn.textContent = d.day;

      const isOutOfRange = d.date < minDate || d.date > maxDate;

      if (d.faded) btn.classList.add("faded");

      if (isOutOfRange) {
        btn.classList.add("disabled");
        btn.disabled = true;
      }

      if (
        selectedDate &&
        d.date.toDateString() === selectedDate.toDateString() &&
        !btn.classList.contains("faded")
      ) {
        btn.classList.add("current-day");
      }

      btn.addEventListener("click", () => {
        if (isOutOfRange) return;

        const allButtons = datesContainer.querySelectorAll(".date");

        selectedDate = d.date;

        allButtons.forEach((b) => b.classList.remove("current-day"));

        btn.classList.add("current-day");

        datePicker.classList.remove("active");

        getSelectedDate(datePicker);
      });

      datesContainer.appendChild(btn);
    });
  }

  prevBtn.addEventListener("click", () => {
    const prevMonth = new Date(
      current.getFullYear(),
      current.getMonth() - 1,
      1,
    );

    if (
      prevMonth.getFullYear() < minDate.getFullYear() ||
      (prevMonth.getFullYear() === minDate.getFullYear() &&
        prevMonth.getMonth() < minDate.getMonth())
    ) {
      return;
    }
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    const nextMonth = new Date(
      current.getFullYear(),
      current.getMonth() + 1,
      1,
    );

    if (
      nextMonth.getFullYear() > maxDate.getFullYear() ||
      (nextMonth.getFullYear() === maxDate.getFullYear() &&
        nextMonth.getMonth() > maxDate.getMonth())
    ) {
      return;
    }
    current.setMonth(current.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
}

datepickers.forEach((dp) => createDatepicker(dp));

datepickers.forEach((datepicker) => {
  const days = datepicker.querySelector(".days");

  DAYS.forEach((d) => {
    const span = document.createElement("span");
    span.className = "day";
    span.textContent = d;
    days.appendChild(span);
  });
});

//place datepicker near input
function openDatepicker(trigger, datePicker) {
  const rect = trigger.getBoundingClientRect();

  document.querySelectorAll(".datepicker").forEach((dp) => {
    dp.classList.remove("active");
  });

  datePicker.classList.add("active");

  requestAnimationFrame(() => {
    const pickerWidth = datePicker.offsetWidth || 300;
    const pickerHeight = datePicker.offsetHeight || 350;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // left
    let left = rect.left;

    if (left + pickerWidth > viewportWidth) {
      left = viewportWidth - pickerWidth - 10;
    }

    if (left < 10) {
      left = 10;
    }

    // bottom
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top;

    // top
    if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
      top = rect.top - pickerHeight - 5;
    } else {
      top = rect.bottom + 5;
    }

    datePicker.style.left = `${left}px`;
    datePicker.style.top = `${top}px`;

    datePicker.style.visibility = "visible";

    datePicker._trigger = trigger;
  });
}

//open datepicker on click
dateTexts.forEach((dateText) => {
  dateText.addEventListener("click", () => {
    dateTexts.forEach((text) => text.classList.remove("active"));
    dateText.classList.add("active");
    if (dateText.classList.contains("start-text")) {
      openDatepicker(dateText, startPicker);
    } else {
      openDatepicker(dateText, endPicker);
    }
  });
});

// outside close
document.addEventListener("click", (e) => {
  const dp = document.querySelector(".datepicker.active");

  if (!dp) return;

  const trigger = dp._trigger;

  if (!trigger ||(!trigger.contains(e.target) && !dp.contains(e.target))) {
    dp.classList.remove("active");

    dateTexts.forEach((text) =>
      text.classList.remove("active")
    );

    dp.querySelector(".datepicker-calendar")
      .classList.remove("not-active");
  }
});

function handleScroll() {
  const activePicker = document.querySelector(".datepicker.active");
  if (!activePicker) return;

  const trigger = activePicker._trigger;
  if (!trigger) return;

  const rect = trigger.getBoundingClientRect();

  const pickerWidth = activePicker.offsetWidth || 300;
  const pickerHeight = activePicker.offsetHeight || 350;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = rect.left;

  if (left + pickerWidth > viewportWidth) {
    left = viewportWidth - pickerWidth - 10;
  }

  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;

  let top;

  if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
    top = rect.top - pickerHeight - 5;
  } else {
    top = rect.bottom + 5;
  }

  activePicker.style.left = `${left}px`;
  activePicker.style.top = `${top}px`;
}

window.addEventListener("resize", handleScroll);
filterWrapper.addEventListener("scroll", handleScroll);


//table filter 
// let allQuotes=[];
let totalQuotes = [];
let filteredData = [];

let sorted;
let searchValue = "";
const dateFilters = {
  received: {
    start: null,
    end: null,
  },
  approved: {
    start: null,
    end: null,
  },
};
let selectedNames = [];
let selectedModes = [];
let selectedStatus = [];


selectAllChipsBtn.addEventListener("click", () => {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
  filterChipBtns.forEach((btn) => btn.classList.add("active"));
  statusFilter();
});


clearAllFilterBtn.addEventListener("click", () => {
  resetFilters();
});


//date filter helper functions
function parsePickerDate(dateStr) {
  const [month, day, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
}

function parseQuoteDate(dateStr) {
  const [day, month, year] = dateStr.split("-");
  return new Date(year, month - 1, day);
}

function updateDateFilter(type, start, end) {
  dateFilters[type].start = start;

  dateFilters[type].end = end;

  applyFilters();
}

function checkDateFilter(quoteDateStr, startDateStr, endDateStr) {
  if (!quoteDateStr) return false;
  const quoteDate = parseQuoteDate(quoteDateStr);

  if (startDateStr && startDateStr.trim() !== "mm/dd/yyyy") {
    const startDate = parsePickerDate(startDateStr);
    if (quoteDate < startDate) {
      return false;
    }
  }
  
  if (endDateStr && endDateStr.trim() !== "mm/dd/yyyy") {
    const endDate = parsePickerDate(endDateStr);
    if (quoteDate > endDate) {
      return false;
    }
  }

  return true;
}

// name filter
const searchCustomerInput = document.querySelector(".search-customer-input");
const searchCustomerBtn = document.querySelector(".search-customer-btn");

let filteredNameQuotes = [];
function searchNames() {
  const searchCustomerInput = document.querySelector(".search-customer-input");
  const searchNameVal = searchCustomerInput.value.trim().toLowerCase();
  if (searchNameVal != "") {
    filteredNameQuotes = filteredData.filter((dat) =>
      dat.name.toString().includes(searchNameVal),
    );
  } else {
    filteredNameQuotes = totalQuotes;
  }

  changeNameFilters(filteredNameQuotes);
}


function changeNameFilters(filData) {
  console.log(isName)
    const customerFilterWrapper = document.querySelector(
      ".customer-filter-wrapper",
    );
    const customerFilterContainer = document.querySelector(
      ".customer-filter-container",
    );
    const custMoreLink = customerFilterWrapper.querySelector(".see-more-link");
    let totalNames=[];
    // console.log(totalQuotes)
    if(isName){
      totalNames = [...new Set(allQuotes.map((q) => q.name))];
      statusChipContainer.innerHTML ="";
      statusContainer.classList.add("active");
      let selectedName=[...new Set(filData.map((q) => q.name))];
      [...new Set(filData.map((q) => q.name))].forEach(name=>{

      selectedNames=[...new Set(filData.map((q) => q.name))]
      statusChipContainer.innerHTML += `
        <span class="chip " onclick="closeChip(event)"
              data-type="name" 
              data-value="${name}">
          ${name}
          <span class="close-chip" >
            <img src="./assets/images/global/close_modal.webp" alt="close">
          </span>
        </span>
      `;
      })
    }

    else{
      totalNames = [...new Set(filData.map((q) => q.name))];
    }
    console.log(totalNames)
    customerFilterContainer.innerHTML = "";

    selectedNames.forEach((name, index) => {
      const div = document.createElement("div");
      div.className = "customer-filter checkbox-filter";
      if (index >= 5) div.classList.add("hidden");
      div.innerHTML = `
        <input type="checkbox" name="customer-name" id="${name}" value="${name}">
        <label for="${name}" class="filter-label">${name}</label>`;
      customerFilterContainer.appendChild(div);
    });

    if (totalNames.length > 5) {
      custMoreLink.classList.remove("not-active");
      custMoreLink.textContent = `See More`;

      custMoreLink.onclick = (e) => {
        e.preventDefault();
        const hiddenBrands = customerFilterWrapper.querySelectorAll(".hidden");
        if (hiddenBrands.length > 0) {
          hiddenBrands.forEach((el) => el.classList.remove("hidden"));
          custMoreLink.textContent = "See Less";
        } else {
          customerFilterWrapper
            .querySelectorAll(".checkbox-filter")
            .forEach((el, i) => {
              if (i >= 5) el.classList.add("hidden");
            });
          custMoreLink.textContent = `See More`;
        }
      };
    } else {
      custMoreLink.classList.add("not-active");
    }

    const customCheckBoxInputs = document.querySelectorAll(
      ".customer-filter input[type='checkbox']",
    );
    if (customCheckBoxInputs) {
      customCheckBoxInputs.forEach((input) => {
        input.addEventListener("change", () => {
          handleCustomerFilter();
        });
      });
    }
    if(isName){
      customCheckBoxInputs.forEach(inp=>{
        selectedName.forEach(name=>{
          if(inp.value.toLowerCase() === name.toLowerCase()){
            inp.checked = true;
          }
        })
      })
    }
}


searchCustomerInput.addEventListener("input", searchNames);
searchCustomerBtn.addEventListener("click", searchNames);

//mode filter function
function changeModes(filData) {
  const modeFilterContainer = document.querySelector(".mode-filter-container");
  const totalModes = [...new Set(filData.map((p) => p.mode))];

  modeFilterContainer.innerHTML = "";

  totalModes.forEach((mode, index) => {
    const div = document.createElement("div");
    div.className = "mode-filter checkbox-filter";
    div.innerHTML = `
      <input type="checkbox" name="mode" id="${mode}" value="${mode}">
      <label for="${mode}" class="filter-label">${mode}</label>`;
    modeFilterContainer.appendChild(div);
  });
  const customModeInputs = document.querySelectorAll(".mode-filter input[type='checkbox']");
  if (customModeInputs) {
    customModeInputs.forEach((input) => {
      input.addEventListener("change", () => {
        handleModeFilter();
      });
    });
  }
}

//sort function
function getPrice(price) {
  return parseFloat(price.replace(/[^\d.]/g, "").replace(/\.(?=.*\.)/g, ""));
}

//overall filter function
function applyFilters() {
  filteredData = allQuotes.filter((q) => {
    const matchesSearch =
      !searchValue ||
      q.id.toString().includes(searchValue) ||
      q.name.toLowerCase().includes(searchValue) ||
      q.number.toString().includes(searchValue);

    const matchesReceivedDate = checkDateFilter(q.received_date,dateFilters.received.start,dateFilters.received.end);

    const matchesApprovedDate = checkDateFilter(
      q.approved_date,
      dateFilters.approved.start,
      dateFilters.approved.end
    );

    const matchesName =
      selectedNames.length === 0 || selectedNames.includes(q.name);

    const matchesMode =
      selectedModes.length === 0 || selectedModes.includes(q.mode);

    const matchesStatus =
      selectedStatus.length === 0 ||
      selectedStatus.includes(q.status.toLowerCase());

    return (
      matchesSearch &&
      matchesReceivedDate &&
      matchesApprovedDate &&
      matchesName &&
      matchesMode &&
      matchesStatus
    );
  });
  filteredData.sort((a, b) => a.name.localeCompare(b.name));
  if(firstPage){
    updatePage(1);
  }else{
    renderFilterTable(filteredData);
  }
  
}


function sortQuotes(){
const tabHeaderSpans = filterTable.querySelectorAll("th span");

let isAscending = false;
tabHeaderSpans.forEach((sp) => {
  sp.addEventListener("click", () => {
    const filteredCopy = [...filteredData];
    const sortItem = sp.dataset.sort;

    if (isAscending) {
      if (sortItem == "id") {
        filteredData = filteredCopy.sort((a, b) => a.id - b.id);
      } else if (sortItem == "name") {
        filteredData = filteredCopy.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      } else if (sortItem == "received_date") {
        filteredData = filteredCopy.sort(
          (a, b) =>
            parseQuoteDate(a.received_date) - parseQuoteDate(b.received_date),
        );
      } else if (sortItem == "approved_date") {
        filteredData = filteredCopy.sort(
          (a, b) =>
            parseQuoteDate(a.approved_date) - parseQuoteDate(b.approved_date),
        );
      } else if (sortItem == "status") {
        filteredData = filteredCopy.sort((a, b) =>
          a.status.localeCompare(b.status),
        );
      } else if (sortItem == "total_line_no") {
        filteredData = filteredCopy.sort(
          (a, b) => a.total_line_no - b.total_line_no,
        );
      } 
      else if (sortItem == "total_price") {
        filteredData = filteredCopy.sort(
          (a, b) => getPrice(a.total_price) - getPrice(b.total_price),
        );
      }
    } else if (!isAscending) {
      if (sortItem == "id") {
        filteredData = filteredCopy.sort((a, b) => b.id - a.id);
      } else if (sortItem == "name") {
        filteredData = filteredCopy.sort((a, b) =>
          b.name.localeCompare(a.name),
        );
      } else if (sortItem == "received_date") {
        filteredData = filteredCopy.sort(
          (a, b) =>
            parseQuoteDate(b.received_date) - parseQuoteDate(a.received_date),
        );
      } else if (sortItem == "approved_date") {
        filteredData = filteredCopy.sort(
          (a, b) =>
            parseQuoteDate(b.approved_date) - parseQuoteDate(a.approved_date),
        );
      } else if (sortItem == "status") {
        filteredData = filteredCopy.sort((a, b) =>
          b.status.localeCompare(a.status),
        );
      } else if (sortItem == "total_line_no") {
        filteredData = filteredCopy.sort(
          (a, b) => b.total_line_no - a.total_line_no,
        );
      } else if (sortItem == "total_price") {
        filteredData = filteredCopy.sort(
          (a, b) => getPrice(b.total_price) - getPrice(a.total_price),
        );
      }
    }

    
    isAscending = !isAscending;
    if(firstPage){
      renderFilterTable(1);
    }
    else{
      renderFilterTable(filteredData);
    }
  });
});

}



function delStoredData(){
  if (sessionStorage.getItem("selectedQuote")) {
    sessionStorage.removeItem("selectedQuote");
  }

  if (sessionStorage.getItem("newId")) {
    sessionStorage.removeItem("newId");
  }

  if (sessionStorage.getItem("newQuote")) {
    sessionStorage.removeItem("newQuote");
  }
  if (sessionStorage.getItem("oldId")) {
    sessionStorage.removeItem("oldId");
  }


  if (sessionStorage.getItem("isApproved")) {
    sessionStorage.removeItem("isApproved");
  }

  if (sessionStorage.getItem("isDeleted")) {
    sessionStorage.removeItem("isDeleted");
  }
}

delStoredData();

