import { useState, useEffect, useRef } from "react";
import { backendURL } from "../services/api";
import "./ProductCardView.css";

export default function ProductCardView({ products }) {
  const [sortBy, setSortBy] = useState("default");
  const [filterCategory, setFilterCategory] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = products.filter(p => 
    filterCategory === "all" || p.category === filterCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="products-app">
      {/* Header Section */}
      <div className="products-header">
        <h1 className="products-title">Our Collection</h1>
        <p className="products-subtitle">Discover amazing products handpicked for you</p>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="filter-group">
          <label className="filter-label">Category:</label>
          <select 
            className="filter-select" 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Sort by:</label>
          <select 
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="results-count">
          {sortedProducts.length} products found
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-container">
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const media = [
    ...(product.images || []).map((img) => ({
      type: "image",
      url: `${backendURL}${img}`,
    })),
    ...(product.videos || []).map((vid) => ({
      type: "video",
      url: `${backendURL}${vid}`,
    })),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);
  const autoSlideRef = useRef(null);

  const currentMedia = media[currentIndex];

  // Auto-slide on hover
  useEffect(() => {
    if (isHovering && media.length > 1) {
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
      }, 2000);
    } else {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isHovering, media.length]);

  // Handle video playback
  useEffect(() => {
    if (currentMedia?.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const goToSlide = (index, e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(index);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic here
    alert(`Added ${product.name} to cart!`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discountPercentage = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Media Container */}
      <div className="product-image-container">
        {currentMedia?.type === "image" ? (
          <img 
            src={currentMedia.url} 
            alt={product.name}
            className="media" 
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            className="media"
            src={currentMedia?.url}
            muted
            loop
            playsInline
          />
        )}

        {/* Navigation Arrows */}
        {media.length > 1 && isHovering && (
          <>
            <button className="nav-arrow prev" onClick={prevSlide}>‹</button>
            <button className="nav-arrow next" onClick={nextSlide}>›</button>
          </>
        )}

        {/* Wishlist Button */}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="discount-badge">
            -{discountPercentage}%
          </div>
        )}

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="stock-badge out-of-stock">Out of Stock</div>
        )}
        {product.stock > 0 && product.stock < 10 && (
          <div className="stock-badge low-stock">Only {product.stock} left!</div>
        )}

        {/* Dots Indicator */}
        {media.length > 1 && (
          <div className="dots">
            {media.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === currentIndex ? "active" : ""}`}
                onClick={(e) => goToSlide(i, e)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-category">
          <span className="category-badge">{product.category}</span>
        </div>

        <h3 className="product-title">{product.name}</h3>

        <div className="product-rating">
          <div className="stars">
            {'★'.repeat(Math.floor(product.rating || 4))}
            {'☆'.repeat(5 - Math.floor(product.rating || 4))}
          </div>
          <span className="rating-count">({product.reviews || 0})</span>
        </div>

        <p className={`product-description ${showFullDescription ? 'expanded' : ''}`}>
          {product.description}
        </p>

        {product.description?.length > 100 && (
          <button 
            className="read-more-btn"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? 'Show less' : 'Read more'}
          </button>
        )}

        <div className="product-price-section">
          <div className="price-container">
            <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          
          <div className="stock-info">
            <span className={`stock-indicator ${product.stock > 0 ? 'in-stock' : 'out-stock'}`} />
            <span className="stock-text">
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>
        </div>

        <button 
          className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}