import React, { useState, useEffect } from "react";
import API from "./axiosConfig";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, search, selectedCategory, minPrice, maxPrice, sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch products ❌");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/products/categories/all");
      setCategories(res.data);
    } catch (err) {
      console.log("Error fetching categories");
    }
  };

  const filterProducts = () => {
    let filtered = products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory = !selectedCategory || product.category === selectedCategory;
      const matchPrice =
        product.price >= minPrice && product.price <= maxPrice;

      return matchSearch && matchCategory && matchPrice;
    });

    if (sort === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
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
    return <div className="loading">Loading products... ⏳</div>;
  }

  return (
    <div className="homepage">
      {/* Banner */}
      <div className="banner">
        <div className="banner-content">
          <h1>Welcome to Privon</h1>
          <p>Explore amazing products at unbeatable prices</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="price-filter">
            <label>Price Range</label>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {error && <div className="error-message">{error}</div>}

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <div className="rating">
                  ⭐ {product.rating ? product.rating.toFixed(1) : "N/A"}
                </div>
                <div className="price">₹{product.price}</div>
                <button
                  className="btn-add-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <a href={`/product/${product._id}`} className="btn-view">
                  View Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">No products found ❌</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
