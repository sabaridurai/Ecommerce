import { useEffect, useState } from "react";
import api, { backendURL } from "../../../services/api";
import { useNavigate } from "react-router-dom";

// ============================================================
// STYLES - Premium Dashboard (No Gap)
// ============================================================
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a0a0f 0%, #14141a 50%, #1a0a2e 100%)",
    padding: "16px 20px 24px", // Further reduced padding
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    position: "relative",
    overflow: "hidden",
    margin: 0,
    width: "100%",
    // Override parent padding
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
  // Animated background blobs
  blob1: {
    position: "fixed",
    top: "-20%",
    right: "-10%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(102,126,234,0.08) 0%, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 0,
    animation: "blobFloat 20s ease-in-out infinite",
  },
  blob2: {
    position: "fixed",
    bottom: "-20%",
    left: "-10%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(255,70,180,0.08) 0%, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 0,
    animation: "blobFloat 25s ease-in-out infinite reverse",
  },
  blob3: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "800px",
    background: "radial-gradient(circle, rgba(120,80,255,0.03) 0%, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 0,
    animation: "blobFloat 30s ease-in-out infinite",
  },
  wrapper: {
    maxWidth: "1400px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
    padding: 0,
    // Override any parent padding
    marginTop: "-4px",
  },

  // ----- Header -----
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.02em",
    background: "linear-gradient(135deg, #ffffff 0%, #b28aff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  welcomeText: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.4)",
    margin: "2px 0 0 0",
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  refreshButton: {
    padding: "8px 16px",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "inherit",
    backdropFilter: "blur(10px)",
  },
  refreshButtonHover: {
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 30px rgba(102,126,234,0.15)",
  },
  dateBadge: {
    padding: "6px 14px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "30px",
    border: "1px solid rgba(255,255,255,0.04)",
    fontSize: "12px",
    color: "rgba(255,255,255,0.4)",
    backdropFilter: "blur(10px)",
    whiteSpace: "nowrap",
  },

  // ----- Summary Cards -----
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "20px",
  },
  summaryCard: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    padding: "16px 20px",
    backdropFilter: "blur(20px)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    position: "relative",
    overflow: "hidden",
  },
  summaryCardHover: {
    transform: "translateY(-4px) scale(1.01)",
    borderColor: "rgba(102,126,234,0.15)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    background: "rgba(255,255,255,0.05)",
  },
  summaryCardGlow: {
    position: "absolute",
    top: "-50%",
    right: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(102,126,234,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  summaryIcon: {
    fontSize: "22px",
    marginBottom: "8px",
    display: "block",
  },
  summaryLabel: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  summaryValue: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  summarySub: {
    fontSize: "10px",
    color: "rgba(255,255,255,0.2)",
    margin: "2px 0 0 0",
  },
  summaryTrend: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "10px",
    fontWeight: "600",
    padding: "2px 8px",
    borderRadius: "30px",
    marginTop: "4px",
  },
  trendUp: {
    background: "rgba(74,222,128,0.12)",
    color: "#4ade80",
  },
  trendDown: {
    background: "rgba(248,113,113,0.12)",
    color: "#f87171",
  },

  // ----- Charts Section -----
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "14px",
    marginBottom: "20px",
  },
  chartCard: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    padding: "16px 20px",
    backdropFilter: "blur(20px)",
    transition: "all 0.3s ease",
  },
  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    flexWrap: "wrap",
    gap: "6px",
  },
  chartTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  chartSubtitle: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.3)",
    margin: "2px 0 0 0",
  },
  chartLegend: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "10px",
    color: "rgba(255,255,255,0.4)",
  },
  legendDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },

  // ----- Bar Chart -----
  barChart: {
    display: "flex",
    alignItems: "flex-end",
    gap: "4px",
    height: "140px",
    paddingTop: "12px",
  },
  barContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    height: "100%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    maxWidth: "28px",
    borderRadius: "4px 4px 0 0",
    transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    position: "relative",
    minHeight: "3px",
  },
  barHover: {
    transform: "scaleY(1.05)",
    opacity: 0.8,
  },
  barLabel: {
    fontSize: "9px",
    color: "rgba(255,255,255,0.2)",
    textAlign: "center",
  },
  barValue: {
    fontSize: "8px",
    color: "rgba(255,255,255,0.3)",
    fontWeight: "500",
  },

  // ----- Donut Chart -----
  donutContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    padding: "8px 0",
    flexWrap: "wrap",
  },
  donut: {
    position: "relative",
    width: "130px",
    height: "130px",
  },
  donutSvg: {
    transform: "rotate(-90deg)",
  },
  donutLabel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  donutLabelValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  donutLabelText: {
    fontSize: "9px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },
  donutLegend: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  donutLegendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    color: "rgba(255,255,255,0.6)",
  },
  donutLegendDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flexShrink: 0,
  },

  // ----- Recent Activity -----
  activityGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "20px",
  },
  activityCard: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    padding: "16px 20px",
    backdropFilter: "blur(20px)",
    transition: "all 0.3s ease",
  },
  activityHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  activityTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  viewAllLink: {
    fontSize: "11px",
    color: "rgba(102,126,234,0.6)",
    cursor: "pointer",
    transition: "color 0.3s ease",
    textDecoration: "none",
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.03)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  activityItemHover: {
    background: "rgba(255,255,255,0.04)",
    borderColor: "rgba(102,126,234,0.1)",
    transform: "translateX(4px)",
  },
  activityIcon: {
    fontSize: "16px",
    flexShrink: 0,
  },
  activityInfo: {
    flex: 1,
    minWidth: 0,
  },
  activityText: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.8)",
    margin: 0,
  },
  activitySub: {
    fontSize: "10px",
    color: "rgba(255,255,255,0.2)",
    margin: "1px 0 0 0",
  },
  activityAmount: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#ffffff",
    flexShrink: 0,
  },

  // ----- Loading State -----
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    background: "#0a0a0f",
  },
  loadingSpinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(255,255,255,0.05)",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.3)",
  },

  // Responsive breakpoints
  responsive: {
    mobile: {
      chartsGrid: {
        gridTemplateColumns: "1fr",
      },
      activityGrid: {
        gridTemplateColumns: "1fr",
      },
      summaryGrid: {
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      },
      header: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
      headerRight: {
        width: "100%",
        justifyContent: "flex-start",
      },
    },
  },
};

