import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


import { auth ,db  } from "./config.js";



// const loginbtn = document.querySelector(`#logoutUser`);
// // const useravatar = document.querySelector (`#user-avatar`);
// // const userimage = document.querySelector (`#userImage`);

// // FUNCTION OF CHECK USER STATUS


// // function checkUserStatus(){
// //     onAuthStateChanged(auth, async (user) => {
// //         if (user) {
// //           const uid = user.uid;
// //           console.log(uid);
// //           const q = query(collection(db, "users"), where("uid", "==", uid));
// //         const querySnapshot = await getDocs(q);
// //         querySnapshot.forEach((doc) => {
// //         console.log(doc.data());
// //         userData = doc.data();
// //         userimage.src = userData.profileImage
// // });
          
// //         } else {
// //           useravatar.innerHTML = `
// //            <button><a href="./login.html">Login</a></button>
// //           `
// //         }
// //       });
// // }

// // checkUserStatus();


// let userData = null;

// async function userDataObject(){
//   const obj = await checkUserStatus();
//   userData = obj;
//   console.log(`App.js Function` , userData);
    
// };

// userDataObject();



// // LOGOUT FUNCTION 


// logoutUser.addEventListener(`click` , () => {

// signOut(auth)
// .then(() => {
//   window.location = `login.html`;
// }).catch((error) => {
//   alert(error);
// });
// });


let ads = [] //initialize an array for store ads from the database

let filterData=[]; // array initailization for search functionality

let moreInfo=[]


const div = document.querySelector('#div');


const loginbtn = document.querySelector('#login-btn');



// //login button


 

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    async function getData(){
      
const q = query(collection(db, "users"), where("userId", "==", uid));

const querySnapshot = await getDocs(q);
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
          <a class="justify-between" id="showProfileBtn">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a href="postAdd.html">Post Ads</a></li>
        <li><a id="logout-btn">Logout</a></li>
      </ul>
    </div>`




      //logout user

      const LogoutBtn = document.querySelector("#logout-btn");
      const NoBtn = document.querySelector('#btn-no')
      const YesBtn = document.querySelector('#btn-yes')
      
      
      LogoutBtn.addEventListener('click' , ()=>{
        
        my_modal_3.showModal();
        
        YesBtn.addEventListener('click' , ()=>{
    
          
          signOut(auth)
          .then(() => {
                 my_modal_4.showModal()
  
  
                setTimeout(()=>{
                  window.location.href="login.html"
                } , 1000)
               })
               .catch((error) => {
                 console.error("Sign out error:", error);
   });    
        })
  
        NoBtn.addEventListener('click' , ()=>{
          my_modal_3.style.display="none";
        })      
      }) 
  });
      }
  
      getData()  

  } else {
    div.innerHTML=`<button class="btn btn-warning" id="login-btn">LOGIN</button>`
    document.getElementById("login-btn").addEventListener("click", () => {
      window.location.href = "login.html";
    });
     
 
   }
  });


  
async function getData(){
  const querySnapshot = await getDocs(collection(db, "user-ads"));
querySnapshot.forEach((doc) => {
  ads.push(doc.data());



  const card = document.querySelector("#div-cards");




  card.innerHTML += `<p class="text-[#000]">No Ads Posted</p>`;

  function renderCards(){
    card.innerHTML='';

    ads.map((item)=>{
      card.innerHTML +=
  `<div class="card bg-base-100 w-[20rem] shadow-xl mt-6 border-solid border-[#ced4da] border">
   <figure>
     <img class="w-[100%] h-[320px] object-cover"
       src="${item.productImage}"
      alt="Shoes" />
  </figure>
   <div class="card-body">
     <h2 class="card-title">${item.productTitle}</h2>
     <p>${item.productDescription}</p>
     <div class="card-actions justify-end">
       <p class="mt-[10px] font-bold">Rs ${item.productPrice}</p>
       <button class="btn btn-secondary" id="more-info-btn">MORE INFO</button>
     </div>
   </div>
 </div>`;

 const moreInfoBtn = document.querySelectorAll("#more-info-btn");

 moreInfoBtn.forEach((btn, index) => {
   btn.addEventListener("click", () => {
     moreInfo = [];
     moreInfo.push(ads[index]);

     localStorage.setItem("ads-info", JSON.stringify(moreInfo[0]));

     //alert user to login for view more info

     const loginAlert = document.querySelector("#login-alert");

     onAuthStateChanged(auth, (user) => {
       if (user) {
         window.location.href = "singlepage.html";
       } else {
         loginAlert.innerHTML = my_modal_1.showModal();
       };
     });
   });
 });
});

 // search functionality 

 const searchInput = document.getElementById("search-input");

 searchInput.addEventListener("input", (e) => {
   const searchValue = e.target.value.toLowerCase();
   const filteredAds = ads.filter((ad) =>
     ad.productTitle.toLowerCase().includes(searchValue)
   );
   renderCards(filteredAds);

   
 });


 function renderCards(ads) {
  card.innerHTML = "";
  ads.map((item) => {
   card.innerHTML += `<div class="card bg-base-100 w-[20rem] shadow-xl mt-6 border-solid border-[#ced4da] border">
<figure>
 <img class="w-[100%] h-[320px] object-cover"
   src="${item.productImage}"
  alt="Shoes" />
</figure>
<div class="card-body">
 <h2 class="card-title">${item.productTitle}</h2>
 <p>${item.productDescription}</p>
 <div class="card-actions justify-end">
   <p class="mt-[10px] font-bold">Rs ${item.productPrice}</p>
   <button class="btn btn-secondary" id="more-info-btn">MORE INFO</button>
 </div>
</div>
</div>`;
  });
};



    //Ok button in the login alert popup functionality started

    const okBtn = document.querySelector('#btn-ok');

    okBtn.addEventListener('click' , ()=>{
      my_modal_1.style.display="none"
    });

    //Ok button in the login alert popup functionality ended

  };

  renderCards()


  
});
};
getData()


loginbtn.addEventListener(('click'),()=> window.location='login.html');

