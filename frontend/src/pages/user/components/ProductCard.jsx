import { useState } from "react";
import "./ProductCard.css";
import { backendURL } from "../../admin/services/api";


export default function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Calculate discount
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Format price for Amazon-style display
  const formatPrice = (price) => {
    const formatted = price.toLocaleString('en-IN');
    const [whole, fraction] = formatted.split('.');
    return { whole, fraction: fraction || '00' };
  };

  const currentPrice = formatPrice(product.price);
  const originalPrice = product.originalPrice ? formatPrice(product.originalPrice) : null;

  // Calculate saved amount
  const savedAmount = product.originalPrice 
    ? (product.originalPrice - product.price).toLocaleString('en-IN')
    : 0;

  // Generate star rating display
  const renderStars = (rating = 4.2) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="amazon-stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="amazon-star-filled">★</span>
        ))}
        {hasHalfStar && <span className="amazon-star-half">½</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="amazon-star-empty">☆</span>
        ))}
      </div>
    );
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (product.stock === 0) return;
    
    setIsAddingToCart(true);
    
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowNotification(true);
      if (onAddToCart) onAddToCart(product);
      setTimeout(() => setShowNotification(false), 3000);
    }, 400);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <>
      <div 
        className="amazon-product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="amazon-image-container">
          <div className="amazon-image-inner">
            {!imageLoaded && <div className="amazon-skeleton"></div>}
           <img
  src={
    product.images?.[0]
      ? `${backendURL}${product.images[0]}`
      : "https://via.placeholder.com/300x300?text=No+Image"
  }
  alt={product.name}
  className="amazon-product-img"
  style={{ opacity: imageLoaded ? 1 : 0 }}
  onLoad={() => setImageLoaded(true)}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
  }}
/>
          </div>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="amazon-badge amazon-badge-deal">
              -{discountPercentage}%
            </div>
          )}

          {/* Great Indian Festival badge */}
          {discountPercentage > 30 && (
            <div className="amazon-badge amazon-badge-great" style={{ top: '50px' }}>
              Great Deal
            </div>
          )}

          {/* Stock Badge */}
          {product.stock === 0 && (
            <div className="amazon-stock-badge">
              Out of Stock
            </div>
          )}

          {/* Wishlist Button */}
          <button 
            className="amazon-wishlist-btn"
            onClick={handleWishlist}
            style={{ 
              background: isWishlisted ? '#ffd814' : 'white',
              borderColor: isWishlisted ? '#fcd200' : '#d5d9d9'
            }}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>

          {/* Quick View Button */}
          {isHovered && product.stock > 0 && (
            <button 
              className="amazon-quickview-btn"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Quick view:", product);
              }}
            >
              Quick look
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="amazon-info">
          {/* Product Title */}
          <div className="amazon-product-title">
            {product.name}
          </div>

          {/* Rating Section */}
          <div className="amazon-rating">
            {renderStars(product.rating || 4.2)}
            <span className="amazon-rating-count">
              {product.reviewCount || Math.floor(Math.random() * 500) + 50}
            </span>
          </div>

          {/* Price Section */}
          <div className="amazon-price-section">
            <span className="amazon-price-currency">₹</span>
            <span className="amazon-price-whole">{currentPrice.whole}</span>
            <span className="amazon-price-fraction">.{currentPrice.fraction}</span>
            
            {originalPrice && (
              <>
                <span className="amazon-price-original">
                  ₹{originalPrice.whole}.{originalPrice.fraction}
                </span>
                <span className="amazon-price-saved">
                  (Save ₹{savedAmount})
                </span>
              </>
            )}
          </div>

          {/* Deal Row */}
          {discountPercentage > 0 && (
            <div className="amazon-deal-row">
              <span className="amazon-deal-badge">Deal of the Day</span>
              <span className="amazon-deal-text">
                {discountPercentage}% off
              </span>
            </div>
          )}

          {/* Prime Badge */}
          <div className="amazon-prime-badge">
            <span className="amazon-prime-icon">Prime</span>
            <span className="amazon-prime-text">FREE Delivery</span>
          </div>

          {/* Delivery Info */}
          <div className="amazon-delivery">
            Delivery <strong>Tomorrow</strong>
            {product.price > 999 && (
              <span className="amazon-delivery-free"> | FREE Delivery</span>
            )}
          </div>

          {/* Stock Status */}
          {product.stock > 0 && product.stock < 10 && (
            <div className="amazon-stock-info amazon-stock-low">
              Only {product.stock} left in stock.
            </div>
          )}
          {product.stock >= 10 && (
            <div className="amazon-stock-info">
              In stock
            </div>
          )}

          {/* Add to Cart Button */}
          <button 
            className={`amazon-add-btn 
              ${product.stock === 0 ? 'amazon-add-btn-disabled' : ''} 
              ${isAddingToCart ? 'amazon-add-btn-adding' : ''}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAddingToCart}
          >
            {isAddingToCart ? (
              <div className="amazon-spinner"></div>
            ) : (
              <>
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                {product.stock > 0 && ' 🛒'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showNotification && (
        <div className="amazon-toast">
          <div className="amazon-toast-icon">✓</div>
          <span>Added to Cart</span>
        </div>
      )}
    </>
  );
}