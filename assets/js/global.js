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

// function openDatepicker(trigger, datePicker) {

//   const rect = trigger.getBoundingClientRect();

//   document.querySelectorAll(".datepicker").forEach(dp => dp.classList.remove("active"));

//   datePicker.style.position = "fixed";
//   datePicker.style.top = rect.bottom + 5 + "px";
//   datePicker.style.left = rect.left + "px";
//   datePicker.style.zIndex = "9999";

//   const pickerWidth = datePicker.offsetWidth || 300;
//   const viewportWidth = window.innerWidth;

//   if (rect.left + pickerWidth > viewportWidth) {
//     datePicker.style.left = (viewportWidth - pickerWidth - 10) + "px";
//   }

//   datePicker.classList.add("active");

//   datePicker._trigger = trigger;
// }
function openDatepicker(trigger, datePicker) {

  const rect = trigger.getBoundingClientRect();

  document.querySelectorAll(".datepicker").forEach(dp => {
    dp.classList.remove("active");
  });

  datePicker.style.position = "fixed";
  datePicker.style.zIndex = "9999";

  // Temporarily show to measure height
  datePicker.style.visibility = "hidden";
  datePicker.classList.add("active");

  const pickerWidth = datePicker.offsetWidth || 300;
  const pickerHeight = datePicker.offsetHeight || 350;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // ---------- Horizontal Position ----------
  let left = rect.left;

  if (left + pickerWidth > viewportWidth) {
    left = viewportWidth - pickerWidth - 10;
  }

  // ---------- Vertical Position ----------
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;

  let top;

  // If not enough space below AND enough space above
  if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
    top = rect.top - pickerHeight - 5;
  } else {
    top = rect.bottom + 5;
  }

  datePicker.style.left = `${left}px`;
  datePicker.style.top = `${top}px`;

  datePicker.style.visibility = "visible";

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
  const start=document.querySelector(".start-text").childNodes[0].textContent;
  const end=document.querySelector(".end-text").childNodes[0].textContent;

  let strDate = start.trim() === "mm/dd/yyyy"? "05/01/2025": start;

  let endDate = end.trim() === "mm/dd/yyyy"? "04/30/2026": end;

  updateDateFilter(strDate,endDate)
  changeStatusChips();
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

  const pickerWidth = activePicker.offsetWidth || 300;
  const pickerHeight = activePicker.offsetHeight || 350;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // ---------- Horizontal Position ----------
  let left = rect.left;

  if (left + pickerWidth > viewportWidth) {
    left = viewportWidth - pickerWidth - 10;
  }

  // ---------- Vertical Position ----------
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;

  let top;

  // Show above if not enough space below
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

//get searched quotes
if(sessionStorage.getItem("searchedItem")){
  searchText.textContent=sessionStorage.getItem("searchedItem");
}
let totalQuotes = [];
let filteredData = [];

const selectAllChipsBtn=document.querySelector(".select-all-btn");
const clearAllChipsBtn=document.querySelector(".clear-all-chips-btn");
// const filterChipBtns=document.querySelectorAll(".filter-chip-btn");
const clearAllStatusBtn=document.querySelector(".clear-all-stats-btn");

const statusContainer=document.querySelector(".status-container");
const statusChipContainer=document.querySelector(".status-chip-container");

let sorted;
let searchValue="";
let selectedStartDate;
let selectedEndDate;
let selectedNames=[];
let selectedModes=[];
let selectedStatus=[];


if(sessionStorage.getItem("searchedQuotes")){
  totalQuotes=JSON.parse(sessionStorage.getItem("searchedQuotes"));
  filteredData = [...totalQuotes];
  totalItem.textContent=`${totalQuotes.length} items`;
  createPagination(currentPage)
  renderFilterTable(currentPage)
  changeNameFilters(filteredData)
  changeModes(filteredData)
  changeFilterChip(filteredData)
}

//render quotes into table

