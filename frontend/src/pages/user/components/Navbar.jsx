import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchRef = useRef(null);

  // Sample search suggestions
  const allSuggestions = [
    "Electronics", "Laptops", "Smartphones", "Headphones", 
    "Fashion", "Men's Clothing", "Women's Clothing", "Shoes",
    "Books", "Bestsellers", "New Arrivals", "Sale Items"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const filtered = allSuggestions.filter(s => 
        s.toLowerCase().includes(search.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      console.log("Searching for:", search);
      // Implement search functionality
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setIsSearchOpen(false);
    console.log("Searching for:", suggestion);
  };

  return (
    <>
      <nav style={{
        ...styles.nav,
        ...(scrolled ? styles.navScrolled : {})
      }}>
        <div style={styles.container}>
          {/* Logo */}
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>🛒</div>
            <div style={styles.logoText}>
              Shop<span style={styles.logoHighlight}>X</span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div style={styles.searchContainer} ref={searchRef}>
            <form onSubmit={handleSearch} style={styles.searchForm}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                style={styles.searchInput}
              />
              {search && (
                <button 
                  type="button" 
                  onClick={() => setSearch("")}
                  style={styles.clearBtn}
                >
                  ✕
                </button>
              )}
              <button type="submit" style={styles.searchBtn}>
                Search
              </button>
            </form>

            {/* Search Suggestions */}
            {isSearchOpen && searchSuggestions.length > 0 && (
              <div style={styles.suggestions}>
                {searchSuggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    style={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f3f4f6"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                  >
                    <span style={styles.suggestionIcon}>🔍</span>
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Actions */}
          <div style={styles.actions}>
            <button style={styles.iconBtn} title="Wishlist">
              <span style={styles.iconHeart}>❤️</span>
            </button>
            
            <div style={styles.cartContainer}>
              <button style={styles.iconBtn} title="Cart">
                <span style={styles.iconCart}>🛒</span>
                {cartCount > 0 && (
                  <span style={styles.cartBadge}>{cartCount}</span>
                )}
              </button>
            </div>

            <button style={styles.loginBtn}>
              <span>👤</span>
              <span>Login</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              style={styles.menuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span style={styles.menuIcon}>{isMobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div style={styles.mobileSearch}>
          <form onSubmit={handleSearch} style={styles.mobileSearchForm}>
            <span style={styles.mobileSearchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.mobileSearchInput}
            />
            {search && (
              <button 
                type="button" 
                onClick={() => setSearch("")}
                style={styles.mobileClearBtn}
              >
                ✕
              </button>
            )}
          </form>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.mobileMenuContent}>
            <div style={styles.mobileMenuItem}>
              <span>👤</span>
              <span>My Account</span>
            </div>
            <div style={styles.mobileMenuItem}>
              <span>❤️</span>
              <span>Wishlist</span>
            </div>
            <div style={styles.mobileMenuItem}>
              <span>🛒</span>
              <span>Cart ({cartCount})</span>
            </div>
            <div style={styles.mobileMenuItem}>
              <span>📦</span>
              <span>Orders</span>
            </div>
            <div style={styles.mobileMenuItem}>
              <span>🏷️</span>
              <span>Offers</span>
            </div>
            <div style={styles.mobileDivider}></div>
            <button style={styles.mobileLogoutBtn}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#111827",
    color: "white",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  
  navScrolled: {
    background: "rgba(17, 24, 39, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
  },
  
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  
  logoIcon: {
    fontSize: "28px",
    animation: "bounce 2s infinite",
  },
  
  logoText: {
    fontSize: "24px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #fff 0%, #a78bfa 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  
  logoHighlight: {
    background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  
  searchContainer: {
    flex: 1,
    maxWidth: "500px",
    margin: "0 20px",
    position: "relative",
  },
  
  searchForm: {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: "50px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  
  searchIcon: {
    padding: "0 12px",
    color: "#9ca3af",
    fontSize: "18px",
  },
  
  searchInput: {
    flex: 1,
    padding: "12px 0",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
  },
  
  clearBtn: {
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    padding: "0 8px",
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
  
  searchBtn: {
    padding: "12px 20px",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  
  suggestions: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "white",
    borderRadius: "12px",
    marginTop: "8px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    zIndex: 1001,
    overflow: "hidden",
  },
  
  suggestionItem: {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    transition: "background 0.2s ease",
    color: "#374151",
  },
  
  suggestionIcon: {
    color: "#9ca3af",
    fontSize: "14px",
  },
  
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  
  iconBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  
  iconHeart: {
    fontSize: "20px",
    transition: "transform 0.3s ease",
  },
  
  iconCart: {
    fontSize: "20px",
    transition: "transform 0.3s ease",
  },
  
  cartContainer: {
    position: "relative",
  },
  
  cartBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  
  loginBtn: {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    border: "none",
    padding: "8px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },
  
  menuBtn: {
    display: "none",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "24px",
    alignItems: "center",
    justifyContent: "center",
  },
  
  menuIcon: {
    fontSize: "24px",
  },
  
  mobileSearch: {
    display: "none",
    padding: "0 20px 12px 20px",
  },
  
  mobileSearchForm: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  
  mobileSearchIcon: {
    padding: "0 12px",
    color: "#9ca3af",
    fontSize: "16px",
  },
  
  mobileSearchInput: {
    flex: 1,
    padding: "10px 0",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
    color: "white",
  },
  
  mobileClearBtn: {
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    padding: "0 12px",
    fontSize: "14px",
  },
  
  mobileMenu: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "300px",
    background: "white",
    zIndex: 2000,
    boxShadow: "-5px 0 25px rgba(0,0,0,0.2)",
    animation: "slideInRight 0.3s ease",
  },
  
  mobileMenuContent: {
    padding: "80px 20px 20px 20px",
  },
  
  mobileMenuItem: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px",
    color: "#374151",
    cursor: "pointer",
    borderRadius: "12px",
    transition: "background 0.2s ease",
  },
  
  mobileDivider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "12px 0",
  },
  
  mobileLogoutBtn: {
    width: "100%",
    padding: "12px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "12px",
  },
};

// Add animations to document
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  .icon-btn:hover .icon-heart,
  .icon-btn:hover .icon-cart {
    transform: scale(1.1);
  }
  
  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
  }
  
  .icon-btn:hover {
    background: rgba(255,255,255,0.1);
    transform: scale(1.05);
  }
  
  /* Mobile Responsive */
  @media (max-width: 768px) {
    .search-container {
      display: none;
    }
    
    .mobile-search {
      display: block;
    }
    
    .menu-btn {
      display: flex !important;
    }
    
    .login-btn span:last-child {
      display: none;
    }
    
    .login-btn {
      padding: 8px !important;
    }
    
    .logo-text {
      font-size: 20px !important;
    }
    
    .logo-icon {
      font-size: 24px !important;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 10px 15px !important;
    }
    
    .icon-btn {
      padding: 6px !important;
    }
    
    .icon-heart, .icon-cart {
      font-size: 18px !important;
    }
  }
`;

document.head.appendChild(styleSheet);