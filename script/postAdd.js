import { getAuth , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { checkUserStatus } from "../config.js";

let userData = null;

async function userDataObject(){
    const obj = await checkUserStatus();
    userData = obj;
    console.log(`App.js Function` , userData);
    
    !userData
    ? (window.location = "login.html")
    : console.log("User Available");

};

userDataObject();


// LOGOUT FUNCTION

const logoutUser = document.querySelector (`#logoutUser`);

logoutUser.addEventListener(`click` , () => {

    signOut(auth)
    .then(() => {
      window.location = `login.html`;
    }).catch((error) => {
      alert(error);
    });
    
    });