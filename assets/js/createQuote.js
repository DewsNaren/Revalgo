const createQuoteWrapper = document.querySelector(".create-quote-wrapper");
const quickOrderWrapper = document.querySelector(".quick-order-wrapper");
const popupOverlay = document.querySelector(".popup-overlay");
const createInpWrapper = document.querySelector(".create-input-wrapper");
const loaderWrapper = document.querySelector(".loader-wrapper");
const popups = document.querySelectorAll(".popup");

const closePopupBtns = document.querySelectorAll(".close-popup-btn");

const CreateBtn = createQuoteWrapper.querySelector(".back-create-btn");
const createBtns = createInpWrapper.querySelectorAll(".btn-container button");
const newBtn = createInpWrapper.querySelector(".new-btn");

const existBtn = createInpWrapper.querySelector(".exist-btn");

const createInputCon = createInpWrapper.querySelector(".create-input-container",);
const createInput = createInpWrapper.querySelector(".create-quote-input");
const existInput = createInpWrapper.querySelector(".exist-quote-input");
const existSearchBtn = createInpWrapper.querySelector(".exist-search-quote-btn",);
const inpContainer = createInpWrapper.querySelector(".input-container");

const createQuoteBtn = inpContainer.querySelector(".create-quote-btn");
const nextBtn = inpContainer.querySelector(".next-btn");
const quoteDropdown = document.querySelector(".quote-dropdown");

const existFilterWrapper = document.querySelector(".exist-quote-filter-wrapper");
const newBtn1= existFilterWrapper.querySelector(".new-btn");



newBtn1.addEventListener("click",()=>{
  existFilterWrapper.classList.remove("active");
  createInpWrapper.classList.add("active");
})


function padZero(num) {
  return num > 9 ? num : "0" + num;
}

createBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    createBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    if (newBtn.classList.contains("active")) {
      existInput.classList.remove("active");
      createInputCon.classList.add("active");
      existSearchBtn.classList.remove("active");
      nextBtn.classList.remove("active");
      createQuoteBtn.classList.add("active");
      existInput.value="";
      quoteDropdown.classList.remove("active");
    } else {
      existInput.classList.add("active");
      createInputCon.classList.remove("active");
      existSearchBtn.classList.add("active");
      createQuoteBtn.classList.remove("active");
      createInput.value="";
      const err = createInput.nextElementSibling;
      err.textContent = "";
      handleExistSearch();
      nextBtn.classList.add("active");
    }
  });
});

const quoteNameWrapper = quoteDropdown.querySelector(".name-wrapper");
const quoteNameList = quoteDropdown.querySelector(".name-list");
const quoteIdWrapper = quoteDropdown.querySelector(".id-wrapper");
const quoteIdList = quoteDropdown.querySelector(".id-list");
const quotePoWrapper = quoteDropdown.querySelector(".po-wrapper");
const quotePoList = quoteDropdown.querySelector(".po-list");

