const quoteWrapper = document.querySelector(".quote-wrapper");
const quickOrderWrapper = document.querySelector(".quick-order-wrapper");
const popupOverlay = document.querySelector(".popup-overlay");
const delPopup1 = document.querySelector(".del-popup-1");
const del1YesBtn = delPopup1.querySelector(".yes-btn");
const expandModal = popupOverlay.querySelector(".expand-modal");
const expandBtns = document.querySelectorAll(".expand-btn");
const addPopup = document.querySelector(".add-popup");
const addTable = addPopup.querySelector(".add-table");
const quickContentWrapper = document.querySelector(".quick-content-wrapper");
const displayTable = quickContentWrapper.querySelector(".display-table");
const addLineBtns = addTable.querySelectorAll(".add-line-btn");
const canceladdpopupBtn = addPopup.querySelector(".cancel-btn");
const approveQuoteBtn = document.querySelector(".approve-btn");
const successPopup = document.querySelector(".success-popup");
const successidText = successPopup.querySelector(".text .id");
const confirmSuccessBtn = successPopup.querySelector(".ok-btn");
const leftWrapper = quickContentWrapper.querySelector(".left-wrapper");
const leftTableWrapper = leftWrapper.querySelector(".table-wrapper");
const descInputs = leftTableWrapper.querySelectorAll(".desc-input");
const qtyInputs = leftTableWrapper.querySelectorAll(".qty-input");
const uploadBtnContainer = leftWrapper.querySelector(".upload-btn-container");
const loaderWrapper = document.querySelector(".loader-wrapper");

const backBtnContainer = document.querySelector(".back-btn-container");
const CreateBtn = backBtnContainer.querySelector(".back-create-btn");
const quoteStat = backBtnContainer.querySelector(".quote-status");
const quickInfoWrapper = document.querySelector(".quick-info-wrapper");
const formTitle = document.querySelector(".form-title");
const formContainers = document.querySelectorAll(".form-container");

const cancelFormPopupBtn = formPopup.querySelector(".cancel-btn");
const delQuoteBtn = document.querySelector(".del-quote-btn");
const undoQuoteBtn = document.querySelector(".undo-quote-btn");
const approveBtnContainer = document.querySelector(".approve-btn-container");

const modalBox = document.querySelector(".expand-modal");
const modalContent = document.querySelector(".expand-modal-content");
const closePopupBtns = document.querySelectorAll(".close-popup-btn");
const popups = document.querySelectorAll(".popup");

const disTableBodyWrapper = displayTable.querySelector(".body-wrapper");

const closeBtn = document.querySelector(".close-modal-btn");
const errs = formPopup.querySelectorAll(".error");
const updateForm = formPopup.querySelector(".update-form");
const formWrapper = formPopup.querySelector(".form-wrapper");

// const displayTable=document.querySelector(".display-table");
let newQuote = "";
// let allQuotes=[];
const quickOrderBtn= quickOrderWrapper.querySelector(".quick-order-btn");
const tabUploadBtn= quickOrderWrapper.querySelector(".upload-btn");
if (sessionStorage.getItem("selectedQuote")) {
  newQuote = JSON.parse(sessionStorage.getItem("selectedQuote"));
  allQuotes = JSON.parse(sessionStorage.getItem("quotes"));
  CreateBtn.querySelector("span").textContent = `#${newQuote.id}`;
  quoteStat.classList.add(`${newQuote.status}`);
  quoteStat.textContent = `${newQuote.status}`;
  if (newQuote.status == "deleted") {
    delQuoteBtn.classList.remove("active")
    undoQuoteBtn.classList.add("active");
    quickOrderWrapper.classList.add("not-active");
  }
  
  if (newQuote.status == "approved" || newQuote.status == "deleted") {
    approveQuoteBtn.classList.add("not-active");
  }
  if(newQuote.status == "pending"){
    quickOrderBtn.classList.remove("not-active");
    tabUploadBtn.classList.remove("not-active");
  }
  if (newQuote.status == "approved") {
    delQuoteBtn.classList.remove("active");
    undoQuoteBtn.classList.remove("active");
    approveQuoteBtn.classList.add("not-active");
    quickOrderBtn.classList.add("not-active");
    tabUploadBtn.classList.add("not-active");
  }
  if (newQuote.products.length==0){
    approveQuoteBtn.classList.remove("active");
    approveQuoteBtn.classList.add("not-active");
  }
  renderQuickInfo(newQuote);
  renderDisplayTable(newQuote);
 
}