function renderFilterTable(currentPage){
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex=startIndex+itemsPerPage;
  const paginatedData=filteredData.slice(startIndex,endIndex);
  showText.textContent=`Showing ${(paginatedData.length)?startIndex+1:0} to ${(itemsPerPage > filteredData.length)?filteredData.length:endIndex} of ${filteredData.length} entries`
  tBody.innerHTML="";
  if(paginatedData.length){
    paginatedData.forEach(d=>{
    tBody.innerHTML+=`
      <tr>
        <td><img src="./assets/images/dashboard/${d.mode}_icon.png" alt="${d.mode}"></td>
          <td><a href="./recent-quote.html" class="quote-id-data">#${d.id}</a></td>
              <td>${d.number ?` ${d.name} /${d.number}`:`${d.name}`}</td>
              <td>${d.received_date}</td>
          <td>${d.approved_date}</td>
          <td>
          <span class=${d.status === "approved" ? "approved" : d.status === "pending" ? "pending" : ""}>${d.status}</span></td>
          <td><span>${d.total_line_no}</span></td>
          <td>$${d.total_price}</td>
        </tr>                               
    `
    })
  }
  else{
    tBody.innerHTML=`<p class="not-found">Data Not Found</p>`;
  }
 
}

//pagination
function createPagination(currentPage) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    pagination.innerHTML = "";
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = 1;
    }

    if (totalPages <1) return;

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
        pages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }
    pages.forEach(p => {
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

rowSelect.addEventListener('change', (e) => {
  const value = e.target.value;
  if(totalQuotes.length > value){
    itemsPerPage=value;
    updatePage(1)
  }
});

function updatePage(page) {
  currentPage = page;

  createPagination(currentPage);

  renderFilterTable(currentPage);

}

//filter function
const searchInput =document.querySelector(".search-table-quote-input");
const searchBtn =document.querySelector(".search-table-quote-btn");

// overall filter
function applyFilters() {

  filteredData = totalQuotes.filter(q => {

    const matchesSearch =  
  
    !searchValue ||q.id.toString().includes(searchValue) ||

    q.name.toLowerCase().includes(searchValue) ||q.number.toString().includes(searchValue);

    const matchesDate =checkDateFilter(q.received_date)

    const matchesName = selectedNames.length === 0 || selectedNames.includes(q.name);

    const matchesMode =  selectedModes.length === 0 || selectedModes.includes(q.mode);
    
    const matchesStatus= selectedStatus.length===0|| selectedStatus.includes(q.status.toLowerCase());


    return (
      matchesSearch && matchesDate &&

      matchesName &&  matchesMode && matchesStatus

    );

  });


  updatePage(1);

}


//status filter function



selectAllChipsBtn.addEventListener('click',()=>{
  const filterChipBtns=document.querySelectorAll(".filter-chip-btn");
  filterChipBtns.forEach(btn=>btn.classList.add("active"))
  changeStatusChips();
})

clearAllChipsBtn.addEventListener('click',()=>{
    const filterChipBtns=document.querySelectorAll(".filter-chip-btn");
  filterChipBtns.forEach(btn=>btn.classList.remove("active"));
  changeStatusChips();
})

function enableFilterChipClick(filterChipBtns){

  filterChipBtns.forEach(btn =>{
    btn.addEventListener('click',()=>{
      btn.classList.toggle("active");
      changeStatusChips();
    })
  })

}



function changeStatusChips() {
  const filterChipBtns=document.querySelectorAll(".filter-chip-btn");
  selectedStatus=[...filterChipBtns].filter(btn =>btn.classList.contains("active")) .map(btn => btn.textContent.trim().toLowerCase());
  const  selectedStatChips = selectedStatus.map(stat => ({
    type: "status",
    value: stat.toLowerCase()
  }));

  const selectedNamesData = selectedNames.map(name => ({
    type: "name",
    value: name.toLowerCase()
  }));

  const selectedModesData = selectedModes.map(mode => ({
    type: "mode",
    value: mode.toLowerCase()
  }));

  
  const startDate=document.querySelector(".start-text").childNodes[0].textContent;
  const endDate=document.querySelector(".end-text").childNodes[0].textContent;
  
  let dateChips = [];
  console.log(startDate)
  if (startDate.trim().toLowerCase() != "mm/dd/yyyy") {
    dateChips.push({
      type: "start-date",
      value: `From - ${startDate}`
    });
  }

  if (endDate.trim().toLowerCase() != "mm/dd/yyyy") {
    dateChips.push({
      type: "end-date",
      value: `To - ${endDate}`
    });
  }

  // merge all filters
  const allChips = [...selectedStatChips,...selectedNamesData,...selectedModesData, ...dateChips];

  if (allChips.length === 0) {
    statusContainer.classList.remove("active");
    statusChipContainer.innerHTML = "";
  } else {

    statusContainer.classList.add("active");

    statusChipContainer.innerHTML = "";

    allChips.forEach(chip => {

      statusChipContainer.innerHTML += `
        <span class="chip " onclick="closeChip(event)"
              data-type="${chip.type}" 
              data-value="${chip.value}">
          ${chip.value}
          <span class="close-chip" >
            <img src="./assets/images/global/close-modal.webp" alt="close">
          </span>
        </span>
      `;
    });
  }
  applyFilters();
}

//close chips
function closeChip(event){
  const chip=event.target.closest(".chip");
  const type=chip.dataset.type;
  const val=chip.dataset.value;
  console.log(chip)
   if(type=="status"){
    filterChipBtns.forEach(btn=>{
      if(btn.textContent.trim().toLowerCase() == val){
        btn.classList.remove("active");
      }
    })
  }
  else if(type=="name"){
    const checkedNameInputs=document.querySelectorAll(".customer-filter input:checked");
    checkedNameInputs.forEach(inp=>{
      if(inp.value.toLowerCase()===val){
        inp.checked=!inp.checked

        selectedNames = selectedNames.filter(name => name !== val);
      }

    })
  }
  else if(type=="start-date"){
    const startDate=document.querySelector(".start-text").childNodes[0];
    const endDate=document.querySelector(".end-text").childNodes[0];
    startDate.textContent="mm/dd/yyyy"

    let strDat = startDate.textContent.trim() === "mm/dd/yyyy"? "05/01/2025": startDate.textContent;

    let endDat= endDate.textContent.trim() === "mm/dd/yyyy"? "04/30/2026": endDate.textContent;

    updateDateFilter(strDat,endDat)
  
  }
  else if(type=="end-date"){
    const startDate=document.querySelector(".start-text").childNodes[0];
    const endDate=document.querySelector(".end-text").childNodes[0];
    endDate.textContent="mm/dd/yyyy"
    let strDat = startDate.textContent.trim() === "mm/dd/yyyy"? "05/01/2025": startDate.textContent;

    let endDat = endDate.textContent.trim() === "mm/dd/yyyy"? "04/30/2026": endDate.textContent;

    updateDateFilter(strDat,endDat)
  }

  else if(type=="mode"){
    const checkedModeInputs=document.querySelectorAll(".mode-filter input:checked");
    checkedModeInputs.forEach(inp=>{
      if(inp.value.toLowerCase()===val){
        inp.checked=!inp.checked
      }
    })
  }
  changeStatusChips();
}

clearAllStatusBtn.addEventListener('click',()=>{
  resetFilters();
})

const refreshBtn=document.querySelector(".refresh-btn")
  refreshBtn.addEventListener("click",()=>{
   resetFilters();
})

function resetFilters(){
  statusContainer.classList.remove("active");
  filterChipBtns.forEach(btn=>btn.classList.remove("active"));
  const nameInputs=document.querySelectorAll(".customer-filter input");
  const modeInputs=document.querySelectorAll(".mode-filter input");
  const startDate=document.querySelector(".start-text").childNodes[0];
  const endDate=document.querySelector(".end-text").childNodes[0];
  searchInput.value="";
  searchCustomerInput.value="";
  startDate.textContent= "mm/dd/yyyy";

  endDate.textContent= "mm/dd/yyyy";

  updateDateFilter("05/01/2025","04/30/2026");

  nameInputs.forEach(inp=>inp.checked=false);

  modeInputs.forEach(inp=>inp.checked=false);

  filteredData=[...totalQuotes]

  updatePage(1)

}

//date filter function
function parsePickerDate(dateStr) {
  const [month, day, year] =dateStr.split("/");
  return new Date(year, month - 1, day);
}

function parseQuoteDate(dateStr) {
  const [day, month, year] =dateStr.split("-");
  return new Date(year, month - 1, day);
}

function updateDateFilter(start, end) {
  selectedStartDate = start;

  selectedEndDate = end;

  applyFilters();

}

function checkDateFilter(quoteDateStr) {

  if (
    !selectedStartDate ||
    !selectedEndDate
  ) {
    return true;
  }

  const quoteDate =parseQuoteDate(quoteDateStr);

  const startDate =new Date(selectedStartDate);

  const endDate = new Date(selectedEndDate);

  return (
    quoteDate >= startDate &&
    quoteDate <= endDate
  );

}

// name filter 
const searchCustomerInput=document.querySelector(".search-customer-input");
const searchCustomerBtn=document.querySelector(".search-customer-btn");
let filteredNameQuotes=[];
function searchNames() {
  const searchNameVal =searchCustomerInput.value.trim().toLowerCase();
  if(searchNameVal!=""){
    filteredNameQuotes= filteredData.filter(dat=>dat.name.toString().includes(searchNameVal))
  }
  else{
    filteredNameQuotes= totalQuotes;
  }
  
  changeNameFilters(filteredNameQuotes)

}

function changeNameFilters(filData) {
  const customerFilterWrapper=document.querySelector(".customer-filter-wrapper");
  const customerFilterContainer=document.querySelector(".customer-filter-container");
  const custMoreLink=customerFilterWrapper.querySelector(".see-more-link")
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
    custMoreLink.textContent = `See More`;
    custMoreLink.classList.remove('not-active');
    custMoreLink.onclick = (e) => {
      e.preventDefault();
      const hiddenBrands = customerFilterWrapper.querySelectorAll(".hidden");
      if (hiddenBrands.length > 0) {
        hiddenBrands.forEach((el) => el.classList.remove("hidden"));
        custMoreLink.textContent = "See Less";
      } else {
        customerFilterWrapper.querySelectorAll(".checkbox-filter").forEach((el, i) => {
          if (i >= 5) el.classList.add("hidden");
        });
        custMoreLink.textContent = `See More`;
      }
    };
  }
  else{
    custMoreLink.classList.add('not-active');
  }

  const customCheckBoxInputs=document.querySelectorAll(".customer-filter input[type='checkbox']");
  if(customCheckBoxInputs){
    // changeStatusChips();
    customCheckBoxInputs.forEach(input => {
      input.addEventListener("change", () => {

        handleCustomerFilter();
      });
    });
  }
 
}

function handleCustomerFilter() {
  const checkedCustomInputs=document.querySelectorAll(".customer-filter input:checked");
  selectedNames = [...checkedCustomInputs].map(input => input.value);
  changeStatusChips();
  applyFilters();
}

searchCustomerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchNames();
  }
});

