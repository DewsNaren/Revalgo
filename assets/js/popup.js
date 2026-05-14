const suggestPopup=document.querySelector(".suggest-product-popup");
const supplierPopup=document.querySelector(".supplier-popup");
const sourcingPopup=document.querySelector(".sourcing-popup");
const closeSupplierBtn=document.querySelector(".close-supplier-popup-btn");
const closeSourcingBtn=document.querySelector(".close-source-popup-btn");
const stockPopup=document.querySelector(".stock-popup");
const stockText=stockPopup.querySelector(".text");
const stockYesBtn=stockPopup.querySelector(".yes-btn");
const stockNoBtn=stockPopup.querySelector(".no-btn");

const expandBtns=document.querySelectorAll(".expand-btn");
const expandModal=popupOverlay.querySelector(".expand-modal")
const modalContent = document.querySelector(".expand-modal-content");
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
  console.log(products)
  SuggestProductClick(productsContainer.querySelectorAll(".product"));
  searchSuggestPopup()
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
    updateForm.reset();
    dateText.textContent="dd-mm-yyyy";
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
    console.log("fdjd")
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