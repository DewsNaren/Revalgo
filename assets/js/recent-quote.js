const quoteWrapper=document.querySelector(".quote-wrapper");
const quickOrderWrapper=document.querySelector(".quick-order-wrapper")
const popupOverlay=document.querySelector(".popup-overlay");
const delPopup1=document.querySelector(".del-popup-1");
const delPopup2=document.querySelector(".del-popup-2");
const del1YesBtn=delPopup1.querySelector(".yes-btn");
const del2YesBtn=delPopup2.querySelector(".yes-btn");
const expandModal=popupOverlay.querySelector(".expand-modal");
const delPopup2Id=delPopup2.querySelector(".text .id");
const  delQuoteText =delPopup2.querySelector(".del-quote-text");
const expandBtns=document.querySelectorAll(".expand-btn");
const addPopup=document.querySelector(".add-popup");
const addTable=addPopup.querySelector(".add-table");
const addLineBtns=addTable.querySelectorAll(".add-line-btn");
const canceladdpopupBtn=addPopup.querySelector(".cancel-btn");

const approveQuoteBtn=document.querySelector(".approve-btn");
const successPopup=document.querySelector(".success-popup");
const successidText=successPopup.querySelector(".text .id");
const confirmSuccessBtn=successPopup.querySelector(".ok-btn");


function setQuoteWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  quoteWrapper.style.height=`calc(100vh - ${headerHeight}px)`
  popupOverlay.style.height=`calc(100vh - ${headerHeight}px)`;
}

setQuoteWrapperHeight();

window.addEventListener('resize',setQuoteWrapperHeight)




//Datepicker
const formPopup=document.querySelector(".form-popup");
const formWrapper=formPopup.querySelector(".form-wrapper");
const dateText=formPopup.querySelector(".date-text");
const minDate = new Date(2025, 4, 1);
const maxDate = new Date(2026, 3, 30);

const calendarDays = document.querySelectorAll(".custom-date-day");

calendarDays.forEach(dayBtn => {
  dayBtn.addEventListener("click", () => {
    let day = Number(dayBtn.dataset.day);
    let month = Number(dayBtn.dataset.month);
    let year = Number(dayBtn.dataset.year);

    let selectedDate = new Date(year, month - 1, day);

  });
});

function padZero(num){
  if(num > 9){
    return num;
  }
  else{
    return "0"+num;
  }
}
let flag=0;
let selectedMonth;
let selectedDatee;
let selectedYear=new Date().getFullYear();

 const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  let today = new Date();
  let current = new Date(today);
  let selectedDate = null;
  if (current < minDate) {
    current = new Date(minDate);
  }

  if (current > maxDate) {
    current = new Date(maxDate);
  }
//create datepicker

function createDatepicker(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const datesContainer = datePicker.querySelector(".dates");
  const prevBtn = datePicker.querySelector(".prev-month");
  const nextBtn = datePicker.querySelector(".next-month");
  const tags = datePicker.querySelectorAll(".tag");
  const yearEl=datePicker.querySelector(".year");
  // let today = new Date();
  // let current = new Date(today);
  // let selectedDate = null;

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = `${MONTHS[month]}`;
    yearEl.textContent=year ;
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
      if (d.faded) btn.classList.add("faded");
      if (isOutOfRange) {
        btn.classList.add("disabled");
        btn.disabled = true;
      }
    
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

        allButtons.forEach(b => b.classList.remove("current-day"));
        btn.classList.add("current-day");

        getSelectedDate(datePicker);
        validDateInput(datePicker);

        datePicker.classList.remove("active");
      });

      datesContainer.appendChild(btn);
    });
  }

  prevBtn.addEventListener("click", () => {
    const prevMonth =
    new Date(current.getFullYear(),current.getMonth() - 1, 1);

  if (prevMonth.getFullYear() < minDate.getFullYear()||
    (prevMonth.getFullYear() === minDate.getFullYear()&&
      prevMonth.getMonth() < minDate.getMonth())) {
    return;
  }
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    const nextMonth =
    new Date(current.getFullYear(),current.getMonth() + 1, 1);

    if  (nextMonth.getFullYear() > maxDate.getFullYear() ||
      (nextMonth.getFullYear() === maxDate.getFullYear() &&
      nextMonth.getMonth() > maxDate.getMonth())) {
      return;
    }

    current.setMonth(current.getMonth() + 1);
    renderCalendar();
  });

  tags.forEach(tag => {
    tag.addEventListener("click", () => {
      let type = tag.dataset.type;

      if (type === "today") selectedDate = new Date();
      if (type === "yesterday") selectedDate = new Date(Date.now() - 86400000);
      if (type === "tomorrow") selectedDate = new Date(Date.now() + 86400000);

      current = new Date(selectedDate);
      renderCalendar();
    });
  });

  renderCalendar();
   
}


