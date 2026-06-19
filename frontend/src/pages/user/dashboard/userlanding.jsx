import {
  useEffect,
  useState
} from "react";

import Navbar from "../../../Navbar";
import Hero from "../../../Hero";
import ProductGrid from "../../../ProductGrid";
import CartSidebar from "../components/CartSidebar";
import {  getProducts} from "../../../services/productService";
import Footer from "../../../Footer";

// Professional Dark Theme Styles with Enhanced Responsiveness
const styles = {
appContainer: {
  height: "100dvh", 
  width: "100%",
  position: "relative", 
  maxWidth: "100%",
  overflowX: "hidden",
  
  background: "linear-gradient(180deg, #f1f5f9 0%, #e8edf3 100%)",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: "#111827",
  boxSizing: "border-box",
},
  // Subtle gradient overlay for depth
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at 50% 0%, rgba(102, 126, 234, 0.06) 0%, transparent 70%), radial-gradient(ellipse at 80% 100%, rgba(118, 75, 162, 0.04) 0%, transparent 50%)',
    zIndex: 0,
    pointerEvents: 'none'
  },
  // Animated gradient orb - responsive sizes
  gradientOrb1: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
    top: '-200px',
    right: '-200px',
    zIndex: 0,
    animation: 'floatOrb 20s ease-in-out infinite',
    pointerEvents: 'none'
  },
  gradientOrb2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(118, 75, 162, 0.06) 0%, transparent 70%)',
    bottom: '-100px',
    left: '-100px',
    zIndex: 0,
    animation: 'floatOrb 25s ease-in-out infinite reverse',
    pointerEvents: 'none'
  },
  gradientOrb3: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(74, 222, 128, 0.04) 0%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 0,
    animation: 'floatOrb 18s ease-in-out infinite 2s',
    pointerEvents: 'none'
  },
  mainContent: {
    margin: '0 auto',
    height: "100%",
    overflowY: "auto",
    position: 'relative',
    zIndex: 1,
    padding: '0 20px 20px',
    
    // Responsive padding
    '@media (min-width: 640px)': {
      padding: '0 30px 30px',
    },
    '@media (min-width: 1024px)': {
      padding: '0 40px 40px',
    },
    '@media (min-width: 1280px)': {
      padding: '0 60px 40px',
    }
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '32px',
    padding: '20px'
  },
  loadingSpinner: {
    width: '60px',
    height: '60px',
    border: '3px solid rgba(102, 126, 234, 0.1)',
    borderTop: '3px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
    boxShadow: '0 0 60px rgba(102, 126, 234, 0.1)',
    
    '@media (max-width: 480px)': {
      width: '40px',
      height: '40px',
    }
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '1px',
    animation: 'pulse 1.5s ease-in-out infinite',
    
    '@media (max-width: 480px)': {
      fontSize: '14px',
    }
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    minHeight: '100vh'
  },
  // Floating particles - subtle
  particlesContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 0
  },
  particle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(102, 126, 234, 0.04)',
    border: '1px solid rgba(102, 126, 234, 0.02)',
    animation: 'floatParticle 12s ease-in-out infinite',
    pointerEvents: 'none'
  },
  // Status bar - responsive
 statusBar: {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 9555,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'rgba(26, 26, 46, 0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  padding: '10px 20px',
  borderRadius: '50px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  
  '@media (max-width: 640px)': {
    bottom: '80px',
    right: '50%',
    transform: 'translateX(50%)',
    padding: '8px 16px',
    gap: '8px',
    width: 'auto',
    maxWidth: '90%',
    whiteSpace: 'nowrap',
  },
  '@media (max-width: 480px)': {
    bottom: '70px',
    padding: '6px 14px',
    gap: '6px',
    fontSize: '12px',
  }
},
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#4ade80',
    animation: 'pulse 2s ease-in-out infinite',
    boxShadow: '0 0 20px rgba(74, 222, 128, 0.2)',
    
    '@media (max-width: 480px)': {
      width: '6px',
      height: '6px',
    }
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '13px',
    fontWeight: '500',
    letterSpacing: '0.3px',
    
    '@media (max-width: 640px)': {
      fontSize: '12px',
    },
    '@media (max-width: 480px)': {
      fontSize: '11px',
    }
  },
  statusNumber: {
    color: '#fff',
    fontWeight: '700',
  },
  // Scroll indicator - responsive
  scrollIndicator: {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    opacity: 0.3,
    zIndex: 1,
    animation: 'bounce 2s ease-in-out infinite',
    
    '@media (max-width: 768px)': {
      display: 'none', // Hide on tablets and smaller
    }
  },
  scrollLine: {
    width: '1px',
    height: '40px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
  },
  scrollText: {
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.2)',
    letterSpacing: '2px',
    textTransform: 'uppercase'
  }
};

