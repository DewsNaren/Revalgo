const header=document.querySelector("header");
const quoteWrapper=document.querySelector(".quote-wrapper");
const overlay=document.querySelector(".overlay");

function setQuoteWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  quoteWrapper.style.height=`calc(100vh - ${headerHeight}px)`
  overlay.style.height=`calc(100vh - ${headerHeight}px)`;
}

setQuoteWrapperHeight();

window.addEventListener('resize',setQuoteWrapperHeight)

//popup and expand open close function
const modalBox = document.querySelector(".expand-modal");
const modalContent=document.querySelector(".expand-modal-content");
const closePopupBtns= document.querySelectorAll(".close-popup-btn");
const popups=document.querySelectorAll("popup");
const displayTable=document.querySelector(".display-table");
const disTableBodyWrapper=displayTable.querySelector(".body-wrapper");
const expandBtns=document.querySelectorAll(".expand-btn");
const closeBtn = document.querySelector(".close-modal-btn");

expandBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const modalContent=document.querySelector(".expand-modal-content");
    const type = btn.dataset.type;
    const target = btn.dataset.target;
    const modalData=btn.dataset.modal
    const source = document.querySelector(target);
    if (!source) return;
    // overlay.classList.add("active");
    // modalBox.classList.add("active");
    modalBox.className = "expand-modal " + type +" "+ modalData +" "+ "active";

    if (type === "table") {
      const clone = source.cloneNode(true);      
      if(target==".suggest-product-popup"){
        modalContent.appendChild(source);
        closeBtn.classList.add("not-active");
        closeSuggestExpandModal();
      }
    }
   

    overlay.classList.add("active");
  });
});

closePopupBtns.forEach(btn => btn.addEventListener("click", () => {
  popups.forEach(pop=>pop.classList.remove("active"));
    overlay.classList.remove("active");
}))

function closeModal(){
  overlay.classList.remove("active");
  modalBox.classList.remove("active");
  const suggestSource=modalContent.querySelector(".suggest-product-popup");
  if(suggestSource){
    disTableBodyWrapper.appendChild(suggestSource)
  }

}
function closeSuggestExpandModal(){
  const closeSuggestExpandBtn=modalContent.querySelector(".close-suggest-popup-btn");
  closeSuggestExpandBtn.addEventListener("click", () => {
    closeModal();
    closeBtn.classList.remove("not-active");
  });
}

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});


//
const thumbImgInput =document.querySelector(".thumbnail-img-input");
const thumbImg=document.querySelector(".thumbnail-img");
thumbImgInput.addEventListener('change',(e)=>{
  const file = e.target.files[0];
  thumbImg.src=`./assets/images/orderpad/${file.name}`
  console.log(file)
})


const editAcronymInput = document.querySelector(".edit-acronym-input");

function setEditInputWidth() {
  editAcronymInput.style.width = editAcronymInput.value.length  + "ch";
}

setEditInputWidth()
editAcronymInput.addEventListener("input", setEditInputWidth);