const datepicker=formPopup.querySelector(".datepicker");

createDatepicker(datepicker)

const days=datepicker.querySelector(".days")
for(let i=0;i<DAYS.length;i++){
  const dayEl=document.createElement("span");
  dayEl.className="day"
  dayEl.textContent=DAYS[i];
  days.appendChild(dayEl);
}

function getSelectedDate(datePicker){
  console.log("addsd")
  const monthNameEl=datePicker.querySelector(".month-name")
  const MonthArr=monthNameEl.textContent.split(" ")
  selectedMonth=Number(MONTHS.findIndex(m => m === MonthArr[0]))+1
  selectedMonth=padZero(selectedMonth)
  const dates=datePicker.querySelectorAll(".dates .date");
  dates.forEach(d=>{
    if(d.classList.contains("current-day")){
      selectedDatee=padZero(Number(d.textContent))
    }
  })


  const parentEl=datePicker.parentElement;
  const dateInp=parentEl.querySelector(".date-input");
  dateInp.value=`${selectedYear}-${selectedMonth}-${selectedDatee}`;
  const dateText=parentEl.querySelector(".date-text");
  dateText.textContent=`${selectedDatee}-${selectedMonth}-${selectedYear}`;
  datePicker.classList.remove("active")
}

//validate dateinput

function  validDateInput(datePicker){
  const parentEl=datePicker.parentElement;
  const dateInp=parentEl.querySelector(".date-input");
  const formContainer = dateInp.parentElement.parentElement;
  console.log(formContainer)
  const errorElement = formContainer.querySelector(".error");
  if(dateInp.value==""){
    formContainer.classList.add("error");
    errorElement.textContent="";
  } else {
    formContainer.classList.remove("error");
    errorElement.textContent=""
  
  }
}

//datepicker open and close funtcion

dateText.addEventListener("click", () => {
  const parentContainer = dateText.parentElement;
  const datePicker = parentContainer.querySelector(".datepicker");

  datePicker.classList.toggle("active");
  datePicker._trigger = dateText;
});


document.addEventListener("click", (e) => {
  const dp=document.querySelector(".datepicker.active");
    if (!dp) return;
    const trigger = dp._trigger;

    if (!trigger.contains(e.target) && !dp.contains(e.target)) {
      dp.classList.remove("active");
      dp.querySelector(".datepicker-calendar").classList.remove("not-active");
    }

});


//popup and expand open close function
const modalBox = document.querySelector(".expand-modal");
const modalContent=document.querySelector(".expand-modal-content");
const closePopupBtns= document.querySelectorAll(".close-popup-btn");
const popups=document.querySelectorAll(".popup");
const quickContentWrapper=document.querySelector(".quick-content-wrapper");
const displayTable=quickContentWrapper.querySelector(".display-table");
const disTableBodyWrapper=displayTable.querySelector(".body-wrapper");
const closeBtn = document.querySelector(".close-modal-btn");
const errs=formPopup.querySelectorAll(".error");

expandBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const modalContent=document.querySelector(".expand-modal-content");
    const type = btn.dataset.type;
    const target = btn.dataset.target;
    const modalData=btn.dataset.modal
    const source = document.querySelector(target);
    if (!source) return;
    modalBox.className = "expand-modal " + type +" "+ modalData +" "+ "active";

    if (type === "table") {
      const clone = source.cloneNode(true);      
      if(target==".suggest-product-popup"){
        modalContent.appendChild(source);
        closeBtn.classList.add("not-active");
        closeSuggestExpandModal();
      }
    }
   

    popupOverlay.classList.add("active");
  });
});

closePopupBtns.forEach(btn => btn.addEventListener("click", () => {
  popups.forEach(pop=>pop.classList.remove("active"));
  popupOverlay.classList.remove("active");
}))

