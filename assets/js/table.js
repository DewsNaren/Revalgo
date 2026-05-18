function getDelId(){
  let allQuotes=JSON.parse(sessionStorage.getItem("quotes"))
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
  const lineNo=row.querySelector(".line-no").textContent;

  delPopup1.classList.add("active");
  delPopup1.querySelector(".text").textContent=`Do you want to Delete item ${lineNo}?`
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

function deleteAllRow(){
  const bodyWrapper=displayTable.querySelector(".body-wrapper");
  const tableRows=bodyWrapper.querySelectorAll(".table-row");

  popupOverlay.classList.add('active')
  delPopup1.classList.add("active");
  delPopup1.querySelector(".text").textContent="Do you want to Delete All lines?";

  del1YesBtn.addEventListener('click',()=>{
    delPopup1.classList.remove("active");
    delPopup2.classList.add('active')
    delPopup2Id.textContent=`#${newQuote.id}`
    del2YesBtn.addEventListener('click',()=>{
      tableRows.forEach(row=>{
        const delBtn=row.querySelector(".delete-line-btn");
        const undoBtn=row.querySelector(".undo-line-btn");
        row.classList.add("not-active");
        delBtn.classList.remove("active");
        undoBtn.classList.add("active");
        const paras=row.querySelectorAll("p")
        paras.forEach(p=>{
          p.style.pointerEvents = "none";
        })
      
        delBtn.style.pointerEvents = "auto";
        undoBtn.style.pointerEvents = "auto";
        row.removeEventListener("click",rowClickHandler);

        const delId = row.querySelector(".del-id").textContent;
        const product = newQuote.products.find(p => String(p.delId) === delId);
        if(product){
          product.isDeleted=true; 
        }

      })
      
      delAllBtn.classList.remove('selected','active');
      undoAllBtn.classList.add('selected','active');
      approveQuoteBtn.classList.remove("active");
      closeModal();
    })
  })
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


const brands = ["Voltex","Amperon","Nexwire","Cablux","Steelron","Copperline","Gridmax","Flexduct","Armetek","Wirezone"];
const types = ["standard","metallic","non-metallic","armored"];
const materials = ["steel","copper"];
const imgs=["default thumbnail image","Product img"];
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
        parseFloat(row.querySelector(".total-cost").textContent.replace("$", "").replaceAll(",", "")) || 0,

      delId:getDelId(),

      sourceImg:imgs[Math.floor(Math.random()*imgs.length)],
      brand:brands[Math.floor(Math.random()*brands.length)],
      type:types[Math.floor(Math.random()*types.length)],
      housing_material:materials[Math.floor(Math.random()*materials.length)],
      outlet:Math.floor(Math.random()*(10-1 +1))+1,
      wire_size:Math.floor(Math.random()*(20-5 +1))+5,

    };
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

const mailWrapper=quickContentWrapper.querySelector(".mail-wrapper");
const mailImgContainers=mailWrapper.querySelectorAll(".img-container");
const rightWrapper=quickContentWrapper.querySelector(".right-wrapper");
const imgInfoContainer=mailWrapper.querySelector(".img-info-container");
const mailExpandBtn=leftWrapper.querySelector(".mail-expand-btn");
const mailMinimizeBtn=leftWrapper.querySelector(".minimize-btn");


const imgCloseBtn=imgInfoContainer.querySelector(".img-close-btn");
const imgInfoBtn=imgInfoContainer.querySelector(".info-btn");
const imgPopup=document.querySelector(".img-popup")
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
    uploadBtnContainer.classList.add('active')
  } 
  
  else {

    leftWrapper.classList.add("minimize");
    leftWrapper.classList.remove("maximize");
    rightWrapper.classList.add("maximize");
    rightWrapper.classList.remove("minimize");
      uploadBtnContainer.classList.remove('active')
  }

});




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

imgInfoBtn.addEventListener('click',()=>{
  popupOverlay.classList.add("active");
  imgPopup.classList.add("active");
})

imgCloseBtn.addEventListener('click',()=>{
  imgInfoContainer.classList.toggle("active");
  mailImgContainers.forEach(c =>c.classList.remove("active"));
})


const leftHeaderBtns=leftWrapper.querySelectorAll(".header-wrapper .btn-container button");
const uploadWrapper=leftWrapper.querySelector(".upload-wrapper");


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
      uploadBtn.classList.add('not-active')
    }
  })
})


let exCelData=[];
const expectedKeys = [
  "requested_id",
  "qty_requested",
  "margin",
  "selling_price",
  "total_cost",
  "unit_cost",
  "available_qty",
  "score",
  "brand",
  "sourceImg",
  "housing_material",
  "wire_size",
  "outlet",
  "type"
];
//file upload function 
selectFileInput.addEventListener('input', (event) => {

  const file = selectFileInput.files[0];

  if (!file) {
    console.log("No file selected");
    return;
  }

 

  const validTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel"
  ];

  if (!validTypes.includes(file.type)) {

    selectedFileWrapper.innerHTML += `
      <div class="file-container error">
        <div class="file">
          <div class="file-info">
            <img src="./assets/images/create_quote/emil pad_Pdf icon.png" alt="pdf"> 
            ${file.name.length > 10 ? file.name.slice(0,20) + "..." : file.name}
            (${formatSize(file.size)})
          </div>

          <button type="button" class="del-file-btn" onclick="delFile(event)">
            <img src="./assets/images/global/delete_icon.png" alt="delete">
          </button>
        </div>

        <p class="file-text">
          <img src="./assets/images/create_quote/Error_icon.png" alt="Error icon">

          <span class="status-text">
            <span class="status">Error: </span>
            Format is not Supported
          </span>
        </p>
      </div>
    `;

    return;
  }

  getJsonData(file);
  uploadBtn.classList.remove("not-active");
 
});
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}


