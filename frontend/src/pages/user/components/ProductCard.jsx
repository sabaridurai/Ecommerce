import { useCart } from "../../../context/CartContext";
import { backendURL } from "../../../services/api";
import { useState, useEffect, useRef } from "react";
  import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "@/utils/auth";
// Styles object - Unified Glass Theme
const styles = {
  card: {
    background: "#f8fafc",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    overflow: "hidden",
  },
  cardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 24px rgba(15, 23, 42, 0.12)",
    borderColor: "#cbd5f5",
  },
  imageContainer: {
    position: "relative",
    paddingTop: "75%",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.03)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  mediaWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  mediaSlide: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.6s ease",
    opacity: 0,
    transform: "scale(1.05)",
  },
  mediaSlideActive: {
    opacity: 1,
    transform: "scale(1)",
  },
  mediaSlideExit: {
    opacity: 0,
    transform: "scale(0.95)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
  imageHover: {
    transform: "scale(1.08)",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imagePlaceholder: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "48px",
    opacity: 0.3,
  },
  // Media indicators - dots
  mediaDots: {
    position: "absolute",
    bottom: "12px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "6px",
    zIndex: 3,
    background: "rgba(0,0,0,0.3)",
    padding: "6px 12px",
    borderRadius: "20px",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.3)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: 0,
  },
  dotActive: {
    background: "#667eea",
    transform: "scale(1.3)",
    boxShadow: "0 0 20px rgba(102, 126, 234, 0.4)",
  },
  dotHover: {
    background: "rgba(255,255,255,0.6)",
    transform: "scale(1.1)",
  },
  // Media type indicator
  mediaTypeBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 2,
    background: "rgba(102, 126, 234, 0.2)",
    color: "#a8b5ff",
    border: "1px solid rgba(102, 126, 234, 0.15)",
  },
  // Navigation arrows
  navArrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    transition: "all 0.3s ease",
    zIndex: 3,
    opacity: 0,
    padding: 0,
  },
  navArrowShow: {
    opacity: 1,
  },
  navArrowHover: {
    background: "rgba(102, 126, 234, 0.6)",
    transform: "translateY(-50%) scale(1.1)",
  },
  navArrowLeft: {
    left: "12px",
  },
  navArrowRight: {
    right: "12px",
  },
  // Badge overlays
  badgeContainer: {
    position: "absolute",
    top: "12px",
    right: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    zIndex: 2,
  },
  badge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  badgeNew: {
    background: "rgba(74, 222, 128, 0.15)",
    color: "#4ade80",
    border: "1px solid rgba(74, 222, 128, 0.15)",
  },
  badgeSale: {
    background: "rgba(251, 146, 60, 0.15)",
    color: "#fb923c",
    border: "1px solid rgba(251, 146, 60, 0.15)",
  },
  badgeFeatured: {
    background: "rgba(102, 126, 234, 0.15)",
    color: "#a8b5ff",
    border: "1px solid rgba(102, 126, 234, 0.15)",
  },
  wishlistButton: {
    position: "absolute",
    bottom: "56px",
    right: "12px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    transition: "all 0.3s ease",
    zIndex: 2,
  },
  wishlistButtonHover: {
    background: "rgba(239, 68, 68, 0.4)",
    borderColor: "rgba(239, 68, 68, 0.3)",
    transform: "scale(1.1)",
  },
  wishlistButtonActive: {
    background: "rgba(239, 68, 68, 0.3)",
    color: "#ef4444",
  },
  content: {
    padding: "20px 20px 24px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    background: "rgba(255, 255, 255, 0.02)",
  },
  categoryTag: {
    fontSize: "11px",
    fontWeight: "600",
    color: "rgba(3, 121, 86, 0.82)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  name: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#001f27",
    margin: 0,
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    minHeight: "44px",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
  },
  stars: {
    display: "flex",
    gap: "2px",
    color: "#fbbf24",
  },
  ratingText: {
    fontSize: "13px",
    color: "rgb(46, 131, 0)",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "4px",
  },
  price: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#fff",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textShadow: "none",
  },
  originalPrice: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.2)",
    textDecoration: "line-through",
  },
  discount: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#4ade80",
    background: "rgba(74, 222, 128, 0.1)",
    padding: "2px 10px",
    borderRadius: "12px",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(74, 222, 128, 0.1)",
  },
  stockContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
  },
  stockBar: {
    flex: 1,
    height: "4px",
    borderRadius: "2px",
    background: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
  },
  stockBarFill: {
    height: "100%",
    borderRadius: "2px",
    transition: "width 0.5s ease",
  },
  stockBarLow: {
    background: "linear-gradient(90deg, #ef4444, #f59e0b)",
  },
  stockBarMedium: {
    background: "linear-gradient(90deg, #f59e0b, #4ade80)",
  },
  stockBarHigh: {
    background: "linear-gradient(90deg, #4ade80, #34d399)",
  },
  stockText: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.3)",
    whiteSpace: "nowrap",
  },
  stockTextLow: {
    color: "#ef4444",
  },
  stockTextMedium: {
    color: "#f59e0b",
  },
  stockTextHigh: {
    color: "#4ade80",
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    gap: "8px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(255, 255, 255, 0.04)",
  },
  addToCartButton: {
    flex: 1,
    padding: "12px 20px",
    background: "rgba(4, 34, 169, 0.66)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(102, 126, 234, 0.15)",
    borderRadius: "12px",
    color: "#fff7f7",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    position: "relative",
    overflow: "hidden",
  },
  addToCartButtonHover: {
    background: "rgba(26, 167, 255, 0.84)",
    borderColor: "rgba(0, 0, 0, 0.59)",
    transform: "scale(1.02)",
    boxShadow: "0 8px 30px rgba(102, 126, 234, 0.15)",
  },
  addToCartButtonActive: {
    transform: "scale(0.95)",
  },
  addToCartButtonAdded: {
    background: "rgba(6, 211, 81, 0.92)",
    borderColor: "rgba(74, 222, 128, 0.2)",
    boxShadow: "0 8px 30px rgba(74, 222, 128, 0.15)",
  },
  buttonShimmer: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
    animation: "shimmer 2s infinite",
  },
  buttonIcon: {
    fontSize: "18px",
  },
  buyNowButton: {
    padding: "12px 20px",
    background: "rgb(255, 217, 1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "12px",
    color: "rgb(0, 0, 0)",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
  },
  buyNowButtonHover: {
    background: "rgb(255, 185, 0)",
    borderColor: "rgba(0, 0, 0, 0.12)",
    transform: "scale(1.03)",
    boxShadow: "0 10px 22px rgba(255, 217, 1, 0.4)",
    color: "#111827",
  },
  outOfStock: {
    padding: "12px",
    background: "rgba(239, 68, 68, 0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "12px",
    color: "#ef4444",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    border: "1px solid rgba(239, 68, 68, 0.08)",
  },
  glassReflection: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%)",
    pointerEvents: "none",
    borderRadius: "20px 20px 0 0",
  },
  glassBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.03)",
    pointerEvents: "none",
  },
};

