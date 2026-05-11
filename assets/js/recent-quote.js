const quoteWrapper=document.querySelector(".quote-wrapper");
const overlay=document.querySelector(".overlay");

function setQuoteWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  quoteWrapper.style.height=`calc(100vh - ${headerHeight}px)`
  overlay.style.height=`calc(100vh - ${headerHeight}px)`;
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
const popups=document.querySelectorAll("popup");
const quickContentWrapper=document.querySelector(".quick-content-wrapper");
const displayTable=quickContentWrapper.querySelector(".display-table");
const disTableBodyWrapper=displayTable.querySelector(".body-wrapper");
const expandBtns=document.querySelectorAll(".expand-btn");
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
   

    overlay.classList.add("active");
  });
});

closePopupBtns.forEach(btn => btn.addEventListener("click", () => {
  popups.forEach(pop=>pop.classList.remove("active"));
  overlay.classList.remove("active");
}))

function closeModal(){
  overlay.classList.remove("active");
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

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
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
// const displayTable=document.querySelector(".display-table");
let selectedQuote="";
if(sessionStorage.getItem("selectedQuote")){
  selectedQuote= JSON.parse(sessionStorage.getItem("selectedQuote"))
  CreateBtn.childNodes[1].textContent=`#${selectedQuote.id}`
  quoteStat.classList.add(`${selectedQuote.status}`)
  quoteStat.textContent=`${selectedQuote.status}`
  renderQuickInfo(selectedQuote);
  renderDisplayTable(selectedQuote);
}

function  renderQuickInfo(selectedQuote){
  const splittedBill = selectedQuote.bill_to.split("\n");
  const splittedShip = selectedQuote.ship_to.split(",");
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
          <p class="po-no-text text">${selectedQuote.po_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Job No <button type="button" class="edit-btn" data-title="job no" data-edit="job_no"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="job-no-text text">${selectedQuote.job_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Buyer <button type="button" class="edit-btn" data-title="buyer" data-edit="buyer"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="buyer-text text">${selectedQuote.buyer}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Deleivery Date <button type="button" class="edit-btn" data-title="deleivery date" data-edit="deleivery_date"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="deleivery-text text">${selectedQuote.deleivery_date}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">#Lines</p>
          <div class="details">
            <p class="line-text">${selectedQuote.lines}</p>
          </div>
        </div>
      <div class="info">
        <p class="header">Total Price</p>
        <div class="details">
          <p class="price-text">$${selectedQuote.total_price}</p>
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
    <div class="table-row">
      <p><input type="checkbox"></p>
      <p><span>${i+1}</span>
      </p>
      <p><input type="text" value="${p.qty_requested}" name="qty-requested"></p>
      <p>
        <span class="title-text">Lorem ipsum dolor sit.</span>
        <span class="dropdown-text">
          <img src="./assets/images/global/down-arrow.png" alt="down-arrow" class="down-arrow-img"> <span class="id">${p.requested_id}</span> - 
          <span class="detail">tydlx4ypi6</span> - 
          <span class="sourcing"><img src="./assets/images/orderpad/Sourcing_icon.png" alt="sourcing">Sourcing</span>
          <span class="stock-wrapper"><span class="supplier-text text-uppercase">eaton</span> - <span class="stock-text">NS   <span class="tooltiptext">Non Stock</span></span> - </span>
          <span class="tag-text"><img src="./assets/images/global/tag.png" alt="tag">Kanebridge</span>
          </span>
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
      <button class="add-note-btn"><img src="./assets/images/create_quote/add note_grey bg.png" class="img-grey active" alt="add note grey"> <img src="./assets/images/create_quote/add note icon_blue.png" class="img-blue " alt="add note blue "></button>
    </div>
    
    <div class="sourcing-dropdown">
      <div class="desc-wrapper">
        <div class="img-wrapper">
          <label for="thumbnail-img"><img src="./assets/images/orderpad/default thumbnail image.png" class="thumbnail-img" alt="default"></label>
          <input type="file" id="thumbnail-img" class="thumbnail-img-input" hidden accept="image/*">
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
            <p><span class="label">Wire Size</span> <span class="value">12 AWG</span></p>
            <p><span class="label">Material</span> <span class="value">Ploepropylene</span></p>
            <p><span class="label">Specifications</span> <span class="value">#10 Fork Material </span></p>
            <p><span class="label">Dimensions</span> <span class="value">1-1/2 In L</span></p>
          </div>
          <div class="right-content">
            <p><span class="label">Housing Material</span> <span class="value">Steel</span></p>
            <p><span class="label">Number of outlets</span> <span class="value">1</span></p>
            <p><span class="label">Brand</span> <span class="value">Kanebridge</span></p>
            <p><span class="label">Type</span> <span class="value">Standard</span></p>
          </div>
                                                    
        </div>
      </div>
    </div>
    `;
  })
  clickTable(displayTable.querySelector(".body-wrapper"));
  editTableData(displayTable.querySelector(".body-wrapper"));
}

//sorcing dropdown
// function clickTable(bodyWrap){
//   const rows=bodyWrap.querySelectorAll(".table-row");
//   rows.forEach(row=>{
//     row.addEventListener('click',(e)=>{
//       const pTag = e.target.closest("p");


//   // clicked directly on text/child inside p
//       if (pTag && e.target !== pTag ) {
//         return;
//       }

//       if (e.target.closest("button")) {
//         return;
//       }
//       row.style.cursor="pointer"
//       const sourceDropDown=row.nextElementSibling;
//       sourceDropDown.classList.toggle("active");
//     })
//   })
// }

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

//form popup
function editQuoteInfo(quoteInfoWrap){
    const editBtns=quoteInfoWrap.querySelectorAll(".edit-btn");
    editBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      
      overlay.classList.add("active");
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
  overlay.classList.remove("active");
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
      }
    }
  })
  
}




//mail img container
const mailWrapper=quickContentWrapper.querySelector(".mail-wrapper");
const mailImgContainers=mailWrapper.querySelectorAll(".img-container");
const leftWrapper=quickContentWrapper.querySelector(".left-wrapper");
const rightWrapper=quickContentWrapper.querySelector(".right-wrapper");
const imgInfoContainer=mailWrapper.querySelector(".img-info-container");
const mailExpandBtn=leftWrapper.querySelector(".mail-expand-btn");
const mailMinimizeBtn=leftWrapper.querySelector(".minimize-btn");

mailImgContainers.forEach(container => {

  container.addEventListener("click", () => {

    const isActive =container.classList.contains("active");

    mailImgContainers.forEach(c =>c.classList.remove("active"));

    if (!isActive) {
      container.classList.add("active");
      imgInfoContainer.classList.add("active");
    } else {
      imgInfoContainer.classList.remove("active");
    }

  });

});

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

  } 
  
  else {

    leftWrapper.classList.add("minimize");
    leftWrapper.classList.remove("maximize");
    rightWrapper.classList.add("maximize");
    rightWrapper.classList.remove("minimize");
  }

});



function editTableData(bodyWrap){

  const tableRows =bodyWrap.querySelectorAll(".table-row");

  tableRows.forEach(row => {

    const qtyInp =row.querySelector('input[name="qty-requested"]');

    const costInp =row.querySelector('input[name="cost"]');

    const marginInp =row.querySelector('input[name="margin"]');

    const sellingPriceEl =row.children[8].querySelector("span");

    const totalPriceEl =row.children[9].querySelector("span");

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

//select all 
function selectAllRow(){
  const bodyWrap=displayTable.querySelector(".body-wrapper")
  const tableRows =bodyWrap.querySelectorAll(".table-row");
    tableRows.forEach(row => {
      const inp=row.querySelector("input[type='checkbox']")
      inp.checked=!inp.checked
    })
}