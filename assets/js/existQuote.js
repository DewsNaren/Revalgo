// const quickOrderWrapper = document.querySelector(".quick-order-wrapper");
// const quickContentWrapper = document.querySelector(".quick-content-wrapper");
// const quoteOrderWrapper = document.querySelector(".quick-order-wrapper");
const existQuoteWrapper = document.querySelector(".exist-quote-wrapper");
// const popupOverlay = document.querySelector(".popup-overlay");
// const expandModal = popupOverlay.querySelector(".expand-modal");
// const expandBtns = document.querySelectorAll(".expand-btn");
// const modalContent = document.querySelector(".expand-modal-content");
// const formPopup = document.querySelector(".form-popup");
// const approveQuoteBtn = document.querySelector(".approve-btn");
// const successPopup = document.querySelector(".success-popup");
// const delPopup1 = document.querySelector(".del-popup-1");
// const del1YesBtn = delPopup1.querySelector(".yes-btn");
// const successidText = successPopup.querySelector(".text .id");
// const confirmSuccessBtn = successPopup.querySelector(".ok-btn");
const addBtn = document.querySelector(".add-btn-container .add-btn");
// const addPopup = document.querySelector(".add-popup");
// const addTable = addPopup.querySelector(".add-table");
// const addLineBtns = addTable.querySelectorAll(".add-line-btn");
// const canceladdpopupBtn = addPopup.querySelector(".cancel-btn");
// const delQuoteBtn = document.querySelector(".del-quote-btn");
// const undoQuoteBtn = document.querySelector(".undo-quote-btn");
// const approveBtnContainer = document.querySelector(".approve-btn-container");
// const loaderWrapper = document.querySelector(".loader-wrapper");
// const leftWrapper = quoteOrderWrapper.querySelector(".left-wrapper");
// const uploadBtnContainer = leftWrapper.querySelector(".upload-btn-container");
// const leftTableWrapper = leftWrapper.querySelector(".table-wrapper");
// const descInputs = leftTableWrapper.querySelectorAll(".desc-input");
// const qtyInputs = leftTableWrapper.querySelectorAll(".qty-input");
// const CreateBtn = document.querySelector(".back-create-btn");
// const quoteStat = existQuoteWrapper.querySelector(".quote-status");
// const existFilterWrapper = document.querySelector(".exist-quote-filter-wrapper");
// const updateForm = formPopup.querySelector(".update-form");

// const newBtn = document.querySelector(".new-btn");


newBtn.addEventListener(
  "click",
  () => (window.location.href = "./create-quote.html"),
);

//Datepicker
const filterWrapper = document.querySelector(".filter-wrapper");
const dateTexts = filterWrapper.querySelectorAll(".date-text");

const startPicker = document.querySelector(".start-datepicker");
const endPicker = document.querySelector(".end-datepicker");

const datepickers = document.querySelectorAll(".datepicker");

// const minDate = new Date();
// minDate.setFullYear(minDate.getFullYear() - 100);
// const maxDate = new Date();

function padZero(num) {
  return num > 9 ? num : "0" + num;
}

let selectedMonth;
let selectedDatee;
let selectedYear = new Date().getFullYear();

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

