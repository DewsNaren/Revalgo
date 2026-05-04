const header=document.querySelector("header");
const createQuoteWrapper=document.querySelector(".create-quote-wrapper");
const popupOverlay=document.querySelector(".popup-overlay");
function setcreateQuoteWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  createQuoteWrapper.style.height=`calc(100vh - ${headerHeight}px)`;
  popupOverlay.style.height=`calc(100vh - ${headerHeight}px)`
}

setcreateQuoteWrapperHeight();

window.addEventListener('resize',setcreateQuoteWrapperHeight)



//Datepicker
const formPopup=document.querySelector(".form-popup");
const formWrapper=formPopup.querySelector(".form-wrapper")
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
 
//create datepicker
function createDatepicker(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const datesContainer = datePicker.querySelector(".dates");
  const prevBtn = datePicker.querySelector(".prev-month");
  const nextBtn = datePicker.querySelector(".next-month");
  const tags = datePicker.querySelectorAll(".tag");
  const yearToggle = datePicker.querySelector(".year-toggle");
  const yearDropdown = datePicker.querySelector(".year-dropdown");

  let today = new Date();
  let current = new Date(today);
  let selectedDate = null;

  const START_YEAR = Number(new Date().getFullYear())-200;
  const END_YEAR = Number(new Date().getFullYear())-3;

  yearDropdown.innerHTML = "";

  for (let y = START_YEAR; y <= END_YEAR; y++) {
    const div = document.createElement("div");
    div.className = "year-item";
    div.textContent = y;

    div.addEventListener("click", () => {
      current.setFullYear(y);
      selectedYear=Number(y);
      yearToggle.innerHTML = `${y} <img class="down-arrow" src="./assets/images/dashboard/down-arrow-blue.png" alt="down arrow blue">`;
      yearDropdown.classList.remove("active");
      const datePickerCalendar=datePicker.querySelector(".datepicker-calendar");
      datePickerCalendar.classList.remove("not-active");
      renderCalendar();
    });

    yearDropdown.appendChild(div);
  }

  yearToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    yearDropdown.classList.toggle("active");
    const datePickerCalendar=datePicker.querySelector(".datepicker-calendar");
    datePickerCalendar.classList.toggle("not-active");
  });

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = `${MONTHS[month]}`;
    yearToggle.innerHTML = `${year} <img class="down-arrow" src="./assets/images/dashboard/down-arrow-blue.png" alt="down arrow">`;
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

      if (d.faded) btn.classList.add("faded");

      if (
        d.date.toDateString() === today.toDateString() &&
        !btn.classList.contains("faded")
      ) {
        btn.classList.add("current-date");
      }

      if (
        d.date.toDateString() === today.toDateString() &&
        selectedDate === null &&
        !btn.classList.contains("faded")
      ) {
        btn.classList.add("current-day");
      }

      if (
        selectedDate &&
        d.date.toDateString() === selectedDate.toDateString() &&
        !btn.classList.contains("faded")
      ) {
        btn.classList.add("current-day");
      }

      btn.addEventListener("click", () => {
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
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
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
  setYearDropdownHeight(datePicker);
   
}

//updating height for year dropdown

function setYearDropdownHeight(datePicker) {
  const calendar = datePicker.querySelector(".datepicker-calendar");
  const yearDropdown = datePicker.querySelector(".year-dropdown");

  if (calendar && yearDropdown) {
    yearDropdown.style.height = `${calendar.offsetHeight}px`;
  }
}

window.addEventListener("resize", () => {
  document.querySelectorAll(".datepicker").forEach(dp => {
    setYearDropdownHeight(dp);
  });
});


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
  dateText.childNodes[0].textContent=`${selectedYear}-${selectedMonth}-${selectedDatee}`;
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
  formWrapper.scrollTo({
    top: formWrapper.scrollHeight,
    behavior: "smooth" 
  });
  datePicker._trigger = dateText;
});


document.addEventListener("click", (e) => {
  const dp=document.querySelector(".datepicker.active");
    if (!dp) return;
    const trigger = dp._trigger;

    if (!trigger.contains(e.target) && !dp.contains(e.target)) {
      dp.classList.remove("active");
      dp.querySelector(".year-dropdown").classList.remove("active");
      dp.querySelector(".datepicker-calendar").classList.remove("not-active");
    }

});