function closeModal(){
  popupOverlay.classList.remove("active");
  modalBox.classList.remove("active");
  const suggestSource=modalContent.querySelector(".suggest-product-popup");
  if(suggestSource){
    disTableBodyWrapper.appendChild(suggestSource)
  }
  if(formPopup.classList.contains("active")){
    updateForm.reset();
    dateText.textContent="dd-mm-yyyy";
    errs.forEach(err=>err.classList.remove("active"));
    formPopup.classList.remove("active");
  }

}
function closeSuggestExpandModal(){
  const closeSuggestExpandBtn=modalContent.querySelector(".close-suggest-popup-btn");
  closeSuggestExpandBtn.addEventListener("click", () => {
    closeModal();
    closeBtn.classList.remove("not-active");
  });
}

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closeModal();
  }
});


//
// const thumbImgInput =document.querySelector(".thumbnail-img-input");
// const thumbImg=document.querySelector(".thumbnail-img");
// thumbImgInput.addEventListener('change',(e)=>{
//   const file = e.target.files[0];
//   thumbImg.src=`./assets/images/orderpad/${file.name}`
//   console.log(file)
// })


const editAcronymInput = document.querySelector(".edit-acronym-input");

function setEditInputWidth() {
  editAcronymInput.style.width = editAcronymInput.value.length  + "ch";
}

setEditInputWidth()
editAcronymInput.addEventListener("input", setEditInputWidth);


const backBtnContainer=document.querySelector(".back-btn-container");
const CreateBtn=backBtnContainer.querySelector(".back-create-btn");
const quoteStat=backBtnContainer.querySelector(".quote-status");
const quickInfoWrapper=document.querySelector(".quick-info-wrapper");
const formTitle=document.querySelector(".form-title");
const formContainers=document.querySelectorAll(".form-container");
const cancelFormPopupBtn=formPopup.querySelector(".cancel-btn");
const delQuoteBtn=document.querySelector(".del-quote-btn");
const undoQuoteBtn=document.querySelector(".undo-quote-btn");
const approveBtnContainer=document.querySelector(".approve-btn-container");
// const displayTable=document.querySelector(".display-table");
let selectedQuote="";
let newQuote="";
// let allQuotes=[];
if(sessionStorage.getItem("selectedQuote")){
  selectedQuote= JSON.parse(sessionStorage.getItem("selectedQuote"))
  newQuote= JSON.parse(sessionStorage.getItem("selectedQuote"))
  allQuotes=JSON.parse(sessionStorage.getItem("quotes"));
  CreateBtn.querySelector("span").textContent=`#${selectedQuote.id}`
  quoteStat.classList.add(`${selectedQuote.status}`)
  quoteStat.textContent=`${selectedQuote.status}`
  if(selectedQuote.status == "deleted"){
    undoQuoteBtn.classList.add("active")
    quickOrderWrapper.classList.add("not-active");
    approveBtnContainer.classList.add("not-active");
  }
  renderQuickInfo(selectedQuote);
  renderDisplayTable(selectedQuote);
}

undoQuoteBtn.addEventListener("click",()=>{
  quickOrderWrapper.classList.remove("not-active");
  approveBtnContainer.classList.remove("not-active");
  undoQuoteBtn.classList.remove("active")
  newQuote.status="pending";
  selectedQuote.status="pending"
  quoteStat.classList.remove("deleted")
  quoteStat.classList.add(`${selectedQuote.status}`)
  quoteStat.textContent=`${selectedQuote.status}`
})

function  renderQuickInfo(selectedQuote){
  const splittedBill = selectedQuote.bill_to.split("\n");
  const splittedShip = selectedQuote.ship_to.split(",");
  quickInfoWrapper.innerHTML="";
  quickInfoWrapper.innerHTML=`
    <div class="info">
      <p class="header">Bill To <button type="button" class="edit-btn" data-title="bill to" data-edit="bill_to"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
      <div class="details bill_to_text">
        <p class="name">${splittedBill[0]}</p>
        <p class="address">${splittedBill[1]} <br> ${splittedBill[2]}</p>
      </div>
    </div>
    <div class="info">
      <p class="header">Ship To <button type="button" class="edit-btn" data-title="ship to" data-edit="ship_to"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
      <div class="details ship_to_text">
        <p class="name">${splittedShip[0]}</p>
        <p class="address">${splittedShip[1]} <br> ${splittedShip[2]}</p>
      </div>
    </div>                    
    <div class="info">
      <p class="header">PO No <button type="button" class="edit-btn" data-title="po no" data-edit="po_no"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="po_no_text text">${newQuote.po_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Job No <button type="button" class="edit-btn" data-title="job no" data-edit="job_no"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="job_no_text text">${newQuote.job_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Buyer <button type="button" class="edit-btn" data-title="buyer" data-edit="buyer"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="buyer_text text">${newQuote.buyer}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Deleivery Date <button type="button" class="edit-btn" data-title="deleivery date" data-edit="deleivery_date"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="deleivery_date_text text">${newQuote.deleivery_date}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">#Lines</p>
          <div class="details">
            <p class="lines_text text">${newQuote.lines}</p>
          </div>
        </div>
      <div class="info">
        <p class="header">Total Price</p>
        <div class="details">
          <p class="total_price_text text">$${newQuote.total_price}</p>
        </div>
      </div>
  `
  editQuoteInfo(document.querySelector(".quick-info-wrapper"))
}


