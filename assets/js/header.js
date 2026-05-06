document.querySelectorAll(".profile-container").forEach((container) => {
  const profileMenu = container.querySelector(".profile-menu");
  const profiles = container.querySelectorAll(".user-profile");

  container.addEventListener("click", () => {
    profileMenu.classList.toggle("active");
  });

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".profile-container")) {
      profileMenu.classList.remove("active");
    }
  });
});

const searchHeaderInput =header.querySelector(".search-quote-input");
const searchHeaderBtn =document.querySelector(".search-quote-btn");
const allQuotes=JSON.parse(sessionStorage.getItem("quotes"));
const nameWrapper=header.querySelector(".name-wrapper");
const nameList=header.querySelector(".name-list");
const idWrapper=header.querySelector(".id-wrapper");
const idList=header.querySelector(".id-list");
const poWrapper=header.querySelector(".po-wrapper");
const poList=header.querySelector(".po-list");
const globalDropDown=header.querySelector(".global-dropdown")
let searchedQuotes=[];

function searchHeaderQuotes() {
  const value = searchHeaderInput.value.trim().toLowerCase();

  idList.innerHTML = "";
  nameList.innerHTML = "";
  poList.innerHTML = "";

  if (value === "") {
    globalDropDown.classList.remove("active");
    return;
  }

  globalDropDown.classList.add("active");

   searchedQuotes = allQuotes.filter(q => {

    const isIdMatch =q.id.toString().toLowerCase().includes(value);

    const isNameMatch =q.name.toLowerCase().includes(value);

    const isPoMatch =q.po_no &&q.po_no.toString().toLowerCase().includes(value);

    // render lists
    if (isIdMatch) {
      idList.innerHTML += `
        <li>${q.id}</li>
      `;
    }

    if (isNameMatch) {
      nameList.innerHTML += `
        <li>${q.name}</li>
      `;
    }

    if (isPoMatch) {
      poList.innerHTML += `
        <li>${q.po_no}</li>
      `;
    }

    // filter condition
    return isIdMatch || isNameMatch || isPoMatch;

  });




  // hide empty sections
  idWrapper.classList.toggle(
  "not-active",!idList.children.length);

  nameWrapper.classList.toggle(
  "not-active",!nameList.children.length);

  poWrapper.classList.toggle(
  "not-active",!poList.children.length);

  if(!idList.children.length && !nameList.children.length && !poList.children.length){
    globalDropDown.classList.remove("active")
  }

  

}

console.log(searchHeaderInput)

searchHeaderInput.addEventListener("input", () => {
  searchHeaderQuotes();
});

searchHeaderInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = searchHeaderInput.value.trim().toLowerCase()
    searchHeaderQuotes();

    if(value!=""){

     
      sessionStorage.setItem("searchedQuotes",JSON.stringify(searchedQuotes));
      sessionStorage.setItem("searchedItem",JSON.stringify(value));
      searchHeaderInput.value = "";

      window.location.href = "./global.html";
    }
  }

});

searchHeaderBtn.addEventListener("click", () => {
  const value = searchHeaderInput.value.trim().toLowerCase();
  if(value!=""){
     
    sessionStorage.setItem("searchedQuotes",JSON.stringify(searchedQuotes));
    sessionStorage.setItem("searchedItem",JSON.stringify(value));
    searchHeaderInput.value = "";

    window.location.href = "./global.html";
  }

});
