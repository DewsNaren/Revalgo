const suggestPopup=document.querySelector(".suggest-product-popup");
const supplierPopup=document.querySelector(".supplier-popup");
const sourcingPopup=document.querySelector(".sourcing-popup");
const closeSupplierBtn=document.querySelector(".close-supplier-popup-btn");
const closeSourcingBtn=document.querySelector(".close-source-popup-btn");
const stockPopup=document.querySelector(".stock-popup");
const stockText=stockPopup.querySelector(".text");
const stockYesBtn=stockPopup.querySelector(".yes-btn");
const stockNoBtn=stockPopup.querySelector(".no-btn");
const addLineNotePopup=document.querySelector(".add-line-note-popup");
const addLineNoteBtn=addLineNotePopup.querySelector(".add-btn");
const addLineNoteInput=addLineNotePopup.querySelector(".add-line-note-input")
const addQuoteNotePopup=document.querySelector(".add-quote-note-popup");
const addQuoteNoteInput=addQuoteNotePopup.querySelector(".add-quote-note-input");
const addQuoteNoteBtn=addQuoteNotePopup.querySelector(".add-btn");

function renderSuggestPopup(products){
  const productsContainer = suggestPopup.querySelector(".products")
  productsContainer.innerHTML="";
  
  if(products.length!=0){
    
    products.forEach(p=>{
      productsContainer.innerHTML+=`
      <div class="product" data-id="${p.id}">
        <div class="detail-container">                                                 
          <p class="product-id"> <span class="label id">${p.requested_id}</span> <span class="value"> - $${p.selling_price}</span></p>
          <p class="avil-qty"> <span class="label">Avaliable Qty</span> <span class="value"> ${p.available_qty}</span></p>
          <p class="score"> <span class="label">Score</span> <span class="value"> ${p.score}%</span></p>
        </div>
        <p class="desc">${p.desc}</p>
        </div>
      `;
    })
  }
  else{
     productsContainer.innerHTML="<p class='not-found'>Data Not Found</p>";
  }
  SuggestProductClick(productsContainer.querySelectorAll(".product"));
  searchSuggestPopup()
}

if (typeof getAllProducts === "function") {
  getAllProducts();
}

if (typeof initProducts === "function") {
  initProducts();
}

function searchSuggestPopup(){

  const searchSuggestInput = suggestPopup.querySelector(".search-suggest-product");

  searchSuggestInput.addEventListener("input", () => {

    const searchValue = searchSuggestInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(p => {

      return (
        p.requested_id.toLowerCase().includes(searchValue) ||
        p.desc.toLowerCase().includes(searchValue)
      );

    });

    renderSuggestPopup(filteredProducts);

  });
  
}



function closeModal(){
 
  if(formPopup.classList.contains("active")){
    // updateForm.reset();
    errs.forEach(err=>err.classList.remove("active"));
    formPopup.classList.remove("active");
  }

  if(addPopup.classList.contains("active")){
    const rows=addPopup.querySelectorAll(".body-wrapper .table-row");
    rows.forEach((row, index) => {

      if(index !== 0){
        row.remove();
      }
    })
  }
  if(expandModal.classList.contains("active")){
    const suggestSource=modalContent.querySelector(".suggest-product-popup");
    const body=document.body
    if(suggestSource){
      body.appendChild(suggestSource)
    }
  }
   popupOverlay.classList.remove("active");
  popups.forEach(pop=>pop.classList.remove("active"));

}

expandBtns.forEach(btn => {
  btn.addEventListener("click", () => {
     const type = btn.dataset.type;
      const target = btn.dataset.target;
      const modalData=btn.dataset.modal
      const source = document.querySelector(target);
      if(target==".suggest-product-popup"){
        suggestPopup.classList.remove("active")
        popupOverlay.classList.add("active")
        modalContent.appendChild(source);
        expandModal.classList.add("active")
      }
  })
})


