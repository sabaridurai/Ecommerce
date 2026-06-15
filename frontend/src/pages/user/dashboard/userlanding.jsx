import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../../admin/services/productService";
import "./UserLanding.css";

export default function UserLanding() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data || []);
      
      // Get featured products (first 4 with high rating or random)
      const featured = (data || []).filter(p => p.rating >= 4).slice(0, 4);
      setFeaturedProducts(featured.length ? featured : (data || []).slice(0, 4));
      
      // Get new arrivals (last 4 added)
      const arrivals = (data || []).slice(-4).reverse();
      setNewArrivals(arrivals);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-landing">
      <Navbar />
      <Hero />
      <CategoryBar />

      {/* Trending Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrapper">
              <div className="section-icon">🔥</div>
              <h2 className="section-title">Trending Products</h2>
            </div>
            <div className="section-line"></div>
            <p className="section-subtitle">
              Most popular items loved by our customers
            </p>
          </div>
          
          {loading ? (
            <ProductGridSkeleton />
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="products-section featured-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-wrapper">
                <div className="section-icon">⭐</div>
                <h2 className="section-title">Featured Products</h2>
              </div>
              <div className="section-line"></div>
              <p className="section-subtitle">
                Hand-picked premium selections just for you
              </p>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="products-section arrivals-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-wrapper">
                <div className="section-icon">🆕</div>
                <h2 className="section-title">New Arrivals</h2>
              </div>
              <div className="section-line"></div>
              <p className="section-subtitle">
                Fresh from the collection, just landed
              </p>
            </div>
            <ProductGrid products={newArrivals} />
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-wrapper">
            <div className="newsletter-content">
              <div className="newsletter-icon">📧</div>
              <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
              <p className="newsletter-text">
                Get the latest updates on new products and upcoming sales
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h4 className="feature-title">Free Shipping</h4>
              <p className="feature-text">On orders over ₹999</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h4 className="feature-title">Premium Quality</h4>
              <p className="feature-text">100% genuine products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h4 className="feature-title">Easy Returns</h4>
              <p className="feature-text">30-day return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h4 className="feature-title">24/7 Support</h4>
              <p className="feature-text">Customer first service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Loading Skeleton Component
function ProductGridSkeleton() {
  return (
    <div className="products-grid skeleton-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="product-card-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
}