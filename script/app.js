import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


import { auth ,db  } from "./config.js";

let ads = [] //initialize an array for store ads from the database



let filterData=[]; // array initailization for search functionality








let moreInfo=[]


const div = document.querySelector('#div');
const loginbtn = document.querySelector(`#login-btn`);



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
          <a id="profileBtn">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a href="postAdd.html">Post Ads</a></li>
        <li><a id="logout-btn">Logout</a></li>
      </ul>
    </div>`;

    //logout user

    const LogoutBtn = document.querySelector("#logout-btn");
    const NoBtn = document.querySelector('#btn-no')
    const YesBtn = document.querySelector('#btn-yes')
    
    
    LogoutBtn.addEventListener("click", () => {
      my_modal_3.showModal();

      YesBtn.addEventListener("click", () => {
        signOut(auth)
          .then(() => {
            my_modal_4.showModal();

            setTimeout(() => {
              window.location.href = "login.html";
            }, 1000);
          })
          .catch((error) => {
            console.error("Sign out error:", error);
          });
      });

      NoBtn.addEventListener("click", () => {
        my_modal_3.style.display = "none";
      });
    })

    const userProfile = document.querySelector(
      "#profile-section"
    )


    userProfile.innerHTML = `<div id="profileSection" class="hidden fixed inset-0 flex items-center justify-center z-50 max-w-9xl">
    <div class="bg-gradient-to-r bg-[#343a40] p-8 rounded-lg shadow-lg text-white">
      <div class="flex flex-col items-center space-y-4 ">

      <div class="avatar mx-auto mb-4">
  <div class="w-28 rounded-full">
    <img src="${doc.data().userImage}" alt="User Image">
  </div>
</div>

        
        <h2 class="text-2xl font-bold">${doc.data().userName}</h2>
        <p class="text-sm opacity-80">${doc.data().userEmail}</p>
        <button id="closeProfile" class="btn btn-accent mt-4">Close</button>
      </div>
    </div>
  </div>`;


  // <img src="${
  //         doc.data().userImage
  //       }" alt="User Image" class="w-29 h-28 shadow-lg"></img>
    
    
    
    
    
    
    


      
const profileBtn = document.getElementById("profileBtn");
const profileSection = document.getElementById("profileSection");
const closeProfile = document.getElementById("closeProfile");

profileBtn.addEventListener("click", () => {
  profileSection.classList.remove("hidden");
  profileSection.classList.add("flex");
});

closeProfile.addEventListener("click", () => {
  profileSection.classList.add("hidden");
  profileSection.classList.remove("flex");
});


  

    




    

  
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


//search functionality HTML getting





async function getData(){
  const querySnapshot = await getDocs(collection(db, "user-ads"));
querySnapshot.forEach((doc) => {
  ads.push(doc.data());


  



 
  


  const card = document.querySelector("#div-cards");

  
  function renderCard(){
    card.innerHTML = "";

    ads.map((item) => {
      card.innerHTML += `
      <div class="card bg-base-100 w-[20rem] shadow-xl mt-6 border-solid border-[#ced4da] border">
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
 </div>
 `;

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
              window.location.href = "more info.html";
            } else {
              loginAlert.innerHTML = my_modal_1.showModal();
            }
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

  renderCard(filteredAds);

  if (filteredAds.length === 0) {
    card.innerHTML = `<p class="text-lg text-center font-bold">No Result Found....</p>`;
  }
});

function renderCard(ads) {
  card.innerHTML = "";
  ads.map((item) => {
    card.innerHTML += `
      <div class="card bg-base-100 w-[20rem] shadow-xl mt-6 border-solid border-[#ced4da] border">
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
 </div>
    `;
  });
}







    //Ok button in the login alert popup functionality started

    const okBtn = document.querySelector("#btn-ok");

    okBtn.addEventListener("click", () => {
      my_modal_1.style.display = "none";
    });

    //Ok button in the login alert popup functionality ended
  }

  renderCard()


});
}


getData()


loginbtn.addEventListener(('click'),()=> window.location='login.html');