function renderDisplayTable(selectedQuote){
  const bodyWrapper=displayTable.querySelector(".body-wrapper");
  bodyWrapper.innerHTML="";

  const products=selectedQuote.products;

  products.forEach((p,i)=>{
    bodyWrapper.innerHTML+=`
    <div class="${p.isDeleted==true?"table-row not-active":"table-row"}" draggable="flase">
      <p><img src="./assets/images/global/drag-menu.png" alt="drag menu" class="drag-handle"   data-index="${i}"  ></p>
      <p><input type="checkbox" class="check-line-input" onclick="enableDeleteAllBtn()"></p>
      <p><span class="line-no">${i+1}</span>
      </p>
      <p><input type="text" value="${p.qty_requested}" name="qty-requested" autocomplete="off"></p>
      <p>
        <span class="title-text">Lorem ipsum dolor sit.</span>
        <span class="dropdown-text">
          <img src="./assets/images/global/down-arrow.png" alt="down-arrow" class="down-arrow-img" onclick=openSuggestPopup(event)> <span class="id requested-id">${p.requested_id}</span> - 
          <span class="detail" onclick="enableSourceText(event)">tydlx4ypi6</span> - 
          <span class="${p.isSource==true?"sourcing active":"sourcing"}" onclick="openSourcingPopup(event)"><img src="./assets/images/orderpad/Sourcing_icon.png" alt="sourcing">Sourcing</span>
          <span class="${p.isStock==true?"stock-wrapper active":"stock-wrapper"}"><span class="supplier-text text-uppercase" onclick="openSupplierPopup(event)">${p.supplier?p.supplier:"eaton"}</span> - <span class="${p.stock=="NS"?"stock-text red":" stock-text green"}">${p.stock?p.stock:"S"}   <span class="tooltiptext">${p.stock=="S"?"Stock":"Non Stock"}</span></span> - </span>
          <span class="tag-text"><img src="./assets/images/global/tag.png" alt="tag">${p.brand}</span>
          </span>
        <span class="text">${p.desc?p.desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam doloribus hic facere, veniam in distinctio id tempora voluptatum? Facilis eius aut numquam. Alias perferendis sunt veniam reprehenderit officiis quas delectus.'}</span>  
      </p>
      <p><span class="score">${p.score}</span>
      </p>
      <p> <span class="available-qty">${p.available_qty}</span></p>
      <p><span>$<input type="text" value="${p.unit_cost}" name="cost" autocomplete="off"></span></p>
      <p><span><input type="text" value="${p.margin}" name="margin" autocomplete="off">%</span></p>
      <p><span class="selling-price">${p.selling_price}</span></p>
      <p><span class="total-cost">$${p.total_cost.toFixed(2)}</span></p>
      <p>
        <button type="button" class="delete-line-btn active" onclick=delRow(event)><img src="./assets/images/global/delete_icon.png" alt="delete"></button>
        <button type="button" class="undo-line-btn" onclick=undoRow(event)> <img src="./assets/images/dashboard/Undo_icon.png" alt="undo"></button>
      </p>
      <button class="add-line-note-btn" onclick="openLineNotePopup(event)"><img src="./assets/images/create_quote/add note_grey bg.png"  class="${p.lineNote?"img-grey ":"img-grey active"}" alt="add note grey"> <img src="./assets/images/create_quote/add note icon_blue.png" class="${p.lineNote?"img-blue active":"img-blue"}" alt="add note blue "></button>
      <p class="del-id">${p.delId}</p>
    </div>
    
    <div class="${p.isSourcing==true?"sourcing-dropdown active":"sourcing-dropdown"}">
      <div class="desc-wrapper">
        <div class="img-wrapper">
          <div><img src="./assets/images/orderpad/${p.sourceImg}.png" class="thumbnail-img" alt="default"></div>
        </div>

        <div class="desc-container">
          <h3>Description</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        </div>
      </div>

      <div class="spec-wrapper">
        <h3>Specifications</h3>
        <div class="content-container">
          <div class="left-content">
            <p><span class="label">Wire Size</span> <span class="value">${p.wire_size} AWG</span></p>
            <p><span class="label">Material</span> <span class="value">Ploepropylene</span></p>
            <p><span class="label">Specifications</span> <span class="value">#10 Fork Material </span></p>
            <p><span class="label">Dimensions</span> <span class="value">1-1/2 In L</span></p>
          </div>
          <div class="right-content">
            <p><span class="label">Housing Material</span> <span class="value">${p.housing_material}</span></p>
            <p><span class="label">Number of outlets</span> <span class="value">${p.outlet}</span></p>
            <p><span class="label">Brand</span> <span class="value">${p.brand}</span></p>
            <p><span class="label">Type</span> <span class="value">${p.type}</span></p>
          </div>
                                                    
        </div>
      </div>
    </div>
    `;
  })
  bodyWrapper.innerHTML+=`<div class="add-btn-container left">
    <button type="button" onclick="openAddPopup()"><img src="./assets/images/create_quote/add item_icon.png" alt="add"></button>
    <p class="text">Click here to Add Item</p>
    </div>`
  clickTable(displayTable.querySelector(".body-wrapper"));
  editTableData(displayTable.querySelector(".body-wrapper"));
  checkDeleted(displayTable.querySelector(".body-wrapper"));
  enableDrag(displayTable.querySelector(".body-wrapper"));
}

