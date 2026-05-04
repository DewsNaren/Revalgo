const loginForm=document.querySelector(".login-form");
const loginName=loginForm.querySelector(".username");
const loginPassword=loginForm.querySelector(".password");
const loginBtn=document.querySelector(".login-btn");

function ValidateLoginForm(){
    let success=true;
    const nameVal=loginName.value;
    const passwordVal=loginPassword.value;

    if(!validateUsername(loginName, nameVal)){
        success=false;
    }
        
    if(!validatePassword(passwordVal,loginPassword)){
        success=false;
    }
    return success;
    
}

function validateUsername(loginName, nameVal){
    if (nameVal === "") {
        setError(loginName,"please enter the username");
       return false;
    }
    else{
        setSuccess(loginName);
        return true;
    }
    
}

loginPassword.addEventListener('input',()=>{
    validatePassword(loginPassword.value,loginPassword)
})


function validatePassword(passwordVal,input){
    if (passwordVal === "") {
        setError(input,"please enter the password");
        return false;
    } else if (passwordVal.length < 8) {
        setError(input,"Min 8 characters required");
        return false;
    } else if (!/[A-Z]/.test(passwordVal)) {
        setError(input,"Need atleast one uppercase letter");
        return false;
    } else if (!/[0-9]/.test(passwordVal)) {
        setError(input,"Password must contain atleast one number");
        return false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordVal)) {
        setError(input,"Need  atleast one special character");
        return false;
    } else {
        setSuccess(input)
        return true;
    }
}

function setError(element,message){
   const wrapper=element.closest(".input-wrapper");
   const errorElement=wrapper.querySelector(".error");
   errorElement.innerHTML=message;
}

function setSuccess(element){
   const wrapper=element.closest(".input-wrapper");
   const errorElement=wrapper.querySelector(".error");
   errorElement.innerHTML="";
}

loginBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(ValidateLoginForm()){
        console.log("validate")
        validateLoginData()

        window.location.href="./dashboard.html"
    }
    else{
        console.log("not validate");
    }
})

function validateLoginData(){
    const nameVal=loginName.value;
    const passwordVal=loginPassword.value;

    console.log(nameVal, passwordVal)
    
    loginForm.reset();
    
}