import { useEffect, useState } from "react";
import api, { backendURL } from "../../../services/api";
import { useNavigate } from "react-router-dom";

// ============================================================
// STYLES - Premium Admin Orders Table
// ============================================================
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a0a0f 0%, #14141a 100%)",
    padding: "40px 24px",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  wrapper: {
    maxWidth: "1400px",
    margin: "0 auto",
  },

  // ----- Header -----
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
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
  orderCount: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.06)",
    padding: "4px 16px",
    borderRadius: "30px",
    border: "1px solid rgba(255,255,255,0.06)",
    fontWeight: "500",
  },
  headerRight: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  refreshButton: {
    padding: "10px 20px",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "inherit",
  },
  refreshButtonHover: {
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    transform: "translateY(-2px)",
  },
  filterSelect: {
    padding: "10px 16px",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
    outline: "none",
  },
  filterSelectFocus: {
    borderColor: "rgba(102,126,234,0.3)",
    background: "rgba(255,255,255,0.06)",
  },
  searchInput: {
    padding: "10px 16px 10px 40px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    width: "200px",
    fontFamily: "inherit",
  },
  searchInputFocus: {
    background: "rgba(255,255,255,0.06)",
    borderColor: "rgba(102,126,234,0.3)",
    boxShadow: "0 0 30px rgba(102,126,234,0.05)",
  },
  searchContainer: {
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.2)",
    fontSize: "16px",
    pointerEvents: "none",
  },

  // ----- Summary Cards -----
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },
  summaryCard: {
    background: "rgba(255,255,255,0.02)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    padding: "20px 24px",
    backdropFilter: "blur(20px)",
    transition: "all 0.3s ease",
  },
  summaryCardHover: {
    transform: "translateY(-4px)",
    borderColor: "rgba(102,126,234,0.15)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
  },
  summaryLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "600",
    margin: "0 0 8px 0",
  },
  summaryValue: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
  },
  summarySub: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    margin: "4px 0 0 0",
  },

  // ----- Table Container -----
  tableContainer: {
    background: "rgba(255,255,255,0.02)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.05)",
    overflow: "hidden",
    backdropFilter: "blur(20px)",
  },
  tableWrapper: {
    overflowX: "auto",
    padding: "4px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    minWidth: "1000px",
  },

  // ----- Table Header -----
  thead: {
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  th: {
    padding: "16px 20px",
    textAlign: "left",
    color: "rgba(255,255,255,0.4)",
    fontWeight: "600",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "color 0.3s ease",
    userSelect: "none",
  },
  thSortable: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  thSortIcon: {
    fontSize: "12px",
    opacity: 0.3,
  },

  // ----- Table Body -----
  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.03)",
    transition: "all 0.3s ease",
  },
  trHover: {
    background: "rgba(255,255,255,0.03)",
    transform: "scale(1.002)",
  },
  td: {
    padding: "16px 20px",
    color: "rgba(255,255,255,0.85)",
    verticalAlign: "middle",
  },

  // ----- Order ID -----
  orderId: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  orderIdSub: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.2)",
    margin: "2px 0 0 0",
  },

  // ----- Customer Info -----
  customerCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  customerAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    color: "#ffffff",
    flexShrink: 0,
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  customerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  customerName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  customerEmail: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },

  // ----- Amount -----
  amount: {
    fontSize: "18px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: 0,
  },
  amountPrefix: {
    fontSize: "12px",
    fontWeight: "400",
    opacity: 0.5,
  },

  // ----- Items Count -----
  itemsCount: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.5)",
  },
  itemsBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "2px 10px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "30px",
    fontSize: "12px",
    color: "rgba(255,255,255,0.4)",
  },

  // ----- Status Badge -----
  statusBadge: {
    padding: "4px 14px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    border: "1px solid transparent",
  },
  statusPending: {
    background: "rgba(251, 146, 60, 0.12)",
    color: "#fb923c",
    borderColor: "rgba(251, 146, 60, 0.15)",
  },
  statusProcessing: {
    background: "rgba(96, 165, 250, 0.12)",
    color: "#60a5fa",
    borderColor: "rgba(96, 165, 250, 0.15)",
  },
  statusShipped: {
    background: "rgba(74, 222, 128, 0.12)",
    color: "#4ade80",
    borderColor: "rgba(74, 222, 128, 0.15)",
  },
  statusDelivered: {
    background: "rgba(74, 222, 128, 0.12)",
    color: "#4ade80",
    borderColor: "rgba(74, 222, 128, 0.15)",
  },
  statusCancelled: {
    background: "rgba(248, 113, 113, 0.12)",
    color: "#f87171",
    borderColor: "rgba(248, 113, 113, 0.15)",
  },
  statusDefault: {
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.5)",
    borderColor: "rgba(255,255,255,0.06)",
  },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "currentColor",
    animation: "pulse 2s ease-in-out infinite",
  },

  // ----- Date -----
  dateText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    margin: 0,
  },

  // ----- Product Images -----
  productImages: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  productImage: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.06)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  productImageHover: {
    transform: "scale(1.1)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  moreImages: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.3)",
    padding: "0 8px",
  },

  // ----- Action Buttons -----
  actionContainer: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  actionButton: {
    padding: "6px 12px",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.5)",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: "8px",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontFamily: "inherit",
  },
  actionButtonHover: {
    background: "rgba(102,126,234,0.12)",
    color: "#a8b5ff",
    borderColor: "rgba(102,126,234,0.15)",
    transform: "translateY(-1px)",
  },
  actionButtonPrimary: {
    background: "rgba(102,126,234,0.15)",
    color: "#a8b5ff",
    borderColor: "rgba(102,126,234,0.15)",
  },

  // ----- Order Details Expand -----
  expandIcon: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.2)",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  expandIconOpen: {
    transform: "rotate(180deg)",
  },
  expandedRow: {
    background: "rgba(255,255,255,0.02)",
    borderTop: "1px solid rgba(255,255,255,0.03)",
  },
  expandedContent: {
    padding: "20px 24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
  },
  expandedItem: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.04)",
    alignItems: "center",
  },
  expandedItemImage: {
    width: "50px",
    height: "50px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.06)",
    flexShrink: 0,
  },
  expandedItemInfo: {
    flex: 1,
    minWidth: 0,
  },
  expandedItemName: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 4px 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  expandedItemMeta: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },
  expandedItemPrice: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },

  // ----- Loading State -----
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "20px",
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

  // ----- Empty State -----
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
    display: "block",
  },
  emptyTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  emptySubtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },

  // ----- Footer -----
  tableFooter: {
    padding: "16px 20px",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  footerInfo: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.3)",
  },
  pagination: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },
  pageButton: {
    padding: "6px 14px",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.5)",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
  },
  pageButtonHover: {
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
  },
  pageButtonActive: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#ffffff",
    borderColor: "transparent",
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
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
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
export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isRefreshHovered, setIsRefreshHovered] = useState(false);
  const [isFilterFocused, setIsFilterFocused] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredSummary, setHoveredSummary] = useState(null);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${backendURL}/ordersList/`);
      console.log("Orders fetched:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get status style
  const getStatusStyle = (status) => {
    const statusMap = {
      "PENDING": styles.statusPending,
      "PROCESSING": styles.statusProcessing,
      "SHIPPED": styles.statusShipped,
      "DELIVERED": styles.statusDelivered,
      "CANCELLED": styles.statusCancelled,
    };
    return statusMap[status?.toUpperCase()] || styles.statusDefault;
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const iconMap = {
      "PENDING": "⏳",
      "PROCESSING": "🔄",
      "SHIPPED": "📦",
      "DELIVERED": "✅",
      "CANCELLED": "❌",
    };
    return iconMap[status?.toUpperCase()] || "📋";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format amount
  const formatAmount = (amount) => {
    return Number(amount || 0).toFixed(2);
  };

  // Get avatar color
  const getAvatarColor = (name) => {
    const colors = [
      "linear-gradient(135deg, #667eea, #764ba2)",
      "linear-gradient(135deg, #f093fb, #f5576c)",
      "linear-gradient(135deg, #4facfe, #00f2fe)",
      "linear-gradient(135deg, #43e97b, #38f9d7)",
      "linear-gradient(135deg, #fa709a, #fee140)",
    ];
    let hash = 0;
    for (let i = 0; i < (name || "U").length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Get initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = 
      String(order.id).includes(search) ||
      order.user?.username?.toLowerCase().includes(search) ||
      order.user?.email?.toLowerCase().includes(search);
    
    const matchesStatus = filterStatus === "all" || order.status?.toUpperCase() === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Calculate summary
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
  const pendingOrders = orders.filter(o => 
    ["PENDING", "PROCESSING"].includes(o.status?.toUpperCase())
  ).length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.querySelector('[style*="tableContainer"]')?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner} />
            <p style={styles.loadingText}>Loading orders...</p>
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
            <h1 style={styles.title}>📦 All Orders</h1>
            <span style={styles.orderCount}>
              {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
            </span>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.searchContainer}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  ...styles.searchInput,
                  ...(isSearchFocused ? styles.searchInputFocus : {}),
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                ...styles.filterSelect,
                ...(isFilterFocused ? styles.filterSelectFocus : {}),
              }}
              onFocus={() => setIsFilterFocused(true)}
              onBlur={() => setIsFilterFocused(false)}
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <button
              style={{
                ...styles.refreshButton,
                ...(isRefreshHovered ? styles.refreshButtonHover : {}),
              }}
              onMouseEnter={() => setIsRefreshHovered(true)}
              onMouseLeave={() => setIsRefreshHovered(false)}
              onClick={fetchOrders}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {orders.length > 0 && (
          <div style={styles.summaryGrid}>
            <div 
              style={styles.summaryCard}
              onMouseEnter={() => setHoveredSummary("total")}
              onMouseLeave={() => setHoveredSummary(null)}
            >
              <p style={styles.summaryLabel}>Total Orders</p>
              <p style={styles.summaryValue}>{totalOrders}</p>
              <p style={styles.summarySub}>All time orders</p>
            </div>
            <div 
              style={styles.summaryCard}
              onMouseEnter={() => setHoveredSummary("revenue")}
              onMouseLeave={() => setHoveredSummary(null)}
            >
              <p style={styles.summaryLabel}>Total Revenue</p>
              <p style={{ ...styles.summaryValue, background: "linear-gradient(135deg, #7850ff, #ff46b4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ₹{formatAmount(totalRevenue)}
              </p>
              <p style={styles.summarySub}>From {totalOrders} orders</p>
            </div>
            <div 
              style={styles.summaryCard}
              onMouseEnter={() => setHoveredSummary("pending")}
              onMouseLeave={() => setHoveredSummary(null)}
            >
              <p style={styles.summaryLabel}>Pending Orders</p>
              <p style={{ ...styles.summaryValue, color: "#fb923c" }}>{pendingOrders}</p>
              <p style={styles.summarySub}>Awaiting processing</p>
            </div>
          </div>
        )}

        {/* Table */}
        <div style={styles.tableContainer}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Items</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                  <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: "40px 20px", textAlign: "center" }}>
                      <div style={styles.emptyState}>
                        <span style={styles.emptyIcon}>📦</span>
                        <p style={styles.emptyTitle}>No orders found</p>
                        <p style={styles.emptySubtitle}>
                          {filterStatus !== "all" || searchTerm ? "Try adjusting your filters" : "No orders placed yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order, index) => {
                    const isHovered = hoveredRow === order.id;
                    const isExpanded = expandedOrder === order.id;
                    const statusStyle = getStatusStyle(order.status);
                    const statusIcon = getStatusIcon(order.status);
                    const user = order.user || {};
                    const avatarColor = getAvatarColor(user.username);
                    const initials = getInitials(user.username);
                    const itemCount = order.items?.length || 0;
                    const firstItems = order.items?.slice(0, 3) || [];
                    const remainingItems = itemCount - 3;

                    return (
                      <>
                        <tr
                          key={order.id}
                          style={{
                            ...styles.tr,
                            ...(isHovered ? styles.trHover : {}),
                            animation: `fadeInUp 0.3s ease-out`,
                            animationDelay: `${index * 0.05}s`,
                          }}
                          onMouseEnter={() => setHoveredRow(order.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <td style={styles.td}>
                            <p style={styles.orderId}>#{order.id}</p>
                            <p style={styles.orderIdSub}>ID: {order.id}</p>
                          </td>

                          <td style={styles.td}>
                            <div style={styles.customerCell}>
                              <div style={{ ...styles.customerAvatar, background: avatarColor }}>
                                {initials}
                              </div>
                              <div style={styles.customerInfo}>
                                <p style={styles.customerName}>{user.username || "Guest"}</p>
                                <p style={styles.customerEmail}>{user.email || "No email"}</p>
                              </div>
                            </div>
                          </td>

                          <td style={styles.td}>
                            <p style={styles.amount}>
                              <span style={styles.amountPrefix}>₹</span>
                              {formatAmount(order.total_amount)}
                            </p>
                          </td>

                          <td style={styles.td}>
                            <span style={styles.itemsBadge}>
                              🛍️ {itemCount} item{itemCount !== 1 ? "s" : ""}
                            </span>
                            <div style={styles.productImages}>
                              {firstItems.map((item, idx) => (
                                <img
                                  key={idx}
                                  src={item.product?.images?.[0] || "/placeholder-image.jpg"}
                                  alt={item.product?.name || "Product"}
                                  style={{
                                    ...styles.productImage,
                                    ...(hoveredImage === `${order.id}-${idx}` ? styles.productImageHover : {}),
                                  }}
                                  onMouseEnter={() => setHoveredImage(`${order.id}-${idx}`)}
                                  onMouseLeave={() => setHoveredImage(null)}
                                  onError={(e) => {
                                    e.target.src = "/placeholder-image.jpg";
                                  }}
                                />
                              ))}
                              {remainingItems > 0 && (
                                <span style={styles.moreImages}>+{remainingItems} more</span>
                              )}
                            </div>
                          </td>

                          <td style={styles.td}>
                            <span style={{ ...styles.statusBadge, ...statusStyle }}>
                              <span style={styles.statusDot} />
                              {statusIcon} {order.status || "UNKNOWN"}
                            </span>
                          </td>

                          <td style={styles.td}>
                            <p style={styles.dateText}>{formatDate(order.created_at)}</p>
                          </td>

                          <td style={{ ...styles.td, textAlign: "center" }}>
                            <div style={styles.actionContainer}>
                              <button
                                style={{
                                  ...styles.actionButton,
                                  ...(hoveredAction === `view-${order.id}` ? styles.actionButtonHover : {}),
                                }}
                                onMouseEnter={() => setHoveredAction(`view-${order.id}`)}
                                onMouseLeave={() => setHoveredAction(null)}
                                onClick={() => navigate(`/orders/${order.id}`)}
                              >
                                👁️ View
                              </button>
                              <button
                                style={{
                                  ...styles.actionButton,
                                  ...styles.actionButtonPrimary,
                                  ...(hoveredAction === `expand-${order.id}` ? styles.actionButtonHover : {}),
                                }}
                                onMouseEnter={() => setHoveredAction(`expand-${order.id}`)}
                                onMouseLeave={() => setHoveredAction(null)}
                                onClick={() => toggleExpand(order.id)}
                              >
                                <span style={{
                                  ...styles.expandIcon,
                                  ...(isExpanded ? styles.expandIconOpen : {}),
                                }}>
                                  ▼
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Row - Order Items */}
                        {isExpanded && order.items && order.items.length > 0 && (
                          <tr style={styles.expandedRow}>
                            <td colSpan="7" style={{ padding: 0 }}>
                              <div style={styles.expandedContent}>
                                {order.items.map((item) => (
                                  <div key={item.id} style={styles.expandedItem}>
                                    <img
                                      src={item.product?.images?.[0] || "/placeholder-image.jpg"}
                                      alt={item.product?.name || "Product"}
                                      style={styles.expandedItemImage}
                                      onError={(e) => {
                                        e.target.src = "/placeholder-image.jpg";
                                      }}
                                    />
                                    <div style={styles.expandedItemInfo}>
                                      <p style={styles.expandedItemName}>
                                        {item.product?.name || "Product"}
                                      </p>
                                      <p style={styles.expandedItemMeta}>
                                        Qty: {item.quantity || 1}
                                      </p>
                                    </div>
                                    <p style={styles.expandedItemPrice}>
                                      ₹{formatAmount(item.price)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {paginatedOrders.length > 0 && (
            <div style={styles.tableFooter}>
              <span style={styles.footerInfo}>
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
              </span>

              <div style={styles.pagination}>
                <button
                  style={{
                    ...styles.pageButton,
                    ...(currentPage > 1 ? styles.pageButtonHover : {}),
                  }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ←
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                      style={{
                        ...styles.pageButton,
                        ...(currentPage === pageNum ? styles.pageButtonActive : {}),
                        ...(currentPage !== pageNum ? styles.pageButtonHover : {}),
                      }}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  style={{
                    ...styles.pageButton,
                    ...(currentPage < totalPages ? styles.pageButtonHover : {}),
                  }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}