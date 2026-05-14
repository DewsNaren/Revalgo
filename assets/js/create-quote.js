const createQuoteWrapper=document.querySelector(".create-quote-wrapper");
const popupOverlay=document.querySelector(".popup-overlay");


function setcreateQuoteWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  createQuoteWrapper.style.height=`calc(100vh - ${headerHeight}px)`;
  popupOverlay.style.height=`calc(100vh - ${headerHeight}px)`
}

setcreateQuoteWrapperHeight();

window.addEventListener('resize',setcreateQuoteWrapperHeight)

const createInpWrapper=document.querySelector(".create-input-wrapper");
const quoteOrderWrapper=document.querySelector(".quick-order-wrapper");

// createInpWrapper.classList.add("active");
// quoteOrderWrapper.classList.remove("active");

//modal
const quickContentWrapper=document.querySelector(".quick-content-wrapper");
const popups=document.querySelectorAll(".popup");
const formPopup=document.querySelector(".form-popup");
const formTitle=document.querySelector(".form-title");
const formContainers=document.querySelectorAll(".form-container");
const cancelFormPopupBtn=formPopup.querySelector(".cancel-btn");
const errs=formPopup.querySelectorAll(".error");
const closePopupBtns= document.querySelectorAll(".close-popup-btn");




closePopupBtns.forEach(btn => btn.addEventListener("click", () => {
  closeModal();
}))

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closeModal();
  }
});



//Datepicker

const formWrapper=formPopup.querySelector(".form-wrapper");
const dateText=formPopup.querySelector(".date-text");


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
  const minDate = new Date(2025, 4, 1);
  const maxDate = new Date(2026, 3, 30);
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


//default newQuote Data
const loginDetails=JSON.parse(sessionStorage.getItem("loginDetails"))
const modes=["Call","Email","ERP"];

function getRandomDate(minDate, maxDate){

  const randomTime =minDate.getTime() +Math.random() * (maxDate.getTime() - minDate.getTime());
  return new Date(randomTime);
}

function formatDate(date){

  const day =String(date.getDate()).padStart(2, "0");

  const month =String(date.getMonth() + 1).padStart(2, "0");

  const year =date.getFullYear();

  return `${day}-${month}-${year}`;

}
const receivedDate =getRandomDate(minDate, maxDate);

const approvedDate =getRandomDate(receivedDate, maxDate);


let newQuote={
  "mode":`${modes[Math.floor(Math.random()*modes.length)]}`,
  "id":9824404,
  "name":`${loginDetails?loginDetails.username:"ram"}`,
  "number":Math.floor(Math.random()*(99999999999 - 10000000000 + 1))+10000000000, 
  received_date: formatDate(receivedDate),
  approved_date: formatDate(approvedDate),
  "status":"approved",
  "total_line_no":0,
  "total_price":"0",
  "buyer":"Ondricka-Ankunding",
  "bill_to":"Ondricka-Ankunding\n822, Cottonwood, \nSalon-de-Provence B8 019738",
  "ship_to":"Realmix\n514, Golden Leaf, Salon-de-Provence\nB8 034922",
  "po_no": "VI55518/553",
  "job_no": "YM90987/934",
  "deleivery_date":formatDate(getRandomDate(minDate, maxDate)),
  "lines":0,
  "products":[]
};

const CreateBtn=createQuoteWrapper.querySelector(".back-create-btn");

const createBtns=createInpWrapper.querySelectorAll(".btn-container button");

const newBtn=createInpWrapper.querySelector(".new-btn");
const existBtn=createInpWrapper.querySelector(".exist-btn");


const createInputCon=createInpWrapper.querySelector(".create-input-container");
console.log(createInputCon)
const createInput=createInpWrapper.querySelector(".create-quote-input");
const existInput=createInpWrapper.querySelector(".exist-quote-input");
const existSearchBtn=createInpWrapper.querySelector(".exist-search-quote-btn");

const inpContainer=createInpWrapper.querySelector(".input-container");

const createQuoteBtn=inpContainer.querySelector(".create-quote-btn");
const nextBtn=inpContainer.querySelector(".next-btn");

const quoteDropdown=document.querySelector(".quote-dropdown");