function isValidExcelFormat(data) {

  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }


  const firstRow = data[0];

  return expectedKeys.every(key => key in firstRow);
}


async function getJsonData(file){
  const arrayBuffer = await file.arrayBuffer();
  const workbook = await JSZip.loadAsync(arrayBuffer);

  const sharedStringsXML = await workbook.file("xl/sharedStrings.xml")?.async("string");
  const sharedStrings = parseSharedStrings(sharedStringsXML);

  const sheetXML = await workbook.file("xl/worksheets/sheet1.xml")?.async("string");
  const rows = parseSheetAsJSON(sheetXML, sharedStrings);
   if (!isValidExcelFormat(rows)) {

    selectedFileWrapper.innerHTML += `
      <div class="file-container error">
        <div class="file">
          <div class="file-info">
            <img src="./assets/images/create_quote/emil pad_Pdf icon.png" alt="pdf">

            ${file.name.length > 10
              ? file.name.slice(0, 20) + "..."
              : file.name}

            (${formatSize(file.size)})
          </div>

          <button type="button"
            class="del-file-btn"
            onclick="delFile(event)">
            
            <img src="./assets/images/global/delete_icon.png" alt="delete">
          </button>
        </div>

        <p class="file-text">
          <img src="./assets/images/create_quote/Error_icon.png" alt="Error icon">

          <span class="status-text">
            <span class="status">Error:</span>
            Invalid Excel Structure
          </span>
        </p>
      </div>
    `;

    return false;
  }
  // else{
     selectedFileWrapper.innerHTML += `
   
    <div class="file-container success">
      <div class="file">
        <div class="file-info">
          <img src="./assets/images/create_quote/emil pad_Pdf icon.png" alt="pdf"> 
          ${file.name.length > 10 ? file.name.slice(0,20) + "..." : file.name}
          (${formatSize(file.size)})
        </div>

        <button type="button" class="del-file-btn" onclick="delFile(event)">
          <img src="./assets/images/global/delete_icon.png" alt="delete">
        </button>
      </div>

      <p class="file-text">
        <img src="./assets/images/create_quote/Uploaded_icon.png" alt="Upload icon">

        <span class="status-text">
          <span class="status">Uploaded: </span>
          ${file.name}
        </span>
      </p>
    </div>
  `;
  // }
  rows.forEach(r=>{
    r.qty_requested=Number(r.qty_requested)
    r.score=Number(r.score)
    r.available_qty=Number(r.available_qty)
    r.unit_cost=Number(r.unit_cost)
    r.margin=Number(r.margin)
    r.selling_price=Number(r.selling_price)
    r.total_cost=Number(r.total_cost)
    r.delId=Number(r.delId)
    r.wire_size=Number(r.wire_size)
    r.outlet=Number(r.outlet)
    exCelData.push(r)

  })

}


function getCrtData(exCelData){ 
  exCelData.forEach(d=>{
    console.log(d)
    const delid=d.delId;
    let isExists = allQuotes.forEach(q=>[...q.products].some(q => q.delId ===  delid)) ||
    newQuote.products.some(prod => prod.delId === delid);
    while (isExists) {
      d.delId=getDelId();
    }
    
    newQuote.products.push(d);  
    updateQuoteTotals();
  })
}

//Fetch data from excel
function parseSharedStrings(xml) {
  if (!xml) return [];
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  return [...doc.getElementsByTagName("t")].map(t => t.textContent);
}

function parseSheetAsJSON(sheetXML, sharedStrings = []) {
  if (!sheetXML) return [];

  const xmlDoc = new DOMParser().parseFromString(sheetXML, "text/xml");
  const rowElements = xmlDoc.getElementsByTagName("row");

  const rows = [];

  for (let row of rowElements) {
    const cells = [];
    for (let c of row.getElementsByTagName("c")) {
     
      const v = c.getElementsByTagName("v")[0];

      let value = v ? v.textContent : "";
      if (c.getAttribute("t") === "s") value = sharedStrings[Number(value)];
      cells.push(value);
    }
    rows.push(cells);
    console.log(exCelData)
  }

  if (rows.length === 0) return [];

  const keys = rows[0];
  const json = [];

  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    rows[i].forEach((cell, index) => {
      obj[keys[index] || `column${index + 1}`] = cell;
    });
    json.push(obj);
  }

  return json;

}

function delFile(event){
  const fileContainer=event.target.closest(".file-container");
  fileContainer.remove();
}



