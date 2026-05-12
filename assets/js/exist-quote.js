const existQuoteWrapper=document.querySelector(".exist-quote-wrapper");
const popupOverlay=document.querySelector(".popup-overlay");
function setexistQuoteWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  existQuoteWrapper.style.height=`calc(100vh - ${headerHeight}px)`;
  popupOverlay.style.height=`calc(100vh - ${headerHeight}px)`
}

setexistQuoteWrapperHeight();

window.addEventListener('resize',setexistQuoteWrapperHeight)

const existFilterWrapper=document.querySelector(".exist-quote-filter-wrapper");
const quoteOrderWrapper=document.querySelector(".quick-order-wrapper")
const newBtn=document.querySelector(".new-btn");
newBtn.addEventListener('click',()=>window.location.href="./create-quote.html")

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

//get searched quotes
if(sessionStorage.getItem("searchedItem")){
  searchText.textContent=sessionStorage.getItem("searchedItem");
}
let totalQuotes = [];
let filteredData = [];

const selectAllChipsBtn=document.querySelector(".select-all-btn");
const clearAllChipsBtn=document.querySelector(".clear-all-chips-btn");
const filterChipBtns=document.querySelectorAll(".filter-chip-btn");


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
  // createPagination(currentPage)
  renderFilterTable(filteredData)
  changeNameFilters(filteredData)
  changeModes(filteredData)
}

function renderFilterTable(data){
  tBody.innerHTML="";
  if(data.length){
    data.forEach(d=>{
    tBody.innerHTML+=`
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
    `
    })
  }
  else{
    tBody.innerHTML=`<p class="not-found">Data Not Found</p>`;
  }

 
}

//filter function
const searchInput =document.querySelector(".search-table-quote-input");
const searchBtn =document.querySelector(".search-table-quote-btn");

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


  renderFilterTable(filteredData)

}

//status filter function



selectAllChipsBtn.addEventListener('click',()=>{
  filterChipBtns.forEach(btn=>btn.classList.add("active"))
  statusFilter();
})

clearAllChipsBtn.addEventListener('click',()=>{
  filterChipBtns.forEach(btn=>btn.classList.remove("active"));
  statusFilter();
})

filterChipBtns.forEach(btn =>{
  btn.addEventListener('click',()=>{
    btn.classList.toggle("active");
    statusFilter();
  })
})

function statusFilter(){
  selectedStatus=[...filterChipBtns].filter(btn =>btn.classList.contains("active")) .map(btn => btn.textContent.trim().toLowerCase());
  applyFilters();
}


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

  const customCheckBoxInputs=document.querySelectorAll(".customer-filter input[type='checkbox']");
  if(customCheckBoxInputs){
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
    customModeInputs.forEach(input => {
      input.addEventListener("change", () => {
        handleModeFilter();
      });
    });
  }
}

function handleModeFilter() {
  const checkedCustomInputs=document.querySelectorAll(".mode-filter input:checked");
  selectedModes = [...checkedCustomInputs].map(input => input.value);
  applyFilters();
}

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
   
    renderFilterTable(filteredData)
    isAscending=!isAscending;
  })
 
})

//popups
const popups=document.querySelectorAll("popup");
const formPopup=document.querySelector(".form-popup");
const formTitle=document.querySelector(".form-title");
const formContainers=document.querySelectorAll(".form-container");
const cancelFormPopupBtn=formPopup.querySelector(".cancel-btn");
const errs=formPopup.querySelectorAll(".error");
const closePopupBtns= document.querySelectorAll(".close-popup-btn");

const selectedItemPopup=document.querySelector(".selected-item-popup")
const selectedPopupHeader=selectedItemPopup.querySelector(".selected-popup-header h3");
const selectedTable =document.querySelector(".selected-table");
const selectedTBody=document.querySelector(".selected-table tbody");
const selectedTableCheckInputs=selectedTable.querySelectorAll("input[type='checkbox']");
const importBtn=document.querySelector(".import-btn")
const cancelSelectedBtn=selectedItemPopup.querySelector(".cancel-btn");
const selectedCheckedAllInput=selectedItemPopup.querySelector(".select-all-items")

closePopupBtns.forEach(btn => btn.addEventListener("click", () => {
  closePopup();
}))

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closePopup();
  }
});