const quickInfoWrapper=quoteOrderWrapper.querySelector(".quick-info-wrapper");


createBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    createBtns.forEach(btn=>btn.classList.remove("active"));
    btn.classList.add("active");

    if(newBtn.classList.contains("active")){
      existInput.classList.remove("active");
      createInputCon.classList.add("active");

      nextBtn.classList.remove("active");
      createQuoteBtn.classList.add("active");
    }
    else{
      existInput.classList.add("active");
      createInputCon.classList.remove("active");

      createQuoteBtn.classList.remove("active");
      handleExistSearch();
      nextBtn.classList.add("active");
    }
  })
})

const quoteNameWrapper=quoteDropdown.querySelector(".name-wrapper");
const quoteNameList=quoteDropdown.querySelector(".name-list");
const quoteIdWrapper=quoteDropdown.querySelector(".id-wrapper");
const quoteIdList=quoteDropdown.querySelector(".id-list");
const quotePoWrapper=quoteDropdown.querySelector(".po-wrapper");
const quotePoList=quoteDropdown.querySelector(".po-list");

function handleExistSearch() {
  const value = existInput.value.trim().toLowerCase();

  quoteIdList.innerHTML = "";
  quoteNameList.innerHTML = "";
  quotePoList.innerHTML = "";

  if (value === "") {
    quoteDropdown.classList.remove("active");
    return;
  }

  quoteDropdown.classList.add("active");

   searchedQuotes = allQuotes.filter(q => {

    const isIdMatch =q.id.toString().toLowerCase().includes(value);

    const isNameMatch =q.name.toLowerCase().includes(value);

    const isPoMatch =q.po_no &&q.po_no.toString().toLowerCase().includes(value);

    // render lists
    if (isIdMatch) {
    quoteIdList.innerHTML += `
      <li 
        data-type="id"
        data-value="${q.id}">
        ${q.id}
      </li>
    `;
  }

  if (isNameMatch) {
    quoteNameList.innerHTML += `
      <li 
        data-type="name"
        data-value="${q.name}">
        ${q.name}
      </li>
    `;
  }

  if (isPoMatch) {
    quotePoList.innerHTML += `
      <li 
        data-type="po"
        data-value="${q.po_no}">
        ${q.po_no}
      </li>
    `;
  }

    // filter condition
    return isIdMatch || isNameMatch || isPoMatch;

  });




  // hide empty sections
  quoteIdWrapper.classList.toggle(
  "not-active",!quoteIdList.children.length);

  quoteNameWrapper.classList.toggle(
  "not-active",!quoteNameList.children.length);

  quotePoWrapper.classList.toggle(
  "not-active",!quotePoList.children.length);

  if(!quoteIdList.children.length && !quoteNameList.children.length && !quotePoList.children.length){
    quoteDropdown.classList.remove("active")
  }

  

}

function handleExistSearchItemClick(e){

  const li = e.target.closest("li");

  if(!li) return;

  const type = li.dataset.type;
  const value = li.dataset.value.toLowerCase();

  let filteredQuote = [];

  if(type === "id"){
    filteredQuote = allQuotes.filter(
      q => q.id === Number(value)
    );
  }

  if(type === "name"){
    filteredQuote = allQuotes.filter(
      q => q.name.toLowerCase() === value
    );
  }

  if(type === "po"){
    filteredQuote = allQuotes.filter(
      q => q.po_no &&
      q.po_no.toString().toLowerCase() === value
    );
  }

  sessionStorage.setItem("searchedQuotes",JSON.stringify(filteredQuote));

  sessionStorage.setItem("searchedItem",JSON.stringify(value));

  existInput.value=li.dataset.value;
  quoteDropdown.classList.remove("active");
  // window.location.href = "./existing-quote.html";
}

