import { useCart } from "./context/CartContext";
import { useState, useEffect } from "react";
import { isLoggedIn } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

// ============================================================
// STYLES - Premium Navbar
// ============================================================
const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 5000,
    background: 'rgba(10, 10, 20, 0.92)',
    backdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    padding: '10px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
    minHeight: '72px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '24px',
    fontWeight: '800',
    color: '#fff',
    textDecoration: 'none',
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  logoHover: {
    transform: 'scale(1.02)',
  },
  logoIcon: {
    fontSize: "32px",
    display: "inline-block",
    animation: "floatLogo 3s ease-in-out infinite",
    filter: 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.3))',
  },
  logoText: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 4s ease-in-out infinite',
    letterSpacing: '-0.5px',
  },
  logoBadge: {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
    padding: '2px 12px',
    borderRadius: '30px',
    fontSize: '9px',
    fontWeight: '700',
    color: '#a8b5ff',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },

  // ----- Right Section -----
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flexShrink: 0,
    flexWrap: 'wrap',
  },

  // ----- User Section -----
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '4px 12px 4px 4px',
    background: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '50px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    transition: 'all 0.3s ease',
  },
  userSectionHover: {
    background: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(102, 126, 234, 0.15)',
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    flexShrink: 0,
  },
  userAvatarHover: {
    borderColor: '#667eea',
    transform: 'scale(1.05)',
    boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  userName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0,
    lineHeight: 1.2,
  },
  userRole: {
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.3)',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  notificationDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#4ade80',
    animation: 'pulse 1.5s ease-in-out infinite',
    display: 'inline-block',
    marginLeft: '4px',
    flexShrink: 0,
  },

  // ----- Auth Buttons -----
  authButton: {
    padding: '8px 20px',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    fontFamily: 'inherit',
  },
  loginButton: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },
  loginButtonHover: {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
  },
  logoutButton: {
    background: 'rgba(239, 68, 68, 0.15)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.2)',
  },
  logoutButtonHover: {
    background: 'rgba(239, 68, 68, 0.25)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(239, 68, 68, 0.2)',
  },

  // ----- Divider -----
  divider: {
    width: '1px',
    height: '32px',
    background: 'rgba(255, 255, 255, 0.06)',
    flexShrink: 0,
  },

  // ----- Nav Buttons -----
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 18px',
    borderRadius: '50px',
    background: 'rgba(255, 255, 255, 0.04)',
    color: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    position: 'relative',
  },
  navButtonHover: {
    background: 'rgba(102, 126, 234, 0.12)',
    color: '#ffffff',
    borderColor: 'rgba(102, 126, 234, 0.2)',
    transform: 'translateY(-2px)',
  },
  navButtonActive: {
    background: 'rgba(102, 126, 234, 0.15)',
    color: '#ffffff',
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  navIcon: {
    fontSize: '16px',
  },
  navBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    background: '#ef4444',
    color: '#ffffff',
    fontSize: '8px',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '30px',
    animation: 'bounceIn 0.5s ease-out',
  },

  // ----- Cart Button -----
  cartButton: {
    position: 'relative',
    padding: '10px 22px 10px 18px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    border: 'none',
    borderRadius: '50px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    overflow: 'hidden',
    fontFamily: 'inherit',
  },
  cartButtonHover: {
    transform: 'translateY(-2px) scale(1.03)',
    boxShadow: '0 8px 40px rgba(102, 126, 234, 0.5)',
  },
  cartButtonActive: {
    transform: 'scale(0.95)',
  },
  cartIcon: {
    fontSize: '20px',
  },
  cartCount: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    padding: '2px 10px',
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: '700',
    minWidth: '24px',
    textAlign: 'center',
  },
  cartButtonShimmer: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
    animation: 'shimmer 3s infinite',
  },
};

