import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);

  } else {
    window.location = 'login.html'
  }
});


const logout = document.querySelector('#logOut')

logout.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('logout successfully');
    alert('logOut Succesfully')
    window.location = 'index.html'

  }).catch((error) => {
    console.log(error);
    alert(error)

  });

})




const form = document.querySelector('#form')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const myBlog = document.querySelector('#myBlog')


async function getDataFromFirestore() {
  const arr = []
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    arr.push(doc.data())
  });
  console.log(arr);
  arr.map((item) => {
    myBlog.innerHTML += `
    
    <div class= "card p-4 mt-2">
                <div class="card-body">
                    <p><span class="h4">Title:</span> ${item.title}</p>
                    <p><span class="h4">Description:</span>${item.description}</p>
                    <div><button type ="button" id="delete" class="btn btn-danger">Delete</button></div> 
                    
                </div>
            </div>
          `

  })
}


getDataFromFirestore()




form.addEventListener('submit', async (e) => {
  e.preventDefault();
  myBlog.innerHTML=''

  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title: title.value,
      description: description.value,
      uid: auth.currentUser.uid,
      email: auth.currentUser.email
    });
    console.log("Document written with ID: ", docRef.id);
    getDataFromFirestore()
  } catch (e) {
    console.error("Error adding document: ", e);
  }


})