quoteDropdown.addEventListener("click", handleExistSearchItemClick);
initializeExistSearch()
function initializeExistSearch() {
  allQuotes=JSON.parse(sessionStorage.getItem("quotes"));
  existInput.addEventListener("input", () => {
    handleExistSearch() ;
    existSearchBtn.classList.add("active")
  });

  existInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = existInput.value.trim().toLowerCase()
      searchHeaderQuotes();


      if(value!=""){
        sessionStorage.setItem("searchedQuotes",JSON.stringify(searchedQuotes));
        sessionStorage.setItem("searchedItem",JSON.stringify(value));
        existInput.value = "";

        window.location.href = "./existing-quote.html";
      }
    }

  });

  existSearchBtn.addEventListener("click", () => {
    const value = existInput.value.trim().toLowerCase();
    if(value!=""){

      sessionStorage.setItem("searchedQuotes",JSON.stringify(searchedQuotes));
      sessionStorage.setItem("searchedItem",JSON.stringify(value));
      existInput.value = "";

      window.location.href = "./existing-quote.html";
    }

  });

  nextBtn.addEventListener("click", () => {
    const value = existInput.value.trim().toLowerCase();
    if(value!=""){

      sessionStorage.setItem("searchedQuotes",JSON.stringify(searchedQuotes));
      sessionStorage.setItem("searchedItem",JSON.stringify(value));
      existInput.value = "";

      window.location.href = "./existing-quote.html";
    }

  });
}

 createInput.addEventListener("input", () => {
  const err=createInput.nextElementSibling;
  const val=createInput.value;
  createInput.value = createInput.value.replace(/\D/g, "");
  if(val.trim()===""){
    err.textContent="please enter the quote id"
  }
  if(val.length<7){
    err.textContent="quote id must be 7 digits"
  }
  else if(val.length>7){
    createInput.value=val.slice(0,7);
  }
  else if(allQuotes){
    const isExists = allQuotes.some(q =>q.id === Number(val));
      if(isExists){
        err.textContent="Quote Id already exists"
      }
      else{
        err.textContent="";
      }
  }
});


createQuoteBtn.addEventListener('click',()=>{
  validateQuoteId(createInput)
})

function validateQuoteId(inp){
  const val=inp.value;
  const err=createInput.nextElementSibling;
  console.log(val)
  if(val.trim()===""){
    err.textContent="please enter the quote id"
  }
  else if(val.length<7){
    err.textContent="quote id must be 7 digits"
  }
  else if(val.length>7){
    createInput.value=val.slice(0,7);
  }
  else if(allQuotes){
    const isExists = allQuotes.some(q =>q.id === Number(val));
    if(isExists){
      err.textContent ="Quote Id already exists";
    }
    else{
      console.log(createInput.value)
      newQuote.id=Number(createInput.value);
      sessionStorage.setItem("newQuote",JSON.stringify(newQuote));

      createInput.value="";
      err.textContent="";

      createInpWrapper.classList.remove("active");
      quoteOrderWrapper.classList.add("active");
      renderQuickInfo(JSON.parse(sessionStorage.getItem("newQuote")))
    }
  }
}
// renderQuickInfo(JSON.parse(sessionStorage.getItem("newQuote")));

function renderQuickInfo(newQuote){
  CreateBtn.childNodes[1].textContent=`#${newQuote.id}`
  console.log(newQuote.id)
  const splittedBill = newQuote.bill_to.split("\n");
  const splittedShip = newQuote.ship_to.split(",");
  quickInfoWrapper.innerHTML="";
  quickInfoWrapper.innerHTML=`
    <div class="info">
      <p class="header">Bill To <button type="button" class="edit-btn" data-title="bill to" data-edit="bill_to"><img src="./assets/images/global/Edit icon.png" alt="Edit icon"></button></p>
      <div class="details bill_to_text" >
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
            <p class="lines_text">${newQuote.lines}</p>
          </div>
        </div>
      <div class="info">
        <p class="header">Total Price</p>
        <div class="details">
          <p class="total_price_text">$${newQuote.total_price}</p>
        </div>
      </div>
  `
  editQuoteInfo(document.querySelector(".quick-info-wrapper"))
}


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
  closeModal()
})

updateBtn.addEventListener('click',()=>{
  formContainers.forEach(container=>{
    if(container.classList.contains("active")){
      validateUpdateForm(container);
      
    }
  })
  closeModal();
  
})
// function validateUpdateForm(container){
//   const inpField = container.querySelector("input, textarea");
//   const val = inpField.value.trim();

//   const errEl = container.querySelector(".error");

