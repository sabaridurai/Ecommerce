import { useState, useEffect } from "react";

// ============================================================
// PREMIUM ECOMMERCE HERO - COMPACT VERSION
// ============================================================

const styles = {
  // ----- SECTION - Reduced height -----
  hero: {
    position: "relative",
   height: "100dvh",
 boxSizing: "border-box",
 overflowY: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#07070c",
    overflow: "hidden",
    padding: "60px 40px 40px", // Reduced padding
    width: "100%",
    margin: 0,
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflowY: "hidden",
    overflowX: "hidden",
  },

  // ----- BACKGROUND LAYERS -----
  bgGradient: {
    position: "absolute",
    inset: 0,
    background: `
        radial-gradient(ellipse 70% 50% at 10% 20%, rgba(120, 80, 255, 0.10) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 90% 80%, rgba(255, 70, 180, 0.08) 0%, transparent 55%),
        radial-gradient(ellipse 40% 30% at 50% 50%, rgba(0, 200, 255, 0.04) 0%, transparent 50%)
      `,
    zIndex: 0,
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
      `,
    backgroundSize: "70px 70px",
    zIndex: 0,
    maskImage: "radial-gradient(ellipse at center, black 25%, transparent 70%)",
    WebkitMaskImage:
      "radial-gradient(ellipse at center, black 25%, transparent 70%)",
  },

  // ----- ORBS (smaller) -----
  orb: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(100px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  orb1: {
    width: "500px",
    height: "500px",
    top: "-200px",
    right: "-150px",
    background: "radial-gradient(circle, rgba(120,80,255,0.12), transparent 70%)",
    animation: "orbFloat 22s ease-in-out infinite",
  },
  orb2: {
    width: "350px",
    height: "350px",
    bottom: "-150px",
    left: "-100px",
    background: "radial-gradient(circle, rgba(255,70,180,0.10), transparent 70%)",
    animation: "orbFloat 28s ease-in-out infinite reverse",
  },
  orb3: {
    width: "200px",
    height: "200px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "radial-gradient(circle, rgba(0,200,255,0.06), transparent 70%)",
    animation: "orbFloat 18s ease-in-out infinite 2s",
  },

  // ----- CONTENT (2‑column grid - reduced gap) -----
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1440px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px", // Reduced from 80px
    alignItems: "center",
  },
  contentMobile: {
    gridTemplateColumns: "1fr",
    gap: "40px",
  },

  // ----- TEXT COLUMN (reduced gap) -----
  textSection: {
    display: "flex",
    flexDirection: "column",
    gap: "18px", // Reduced from 28px
    animation: "fadeInLeft 0.9s ease-out",
  },

  // --- BADGE (smaller) ---
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "6px 16px 6px 6px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "50px",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    width: "fit-content",
    transition: "all 0.3s ease",
  },
  badgeIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    boxShadow: "0 4px 15px rgba(120,80,255,0.3)",
  },
  badgeText: {
    fontSize: "12px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.3px",
  },
  badgeHighlight: {
    color: "#b28aff",
    fontWeight: "600",
  },

  // --- TITLE (smaller) ---
  title: {
    fontSize: "clamp(2.2rem, 6vw, 4.2rem)", // Reduced from 5.8rem
    fontWeight: "800",
    lineHeight: "1.05",
    color: "#ffffff",
    letterSpacing: "-0.04em",
    margin: 0,
  },
  titleGradient: {
    background: "linear-gradient(135deg, #7850ff 0%, #ff46b4 50%, #7850ff 100%)",
    backgroundSize: "250% 250%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "gradientShift 7s ease-in-out infinite",
  },
  titleSub: {
    display: "block",
    fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)", // Reduced
    fontWeight: "400",
    color: "rgba(255,255,255,0.25)",
    marginTop: "4px",
    letterSpacing: "0.5px",
  },

  // --- DESCRIPTION (shorter) ---
  description: {
    fontSize: "clamp(0.9rem, 1vw, 1rem)", // Reduced
    lineHeight: "1.6",
    color: "rgba(255,255,255,0.5)",
    maxWidth: "440px",
    fontWeight: "400",
    margin: 0,
  },

  // --- FEATURE LIST (compact) ---
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px", // Reduced
    marginTop: "2px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "rgba(255,255,255,0.5)",
    fontSize: "13px", // Reduced
    fontWeight: "400",
    transition: "all 0.3s ease",
  },
  featureIcon: {
    width: "22px",
    height: "22px",
    borderRadius: "6px",
    background: "rgba(120,80,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    flexShrink: 0,
  },

  // --- STATS (compact) ---
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    padding: "14px 0", // Reduced
    borderTop: "1px solid rgba(255,255,255,0.04)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  statNumber: {
    fontSize: "clamp(1.4rem, 2vw, 2rem)", // Reduced
    fontWeight: "800",
    letterSpacing: "-0.02em",
    background: "linear-gradient(135deg, #7850ff, #b28aff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  statLabel: {
    fontSize: "11px", // Reduced
    color: "rgba(255,255,255,0.3)",
    fontWeight: "400",
  },

  // --- BUTTONS (smaller) ---
  buttonGroup: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "2px",
  },
  primaryButton: {
    padding: "14px 36px", // Reduced
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px", // Reduced
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 8px 30px rgba(120,80,255,0.35)",
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    letterSpacing: "0.3px",
  },
  primaryButtonHover: {
    transform: "translateY(-3px) scale(1.02)",
    boxShadow: "0 12px 45px rgba(120,80,255,0.45)",
  },
  primaryButtonActive: {
    transform: "scale(0.96)",
  },
  buttonShimmer: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
    animation: "shimmer 3s infinite",
  },
  secondaryButton: {
    padding: "14px 32px", // Reduced
    background: "rgba(255,255,255,0.03)",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    fontSize: "14px", // Reduced
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  secondaryButtonHover: {
    background: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.15)",
    transform: "translateY(-3px)",
    color: "#ffffff",
  },

  // ============================================================
  // VISUAL COLUMN - Compact 3D Showcase
  // ============================================================
  visualSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeInRight 0.9s ease-out 0.2s both",
  },

  visualCard: {
    position: "relative",
    width: "100%",
    maxWidth: "420px", // Reduced from 520px
    aspectRatio: "1/1",
    borderRadius: "40px", // Reduced
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "35px 30px", // Reduced
    overflow: "hidden",
    boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
    backdropFilter: "blur(4px)",
    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  glowRing: {
    position: "absolute",
    width: "120%",
    height: "120%",
    top: "-10%",
    left: "-10%",
    background:
      "conic-gradient(from 0deg, transparent, rgba(120,80,255,0.05), transparent, rgba(255,70,180,0.05), transparent)",
    animation: "spinGlow 12s linear infinite",
    pointerEvents: "none",
  },

  productShowcase: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px", // Reduced
    width: "100%",
  },

  productIconWrapper: {
    position: "relative",
    width: "120px", // Reduced
    height: "120px", // Reduced
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "float3D 6s ease-in-out infinite",
    transformStyle: "preserve-3d",
  },

  productIcon: {
    fontSize: "72px", // Reduced
    filter: "drop-shadow(0 20px 40px rgba(120,80,255,0.3)) drop-shadow(0 0 60px rgba(120,80,255,0.1))",
    transform: "rotateY(-5deg) rotateX(5deg)",
    transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
    animation: "pulseGlow 3s ease-in-out infinite",
  },

  particle: {
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(120,80,255,0.3)",
    filter: "blur(6px)",
    animation: "particleFloat 4s ease-in-out infinite",
  },

  productInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    width: "100%",
  },

  productTitle: {
    fontSize: "22px", // Reduced
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.02em",
    background: "linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  productSubtitle: {
    fontSize: "13px", // Reduced
    color: "rgba(255,255,255,0.35)",
    margin: 0,
    textAlign: "center",
    maxWidth: "280px",
    fontWeight: "400",
  },

  badgeRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "4px",
    width: "100%",
  },

  premiumBadge: {
    padding: "6px 16px", // Reduced
    borderRadius: "50px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    fontSize: "12px", // Reduced
    fontWeight: "500",
    color: "rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    animation: "badgePop 0.6s ease-out both",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },

  premiumBadgeHover: {
    transform: "translateY(-2px) scale(1.05)",
    background: "rgba(255,255,255,0.07)",
    borderColor: "rgba(120,80,255,0.2)",
    boxShadow: "0 8px 25px rgba(120,80,255,0.15)",
  },

  priceTag: {
    position: "absolute",
    top: "16px",
    right: "16px",
    padding: "6px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    animation: "float 5s ease-in-out infinite 1s",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    zIndex: 2,
  },

  priceCurrency: {
    fontSize: "12px",
    fontWeight: "400",
    color: "rgba(255,255,255,0.4)",
  },

  stockIndicator: {
    position: "absolute",
    bottom: "16px",
    left: "16px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "10px",
    background: "rgba(0,255,150,0.06)",
    border: "1px solid rgba(0,255,150,0.08)",
    fontSize: "11px",
    color: "rgba(0,255,150,0.6)",
    fontWeight: "500",
    animation: "float 6s ease-in-out infinite 2s",
    zIndex: 2,
  },

  stockDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#00ff96",
    animation: "pulseDot 2s ease-in-out infinite",
    boxShadow: "0 0 15px rgba(0,255,150,0.3)",
  },

  decorativeLine: {
    width: "40px",
    height: "2px",
    background: "linear-gradient(90deg, rgba(120,80,255,0.3), rgba(255,70,180,0.3))",
    borderRadius: "2px",
    marginTop: "2px",
  },

  dotPattern: {
    position: "absolute",
    display: "grid",
    gridTemplateColumns: "repeat(4, 5px)",
    gap: "8px",
    opacity: 0.04,
    zIndex: 0,
  },
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#7850ff",
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
  @keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(40px, -50px) scale(1.1); }
    50% { transform: translate(-30px, -30px) scale(0.9); }
    75% { transform: translate(30px, 40px) scale(1.05); }
  }
  @keyframes float3D {
    0%, 100% { transform: translateY(0px) rotateY(-5deg) rotateX(5deg); }
    50% { transform: translateY(-15px) rotateY(5deg) rotateX(-3deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes spinGlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulseGlow {
    0%, 100% { filter: drop-shadow(0 20px 40px rgba(120,80,255,0.3)) drop-shadow(0 0 60px rgba(120,80,255,0.1)); }
    50% { filter: drop-shadow(0 20px 60px rgba(120,80,255,0.5)) drop-shadow(0 0 80px rgba(255,70,180,0.15)); }
  }
  @keyframes pulseDot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.6; }
  }
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
    25% { transform: translate(15px, -25px) scale(1.5); opacity: 0.6; }
    50% { transform: translate(-10px, -10px) scale(1); opacity: 0.3; }
    75% { transform: translate(10px, 15px) scale(1.8); opacity: 0.5; }
  }
  @keyframes badgePop {
    from { opacity: 0; transform: scale(0.8) translateY(15px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);
}

// ============================================================
// COMPONENT
// ============================================================
export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 968);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reduced features - only 2 instead of 3
  const features = [
    { icon: "🛡️", text: "Premium protection" },
    { icon: "⚡", text: "Lightning-fast delivery" },
  ];

  const stats = [
    { number: "12K+", label: "Happy customers" },
    { number: "99.8%", label: "Satisfaction rate" },
    { number: "4.9", label: "Rating" },
  ];

  const badges = [
    { icon: "⭐", label: "4.9/5", delay: "0.1s" },
    { icon: "🛡️", label: "Verified", delay: "0.2s" },
    { icon: "🚚", label: "Free shipping", delay: "0.3s" },
  ];

  const handleShopNow = () => {
    const el = document.getElementById("product-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const contentStyles = {
    ...styles.content,
    ...(isMobile ? styles.contentMobile : {}),
  };

  return (
    <section style={styles.hero}>
      {/* BACKGROUND LAYERS */}
      <div style={styles.bgGradient} />
      <div style={styles.grid} />

      {/* ORBS */}
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />
      <div style={{ ...styles.orb, ...styles.orb3 }} />

      {/* MAIN CONTENT */}
      <div style={contentStyles}>
        {/* ----- TEXT COLUMN ----- */}
        <div style={styles.textSection}>
          {/* BADGE */}
          <div style={styles.badge}>
            <div style={styles.badgeIcon}>✦</div>
            <span style={styles.badgeText}>
              Loved by <span style={styles.badgeHighlight}>12,000+</span> shoppers
            </span>
          </div>

          {/* TITLE */}
          <h1 style={styles.title}>
            Secure your Enviroment
            <br />
            <span style={styles.titleGradient}>With our Product</span>
            <span style={styles.titleSub}>Premium luxury retail</span>
          </h1>

          {/* DESCRIPTION - Shorter */}
          <p style={styles.description}>
            Curated collections with seamless checkout and world-class support.
          </p>

          {/* FEATURES - Only 2 items */}
          <div style={styles.featureList}>
            {features.map((f, i) => (
              <div key={i} style={styles.featureItem}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* STATS */}
          <div style={styles.statsContainer}>
            {stats.map((s, i) => (
              <div key={i} style={styles.statItem}>
                <span style={styles.statNumber}>{s.number}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* BUTTONS */}
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.primaryButton,
                ...(isHovered ? styles.primaryButtonHover : {}),
                ...(isPressed ? styles.primaryButtonActive : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setIsPressed(false);
              }}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onClick={handleShopNow}
            >
              <div style={styles.buttonShimmer} />
              Shop Now
              <span style={{ fontSize: "18px" }}>→</span>
            </button>

            <button
              style={{
                ...styles.secondaryButton,
                ...(isSecondaryHovered ? styles.secondaryButtonHover : {}),
              }}
              onMouseEnter={() => setIsSecondaryHovered(true)}
              onMouseLeave={() => setIsSecondaryHovered(false)}
              onClick={() => console.log("🔍 Learn more")}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* ============================================================
            VISUAL COLUMN - Compact Product Showcase
            ============================================================ */}
        <div style={styles.visualSection}>
          <div style={styles.visualCard}>
            {/* 3D Rotating Glow Ring */}
            <div style={styles.glowRing} />

            {/* Decorative dots */}
            <div style={{ ...styles.dotPattern, top: "16px", left: "16px" }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={styles.dot} />
              ))}
            </div>
            <div style={{ ...styles.dotPattern, bottom: "16px", right: "16px" }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={styles.dot} />
              ))}
            </div>

            {/* Price Tag */}
            <div style={styles.priceTag}>
              <span style={styles.priceCurrency}>$</span>***
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "400",
                  color: "rgba(255,255,255,0.3)",
                  marginLeft: "2px",
                }}
              >
                .**
              </span>
            </div>

            {/* Stock Indicator */}
            <div style={styles.stockIndicator}>
              <div style={styles.stockDot} />
              In Stock
            </div>

            {/* Product Showcase */}
            <div style={styles.productShowcase}>
              <div style={styles.productIconWrapper}>
                <div style={styles.productIcon}>🛒</div>

                {/* Floating Particles - Reduced count */}
                <div
                  style={{
                    ...styles.particle,
                    width: "10px",
                    height: "10px",
                    top: "10%",
                    left: "5%",
                    animationDelay: "0s",
                  }}
                />
                <div
                  style={{
                    ...styles.particle,
                    width: "6px",
                    height: "6px",
                    bottom: "15%",
                    right: "5%",
                    animationDelay: "1s",
                    background: "rgba(255,70,180,0.3)",
                  }}
                />
                <div
                  style={{
                    ...styles.particle,
                    width: "12px",
                    height: "12px",
                    top: "20%",
                    right: "8%",
                    animationDelay: "2s",
                    background: "rgba(0,200,255,0.2)",
                  }}
                />
              </div>

              {/* Product Info */}
              <div style={styles.productInfo}>
                <h3 style={styles.productTitle}>Luxury Collection</h3>
                <p style={styles.productSubtitle}>
                  Premium goods for the modern connoisseur
                </p>
                <div style={styles.decorativeLine} />
              </div>

              {/* Premium Badges */}
              <div style={styles.badgeRow}>
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.premiumBadge,
                      animationDelay: badge.delay,
                      ...(hoveredBadge === index ? styles.premiumBadgeHover : {}),
                    }}
                    onMouseEnter={() => setHoveredBadge(index)}
                    onMouseLeave={() => setHoveredBadge(null)}
                  >
                    <span>{badge.icon}</span>
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}