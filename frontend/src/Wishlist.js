import React, { useState, useEffect } from "react";
import API from "./axiosConfig";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await API.get("/wishlist");
      setWishlist(res.data);
    } catch (err) {
      console.log("Error fetching wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await API.delete(`/wishlist/remove/${productId}`);
      fetchWishlist();
      alert("Removed from wishlist ✅");
    } catch (err) {
      alert("Error removing from wishlist ❌");
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart ✅");
  };

  if (loading) {
    return <div className="loading">Loading wishlist... ⏳</div>;
  }

  if (!wishlist || wishlist.products.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="empty-wishlist">
          <h2>Your wishlist is empty ❤️</h2>
          <p>Add items to your wishlist while shopping</p>
          <a href="/" className="btn-continue">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1>❤️ My Wishlist</h1>

      <div className="wishlist-grid">
        {wishlist.products.map((product) => (
          <div key={product._id} className="wishlist-card">
            <img src={product.image} alt={product.name} />
            <div className="card-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <div className="price">₹{product.price}</div>

              <button
                className="btn-add-cart"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="btn-remove"
                onClick={() => removeFromWishlist(product._id)}
              >
                Remove from Wishlist
              </button>
              <a href={`/product/${product._id}`} className="btn-view">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