searchCustomerBtn.addEventListener("click", searchNames);

//mode filter function
function changeModes(filData){
  const modeFilterContainer=document.querySelector(".mode-filter-container");
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
  const customModeInputs=document.querySelectorAll(".mode-filter input[type='checkbox']");
  if(customModeInputs){
    // changeStatusChips()
    customModeInputs.forEach(input => {
      input.addEventListener("change", () => {
        handleModeFilter();
      });
    });
  }
}

function changeFilterChip(filData){
  const filterChipContainer=document.querySelector(".filter-chip-container");
  const stats=[...new Set(filData.map(p=>p.status))]
  stats.sort();
  filterChipContainer.innerHTML="";
  stats.forEach(s=>{
    filterChipContainer.innerHTML+=`
    <button type="button" class="filter-chip filter-chip-btn">${s}</button>
  `
  })

  enableFilterChipClick(document.querySelectorAll(".filter-chip-btn"))
  

}

function handleModeFilter() {
  const checkedCustomInputs=document.querySelectorAll(".mode-filter input:checked");
  selectedModes = [...checkedCustomInputs].map(input => input.value);
  changeStatusChips();
  applyFilters();
}


 
//search quote function 
function searchQuotes() {
  searchValue =searchInput.value.trim().toLowerCase();

  // return 
  applyFilters();
}

