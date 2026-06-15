import { useState } from "react";
import "./CategoryBar.css";

// CCTV-focused categories for security equipment e-commerce
const categories = [
  { id: "all", name: "All Security", icon: "🛡️", color: "#667eea", description: "Browse everything" },
  { id: "ip-cameras", name: "IP Cameras", icon: "📹", color: "#f093fb", description: "HD & 4K network cameras" },
  { id: "dome-cameras", name: "Dome Cameras", icon: "🎥", color: "#4facfe", description: "Vandal-proof dome" },
  { id: "bullet-cameras", name: "Bullet Cameras", icon: "🔫", color: "#43e97b", description: "Long range IR" },
  { id: "ptz-cameras", name: "PTZ Cameras", icon: "🔄", color: "#fa709a", description: "Pan-Tilt-Zoom" },
  { id: "nvr-kits", name: "NVR Kits", icon: "💾", color: "#fccb90", description: "Complete recording systems" },
  { id: "wireless", name: "Wireless", icon: "📡", color: "#30cfd0", description: "WiFi & battery powered" },
  { id: "accessories", name: "Accessories", icon: "🔌", color: "#a8edea", description: "Cables, mounts & more" }
];

export default function CategoryBar({ onCategoryChange, activeCategory = "all" }) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="category-container">
      <div className="category-wrapper">
        <div className="category-header">
          <div className="header-shield">
            <span>🔒</span>
            <span>SecureTech</span>
          </div>
          <div className="header-tagline">
            ⚡ Trusted by 10,000+ Security Professionals
          </div>
        </div>
        
        <div className="category-bar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`category-btn ${selectedCategory === category.id ? 'category-btn-active' : ''}`}
              style={{
                background: selectedCategory === category.id 
                  ? `linear-gradient(135deg, ${category.color} 0%, ${category.color}CC 100%)`
                  : "rgba(255,255,255,0.95)",
              }}
              title={category.description}
            >
              <span className="category-btn-icon">{category.icon}</span>
              <span className="category-btn-text">{category.name}</span>
              {selectedCategory === category.id && (
                <span className="active-indicator"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}