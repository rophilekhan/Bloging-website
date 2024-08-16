import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";






async function getDataFromFirestore() {
  const arr = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  console.log(arr);
  myBlog.innerHTML = ''; 
  arr.map((item) => {
    myBlog.innerHTML += `
      <div class="card p-4 mt-2">
        <div class="card-body">
          <p><span class="h4">Title:</span> ${item.title}</p>
          <p><span class="h4">Description:</span> ${item.description}</p>
        </div>
      </div>
    `;
  });
}


getDataFromFirestore();


const form = document.querySelector('#form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const myBlog = document.querySelector('#myBlog');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title: title.value,
      description: description.value,
      uid: auth.currentUser ? auth.currentUser.uid : "anonymous",
      email: auth.currentUser ? auth.currentUser.email : "anonymous"
    });
    console.log("Document written with ID: ", docRef.id);
    getDataFromFirestore();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