function renderSupplierPopup(products){
  const productsContainer = supplierPopup.querySelector(".products");
  productsContainer.innerHTML=''
   if(products.length!=0){
    products.forEach(p=>{
      productsContainer.innerHTML+=`<div class="product" data-id="${p.id}">                       
        <p class="supplier text-uppercase">${p.supplier}</p>
        <div class="detail-container">
          <p class="qty"> <span class="label">${p.requested_id}</span> <span class="value">${p.available_qty}</span></p>
          <p class="unit-cost"> <span class="label">Unit Cost</span> <span class="value"> ${p.unit_cost}</span></p>
          <p class="location"> <span class="label">Location</span> <span class="value">${p.location}</span></p>
          <p class="lead-time"> <span class="label">Lead Time</span> <span class="value">${p.lead_time} days</span></p>
          <p class="updated-date"> <span class="label">Last Updated Date </span> <span class="value">${p.updated_date}</span></p>
          </div>                          
      </div>`
  
    })
  }
  else
    productsContainer.innerHTML="<p class='not-found'>Data Not Found</p>";

  SupplierProductClick(productsContainer.querySelectorAll(".product"));
}

function renderSourcingPopup(products){
  const productsContainer = sourcingPopup.querySelector(".products");
  productsContainer.innerHTML=''
  if(products.length!=0){
    products.forEach(p=>{
        productsContainer.innerHTML+=`
        <div class="product" data-id=${p.id}>
            <div class="detail-container">  
            <p class="product-id"> <span class="label id">${p.requested_id}</span> <span class="${p.stock==="NS"?"value stock-value red":"value stock-value green"}">${p.stock}</span></p>                                                              
            <p class="score"> <span class="label">Score</span> <span class="value"> ${p.score}%</span></p>
            </div>
            <p class="desc">${p.desc}</p>
        </div>
        `
    })
    }
    else{
        productsContainer.innerHTML+="<p class='not-found'>Data Not Found</p>";
    }
  SourceProductClick(productsContainer.querySelectorAll(".product"));
  searchSourcingPopup();
}

function searchSourcingPopup(){
    
  const searchSourcingInput = sourcingPopup.querySelector(".search-sourcing-product");

  searchSourcingInput.addEventListener("input", () => {

    const searchValue = searchSourcingInput.value.toLowerCase().trim();
    console.log(searchSourcingInput.value)
    const filteredProducts = products.filter(p => {

      return (
        p.requested_id.toLowerCase().includes(searchValue) ||
        p.desc.toLowerCase().includes(searchValue)
      );

    });

    renderSourcingPopup(filteredProducts);

  });

}

//open suggest popup
let imgRect="";
let currentRow="";
function openSuggestPopup(event){
  event.stopPropagation();
  const img=event.target.closest(".down-arrow-img")
  const rect=img.getBoundingClientRect();
  updatePopupPosition(rect,suggestPopup)
  imgRect=rect;
  currentRow = img.closest(".table-row");
  sourcingPopup.classList.remove("active");
  supplierPopup.classList.remove("active");
  suggestPopup.classList.toggle("active");
}

// function updatePopupPosition(rect,container){
//   container.style.top =`${rect.bottom + window.scrollY + 4}px`;

//   container.style.left =`${rect.left-50 + window.scrollX}px`;

//   const spaceBelow =window.innerHeight - rect.bottom;
//   container.style.maxHeight =`${spaceBelow - 20}px`;
// }
function updatePopupPosition(rect, container){

  const popupHeight = container.offsetHeight || 200;

  const spaceBelow = window.innerHeight - rect.bottom;

  const spaceAbove = rect.top;

  // show below
  if(spaceBelow > popupHeight){

    container.style.top = `${rect.bottom + window.scrollY + 4}px`;
    container.style.maxHeight =`${spaceBelow - 20}px`;
  }

  // show above
  else if(spaceAbove > popupHeight){

    container.style.top =
      `${rect.top-23 + window.scrollY - popupHeight - 4}px`;

  }

  // fallback
  else{

    container.style.top = `${rect.bottom + window.scrollY + 4}px`;

    container.style.maxHeight = `${spaceBelow - 20}px`;

  }

  container.style.left =
    `${rect.left - 50 + window.scrollX}px`;

}

