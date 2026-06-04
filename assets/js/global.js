const globalWrapper = document.querySelector(".global-wrapper");

const startPicker = document.querySelector(".start-datepicker");
const endPicker = document.querySelector(".end-datepicker");

const paginationWrapper = document.querySelector(".pagination-wrapper");
const pagination = paginationWrapper.querySelector(".pagination");
const showText = document.querySelector(".show-text");
const rowSelect = document.querySelector(".rows-select");
let currentPage = 1;
let itemsPerPage = 15;

const searchInput = document.querySelector(".search-table-quote-input");
const searchBtn = document.querySelector(".search-table-quote-btn");
const clearAllStatusBtn = document.querySelector(".clear-all-stats-btn");

let firstPage=true;


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

  const start = wrapper.querySelector(".start-text").childNodes[0].textContent.trim();
  const end = wrapper.querySelector(".end-text").childNodes[0].textContent.trim();

  let startDate = start === "mm/dd/yyyy" ? null : start;
  let endDate = end === "mm/dd/yyyy" ? null : end;

  updateDateFilter(filterType, startDate, endDate);
  changeStatusChips();
}

//get searched quotes
if (sessionStorage.getItem("searchedQuotes")) {
  totalQuotes = JSON.parse(sessionStorage.getItem("searchedQuotes"));
  filteredData = [...totalQuotes];
  filteredData.sort((a, b) => a.name.localeCompare(b.name));
  totalItem.textContent = `${totalQuotes.length} items`;
  createPagination(currentPage);
  renderFilterTable(currentPage);
  changeNameFilters(filteredData);
  changeModes(filteredData);
  changeFilterChip(filteredData);
}

if (sessionStorage.getItem("searchedItem")) {
  searchText.textContent = sessionStorage.getItem("searchedItem");
}

//render quotes into table
function renderFilterTable(currentPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  showText.textContent = `Showing ${paginatedData.length ? startIndex + 1 : 0} to ${itemsPerPage > filteredData.length ? filteredData.length : endIndex} of ${filteredData.length} entries`;
  tBody.innerHTML = "";
  if (paginatedData.length) {
    paginatedData.forEach((d) => {
      tBody.innerHTML += `
      <tr  data-id="${d.id}">
        <td><img src="./assets/images/dashboard/${d.mode}_icon.png" alt="${d.mode}"></td>
          <td><a href="./recent-quote.html" class="quote-id-btn">#${d.id}</a></td>
              <td>${d.number ? ` ${d.name} /${d.number}` : `${d.name}`}</td>
              <td>${d.received_date}</td>
          <td>${d.approved_date}</td>
          <td>
          <span class=${d.status === "approved" ? "approved" : d.status === "pending" ? "pending" : ""}>${d.status}</span></td>
          <td><span>${d.total_line_no}</span></td>
          <td>$${d.total_price}</td>
        </tr>                               
    `;
    });
    const filterTable = document.querySelector(".filter-table");
    tableClickHandler(filterTable);
  } else {
    tBody.innerHTML = `<p class="not-found">Data Not Found</p>`;
  }
}

function tableClickHandler(filterTable) {
  const idBtns = filterTable.querySelectorAll(".quote-id-btn");
  idBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.closest("tr").dataset.id;
      totalQuotes.forEach((q) => {
        if (q.id == id) {
          sessionStorage.setItem("selectedQuote", JSON.stringify(q));
          window.location.href = "./recent-quote.html";
        }
      });
    });
  });
}

//pagination
function createPagination(currentPage) {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  pagination.innerHTML = "";
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = 1;
  }

  if (totalPages < 1) return;

  if (currentPage > 1) {
    pagination.innerHTML += `<button class="prev" type="button" onclick="updatePage(${currentPage - 1})">&lt;</button>`;
  }
  let pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 4) {
      pages = [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= totalPages - 3) {
      pages = [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = [
        1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  }
  pages.forEach((p) => {
    if (p === "...") {
      pagination.innerHTML += `<span class="dots">...</span>`;
    } else {
      pagination.innerHTML += `<button class="page ${p === currentPage ? "active" : ""}" type="button" onclick="updatePage(${p})">${p}</button>`;
    }
  });

  if (currentPage < totalPages) {
    pagination.innerHTML += `<button class="next" onclick="updatePage(${currentPage + 1})">&gt;</button>`;
  }
}

rowSelect.addEventListener("change", (e) => {
  const value = e.target.value;
  itemsPerPage = Number(value);
  updatePage(1);
  
});

function updatePage(page) {
  currentPage = page;

  createPagination(currentPage);

  renderFilterTable(currentPage);
}

//status filter function
function enableFilterChipClick(filterChipBtns) {
  filterChipBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      changeStatusChips();
    });
  });
}