// ============================================================
// KEYFRAMES
// ============================================================
const keyframes = `
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes floatLogo {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);
}

// ============================================================
// COMPONENT
// ============================================================
export default function Navbar({ onCartClick }) {
  const navigate = useNavigate();
  const { cart } = useCart();
  
  // State
  const [username, setUsername] = useState("Guest");
  const [loggedIn, setLoggedIn] = useState(false);
  const [session, setSession] = useState(null);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isCartPressed, setIsCartPressed] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);
  const [isOrdersHovered, setIsOrdersHovered] = useState(false);
  const [isPaymentHovered, setIsPaymentHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  // Load user data
 useEffect(() => {
  const storedUsername = localStorage.getItem("username");
  const accessToken = localStorage.getItem("access");

  const validUsername =
    storedUsername &&
    storedUsername !== "undefined" &&
    storedUsername !== "null";

  if (validUsername && accessToken) {
    setUsername(storedUsername);
    setLoggedIn(true);
  } else {
    setUsername("Guest");
    setLoggedIn(false);
  }
}, []);

  useEffect(() => {
    const s = localStorage.getItem("payment_session");
    if (s) setSession(JSON.parse(s));
  }, []);

  // Check for payment notification
  const showBadge = session &&
    ["PENDING_PAYMENT", "AWAITING_PROOF"].includes(session.status);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Handlers
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    setUsername("Guest");
    setLoggedIn(false);
    navigate("/login");
  };

  const handleCheckout = () => {
    if (!isLoggedIn()) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/login");
      return;
    }

    const product = JSON.parse(localStorage.getItem("buyNowProduct"));
    
    if (!product || product.length === 0) {
      // Check if cart has items
      if (cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out.");
        return;
      }
    }

    navigate("/checkout");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div 
        style={{
          ...styles.logo,
          ...(isLogoHovered ? styles.logoHover : {}),
        }}
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
        onClick={handleLogoClick}
      >
        <span style={styles.logoIcon}>🛡️</span>
        <span style={styles.logoText}>ABC-Tech</span>
        <span style={styles.logoBadge}>PRO</span>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {/* User Section */}
        <div 
          style={{
            ...styles.userSection,
            ...(isUserHovered ? styles.userSectionHover : {}),
          }}
          onMouseEnter={() => setIsUserHovered(true)}
          onMouseLeave={() => setIsUserHovered(false)}
        >
          <div
            style={{
              ...styles.userAvatar,
              ...(isAvatarHovered ? styles.userAvatarHover : {}),
            }}
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
            onClick={() => loggedIn ? navigate("/profile") : navigate("/login")}
          >
            👤
          </div>

          {loggedIn ? (
            <div style={styles.userInfo}>
              <p style={styles.userName}>
                {username}
                <span style={styles.notificationDot} />
              </p>
              <p style={styles.userRole}>Customer</p>
            </div>
          ) : (
            <div style={styles.userInfo}>
              <p style={styles.userName}>Guest</p>
              <p style={styles.userRole}>Not Signed In</p>
            </div>
          )}
        </div>

        <div style={styles.divider} />

        {/* Auth Button */}
        {loggedIn ? (
          <button
            style={{
              ...styles.authButton,
              ...styles.logoutButton,
              ...(isLogoutHovered ? styles.logoutButtonHover : {}),
            }}
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        ) : (
          <button
            style={{
              ...styles.authButton,
              ...styles.loginButton,
              ...(isLoginHovered ? styles.loginButtonHover : {}),
            }}
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
            onClick={() => navigate("/login")}
          >
            🔑 Login
          </button>
        )}

        <div style={styles.divider} />

        {/* Payment Button */}
        <button
          style={{
            ...styles.navButton,
            ...(isPaymentHovered ? styles.navButtonHover : {}),
            ...(showBadge ? styles.navButtonActive : {}),
          }}
          onMouseEnter={() => setIsPaymentHovered(true)}
          onMouseLeave={() => setIsPaymentHovered(false)}
          onClick={handleCheckout}
        >
          <span style={styles.navIcon}>💳</span>
          Payment
          {showBadge && (
            <span style={styles.navBadge}>!</span>
          )}
        </button>

        {/* Orders Button */}
        <button
          style={{
            ...styles.navButton,
            ...(isOrdersHovered ? styles.navButtonHover : {}),
          }}
          onMouseEnter={() => setIsOrdersHovered(true)}
          onMouseLeave={() => setIsOrdersHovered(false)}
          onClick={() => navigate("/orders")}
        >
          <span style={styles.navIcon}>📦</span>
          Orders
        </button>

        <div style={styles.divider} />

        {/* Cart Button */}
        <button
          style={{
            ...styles.cartButton,
            ...(isCartHovered ? styles.cartButtonHover : {}),
            ...(isCartPressed ? styles.cartButtonActive : {}),
          }}
          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => {
            setIsCartHovered(false);
            setIsCartPressed(false);
          }}
          onMouseDown={() => setIsCartPressed(true)}
          onMouseUp={() => setIsCartPressed(false)}
          onClick={onCartClick}
        >
          <div style={styles.cartButtonShimmer} />
          <span style={styles.cartIcon}>🛒</span>
          Cart
          <span style={styles.cartCount}>
            {totalItems}
          </span>
        </button>
      </div>
    </nav>
  );
}