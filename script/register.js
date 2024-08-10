import {getAuth , createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  
import {uploadBytes,} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
  
import {collection , addDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  
import { ref , storageRef , db , auth } from "./config.js";
  
  
  
const form = document.querySelector(`#form`);
const firstname = document.querySelector(`#firstname`);
const lastname = document.querySelector(`#lastname`);
const email = document.querySelector(`#email`);
const password = document.querySelector(`#password`);
const registerBtn = document.querySelector(`#register`);
const profileImage = document.querySelector(`#profileimage`);
  
  
registerBtn.addEventListener('click' , (event)=>{

    event.preventDefault()
  
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);

  
    uploadBytes(storageRef, profileImage.files[0])
    .then((snapshot) => {
    console.log(snapshot);
  
            // IMAGE URL
  
    getDownloadUrl(ref(storageRef))
        .then((url) => {
        console.log("URL==>", url);
        async function getData() {
            try {
                const docRef = await addDoc(collection(db, "users"), {
                firstname: firstname.value + " " + lastname.value,
                email: email.value,
                profileImage: url,
                uid: user.uid
            });
            console.log("Document written with ID: ", docRef.id);
                firstname.value = "";
                lastname.value = "";
                email.value = "";
                profile.value = "";
                password.value = "";
            } catch (e) {
                console.error("Error adding document: ", e);
            };
            };
  
            getData();
        })
        .catch((error) => {
            console.log("download error==>", error);
        });
        })
        .catch((error) => {
        console.log(error);
        });

    })
    .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage)
});
});
  
  
  
  
  
    