// drag function

function enableDrag(bodyWrap) {

  const rows = bodyWrap.querySelectorAll(".table-row");

  let draggedRow = null;

  let canDrag = false;


  rows.forEach(row => {

    const handle = row.querySelector(".drag-handle");


    // ENABLE DRAG ONLY FROM HANDLE
    handle.addEventListener("mousedown", () => {

      canDrag = true;

      row.classList.add("drag-enabled");

    });


    // STOP DRAG AFTER RELEASE
    document.addEventListener("mouseup", () => {

      canDrag = false;

      row.classList.remove("drag-enabled");

    });


    // START DRAG
    row.addEventListener("dragstart", e => {

      if (!canDrag) {

        e.preventDefault();

        return;

      }

      draggedRow = row;

      setTimeout(() => {

        row.classList.add("dragging");

      }, 0);

    });


    // END DRAG
    row.addEventListener("dragend", () => {

      row.classList.remove("dragging");

      row.classList.remove("drag-enabled");

      draggedRow = null;

      canDrag = false;


      // REMOVE TARGET HIGHLIGHTS
      bodyWrap.querySelectorAll(".drop-target")
      .forEach(r => r.classList.remove("drop-target"));


      updateLineNumbers(bodyWrap);

    });


    // ALLOW DROP
    row.addEventListener("dragover", e => {

      e.preventDefault();

    });


    // TARGET HIGHLIGHT
    row.addEventListener("dragenter", () => {

      if (!draggedRow || draggedRow === row) return;

      bodyWrap.querySelectorAll(".drop-target")
      .forEach(r => r.classList.remove("drop-target"));

      row.classList.add("drop-target");

    });


    // REMOVE TARGET
    row.addEventListener("dragleave", () => {

      row.classList.remove("drop-target");

    });


    // DROP
    row.addEventListener("drop", e => {

      e.preventDefault();

      row.classList.remove("drop-target");

      if (!draggedRow || draggedRow === row) return;


      // DRAGGED ELEMENTS
      const draggedDropdown = draggedRow.nextElementSibling;


      // TARGET ELEMENTS
      const targetRow = row;

      const targetDropdown = targetRow.nextElementSibling;


      // PLACEHOLDER
      const placeholder = document.createElement("div");


      // INSERT PLACEHOLDER AFTER TARGET GROUP
      if (
        targetDropdown &&
        targetDropdown.classList.contains("sourcing-dropdown")
      ) {

        targetDropdown.after(placeholder);

      } else {

        targetRow.after(placeholder);

      }


      // MOVE TARGET GROUP TO DRAGGED POSITION
      draggedRow.before(targetRow);

      if (
        targetDropdown &&
        targetDropdown.classList.contains("sourcing-dropdown")
      ) {

        targetRow.after(targetDropdown);

      }


      // MOVE DRAGGED GROUP TO TARGET POSITION
      placeholder.before(draggedRow);

      if (
        draggedDropdown &&
        draggedDropdown.classList.contains("sourcing-dropdown")
      ) {

        draggedRow.after(draggedDropdown);

      }


      // REMOVE PLACEHOLDER
      placeholder.remove();


      updateLineNumbers(bodyWrap);

    });

  });

}