function closePopup(){
  popupOverlay.classList.remove("active");
  popups.forEach(pop=>pop.classList.remove("active"));
  if(formPopup.classList.contains("active")){
    updateForm.reset();
    dateText.textContent="dd-mm-yyyy";
    errs.forEach(err=>err.classList.remove("active"));
    formPopup.classList.remove("active");
  }

}

//get products
let selectedQuote;
function getProducts(event){
  const clickedId=event.target.dataset.id
  totalQuotes.forEach(q=>{
    if(q.id==clickedId){
      selectedQuote=q
    }
  })
  openSelectedPopup(clickedId,selectedQuote)
}



function openSelectedPopup(clickedId,q){
  popupOverlay.classList.add("active");
  selectedItemPopup.classList.add("active");
  selectedPopupHeader.innerHTML=`Select Line items To Import From Existing Quote ID "${clickedId}"`
  selectedTBody.innerHTML="";
  const products=q.products;
  products.forEach((p,i)=>{
    selectedTBody.innerHTML+=`
    <tr>
      <td><input type="checkbox" id="select-item"></td>
      <td>${i+1}</td>
      <td>${p.qty_requested}</td>
      <td><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt adipisci necessitatibus veritatis sit quos. Ea id, cum tempore soluta omnis, deserunt recusandae, dignissimos quasi sequi et error eum libero perferendis. </span></td>
      <td><span class="content"><span class="prod-id">${p.requested_id}</span> <span class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt adipisci necessitatibus veritatis sit quos. Ea id, cum tempore soluta omnis, deserunt recusandae, dignissimos quasi sequi et error eum libero perferendis.</span></span></td>
      <td>AD ${Math.floor(Math.random()* (99999-10000+1))+10000}</td>
    </tr>
    `
  })
  clickCheckInput(document.querySelector(".selected-table tbody"))
}

function selectAllRow(){
  const selectedTBody =document.querySelector(".selected-table tbody");

  const tableRows =selectedTBody.querySelectorAll("tr");

  const isAllChecked =[...tableRows].every(row =>row.querySelector("input[type='checkbox']").checked);

  tableRows.forEach(row => {
    const inp =row.querySelector("input[type='checkbox']");
    inp.checked = !isAllChecked;

    if(isAllChecked)
      importBtn.classList.remove("active");
    else
      importBtn.classList.add("active");
  });

}

cancelSelectedBtn.addEventListener('click',()=>{
  closePopup();
  selectedTableCheckInputs.forEach(inp=>inp.checked=false);
})

let selectedProdId=[]
function clickCheckInput(tBody){
  const checkInputs=tBody.querySelectorAll("tr td input[type='checkbox']");
  checkInputs.forEach(inp=>{
    inp.addEventListener('change',()=>{
      const isChecked = [...checkInputs].some(input =>input.checked==true);
      if(isChecked)
        importBtn.classList.add("active");
        
      else
        importBtn.classList.remove("active");

      selectedProdId=[];
      checkInputs.forEach(input => {
        if(input.checked){
          const tr =input.closest("tr");
          const prodId =tr.querySelector(".prod-id").textContent.trim();
          selectedProdId.push(prodId);
        }
      })
      console.log(selectedProdId)
    })

  })

}

let newId="";
let newQuote={};
importBtn.addEventListener('click',()=>{
  if(selectedQuote){
    newId=Math.floor(Math.random()* (9999999-1000000+1))+1000000;

    let isExists = totalQuotes.some(q =>q.id === newId);
    while(isExists){
      newId=Math.floor(Math.random()* (9999999-1000000+1))+1000000;
      isExists =totalQuotes.some(q => q.id === newId);
    }
 
    const prods=[...selectedQuote.products];
    const filProds=prods.filter(p =>selectedProdId.includes(p.requested_id));
    newQuote = {...selectedQuote};
    newQuote.products=filProds;
    newQuote.id=newId
    newQuote.total_price= selectedQuote.products.reduce(
    (sum, p) => sum + parseFloat(p.total_cost),0 ).toFixed(2);
    newQuote.lines=filProds.length;
    newQuote.total_line_no=filProds.length;
    closePopup();
    selectedTableCheckInputs.forEach(inp=>inp.checked=false);
    existFilterWrapper.classList.remove("active");
    quoteOrderWrapper.classList.add("active");
    sessionStorage.setItem("newQuote",JSON.stringify(newQuote))
    renderQuickInfo(newQuote)
    renderDisplayTable(newQuote);
  }
})

