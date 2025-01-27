// script.js

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");
const postIdInput = document.getElementById("postId");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");

// Fetch and display posts
async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    const posts = await response.json();
    renderPosts(posts.slice(0, 10)); // Limit to 10 posts for simplicity
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Render posts in the UI
function renderPosts(posts) {
  postsContainer.innerHTML = "";
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <div class="actions">
        <button class="edit" onclick="editPost(${post.id})">Edit</button>
        <button class="delete" onclick="deletePost(${post.id})">Delete</button>
      </div>
    `;
    postsContainer.appendChild(postCard);
  });
}

// Add or update post
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const postId = postIdInput.value;
  const title = titleInput.value;
  const body = bodyInput.value;

  const postData = { title, body, userId: 1 };

  if (postId) {
    // Update existing post (PUT)
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const updatedPost = await response.json();
      console.log("Updated Post:", updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  } else {
    // Add new post (POST)
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const newPost = await response.json();
      console.log("New Post:", newPost);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  }

  postForm.reset();
  postIdInput.value = "";
  fetchPosts();
});

// Edit post
async function editPost(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const post = await response.json();

    postIdInput.value = post.id;
    titleInput.value = post.title;
    bodyInput.value = post.body;
  } catch (error) {
    console.error("Error fetching post for edit:", error);
  }
}

// Delete post
async function deletePost(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    console.log(`Post ${id} deleted`);
    fetchPosts();
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

// Initialize app
fetchPosts();
