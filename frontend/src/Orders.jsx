import { useEffect, useState } from "react";
import api, { backendURL } from "./services/api";
import { useNavigate } from "react-router-dom";

// ============================================================
// STYLES - Premium Orders Page
// ============================================================
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a0a0f 0%, #14141a 100%)",
    padding: "40px 20px",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "16px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.02em",
    background: "linear-gradient(135deg, #ffffff 0%, #b28aff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  orderCount: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.06)",
    padding: "4px 14px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  filterSection: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  filterButton: {
    padding: "8px 20px",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  filterButtonActive: {
    background: "linear-gradient(135deg, rgba(120,80,255,0.2), rgba(255,70,180,0.2))",
    color: "#ffffff",
    borderColor: "rgba(120,80,255,0.3)",
  },

  // ----- Empty State -----
  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "24px",
    border: "2px dashed rgba(255,255,255,0.06)",
  },
  emptyIcon: {
    fontSize: "80px",
    marginBottom: "20px",
    display: "block",
  },
  emptyTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 12px 0",
  },
  emptySubtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.4)",
    margin: "0 0 24px 0",
  },
  shopButton: {
    padding: "14px 40px",
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 30px rgba(120,80,255,0.3)",
  },

  // ----- Order Card -----
  orderCard: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.06)",
    marginBottom: "24px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    backdropFilter: "blur(20px)",
  },
  orderCardHover: {
    borderColor: "rgba(120,80,255,0.15)",
    transform: "translateY(-4px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  orderHeader: {
    padding: "20px 24px",
    background: "rgba(255,255,255,0.02)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  orderHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  orderId: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  orderIdLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    fontWeight: "400",
  },
  orderDate: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  orderHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  // ----- Status Badge -----
  statusBadge: {
    padding: "6px 16px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  statusPending: {
    background: "rgba(251, 146, 60, 0.12)",
    color: "#fb923c",
    border: "1px solid rgba(251, 146, 60, 0.15)",
  },
  statusProcessing: {
    background: "rgba(96, 165, 250, 0.12)",
    color: "#60a5fa",
    border: "1px solid rgba(96, 165, 250, 0.15)",
  },
  statusShipped: {
    background: "rgba(74, 222, 128, 0.12)",
    color: "#4ade80",
    border: "1px solid rgba(74, 222, 128, 0.15)",
  },
  statusDelivered: {
    background: "rgba(74, 222, 128, 0.12)",
    color: "#4ade80",
    border: "1px solid rgba(74, 222, 128, 0.15)",
  },
  statusCancelled: {
    background: "rgba(248, 113, 113, 0.12)",
    color: "#f87171",
    border: "1px solid rgba(248, 113, 113, 0.15)",
  },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "currentColor",
  },

  // ----- Order Body -----
  orderBody: {
    padding: "24px",
  },
  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
  },
  itemCard: {
    display: "flex",
    gap: "16px",
    padding: "12px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.04)",
    transition: "all 0.3s ease",
    alignItems: "center",
  },
  itemCardHover: {
    background: "rgba(255,255,255,0.04)",
    borderColor: "rgba(120,80,255,0.1)",
    transform: "translateX(4px)",
  },
  itemImage: {
    width: "64px",
    height: "64px",
    borderRadius: "10px",
    objectFit: "cover",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.04)",
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
    minWidth: 0,
  },
  itemName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 4px 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  itemMeta: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  itemMetaTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  itemRight: {
    textAlign: "right",
    flexShrink: 0,
  },
  itemPrice: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 4px 0",
  },
  itemQuantity: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },

  // ----- Order Footer -----
  orderFooter: {
    padding: "16px 24px",
    background: "rgba(255,255,255,0.02)",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  totalLabel: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.4)",
    fontWeight: "500",
  },
  totalAmount: {
    fontSize: "20px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  footerRight: {
    display: "flex",
    gap: "10px",
  },
  actionButton: {
    padding: "8px 20px",
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
  },
  actionButtonHover: {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.12)",
    color: "#ffffff",
    transform: "translateY(-2px)",
  },
  actionButtonPrimary: {
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    color: "#ffffff",
    border: "none",
    boxShadow: "0 4px 20px rgba(120,80,255,0.2)",
  },

  // ----- Loading State -----
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    gap: "16px",
  },
  loadingSpinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(255,255,255,0.06)",
    borderTop: "4px solid #7850ff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.4)",
  },

  // ----- Scrollbar -----
  scrollbarStyles: {
    "::-webkit-scrollbar": {
      width: "4px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "rgba(255,255,255,0.1)",
      borderRadius: "10px",
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
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
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
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [hoveredOrder, setHoveredOrder] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${backendURL}/orders/`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const statusMap = {
      "PENDING": { label: "Pending", style: styles.statusPending, icon: "⏳" },
      "PROCESSING": { label: "Processing", style: styles.statusProcessing, icon: "🔄" },
      "SHIPPED": { label: "Shipped", style: styles.statusShipped, icon: "📦" },
      "DELIVERED": { label: "Delivered", style: styles.statusDelivered, icon: "✅" },
      "CANCELLED": { label: "Cancelled", style: styles.statusCancelled, icon: "❌" },
    };
    return statusMap[status] || { label: status, style: styles.statusPending, icon: "📋" };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFilteredOrders = () => {
    if (filter === "all") return orders;
    return orders.filter((order) => order.status === filter);
  };

  const filteredOrders = getFilteredOrders();

  const filterOptions = [
    { value: "all", label: "All Orders" },
    { value: "PENDING", label: "Pending" },
    { value: "PROCESSING", label: "Processing" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/track-order/${orderId}`);
  };

  const handleReorder = (order) => {
    // Add all items from order to cart
    alert("Items added to cart!");
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner} />
            <p style={styles.loadingText}>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.title}>📋 My Orders</h1>
            <span style={styles.orderCount}>{orders.length} orders</span>
          </div>

          <div style={styles.filterSection}>
            {filterOptions.map((option) => (
              <button
                key={option.value}
                style={{
                  ...styles.filterButton,
                  ...(filter === option.value ? styles.filterButtonActive : {}),
                }}
                onClick={() => setFilter(option.value)}
                onMouseEnter={(e) => {
                  if (filter !== option.value) {
                    e.target.style.background = "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== option.value) {
                    e.target.style.background = "rgba(255,255,255,0.04)";
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>🛒</span>
            <h2 style={styles.emptyTitle}>No Orders Found</h2>
            <p style={styles.emptySubtitle}>
              {orders.length === 0
                ? "You haven't placed any orders yet. Start shopping now!"
                : `No ${filter} orders found. Try a different filter.`}
            </p>
            <button
              style={styles.shopButton}
              onClick={() => navigate("/")}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.02)";
                e.target.style.boxShadow = "0 12px 40px rgba(120,80,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "none";
                e.target.style.boxShadow = "0 8px 30px rgba(120,80,255,0.3)";
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          filteredOrders.map((order, index) => {
            const statusConfig = getStatusConfig(order.status);
            const isHovered = hoveredOrder === order.id;

            return (
              <div
                key={order.id}
                style={{
                  ...styles.orderCard,
                  ...(isHovered ? styles.orderCardHover : {}),
                  animation: `fadeInUp 0.5s ease-out`,
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredOrder(order.id)}
                onMouseLeave={() => setHoveredOrder(null)}
              >
                {/* Order Header */}
                <div style={styles.orderHeader}>
                  <div style={styles.orderHeaderLeft}>
                    <div>
                      <p style={styles.orderId}>
                        <span style={styles.orderIdLabel}>ORDER #</span>
                        {order.id}
                      </p>
                    </div>
                    <span style={styles.orderDate}>
                      📅 {formatDate(order.created_at)}
                    </span>
                    <div style={{ ...styles.statusBadge, ...statusConfig.style }}>
                      <span style={styles.statusDot} />
                      {statusConfig.icon} {statusConfig.label}
                    </div>
                  </div>
                  <div style={styles.orderHeaderRight}>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
                      {order.items?.length || 0} items
                    </span>
                  </div>
                </div>

                {/* Order Body - Items */}
                <div style={styles.orderBody}>
                  <div style={styles.itemsGrid}>
                    {order.items?.map((item, idx) => {
                      const isItemHovered = hoveredItem === `${order.id}-${idx}`;
                      const product = item.product || {};
                      const imageUrl = product.images?.[0] || "/placeholder-image.jpg";

                      return (
                        <div
                          key={idx}
                          style={{
                            ...styles.itemCard,
                            ...(isItemHovered ? styles.itemCardHover : {}),
                          }}
                          onMouseEnter={() => setHoveredItem(`${order.id}-${idx}`)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <img
                            src={imageUrl}
                            alt={product.name || "Product"}
                            style={styles.itemImage}
                            onError={(e) => {
                              e.target.src = "/placeholder-image.jpg";
                            }}
                          />
                          <div style={styles.itemInfo}>
                            <p style={styles.itemName}>{product.name || "Product"}</p>
                            <p style={styles.itemMeta}>
                              <span style={styles.itemMetaTag}>🏷️ {product.brand || "N/A"}</span>
                              <span style={styles.itemMetaTag}>📂 {product.category || "N/A"}</span>
                            </p>
                          </div>
                          <div style={styles.itemRight}>
                            <p style={styles.itemPrice}>₹{Number(item.price || 0).toFixed(2)}</p>
                            <p style={styles.itemQuantity}>Qty: {item.quantity || 1}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Footer */}
                <div style={styles.orderFooter}>
                  <div style={styles.footerLeft}>
                    <span style={styles.totalLabel}>Total Amount</span>
                    <span style={styles.totalAmount}>
                      ₹{Number(order.total_amount || 0).toFixed(2)}
                    </span>
                  </div>
                  {/* <div style={styles.footerRight}>
                    <button
                      style={{
                        ...styles.actionButton,
                        ...(hoveredAction === "view" ? styles.actionButtonHover : {}),
                      }}
                      onMouseEnter={() => setHoveredAction("view")}
                      onMouseLeave={() => setHoveredAction(null)}
                      onClick={() => handleViewOrder(order.id)}
                    >
                      👁️ View Details
                    </button>
                    {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                      <button
                        style={{
                          ...styles.actionButton,
                          ...(hoveredAction === "track" ? styles.actionButtonHover : {}),
                        }}
                        onMouseEnter={() => setHoveredAction("track")}
                        onMouseLeave={() => setHoveredAction(null)}
                        onClick={() => handleTrackOrder(order.id)}
                      >
                        📍 Track
                      </button>
                    )}
                    <button
                      style={{
                        ...styles.actionButton,
                        ...styles.actionButtonPrimary,
                        ...(hoveredAction === "reorder" ? styles.actionButtonHover : {}),
                      }}
                      onMouseEnter={() => setHoveredAction("reorder")}
                      onMouseLeave={() => setHoveredAction(null)}
                      onClick={() => handleReorder(order)}
                    >
                      🔄 Reorder
                    </button>
                  </div> */}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}