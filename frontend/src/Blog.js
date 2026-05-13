import React, { useState, useEffect } from "react";
import API from "./axiosConfig";
import "./Blog.css";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      setError("Failed to fetch blogs ❌");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="blog-container">
        <h1>Blog</h1>
        <div className="loading">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <h1>Blog</h1>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <h1>AI Generated Blog Posts</h1>
      <p className="blog-description">
        Discover our latest AI-generated content, automatically published daily.
      </p>

      {blogs.length === 0 ? (
        <div className="no-blogs">
          <p>No blog posts available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h2 className="blog-title">{blog.title}</h2>
              <div className="blog-meta">
                <span className="blog-date">
                  {formatDate(blog.createdAt)}
                </span>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="blog-tags">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="blog-content">
                {blog.content.length > 200
                  ? `${blog.content.substring(0, 200)}...`
                  : blog.content}
              </div>
              <button
                className="read-more-btn"
                onClick={() => {
                  // For now, just show full content in an alert
                  // In a real app, you'd navigate to a detail page
                  alert(blog.content);
                }}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;