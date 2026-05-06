import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "./axiosConfig";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.log("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cart.push({ ...product, quantity: parseInt(quantity) });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart ✅");
  };

  const handleAddToWishlist = async () => {
    if (!user._id) {
      alert("Please login to add to wishlist ❌");
      return;
    }

    try {
      await API.post(`/wishlist/add/${product._id}`);
      alert("Added to wishlist ❤️");
    } catch (err) {
      alert("Failed to add to wishlist ❌");
    }
  };

  const handleAddReview = async () => {
    if (!user._id) {
      alert("Please login to add a review ❌");
      return;
    }

    try {
      await API.post(`/products/${id}/reviews`, newReview);
      setNewReview({ rating: 5, comment: "" });
      fetchProduct();
      alert("Review added ✅");
    } catch (err) {
      alert("Failed to add review ❌");
    }
  };

  if (loading) {
    return <div className="loading">Loading product details... ⏳</div>;
  }

  if (!product) {
    return <div className="error-message">Product not found ❌</div>;
  }

  const images = product.images || [product.image];

  return (
    <div className="product-details">
      <div className="details-container">
        {/* Image Section */}
        <div className="image-section">
          <div className="main-image">
            {images[selectedImage] ? (
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=Product+Image";
                }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f0f0f0', color: '#999' }}>
                📷 No Image Available
              </div>
            )}
          </div>
          <div className="thumbnail-images">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img || "https://via.placeholder.com/80x80?text=Thumbnail"}
                alt="thumbnail"
                className={selectedImage === idx ? "active" : ""}
                onClick={() => setSelectedImage(idx)}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x80?text=Thumbnail";
                }}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>

          <div className="rating">
            <span>⭐ {product.rating ? product.rating.toFixed(1) : "N/A"}</span>
            <span>({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="price">₹{product.price}</div>

          {product.specifications && (
            <div className="specifications">
              <h3>Specifications</h3>
              {product.specifications.brand && (
                <p>
                  <strong>Brand:</strong> {product.specifications.brand}
                </p>
              )}
              {product.specifications.model && (
                <p>
                  <strong>Model:</strong> {product.specifications.model}
                </p>
              )}
              {product.specifications.warranty && (
                <p>
                  <strong>Warranty:</strong> {product.specifications.warranty}
                </p>
              )}
              {product.specifications.color && (
                <p>
                  <strong>Colors:</strong> {product.specifications.color.join(", ")}
                </p>
              )}
            </div>
          )}

          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="actions">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock || 10}
                  value={quantity}
                  onChange={(e) => {
                    const inputVal = e.target.value;
                    if (inputVal === "") {
                      setQuantity("");
                      return;
                    }
                    let num = parseInt(inputVal);
                    if (!isNaN(num)) {
                      num = Math.max(1, Math.min(num, product.stock || 10));
                      setQuantity(num);
                    }
                  }}
                  onBlur={() => {
                    if (!quantity || quantity < 1) {
                      setQuantity(1);
                    }
                  }}
                />
                <button
                  className="qty-btn"
                  onClick={() => {
                    const maxStock = product.stock || 10;
                    if (quantity < maxStock) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  disabled={quantity >= (product.stock || 10)}
                >
                  +
                </button>
              </div>
            </div>

            <button className="btn-cart" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="btn-wishlist" onClick={handleAddToWishlist}>
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        {user._id && (
          <div className="add-review">
            <h3>Add Your Review</h3>
            <div className="review-form">
              <div className="form-group">
                <label>Rating:</label>
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: e.target.value })
                  }
                >
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <textarea
                placeholder="Write your comment..."
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              ></textarea>
              <button onClick={handleAddReview}>Submit Review</button>
            </div>
          </div>
        )}

        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <div key={idx} className="review-item">
                <div className="review-header">
                  <strong>{review.userName}</strong>
                  <span className="review-rating">⭐ {review.rating}</span>
                </div>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
