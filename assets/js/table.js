
function getDelId(){

  let delId =Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  let isExists = allQuotes.forEach(q=>[...q.products].some(q => q.delId ===  delId)) ||
  newQuote.products.some(prod => prod.delId === delId);
  while (isExists) {
    delId =Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

    isExists =[...allQuotes.products].some(q => q.requested_id ===   delId) ||
    newQuote.products.some(prod => prod.delId === delId);
  }
  return delId;

}

function delRow(event){
  const delBtn=event.target.parentElement;
  const row=delBtn.parentElement.parentElement;
  const undoBtn=row.querySelector(".undo-line-btn");
  
  delPopup1.classList.add("active");
  popupOverlay.classList.add('active')
  del1YesBtn.addEventListener('click',()=>{
    delPopup1.classList.remove("active");
    delPopup2.classList.add('active')
    delPopup2Id.textContent=`#${newQuote.id}`
    del2YesBtn.addEventListener('click',()=>{
      delBtn.classList.remove("active");
      delQuoteText.value="";
      row.classList.add("not-active");
      undoBtn.classList.add("active");
      const paras=row.querySelectorAll("p");

      const delId = row.querySelector(".del-id").textContent;
       const product = newQuote.products.find(p => String(p.delId) === delId);
      if(product){
        product.isDeleted=true; 
      }
      paras.forEach(p=>{
        p.style.pointerEvents = "none";
      })
      
      delBtn.style.pointerEvents = "auto";
      undoBtn.style.pointerEvents = "auto";

      row.removeEventListener("click",rowClickHandler);
      closeModal();
    })
  })
}
delQuoteText.addEventListener('input',()=>{
  if(delQuoteText.value.trim()!=""){
    del2YesBtn.classList.add("active")
  }
  else{
    del2YesBtn.classList.remove("active")
  }
})
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
  const delId = row.querySelector(".del-id").textContent;
  const product = newQuote.products.find(p => String(p.delId) === delId);
    if(product){
        product.isDeleted=false; 
    }
  

  row.addEventListener("click",rowClickHandler);
}

//select all 
function selectAllRow(event){
  const bodyWrap=displayTable.querySelector(".body-wrapper")
  const tableRows =bodyWrap.querySelectorAll(".table-row");
  const isChecked = event.target.checked;
  const delAllBtn=displayTable.querySelector(".delete-all-btn")
  console.log(delAllBtn)
   tableRows.forEach(row => {
      const inp=row.querySelector("input[type='checkbox']")
      inp.checked=isChecked;
    })
    if(isChecked){
      delAllBtn.classList.add('active','selected')
    }
    else{
      delAllBtn.classList.remove('active','selected')
    }
}



function openAddPopup(){
  popupOverlay.classList.add("active");
  addPopup.classList.add("active");
  editPopupData(addTable.querySelector(".body-wrapper"));
}


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