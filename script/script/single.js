import {
    onAuthStateChanged,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import {
    collection,
    query,
    where,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  
  import { auth, db } from "./config.js";





onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      async function getstoreData(){
        const q = query(collection(db, "users"), where("userId", "==", uid));
  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>{
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
      <li><a href="post ads.html">Post Ads</a></li>
      <li><a id="logout">Logout</a></li>
    </ul>
  </div>`;
  
  
  // LOGOUT FUNCTION STARTED
  document.querySelector("#logout").addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("You have sucessfully logout!");
        window.location = "login.html";
      })
      .catch((error) => {
        alert(err);
      });
  });
  });
    }    
  
    getstoreData()
  
    } else {
      div.innerHTML=`<button class="btn btn-warning" id="login">Login</button>`
     document.getElementById("login").addEventListener("click", () => {
       window.location.href = "login.html";
      });
  
  
  
      
  
    }
  });
  
  
  
  
  
  
  let product = JSON.parse(localStorage.getItem("ads-info"));
  
  console.log(product);
  
  
  const productInfo = document.querySelector("#product-info");
  
  
  productInfo.innerHTML += ` <figure class="w-[100%] sm:w-[40%]  md:w-[40%]   lg:w-[40%]">
          <img
            src="${product.productImage}"
            alt="Movie"
            class="w-[80%] h-[auto]"
          />
        </figure>
        <div class="card-body w-[100%] sm:w-[100px] lg:w-[100px]">
          <h2 class="card-title text-2xl font-bold text-3xl">Rs ${product.productPrice}</h2>
          <h2 class="card-title text-2xl mt-3">${product.productTitle}</h2>
          <p class='mt-3'>
            ${product.productDescription}
          </p>
  
          <div
            class="card bg-[#3869fe] text-[#fff] text-primary-content w-[100%] mt-6 flex-wrap"
          >
            <div class="card-body">
              <div
                class="flex gap-[10px] flex-wrap text-center sm:text-start md:text-start lg:text-start"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ME16QHw0MFWnTVqFCfMd64zjhn4qeXYZCKkrWv0p5qvWMp83yVktbGLYD0e-M7t_pfk&usqp=CAU"
                  alt="Profile Image"
                  class="w-[90px] h-[90px] rounded-full object-cover max-w-[100%] m-[0] m-[auto] sm:text-center md:text-center lg:text-center"
                />
                <p class="font-bold text-[20px] mt-3">
                  ${product.ownerName}<br />
                  <span class="text-[12px]">Member since August 2024</span>
                </p>
  
                <div
                  class="text-end sm:m-[0] m-[auto] md:m-[0] m-[auto] lg:m-[0] m-[auto] hidden"
                >
                  <a href="#" class="text-[10px]">See Profile</a>
                </div>
              </div>
  
              <div class="text-center mt-3">
                <button
                  class="btn bg-[#495057] hover:bg-[#495057] w-[150px] m-[4px] text-[#fff] border-none"
                >
                  <span><i class="fa-solid fa-phone"></i></span>Call Now
                </button>
                <button
                  class="btn bg-[#ced4da] hover:bg-[#ced4da] border-none w-[150px] m-[4px] text-[#000]"
                >
                  <span><i class="fa-regular fa-comment"></i></span>Chat
                </button>
              </div>
            </div>
          </div>
  
          <div class="card-actions justify-start mt-[40px]">
            <button class="btn btn-primary text-[#ffff]">ADD TO CART</button>
          </div>
        </div>`;
  
  
  
  // INFORMATION OF THE PRODUCTS 
  
  
  const info = document.querySelector('#info');
  
  info.innerHTML += `<div class="para">
      <p>Is Deliverable</p>
    </div>
  
    <div class="para">
      <p class="font-bold">${product.delievery}</p>
    </div>
  
    <div class="para">
      <p>Brand</p>
    </div>
  
    <div class="para">
      <p class="font-bold">${product.productBrand}</p>
    </div>
  
    <div class="para">
      <p>condition</p>
    </div>
  
    <div class="para">
      <p class="font-bold">${product.condition}</p>
    </div>
  
    <div>
      <p>Price</p>
    </div>
  
    <div class="para">
      <p class="font-bold">${product.productPrice}</p>
    </div>`;
  

      //Product Description


      const productDescription = document.querySelector(
        "#product-description"
      );
 productDescription.innerHTML += `${product.productDescription}`;