//create datepicker
function createDatepicker(datePicker) {
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

//open datepicker

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

    // Horizontal
    let left = rect.left;

    if (left + pickerWidth > viewportWidth) {
      left = viewportWidth - pickerWidth - 10;
    }

    if (left < 10) {
      left = 10;
    }

    // Vertical
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top;

    // OPEN ABOVE
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

// get selected date and update text

function getSelectedDate(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const yearEl = datePicker.querySelector(".year");
  const monthIndex = MONTHS.findIndex((m) => m === monthNameEl.textContent) + 1;
  selectedMonth = padZero(monthIndex);

  const dates = datePicker.querySelectorAll(".date");

  dates.forEach((d) => {
    if (d.classList.contains("current-day")) {
      selectedDatee = padZero(Number(d.textContent));
    }
  });

  const trigger = datePicker._trigger;

  if (trigger) {
    trigger.childNodes[0].textContent = `${selectedMonth}/${selectedDatee}/${yearEl.textContent}`;
    dateTexts.forEach((text) => text.classList.remove("active"));
  }
  const container = trigger.closest(".date-container");

  const filterType = container.dataset.filter;

  const wrapper = container.parentElement;

  const start = wrapper.querySelector(".start-text").childNodes[0].textContent;

  const end = wrapper.querySelector(".end-text").childNodes[0].textContent;

  let startDate = start === "mm/dd/yyyy" ? null : start;
  let endDate = end === "mm/dd/yyyy" ? null : end;

  updateDateFilter(filterType, startDate, endDate);
}

//form popup datetext
const formDateText = formPopup.querySelector(".date-text");

formDateText.addEventListener("click", () => {
  const parentContainer = formDateText.parentElement;

  const datePicker = parentContainer.querySelector(".datepicker");

  if (!datePicker) return;

  datePicker.classList.add("active");

  const monthNameEl = datePicker.querySelector(".month-name");

  const MonthArr = monthNameEl.textContent.trim().split(" ");

  let selectedMonth = MONTHS.findIndex((m) => m === MonthArr[0]) + 1;

  if (selectedMonth <= 0) return;

  selectedMonth = padZero(selectedMonth);

  const dates = datePicker.querySelectorAll(".dates .date");

  const parentEl = datePicker.parentElement;

  const dateInp = parentEl.querySelector(".date-input");

  const dateText = parentEl.querySelector(".date-text");

  const formContainer = dateInp.closest(".form-container");

  const errorElement = formContainer.querySelector(".error");

  dates.forEach((d) => {
    d.addEventListener("click", () => {
      const selectedDatee = padZero(Number(d.textContent));

      dateInp.value = `${selectedYear}-${selectedMonth}-${selectedDatee}`;

      dateText.textContent = `${selectedDatee}-${selectedMonth}-${selectedYear}`;

      errorElement.classList.remove("active");

      errorElement.textContent = "";

      datePicker.classList.remove("active");
      const updateBtn = formPopup.querySelector(".update-btn");
      updateBtn.classList.remove("not-active");
    });
  });
});

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

const searchText = document.querySelector(".search-text");
const totalItem = document.querySelector(".total-item");
const filterTable = document.querySelector(".filter-table");
const tBody = filterTable.querySelector("tbody");

//get searched quotes

let totalQuotes = [];
let filteredData = [];

const selectAllChipsBtn = document.querySelector(".select-all-btn");
const clearAllFilterBtn = document.querySelector(".clear-all-filter-btn");
const filterChipBtns = document.querySelectorAll(".filter-chip-btn");

const statusContainer = document.querySelector(".status-container");
const statusChipContainer = document.querySelector(".status-chip-container");

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

function getSearchedQuotes() {
  if (sessionStorage.getItem("searchedQuotes")) {
    totalQuotes = JSON.parse(sessionStorage.getItem("searchedQuotes"));
    filteredData = [...totalQuotes];
    totalItem.textContent = `${totalQuotes.length} items`;
    filteredData.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    renderFilterTable(filteredData);
    changeNameFilters(filteredData);
    changeModes(filteredData);
    changeFilterChip(filteredData);
  }
  if (sessionStorage.getItem("searchedItem")) {
    searchText.textContent = sessionStorage.getItem("searchedItem");
  }
}

function renderFilterTable(data) {
  tBody.innerHTML = "";
  if (data.length) {
    data.forEach((d) => {
      tBody.innerHTML += `
      <tr>
          <td class="quote-id-data" onclick="getProducts(event)" data-id="${d.id}">${d.id}</td>
              <td>${d.name} </td>
              <td>${d.received_date}</td>
          <td>${d.approved_date}</td>
          <td>
          <span class=${d.status === "approved" ? "approved" : d.status === "pending" ? "pending" : ""}>${d.status}</span></td>
          <td><span>${d.total_line_no}</span></td>
          <td>$${d.total_price}</td>
        </tr>                               
    `;
    });
  } else {
    tBody.innerHTML = `<p class="not-found">Data Not Found</p>`;
  }
}

//filter function
const searchInput = document.querySelector(".search-table-quote-input");
const searchBtn = document.querySelector(".search-table-quote-btn");

function applyFilters() {
  filteredData = totalQuotes.filter((q) => {
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
  renderFilterTable(filteredData);
}

//status filter function
selectAllChipsBtn.addEventListener("click", () => {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
  filterChipBtns.forEach((btn) => btn.classList.add("active"));
  statusFilter();
});

clearAllFilterBtn.addEventListener("click", () => {
  resetFilters();
});

function resetFilters() {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
  // statusContainer.classList.remove("active");
  filterChipBtns.forEach((btn) => btn.classList.remove("active"));
  const nameInputs = document.querySelectorAll(".customer-filter input");
  const modeInputs = document.querySelectorAll(".mode-filter input");
  const receivedStart =document.querySelector(".received-start-text").childNodes[0];
  const receivedEnd =document.querySelector(".received-end-text").childNodes[0];
  const approvedStart =document.querySelector(".approved-start-text").childNodes[0];
  const approvedEnd =document.querySelector(".approved-end-text").childNodes[0];

  searchCustomerInput.value = "";
  receivedStart.textContent = "mm/dd/yyyy";
  receivedEnd.textContent = "mm/dd/yyyy";

  approvedStart.textContent = "mm/dd/yyyy";
  approvedEnd.textContent = "mm/dd/yyyy";

  updateDateFilter("received", null, null);
  updateDateFilter("approved", null, null);

  nameInputs.forEach((inp) => (inp.checked = false));

  modeInputs.forEach((inp) => (inp.checked = false));

  filteredData = [...totalQuotes];
  renderFilterTable(filteredData);

}
function enableFilterChipClick(filterChipBtns) {
  filterChipBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      statusFilter();
    });
  });
}

