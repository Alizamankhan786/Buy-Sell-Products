import {  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector(`#form`);
const email = document.querySelector(`#email`);
const password = document.querySelector(`#password`);
const loginbtn = document.querySelector(`#logoutUser`);


form.addEventListener(`submit` , (event) =>{
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    alert(`Login Succesfully!`)
    window.location = `index.html`;
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    
  });
})