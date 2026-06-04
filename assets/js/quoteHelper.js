
//datepicker
const formPopup = document.querySelector(".form-popup");
const datepicker = formPopup.querySelector(".datepicker");
const dateText = formPopup.querySelector(".date-text");
const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 100);
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() +1);

function padZero(num) {
  if (num > 9) {
    return num;
  } else {
    return "0" + num;
  }
}
let flag = 0;
let selectedMonth;
let selectedDatee;
let selectedYear = new Date().getFullYear();

const MONTHS = [
  "January","February","March","April","May","June","July",
  "August","September","October","November","December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  const yearEl = datePicker.querySelector(".year");


  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = `${MONTHS[month]}`;
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
        selectedYear = d.date.getFullYear(); 
        allButtons.forEach((b) => b.classList.remove("current-day"));
        btn.classList.add("current-day");

        getSelectedDate(datePicker);
        validDateInput(datePicker);

        datePicker.classList.remove("active");
        const updateBtn = formPopup.querySelector(".update-btn");
        updateBtn.classList.remove("not-active");
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

createDatepicker(datepicker);

const days = datepicker.querySelector(".days");
for (let i = 0; i < DAYS.length; i++) {
  const dayEl = document.createElement("span");
  dayEl.className = "day";
  dayEl.textContent = DAYS[i];
  days.appendChild(dayEl);
}

function getSelectedDate(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const yearEl = datePicker.querySelector(".year");

  selectedYear = Number(yearEl.textContent);
  console.log(yearEl)
  selectedMonth =
    Number(MONTHS.findIndex((m) => m === monthNameEl.textContent)) + 1;

  selectedMonth = padZero(selectedMonth);

  const dates = datePicker.querySelectorAll(".dates .date");

  dates.forEach((d) => {
    if (d.classList.contains("current-day")) {
      selectedDatee = padZero(Number(d.textContent));
    }
  });

  const parentEl = datePicker.parentElement;
  const dateInp = parentEl.querySelector(".date-input");

  dateInp.value = `${selectedYear}-${selectedMonth}-${selectedDatee}`;

  const dateText = parentEl.querySelector(".date-text");
  dateText.textContent = `${selectedDatee}-${selectedMonth}-${selectedYear}`;

  datePicker.classList.remove("active");
}

//validate dateinput
function validDateInput(datePicker) {
  const parentEl = datePicker.parentElement;
  const dateInp = parentEl.querySelector(".date-input");
  const formContainer = dateInp.parentElement.parentElement;
  const errorElement = formContainer.querySelector(".error");
  if (dateInp.value == "") {
    formContainer.classList.add("error");
    errorElement.textContent = "";
  } else {
    formContainer.classList.remove("error");
    errorElement.textContent = "";
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
  const dp = document.querySelector(".datepicker.active");
  if (!dp) return;
  const trigger = dp._trigger;

  if (!trigger.contains(e.target) && !dp.contains(e.target)) {
    dp.classList.remove("active");
    dp.querySelector(".datepicker-calendar").classList.remove("not-active");
  }
});


function renderQuickInfo(newQuote) {
  const splittedBill = newQuote.bill_to.split("\n");
  const splittedShip = newQuote.ship_to.split("\n");
  quickInfoWrapper.innerHTML = "";
  quickInfoWrapper.innerHTML = `
    <div class="info">
      <p class="header">Bill To <button type="button" class="edit-btn" data-title="bill to" data-edit="bill_to"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
      <div class="details bill_to_text">
        <p class="name">${splittedBill[0]}</p>
        <p class="address">${splittedBill[1]} <br> ${splittedBill[2]}</p>
      </div>
    </div>
    <div class="info">
      <p class="header">Ship To <button type="button" class="edit-btn" data-title="ship to" data-edit="ship_to"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
      <div class="details ship_to_text">
        <p class="name">${splittedShip[0]}</p>
        <p class="address">${splittedShip[1]} <br> ${splittedShip[2]}</p>
      </div>
    </div>                    
    <div class="info">
      <p class="header">PO No <button type="button" class="edit-btn" data-title="po no" data-edit="po_no"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="po_no_text text">${newQuote.po_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Job No <button type="button" class="edit-btn" data-title="job no" data-edit="job_no"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="job_no_text text">${newQuote.job_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Buyer <button type="button" class="edit-btn" data-title="buyer" data-edit="buyer"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="buyer_text text">${newQuote.buyer}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Deleivery Date <button type="button" class="edit-btn" data-title="deleivery date" data-edit="deleivery_date"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
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
  `;
 if(newQuote.status!="deleted") {
    editQuoteInfo(document.querySelector(".quick-info-wrapper"));
  }
}

//edit quote info
function editQuoteInfo(quoteInfoWrap) {

  const editBtns = quoteInfoWrap.querySelectorAll(".edit-btn");

  
  editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      updateBtn.classList.add("not-active");
      popupOverlay.classList.add("active");
      formPopup.classList.add("active");
      const editItem = btn.dataset.edit;
      formTitle.textContent = btn.dataset.title;
      formContainers.forEach((container) =>
        container.classList.remove("active"),
      );
      formContainers.forEach((container) => {
        if (container.classList.contains(editItem)) {
          container.classList.add("active");
        }
      });
      updateFormData(quoteInfoWrap, editItem);
    });
  });
}

