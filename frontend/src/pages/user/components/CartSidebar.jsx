import { useCart } from "../../../context/CartContext";
import { useState, useEffect } from "react";
import { isLoggedIn } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

const styles = {
  // ----- OVERLAY -----
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    zIndex: 10000,
    opacity: 0,
    visibility: "hidden",
    transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
  overlayShow: {
    opacity: 1,
    visibility: "visible",
  },

  // ----- SIDEBAR -----
  sidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "460px",
    maxWidth: "92vw",
    background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)",
    boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.6)",
    zIndex: 10001,
    transform: "translateX(100%)",
    transition: "transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderLeft: "1px solid rgba(255,255,255,0.06)",
  },
  sidebarShow: {
    transform: "translateX(0)",
  },

  // ----- HEADER -----
  header: {
    padding: "28px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(20px)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  headerIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    boxShadow: "0 8px 30px rgba(120,80,255,0.3)",
  },
  headerTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  headerSubtitle: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    margin: 0,
    fontWeight: "400",
  },
  itemCount: {
    background: "rgba(255,255,255,0.06)",
    padding: "4px 14px",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  closeButton: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.6)",
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  closeButtonHover: {
    background: "rgba(255,70,180,0.15)",
    borderColor: "rgba(255,70,180,0.2)",
    color: "#ffffff",
    transform: "rotate(90deg) scale(1.05)",
  },

  // ----- BODY -----
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "20px 24px",
    background: "transparent",
  },

  // ----- EMPTY CART -----
  emptyCart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "420px",
    textAlign: "center",
  },
  emptyIconWrapper: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.04)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
    position: "relative",
  },
  emptyIcon: {
    fontSize: "56px",
    opacity: 0.4,
  },
  emptyGlow: {
    position: "absolute",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,80,255,0.1), transparent 70%)",
    animation: "pulseGlow 2s ease-in-out infinite",
  },
  emptyTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "8px",
  },
  emptySubtitle: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.35)",
    margin: 0,
    maxWidth: "280px",
  },

  // ----- CART ITEM -----
  cartItem: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "20px",
    padding: "18px 20px",
    marginBottom: "12px",
    border: "1px solid rgba(255,255,255,0.04)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    position: "relative",
    overflow: "hidden",
  },
  cartItemHover: {
    transform: "translateX(6px) scale(1.01)",
    borderColor: "rgba(120,80,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
  },
  itemGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "200px",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(120,80,255,0.03))",
    pointerEvents: "none",
  },
  itemInfo: {
    flex: 1,
    minWidth: 0,
    position: "relative",
    zIndex: 1,
  },
  itemName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
    marginBottom: "4px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  itemDetails: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    flexWrap: "wrap",
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #7850ff, #b28aff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    whiteSpace: "nowrap",
    position: "relative",
    zIndex: 1,
  },

  // ----- QUANTITY CONTROLS -----
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "12px",
    padding: "4px",
    border: "1px solid rgba(255,255,255,0.04)",
  },
  quantityButton: {
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.6)",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonHover: {
    background: "rgba(120,80,255,0.15)",
    color: "#ffffff",
    transform: "scale(1.05)",
  },
  quantityButtonActive: {
    transform: "scale(0.9)",
  },
  quantityDisplay: {
    minWidth: "32px",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
    color: "#ffffff",
    padding: "0 4px",
  },
  quantityDisplayAnimate: {
    animation: "quantityPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  // ----- RIGHT SECTION (price + controls) -----
  itemRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
    zIndex: 1,
  },

  removeButton: {
    background: "rgba(255,70,70,0.06)",
    border: "1px solid rgba(255,70,70,0.06)",
    color: "rgba(255,70,70,0.4)",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  removeButtonHover: {
    background: "rgba(255,70,70,0.15)",
    borderColor: "rgba(255,70,70,0.2)",
    color: "#ff6b6b",
    transform: "scale(1.05)",
  },

  // ----- FOOTER -----
  footer: {
    padding: "24px 32px 32px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(20px)",
    flexShrink: 0,
  },
  totalSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.5)",
    margin: 0,
  },
  totalAmount: {
    fontSize: "32px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: 0,
  },
  checkoutButton: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    color: "#ffffff",
    border: "none",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  checkoutButtonHover: {
    transform: "translateY(-2px) scale(1.01)",
    boxShadow: "0 12px 45px rgba(120,80,255,0.4)",
  },
  checkoutButtonActive: {
    transform: "scale(0.97)",
  },
  buttonShimmer: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
    animation: "shimmer 2.5s infinite",
  },
  checkoutIcon: {
    fontSize: "20px",
  },

  // ----- SAVINGS BADGE -----
  savingsBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "30px",
    background: "rgba(0,255,150,0.06)",
    border: "1px solid rgba(0,255,150,0.08)",
    fontSize: "12px",
    color: "rgba(0,255,150,0.6)",
    fontWeight: "500",
    marginBottom: "16px",
  },
};