searchBtn.addEventListener("click", searchQuotes);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchQuotes();

  }
});


//sort function
const tabHeaderSpans=filterTable.querySelectorAll("th span");
// let sortedQuote;
function  getPrice(price){
  return parseFloat(price.replace(/[^\d.]/g, "").replace(/\.(?=.*\.)/g, ""));
}
let isAscending = true;
tabHeaderSpans.forEach(sp=>{
  sp.addEventListener('click',()=>{
    const filteredCopy=[...filteredData]
    const sortItem=sp.dataset.sort;
    console.log(sortItem)
    if(isAscending){
      if(sortItem=="id"){
        filteredData=filteredCopy.sort((a, b) => a.id - b.id);
      }
      else if(sortItem=="name"){
        filteredData=filteredCopy.sort((a, b) => a.name.localeCompare(b.name))
      }
      else if(sortItem=="received_date"){
        filteredData = filteredCopy.sort((a, b) => parseQuoteDate(a.received_date) - parseQuoteDate(b.received_date));
      }
      else if(sortItem=="approved_date"){
        filteredData = filteredCopy.sort((a, b) => parseQuoteDate(a.approved_date) - parseQuoteDate(b.approved_date));
      }
      else if(sortItem=="status"){
        filteredData = filteredCopy.sort((a, b) => a.status.localeCompare(b.status));
      }
      else if(sortItem=="total_line_no"){
        filteredData = filteredCopy.sort((a, b) => a.total_line_no - b.total_line_no);
      }
      else if(sortItem=="total_line_no"){
        filteredData = filteredCopy.sort((a, b) => a.total_line_no - b.total_line_no);
      }
      else if(sortItem=="total_price"){
        filteredData = filteredCopy.sort((a, b) => getPrice(a.total_price) - getPrice(b.total_price));
      }
    }
    else if(!isAscending){
      if(sortItem=="id"){
        filteredData=filteredCopy.sort((a, b) =>b.id - a.id)
      }
       else if(sortItem=="name"){
        filteredData=filteredCopy.sort((a, b) =>b.name.localeCompare(a.name))
      }
      else if(sortItem=="received_date"){
        filteredData = filteredCopy.sort((a, b) => parseQuoteDate(b.received_date) - parseQuoteDate(a.received_date));
      }
      else if(sortItem=="approved_date"){
        filteredData = filteredCopy.sort((a, b) => parseQuoteDate(b.approved_date) - parseQuoteDate(a.approved_date));
      }
      else if(sortItem=="status"){
        filteredData = filteredCopy.sort((a, b) => b.status.localeCompare(a.status));
      }
       else if(sortItem=="total_line_no"){
        filteredData = filteredCopy.sort((a, b) => a.total_line_no - b.total_line_no);
      }
      else if(sortItem=="total_price"){
        filteredData = filteredCopy.sort((a, b) => getPrice(b.total_price) - getPrice(a.total_price));
      }
    }
   
    renderFilterTable(1)
    isAscending=!isAscending;
  })
 
})
