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