function updateFormData(quoteInfoWrap, editItem) {
  const wrapper = document.querySelector(`.${editItem}_text`);
  formContainers.forEach((container) => {
    if (container.classList.contains(editItem)) {
      if (editItem === "bill_to" || editItem == "ship_to") {
        const inp = container.querySelector("input[name='name']");
        const textarea = container.querySelector("textarea[name='address']");
        if (inp) {
          inp.value = wrapper.querySelector(".name").textContent;
        }
        if (textarea) {
          const addrText = wrapper.querySelector(".address").innerHTML;
          textarea.value = addrText.replace("<br>", "\n");
        }
      } else if (editItem == "deleivery_date") {
        const dateText = container.querySelector(".date-text");
        const datePicker = container.querySelector(".datepicker");
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 100);
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() +1);
        const [day, month, year] = wrapper.textContent.split("-");
        const newSelectedDate = new Date(day, month - 1, year);

        dateText.textContent = wrapper.textContent.replaceAll("-", "/");

        if (newSelectedDate >= minDate && newSelectedDate <= maxDate) {
          selectedDate = newSelectedDate;
          current = new Date(
            newSelectedDate.getFullYear(),
            newSelectedDate.getMonth(),
            1,
          );
          createDatepicker(datePicker);
          const inp = container.querySelector("input");
          inp.value = `${year}-${month}-${day}`;
        }
      } else {
        const inp = container.querySelector("input");
        inp.value = wrapper.textContent;
      }
    }
  });
}




//click function
function clickTable(bodyWrap) {
  const rows = bodyWrap.querySelectorAll(".table-row");

  rows.forEach((row) => {
    row.addEventListener("click", rowClickHandler);
  });
}

function rowClickHandler(e) {
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

  const sourceDropDown = row.nextElementSibling;

  sourceDropDown.classList.toggle("active");
  const delId = row.querySelector(".del-id").textContent;
  const product = newQuote.products.find((p) => String(p.delId) === delId);
  if (product) {
    if (sourceDropDown.classList.contains("active")) {
      product.isSourcing = true;
    } else {
      product.isSourcing = false;
    }
  }
}

