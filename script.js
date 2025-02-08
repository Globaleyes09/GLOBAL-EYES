let posts = [];

function addPost() {
    let text = document.getElementById("newPost").value;
    if (text.trim() !== "") {
        posts.push({ id: posts.length + 1, text, likes: 0, comments: [] });
        document.getElementById("newPost").value = "";
        displayPosts();
    }
}

function likePost(id) {
    posts = posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post);
    posts.sort((a, b) => b.likes - a.likes);
    displayPosts();
}

function addComment(id) {
    let comment = prompt("Masukkan komentar:");
    if (comment) {
        posts = posts.map(post => 
            post.id === id ? { ...post, comments: [...post.comments, comment] } : post
        );
        displayPosts();
    }
}

function displayPosts() {
    let postContainer = document.getElementById("posts");
    postContainer.innerHTML = "";

    posts.forEach(post => {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <p>${post.text}</p>
            <button onclick="likePost(${post.id})">👍 ${post.likes}</button>
            <button onclick="addComment(${post.id})">💬 Komentar</button>
            <div class="comments">
                ${post.comments.map(cmt => `<p>➤ ${cmt}</p>`).join("")}
            </div>
        `;
        postContainer.appendChild(postDiv);
    });
}