//render quote data
const CreateBtn=document.querySelector(".back-create-btn");
const oldQuoteText=document.querySelector(".old-quote-id");
const quickInfoWrapper=quoteOrderWrapper.querySelector(".quick-info-wrapper");
const displayTable=quoteOrderWrapper.querySelector(".display-table");
const disTableBodyWrapper=displayTable.querySelector(".body-wrapper");
const expandBtns=document.querySelectorAll(".expand-btn");
const closeBtn = document.querySelector(".close-modal-btn");

function renderQuickInfo(newQuote){
  CreateBtn.childNodes[1].textContent=`#${newQuote.id}`
  // oldQuoteText.innerHTML=`(Old Quote ID #${selectedQuote.id})`
  console.log(newQuote.id)
  const splittedBill = newQuote.bill_to.split("\n");
  const splittedShip = newQuote.ship_to.split(",");
  quickInfoWrapper.innerHTML="";
  quickInfoWrapper.innerHTML=`
    <div class="info">
      <p class="header">Bill To <button type="button" class="edit-btn" data-title="bill to" data-edit="bill_to"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
      <div class="details">
        <p class="name">${splittedBill[0]}</p>
        <p class="address">${splittedBill[1]} <br> ${splittedBill[2]}</p>
      </div>
    </div>
    <div class="info">
      <p class="header">Ship To <button type="button" class="edit-btn" data-title="ship to" data-edit="ship_to"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
      <div class="details">
        <p class="name">${splittedShip[0]}</p>
        <p class="address">${splittedShip[1]} <br> ${splittedShip[2]}</p>
      </div>
    </div>                    
    <div class="info">
      <p class="header">PO No <button type="button" class="edit-btn" data-title="po no" data-edit="po_no"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="po-no-text text">${newQuote.po_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Job No <button type="button" class="edit-btn" data-title="job no" data-edit="job_no"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="job-no-text text">${newQuote.job_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Buyer <button type="button" class="edit-btn" data-title="buyer" data-edit="buyer"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="buyer-text text">${newQuote.buyer}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Deleivery Date <button type="button" class="edit-btn" data-title="deleivery date" data-edit="deleivery_date"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="deleivery-text text">${newQuote.deleivery_date}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">#Lines</p>
          <div class="details">
            <p class="line-text">${newQuote.lines}</p>
          </div>
        </div>
      <div class="info">
        <p class="header">Total Price</p>
        <div class="details">
          <p class="price-text">$${newQuote.total_price}</p>
        </div>
      </div>
  `
  editQuoteInfo(document.querySelector(".quick-info-wrapper"))
}

//edit quote info
function editQuoteInfo(quoteInfoWrap){
    const editBtns=quoteInfoWrap.querySelectorAll(".edit-btn");
    editBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      
      popupOverlay.classList.add("active");
      formPopup.classList.add("active");
      const editItem=btn.dataset.edit;
      formTitle.textContent=btn.dataset.title;
      formContainers.forEach(container=>container.classList.remove("active"))
      formContainers.forEach(container=>{
        if(container.classList.contains(editItem)){
          container.classList.add("active");
        }
      })
    })
  })
}

//update form function
const updateForm=formPopup.querySelector(".update-form");
const updateBtn=formPopup.querySelector(".update-btn");

function closeFormPopup(){
 closeFormPopup();
}
cancelFormPopupBtn.addEventListener('click',()=>{
  closeFormPopup();
})

updateBtn.addEventListener('click',()=>{
  formContainers.forEach(container=>{
    if(container.classList.contains("active")){
      validateUpdateForm(container);
    }
  })
  
})

function validateUpdateForm(container){
  const inpField = container.querySelector("input, textarea");
  const val = inpField.value.trim();

  const errEl = container.querySelector(".error");

  if(val === ""){
    errEl.classList.add("active");
    errEl.textContent =`Please enter the ${inpField.placeholder}`;
    
  } else {

    errEl.classList.remove("active");
    const con=container.dataset.con;
    changeQuickInfo(inpField,con)
  }
}