function statusFilter() {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
  selectedStatus=[];
  selectedStatus = [...filterChipBtns]
    .filter((btn) => btn.classList.contains("active"))
    .map((btn) => btn.textContent.trim().toLowerCase());
  applyFilters();
}

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

function changeFilterChip(filData) {
  const filterChipContainer = document.querySelector(".filter-chip-container");
  const stats = [...new Set(filData.map((p) => p.status))];
  stats.sort();
  filterChipContainer.innerHTML = "";
  stats.forEach((s) => {
    filterChipContainer.innerHTML += `
    <button type="button" class="filter-chip filter-chip-btn">${s}</button>
  `;
  });

  enableFilterChipClick(document.querySelectorAll(".filter-chip-btn"));
}

function changeNameFilters(filData) {
  const customerFilterWrapper = document.querySelector(
    ".customer-filter-wrapper",
  );
  const customerFilterContainer = document.querySelector(
    ".customer-filter-container",
  );
  const custMoreLink = customerFilterWrapper.querySelector(".see-more-link");
  const totalNames = [...new Set(filData.map((q) => q.name))];

  customerFilterContainer.innerHTML = "";

  totalNames.forEach((name, index) => {
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
}

function handleCustomerFilter() {
  const checkedCustomInputs = document.querySelectorAll(
    ".customer-filter input:checked",
  );
  selectedNames = [...checkedCustomInputs].map((input) => input.value);
  applyFilters();
}

searchCustomerInput.addEventListener("input", searchNames);

searchCustomerBtn.addEventListener("click", searchNames);

//mode filter function
function changeModes(filData) {
  const modeFilterContainer = document.querySelector(".mode-filter-container");
  const totalModes = [...new Set(filData.map((p) => p.mode))];

  modeFilterContainer.innerHTML = "";

  totalModes.forEach((mode, index) => {
    // selectedModes.push(mode)
    const div = document.createElement("div");
    div.className = "mode-filter checkbox-filter";
    div.innerHTML = `
      <input type="checkbox" name="mode" id="${mode}" value="${mode}">
      <label for="${mode}" class="filter-label">${mode}</label>`;
    modeFilterContainer.appendChild(div);
  });
  const customModeInputs = document.querySelectorAll(
    ".mode-filter input[type='checkbox']",
  );
  if (customModeInputs) {
    customModeInputs.forEach((input) => {
      input.addEventListener("change", () => {
        handleModeFilter();
      });
    });
  }
}

function handleModeFilter() {
  const checkedCustomInputs = document.querySelectorAll(
    ".mode-filter input:checked",
  );
  selectedModes = [...checkedCustomInputs].map((input) => input.value);
  applyFilters();
}

//sort function
const tabHeaderSpans = filterTable.querySelectorAll("th span");
// let sortedQuote;
function getPrice(price) {
  return parseFloat(price.replace(/[^\d.]/g, "").replace(/\.(?=.*\.)/g, ""));
}
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
      } else if (sortItem == "total_line_no") {
        filteredData = filteredCopy.sort(
          (a, b) => a.total_line_no - b.total_line_no,
        );
      } else if (sortItem == "total_price") {
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
          (a, b) => a.total_line_no - b.total_line_no,
        );
      } else if (sortItem == "total_price") {
        filteredData = filteredCopy.sort(
          (a, b) => getPrice(b.total_price) - getPrice(a.total_price),
        );
      }
    }

    renderFilterTable(filteredData);
    isAscending = !isAscending;
  });
});