function updateLineNumbers() {
   const tableRows = displayTable.querySelectorAll(".body-wrapper .table-row");

    tableRows.forEach((row, index) => {

      row.querySelector(".line-no").textContent = index + 1;

    });

}


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
  const delId = row.querySelector(".del-id").textContent;
  const product = newQuote.products.find(p => String(p.delId) === delId);
  if(product){
    if(sourceDropDown.classList.contains('active')){
      product.isSourcing=true; 
    }
    else{
      product.isSourcing=false;
    }
  }
  

}

function checkDeleted(bodyWrap){
  const rows=bodyWrap.querySelectorAll(".table-row");
  rows.forEach(row=>{
    if(row.classList.contains('not-active')){
      const delBtn=row.querySelector('.delete-line-btn');
      const undoBtn=row.querySelector('.undo-line-btn');
       delBtn.classList.remove("active");
      undoBtn.classList.add("active");
      const paras=row.querySelectorAll("p")
      paras.forEach(p=>{
        p.style.pointerEvents = "none";
      })
      delBtn.style.pointerEvents = "auto";
      undoBtn.style.pointerEvents = "auto";
      row.removeEventListener("click",rowClickHandler);
    }
  })
  
}

//form popup
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

const updateForm=formPopup.querySelector(".update-form");
const updateBtn=formPopup.querySelector(".update-btn");

cancelFormPopupBtn.addEventListener('click',()=>{
  updateForm.reset();
  formPopup.classList.remove("active");
  dateText.textContent="dd-mm-yyyy";
  popupOverlay.classList.remove("active");
  errs.forEach(err=>err.classList.remove("active"));
})

updateBtn.addEventListener('click',()=>{
  formContainers.forEach(container=>{
    if(container.classList.contains("active")){
      validateUpdateForm(container);
    }
  })
})

function validateUpdateForm(container){

  const inpFields = container.querySelectorAll("input, textarea");

  const errEl = container.querySelector(".error");

  let isValid = true;

  inpFields.forEach(inpField => {

    const val = inpField.value.trim();

    if(val === ""){

      isValid = false;

      errEl.classList.add("active");

      errEl.textContent =
        `Please enter the ${inpField.placeholder}`;
    }

  });

  if(!isValid) return;

  errEl.classList.remove("active");

  const con = container.dataset.con;

  inpFields.forEach(inpField => {
    changeQuickInfo(inpField, con);
  });

}



let nameInp = "";
let addrInp = "";

function changeQuickInfo(inp,con){
  const quoteInfoWrap=document.querySelector(".quick-info-wrapper");
  const editBtns=quoteInfoWrap.querySelectorAll(".edit-btn");
    editBtns.forEach(btn=>{
    const editItem=btn.dataset.edit;
    const info=btn.closest(".info");
    if(editItem==con){
      if(con == "ship_to" || con == "bill_to"){
        if(inp.name=="name"){
          nameInp = inp;
          const nameText=info.querySelector(".name");
          nameText.textContent=inp.value;
        }
        if(inp.name=="address"){
          const addr=info.querySelector(".address");
          addrInp=inp
          addr.innerHTML = inp.value.replace(/\n/g, "<br>");
        }
        if(nameInp &&addrInp){
          if(nameInp.value.trim()!=="" && addrInp.value.trim()!=="")
          formPopup.classList.remove("active");
          popupOverlay.classList.remove("active");
          errs.forEach(err=>err.classList.remove("active"));
        }
      
      }
      else{
        const text=info.querySelector(".text");
        text.textContent=inp.value;
        formPopup.classList.remove("active");
        popupOverlay.classList.remove("active");
        errs.forEach(err=>err.classList.remove("active"));
      }

    }
  })
}

//add input event listeners
formContainers.forEach(container => {

  const inpFields = container.querySelectorAll("input, textarea");

  const errEl = container.querySelector(".error");

  inpFields.forEach(inp => {

    inp.addEventListener("input", () => {
      if(inp.value.trim() !== ""){
        errEl.classList.remove("active");
      }
      else{
        errEl.classList.add("active");
        errEl.textContent =`Please enter the ${inp.placeholder}`;
      }
    });
  });
});


