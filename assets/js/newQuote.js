const quickOrderWrapper = document.querySelector(".quick-order-wrapper");
const quickContentWrapper = document.querySelector(".quick-content-wrapper");
const newQuoteWrapper = document.querySelector(".new-quote-wrapper");
const popupOverlay = document.querySelector(".popup-overlay");
const expandModal = popupOverlay.querySelector(".expand-modal");
const expandBtns = document.querySelectorAll(".expand-btn");
const modalContent = document.querySelector(".expand-modal-content");

const approveQuoteBtn = document.querySelector(".approve-btn");
const successPopup = document.querySelector(".success-popup");
const delPopup1 = document.querySelector(".del-popup-1");
const del1YesBtn = delPopup1.querySelector(".yes-btn");
const successidText = successPopup.querySelector(".text .id");
const confirmSuccessBtn = successPopup.querySelector(".ok-btn");
const addBtn = document.querySelector(".add-btn-container .add-btn");
const addPopup = document.querySelector(".add-popup");
const addTable = addPopup.querySelector(".add-table");
const addLineBtns = addTable.querySelectorAll(".add-line-btn");
const canceladdpopupBtn = addPopup.querySelector(".cancel-btn");
const delQuoteBtn = document.querySelector(".del-quote-btn");
const undoQuoteBtn = document.querySelector(".undo-quote-btn");
const approveBtnContainer = document.querySelector(".approve-btn-container");
const loaderWrapper = document.querySelector(".loader-wrapper");
const leftWrapper = quickOrderWrapper.querySelector(".left-wrapper");
const uploadBtnContainer = leftWrapper.querySelector(".upload-btn-container");
const leftTableWrapper = leftWrapper.querySelector(".table-wrapper");
const descInputs = leftTableWrapper.querySelectorAll(".desc-input");
const qtyInputs = leftTableWrapper.querySelectorAll(".qty-input");
const CreateBtn = document.querySelector(".back-create-btn");
const quoteStat = newQuoteWrapper.querySelector(".quote-status");
const minimizeBtn=document.querySelector(".minimize-btn");
const existFilterWrapper = document.querySelector(".exist-quote-filter-wrapper");
const updateForm = formPopup.querySelector(".update-form");

const newBtn = document.querySelector(".new-btn");


const oldQuoteText = document.querySelector(".old-quote-id");
const quickInfoWrapper = quickOrderWrapper.querySelector(".quick-info-wrapper");
const displayTable = quickOrderWrapper.querySelector(".display-table");
const disTableBodyWrapper = displayTable.querySelector(".body-wrapper");
const closeBtn = document.querySelector(".close-modal-btn");


const popups = document.querySelectorAll(".popup");

const formTitle = document.querySelector(".form-title");
const formContainers = document.querySelectorAll(".form-container");
const cancelFormPopupBtn = formPopup.querySelector(".cancel-btn");
const errs = formPopup.querySelectorAll(".error");
const closePopupBtns = document.querySelectorAll(".close-popup-btn");

let selectedQuote;

quickOrderWrapper.classList.add("active");


const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
const modes = ["Call", "Email", "ERP"];

let newQuote = {
  mode: `${modes[Math.floor(Math.random() * modes.length)]}`,
  id: 9824404,
  name: `${loginDetails ? loginDetails.username : "ram"}`,
  number:
  Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000,
  received_date: `${padZero(new Date().getDate())}-${padZero(new Date().getMonth()+1)}-${padZero(new Date().getFullYear())}`,
  approved_date:"-",
  total_line_no: 0,
  total_price: "0",
  buyer: "Ondricka-Ankunding",
  bill_to: "Ondricka-Ankunding\n822, Cottonwood, \nSalon-de-Provence B8 019738",
  ship_to: "Realmix\n514, Golden Leaf, Salon-de-Provence\nB8 034922",
  po_no: "VI55518/553",
  job_no: "YM90987/934",
  deleivery_date: `${padZero(new Date().getDate())}-${padZero(new Date().getMonth()+1)}-${padZero(new Date().getFullYear())}`,
  lines: 0,
  products: [],
};

