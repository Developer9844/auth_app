document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const postsContainer = document.getElementById("posts-container");
    const profileForm = document.getElementById("profile-form");
    const addPostForm = document.getElementById("add-post-form");
    const logoutBtn = document.getElementById("logout-btn");
    const userPostsContainer = document.getElementById("user-posts-container");


    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://127.0.0.1:5000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const result = await response.json();
                if (response.ok && result.access_token) {
                    localStorage.setItem("token", result.access_token);
                    console.log("Token saved:", result.access_token);
                    alert("Login successful!");
                    window.location.href = "/posts";
                } else {
                    alert(result.message || "Login failed");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }

    // Handle Register
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const full_name = document.getElementById("fullname").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://127.0.0.1:5000/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, full_name, password }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Registration successful! Please login.");
                    window.location.href = "/";
                } else {
                    alert(result.message || "Registration failed");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }

    if (postsContainer) {
        async function fetchPosts() {
            postsContainer.innerHTML = ""; // Clear previous content

            const token = localStorage.getItem("token");

            if (!token) {
                alert("You are not logged in!");
                window.location.href = "/";
                return;
            }

            try {
                console.log("Using Token:", token);  // Debugging

                const response = await fetch("http://127.0.0.1:5000/api/posts/full", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                console.log("Response Status:", response.status);

                if (!response.ok) {
                    throw new Error(`Error fetching posts: ${response.status}`);
                }

                const posts = await response.json();
                console.log("Fetched Posts:", posts);

                if (posts.length === 0) {
                    postsContainer.innerHTML = "<p>No posts available.</p>";
                    return;
                }

                const fragment = document.createDocumentFragment();

                posts.forEach(post => {
                    const postElement = document.createElement("div");
                    postElement.classList.add("post");
                    postElement.innerHTML = `
                    <h3>${post.full_name} (@${post.username})</h3>
                    <p>${post.content}</p>
                    <hr>
                `;
                    fragment.appendChild(postElement);
                });

                postsContainer.appendChild(fragment);

            } catch (error) {
                console.error("Error fetching posts:", error);
                postsContainer.innerHTML = `<p>Error loading posts.</p>`;
            }
        }

        // Call fetchPosts immediately when the script runs
        fetchPosts();

        async function fetchUserPosts() {
            if (!userPostsContainer) return;

            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in!");
                window.location.href = "/";
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:5000/api/my-posts", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error fetching posts: ${response.status}`);
                }

                const posts = await response.json();
                userPostsContainer.innerHTML = "";

                if (posts.length === 0) {
                    userPostsContainer.innerHTML = "<p>You have no posts yet.</p>";
                    return;
                }

                posts.forEach(post => {
                    const postElement = document.createElement("div");
                    postElement.classList.add("user-post");
                    postElement.innerHTML = `
                <textarea id="edit-post-${post.id}">${post.content}</textarea>
                <button onclick="updatePost(${post.id})">Update</button>
                <button onclick="deletePost(${post.id})">Delete</button>
                <hr>
            `;
                    userPostsContainer.appendChild(postElement);
                });

            } catch (error) {
                console.error("Error fetching user posts:", error);
                userPostsContainer.innerHTML = `<p>Error loading posts.</p>`;
            }
        }
        fetchUserPosts()
        window.fetchUserPosts = fetchUserPosts;

        // Handle Add Post
        if (addPostForm) {
            addPostForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const content = document.getElementById("post-content").value;
                const token = localStorage.getItem("token");

                if (!token) {
                    alert("You must be logged in to post.");
                    return;
                }

                try {
                    const response = await fetch("http://127.0.0.1:5000/api/posts", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ content })
                    });

                    console.log("Response Status:", response.status); // Debugging

                    const result = await response.json();
                    console.log("Server Response:", result); // Debugging

                    if (response.ok) {
                        alert("Post added successfully!");
                        document.getElementById("post-content").value = "";
                        await fetchPosts(); // Refresh posts
                    } else {
                        alert(result.message || "Failed to add post");
                    }
                } catch (error) {
                    console.error("Error adding post:", error);
                    alert("An error occurred while adding the post.");
                }
            });
        }
    }


    // Handle Profile Update
    if (profileForm) {
        profileForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to access this page.");
                window.location.href = "/";
                return;
            }

            // Ensure elements exist before accessing value
            const username = document.getElementById("username")?.value.trim() || "";
            const bio = document.getElementById("bio")?.value.trim() || "";
            const fullName = document.getElementById("full_name")?.value.trim() || "";
            const profilePic = document.getElementById("profile_pic")?.value.trim() || "";
            const oldPassword = document.getElementById("old-password")?.value || "";
            const newPassword = document.getElementById("new-password")?.value || "";

            let updateData = {};
            if (username) updateData.username = username;
            if (bio) updateData.bio = bio;
            if (fullName) updateData.full_name = fullName;
            if (profilePic) updateData.profile_pic = profilePic;
            if (oldPassword && newPassword) {
                updateData.old_password = oldPassword;
                updateData.new_password = newPassword;
            }

            // Log data before sending
            console.log("Sending data:", JSON.stringify(updateData));

            try {
                const response = await fetch("http://127.0.0.1:5000/api/profile", {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updateData)
                });

                const result = await response.json();
                console.log("Response:", result);

                if (response.ok) {
                    alert("Profile updated successfully!");
                } else {
                    alert(result.error || "Profile update failed");
                }
            } catch (error) {
                console.error("Error updating profile:", error);
                alert("An error occurred while updating the profile");
            }
        });

        
    }
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token"); // Remove stored token
            sessionStorage.clear(); // Clear session storage
            alert("You have been logged out.");
            window.location.href = "/"; // Redirect to login page
        });
    }
});

// Update Post
async function updatePost(postId) {
    const token = localStorage.getItem("token");
    const updatedContent = document.getElementById(`edit-post-${postId}`).value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: updatedContent })
        });

        if (response.ok) {
            alert("Post updated successfully!");
            fetchUserPosts();  // Refresh posts
        } else {
            const result = await response.json();
            alert(result.message || "Failed to update post");
        }
    } catch (error) {
        console.error("Error updating post:", error);
        alert("An error occurred while updating the post.");
    }
}

// Delete Post
async function deletePost(postId) {
    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            alert("Post deleted successfully!");
            fetchUserPosts();  // Refresh posts
        } else {
            const result = await response.json();
            alert(result.message || "Failed to delete post");
        }
    } catch (error) {
        console.error("Error deleting post:", error);
        alert("An error occurred while deleting the post.");
    }
}