// Keyframes
const keyframes = `
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

// Add keyframes to document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isWishlistHovered, setIsWishlistHovered] = useState(false);
  const [isAddToCartHovered, setIsAddToCartHovered] = useState(false);
  const [isAddToCartPressed, setIsAddToCartPressed] = useState(false);
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const [isBuyNowHovered, setIsBuyNowHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(null);
  const [showArrows, setShowArrows] = useState(false);
  const slideInterval = useRef(null);
  const videoRefs = useRef({});

  // Collect all media (images and videos)
  const mediaItems = [];

  // Add images
  if (product.images && product.images.length > 0) {
    product.images.forEach((img, index) => {
      mediaItems.push({
        type: "image",
        src: `${backendURL}${img}`,
        id: `img-${index}`,
      });
    });
  }

  // Add videos
  if (product.videos && product.videos.length > 0) {
    product.videos.forEach((video, index) => {
      mediaItems.push({
        type: "video",
        src: `${backendURL}${video}`,
        id: `video-${index}`,
      });
    });
  }

  // If no media, use placeholder
  if (mediaItems.length === 0) {
    mediaItems.push({
      type: "placeholder",
      src: null,
      id: "placeholder",
    });
  }

  const hasMultipleMedia = mediaItems.length > 1;

  // Auto-slide when hovered
  useEffect(() => {
    if (isHovered && hasMultipleMedia) {
      slideInterval.current = setInterval(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
      }, 3000);
    } else {
      clearInterval(slideInterval.current);
      if (!isHovered) {
        setCurrentMediaIndex(0);
      }
    }

    return () => clearInterval(slideInterval.current);
  }, [isHovered, hasMultipleMedia, mediaItems.length]);

  // Handle video playback
  useEffect(() => {
    // Pause all videos when not hovered
    Object.values(videoRefs.current).forEach((videoRef) => {
      if (videoRef) {
        if (!isHovered) {
          videoRef.pause();
          videoRef.currentTime = 0;
        }
      }
    });

    // Play current video if hovered and it's a video
    if (isHovered) {
      const currentMedia = mediaItems[currentMediaIndex];
      if (currentMedia?.type === "video") {
        const videoRef = videoRefs.current[currentMedia.id];
        if (videoRef) {
          videoRef.play().catch(() => {});
        }
      }
    }
  }, [isHovered, currentMediaIndex, mediaItems]);

  const goToMedia = (index) => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentMediaIndex(index);
    setTimeout(() => setIsSliding(false), 800);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    const newIndex = currentMediaIndex === 0 ? mediaItems.length - 1 : currentMediaIndex - 1;
    goToMedia(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const newIndex = (currentMediaIndex + 1) % mediaItems.length;
    goToMedia(newIndex);
  };

  const stockPercentage = product.stock
    ? Math.min((product.stock / 100) * 100, 100)
    : 0;
  const isLowStock = product.stock && product.stock < 10;
  const isOutOfStock = product.stock === 0 || !product.stock;

  // Mock rating
  const rating = product.rating || 4.5;
  const totalReviews = product.reviews || 128;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const getStockStatus = () => {
    if (isOutOfStock)
      return { text: "Out of Stock", color: "#ef4444", class: styles.stockTextLow };
    if (isLowStock)
      return { text: "Low Stock", color: "#ef4444", class: styles.stockTextLow };
    if (stockPercentage > 70)
      return { text: "In Stock", color: "#4ade80", class: styles.stockTextHigh };
    return { text: "Limited Stock", color: "#f59e0b", class: styles.stockTextMedium };
  };

  const stockStatus = getStockStatus();

  const getStockBarColor = () => {
    if (isOutOfStock) return styles.stockBarLow;
    if (isLowStock) return styles.stockBarLow;
    if (stockPercentage > 70) return styles.stockBarHigh;
    return styles.stockBarMedium;
  };

  // Check if current media is video
  const currentMedia = mediaItems[currentMediaIndex] || mediaItems[0];
  const isVideo = currentMedia?.type === "video";






const navigate = useNavigate();

const handleBuyNow_card = (product) => {

    setIsCheckoutActive(true);
    setTimeout(() => setIsCheckoutActive(false), 200);
  if (!isLoggedIn()) {
    localStorage.setItem("redirectAfterLogin", "/checkout");
    navigate("/login");
    return;
  }

  localStorage.setItem("checkoutType", "buyNow");
  localStorage.setItem("buyNowProduct", JSON.stringify(product));

  navigate("/checkout");
};






  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {}),
        animation: "slideUp 0.5s ease-out",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass Reflection Effect */}
      <div style={styles.glassReflection} />
      <div style={styles.glassBorder} />

      {/* Image/Video Container */}
      <div style={styles.imageContainer}>
        <div
          style={styles.mediaWrapper}
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          {/* Media Items */}
          {mediaItems.map((media, index) => {
            const isActive = index === currentMediaIndex;
            const isExit = index === (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;

            if (media.type === "image") {
              return (
                <div
                  key={media.id}
                  style={{
                    ...styles.mediaSlide,
                    ...(isActive ? styles.mediaSlideActive : {}),
                    ...(isExit && !isActive ? styles.mediaSlideExit : {}),
                  }}
                >
                  {!imageError ? (
                    <img
                      src={media.src}
                      alt={product.name}
                      style={{
                        ...styles.image,
                        ...(isHovered ? styles.imageHover : {}),
                      }}
                      onError={() => setImageError(true)}
                      loading="lazy"
                    />
                  ) : (
                    <div style={styles.imagePlaceholder}>🛡️</div>
                  )}
                </div>
              );
            } else if (media.type === "video") {
              return (
                <div
                  key={media.id}
                  style={{
                    ...styles.mediaSlide,
                    ...(isActive ? styles.mediaSlideActive : {}),
                    ...(isExit && !isActive ? styles.mediaSlideExit : {}),
                  }}
                >
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[media.id] = el;
                    }}
                    src={media.src}
                    style={styles.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={media.id}
                  style={{
                    ...styles.mediaSlide,
                    ...(isActive ? styles.mediaSlideActive : {}),
                  }}
                >
                  <div style={styles.imagePlaceholder}>🛡️</div>
                </div>
              );
            }
          })}

          {/* Media Type Badge */}
          {isVideo && (
            <div style={styles.mediaTypeBadge}>
              ▶️ Video
            </div>
          )}

          {/* Navigation Arrows */}
          {hasMultipleMedia && isHovered && (
            <>
              <button
                style={{
                  ...styles.navArrow,
                  ...styles.navArrowLeft,
                  ...(showArrows ? styles.navArrowShow : {}),
                }}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.navArrowHover)
                }
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                  e.currentTarget.style.background = "rgba(0,0,0,0.4)";
                }}
                onClick={goToPrevious}
              >
                ‹
              </button>
              <button
                style={{
                  ...styles.navArrow,
                  ...styles.navArrowRight,
                  ...(showArrows ? styles.navArrowShow : {}),
                }}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.navArrowHover)
                }
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                  e.currentTarget.style.background = "rgba(0,0,0,0.4)";
                }}
                onClick={goToNext}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Media Dots */}
        {hasMultipleMedia && (
          <div style={styles.mediaDots}>
            {mediaItems.map((_, index) => (
              <button
                key={index}
                style={{
                  ...styles.dot,
                  ...(index === currentMediaIndex ? styles.dotActive : {}),
                  ...(hoveredDot === index ? styles.dotHover : {}),
                }}
                onMouseEnter={() => setHoveredDot(index)}
                onMouseLeave={() => setHoveredDot(null)}
                onClick={() => goToMedia(index)}
              />
            ))}
          </div>
        )}

        {/* Badges - Right side */}
        <div style={styles.badgeContainer}>
          {product.isNew && (
            <span style={{ ...styles.badge, ...styles.badgeNew }}>✨ New</span>
          )}
          {product.isSale && (
            <span style={{ ...styles.badge, ...styles.badgeSale }}>🔥 Sale</span>
          )}
          {product.isFeatured && (
            <span style={{ ...styles.badge, ...styles.badgeFeatured }}>
              ⭐ Featured
            </span>
          )}
          {isOutOfStock && (
            <span style={{ ...styles.badge, ...styles.badgeSale }}>Sold Out</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          style={{
            ...styles.wishlistButton,
            ...(isWishlistHovered ? styles.wishlistButtonHover : {}),
            ...(isWishlisted ? styles.wishlistButtonActive : {}),
          }}
          onMouseEnter={() => setIsWishlistHovered(true)}
          onMouseLeave={() => setIsWishlistHovered(false)}
          onClick={handleWishlist}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {product.category && (
          <span style={styles.categoryTag}>{product.category}</span>
        )}

        <h3 style={styles.name}>{product.name}</h3>

        {/* Rating */}
        <div style={styles.ratingContainer}>
          <div style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < fullStars ? "⭐" : i === fullStars && hasHalfStar ? "⭐" : "☆"}
              </span>
            ))}
          </div>
          <span style={styles.ratingText}>({totalReviews} reviews)</span>
        </div>

        {/* Price */}
        <div style={styles.priceContainer}>
          <span style={styles.price}>₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span style={styles.originalPrice}>₹{product.originalPrice}</span>
              <span style={styles.discount}>
                -
                {Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) *
                    100
                )}
                %
              </span>
            </>
          )}
        </div>

        {/* Stock */}
        <div style={styles.stockContainer}>
          <div style={styles.stockBar}>
            <div
              style={{
                ...styles.stockBarFill,
                ...getStockBarColor(),
                width: isOutOfStock ? "0%" : `${stockPercentage}%`,
              }}
            />
          </div>
          <span style={{ ...styles.stockText, ...stockStatus.class }}>
            {stockStatus.text}
          </span>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          {!isOutOfStock ? (
            <>
              <button
                style={{
                  ...styles.addToCartButton,
                  ...(isAdded ? styles.addToCartButtonAdded : {}),
                  ...(isAddToCartHovered && !isAdded
                    ? styles.addToCartButtonHover
                    : {}),
                  ...(isAddToCartPressed ? styles.addToCartButtonActive : {}),
                }}
                onMouseEnter={() => setIsAddToCartHovered(true)}
                onMouseLeave={() => {
                  setIsAddToCartHovered(false);
                  setIsAddToCartPressed(false);
                }}
                onMouseDown={() => setIsAddToCartPressed(true)}
                onMouseUp={() => setIsAddToCartPressed(false)}
                onClick={handleAddToCart}
              >
                <div style={styles.buttonShimmer} />
                <span style={styles.buttonIcon}>{isAdded ? "✅" : "🛒"}</span>
                {isAdded ? "Added!" : "Add to Cart"}
              </button>
             <button
  style={{
    ...styles.buyNowButton,
    ...(isBuyNowHovered ? styles.buyNowButtonHover : {}),
  }}
  onMouseEnter={() => setIsBuyNowHovered(true)}
  onMouseLeave={() => setIsBuyNowHovered(false)}
 onClick={() => handleBuyNow_card(product)}
>
  Buy Now
</button>
            </>
          ) : (
            <div style={styles.outOfStock}>⛔ Out of Stock</div>
          )}
        </div>
      </div>
    </div>
  );
}