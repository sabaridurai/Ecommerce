import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

// Filter options for CCTV products
const filterOptions = [
  { id: "all", label: "All Products", icon: "🎯" },
  { id: "under-5000", label: "Under ₹5,000", icon: "💰" },
  { id: "5000-15000", label: "₹5,000 - ₹15,000", icon: "💵" },
  { id: "above-15000", label: "Above ₹15,000", icon: "💎" },
  { id: "in-stock", label: "In Stock", icon: "📦" },
  { id: "on-sale", label: "On Sale", icon: "🔥" },
];

export default function ProductGrid({
  products = [],
  title = "Shop Security Cameras",
  subtitle = "Protect what matters most",
  onAddToCart,
  loading = false,
  itemsPerPage = 12,
}) {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort products
  useEffect(() => {
    let result = [...(products || [])];

    // Apply filters
    switch (activeFilter) {
      case "under-5000":
        result = result.filter(p => p.price < 5000);
        break;
      case "5000-15000":
        result = result.filter(p => p.price >= 5000 && p.price <= 15000);
        break;
      case "above-15000":
        result = result.filter(p => p.price > 15000);
        break;
      case "in-stock":
        result = result.filter(p => p.stock > 0);
        break;
      case "on-sale":
        result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
        break;
      default:
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "discount":
        result.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return discountB - discountA;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, sortBy, activeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get active filter label
  const getActiveFilterLabel = () => {
    const filter = filterOptions.find(f => f.id === activeFilter);
    return filter ? filter.label : "All Products";
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="amazon-grid-container">
        <div className="amazon-grid-header">
          <div className="amazon-grid-title-section">
            <h1 className="amazon-grid-title">{title}</h1>
          </div>
        </div>
        <div className="amazon-skeleton-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="amazon-skeleton-card">
              <div className="amazon-skeleton-image"></div>
              <div className="amazon-skeleton-content">
                <div className="amazon-skeleton-line amazon-skeleton-line-medium"></div>
                <div className="amazon-skeleton-line"></div>
                <div className="amazon-skeleton-line amazon-skeleton-line-short"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!filteredProducts.length) {
    return (
      <div className="amazon-grid-container">
        <div className="amazon-grid-header">
          <div className="amazon-grid-title-section">
            <h1 className="amazon-grid-title">{title}</h1>
            <span className="amazon-grid-count">{products.length} results</span>
          </div>
        </div>
        <div className="amazon-empty">
          <div className="amazon-empty-icon">🔍</div>
          <div className="amazon-empty-title">No products found</div>
          <div className="amazon-empty-message">
            We couldn't find any products matching "{getActiveFilterLabel()}"
          </div>
          <button 
            className="amazon-empty-btn"
            onClick={() => setActiveFilter("all")}
          >
            Clear filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="amazon-grid-container">
      {/* Header */}
      <div className="amazon-grid-header">
        <div className="amazon-grid-title-section">
          <h1 className="amazon-grid-title">{title}</h1>
          <span className="amazon-grid-count">
            {filteredProducts.length} results
          </span>
        </div>

        <div className="amazon-grid-controls">
          <div className="amazon-sort-container">
            <span className="amazon-sort-label">Sort by:</span>
            <select
              className="amazon-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="rating">Avg. Customer Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          <div className="amazon-view-toggle">
            <button
              className={`amazon-view-btn ${viewMode === "grid" ? "amazon-view-btn-active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              ⊞ Grid
            </button>
            <button
              className={`amazon-view-btn ${viewMode === "list" ? "amazon-view-btn-active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              ☰ List
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="amazon-filter-bar">
        <span className="amazon-filter-label">🔍 Filter by:</span>
        <div className="amazon-filter-chips">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              className={`amazon-filter-chip ${activeFilter === filter.id ? "amazon-filter-chip-active" : ""}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span style={{ marginRight: "6px" }}>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div
        className={`amazon-grid ${viewMode === "grid" ? "amazon-grid-grid" : "amazon-grid-list"}`}
      >
        {paginatedProducts.map((product) => (
          <div key={product.id} className="amazon-card-wrapper">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="amazon-pagination">
          <button
            className="amazon-page-btn"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            ← Previous
          </button>
          
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                className={`amazon-page-btn ${currentPage === pageNum ? "amazon-page-btn-active" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            className="amazon-page-btn"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}