//get selected quote
if (sessionStorage.getItem("selectedQuote")) {
  selectedQuote=JSON.parse(sessionStorage.getItem("selectedQuote"))
  oldQuoteText.innerHTML = `(Old Quote ID #${selectedQuote.old_id})`;
  oldQuoteText.classList.add("active");
  newQuote={...selectedQuote}
  console.log(newQuote)
  quickOrderWrapper.classList.add("active");
  approveBtnContainer.classList.add("active");
  updatenewQuoteId(newQuote)
  renderQuickInfo(newQuote);
  renderDisplayTable(newQuote);
  quoteStat.classList.remove("pending","deleted","approved");

  if(sessionStorage.getItem("isApproved")){
    quoteStat.classList.add("active")
    quoteStat.classList.add("approved");
      quoteStat.textContent ="Approved";
      delQuoteBtn.classList.remove("active");
      undoQuoteBtn.classList.remove("active");
      approveQuoteBtn.classList.remove("active");
      approveQuoteBtn.classList.add("not-active");
  }
  else if (sessionStorage.getItem("isDeleted")){
    quoteStat.classList.add("active")
    quoteStat.classList.add("deleted");
    quoteStat.textContent ="Deleted";
    delQuoteBtn.classList.remove("active");
    undoQuoteBtn.classList.add("active");
    quickOrderWrapper.classList.add("not-active");
    approveQuoteBtn.classList.remove("active");
    approveQuoteBtn.classList.add("not-active");
  }
  else{
    quoteStat.classList.add("active")
    quoteStat.classList.add("pending");
    quoteStat.textContent ="Pending";
    delQuoteBtn.classList.add("active");
    undoQuoteBtn.classList.remove("active");
    approveQuoteBtn.classList.add("active");
    approveQuoteBtn.classList.remove("not-active");
  }
    
  storeQuote();
  if(newQuote.products.length==0) {
    approveQuoteBtn.classList.remove("active");
    approveQuoteBtn.classList.add("not-active");
  }
}

//get new Quote
if (sessionStorage.getItem("newId")) {
  
  newQuote.id = Number(sessionStorage.getItem("newId"));
  if(!sessionStorage.getItem("newQuote")){
  
    newQuote.status= "pending";
    sessionStorage.setItem("newQuote",JSON.stringify(newQuote));
  }
  newQuote=JSON.parse(sessionStorage.getItem("newQuote"))

  quickOrderWrapper.classList.add("active");
  approveBtnContainer.classList.add("active");
  
  updatenewQuoteId(newQuote);
  
  quoteStat.classList.add("active")
  quoteStat.classList.remove("pending","deleted","approved");
  quoteStat.classList.add(newQuote.status);
  quoteStat.textContent =newQuote.status;

  if(newQuote.status=="approved"){
    delQuoteBtn.classList.remove("active");
    approveQuoteBtn.classList.add("not-active");
    approveQuoteBtn.classList.remove("active")
  }

  if(newQuote.status=="pending"){
    delQuoteBtn.classList.add("active");
  }

  if(newQuote.status=="deleted"){
    delQuoteBtn.classList.remove("active");
    undoQuoteBtn.classList.add("active");
    quickOrderWrapper.classList.add("not-active");
    approveQuoteBtn.classList.remove("active");
    approveQuoteBtn.classList.add("not-active");
  }
   
  if(newQuote.products.length==0) {
    approveQuoteBtn.classList.remove("active");
    approveQuoteBtn.classList.add("not-active");
  }
  renderQuickInfo(newQuote);
  renderDisplayTable(newQuote);
}


function updatenewQuoteId(newQuote) {
  CreateBtn.querySelector("span").textContent = `#${newQuote.id}`;
  delQuoteBtn.classList.add("active");
}