window.addEventListener('resize',updatePopupPosition(imgRect,suggestPopup))

//open supplier popup
function openSupplierPopup(event){
  event.stopPropagation();
  const supplierText=event.target.closest(".supplier-text")
  const rect=supplierText.getBoundingClientRect();
  updatePopupPosition(rect,supplierPopup)
  currentRow = supplierText.closest(".table-row");
  suggestPopup.classList.remove("active");
  sourcingPopup.classList.remove("active");
  supplierPopup.classList.toggle("active");
}


//suggest popup expand btn 

// const closeBtn = document.querySelector(".close-modal-btn");


function closeSuggestPopup(){
  suggestPopup.classList.remove("active");
}

document.addEventListener("click", (e) => {
  if (suggestPopup.classList.contains("active") &&
  !suggestPopup.contains(e.target)) {

    suggestPopup.classList.remove("active");
  }

  if (supplierPopup.classList.contains("active") &&
  !supplierPopup.contains(e.target)) {
    supplierPopup.classList.remove("active");
  }

  if (sourcingPopup.classList.contains("active") &&
  !sourcingPopup.contains(e.target)) {
    sourcingPopup.classList.remove("active");
  }

});

function closeExpandPopup(){
  const suggestSource=modalContent.querySelector(".suggest-product-popup");
  const body=document.body
  if(suggestSource){
    body.appendChild(suggestSource)
  }
  closeModal()
}
const minSuggestBtn=modalContent.querySelector(".min-suggest-btn");
function retrieveSuggestPopup(){
  const suggestSource=modalContent.querySelector(".suggest-product-popup");
  const body=document.body
  if(suggestSource){
    body.appendChild(suggestSource)
  }
  closeModal()
  const suggestPopup=document.querySelector(".suggest-product-popup");
  updatePopupPosition(imgRect,suggestPopup)
  suggestPopup.classList.add("active");

}

function SuggestProductClick(suggestProducts){
  suggestProducts.forEach(p => {

    p.addEventListener("click", () => {

      const id = p.dataset.id;

      const selectedProduct = products.find(p => p.id == id);

      updateRow(selectedProduct);

      suggestPopup.classList.remove("active");
      updateQuoteTotals();
    });

  });
}

function updateRow(product){
  if(!currentRow) return;
  const delId=currentRow.querySelector(".del-id").textContent;

  const newQuotP = newQuote.products.find(p => String(p.delId) === delId);
  console.log(newQuotP)
  currentRow.querySelector('[name="qty-requested"]').value = product.qty_requested;
  newQuotP.qty_requested=product.qty_requested;

  currentRow.querySelector(".requested-id").textContent = product.requested_id;
  newQuotP.requested_id=product.requested_id;

  currentRow.querySelector(".available-qty").textContent=product.available_qty;
  newQuotP.available_qty=product.available_qty;

  currentRow.querySelector(".text").textContent = product.desc;
  newQuotP.desc=product.desc;

  currentRow.querySelector('[name="cost"]').value =product.unit_cost;
  newQuotP.unit_cost=product.unit_cost;

  currentRow.querySelector('[name="margin"]').value = product.margin;
  newQuotP.margin=product.margin;

  currentRow.querySelector(".selling-price").textContent=`$${product.selling_price.toFixed(2)}`
  newQuotP.selling_price=product.selling_price;

  currentRow.querySelector(".total-cost").textContent=`${product.total_cost.toLocaleString("en-US", {minimumFractionDigits: 2,maximumFractionDigits: 2})}`;
  newQuotP.total_cost=product.total_cost;

  const stockText=currentRow.querySelector(".stock-text")
  stockText.innerHTML=`${product.stock}<span class="tooltiptext">${product.stock=="S"?"Stock":"Non Stock"}</span>`;
  if(product.stock=="NS"){
    stockText.classList.remove('green')
    stockText.classList.add('red')
  }
  else{
    stockText.classList.remove('red');
    stockText.classList.add('green');
  }
  newQuotP.stock=product.stock;

  currentRow.querySelector(".supplier-text").textContent=product.supplier;
  newQuotP.supplier=product.supplier;

}

