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
const createBtns=createInpWrapper.querySelectorAll(".btn-container button");

const newBtn=createInpWrapper.querySelector(".new-btn");
const existBtn=createInpWrapper.querySelector(".exist-btn");


const createInput=createInpWrapper.querySelector(".create-quote-input");
const existInput=createInpWrapper.querySelector(".exist-quote-input");
const existSearchBtn=createInpWrapper.querySelector(".exist-search-quote-btn");
console.log(existSearchBtn)
console.log(existInput)
const inpContainer=createInpWrapper.querySelector(".input-container");

const createQuoteBtn=inpContainer.querySelector(".create-quote-btn");
const nextBtn=inpContainer.querySelector(".next-btn");

const quoteDropdown=document.querySelector(".quote-dropdown");

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

  sessionStorage.setItem(
    "searchedQuotes",
    JSON.stringify(filteredQuote)
  );

  sessionStorage.setItem(
    "searchedItem",
    JSON.stringify(value)
  );
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