//render table
function renderDisplayTable(newQuote) {
  const bodyWrapper = displayTable.querySelector(".body-wrapper");
  bodyWrapper.innerHTML = "";

  const products = newQuote.products;

  products.forEach((p, i) => {
    bodyWrapper.innerHTML += `<div class="row-group" draggable="true">
    <div class="${p.isDeleted? "table-row not-active": newQuote.status === "approved" || newQuote.status === "deleted"? "table-row not-hover": "table-row"}">
      <p><img src="./assets/images/global/drag_menu.png" alt="drag menu" class="drag-handle"   data-index="${i}"  ></p>
      <p><input type="checkbox" class="check-line-input" onclick=enableDeleteAllBtn()></p>
      <p><span class="line-no">${i + 1}</span>
      </p>
      <p><input type="text" value="${p.qty_requested}" name="qty-requested" autocomplete="off" ${newQuote.status == "approved" ? "readonly" : ""}></p>
      <p>
        <span class="title-text">${p.title ? p.title : "Mjhsjhs"}</span>
        <span class="dropdown-text">
          <img src="./assets/images/global/down_arrow.png" alt="down-arrow" class="down-arrow-img" onclick=openSuggestPopup(event)> <span class="requested-id">${p.requested_id}</span> - 
          <span class="detail" onclick="enableSourceText(event)">tydlx4ypi6</span> - 
          <span class="${p.isSource == true ? "sourcing active" : "sourcing"}"  onclick="openSourcingPopup(event)"><img src="./assets/images/orderpad/sourcing_icon.png" alt="sourcing">Sourcing</span>
          <span class="${p.isStock == true ? "stock-wrapper active" : "stock-wrapper"}"><span class="supplier-text text-uppercase" onclick="openSupplierPopup(event)">${p.supplier ? p.supplier : "eaton"}</span>
           - <span class="${p.stock == "Ns" ? "stock-text red" : " stock-text green"}">
              ${p.stock ? p.stock : "S"}
              <span class="tooltiptext">${p.stock == "S" ? "Stock" : "Non Stock"}</span>
            </span> &nbsp;- 
           </span>
          <span class="tag-text"><img src="./assets/images/global/tag.png" alt="tag">${p.brand}</span>
          </span>
        <span class="text">${p.desc ? p.desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam doloribus hic facere, veniam in distinctio id tempora voluptatum? Facilis eius aut numquam. Alias perferendis sunt veniam reprehenderit officiis quas delectus."}</span>  
      </p>
      <p><span class="score">${p.score}</span>
      </p>
      <p> <span class="available-qty">${p.available_qty}</span></p>
      <p><span>$<input type="text" value="${p.unit_cost}" name="cost" autocomplete="off" ${newQuote.status == "approved" ? "readonly" : ""}></span></p>
      <p><span><input type="text" value="${p.margin}" name="margin" autocomplete="off" ${newQuote.status == "approved" ? "readonly" : ""}>%</span></p>
      <p><span class="selling-price">$${p.selling_price}</span></p>
      <p><span class="total-cost">$${p.total_cost.toFixed(2)}</span></p>
      <p>
        <button type="button" class="delete-line-btn active" onclick=delRow(event)><img src="./assets/images/global/delete_icon.png" alt="delete"></button>
        <button type="button" class="undo-line-btn" onclick=undoRow(event)> <img src="./assets/images/dashboard/undo_icon.png" alt="undo"></button>
      </p>
      <p class="bottom-line"><img src="./assets/images/create_quote/line_add_icon.png" alt="add icon" ><span class="line"></span></p>
      <button class="add-line-note-btn" onclick="openLineNotePopup(event)"><img src="./assets/images/create_quote/add_note_grey_bg.png" class="${p.lineNote ? "img-grey " : "img-grey active"}" alt="add note grey"> <img src="./assets/images/create_quote/add_note icon_blue.png" class="${p.lineNote ? "img-blue active" : "img-blue"}" alt="add note blue "></button>
      <p class="del-id">${p.delId}</p>
      </div>
      <div class="${p.isSourcing == true ? "sourcing-dropdown active" : "sourcing-dropdown"}">
      <div class="desc-wrapper">
        <div class="img-wrapper">
          <div><img src="./assets/images/orderpad/${p.sourceImg}.png" class="thumbnail-img" alt="default"></div>
        </div>

        <div class="desc-container">
          <h3>Description</h3>
          <p>${p.desc ? p.desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."}</p>
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
    </div>
    `;
  });
  const rows=displayTable.querySelectorAll(".body-wrapper .table-row");
  if(newQuote.status != "approved"){
    bodyWrapper.innerHTML += ` <div class="${newQuote.products.length > 0 ? "add-btn-container left" : "add-btn-container"}">
      <button type="button" class="add-btn" onclick="openAddPopup()"> <img src="./assets/images/create_quote/add_item_icon.png" alt="add"></button>
      <p class="text">Click here to Add Item</p>
    </div>`;
    clickTable(displayTable.querySelector(".body-wrapper"));
    editTableData(displayTable.querySelector(".body-wrapper"));
    checkDeleted(displayTable.querySelector(".body-wrapper"));
    enableDrag(displayTable.querySelector(".body-wrapper"));
  }
  const tableRows = displayTable.querySelectorAll(".body-wrapper .table-row");
  tableRows.forEach((row) => {
    if (row.classList.contains("not-active")) {
      row.removeEventListener("click", rowClickHandler);
    }
  });
  const delAllBtn=displayTable.querySelector(".delete-all-btn");
  const undoAllBtn=displayTable.querySelector(".undo-all-btn");
  if(newQuote.isAllDeleted){
    delAllBtn.classList.remove("selected","active");
    undoAllBtn.classList.add("selected","active");
  }

  else{
    undoAllBtn.classList.remove("selected","active");
  }
}