function changeQuickInfo(inp,con){
  const quoteInfoWrap=document.querySelector(".quick-info-wrapper");
  const editBtns=quoteInfoWrap.querySelectorAll(".edit-btn");
    editBtns.forEach(btn=>{
    const editItem=btn.dataset.edit;
    const info=btn.closest(".info");
    
    if(editItem==con){
      if(con=="ship_to" || con=="bill_to"){
    
      if(inp.name=="name"){
        const nameText=info.querySelector(".name");
        nameText.textContent=inp.value;
      }
      else if(inp.name=="address"){
        const addr=info.querySelector(".address");
        console.log(addr.textContent)
        console.log(inp.value)
        addr.innerHTML = inp.value.replace(/\n/g, "<br>");
      }
      
      }
      else{
        const text=info.querySelector(".text");
        text.textContent=inp.value;
          updateForm.reset();
          formPopup.classList.remove("active");
          dateText.textContent="dd-mm-yyyy";
          popupOverlay.classList.remove("active");
          errs.forEach(err=>err.classList.remove("active"));
      }
    }
  })
  
}

//render display table
renderDisplayTable(JSON.parse(sessionStorage.getItem("newQuote")))
renderQuickInfo(JSON.parse(sessionStorage.getItem("newQuote")))
function renderDisplayTable(newQuote){
  const bodyWrapper=displayTable.querySelector(".body-wrapper");
  bodyWrapper.innerHTML="";

  const products=newQuote.products;

  products.forEach((p,i)=>{
    bodyWrapper.innerHTML+=`
    <div class="table-row">
      <p></p>
      <p><input type="checkbox"></p>
      <p><span>${i+1}</span>
      </p>
      <p><input type="text" value="${p.qty_requested}" name="qty-requested"></p>
      <p>
        <span class="title-text">Lorem ipsum dolor sit.</span>
        <span class="dropdown-text">
          <img src="./assets/images/global/down-arrow.png" alt="down-arrow" class="down-arrow-img"> <span class="id">${p.requested_id}</span> - 
          <span class="detail">tydlx4ypi6</span></span>
        <span class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam doloribus hic facere, veniam in distinctio id tempora voluptatum? Facilis eius aut numquam. Alias perferendis sunt veniam reprehenderit officiis quas delectus.</span>  
      </p>
      <p><span>${p.score}</span>
      </p>
      <p> <span>${p.available_qty}</span></p>
      <p><span>$<input type="text" value="${p.unit_cost}" name="cost"></span></p>
      <p><span><input type="text" value="${p.margin}" name="margin">%</span></p>
      <p><span>${p.selling_price}</span></p>
      <p><span>$${p.total_cost.toFixed(2)}</span></p>
      <p>
        <button type="button" class="delete-line-btn active" onclick=delRow(event)><img src="./assets/images/global/delete_icon.png" alt="delete"></button>
        <button type="button" class="undo-line-btn" onclick=undoRow(event)> <img src="./assets/images/dashboard/Undo_icon.png" alt="undo"></button>
      </p>
      <p class="bottom-line"><img src="./assets/images/create_quote/line_add icon.png" alt="add icon" ><span class="line"></span></p>
      <button class="add-note-btn"><img src="./assets/images/create_quote/add note_grey bg.png" class="img-grey active" alt="add note grey"> <img src="./assets/images/create_quote/add note icon_blue.png" class="img-blue " alt="add note blue "></button>
    </div>
    
    `;
  })
  bodyWrapper.innerHTML+=`<div class="add-btn-container left">
    <button type="button"><img src="./assets/images/create_quote/add item_icon.png" alt="add"></button>
    <p class="text">Click here to Add Item</p>
    </div>`
  clickTable(displayTable.querySelector(".body-wrapper"));
  editTableData(displayTable.querySelector(".body-wrapper"));
}

//click and edit table data
function clickTable(bodyWrap){

  const rows =bodyWrap.querySelectorAll(".table-row");

  rows.forEach(row => {

    row.addEventListener('click',rowClickHandler);

  });

}

function rowClickHandler(e){

  const row = e.currentTarget;

  const pTag = e.target.closest("p");

  // clicked directly on text/child inside p
  if (pTag && e.target !== pTag) {
    return;
  }

  if (e.target.closest("button")) {
    return;
  }

  row.style.cursor = "pointer";

  const sourceDropDown =row.nextElementSibling;

  sourceDropDown.classList.toggle("active");

}

//min and max table btn function
const leftWrapper=quoteOrderWrapper.querySelector(".left-wrapper");
const rightWrapper=quoteOrderWrapper.querySelector(".right-wrapper");
const mailExpandBtn=leftWrapper.querySelector(".mail-expand-btn");
const uploadBtnContainer=leftWrapper.querySelector(".upload-btn-container");
const mailMinimizeBtn=leftWrapper.querySelector(".minimize-btn");