const keyframes = `
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  @keyframes slideInItem {
    from {
      opacity: 0;
      transform: translateX(40px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.5); opacity: 1; }
  }
  
  @keyframes quantityPop {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);
}

export default function CartSidebar({ open, onClose }) {


    const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredRemove, setHoveredRemove] = useState(null);
  const [hoveredClose, setHoveredClose] = useState(false);
  const [hoveredCheckout, setHoveredCheckout] = useState(false);
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const [quantityAnimating, setQuantityAnimating] = useState(null);
  
  // Calculate total locally to ensure it updates correctly
  const [total, setTotal] = useState(0);

  // Update total whenever cart changes
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

const handleCheckout = () => {
  if (!isLoggedIn()) {
    localStorage.setItem(
      "redirectAfterLogin",
      "/checkout"
    );
    navigate("/login");
    return;
  }

  localStorage.setItem(
    "checkoutType",
    "cart"
  );

  localStorage.setItem(
    "buyNowProduct",
    JSON.stringify(cart)
  );

  navigate("/checkout");
};

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setQuantityAnimating(itemId);
    updateQuantity(itemId, newQuantity);
    setTimeout(() => setQuantityAnimating(null), 300);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isCartEmpty = cart.length === 0;
  const savings = Math.floor(total * 0.15);

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          ...styles.overlay,
          ...(open ? styles.overlayShow : {}),
        }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          ...(open ? styles.sidebarShow : {}),
        }}
      >
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>🛒</div>
            <div>
              <h2 style={styles.headerTitle}>Your Cart</h2>
              <p style={styles.headerSubtitle}>
                <span style={styles.itemCount}>
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </p>
            </div>
          </div>
          <button
            style={{
              ...styles.closeButton,
              ...(hoveredClose ? styles.closeButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredClose(true)}
            onMouseLeave={() => setHoveredClose(false)}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={styles.body}>
          {isCartEmpty ? (
            <div style={styles.emptyCart}>
              <div style={styles.emptyIconWrapper}>
                <div style={styles.emptyGlow} />
                <span style={styles.emptyIcon}>🛍️</span>
              </div>
              <h3 style={styles.emptyTitle}>Cart is Empty</h3>
              <p style={styles.emptySubtitle}>
                Start adding some amazing products to your cart!
              </p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.cartItem,
                    ...(hoveredItem === item.id ? styles.cartItemHover : {}),
                    animation: "slideInItem 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div style={styles.itemGradient} />
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    <div style={styles.itemDetails}>
                      <span style={styles.itemPrice}>₹{item.price}</span>
                      {item.category && (
                        <span style={{ color: "rgba(0, 252, 151, 0.93)" }}>
                          • {item.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={styles.itemRight}>
                    {/* Quantity Controls */}
                    <div style={styles.quantityControls}>
                      <button
                        style={{
                          ...styles.quantityButton,
                          ...(hoveredRemove === `dec-${item.id}`
                            ? styles.quantityButtonHover
                            : {}),
                        }}
                        onMouseEnter={() => setHoveredRemove(`dec-${item.id}`)}
                        onMouseLeave={() => setHoveredRemove(null)}
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span
                        style={{
                          ...styles.quantityDisplay,
                          ...(quantityAnimating === item.id
                            ? styles.quantityDisplayAnimate
                            : {}),
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        style={{
                          ...styles.quantityButton,
                          ...(hoveredRemove === `inc-${item.id}`
                            ? styles.quantityButtonHover
                            : {}),
                        }}
                        onMouseEnter={() => setHoveredRemove(`inc-${item.id}`)}
                        onMouseLeave={() => setHoveredRemove(null)}
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      style={{
                        ...styles.removeButton,
                        ...(hoveredRemove === `remove-${item.id}`
                          ? styles.removeButtonHover
                          : {}),
                      }}
                      onMouseEnter={() => setHoveredRemove(`remove-${item.id}`)}
                      onMouseLeave={() => setHoveredRemove(null)}
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {!isCartEmpty && (
          <div style={styles.footer}>
            {/* Savings Badge */}
            {savings > 0 && (
              <div style={styles.savingsBadge}>
                <span>✨</span>
                You're saving ₹{savings} today!
              </div>
            )}

            <div style={styles.totalSection}>
              <span style={styles.totalLabel}>Total Amount</span>
              <span style={styles.totalAmount}>₹{total}</span>
            </div>

            <button
              style={{
                ...styles.checkoutButton,
                ...(hoveredCheckout ? styles.checkoutButtonHover : {}),
                ...(isCheckoutActive ? styles.checkoutButtonActive : {}),
              }}
              onMouseEnter={() => setHoveredCheckout(true)}
              onMouseLeave={() => setHoveredCheckout(false)}
              onMouseDown={() => setIsCheckoutActive(true)}
              onMouseUp={() => setIsCheckoutActive(false)}
              onClick={handleCheckout}
            >
              <div style={styles.buttonShimmer} />
              <span style={styles.checkoutIcon}>⚡</span>
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </>
  );
}