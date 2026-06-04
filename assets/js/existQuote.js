const existQuoteWrapper = document.querySelector(".exist-quote-wrapper");

const startPicker = document.querySelector(".start-datepicker");
const endPicker = document.querySelector(".end-datepicker");

const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
let firstPage=false;

const selectedItemPopup = document.querySelector(".selected-item-popup");
const selectedPopupHeader = selectedItemPopup.querySelector(".selected-popup-header h3");
const selectedTable = document.querySelector(".selected-table");
const selectedTBody = document.querySelector(".selected-table tbody");
const selectedTableCheckInputs = selectedTable.querySelectorAll("input[type='checkbox']");
const importBtn = document.querySelector(".import-btn");
const cancelSelectedBtn = selectedItemPopup.querySelector(".cancel-btn");
const selectedCheckedAllInput =selectedItemPopup.querySelector(".select-all-items");

const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));

let selectedQuote;
let selectedProdId = [];
let newId = "";


//get selected date
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

//get searched quotes
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

//reset filter function
function resetFilters() {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
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

//status filter function
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

function handleCustomerFilter() {
  const checkedCustomInputs = document.querySelectorAll(
    ".customer-filter input:checked",
  );
  selectedNames = [...checkedCustomInputs].map((input) => input.value);
  applyFilters();
}

//mode filter function
function handleModeFilter() {
  const checkedCustomInputs = document.querySelectorAll(
    ".mode-filter input:checked",
  );
  selectedModes = [...checkedCustomInputs].map((input) => input.value);
  applyFilters();
}

// calling sort function
sortQuotes();


//get products
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



importBtn.addEventListener("click", () => {
  if (selectedQuote) {
    newId = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    let isExists = totalQuotes.some((q) => q.id === newId);
    while (isExists) {
      newId = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
      isExists = totalQuotes.some((q) => q.id === newId);
    }

    const prods = [...selectedQuote.products];
    const filProds = prods.filter((p) =>
      selectedProdId.includes(p.requested_id),
    );
    selectedQuote.old_id=selectedQuote.id;
    selectedQuote.id=newId;

    selectedQuote.approved_date="-",
    selectedQuote.products = filProds;
    selectedQuote.status="pending"
    selectedQuote.received_date=`${padZero(new Date().getDate())}-${padZero(new Date().getMonth()+1)}-${padZero(new Date().getFullYear())}`;
   
    selectedQuote.total_price = selectedQuote.products.reduce((sum, p) => sum + parseFloat(p.total_cost), 0)
    .toFixed(2);
    selectedQuote.lines = filProds.length;
    selectedQuote.total_line_no = filProds.length;

    selectedTableCheckInputs.forEach((inp) => (inp.checked = false));

    selectedQuote.name=  `${loginDetails ? loginDetails.username : "ram"}`;
  }
  sessionStorage.setItem("selectedQuote",JSON.stringify(selectedQuote))
  sessionStorage.setItem("oldId",JSON.stringify(selectedQuote.old_id))
  window.location.href="./new-quote.html"
});


//close popup
function closeModal() {
  popupOverlay.classList.remove("active");
  popups.forEach((pop) => pop.classList.remove("active"));
}

//popup close function
closePopupBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    closeModal();
  }),
);

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closeModal();
  }
});