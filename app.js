// script.js

const BASE_URL = "https://jsonplaceholder.typicode.com/";

// Generic API Handler
async function apiRequest(endpoint, method = "GET", data = null) {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (data) options.body = JSON.stringify(data);

    const response = await fetch(BASE_URL + endpoint, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

// Example CRUD Operations
async function performCRUD() {
  const output = document.getElementById("output");

  // 1. GET all posts
  output.innerHTML = "<h3>Fetching posts...</h3>";
  let posts = await apiRequest("posts");
  if (posts.error) return (output.innerHTML = `<p>${posts.error}</p>`);
  output.innerHTML = `<h3>Posts:</h3><pre>${JSON.stringify(posts.slice(0, 5), null, 2)}</pre>`;

  // 2. POST: Add a new post
  const newPost = {
    title: "My New Post",
    body: "This is the content of my new post.",
    userId: 1,
  };
  let createdPost = await apiRequest("posts", "POST", newPost);
  if (createdPost.error) return (output.innerHTML = `<p>${createdPost.error}</p>`);
  output.innerHTML += `<h3>New Post Created:</h3><pre>${JSON.stringify(createdPost, null, 2)}</pre>`;

  // 3. PUT: Update a post
  const updatedPost = {
    title: "Updated Title",
    body: "Updated content for the post.",
  };
  let updated = await apiRequest("posts/1", "PUT", updatedPost);
  if (updated.error) return (output.innerHTML = `<p>${updated.error}</p>`);
  output.innerHTML += `<h3>Post Updated:</h3><pre>${JSON.stringify(updated, null, 2)}</pre>`;

  // 4. PATCH: Partial update a post
  const partialUpdate = { title: "Partially Updated Title" };
  let patched = await apiRequest("posts/1", "PATCH", partialUpdate);
  if (patched.error) return (output.innerHTML = `<p>${patched.error}</p>`);
  output.innerHTML += `<h3>Post Partially Updated:</h3><pre>${JSON.stringify(patched, null, 2)}</pre>`;

  // 5. DELETE: Delete a post
  let deleted = await apiRequest("posts/1", "DELETE");
  if (deleted.error) return (output.innerHTML = `<p>${deleted.error}</p>`);
  output.innerHTML += `<h3>Post Deleted:</h3><p>Post ID 1 deleted successfully!</p>`;
}

// Execute CRUD Operations
performCRUD();