// ============================================================
// KEYFRAMES
// ============================================================
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes blobFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -30px) scale(1.1); }
    50% { transform: translate(-20px, 40px) scale(0.9); }
    75% { transform: translate(40px, 20px) scale(1.05); }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
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
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredActivity, setHoveredActivity] = useState(null);
  const [isRefreshHovered, setIsRefreshHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${backendURL}/dashboard/`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "PENDING": "#fb923c",
      "PROCESSING": "#60a5fa",
      "SHIPPED": "#4ade80",
      "DELIVERED": "#4ade80",
      "CANCELLED": "#f87171",
      "COMPLETED": "#4ade80",
      "AWAITING_PROOF": "#60a5fa",
      "FAILED": "#f87171",
    };
    return colors[status?.toUpperCase()] || "#a78bfa";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "PENDING": "⏳",
      "PROCESSING": "🔄",
      "SHIPPED": "📦",
      "DELIVERED": "✅",
      "CANCELLED": "❌",
      "COMPLETED": "✅",
      "AWAITING_PROOF": "📤",
      "FAILED": "❌",
    };
    return icons[status?.toUpperCase()] || "📋";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatAmount = (amount) => {
    return Number(amount || 0).toFixed(2);
  };

  // Mock chart data (replace with actual data from API)
  const getChartData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({
      label: day,
      value: Math.floor(Math.random() * 100) + 20,
      orders: Math.floor(Math.random() * 30) + 5,
    }));
  };

  const getStatusDistribution = () => {
    const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
    const colors = ["#fb923c", "#60a5fa", "#4ade80", "#34d399", "#f87171"];
    return statuses.map((status, i) => ({
      label: status,
      value: Math.floor(Math.random() * 30) + 5,
      color: colors[i],
    }));
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner} />
        <p style={styles.loadingText}>Loading dashboard...</p>
      </div>
    );
  }

  const summaryData = data?.summary || { users: 0, orders: 0, payments: 0, revenue: 0 };
  const recentOrders = data?.recent_orders || [];
  const recentPayments = data?.recent_payments || [];
  const chartData = getChartData();
  const statusData = getStatusDistribution();
  const maxValue = Math.max(...chartData.map(d => d.value));

  // Apply responsive styles
  const chartsGridStyle = {
    ...styles.chartsGrid,
    ...(isMobile ? styles.responsive.mobile.chartsGrid : {}),
  };
  const activityGridStyle = {
    ...styles.activityGrid,
    ...(isMobile ? styles.responsive.mobile.activityGrid : {}),
  };
  const summaryGridStyle = {
    ...styles.summaryGrid,
    ...(isMobile ? styles.responsive.mobile.summaryGrid : {}),
  };
  const headerStyle = {
    ...styles.header,
    ...(isMobile ? styles.responsive.mobile.header : {}),
  };
  const headerRightStyle = {
    ...styles.headerRight,
    ...(isMobile ? styles.responsive.mobile.headerRight : {}),
  };

  return (
    <div style={styles.container}>
      {/* Animated Background Blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      <div style={styles.wrapper}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={styles.headerLeft}>
            <div>
              <h1 style={styles.title}>📊 Dashboard</h1>
              <p style={styles.welcomeText}>
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>
          </div>
          <div style={headerRightStyle}>
            <span style={styles.dateBadge}>
              📅 {new Date().toLocaleDateString("en-US", { 
                weekday: "short", 
                year: "numeric", 
                month: "short", 
                day: "numeric" 
              })}
            </span>
            <button
              style={{
                ...styles.refreshButton,
                ...(isRefreshHovered ? styles.refreshButtonHover : {}),
              }}
              onMouseEnter={() => setIsRefreshHovered(true)}
              onMouseLeave={() => setIsRefreshHovered(false)}
              onClick={fetchDashboard}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={summaryGridStyle}>
          {[
            { key: "users", icon: "👥", label: "Total Users", value: summaryData.users, sub: "Active users" },
            { key: "orders", icon: "📦", label: "Total Orders", value: summaryData.orders, sub: "All time orders" },
            { key: "payments", icon: "💳", label: "Total Payments", value: summaryData.payments, sub: "Successful payments" },
            { key: "revenue", icon: "💰", label: "Total Revenue", value: `₹${formatAmount(summaryData.revenue)}`, sub: "From all orders" },
          ].map((item, index) => (
            <div
              key={item.key}
              style={{
                ...styles.summaryCard,
                ...(hoveredCard === item.key ? styles.summaryCardHover : {}),
                animation: `fadeInUp 0.5s ease-out`,
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={() => setHoveredCard(item.key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.summaryCardGlow} />
              <span style={styles.summaryIcon}>{item.icon}</span>
              <p style={styles.summaryLabel}>{item.label}</p>
              <p style={styles.summaryValue}>{item.value}</p>
              <p style={styles.summarySub}>{item.sub}</p>
              <div style={{
                ...styles.summaryTrend,
                ...(index % 2 === 0 ? styles.trendUp : styles.trendDown),
              }}>
                {index % 2 === 0 ? "↑" : "↓"} {Math.floor(Math.random() * 20) + 1}%
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div style={chartsGridStyle}>
          {/* Bar Chart - Weekly Activity */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <div>
                <h3 style={styles.chartTitle}>📈 Weekly Activity</h3>
                <p style={styles.chartSubtitle}>Orders and revenue trend</p>
              </div>
              <div style={styles.chartLegend}>
                <div style={styles.legendItem}>
                  <span style={{ ...styles.legendDot, background: "#667eea" }} />
                  Revenue
                </div>
                <div style={styles.legendItem}>
                  <span style={{ ...styles.legendDot, background: "#ff46b4" }} />
                  Orders
                </div>
              </div>
            </div>
            <div style={styles.barChart}>
              {chartData.map((day, index) => (
                <div key={index} style={styles.barContainer}>
                  <span style={styles.barValue}>₹{day.value}</span>
                  <div
                    style={{
                      ...styles.bar,
                      height: `${(day.value / maxValue) * 100}%`,
                      background: `linear-gradient(180deg, #667eea, #764ba2)`,
                      ...(hoveredBar === index ? styles.barHover : {}),
                    }}
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  <div
                    style={{
                      ...styles.bar,
                      height: `${(day.orders / 30) * 100}%`,
                      background: `linear-gradient(180deg, #ff46b4, #f093fb)`,
                      opacity: 0.7,
                      ...(hoveredBar === index ? styles.barHover : {}),
                    }}
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  <span style={styles.barLabel}>{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut Chart - Status Distribution */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <div>
                <h3 style={styles.chartTitle}>📊 Status Distribution</h3>
                <p style={styles.chartSubtitle}>Order status breakdown</p>
              </div>
            </div>
            <div style={styles.donutContainer}>
              <div style={styles.donut}>
                <svg viewBox="0 0 120 120" style={styles.donutSvg}>
                  {(() => {
                    let acc = 0;
                    const total = statusData.reduce((sum, item) => sum + item.value, 0);
                    return statusData.map((item, index) => {
                      const startAngle = acc;
                      const percentage = item.value / total;
                      const angle = percentage * 360;
                      const endAngle = startAngle + angle;
                      
                      const x1 = 60 + 50 * Math.cos((startAngle * Math.PI) / 180);
                      const y1 = 60 + 50 * Math.sin((startAngle * Math.PI) / 180);
                      const x2 = 60 + 50 * Math.cos((endAngle * Math.PI) / 180);
                      const y2 = 60 + 50 * Math.sin((endAngle * Math.PI) / 180);
                      
                      const largeArc = angle > 180 ? 1 : 0;
                      
                      const pathData = [
                        `M 60 60`,
                        `L ${x1} ${y1}`,
                        `A 50 50 0 ${largeArc} 1 ${x2} ${y2}`,
                        `Z`,
                      ].join(" ");
                      
                      acc += angle;
                      
                      return (
                        <path
                          key={index}
                          d={pathData}
                          fill={item.color}
                          opacity="0.9"
                          style={{
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.opacity = "0.7";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.opacity = "0.9";
                          }}
                        />
                      );
                    });
                  })()}
                </svg>
                <div style={styles.donutLabel}>
                  <p style={styles.donutLabelValue}>{summaryData.orders}</p>
                  <p style={styles.donutLabelText}>Total Orders</p>
                </div>
              </div>
              <div style={styles.donutLegend}>
                {statusData.map((item, index) => (
                  <div key={index} style={styles.donutLegendItem}>
                    <span style={{ ...styles.donutLegendDot, background: item.color }} />
                    {item.label} ({item.value})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={activityGridStyle}>
          {/* Recent Orders */}
          <div style={styles.activityCard}>
            <div style={styles.activityHeader}>
              <h3 style={styles.activityTitle}>🕐 Recent Orders</h3>
              <span 
                style={styles.viewAllLink}
                onClick={() => navigate("/orders")}
                onMouseEnter={(e) => e.target.style.color = "#a8b5ff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(102,126,234,0.6)"}
              >
                View All →
              </span>
            </div>
            <div style={styles.activityList}>
              {recentOrders.slice(0, 5).map((order, index) => (
                <div
                  key={order.id}
                  style={{
                    ...styles.activityItem,
                    ...(hoveredActivity === `order-${order.id}` ? styles.activityItemHover : {}),
                    animation: `fadeInUp 0.3s ease-out`,
                    animationDelay: `${index * 0.05}s`,
                  }}
                  onMouseEnter={() => setHoveredActivity(`order-${order.id}`)}
                  onMouseLeave={() => setHoveredActivity(null)}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <span style={styles.activityIcon}>{getStatusIcon(order.status)}</span>
                  <div style={styles.activityInfo}>
                    <p style={styles.activityText}>Order #{order.id} - {order.user || "Guest"}</p>
                    <p style={styles.activitySub}>{formatDate(order.created_at)}</p>
                  </div>
                  <span style={{ 
                    ...styles.activityAmount,
                    color: getStatusColor(order.status),
                  }}>
                    ₹{formatAmount(order.amount)}
                  </span>
                </div>
              ))}
              {recentOrders.length === 0 && (
                <p style={{ color: "rgba(255,255,255,0.2)", textAlign: "center", padding: "16px 0" }}>
                  No recent orders
                </p>
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div style={styles.activityCard}>
            <div style={styles.activityHeader}>
              <h3 style={styles.activityTitle}>💳 Recent Payments</h3>
              <span 
                style={styles.viewAllLink}
                onClick={() => navigate("/payments")}
                onMouseEnter={(e) => e.target.style.color = "#a8b5ff"}
                onMouseLeave={(e) => e.target.style.color = "rgba(102,126,234,0.6)"}
              >
                View All →
              </span>
            </div>
            <div style={styles.activityList}>
              {recentPayments.slice(0, 5).map((payment, index) => (
                <div
                  key={payment.id}
                  style={{
                    ...styles.activityItem,
                    ...(hoveredActivity === `payment-${payment.id}` ? styles.activityItemHover : {}),
                    animation: `fadeInUp 0.3s ease-out`,
                    animationDelay: `${index * 0.05}s`,
                  }}
                  onMouseEnter={() => setHoveredActivity(`payment-${payment.id}`)}
                  onMouseLeave={() => setHoveredActivity(null)}
                  onClick={() => navigate(`/payments/${payment.id}`)}
                >
                  <span style={styles.activityIcon}>{getStatusIcon(payment.status)}</span>
                  <div style={styles.activityInfo}>
                    <p style={styles.activityText}>Payment #{payment.id} - {payment.user || "Guest"}</p>
                    <p style={styles.activitySub}>{formatDate(payment.created_at)}</p>
                  </div>
                  <span style={{ 
                    ...styles.activityAmount,
                    color: getStatusColor(payment.status),
                  }}>
                    ₹{formatAmount(payment.amount)}
                  </span>
                </div>
              ))}
              {recentPayments.length === 0 && (
                <p style={{ color: "rgba(255,255,255,0.2)", textAlign: "center", padding: "16px 0" }}>
                  No recent payments
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}