//   if(val === ""){
//     errEl.classList.add("active");
//     errEl.textContent =`Please enter the ${inpField.placeholder}`;
    
//   } else {

//     errEl.classList.remove("active");
//     const con=container.dataset.con;
//     changeQuickInfo(inpField,con)
//   }
// }
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

  // close only after everything valid
  

}


function changeQuickInfo(inp,con){
  const quoteInfoWrap=document.querySelector(".quick-info-wrapper");
  const editBtns=quoteInfoWrap.querySelectorAll(".edit-btn");
    editBtns.forEach(btn=>{
    const editItem=btn.dataset.edit;
    const info=btn.closest(".info");
    
    if(editItem==con){
      if(con == "ship_to" || con == "bill_to"){
    
      if(inp.name=="name"){
        const nameText=info.querySelector(".name");
        nameText.textContent=inp.value;
      }
      if(inp.name=="address"){
        const addr=info.querySelector(".address");
        // console.log(addr.textContent)
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
  // closeModal()
  
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

const leftHeaderBtns=leftWrapper.querySelectorAll(".header-wrapper .btn-container button");
const uploadWrapper=leftWrapper.querySelector(".upload-wrapper");
const leftTableWrapper=leftWrapper.querySelector(".table-wrapper");
const uploadBtnContainer=leftWrapper.querySelector(".upload-btn-container");

leftHeaderBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    leftHeaderBtns.forEach(btn=> btn.classList.remove("active"));
    btn.classList.add("active");
    uploadBtnContainer.classList.remove("active");
    uploadWrapper.classList.remove("active");
    mailWrapper.classList.remove("active");
    leftTableWrapper.classList.remove("active");
    const target=btn.dataset.target;
    const wrappper=leftWrapper.querySelector(target);

    wrappper.classList.add("active");
    if(target!=".mail-wrapper"){
      uploadBtnContainer.classList.add("active");
    }
  })
})

const displayTable=document.querySelector(".display-table")
//add lines
const addBtn=document.querySelector(".add-btn-container .add-btn");
const addPopup=document.querySelector(".add-popup");
const addTable=addPopup.querySelector(".add-table");
const addLineBtns=addTable.querySelectorAll(".add-line-btn");
const canceladdpopupBtn=addPopup.querySelector(".cancel-btn");


function openAddPopup(){
  popupOverlay.classList.add("active");
  addPopup.classList.add("active");
  editPopupData(addTable.querySelector(".body-wrapper"));
}

// function selectAllRow(event){
//   const bodyWrap=displayTable.querySelector(".body-wrapper")
//   const tableRows =bodyWrap.querySelectorAll(".table-row");
//   const isChecked = event.target.checked;

//   tableRows.forEach(row => {
//     const inp=row.querySelector("input[type='checkbox']");
      
//     inp.checked=isChecked;
//   })

// }

editPopupData(addTable.querySelector(".body-wrapper"))
function editPopupData(bodyWrap){

  const tableRows =bodyWrap.querySelectorAll(".table-row");

  tableRows.forEach(row => {
    const qtyInp =row.querySelector('input[name="qty-requested"]');

    const costText =row.querySelector(".cost");

    const marginInp =row.querySelector('input[name="margin"]');

    const sellingPriceEl =row.querySelector(".selling-price");

    const totalPriceEl =row.querySelector(".total-cost");

    function updatePrices(){

      const qty =parseFloat(qtyInp.value) || 0;

      const cost =parseFloat(costText.textContent.replace("$", "")) || 0;

      const margin =parseFloat(marginInp.value) || 0;

      // selling = cost + margin%
      const sellingPrice =cost + (cost * margin / 100);

      // total = qty * selling
      const totalPrice =qty * sellingPrice;

      sellingPriceEl.textContent =sellingPrice.toFixed(2);

      totalPriceEl.textContent =`$${totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}`;

    }

    [qtyInp, marginInp].forEach(inp => {
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

function addLine(event){
  const row=event.target.closest(".table-row");
  const bodyWrap=event.target.parentElement.parentElement.parentElement;
  const cloned = row.cloneNode(true);
  bodyWrap.appendChild(cloned)
  editPopupData(addTable.querySelector(".body-wrapper"))
}

// function closeAddPopup(){
//   closeModal();
//   const popup=event.target.closest(".add-popup");
//   const rows=popup.querySelectorAll(".body-wrapper .table-row");
//   rows.forEach((row, index) => {

//     if(index !== 0){
//       row.remove();
//     }
//   })
// }


canceladdpopupBtn.addEventListener('click',(event)=>{
 closeModal();
})

const addLinesBtn=addPopup.querySelector(".add-lines-btn");

addLinesBtn.addEventListener("click", () => {
  addProductsToQuote();
  updateQuoteTotals();
  renderDisplayTable(newQuote)
  approveQuoteBtn.classList.add("active")
  closeModal();
});

function addProductsToQuote(){

  const rows =addTable.querySelectorAll(".body-wrapper .table-row");

  rows.forEach(row => {

    const productObj = {

    qty_requested:parseFloat(row.querySelector('input[name="qty-requested"]').value) || 0,

      requested_id:row.querySelector(".id").textContent.trim(),

      score:parseFloat(row.children[2].textContent) || 0,

      available_qty:parseFloat(row.children[3].textContent) || 0,

      unit_cost:
        parseFloat(row.querySelector(".cost").textContent.replace("$", "")) || 0,

      margin:
        parseFloat(
          row.querySelector('input[name="margin"]').value) || 0,

      selling_price:
        parseFloat(
          row.querySelector(".selling-price").textContent.replace("$", "")) || 0,

      total_cost:
        parseFloat(row.querySelector(".total-cost").textContent.replace("$", "").replaceAll(",", "")) || 0
    };
    console.log(getDelId())
    productObj.delId=getDelId();
    newQuote.products.push(productObj);

  });

}

function updateQuoteTotals(){

  newQuote.lines =newQuote.products.length;

  newQuote.total_line_no =newQuote.products.length;

  newQuote.total_price =newQuote.products.reduce((sum, p) =>sum + p.total_cost,0).toFixed(2);
  const totPriceText=quickInfoWrapper.querySelector(".total_price_text");
  const linesText=quickInfoWrapper.querySelector(".lines_text");
  totPriceText.textContent=`$${newQuote.total_price}`
  linesText.textContent=newQuote.products.length;

}

function renderDisplayTable(newQuote){
  const bodyWrapper=displayTable.querySelector(".body-wrapper");
  bodyWrapper.innerHTML="";

  const products=newQuote.products;

  products.forEach((p,i)=>{
    bodyWrapper.innerHTML+=`
    <div class="table-row">
      <p><input type="checkbox" class="check-line-input" onclick=enableDeleteAllBtn()></p>
      <p><span>${i+1}</span>
      </p>
      <p><input type="text" value="${p.qty_requested}" name="qty-requested"></p>
      <p>
        <span class="title-text">Lorem ipsum dolor sit.</span>
        <span class="dropdown-text">
          <img src="./assets/images/global/down-arrow.png" alt="down-arrow" class="down-arrow-img" onclick=openSuggestPopup(event)> <span class="requested-id">${p.requested_id}</span> - 
          <span class="detail" onclick="enableSourceText(event)">tydlx4ypi6</span> - 
          <span class="${p.isSource==true?"sourcing active":"sourcing"}"  onclick="openSourcingPopup(event)"><img src="./assets/images/orderpad/Sourcing_icon.png" alt="sourcing">Sourcing</span>
          <span class="${p.isStock==true?"stock-wrapper active":"stock-wrapper"}"><span class="supplier-text text-uppercase" onclick="openSupplierPopup(event)">${p.supplier?p.supplier:"eaton"}</span>
           - <span class="${p.stock=="NS"?"stock-text red":" stock-text green"}">
              ${p.stock?p.stock:"S"}
              <span class="tooltiptext">${p.stock=="S"?"Stock":"Non Stock"}</span>
            </span> - 
           </span>
          <span class="tag-text"><img src="./assets/images/global/tag.png" alt="tag">Kanebridge</span>
          </span>
        <span class="text">${p.desc?p.desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam doloribus hic facere, veniam in distinctio id tempora voluptatum? Facilis eius aut numquam. Alias perferendis sunt veniam reprehenderit officiis quas delectus.'}</span>  
      </p>
      <p><span class="score">${p.score}</span>
      </p>
      <p> <span class="available-qty">${p.available_qty}</span></p>
      <p><span>$<input type="text" value="${p.unit_cost}" name="cost"></span></p>
      <p><span><input type="text" value="${p.margin}" name="margin">%</span></p>
      <p><span class="selling-price">$${p.selling_price.toFixed(2)}</span></p>
      <p><span class="total-cost">$${p.total_cost.toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2})}</span></p>
      
      <p>
        <button type="button" class="delete-line-btn active" onclick=delRow(event)><img src="./assets/images/global/delete_icon.png" alt="delete"></button>
        <button type="button" class="undo-line-btn" onclick=undoRow(event)> <img src="./assets/images/dashboard/Undo_icon.png" alt="undo"></button>
      </p>
      <button class="add-note-btn"><img src="./assets/images/create_quote/add note_grey bg.png" class="img-grey active" alt="add note grey"> <img src="./assets/images/create_quote/add note icon_blue.png" class="img-blue " alt="add note blue "></button>
      <p class="del-id">${p.delId}</p>
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
    bodyWrapper.innerHTML+=`
    <div class="add-btn-container left">
      <button type="button" class="add-btn" onclick="openAddPopup()"> <img src="./assets/images/create_quote/add item_icon.png" alt="add"></button>
      <p class="text">Click here to Add Item</p>
    </div>
    `
  })
  clickTable(displayTable.querySelector(".body-wrapper"));
  editTableData(displayTable.querySelector(".body-wrapper"));
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

}

// function editTableData(bodyWrap){

//   const tableRows =bodyWrap.querySelectorAll(".table-row");

//   tableRows.forEach(row => {

//     const qtyInp =row.querySelector('input[name="qty-requested"]');

//     const costInp =row.querySelector('input[name="cost"]');

//     const marginInp =row.querySelector('input[name="margin"]');

//     const sellingPriceEl =row.children[8].querySelector("span");

//     const totalPriceEl =row.children[9].querySelector("span");
//     const delId=row.querySelector(".del-id")

//     function updatePrices(){

//       const qty =parseFloat(qtyInp.value) || 0;

//       const cost =parseFloat(costInp.value) || 0;

//       const margin =parseFloat(marginInp.value) || 0;

//       // selling = cost + margin%
//       const sellingPrice =cost + (cost * margin / 100);

//       // total = qty * selling
//       const totalPrice =qty * sellingPrice;

//       sellingPriceEl.textContent =sellingPrice.toFixed(2);

//       totalPriceEl.textContent =`$${totalPrice.toFixed(2)}`;

//     }

//     [qtyInp, costInp, marginInp].forEach(inp => {
//       allowNumbers(inp)
//       inp.addEventListener("input",updatePrices);
//     });

//   });

// }

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

      // selling = cost + margin%
      const sellingPrice = cost + (cost * margin / 100);

      // total = qty * selling
      const totalPrice = qty * sellingPrice;

      sellingPriceEl.textContent = sellingPrice.toFixed(2);

      totalPriceEl.textContent =`$${totalPrice.toLocaleString("en-US", {minimumFractionDigits: 2,
        maximumFractionDigits: 2})}`;

      // UPDATE newQuote.products
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
function selectAllRow(event){
  const bodyWrap=displayTable.querySelector(".body-wrapper")
  const tableRows =bodyWrap.querySelectorAll(".table-row");
  const isChecked = event.target.checked;

   tableRows.forEach(row => {
      const inp=row.querySelector("input[type='checkbox']")
      inp.checked=isChecked;
    })
    if(isChecked)
      delAllBtn.classList.add('selected');
    else
      delAllBtn.classList.remove('selected');
}
const descInputs =leftTableWrapper.querySelectorAll(".desc-input");
const qtyInputs=leftTableWrapper.querySelectorAll(".qty-input");

let products=[];
let filteredProducts=[];

async function getProducts() {
  try {
    const resp = await fetch("../assets/json/product.json")
    const data = await resp.json()
    products=data;
   
  } catch (err) {
    console.error("Error:", err)
  }
}
getProducts();

function getDelId(){
  // allQuotes.forEach(p=>{
    let delId =Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    let isExists = allQuotes.forEach(q=>[...q.products].some(q => q.delId ===  delId)) ||
    newQuote.products.some(prod => prod.delId === delId);
    while (isExists) {
      delId =Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

      isExists =[...allQuotes.products].some(q => q.requested_id ===   delId) ||
      newQuote.products.some(prod => prod.delId === delId);
    }
    return delId;
  // })
}

// function renderAddPopupTable(){
//   const bodyWrap=addPopup.querySelector(".add-table .body-wrapper");
//   bodyWrap.innerHTML="";
//   const prod=products[0];

//   bodyWrap.innerHTML=`<div class="table-row">
//      <p><input type="text" value="${prod.qty_requested}" name="qty-requested" autocomplete="off"></p>
//         <p><img src="./assets/images/global/down-arrow.png" alt="down-arrow" class="down-arrow-img"> <span class="id">${prod.requested_id}</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam doloribus hic facere, veniam in distinctio id tempora voluptatum? Facilis eius aut numquam. Alias perferendis sunt veniam reprehenderit officiis quas delectus.</p>
//         <p>${prod.score}%</p>
//         <p>${prod.available_qty}</p>
//         <p>AD12465</p>
//         <p class="cost">$${prod.unit_cost}</p>
//        <p><span><input type="text" value="10" name="margin" autocomplete="off">%</span></p>
//         <p class="selling-price">$${prod.selling_price}</p>
//         <p class="total-cost">$${prod.total_cost.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}</p>
//         <button type="button"><img src="./assets/images/create_quote/edit-grey.png" alt="edit"></button>
//       <button type="button" class="add-line-btn" onclick="addLine(event)"><img src="./assets/images/create_quote/line_add icon.png" alt="add"></button>
//       </div>
//       `;
// }



async function initProducts() {

  await getProducts();
  // renderAddPopupTable();
  renderSuggestPopup(products);
  renderSourcingPopup(products);
  renderSupplierPopup(products);
  initProductSearch();
}

initProducts();

//supplier popup




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



const uploadBtn=uploadBtnContainer.querySelector(".upload-btn")
uploadBtn.addEventListener('click',()=>{
  if(leftTableWrapper.classList.contains("active")){
    getSearchedProducts();
    renderDisplayTable(newQuote)
    approveQuoteBtn.classList.add("active")
    const addBtn=document.querySelector(".add-btn-container .add-btn");
    addBtn.classList.add("left");
  }
})
 
function getSearchedProducts(){
  const newProducts=newQuote.products;
  if(searchedProduct.length >0){
    descInputs.forEach(inp=>inp.value="");
    qtyInputs.forEach(inp=>inp.value="")
    searchedProduct.forEach(p => {
      // let newReqId =Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
      // let isExists = allQuotes.forEach(q=>[...q.products].some(q => q.requested_id ===  "ID" + newReqId)) ||
      // newQuote.products.some(prod => prod.requested_id === "ID" + newReqId);

      // while (isExists) {

      //   newReqId =Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

      //   isExists =[...allQuotes.products].some(q => q.requested_id ===  "ID" + newReqId) ||
      //   newQuote.products.some(prod => prod.requested_id === "ID" + newReqId);
      // }

      // p.requested_id = "ID" + newReqId;
      p.delId=getDelId();
      newQuote.products.push(p);

    });
    updateQuoteTotals();
  }
}


function updateQuickInfoData() {
  const fields = ["po_no","job_no","buyer","deleivery_date"];

  fields.forEach(key => {
    const el = document.querySelector(`.${key}_text`);
    if (el) {
      newQuote[key] = el.textContent.trim();
    }

  });

  ["bill_to", "ship_to"].forEach(key => {
    const wrap = document.querySelector(`.${key}_text`);

    if (!wrap) return;

    const name = wrap.querySelector(".name")?.textContent.trim() || "";

    const address =wrap.querySelector(".address")?.innerHTML.replace(/<br\s*\/?>/gi, "\n").trim() || "";
    newQuote[key] = `${name}\n${address}`;
  });

}

function updateNewQuoteData(){
  const displayTable=document.querySelector(".display-table");
  const tableRows=displayTable.querySelectorAll(".body-wrapper .table-row");
  
  tableRows.forEach(row=>{
    if(row.classList.contains("not-active")){
      const delId =Number(row.querySelector(".del-id").textContent);
      console.log(delId)
      newQuote.products =newQuote.products.filter(p => p.delId !== delId);
    }
  })
}

const approveQuoteBtn=document.querySelector(".approve-btn");
const successPopup=document.querySelector(".success-popup");
const successHeader=successPopup.querySelector("h3");
const confirmSuccessBtn=successPopup.querySelector(".ok-btn");


approveQuoteBtn.addEventListener('click',()=>{
  if(newQuote.products.length!=0){
    updateQuickInfoData()
    updateNewQuoteData()
    addPopup.classList.remove("active");
    popupOverlay.classList.add("active");
    successPopup.classList.add("active");
    successHeader.textContent=`Quote #${newQuote.id}`;
  }

})

confirmSuccessBtn.addEventListener('click',()=>{
  const quotes=JSON.parse(sessionStorage.getItem("quotes"));
  quotes.push(newQuote)
  sessionStorage.setItem('quotes',JSON.stringify(quotes));
  const bodyWrap=displayTable.querySelector(".body-wrapper");
  bodyWrap.innerHTML="";
  bodyWrap.innerHTML=`<div class="add-btn-container ">
    <button type="button"><img src="./assets/images/create_quote/add item_icon.png" alt="add"></button>
    <p class="text">Click here to Add Item</p>
    </div>`
    window.location.href="./dashboard.html"
})

const delAllBtn=displayTable.querySelector(".header-wrapper .delete-all-btn");
const undoAllBtn=displayTable.querySelector(".header-wrapper .undo-all-btn");
const checkAllInput=displayTable.querySelector(".header-wrapper .check-all-input");

function enableDeleteAllBtn(){
  const bodyWrapper=displayTable.querySelector(".body-wrapper");
  const checkLineInps=bodyWrapper.querySelectorAll(".check-line-input")
  const isChecked = [...checkLineInps].some(inp => inp.checked);
  const isAllChecked=[...checkLineInps].every(inp => inp.checked);
  
  if(isChecked)
    delAllBtn.classList.add('selected');

  else
    delAllBtn.classList.remove('selected');


  checkAllInput.checked=isAllChecked
}

function deleteAllRow(){
  const bodyWrapper=displayTable.querySelector(".body-wrapper");
  const tableRows=bodyWrapper.querySelectorAll(".table-row");
  console.log(tableRows)
  tableRows.forEach(row=>{
    const delBtn=row.querySelector(".delete-line-btn");
    const undoBtn=row.querySelector(".undo-line-btn");
    row.classList.add("not-active");
    console.log(delBtn)
    delBtn.classList.remove("active");
    undoBtn.classList.add("active");
    const paras=row.querySelectorAll("p")
    paras.forEach(p=>{
      p.style.pointerEvents = "none";
    })
    
    delBtn.style.pointerEvents = "auto";
    undoBtn.style.pointerEvents = "auto";
    row.removeEventListener("click",rowClickHandler);

  })
  delAllBtn.classList.remove('selected','active');
  undoAllBtn.classList.add('selected','active');
  approveQuoteBtn.classList.remove("active")
  
}

function undoAllRow(){
  const bodyWrapper=displayTable.querySelector(".body-wrapper");
  const tableRows=bodyWrapper.querySelectorAll(".table-row");
  tableRows.forEach(row=>{
    const delBtn=row.querySelector(".delete-line-btn");
    const undoBtn=row.querySelector(".undo-line-btn");
    row.classList.remove("not-active");
    delBtn.classList.add("active");
    undoBtn.classList.remove("active");
    const paras=row.querySelectorAll("p")
    paras.forEach(p=>{
      p.style.pointerEvents = "auto";
    })

    row.removeEventListener("click",rowClickHandler);

  })
  approveQuoteBtn.classList.add("active")
  delAllBtn.classList.add('selected','active');
  undoAllBtn.classList.remove('selected','active');
}

