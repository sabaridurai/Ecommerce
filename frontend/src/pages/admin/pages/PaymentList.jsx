import { useEffect, useState } from "react";
import api, { backendURL } from "../../../services/api";
import { useNavigate } from "react-router-dom";

// ============================================================
// STYLES - Premium Payments Table
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
  paymentCount: {
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

  // ----- Summary Cards -----
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
    fontSize: "28px",
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
    minWidth: "900px",
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

  // ----- Payment ID -----
  paymentId: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  paymentIdSub: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.2)",
    margin: "2px 0 0 0",
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
  statusAwaiting: {
    background: "rgba(96, 165, 250, 0.12)",
    color: "#60a5fa",
    borderColor: "rgba(96, 165, 250, 0.15)",
  },
  statusCompleted: {
    background: "rgba(74, 222, 128, 0.12)",
    color: "#4ade80",
    borderColor: "rgba(74, 222, 128, 0.15)",
  },
  statusFailed: {
    background: "rgba(248, 113, 113, 0.12)",
    color: "#f87171",
    borderColor: "rgba(248, 113, 113, 0.15)",
  },
  statusRefunded: {
    background: "rgba(167, 139, 250, 0.12)",
    color: "#a78bfa",
    borderColor: "rgba(167, 139, 250, 0.15)",
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

  // ----- Proof Image -----
  proofContainer: {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
  },
  proofImage: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.06)",
    transition: "all 0.3s ease",
  },
  proofImageHover: {
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  proofOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  proofOverlayShow: {
    opacity: 1,
  },
  proofOverlayText: {
    fontSize: "11px",
    color: "#ffffff",
    fontWeight: "500",
  },
  noProof: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.2)",
    fontStyle: "italic",
  },

  // ----- Date -----
  dateText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    margin: 0,
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
  actionButtonSuccess: {
    color: "rgba(74,222,128,0.6)",
  },
  actionButtonSuccessHover: {
    background: "rgba(74,222,128,0.12)",
    color: "#4ade80",
    borderColor: "rgba(74,222,128,0.15)",
  },

  // ----- Modal -----
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(12px)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    animation: "fadeIn 0.3s ease-out",
  },
  modalContent: {
    maxWidth: "600px",
    width: "100%",
    background: "rgba(20,20,30,0.95)",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "32px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.3)",
  },
  modalClose: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "rgba(255,255,255,0.06)",
    border: "none",
    color: "#ff0000",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
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
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
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
export default function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [isRefreshHovered, setIsRefreshHovered] = useState(false);
  const [isFilterFocused, setIsFilterFocused] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProof, setHoveredProof] = useState(null);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/paymentsList/");
      console.log("API RESPONSE:", res.data);

      if (!Array.isArray(res.data)) {
        console.error("Invalid response:", res.data);
        setPayments([]);
        return;
      }

      setPayments(res.data);
    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  // Get status style
  const getStatusStyle = (status) => {
    const statusMap = {
      "PENDING": styles.statusPending,
      "PENDING_PAYMENT": styles.statusPending,
      "AWAITING_PROOF": styles.statusAwaiting,
      "COMPLETED": styles.statusCompleted,
      "FAILED": styles.statusFailed,
      "REFUNDED": styles.statusRefunded,
    };
    return statusMap[status?.toUpperCase()] || styles.statusDefault;
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const iconMap = {
      "PENDING": "⏳",
      "PENDING_PAYMENT": "⏳",
      "AWAITING_PROOF": "📤",
      "COMPLETED": "✅",
      "FAILED": "❌",
      "REFUNDED": "🔄",
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

  // Filter payments
  const filteredPayments = filterStatus === "all" 
    ? payments 
    : payments.filter(p => p.status?.toUpperCase() === filterStatus);

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  // Calculate summary
  const totalAmount = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const completedPayments = payments.filter(p => p.status?.toUpperCase() === "COMPLETED").length;
  const pendingPayments = payments.filter(p => 
    ["PENDING", "PENDING_PAYMENT", "AWAITING_PROOF"].includes(p.status?.toUpperCase())
  ).length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.querySelector('[style*="tableContainer"]')?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProofClick = (proofUrl) => {
    setSelectedProof(proofUrl);
  };

  const closeModal = () => {
    setSelectedProof(null);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner} />
            <p style={styles.loadingText}>Loading payments...</p>
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
          <div style={styles.headerLeft}>💳
            <h1 style={styles.title}> Payments</h1>
            <span style={styles.paymentCount}>
              {filteredPayments.length} {filteredPayments.length === 1 ? "payment" : "payments"}
            </span>
          </div>

          <div style={styles.headerRight}>
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
              <option value="PENDING_PAYMENT">Pending Payment</option>
              <option value="AWAITING_PROOF">Awaiting Proof</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>

            <button
              style={{
                ...styles.refreshButton,
                ...(isRefreshHovered ? styles.refreshButtonHover : {}),
              }}
              onMouseEnter={() => setIsRefreshHovered(true)}
              onMouseLeave={() => setIsRefreshHovered(false)}
              onClick={fetchPayments}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {payments.length > 0 && (
          <div style={styles.summaryGrid}>
            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>Total Payments</p>
              <p style={styles.summaryValue}>₹{formatAmount(totalAmount)}</p>
              <p style={styles.summarySub}>{payments.length} transactions</p>
            </div>
            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>Completed</p>
              <p style={{ ...styles.summaryValue, color: "#4ade80" }}>{completedPayments}</p>
              <p style={styles.summarySub}>
                {payments.length > 0 ? Math.round((completedPayments / payments.length) * 100) : 0}% success rate
              </p>
            </div>
            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>Pending</p>
              <p style={{ ...styles.summaryValue, color: "#fb923c" }}>{pendingPayments}</p>
              <p style={styles.summarySub}>Awaiting confirmation</p>
            </div>
          </div>
        )}

        {/* Table */}
        <div style={styles.tableContainer}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Payment ID</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Proof</th>
                  <th style={styles.th}>Date</th>
                  <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedPayments.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: "40px 20px", textAlign: "center" }}>
                      <div style={styles.emptyState}>
                        <span style={styles.emptyIcon}>💳</span>
                        <p style={styles.emptyTitle}>No payments found</p>
                        <p style={styles.emptySubtitle}>
                          {filterStatus !== "all" ? "Try a different filter" : "No payments recorded yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedPayments.map((p, index) => {
                    const isHovered = hoveredRow === p.id;
                    const statusStyle = getStatusStyle(p.status);
                    const statusIcon = getStatusIcon(p.status);
                    const proofUrl = p.proof;

                    return (
                      <tr
                        key={p.id}
                        style={{
                          ...styles.tr,
                          ...(isHovered ? styles.trHover : {}),
                          animation: `fadeInUp 0.3s ease-out`,
                          animationDelay: `${index * 0.05}s`,
                        }}
                        onMouseEnter={() => setHoveredRow(p.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td style={styles.td}>
                          <p style={styles.paymentId}>#{p.session_id || p.id}</p>
                          <p style={styles.paymentIdSub}>ID: {p.id}</p>
                        </td>

                        <td style={styles.td}>
                          <p style={styles.amount}>
                            <span style={styles.amountPrefix}>₹</span>
                            {formatAmount(p.amount)}
                          </p>
                        </td>

                        <td style={styles.td}>
                          <span style={{ ...styles.statusBadge, ...statusStyle }}>
                            <span style={styles.statusDot} />
                            {statusIcon} {p.status || "UNKNOWN"}
                          </span>
                        </td>

                        <td style={styles.td}>
                          {proofUrl ? (
                            <div
                              style={styles.proofContainer}
                              onMouseEnter={() => setHoveredProof(p.id)}
                              onMouseLeave={() => setHoveredProof(null)}
                              onClick={() => handleProofClick(proofUrl)}
                            >
                              <img
                                src={proofUrl}
                                alt="Payment proof"
                                style={{
                                  ...styles.proofImage,
                                  ...(hoveredProof === p.id ? styles.proofImageHover : {}),
                                }}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                              <div
                                style={{
                                  ...styles.proofOverlay,
                                  ...(hoveredProof === p.id ? styles.proofOverlayShow : {}),
                                }}
                              >
                                <span style={styles.proofOverlayText}>🔍 View</span>
                              </div>
                            </div>
                          ) : (
                            <span style={styles.noProof}>No proof</span>
                          )}
                        </td>

                        <td style={styles.td}>
                          <p style={styles.dateText}>{formatDate(p.created_at || p.date)}</p>
                        </td>

                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <div style={styles.actionContainer}>
                            <button
                              style={{
                                ...styles.actionButton,
                                ...(hoveredAction === `view-${p.id}` ? styles.actionButtonHover : {}),
                              }}
                              onMouseEnter={() => setHoveredAction(`view-${p.id}`)}
                              onMouseLeave={() => setHoveredAction(null)}
                              onClick={() => alert('Functions are not implmented')}
                            >
                              👁️ View
                            </button>
                            {p.status?.toUpperCase() === "PENDING" && (
                              <button
                                style={{
                                  ...styles.actionButton,
                                  ...styles.actionButtonSuccess,
                                  ...(hoveredAction === `verify-${p.id}` ? styles.actionButtonSuccessHover : {}),
                                }}
                                onMouseEnter={() => setHoveredAction(`verify-${p.id}`)}
                                onMouseLeave={() => setHoveredAction(null)}
                                onClick={async () => {
                                 if (window.confirm("Verify this payment?")) {
                                    try {
                                    await api.patch(
                                    `/payments/${p.id}/verify/`
                                    );

                                    alert("Payment verified successfully");

                                    fetchPayments(); // refresh table

                                    } catch (error) {
                                    console.error(error);

                                    alert("Failed to verify payment");
                                    }
                                    }
                                }
                              
                              
                              }
                              >
                                ✅ Verify
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {paginatedPayments.length > 0 && (
            <div style={styles.tableFooter}>
              <span style={styles.footerInfo}>
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
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

      {/* Proof Modal */}
      {selectedProof && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: "relative" }}>
              <button
                style={styles.modalClose}
                onClick={closeModal}
                onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.06)"}
              >
                ✕ Close
              </button>
              <img src={selectedProof} alt="Payment Proof" style={styles.modalImage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}