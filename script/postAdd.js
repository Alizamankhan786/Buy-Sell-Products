import {
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";


import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import { auth, db , ref ,storage} from "./config.js";



const div = document.querySelector(`#div`);
const form = document.querySelector(`#form`);
const title = document.querySelector(`#title`);
const description = document.querySelector(`#description`);
const price = document.querySelector(`#price`);
const name = document.querySelector(`#name`);
const number = document.querySelector(`#number`);
const adImage = document.querySelector('#image');



// LOGIN BUTTON

onAuthStateChanged(auth, (user) => {
  if (user) {
  const uid = user.uid;
  async function getData(){
  const q = query(collection(db, "users"), where("userId", "==", uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    querySnapshot.forEach((doc) => {
      div.innerHTML += `<div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Profile" id="user-profile"
          src="${doc.data().userImage}" />
      </div>
    </div>
    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <li>
        <a class="justify-between">
          Profile
          <span class="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li><a href="./index.html">Home</a></li>
      <li><a id="logoutUser">Logout</a></li>
    </ul>
  </div>`;

      //Logout user FUNCTION

      document.querySelector("#logoutUser").addEventListener("click", () => {
        signOut(auth)
          .then(() => {
            alert("sucessfully logout!");
            window.location = "login.html";
          })
          .catch((error) => {
            alert(err);
          });
      });
    });
  });

  getData();
}
} else {
 window.location="login.html"
}
});






form.addEventListener(`submit` , (event) => {
  event.preventDefault();


  const storageRef = ref(storage , `Ad-image`);

  uploadBytes(storageRef , adImage.files[0])
  .then((snapshot) => {
  console.log("Image upload in Local storage!");
  adImage.value = ""


  getDownloadURL(ref(storage))
  .then((url) =>{
    console.log("URL" , url);

    async function instantData(){
      try{
        const docRef = await addDoc(collection(db, "user-ads"), {
          Image:url,
          Title: title.value,
          Description: description.value,
          Price: parseInt(price.value),
          Name:userName.value,
          Number: number.value
        });
        console.log("Document written with id" , docRef.id);
      title.value=""
      description.value=""
      price.value=""
      userName.value=""
      number.value=""
      }catch(e){
        console.log("Error Adding Document:" , e);
      }
    }

    instantData();
  })

  .catch((error) =>{
    console.log("Error" , error);
  });
  })

  .catch((error) =>{
    console.log("Upload Image Error" , error);
    
  });
});