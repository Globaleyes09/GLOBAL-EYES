document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
});

function addPost() {
    let postText = document.getElementById("newPost").value;
    if (postText.trim() === "") return;
    
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push({ text: postText, likes: 0 });
    localStorage.setItem("posts", JSON.stringify(posts));
    
    document.getElementById("newPost").value = "";
    loadPosts();
}

function loadPosts() {
    let postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";
    
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach((post, index) => {
        let postElement = document.createElement("div");
        postElement.innerHTML = `<p>${post.text}</p>
                                <button onclick="likePost(${index})">Like (${post.likes})</button>`;
        postsContainer.appendChild(postElement);
    });
}

function likePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts[index].likes += 1;
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

function searchPosts() {
    let query = document.getElementById("search").value.toLowerCase();
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let filteredPosts = posts.filter(post => post.text.toLowerCase().includes(query));
    
    let postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";
    
    filteredPosts.forEach((post, index) => {
        let postElement = document.createElement("div");
        postElement.innerHTML = `<p>${post.text}</p>
                                <button onclick="likePost(${index})">Like (${post.likes})</button>`;
        postsContainer.appendChild(postElement);
    });
}


// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtDGGX-S7hjgnxnHr2bE9lP0ROOKgGcYs",
  authDomain: "global-97c43.firebaseapp.com",
  projectId: "global-97c43",
  storageBucket: "global-97c43.appspot.com",
  messagingSenderId: "916302492967",
  appId: "1:916302492967:web:7ce9a498a5e7a6ec762502",
  measurementId: "G-1K6VGLCHS6"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi Menambahkan Komentar
async function addComment() {
    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();
    
    if (commentText !== "") {
        await addDoc(collection(db, "comments"), { text: commentText, timestamp: Date.now() });
        commentInput.value = "";
        fetchComments();
    }
}

// Fungsi Menampilkan Komentar
async function fetchComments() {
    const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    
    let commentList = "";
    querySnapshot.forEach((doc) => {
        commentList += `<p>${doc.data().text}</p>`;
    });
    
    document.getElementById("comment-section").innerHTML = commentList;
}

// Event Listener untuk Tombol Kirim
document.getElementById("send-comment").addEventListener("click", addComment);

// Panggil fungsi untuk menampilkan komentar saat halaman dimuat
fetchComments();