// Enhanced Keyframes
const keyframes = `
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(30px) scale(0.98); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0) scale(1); 
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes floatOrb {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
    }
    25% { 
      transform: translate(30px, -40px) scale(1.1); 
    }
    50% { 
      transform: translate(-20px, -20px) scale(0.9); 
    }
    75% { 
      transform: translate(20px, 30px) scale(1.05); 
    }
  }
  
  @keyframes floatParticle {
    0%, 100% { 
      transform: translateY(0px) translateX(0px); 
      opacity: 0.02; 
    }
    25% { 
      transform: translateY(-40px) translateX(20px); 
      opacity: 0.08; 
    }
    50% { 
      transform: translateY(-20px) translateX(-30px); 
      opacity: 0.05; 
    }
    75% { 
      transform: translateY(-60px) translateX(10px); 
      opacity: 0.1; 
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-10px); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* Responsive adjustments for gradient orbs */
  @media (max-width: 1024px) {
    .gradient-orb-1 {
      width: 400px !important;
      height: 400px !important;
      top: -150px !important;
      right: -150px !important;
    }
    .gradient-orb-2 {
      width: 300px !important;
      height: 300px !important;
      bottom: -80px !important;
      left: -80px !important;
    }
    .gradient-orb-3 {
      width: 200px !important;
      height: 200px !important;
    }
  }

  @media (max-width: 640px) {
    .gradient-orb-1 {
      width: 250px !important;
      height: 250px !important;
      top: -100px !important;
      right: -100px !important;
    }
    .gradient-orb-2 {
      width: 200px !important;
      height: 200px !important;
      bottom: -50px !important;
      left: -50px !important;
    }
    .gradient-orb-3 {
      width: 150px !important;
      height: 150px !important;
    }
  }

  /* Loading spinner responsive */
  @media (max-width: 480px) {
    .loading-spinner {
      width: 40px !important;
      height: 40px !important;
    }
  }
`;

// Add keyframes to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);
}

export default function UserLanding() {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadProducts();
    
    // Check for mobile screen
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderParticles = () => {
    // Reduce particles on mobile for better performance
    const particleCount = isMobile ? 8 : 20;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        <div
          key={i}
          style={{
            ...styles.particle,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${Math.random() * 10 + 6}s`,
            background: `rgba(102, 126, 234, ${Math.random() * 0.04 + 0.01})`
          }}
        />
      );
    }
    return particles;
  };

  // Apply responsive class names to gradient orbs
  const getOrbStyle = (baseStyle, className) => ({
    ...baseStyle,
    className: className
  });

  return (
    <div style={styles.appContainer}>
      {/* Gradient Overlay */}
      <div style={styles.gradientOverlay} />

      {/* Animated Orbs with responsive classes */}
      <div style={styles.gradientOrb1} className="gradient-orb-1" />
      <div style={styles.gradientOrb2} className="gradient-orb-2" />
      <div style={styles.gradientOrb3} className="gradient-orb-3" />

      {/* Particles - reduced on mobile */}
      <div style={styles.particlesContainer}>
        {renderParticles()}
      </div>

      <div style={styles.contentWrapper}>
        <Navbar 
          onCartClick={() => setCartOpen(true)}
          cartItemCount={products.length}
        />

        <div style={styles.mainContent}>
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner} className="loading-spinner" />
              <div style={styles.loadingText}>
                {isMobile ? 'Loading...' : 'Loading products...'}
              </div>
            </div>
          ) : (
            <>
              <Hero />
             <section id="product-grid">
              <ProductGrid products={products} />
             </section>
             <Footer />
            </>
          )}
        </div>

        <CartSidebar 
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={products}
        />

        {/* Status Indicator - responsive */}
        <div style={styles.statusBar}>
          <div style={styles.statusDot} />
          <span style={styles.statusText}>
            <span style={styles.statusNumber}>{products.length}</span> 
            {isMobile ? ' items' : ' products available'}
          </span>
        </div>

        {/* Scroll Indicator - hidden on smaller screens */}
        {!loading && products.length > 0 && (
          <div style={styles.scrollIndicator}>
            <span style={styles.scrollText}>Scroll</span>
            <div style={styles.scrollLine} />
          </div>
        )}
      </div>
    </div>
  );
}