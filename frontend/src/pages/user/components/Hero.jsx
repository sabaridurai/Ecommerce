import { useEffect, useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // CCTV-focused offers for a security brand
  const offers = [
    {
      title: "4K Ultra HD Security Cameras",
      subtitle: "Crystal clear night vision & AI motion detection",
      tag: "🔥 Smart Security Deal",
    },
    {
      title: "360° PTZ Dome Cameras",
      subtitle: "Full coverage with auto-tracking & two-way audio",
      tag: "⭐ Best Seller",
    },
    {
      title: "Complete CCTV Kits",
      subtitle: "4-16 channel NVR systems with pre-installed HDD",
      tag: "💯 Value Pack",
    },
  ];

  // Product categories for CCTV
  const categories = [
    { icon: "🏠", name: "Indoor Cam" },
    { icon: "🌳", name: "Outdoor Cam" },
    { icon: "🔄", name: "PTZ Cam" },
    { icon: "💾", name: "Recorders" },
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % offers.length);
    }, 5000);

    return () => clearInterval(t);
  }, [offers.length]);

  const offer = offers[current];

  return (
    <div className="hero-wrapper">
      {/* TOP STRIP - Dynamic Deal Banner */}
      <div className="deal-strip">
        <span className="tag">{offer.tag}</span>
        <span>{offer.subtitle}</span>
        <span>🏷️ Limited stock — Order now!</span>
      </div>

      {/* MAIN HERO SECTION */}
      <div className="hero">
        {/* LEFT - Value Proposition */}
        <div className="hero-left">
          <div className="badge">📢 Flash Sale — Up to 40% OFF</div>
          <h1>{offer.title}</h1>
          <p>
            {offer.subtitle}. Secure your home or business with industry-leading 
            surveillance technology. Remote access, smart alerts, and 24/7 recording.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">Shop Security Deals →</button>
            <button className="secondary-btn">Compare Systems →</button>
          </div>

          <div className="trust-row">
            <span>Free Installation Guide</span>
            <span>2-Year Warranty</span>
            <span>30-Day Returns</span>
            <span>24/7 Tech Support</span>
          </div>
        </div>

        {/* RIGHT - Category Cards & Deal Highlight */}
        <div className="hero-right">
          {/* Category Grid Card */}
          <div className="card">
            <h3>Shop by Category</h3>
            <div className="grid">
              {categories.map((cat, idx) => (
                <div key={idx} className="box">
                  {cat.icon} {cat.name}
                </div>
              ))}
            </div>
          </div>

          {/* Special Price Highlight Card */}
          <div className="card highlight">
            <h4>🔥 EARLY BIRD OFFER</h4>
            <h2>Starts at ₹2,999</h2>
            <p>2MP AI Camera + Free SD Card</p>
            <button className="mini-btn">Claim Deal →</button>
          </div>
        </div>
      </div>
    </div>
  );
}