function renderDisplayTable(newQuote) {
  const bodyWrapper = displayTable.querySelector(".body-wrapper");
  bodyWrapper.innerHTML = "";
  const products = newQuote.products;
  
 
    products.forEach((p, i) => {
      bodyWrapper.innerHTML += `<div class="row-group" draggable="true">
      <div class="${p.isDeleted? "table-row not-active":newQuote.status === "approved" || newQuote.status === "deleted"? "table-row not-hover": "table-row"}">
        <p>${newQuote.status != "approved" ? '<img src="./assets/images/global/drag_menu.png" alt="drag menu" class="drag-handle"   data-index="${i}"  >' : ''}</p>
        <p><input type="checkbox" class="check-line-input" onclick="enableDeleteAllBtn()"></p>
        <p><span class="line-no">${i + 1}</span>
        </p>
        <p><input type="text" value="${p.qty_requested}" name="qty-requested" autocomplete="off" ${newQuote.status == "approved" ? "readonly" : ""}></p>
        <p>
          <span class="title-text">${p.title ? p.title : "Mjhsjhs"}</span>
          <span class="dropdown-text">
            <img src="./assets/images/global/down_arrow.png" alt="down-arrow" class="down-arrow-img" onclick=openSuggestPopup(event)> <span class="id requested-id">${p.requested_id}</span> - 
            <span class="detail" onclick="enableSourceText(event)">tydlx4ypi6</span> - 
            <span class="${p.isSource == true ? "sourcing active" : "sourcing"}" onclick="openSourcingPopup(event)"><img src="./assets/images/orderpad/sourcing_icon.png" alt="sourcing">Sourcing</span>
            <span class="${p.isStock == true ? "stock-wrapper active" : "stock-wrapper"}">
            <span class="supplier-text text-uppercase" onclick="openSupplierPopup(event)">${p.supplier ? p.supplier : "eaton"}</span> - <span class="${p.stock === "Ns" ? "stock-text  red" : "stock-text green"}">${p.stock}<span class="tooltiptext">${p.stock == "S" ? "Stock" : "Non Stock"}</span> </span>&nbsp; - </span>
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
        <button class="add-line-note-btn" onclick="openLineNotePopup(event)"><img src="./assets/images/create_quote/add_note_grey_bg.png"  class="${p.lineNote ? "img-grey " : "img-grey active"}" alt="add note grey"> <img src="./assets/images/create_quote/add_note icon_blue.png" class="${p.lineNote ? "img-blue active" : "img-blue"}" alt="add note blue "></button>
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
   
    editTableData(displayTable.querySelector(".body-wrapper"));
    checkDeleted(displayTable.querySelector(".body-wrapper"));
    enableDrag(displayTable.querySelector(".body-wrapper"));
  }
  clickTable(displayTable.querySelector(".body-wrapper"));
  const tableRows=displayTable.querySelectorAll(".body-wrapper .table-row");
    tableRows.forEach((row) => {
    if (row.classList.contains("not-active")) {
      row.removeEventListener("click", rowClickHandler);
    }
  });
  const delAllBtn=displayTable.querySelector(".delete-all-btn");
  const undoAllBtn=displayTable.querySelector(".undo-all-btn");
  if(newQuote.isAllDeleted==true){
    delAllBtn.classList.remove("selected","active");
    undoAllBtn.classList.add("selected","active");
  }
  else{
    undoAllBtn.classList.remove("selected","active");
    // delAllBtn.classList.remove("selected","active");
  }
  //  console.log(delAllBtn)
  //  console.log(undoAllBtn)
}



function deleteAllRow() {
  const bodyWrapper = displayTable.querySelector(".body-wrapper");
  const checkAllInput = displayTable.querySelector(".check-all-input");
  const tableRows = bodyWrapper.querySelectorAll(".table-row");

  popupOverlay.classList.add("active");

  delPopup1.classList.add("active");

  delPopup1.querySelector(".text").textContent =
    "Do you want to Delete Selected lines?";

  del1YesBtn.onclick = () => {

    // bodyWrapper.innerHTML = "";
    // if(quoteStat.textContent!="approved"){
    //   bodyWrapper.innerHTML = `<div class="add-btn-container">
    //   <button type="button" onclick="openAddPopup()"><img src="./assets/images/create_quote/add_item_icon.png" alt="add"></button>
    //   <p class="text">Click here to Add Item</p>
    //   </div>`;
    // }
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
    newQuote.isAllDeleted=true;
    delAllBtn.classList.remove("selected", "active");
    undoAllBtn.classList.add("selected", "active");

    // approveQuoteBtn.classList.remove("active");
    // approveQuoteBtn.classList.add("not-active");
    // approveQuoteBtn.classList.add("not-active")
    // checkAllInput.checked = false;
    updateQuickInfoData();
    updateQuoteTotals();
    // updateNewQuoteData();
    storeQuote();
    closeModal();
  };
}

CreateBtn.addEventListener("click", (e) => {
  e.preventDefault();
    updateQuickInfoData();
    updateNewQuoteData();
    updateQuoteTotals();
    storeQuote();
    window.location.href = "./dashboard.html";
});

function delStoredData(){
   if (sessionStorage.getItem("newId")) {
    sessionStorage.removeItem("newId");
  }

  if (sessionStorage.getItem("newQuote")) {
    sessionStorage.removeItem("newQuote");
  }
  if (sessionStorage.getItem("oldId")) {
    sessionStorage.removeItem("oldId");
  }

  if (sessionStorage.getItem("isApproved")) {
    sessionStorage.removeItem("isApproved");
  }

  if (sessionStorage.getItem("isDeleted")) {
    sessionStorage.removeItem("isDeleted");
  }
}

delStoredData();