//mail img container
// const mailWrapper=quickContentWrapper.querySelector(".mail-wrapper");
// const mailImgContainers=mailWrapper.querySelectorAll(".img-container");
// const leftWrapper=quickContentWrapper.querySelector(".left-wrapper");
// const rightWrapper=quickContentWrapper.querySelector(".right-wrapper");
// const uploadBtnContainer=leftWrapper.querySelector(".upload-btn-container");
// const imgInfoContainer=mailWrapper.querySelector(".img-info-container");
// const mailExpandBtn=leftWrapper.querySelector(".mail-expand-btn");
// const mailMinimizeBtn=leftWrapper.querySelector(".minimize-btn");
// const selectFileInput=document.querySelector(".select-file-input");
// const selectedFileWrapper=document.querySelector(".selected-file");


// mailExpandBtn.addEventListener("click", () => {

//   if (leftWrapper.classList.contains("maximize")) {

//     leftWrapper.classList.remove("minimize");
//     leftWrapper.classList.remove("maximize");
//     rightWrapper.classList.remove("maximize");
//     rightWrapper.classList.remove("minimize");

//   } else {

//     leftWrapper.classList.remove("minimize");
//     leftWrapper.classList.add("maximize");
//     rightWrapper.classList.remove("maximize");
//     rightWrapper.classList.add("minimize");

//   }

// });

// mailImgContainers.forEach(container => {

//   container.addEventListener("click", () => {

//     const isActive =container.classList.contains("active");

//     mailImgContainers.forEach(c =>c.classList.remove("active"));

//     if (!isActive) {
//       container.classList.add("active");
//       imgInfoContainer.classList.add("active");
//     } else {
//       imgInfoContainer.classList.remove("active");
//     }

//   });

// });



// mailMinimizeBtn.addEventListener("click", () => {
//   if (leftWrapper.classList.contains("minimize")) {

//     leftWrapper.classList.remove("minimize");
//     leftWrapper.classList.remove("maximize");
//     rightWrapper.classList.remove("maximize");
//     rightWrapper.classList.remove("minimize");
//     uploadBtnContainer.classList.add('active')
//   } 
  
//   else {

//     leftWrapper.classList.add("minimize");
//     leftWrapper.classList.remove("maximize");
//     rightWrapper.classList.add("maximize");
//     rightWrapper.classList.remove("minimize");
//       uploadBtnContainer.classList.remove('active')
//   }

// });



function editTableData(bodyWrap){

  const tableRows = bodyWrap.querySelectorAll(".table-row");

  tableRows.forEach(row => {

    const qtyInp = row.querySelector('input[name="qty-requested"]');

    const costInp = row.querySelector('input[name="cost"]');

    const marginInp = row.querySelector('input[name="margin"]');

    const sellingPriceEl = row.children[8].querySelector("span");

    const totalPriceEl = row.children[9].querySelector("span");

    const delId = row.querySelector(".del-id").textContent;

    function updatePrices(){

      const qty = parseFloat(qtyInp.value) || 0;

      const cost = parseFloat(costInp.value) || 0;

      const margin = parseFloat(marginInp.value) || 0;

      const sellingPrice = cost + (cost * margin / 100);


      const totalPrice = qty * sellingPrice;

      sellingPriceEl.textContent = sellingPrice.toFixed(2);

      totalPriceEl.textContent =`$${totalPrice.toLocaleString("en-US", {minimumFractionDigits: 2,
        maximumFractionDigits: 2})}`;

      const product = newQuote.products.find(p => String(p.delId) === delId);
      if(product){

        product.qty_requested = qty;

        product.unit_cost = cost;

        product.margin = margin;

        product.selling_price = Number(sellingPrice.toFixed(2));

        product.total_cost = Number(totalPrice.toFixed(2));

      }
      updateQuoteTotals();

    }

    [qtyInp, costInp, marginInp].forEach(inp => {

      allowNumbers(inp);

      inp.addEventListener("input", updatePrices);

    });

  });

}

function allowNumbers(inp){

  inp.addEventListener("input", () => {

    inp.value = inp.value.replace(/\D/g, "");
  });

}



