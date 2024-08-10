import { signOut  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { collection, getDocs , query , where } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
import { auth, checkUserStatus } from "../config.js";




const logoutUser = document.querySelector (`#logoutUser`);
// const useravatar = document.querySelector (`#user-avatar`);
// const userimage = document.querySelector (`#userImage`);

// FUNCTION OF CHECK USER STATUS


// function checkUserStatus(){
//     onAuthStateChanged(auth, async (user) => {
//         if (user) {
//           const uid = user.uid;
//           console.log(uid);
//           const q = query(collection(db, "users"), where("uid", "==", uid));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//         console.log(doc.data());
//         userData = doc.data();
//         userimage.src = userData.profileImage
// });
          
//         } else {
//           useravatar.innerHTML = `
//            <button><a href="./login.html">Login</a></button>
//           `
//         }
//       });
// }

// checkUserStatus();


let userData = null;

async function userDataObject(){
  const obj = await checkUserStatus();
  userData = obj;
  console.log(`App.js Function` , userData);
    
};

userDataObject();



// LOGOUT FUNCTION 


logoutUser.addEventListener(`click` , () => {

signOut(auth)
.then(() => {
  window.location = `login.html`;
}).catch((error) => {
  alert(error);
});

});