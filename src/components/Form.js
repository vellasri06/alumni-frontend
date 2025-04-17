import React, { useState, useEffect } from "react";
import "./Forum.css";

const Forum = () => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("forumPosts")) || []
  );
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "" });
  const [newComment, setNewComment] = useState({});
  
  const categories = ["General Discussion", "Career & Jobs", "Startups", "Technical Talk", "Alumni Events"];

  // Save posts to local storage
  useEffect(() => {
    localStorage.setItem("forumPosts", JSON.stringify(posts));
  }, [posts]);

  // Add a new post
  const addPost = () => {
    if (newPost.title.trim() && newPost.content.trim() && newPost.category) {
      setPosts([...posts, { ...newPost, id: Date.now(), comments: [], votes: 0 }]);
      setNewPost({ title: "", content: "", category: "" });
    } else {
      alert("Please fill all fields before posting!");
    }
  };

  // Add a comment to a post
  const addComment = (postId) => {
    if (newComment[postId]?.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment[postId]] }
            : post
        )
      );
      setNewComment({ ...newComment, [postId]: "" });
    }
  };

  // Handle voting (Upvote/Downvote)
  const votePost = (postId, type) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, votes: type === "up" ? post.votes + 1 : post.votes - 1 }
          : post
      )
    );
  };

  return (
    <div className="forum-container">
      <h2>🎓 Alumni Forum</h2>

      {/* Create Post */}
      <div className="create-post">
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Post Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        ></textarea>
        <select
          value={newPost.category}
          onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={addPost}>Post</button>
      </div>

      {/* Forum Posts */}
      <div className="forum-posts">
        {posts.length === 0 ? (
          <p className="no-posts">No posts yet. Start the discussion!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="forum-post">
              <h3>{post.title}</h3>
              <p className="category">📌 {post.category}</p>
              <p>{post.content}</p>

              {/* Vote Section */}
              <div className="post-actions">
                <button onClick={() => votePost(post.id, "up")}>👍 {post.votes}</button>
                <button onClick={() => votePost(post.id, "down")}>👎</button>
              </div>

              {/* Comments Section */}
              <div className="comments">
                <h4>Comments</h4>
                {post.comments.length === 0 ? <p>No comments yet</p> : post.comments.map((c, idx) => <p key={idx}>🗨 {c}</p>)}
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment[post.id] || ""}
                  onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                />
                <button onClick={() => addComment(post.id)}>Comment</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forum;