//popups
// const popups = document.querySelectorAll(".popup");

// const formTitle = document.querySelector(".form-title");
// const formContainers = document.querySelectorAll(".form-container");
// const cancelFormPopupBtn = formPopup.querySelector(".cancel-btn");
// const errs = formPopup.querySelectorAll(".error");
// const closePopupBtns = document.querySelectorAll(".close-popup-btn");

const selectedItemPopup = document.querySelector(".selected-item-popup");
const selectedPopupHeader = selectedItemPopup.querySelector(
  ".selected-popup-header h3",
);
const selectedTable = document.querySelector(".selected-table");
const selectedTBody = document.querySelector(".selected-table tbody");
const selectedTableCheckInputs = selectedTable.querySelectorAll(
  "input[type='checkbox']",
);
const importBtn = document.querySelector(".import-btn");
const cancelSelectedBtn = selectedItemPopup.querySelector(".cancel-btn");
const selectedCheckedAllInput =
  selectedItemPopup.querySelector(".select-all-items");



//get products
let selectedQuote;
function getProducts(event) {
  const clickedId = event.target.dataset.id;
  totalQuotes.forEach((q) => {
    if (q.id == clickedId) {
      selectedQuote = q;
    }
  });
  openSelectedPopup(clickedId, selectedQuote);
}

//open selected quote
function openSelectedPopup(clickedId, q) {
  popupOverlay.classList.add("active");
  selectedItemPopup.classList.add("active");
  selectedPopupHeader.innerHTML = `Select Line items To Import From Existing Quote ID "${clickedId}"`;
  selectedTBody.innerHTML = "";
  const products = q.products;
  products.forEach((p, i) => {
    selectedTBody.innerHTML += `
    <tr>
      <td><input type="checkbox" id="select-item"></td>
      <td>${i + 1}</td>
      <td>${p.qty_requested}</td>
      <td><span>${p.title?p.title: 'Lorem ipsum'}</span></td>
      <td><span class="content"><span class="prod-id">${p.requested_id}</span> <span class="text"> ${p.desc?p.desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt adipisci necessitatibus veritatis sit quos. Ea id, cum tempore soluta omnis, deserunt recusandae, dignissimos quasi sequi et error eum libero perferendis.'}</span></span></td>
      <td>AD ${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}</td>
    </tr>
    `;
  });
  clickCheckInput(document.querySelector(".selected-table tbody"));
}

function selectAllItems() {
  const selectedTBody = document.querySelector(".selected-table tbody");

  const tableRows = selectedTBody.querySelectorAll("tr");
  // const checkedInputs=tBody.querySelectorAll("tr td input[type='checkbox']").checked;
  if (!tableRows.length){
    importBtn.classList.add("active");
    return;
  }
  const isAllChecked = [...tableRows].every(
    (row) => row.querySelector("input[type='checkbox']").checked,
  );
  selectedProdId = [];
  tableRows.forEach((row) => {
    const inp = row.querySelector("input[type='checkbox']");
    inp.checked = !isAllChecked;

    if (isAllChecked) {
      importBtn.classList.remove("active");
    } else importBtn.classList.add("active");
    const tr = inp.closest("tr");
    const prodId = tr.querySelector(".prod-id").textContent.trim();
    selectedProdId.push(prodId);
  });
}

