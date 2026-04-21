const header=document.querySelector("header");
const createQuoteWrapper=document.querySelector(".create-quote-wrapper");

function setcreateQuoteWrapperHeight(){
  const headerHeight=header.getBoundingClientRect().height;
  createQuoteWrapper.style.height=`calc(100vh - ${headerHeight}px)`
}

setcreateQuoteWrapperHeight();

window.addEventListener('resize',setcreateQuoteWrapperHeight)