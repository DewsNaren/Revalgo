const createQuoteWrapper=document.querySelector(".create-quote-wrapper");
const popupOverlay=document.querySelector(".popup-overlay");


function setcreateQuoteWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  createQuoteWrapper.style.height=`calc(100vh - ${headerHeight}px)`;
  popupOverlay.style.height=`calc(100vh - ${headerHeight}px)`
}

setcreateQuoteWrapperHeight();

window.addEventListener('resize',setcreateQuoteWrapperHeight)

//modal
const quickContentWrapper=document.querySelector(".quick-content-wrapper");
const popups=document.querySelectorAll("popup");
const formPopup=document.querySelector(".form-popup");
const formTitle=document.querySelector(".form-title");
const formContainers=document.querySelectorAll(".form-container");
const cancelFormPopupBtn=formPopup.querySelector(".cancel-btn");
const errs=formPopup.querySelectorAll(".error");
const closePopupBtns= document.querySelectorAll(".close-popup-btn");

function closeModal(){
  popupOverlay.classList.remove("active");
  popups.forEach(pop=>pop.classList.remove("active"));
  if(formPopup.classList.contains("active")){
    updateForm.reset();
    dateText.textContent="dd-mm-yyyy";
    errs.forEach(err=>err.classList.remove("active"));
    formPopup.classList.remove("active");
  }

}

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
  "total_price":"0.00",
  "buyer":"Ondricka-Ankunding",
  "bill_to":"Ondricka-Ankunding\r\n822, Cottonwood, \r\nSalon-de-Provence B8 019738",
  "ship_to":"Realmix\n514, Golden Leaf, Salon-de-Provence\nB8 034922",
  "po_no": "VI55518/553",
  "job_no": "YM90987/934",
  "deleivery_date":formatDate(getRandomDate(minDate, maxDate)),
  "lines":0,
  "products":[]
};

const CreateBtn=createQuoteWrapper.querySelector(".back-create-btn");
const createInpWrapper=document.querySelector(".create-input-wrapper");
const createBtns=createInpWrapper.querySelectorAll(".btn-container button");

const newBtn=createInpWrapper.querySelector(".new-btn");
const existBtn=createInpWrapper.querySelector(".exist-btn");


const createInput=createInpWrapper.querySelector(".create-quote-input");
const existInput=createInpWrapper.querySelector(".exist-quote-input");
const existSearchBtn=createInpWrapper.querySelector(".exist-search-quote-btn");

const inpContainer=createInpWrapper.querySelector(".input-container");

const createQuoteBtn=inpContainer.querySelector(".create-quote-btn");
const nextBtn=inpContainer.querySelector(".next-btn");

const quoteDropdown=document.querySelector(".quote-dropdown");

const quoteOrderWrapper=document.querySelector(".quick-order-wrapper");

const quickInfoWrapper=quoteOrderWrapper.querySelector(".quick-info-wrapper");


createBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    createBtns.forEach(btn=>btn.classList.remove("active"));
    btn.classList.add("active");

    if(newBtn.classList.contains("active")){
      existInput.classList.remove("active");
      createInput.classList.add("active");

      nextBtn.classList.remove("active");
      createQuoteBtn.classList.add("active");
    }
    else{
      existInput.classList.add("active");
      createInput.classList.remove("active");

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
      q => q.id.toString().toLowerCase() === value
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
    allQuotes.forEach(q=>{
      if(q.id==Number(val)){
        typeof(q.id)
        err.textContent="Quote Id already exists"
      }
      else{
        err.textContent="";
      }
    })
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
renderQuickInfo(JSON.parse(sessionStorage.getItem("newQuote")));

function renderQuickInfo(newQuote){
  CreateBtn.childNodes[1].textContent=`#${newQuote.id}`
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