//delete all table data
function deleteAllRow() {
  const bodyWrapper = displayTable.querySelector(".body-wrapper");
  const checkAllInput = displayTable.querySelector(".check-all-input");
  const tableRows = bodyWrapper.querySelectorAll(".table-row");

  popupOverlay.classList.add("active");
  delPopup1.classList.add("active");
  delPopup1.querySelector(".text").textContent ="Do you want to Delete Selected lines?";

  del1YesBtn.onclick = () => {

    // bodyWrapper.innerHTML = "";
    // bodyWrapper.innerHTML = `<div class="add-btn-container">
    // <button type="button" onclick="openAddPopup()"><img src="./assets/images/create_quote/add_item_icon.png" alt="add"></button>
    // <p class="text">Click here to Add Item</p>
    // </div>`;
    // newQuote.products = [];
    tableRows.forEach(row => {
      const chkInput=row.querySelector(".check-line-input");
      if(chkInput.checked){
        const delBtn = row.querySelector(".delete-line-btn");
        const undoBtn = row.querySelector(".undo-line-btn");
        const delId = row.querySelector(".del-id").textContent;
        row.classList.add("not-active");
        delBtn.classList.remove("active");
        undoBtn.classList.add("active");
        const paras = row.querySelectorAll("p");
        paras.forEach((p) => {
          p.style.pointerEvents = "none";
        });
        delBtn.style.pointerEvents = "auto";
        undoBtn.style.pointerEvents = "auto";
        row.removeEventListener("click", rowClickHandler);
        const product = newQuote.products.find((p) => String(p.delId) === delId);

        if (product) {
          product.isDeleted = true;
        }
      }
    })
    // newQuote.status="deleted";
    newQuote.isAllDeleted=true;
    delAllBtn.classList.remove("selected", "active");
    undoAllBtn.classList.add("selected", "active");
    // approveQuoteBtn.classList.remove("active");
    // approveQuoteBtn.classList.add("not-active");
    // quoteStat.classList.remove("pending");
    // quoteStat.classList.add("deleted");
    // quoteStat.textContent ="Deleted";
    // delQuoteBtn.classList.remove("active");
    // undoQuoteBtn.classList.add("active");
    // approveQuoteBtn.classList.add("not-active")
    // quickOrderWrapper.classList.add("not-active");
    // checkAllInput.checked = false;
    updateQuickInfoData();
    updateQuoteTotals();
    // updateNewQuoteData();
    storeQuote();
    closeModal();
  };
  // newQuote.isAllDeleted=true;
}

//store quote
function storeQuote() {
  let found = false;
  const allQuotes = JSON.parse(sessionStorage.getItem("quotes"));
  allQuotes.forEach((q, i) => {
    if (q.id === newQuote.id) {
      allQuotes[i] = newQuote;
      found = true;
      if(sessionStorage.getItem('selectedQuote')){
        const selQuote=JSON.parse(sessionStorage.getItem('selectedQuote'))
        if(selQuote.id === newQuote.id){
          sessionStorage.setItem('selectedQuote',JSON.stringify(newQuote))
        }
        if(sessionStorage.getItem('oldId')){
          if(selQuote.old_id === sessionStorage.getItem('oldId')){
            sessionStorage.setItem('selectedQuote',JSON.stringify(newQuote))
          }
          if (newQuote.status=="deleted") {
              sessionStorage.setItem('isDeleted',true)
          }
        }
      }
    }
  });
  if (!found) {
    allQuotes.push(newQuote);
  }
  sessionStorage.setItem("quotes", JSON.stringify(allQuotes));
  if(sessionStorage.getItem("newQuote")){
    sessionStorage.setItem("newQuote",JSON.stringify(newQuote))
  }
}

//back btn function 
CreateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    updateQuickInfoData();
    updateNewQuoteData();
    updateQuoteTotals();
    newQuote.status = "pending";
    storeQuote();
    window.location.href = "./dashboard.html";
});