mailExpandBtn.addEventListener("click", () => {

  if (leftWrapper.classList.contains("maximize")) {

    leftWrapper.classList.remove("minimize");
    leftWrapper.classList.remove("maximize");
    rightWrapper.classList.remove("maximize");
    rightWrapper.classList.remove("minimize");

  } else {

    leftWrapper.classList.remove("minimize");
    leftWrapper.classList.add("maximize");
    rightWrapper.classList.remove("maximize");
    rightWrapper.classList.add("minimize");

  }

});

mailMinimizeBtn.addEventListener("click", () => {
  if (leftWrapper.classList.contains("minimize")) {

    leftWrapper.classList.remove("minimize");
    leftWrapper.classList.remove("maximize");
    rightWrapper.classList.remove("maximize");
    rightWrapper.classList.remove("minimize");
    uploadBtnContainer.classList.remove("not-active")

  } 
  
  else {

    leftWrapper.classList.add("minimize");
    leftWrapper.classList.remove("maximize");
    rightWrapper.classList.add("maximize");
    rightWrapper.classList.remove("minimize");
    uploadBtnContainer.classList.add("not-active")
    
  }

});

//edit table data
function editTableData(bodyWrap){

  const tableRows =bodyWrap.querySelectorAll(".table-row");

  tableRows.forEach(row => {

    const qtyInp =row.querySelector('input[name="qty-requested"]');

    const costInp =row.querySelector('input[name="cost"]');

    const marginInp =row.querySelector('input[name="margin"]');

    const sellingPriceEl =row.children[9].querySelector("span");

    const totalPriceEl =row.children[10].querySelector("span");

    function updatePrices(){

      const qty =parseFloat(qtyInp.value) || 0;

      const cost =parseFloat(costInp.value) || 0;

      const margin =parseFloat(marginInp.value) || 0;

      // selling = cost + margin%
      const sellingPrice =cost + (cost * margin / 100);

      // total = qty * selling
      const totalPrice =qty * sellingPrice;

      sellingPriceEl.textContent =sellingPrice.toFixed(2);

      totalPriceEl.textContent =`$${totalPrice.toFixed(2)}`;

    }

    [qtyInp, costInp, marginInp].forEach(inp => {
      allowNumbers(inp)
      inp.addEventListener("input",updatePrices);
    });

  });

}

function allowNumbers(inp){

  inp.addEventListener("input", () => {

    inp.value = inp.value.replace(/\D/g, "");
  });

}

//delete table row
function delRow(event){
  const delBtn=event.target.parentElement;
  const row=delBtn.parentElement.parentElement;
  const undoBtn=row.querySelector(".undo-line-btn");
  row.classList.add("not-active");
  console.log(undoBtn)
  delBtn.classList.remove("active");
  undoBtn.classList.add("active");
  const paras=row.querySelectorAll("p")
  paras.forEach(p=>{
    p.style.pointerEvents = "none";
  })
  
  // enable only delete & undo
  delBtn.style.pointerEvents = "auto";
  undoBtn.style.pointerEvents = "auto";

  row.removeEventListener("click",rowClickHandler);
}

//undo table row
function undoRow(event){
  const undoBtn=event.target.parentElement;
  const row=undoBtn.parentElement.parentElement;
  const delBtn=row.querySelector(".delete-line-btn");

  row.classList.remove("not-active");
  
  delBtn.classList.add("active");
  undoBtn.classList.remove("active");
  const paras=row.querySelectorAll("p")
  paras.forEach(p=>{
    p.style.pointerEvents = "auto";
  })
  

  row.addEventListener("click",rowClickHandler);
}

const leftHeaderBtns=leftWrapper.querySelectorAll(".header-wrapper .btn-container button");
const uploadWrapper=leftWrapper.querySelector(".upload-wrapper");
const leftTableWrapper=leftWrapper.querySelector(".table-wrapper");


leftHeaderBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    leftHeaderBtns.forEach(btn=> btn.classList.remove("active"));
    btn.classList.add("active");
    uploadBtnContainer.classList.remove("active");
    uploadWrapper.classList.remove("active");
    leftTableWrapper.classList.remove("active");
    const target=btn.dataset.target;
    const wrappper=leftWrapper.querySelector(target);

    wrappper.classList.add("active");
    // if(target!=".mail-wrapper"){
    //   uploadBtnContainer.classList.add("active");
    // }
  })
})