cancelSelectedBtn.addEventListener("click", () => {
  closeModal();
  selectedTableCheckInputs.forEach((inp) => (inp.checked = false));
});

let selectedProdId = [];

//input checked function for selected quote
function clickCheckInput(tBody) {
  const chkAllInput=selectedTable.querySelector(".select-all-items")
  const checkInputs = tBody.querySelectorAll("tr td input[type='checkbox']");
  checkInputs.forEach((inp) => {
    inp.addEventListener("change", () => {
      const isChecked = [...checkInputs].some((input) => input.checked == true);
      const isAllChecked = [...checkInputs].every((input) => input.checked == true);
     
      if (isChecked) importBtn.classList.add("active");
      else importBtn.classList.remove("active");
      chkAllInput.checked=isAllChecked;
      selectedProdId = [];
      checkInputs.forEach((input) => {
        if (input.checked) {
          const tr = input.closest("tr");
          const prodId = tr.querySelector(".prod-id").textContent.trim();
          selectedProdId.push(prodId);
        }
      });
    });
  });
}


// let newQuote = {};
//  let sum=0;
importBtn.addEventListener("click", () => {
  if (selectedQuote) {
    

    const prods = [...selectedQuote.products];
    const filProds = prods.filter((p) =>
      selectedProdId.includes(p.requested_id),
    );
    selectedQuote.approved_date="-",
    selectedQuote.products = filProds;
    selectedQuote.status="pending"
    selectedQuote.received_date=`${padZero(new Date().getDate())}-${padZero(new Date().getMonth()+1)}-${padZero(new Date().getFullYear())}`;
   
    selectedQuote.total_price = selectedQuote.products.reduce((sum, p) => sum + parseFloat(p.total_cost), 0)
    .toFixed(2);
    selectedQuote.lines = filProds.length;
    selectedQuote.total_line_no = filProds.length;
  //   closeModal();
    selectedTableCheckInputs.forEach((inp) => (inp.checked = false));
    // storeQuote();
    // existFilterWrapper.classList.remove("active");
    // createQuoteBtn
  //   minimizeBtn.classList.remove("not-active");
  //   quoteOrderWrapper.classList.add("active");
  //   approveBtnContainer.classList.add("active");
  //   sessionStorage.setItem("newQuote", JSON.stringify(newQuote));
  //   renderQuickInfo(newQuote);
  //   updatenewQuoteId(newQuote);
  //   renderDisplayTable(newQuote);
  //   quoteStat.classList.add("active")
  //   quoteStat.classList.add("pending");
  //   quoteStat.textContent ="Pending";
    
  //   if(newQuote.products.length==0) {
  //     approveQuoteBtn.classList.remove("active");
  //     approveQuoteBtn.classList.add("not-active");
  //   }
  //   window.location.href="./new-quote.html"
  selectedQuote.name=  `${loginDetails ? loginDetails.username : "ram"}`;
  }
  sessionStorage.setItem("selectedQuote",JSON.stringify(selectedQuote))
  window.location.href="./new-quote.html"
});

function updatenewQuoteId(newQuote) {
  CreateBtn.querySelector("span").textContent = `#${newQuote.id}`;
  delQuoteBtn.classList.add("active");
}

//render quote data
const oldQuoteText = document.querySelector(".old-quote-id");
// const quickInfoWrapper = quoteOrderWrapper.querySelector(".quick-info-wrapper");
// const displayTable = quoteOrderWrapper.querySelector(".display-table");
const disTableBodyWrapper = displayTable.querySelector(".body-wrapper");
const closeBtn = document.querySelector(".close-modal-btn");

//render display table
// if (sessionStorage.getItem("newQuote")) {
//   renderDisplayTable(JSON.parse(sessionStorage.getItem("newQuote")));
//   renderQuickInfo(JSON.parse(sessionStorage.getItem("newQuote")));
// }