//add data and left tab btn click 
const leftWrapper=quickContentWrapper.querySelector(".left-wrapper");
const leftTableWrapper=leftWrapper.querySelector(".table-wrapper");
const descInputs =leftTableWrapper.querySelectorAll(".desc-input");
const qtyInputs=leftTableWrapper.querySelectorAll(".qty-input");
const uploadBtnContainer=leftWrapper.querySelector(".upload-btn-container");
let products=[];
let filteredProducts=[];
async function getAllProducts() {
  try {
    const resp = await fetch("../assets/json/product.json")
    const data = await resp.json()
    products=data;
   
  } catch (err) {
    console.error("Error:", err)
  }
}
getAllProducts();

async function initProducts() {

  await getAllProducts();
  // updateProducts();
  // renderAddPopupTable();
  renderSuggestPopup(products);
  renderSourcingPopup(products);
  renderSupplierPopup(products);
  initProductSearch();
}


initProducts();

const descDropdown=leftTableWrapper.querySelector(".desc-dropdown");
const descList =descDropdown.querySelector(".desc-list");
let currentDescInput = null;
let searchedProduct = [];

function searchProducts(inp) {

  const value =inp.value.trim().toLowerCase();

  const descDropdown =document.querySelector(".desc-dropdown");

  const descList =descDropdown.querySelector(".desc-list");

  descList.innerHTML = "";

  if (value === "") {

    descDropdown.classList.remove("active");

    return;

  }

  const rect =inp.getBoundingClientRect();


  descDropdown.style.top =`${rect.bottom + window.scrollY + 4}px`;

  descDropdown.style.left =`${rect.left + window.scrollX}px`;

  const spaceBelow =window.innerHeight - rect.bottom;

  descDropdown.style.maxHeight =`${spaceBelow - 20}px`;
  descDropdown.classList.add("active");

  filteredProducts = products.filter(p => {

    const isMatch =p.desc.toLowerCase().includes(value);
    
    if (isMatch) {

      descList.innerHTML += `
        <li data-id="${p.id}">
          ${p.desc}
        </li>
      `;

    }

    return isMatch;

  });

}
function handleProductItemClick(e){
  const li = e.target.closest("li");

  if(!li) return;

  searchedProduct=[];
  currentDescInput.value=li.textContent.trim();
  

  descInputs.forEach(inp=>{
    if(inp.value){
      const val=inp.value
      products.forEach(p=>{
        if(p.desc.includes(val))
          searchedProduct.push(p)
      })
    }
  })
  uploadBtn.classList.remove("not-active");
  descDropdown.classList.remove("active");
}

function initProductSearch(){
  descInputs.forEach(inp => {
    inp.addEventListener("input", () => {
     currentDescInput=inp;
      searchProducts(inp);
    });
  })
}
// let totalQuotes = [];
// if(sessionStorage.getItem("searchedQuotes")){
descDropdown.addEventListener("click",handleProductItemClick);
const selectedFileWrapper=document.querySelector(".selected-file");
const uploadBtn=uploadBtnContainer.querySelector(".upload-btn")
const selectFileInput=document.querySelector(".select-file-input");
uploadBtn.addEventListener('click',()=>{
  if(leftTableWrapper.classList.contains("active")){
    getSearchedProducts();
    renderDisplayTable(newQuote)
    approveQuoteBtn.classList.add("active")
    const addBtn=document.querySelector(".add-btn-container .add-btn");
  }
  if(uploadWrapper.classList.contains('active')){
    console.log(exCelData)
    getCrtData(exCelData)
    renderDisplayTable(newQuote)
    selectFileInput.value="";
    selectedFileWrapper.innerHTML="";
    uploadBtn.classList.add("not-active")
  }
})


 
function getSearchedProducts(){
  const newProducts=newQuote.products;
  if(searchedProduct.length >0){
    descInputs.forEach(inp=>inp.value="");
    qtyInputs.forEach(inp=>inp.value="")
    searchedProduct.forEach(p => {
      let newReqId =Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
      let isExists = allQuotes.forEach(q=>[...q.products].some(q => q.requested_id ===  "ID" + newReqId)) ||
      newQuote.products.some(prod => prod.requested_id === "ID" + newReqId);

      while (isExists) {

        newReqId =Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

        isExists =[...allQuotes.products].some(q => q.requested_id ===  "ID" + newReqId) ||
        newQuote.products.some(prod => prod.requested_id === "ID" + newReqId);
      }

      p.requested_id = "ID" + newReqId;
      p.delId=getDelId();
      newQuote.products.push(p);    

    });
    
    updateQuoteTotals();
  }
}


