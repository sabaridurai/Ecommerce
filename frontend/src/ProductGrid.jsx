import ProductCard from "./pages/user/components/ProductCard";
import { useState, useEffect } from "react";

// Styles object
const styles = {
  container: {
    padding: '40px 30px 60px',
    margin: '0 auto',
    width: '100%'
  },
  header: {
    background: 'rgba(163, 198, 247, 0.51)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  title: {
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    fontWeight: '800',
    color: '#84c3a7',
    margin: 0
  },
  titleGradient: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  productCount: {
    fontSize: '14px',
    color: 'rgba(185, 0, 179, 0.68)',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '4px 14px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    fontWeight: '500'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  filterButton: {
    padding: '10px 20px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
    color: 'rgba(47, 128, 226, 0.7)',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backdropFilter: 'blur(10px)'
  },
  filterButtonHover: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#f402bb'
  },
  viewToggle: {
    display: 'flex',
    gap: '6px',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '4px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.06)'
  },
  viewButton: {
    padding: '8px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  viewButtonActive: {
    background: 'rgba(102, 126, 234, 0.2)',
    color: '#8496f9'
  },
  viewButtonHover: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  grid: {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    animation: 'fadeInGrid 0.6s ease-out'
  },
  gridList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    animation: 'fadeInGrid 0.6s ease-out'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    gap: '24px'
  },
  loadingSpinner: {
    width: '60px',
    height: '60px',
    border: '4px solid rgba(255, 255, 255, 0.15)',
    borderTop: '4px solid #001a8e',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    color: 'rgba(0, 0, 19, 0.81)',
    fontSize: '16px',
    fontWeight: '500'
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    gap: '16px',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: '72px',
    opacity: '0.3',
    marginBottom: '8px'
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
    margin: 0
  },
  emptySubtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.3)',
    maxWidth: '400px'
  },
  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px'
  },
  loadMoreButton: {
    padding: '14px 40px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '50px',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  loadMoreButtonHover: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)'
  },
  scrollToTop: {
    position: 'fixed',
    bottom: '60px',
    right: '30px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    opacity: 0,
    transform: 'translateY(20px)',
    pointerEvents: 'none'
  },
  scrollToTopVisible: {
    opacity: 1,
    transform: 'translateY(0)',
    pointerEvents: 'auto'
  },
  scrollToTopHover: {
    transform: 'scale(1.1)',
    boxShadow: '0 8px 30px rgba(102, 126, 234, 0.5)'
  }
};

// Keyframes
const keyframes = `
  @keyframes fadeInGrid {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

// Add keyframes to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);
}

export default function ProductGrid({ products, loading = false, onLoadMore }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFilterHovered, setIsFilterHovered] = useState(false);
  const [isLoadMoreHovered, setIsLoadMoreHovered] = useState(false);
  const [isScrollTopHovered, setIsScrollTopHovered] = useState(false);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner} />
          <div style={styles.loadingText}>Loading products...</div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyContainer}>
          <div style={styles.emptyIcon}>🛍️</div>
          <h3 style={styles.emptyTitle}>No Products Found</h3>
          <p style={styles.emptySubtitle}>
            We couldn't find any products matching your criteria. 
            Try adjusting your filters or check back later.
          </p>
        </div>
      </div>
    );
  }

  const gridStyle = viewMode === 'grid' ? styles.grid : styles.gridList;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h2 style={styles.title}>
            <span style={styles.titleGradient}>Featured</span> Products
          </h2>
          <span style={styles.productCount}>
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div style={styles.controls}>
          {/* Filter Button */}
          <button
            style={{
              ...styles.filterButton,
              ...(isFilterHovered ? styles.filterButtonHover : {})
            }}
            onMouseEnter={() => setIsFilterHovered(true)}
            onMouseLeave={() => setIsFilterHovered(false)}
            onClick={() => console.log('Filter clicked')}
          >
            🔍 Filters
          </button>

          {/* View Toggle */}
          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.viewButton,
                ...(viewMode === 'grid' ? styles.viewButtonActive : {}),
                ...(viewMode !== 'grid' && !isFilterHovered ? styles.viewButtonHover : {})
              }}
              onClick={() => setViewMode('grid')}
              onMouseEnter={(e) => {
                if (viewMode !== 'grid') {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'grid') {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
                }
              }}
              title="Grid view"
            >
              🔲
            </button>
            <button
              style={{
                ...styles.viewButton,
                ...(viewMode === 'list' ? styles.viewButtonActive : {}),
                ...(viewMode !== 'list' && !isFilterHovered ? styles.viewButtonHover : {})
              }}
              onClick={() => setViewMode('list')}
              onMouseEnter={(e) => {
                if (viewMode !== 'list') {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'list') {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
                }
              }}
              title="List view"
            >
              📋
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={gridStyle}>
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{
              animation: `fadeInGrid 0.5s ease-out ${index * 0.05}s both`
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Load More */}
      {onLoadMore && products.length >= 12 && (
        <div style={styles.loadMoreContainer}>
          <button
            style={{
              ...styles.loadMoreButton,
              ...(isLoadMoreHovered ? styles.loadMoreButtonHover : {})
            }}
            onMouseEnter={() => setIsLoadMoreHovered(true)}
            onMouseLeave={() => setIsLoadMoreHovered(false)}
            onClick={onLoadMore}
          >
            Load More Products
            <span style={{ fontSize: '18px' }}>↓</span>
          </button>
        </div>
      )}

      {/* Scroll to Top */}
      <button
        style={{
          ...styles.scrollToTop,
          ...(showScrollTop ? styles.scrollToTopVisible : {}),
          ...(isScrollTopHovered ? styles.scrollToTopHover : {})
        }}
        onMouseEnter={() => setIsScrollTopHovered(true)}
        onMouseLeave={() => setIsScrollTopHovered(false)}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
}