//source popup function

function SourceProductClick(sourcingProducts){
  
  sourcingProducts.forEach(p => {

    p.addEventListener("click", () => {
      const id = p.dataset.id;

      const selectedProduct = products.find(p => p.id == id);
      sourcingPopup.classList.remove("active");
      popupOverlay.classList.add("active");
      stockPopup.classList.add("active");

      stockText.innerHTML=`Do you want to confirm with this <br> <span class="id">${selectedProduct.requested_id}</span> ${selectedProduct.stock=="S"?"Stock":"Non Stock"} item?`; 
      stockYesBtn.addEventListener("click",()=>{
        

        updateRow(selectedProduct);
        currentRow.querySelector(".sourcing").classList.remove("active");
        currentRow.querySelector(".stock-wrapper").classList.add('active');
        const delId=currentRow.querySelector(".del-id").textContent;
        const newQuotP = newQuote.products.find(p => String(p.delId) === delId);
        newQuotP.isStock = currentRow.querySelector(".stock-wrapper").classList.contains("active");
        newQuotP.isSource=false;
        closeModal();
        updateQuoteTotals();
        
      })

    });

  });

  
}

stockNoBtn.addEventListener("click",()=>{
  closeModal();
})

function enableSourceText(event){
  const row = event.target.closest(".table-row");
  const sourceText=row.querySelector(".sourcing");
  sourceText.classList.toggle('active');
  const delId=row.querySelector(".del-id").textContent;
  const newQuotP = newQuote.products.find(p => String(p.delId) === delId);
  newQuotP.isSource = sourceText.classList.contains("active");
}

closeSourcingBtn.addEventListener('click',()=>sourcingPopup.classList.remove("active"));

//supplier product click
function openSourcingPopup(event){
  event.stopPropagation();
  console.log("ghghgh")
  const sourcing=event.target.closest(".sourcing");
    
  const rect=sourcing.getBoundingClientRect();
  updatePopupPosition(rect,sourcingPopup)
  currentRow = sourcing.closest(".table-row");
  suggestPopup.classList.remove("active");
  supplierPopup.classList.remove("active");
  sourcingPopup.classList.toggle("active");

  
}

function SupplierProductClick(supplierProducts){
  
  supplierProducts.forEach(p => {

    p.addEventListener("click", () => {
      const id = p.dataset.id;

      const selectedProduct = products.find(p => p.id == id);
      supplierPopup.classList.remove("active");



      updateRow(selectedProduct);

      currentRow.querySelector(".stock-wrapper").classList.add('active');
        
      supplierPopup.classList.remove("active")
      updateQuoteTotals();
    });

  });

  
}

closeSupplierBtn.addEventListener('click',()=>supplierPopup.classList.remove("active"));


//approve btn click function
approveQuoteBtn.addEventListener('click',()=>{
  if(newQuote.products.length!=0){
    updateQuickInfoData()
    updateNewQuoteData()
    updateQuoteTotals();
    addPopup.classList.remove("active");
    popupOverlay.classList.add("active");
    successPopup.classList.add("active");
    successidText.textContent=` #${newQuote.id}`;
  }

})

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


confirmSuccessBtn.addEventListener('click',()=>{

  let found = false;
  const quotes=JSON.parse(sessionStorage.getItem("quotes"))
  quotes.forEach((q, i) => {
    if (q.id === newQuote.id) {
      quotes[i] = newQuote;
      found = true;
    }
  });

  if (!found) {
    newQuote.status="approved";
    quotes.push(newQuote);
  }
  sessionStorage.setItem('quotes',JSON.stringify(quotes))
  const bodyWrap=displayTable.querySelector(".body-wrapper");
  bodyWrap.innerHTML="";
  bodyWrap.innerHTML=`<div class="add-btn-container ">
    <button type="button"><img src="./assets/images/create_quote/add item_icon.png" alt="add"></button>
    <p class="text">Click here to Add Item</p>
    </div>`
    window.location.href="./dashboard.html"
})



