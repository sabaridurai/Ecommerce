import { useCart } from "./context/CartContext";
import { useState, useEffect, useRef } from "react";
import { isLoggedIn } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

// Styles object
const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 5000,
    background: 'rgba(12, 14, 26, 0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    padding: '12px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '26px',
    fontWeight: '800',
    color: '#fff',
    textDecoration: 'none',
    flexShrink: 0
  },
 logoIcon: {
  fontSize: "30px",
  display: "inline-block",
  animation: "floatLogo 3s ease-in-out infinite",
},
  logoText: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 4s ease-in-out infinite'
  },
  logoBadge: {
    background: 'rgba(102, 126, 234, 0.2)',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    color: '#a8b5ff',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  searchContainer: {
    flex: 1,
    maxWidth: '500px',
    minWidth: '200px',
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: '18px',
    pointerEvents: 'none',
    transition: 'all 0.3s ease'
  },
  searchIconActive: {
    color: '#667eea'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 48px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '50px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  },
  searchInputFocus: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(102, 126, 234, 0.4)',
    boxShadow: '0 0 30px rgba(102, 126, 234, 0.1)'
  },
  searchInputPlaceholder: {
    color: 'rgba(255, 255, 255, 0.3)'
  },
  searchShortcut: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '2px 10px',
    borderRadius: '4px',
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  searchResults: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    right: 0,
    background: 'rgba(26, 26, 46, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    padding: '12px',
    maxHeight: '300px',
    overflowY: 'auto',
    display: 'none',
    zIndex: 1001
  },
  searchResultsShow: {
    display: 'block'
  },
  searchResultItem: {
    padding: '10px 12px',
    borderRadius: '10px',
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px'
  },
  searchResultItemHover: {
    background: 'rgba(102, 126, 234, 0.1)',
    color: '#fff'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0
  },
  cartButton: {
    position: 'relative',
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '50px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    overflow: 'hidden'
  },
  cartButtonHover: {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 8px 40px rgba(102, 126, 234, 0.4)'
  },
  cartButtonActive: {
    transform: 'scale(0.95)'
  },
  cartIcon: {
    fontSize: '20px'
  },
  cartCount: {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    minWidth: '24px',
    textAlign: 'center'
  },
  cartBadge: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    background: '#ff6b6b',
    color: '#fff',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'bounceIn 0.5s ease-out',
    boxShadow: '0 2px 10px rgba(255, 107, 107, 0.4)'
  },
  cartButtonShimmer: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
    animation: 'shimmer 3s infinite'
  },
  divider: {
    width: '1px',
    height: '30px',
    background: 'rgba(255, 255, 255, 0.06)'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px'
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
    border: '2px solid rgba(255, 255, 255, 0.1)'
  },
  userAvatarHover: {
    borderColor: '#667eea',
    transform: 'scale(1.05)',
    boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)'
  },
  notificationDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#4ade80',
    animation: 'pulse 1.5s ease-in-out infinite',
    display: 'inline-block',
    marginLeft: '4px'
  }
};

// Keyframes
const keyframes = `
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  
  @keyframes slideDown {
    from { 
      opacity: 0;
      transform: translateY(-10px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Add keyframes to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);
}

export default function Navbar({ onCartClick }) {
  

  
      const navigate = useNavigate();
  const { cart } = useCart();
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isCartPressed, setIsCartPressed] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Mock search results (replace with actual data)
  const mockProducts = [
    { id: 1, name: '4K IP Camera', icon: '📹' },
    { id: 2, name: 'Dome Camera Pro', icon: '🎥' },
    { id: 3, name: 'NVR Kit 8-Channel', icon: '💾' },
    { id: 4, name: 'Wireless Security System', icon: '📡' }
  ];

  const filteredResults = searchQuery.length > 0 
    ? mockProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut for search (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);



    const [session, setSession] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem("payment_session");
    if (s) setSession(JSON.parse(s));
  }, []);

  const showBadge =
    session &&
    ["PENDING_PAYMENT", "AWAITING_PROOF"].includes(session.status);

  
    const handleCheckout = () => {  

      setIsCheckoutActive(true);
    setTimeout(() => setIsCheckoutActive(false), 200);
  // 1. Check login first
  if (!isLoggedIn()) {
    localStorage.setItem("redirectAfterLogin", "/checkout");
    navigate("/login");
    return;
  }

   const product = JSON.parse(localStorage.getItem("buyNowProduct"));
    console.log("Checkout clicked. Cart items:", cart);


  if (product.length === 0) {
    alert("Your cart is empty! Please add items or buy now before checking out.");
    return;
  };

  // 2. Save cart
  // localStorage.setItem("buyNowProduct", JSON.stringify(product));

  // 3. Go to checkout
  navigate("/checkout");
};





  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo}>
        <span style={styles.logoIcon}>🛡️</span>
        <span style={styles.logoText}>SecureTech</span>
        <span style={styles.logoBadge}>PRO</span>
      </div>

      {/* Search */}
      <div style={styles.searchContainer} ref={searchRef}>
        <span style={{
          ...styles.searchIcon,
          ...(isSearchFocused ? styles.searchIconActive : {})
        }}>
          🔍
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          style={{
            ...styles.searchInput,
            ...(isSearchFocused ? styles.searchInputFocus : {})
          }}
          onFocus={() => {
            setIsSearchFocused(true);
            setShowSearchResults(true);
          }}
          onBlur={() => setIsSearchFocused(false)}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchResults(e.target.value.length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowSearchResults(false);
              inputRef.current?.blur();
            }
          }}
        />
        <div style={styles.searchShortcut}>
          <span>⌘</span>K
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && filteredResults.length > 0 && (
          <div style={{
            ...styles.searchResults,
            ...styles.searchResultsShow,
            animation: 'slideDown 0.3s ease-out'
          }}>
            {filteredResults.map((product) => (
              <div
                key={product.id}
                style={styles.searchResultItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                }}
                onClick={() => {
                  console.log('Selected:', product.name);
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
              >
                <span>{product.icon}</span>
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {/* User Section */}
        <div style={styles.userSection}>
          <div
            style={{
              ...styles.userAvatar,
              ...(isAvatarHovered ? styles.userAvatarHover : {})
            }}
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
            onClick={() => console.log('User profile')}
          >
            👤
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Guest
            <span style={styles.notificationDot} />
          </span>
        </div>

        <div style={styles.divider} />

       


     <div
  onClick={handleCheckout}
  style={{
    position: "relative",
    color: "white",
    cursor: "pointer"
  }}
>
  💸 Payment

  {showBadge && (
    <span
      style={{
        position: "absolute",
        top: -5,
        right: -10,
        background: "red",
        color: "white",
        borderRadius: "50%",
        width: 10,
        height: 10,
      }}
    />
  )}
</div>
    

        {/* Cart Button */}
        <button
          style={{
            ...styles.cartButton,
            ...(isCartHovered ? styles.cartButtonHover : {}),
            ...(isCartPressed ? styles.cartButtonActive : {})
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
          <span>Cart</span>
          <span style={styles.cartCount}>
            {totalItems}
          </span>
          {totalItems > 0 && (
            <span style={styles.cartBadge}>
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}