function handleExistSearch() {
  const existInput = createInpWrapper.querySelector(".exist-quote-input");
  const value = existInput.value.trim().toLowerCase();

  quoteIdList.innerHTML = "";
  quoteNameList.innerHTML = "";
  quotePoList.innerHTML = "";

  if (value === "") {
    quoteDropdown.classList.remove("active");
    return;
  }

  quoteDropdown.classList.add("active");
  searchedQuotes = allQuotes.filter((q) => {
    
    const isIdMatch = q.id.toString().toLowerCase().includes(value);

    const isNameMatch = q.name.toLowerCase().includes(value);

    const isPoMatch =
      q.po_no && q.po_no.toString().toLowerCase().includes(value);

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
  quoteIdWrapper.classList.toggle("not-active", !quoteIdList.children.length);

  quoteNameWrapper.classList.toggle(
    "not-active",
    !quoteNameList.children.length,
  );

  quotePoWrapper.classList.toggle("not-active", !quotePoList.children.length);

  if (
    !quoteIdList.children.length &&
    !quoteNameList.children.length &&
    !quotePoList.children.length
  ) {
    quoteDropdown.classList.remove("active");
  }
}

function handleExistSearchItemClick(e) {
  const li = e.target.closest("li");
  existInput.value = li.dataset.value;

  if (!li) return;

  const type = li.dataset.type;
  const value = li.dataset.value.toLowerCase();

  let filteredQuote = [];

  if (type === "id") {
    filteredQuote = allQuotes.filter((q) => q.id === Number(value));
  }

  if (type === "name") {
    filteredQuote = allQuotes.filter((q) => q.name.toLowerCase() === value);
  }

  if (type === "po") {
    filteredQuote = allQuotes.filter(
      (q) => q.po_no && q.po_no.toString().toLowerCase() === value,
    );
  }
  sessionStorage.setItem("searchedQuotes", JSON.stringify(filteredQuote));

  sessionStorage.setItem("searchedItem", JSON.stringify(value));

  quoteDropdown.classList.remove("active");

  existFilterWrapper.classList.add("active");
  createInpWrapper.classList.remove("active");
  existInput.value="";
  existBtn.classList.remove("active");
  newBtn.classList.add("active");
  getSearchedQuotes();
  // createQuoteWrapper.classList.remove("active");
  // window.location.href = "./existing-quote.html";
}

quoteDropdown.addEventListener("click", handleExistSearchItemClick);
initializeExistSearch();

function initializeExistSearch() {
  allQuotes = JSON.parse(sessionStorage.getItem("quotes"));
  existInput.addEventListener("input", () => {
    handleExistSearch();
  });

  existInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = existInput.value.trim().toLowerCase();
      handleExistSearch();
      quoteDropdown.classList.remove("active");
      if (value != "") {
        sessionStorage.setItem(
          "searchedQuotes",
          JSON.stringify(searchedQuotes),
        );
        sessionStorage.setItem("searchedItem", JSON.stringify(value));
        existInput.value = "";

        existFilterWrapper.classList.add("active");
        createInpWrapper.classList.remove("active");
        getSearchedQuotes();
      }
    }
  });

  existSearchBtn.addEventListener("click", () => {
    const value = existInput.value.trim().toLowerCase();
    if (value != "") {
      sessionStorage.setItem("searchedQuotes", JSON.stringify(searchedQuotes));
      sessionStorage.setItem("searchedItem", JSON.stringify(value));
      existInput.value = "";

      existFilterWrapper.classList.add("active");
      createInpWrapper.classList.remove("active");
      existInput.value="";
      existBtn.classList.remove("active");
      newBtn.classList.add("active");
      getSearchedQuotes();
    }
  });

  nextBtn.addEventListener("click", () => {
    const value = existInput.value.trim().toLowerCase();
    if (value != "") {
      sessionStorage.setItem("searchedQuotes", JSON.stringify(searchedQuotes));
      sessionStorage.setItem("searchedItem", JSON.stringify(value));
      existInput.value = "";

      existFilterWrapper.classList.add("active");
      createInpWrapper.classList.remove("active");
      existInput.value="";
      existBtn.classList.remove("active");
      newBtn.classList.add("active");
      
      getSearchedQuotes();
    }
  });
}

createInput.addEventListener("input", () => {
  const err = createInput.nextElementSibling;
  const val = createInput.value;
  createInput.value = createInput.value.replace(/\D/g,"");
  if (val.trim() === "") {
    err.textContent = "please enter the quote id";
  }
  if (val.length < 7) {
    err.textContent = "quote id must be 7 digits";
  } else if (val.length > 7) {
    createInput.value = val.slice(0, 7);
  } else if (allQuotes) {
    const isExists = allQuotes.some((q) => q.id === Number(val));
    if (isExists) {
      err.textContent = "Quote Id already exists";
    } else {
      err.textContent = "";
    }
  }
});

createQuoteBtn.addEventListener("click", () => {
  validateQuoteId(createInput);
});

function validateQuoteId(inp) {
  const val = inp.value;
  const err = createInput.nextElementSibling;
  if (val.trim() === "") {
    err.textContent = "please enter the quote id";
  } else if (val.length < 7) {
    err.textContent = "quote id must be 7 digits";
  } else if (val.length > 7) {
    createInput.value = val.slice(0, 7);
  } else if (allQuotes) {
    const isExists = allQuotes.some((q) => q.id === Number(val));
    if (isExists) {
      err.textContent = "Quote Id already exists";
    } else {
      sessionStorage.setItem("newId",Number(createInput.value))
      createInput.value = "";
      existInput.value = "";
      err.textContent = "";
      window.location.href="./new-quote.html"
    }
  }
}