//edit table data
function editTableData(bodyWrap) {
  const tableRows = bodyWrap.querySelectorAll(".table-row");

  tableRows.forEach((row) => {
    const qtyInp = row.querySelector('input[name="qty-requested"]');

    const availQty=row.querySelector('.available-qty').textContent;

    const costInp = row.querySelector('input[name="cost"]');

    const marginInp = row.querySelector('input[name="margin"]');

    const sellingPriceEl = row.querySelector(".selling-price");

    const totalPriceEl = row.querySelector(".total-cost");

    const delId = row.querySelector(".del-id").textContent;

    function updatePrices() {
      let qty = parseFloat(qtyInp.value) || 0;

      if (qty > Number(availQty)) {
        qty = Number(availQty);
        qtyInp.value = availQty;
      }

      const cost = parseFloat(costInp.value) || 0;

      const margin = parseFloat(marginInp.value) || 0;

      const sellingPrice = cost + (cost * margin) / 100;

      const totalPrice = qty * sellingPrice;

      sellingPriceEl.textContent = `$${sellingPrice.toFixed(2)}`;

      totalPriceEl.textContent = `$${totalPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;

      const product = newQuote.products.find((p) => String(p.delId) === delId);
      if (product) {
        product.qty_requested = qty;

        product.unit_cost = cost;

        product.margin = margin;

        product.selling_price = Number(sellingPrice.toFixed(2));

        product.total_cost = Number(totalPrice.toFixed(2));
      }
      if(newQuote.status=="pending"){
        updateQuoteTotals();
        storeQuote();
      }
    }

    [qtyInp, costInp, marginInp].forEach((inp) => {
      allowNumbers(inp);

      inp.addEventListener("input", updatePrices);
    });
  });
}

function allowNumbers(inp) {
  inp.addEventListener("input", () => {
    inp.value = inp.value.replace(/\D/g, "");
  });
}

function enableDrag(bodyWrap) {
  const groups = bodyWrap.querySelectorAll(".row-group");

  let draggedGroup = null;

  let canDrag = false;

  groups.forEach((group, index) => {
    // store original index
    group.dataset.index = index;

    const row = group.querySelector(".table-row");

    const handle = row.querySelector(".drag-handle");

    group.draggable = true;

    // enable drag
    handle.addEventListener("mousedown", () => {
      canDrag = true;
    });

    // disable drag
    document.addEventListener("mouseup", () => {
      canDrag = false;
    });

    group.addEventListener("dragstart", (e) => {
      if (!canDrag) {
        e.preventDefault();

        return;
      }

      draggedGroup = group;

      requestAnimationFrame(() => {
        group.classList.add("dragging");
      });
    });

    group.addEventListener("dragend", () => {
      group.classList.remove("dragging");

      draggedGroup = null;

      if(newQuote.status=="pending"){
        updateLineNumbers(bodyWrap);
        updateProductsOrder(bodyWrap);
      }
    });

    group.addEventListener("dragover", (e) => {
      e.preventDefault();

      if (!draggedGroup || draggedGroup === group) return;

      const rect = group.getBoundingClientRect();

      const offset = e.clientY - rect.top;

      if (offset < rect.height / 2) {
        bodyWrap.insertBefore(draggedGroup, group);
      }

      else {
        bodyWrap.insertBefore(draggedGroup, group.nextSibling);
      }
    });
  });
}

function updateLineNumbers() {
  const tableRows = displayTable.querySelectorAll(".body-wrapper .table-row");

  tableRows.forEach((row, index) => {
    row.querySelector(".line-no").textContent = index + 1;
  });
}

function updateProductsOrder(bodyWrap) {
  const groups = bodyWrap.querySelectorAll(".row-group");

  const reorderedProducts = [];

  groups.forEach((group) => {
    const originalIndex = Number(group.dataset.index);

    reorderedProducts.push(newQuote.products[originalIndex]);
  });

  newQuote.products = reorderedProducts;

  groups.forEach((group, index) => {
    group.dataset.index = index;
  });

  storeQuote();
}

//check if it is deleted line
function checkDeleted(bodyWrap) {
  const rows = bodyWrap.querySelectorAll(".table-row");
  rows.forEach((row) => {
    if (row.classList.contains("not-active")) {
      const delBtn = row.querySelector(".delete-line-btn");
      const undoBtn = row.querySelector(".undo-line-btn");
      delBtn.classList.remove("active");
      undoBtn.classList.add("active");
      const paras = row.querySelectorAll("p");
      paras.forEach((p) => {
        p.style.pointerEvents = "none";
      });
      delBtn.style.pointerEvents = "auto";
      undoBtn.style.pointerEvents = "auto";
      row.removeEventListener("click", rowClickHandler);
    }
  });
}