// function deleteAllRow(){
//   const bodyWrapper=displayTable.querySelector(".body-wrapper");
//   const tableRows=bodyWrapper.querySelectorAll(".table-row");
//   console.log(tableRows)
//   tableRows.forEach(row=>{
//     const delBtn=row.querySelector(".delete-line-btn");
//     const undoBtn=row.querySelector(".undo-line-btn");
//     row.classList.add("not-active");
//     console.log(delBtn)
//     delBtn.classList.remove("active");
//     undoBtn.classList.add("active");
//     const paras=row.querySelectorAll("p")
//     paras.forEach(p=>{
//       p.style.pointerEvents = "none";
//     })
    
//     delBtn.style.pointerEvents = "auto";
//     undoBtn.style.pointerEvents = "auto";
//     row.removeEventListener("click",rowClickHandler);

//   })
//   delAllBtn.classList.remove('selected','active');
//   undoAllBtn.classList.add('selected','active');
//   approveQuoteBtn.classList.remove("active")
  
// }

// function undoAllRow(){
//   const bodyWrapper=displayTable.querySelector(".body-wrapper");
//   const tableRows=bodyWrapper.querySelectorAll(".table-row");
//   tableRows.forEach(row=>{
//     const delBtn=row.querySelector(".delete-line-btn");
//     const undoBtn=row.querySelector(".undo-line-btn");
//     row.classList.remove("not-active");
//     delBtn.classList.add("active");
//     undoBtn.classList.remove("active");
//     const paras=row.querySelectorAll("p")
//     paras.forEach(p=>{
//       p.style.pointerEvents = "auto";
//     })

//     row.removeEventListener("click",rowClickHandler);

//   })
//   approveQuoteBtn.classList.add("active")
//   delAllBtn.classList.add('selected','active');
//   undoAllBtn.classList.remove('selected','active');
// }

let clickedRow="";
function openLineNotePopup(event){
  addLineNotePopup.classList.add("active");
  popupOverlay.classList.add("active");
  clickedRow=event.target.closest(".table-row");
  const delId = clickedRow.querySelector(".del-id").textContent;
  const product = newQuote.products.find(p => String(p.delId) === delId);
    if(product){
      if(product.lineNote)
        addLineNoteInput.value=product.lineNote;
    }

}

addLineNoteInput.addEventListener('input',()=>{
  if(addLineNoteInput.value.trim()!=="")
    addLineNoteBtn.classList.add("active");
  else
    addLineNoteBtn.classList.remove("active");
})

addLineNoteBtn.addEventListener('click',()=>{
  const addNoteVal=addLineNoteInput.value.trim();
  if(clickedRow){
    const delId = clickedRow.querySelector(".del-id").textContent;
    const product = newQuote.products.find(p => String(p.delId) === delId);
    const greyAddImg=clickedRow.querySelector(".add-line-note-btn .img-grey");
    const blueAddImg=clickedRow.querySelector(".add-line-note-btn .img-blue");
    if(product){
      product.lineNote=addNoteVal; 
      greyAddImg.classList.remove("active");
      blueAddImg.classList.add("active");
      closeModal();
    }
  }
})

//quote note function
function openQuoteNotPopup(){
  popupOverlay.classList.add("active");
  addQuoteNotePopup.classList.add("active");
}

const addNoteVal=addLineNoteInput.value.trim();
addQuoteNoteInput.addEventListener('input',()=>{
  if(addQuoteNoteInput.value.trim()!="")
    addQuoteNoteBtn.classList.add("active")
  else
    addQuoteNoteBtn.classList.remove("active")
})