function changeStatusChips() {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
  selectedStatus = [...filterChipBtns]
    .filter((btn) => btn.classList.contains("active"))
    .map((btn) => btn.textContent.trim().toLowerCase());
  const selectedStatChips = selectedStatus.map((stat) => ({
    type: "status",
    value: stat.toLowerCase(),
  }));

  const selectedNamesData = selectedNames.map((name) => ({
    type: "name",
    value: name.toLowerCase(),
  }));

  const selectedModesData = selectedModes.map((mode) => ({
    type: "mode",
    value: mode.toLowerCase(),
  }));
const receivedStart =
  document.querySelector(".received-start-text").childNodes[0].textContent;

const receivedEnd =
  document.querySelector(".received-end-text").childNodes[0].textContent;

const approvedStart =
  document.querySelector(".approved-start-text").childNodes[0].textContent;

const approvedEnd =
  document.querySelector(".approved-end-text").childNodes[0].textContent;

  let dateChips = [];

if (receivedStart.trim().toLowerCase() !== "mm/dd/yyyy") {
  dateChips.push({
    type: "received-start-date",
    value: `Received From - ${receivedStart}`,
  });
}

if (receivedEnd.trim().toLowerCase() !== "mm/dd/yyyy") {
  dateChips.push({
    type: "received-end-date",
    value: `Received To - ${receivedEnd}`,
  });
}

if (approvedStart.trim().toLowerCase() !== "mm/dd/yyyy") {
  dateChips.push({
    type: "approved-start-date",
    value: `Approved From - ${approvedStart}`,
  });
}

if (approvedEnd.trim().toLowerCase() !== "mm/dd/yyyy") {
  dateChips.push({
    type: "approved-end-date",
    value: `Approved To - ${approvedEnd}`,
  });
}

  // merge all filters
  const allChips = [
    ...selectedStatChips,
    ...selectedNamesData,
    ...selectedModesData,
    ...dateChips,
  ];

  if (allChips.length === 0) {
    statusContainer.classList.remove("active");
    statusChipContainer.innerHTML = "";
  } else {
    statusContainer.classList.add("active");

    statusChipContainer.innerHTML = "";

    allChips.forEach((chip) => {
      statusChipContainer.innerHTML += `
        <span class="chip " onclick="closeChip(event)"
              data-type="${chip.type}" 
              data-value="${chip.value}">
          ${chip.value}
          <span class="close-chip" >
            <img src="./assets/images/global/close_modal.webp" alt="close">
          </span>
        </span>
      `;
    });
  }
  applyFilters();
}

//close chips
function closeChip(event) {
  const chip = event.target.closest(".chip");

  if (!chip) return;

  const type = chip.dataset.type;
  const val = chip.dataset.value;

  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");

  if (type === "status") {
    filterChipBtns.forEach((btn) => {
      if (btn.textContent.trim().toLowerCase() === val) {
        btn.classList.remove("active");
      }
    });
  } 
  else if (type === "name") {
    const checkedNameInputs = document.querySelectorAll(
      ".customer-filter input:checked"
    );

    checkedNameInputs.forEach((inp) => {
      if (inp.value.toLowerCase() === val) {
        inp.checked = false;
      }
    });

    selectedNames = selectedNames.filter(
      (name) => name.toLowerCase() !== val
    );
  } 
 
  else if (type === "received-start-date") {
    document.querySelector(".received-start-text").childNodes[0].textContent = "mm/dd/yyyy";
    updateDateFilter("received", null, dateFilters.received.end);
  } 
  else if (type === "received-end-date") {
    document.querySelector(".received-end-text").childNodes[0].textContent = "mm/dd/yyyy";
    updateDateFilter("received", dateFilters.received.start, null);
  } 
  else if (type === "approved-start-date") {
    document.querySelector(".approved-start-text").childNodes[0].textContent = "mm/dd/yyyy";
    updateDateFilter("approved", null, dateFilters.approved.end);
  } 
  else if (type === "approved-end-date") {
    document.querySelector(".approved-end-text").childNodes[0].textContent = "mm/dd/yyyy";
    updateDateFilter("approved", dateFilters.approved.start, null);
  }
  else if (type === "mode") {
    const checkedModeInputs = document.querySelectorAll(
      ".mode-filter input:checked"
    );

    checkedModeInputs.forEach((inp) => {
      if (inp.value.toLowerCase() === val) {
        inp.checked = false;
      }
    });

    selectedModes = selectedModes.filter(
      (mode) => mode.toLowerCase() !== val
    );
  }

  changeStatusChips();
}

//reset all filter function
clearAllStatusBtn.addEventListener("click", () => {
  resetFilters();
});


const refreshBtn = document.querySelector(".refresh-btn");
refreshBtn.addEventListener("click", () => {
  resetFilters();
});

function resetFilters() {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
  statusContainer.classList.remove("active");
  filterChipBtns.forEach((btn) => btn.classList.remove("active"));
  const nameInputs = document.querySelectorAll(".customer-filter input");
  const modeInputs = document.querySelectorAll(".mode-filter input");
  const receivedStart =
  document.querySelector(".received-start-text").childNodes[0];

const receivedEnd =
  document.querySelector(".received-end-text").childNodes[0];

const approvedStart =
  document.querySelector(".approved-start-text").childNodes[0];

const approvedEnd =
  document.querySelector(".approved-end-text").childNodes[0];
  searchInput.value = "";
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

  updatePage(1);
}

function handleCustomerFilter() {
  const checkedCustomInputs = document.querySelectorAll(
    ".customer-filter input:checked",
  );
  selectedNames = [...checkedCustomInputs].map((input) => input.value);
  changeStatusChips();
  applyFilters();
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

function handleModeFilter() {
  const checkedCustomInputs = document.querySelectorAll(
    ".mode-filter input:checked",
  );
  selectedModes = [...checkedCustomInputs].map((input) => input.value);
  changeStatusChips();
  applyFilters();
}

//search quote function
function searchQuotes() {
  searchValue = searchInput.value.trim().toLowerCase();
  applyFilters();
}

searchBtn.addEventListener("click", searchQuotes);
searchInput.addEventListener('input',()=>searchQuotes())
// calling sort function
sortQuotes();