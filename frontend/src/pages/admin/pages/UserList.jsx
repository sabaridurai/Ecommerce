import { useEffect, useState } from "react";
import api, { backendURL } from "../../../services/api";
import { useNavigate } from "react-router-dom";

// ============================================================
// STYLES - Premium Users Table
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
  userCount: {
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
  },
  refreshButtonHover: {
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    transform: "translateY(-2px)",
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
    width: "240px",
    fontFamily: "inherit",
  },
  searchInputFocus: {
    background: "rgba(255,255,255,0.06)",
    borderColor: "rgba(102,126,234,0.3)",
    boxShadow: "0 0 30px rgba(102,126,234,0.05)",
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
  searchContainer: {
    position: "relative",
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
    minWidth: "700px",
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
  thHover: {
    color: "rgba(255,255,255,0.8)",
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

  // ----- User Avatar -----
  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "700",
    color: "#ffffff",
    flexShrink: 0,
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  userEmail: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },

  // ----- Role Badge -----
  roleBadge: {
    padding: "4px 14px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    border: "1px solid transparent",
  },
  roleAdmin: {
    background: "rgba(251, 146, 60, 0.12)",
    color: "#fb923c",
    borderColor: "rgba(251, 146, 60, 0.15)",
  },
  roleUser: {
    background: "rgba(96, 165, 250, 0.12)",
    color: "#60a5fa",
    borderColor: "rgba(96, 165, 250, 0.15)",
  },
  roleModerator: {
    background: "rgba(74, 222, 128, 0.12)",
    color: "#4ade80",
    borderColor: "rgba(74, 222, 128, 0.15)",
  },
  roleSeller: {
    background: "rgba(244, 63, 94, 0.12)",
    color: "#f43f5e",
    borderColor: "rgba(244, 63, 94, 0.15)",
  },
  roleDefault: {
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.5)",
    borderColor: "rgba(255,255,255,0.06)",
  },
  roleDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "currentColor",
  },

  // ----- Status Badge -----
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "30px",
    fontSize: "11px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  statusActive: {
    background: "rgba(74, 222, 128, 0.12)",
    color: "#4ade80",
    border: "1px solid rgba(74, 222, 128, 0.15)",
  },
  statusInactive: {
    background: "rgba(248, 113, 113, 0.12)",
    color: "#f87171",
    border: "1px solid rgba(248, 113, 113, 0.15)",
  },
  statusPending: {
    background: "rgba(251, 146, 60, 0.12)",
    color: "#fb923c",
    border: "1px solid rgba(251, 146, 60, 0.15)",
  },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "currentColor",
    animation: "pulse 2s ease-in-out infinite",
  },

  // ----- Action Buttons -----
  actionContainer: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
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
  },
  actionButtonHover: {
    background: "rgba(102,126,234,0.12)",
    color: "#a8b5ff",
    borderColor: "rgba(102,126,234,0.15)",
    transform: "translateY(-1px)",
  },
  actionButtonDanger: {
    color: "rgba(248,113,113,0.6)",
  },
  actionButtonDangerHover: {
    background: "rgba(248,113,113,0.12)",
    color: "#f87171",
    borderColor: "rgba(248,113,113,0.15)",
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
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);
}

// ============================================================
// COMPONENT
// ============================================================
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isRefreshHovered, setIsRefreshHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${backendURL}/usersList/`);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get color for avatar based on username
  const getAvatarColor = (username) => {
    const colors = [
      "linear-gradient(135deg, #667eea, #764ba2)",
      "linear-gradient(135deg, #f093fb, #f5576c)",
      "linear-gradient(135deg, #4facfe, #00f2fe)",
      "linear-gradient(135deg, #43e97b, #38f9d7)",
      "linear-gradient(135deg, #fa709a, #fee140)",
      "linear-gradient(135deg, #a18cd1, #fbc2eb)",
      "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    ];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Get role badge style
  const getRoleStyle = (role) => {
    const roleMap = {
      "ADMIN": styles.roleAdmin,
      "MODERATOR": styles.roleModerator,
      "SELLER": styles.roleSeller,
      "USER": styles.roleUser,
    };
    return roleMap[role?.toUpperCase()] || styles.roleDefault;
  };

  // Get status style
  const getStatusStyle = (isActive) => {
    return isActive ? styles.statusActive : styles.statusInactive;
  };

  // Get initials from name
  const getInitials = (name) => {
    return name?.charAt(0).toUpperCase() || "U";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter and sort users
  const filteredUsers = users.filter((u) => {
    const search = searchTerm.toLowerCase();
    return (
      u.username?.toLowerCase().includes(search) ||
      u.email?.toLowerCase().includes(search) ||
      u.phone?.includes(search) ||
      u.role?.toLowerCase().includes(search)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField] || "";
    const bVal = b[sortField] || "";
    const comparison = String(aVal).localeCompare(String(bVal));
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of table
    document.querySelector('[style*="tableContainer"]')?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner} />
            <p style={styles.loadingText}>Loading users...</p>
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
            <h1 style={styles.title}>👥 Users</h1>
            <span style={styles.userCount}>
              {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}
            </span>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.searchContainer}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search users..."
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

            <button
              style={{
                ...styles.refreshButton,
                ...(isRefreshHovered ? styles.refreshButtonHover : {}),
              }}
              onMouseEnter={() => setIsRefreshHovered(true)}
              onMouseLeave={() => setIsRefreshHovered(false)}
              onClick={fetchUsers}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableContainer}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th
                    style={styles.th}
                    onClick={() => handleSort("username")}
                    onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                  >
                    <div style={styles.thSortable}>
                      User
                      {sortField === "username" && (
                        <span style={styles.thSortIcon}>
                          {sortDirection === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    style={styles.th}
                    onClick={() => handleSort("email")}
                    onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                  >
                    <div style={styles.thSortable}>
                      Email
                      {sortField === "email" && (
                        <span style={styles.thSortIcon}>
                          {sortDirection === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    style={styles.th}
                    onClick={() => handleSort("phone")}
                    onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                  >
                    <div style={styles.thSortable}>
                      Phone
                      {sortField === "phone" && (
                        <span style={styles.thSortIcon}>
                          {sortDirection === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    style={styles.th}
                    onClick={() => handleSort("role")}
                    onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                  >
                    <div style={styles.thSortable}>
                      Role
                      {sortField === "role" && (
                        <span style={styles.thSortIcon}>
                          {sortDirection === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    style={styles.th}
                    onClick={() => handleSort("is_active")}
                    onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                  >
                    <div style={styles.thSortable}>
                      Status
                      {sortField === "is_active" && (
                        <span style={styles.thSortIcon}>
                          {sortDirection === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th style={styles.th}>Joined</th>
                  <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: "40px 20px", textAlign: "center" }}>
                      <div style={styles.emptyState}>
                        <span style={styles.emptyIcon}>🔍</span>
                        <p style={styles.emptyTitle}>No users found</p>
                        <p style={styles.emptySubtitle}>
                          {searchTerm ? "Try adjusting your search" : "No users registered yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((u, index) => {
                    const isHovered = hoveredRow === u.id;
                    const avatarColor = getAvatarColor(u.username || "User");
                    
                    return (
                      <tr
                        key={u.id}
                        style={{
                          ...styles.tr,
                          ...(isHovered ? styles.trHover : {}),
                          animation: `fadeInUp 0.3s ease-out`,
                          animationDelay: `${index * 0.05}s`,
                        }}
                        onMouseEnter={() => setHoveredRow(u.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td style={styles.td}>
                          <div style={styles.userCell}>
                            <div style={{ ...styles.avatar, background: avatarColor }}>
                              {getInitials(u.username)}
                            </div>
                            <div style={styles.userInfo}>
                              <p style={styles.userName}>{u.username || "N/A"}</p>
                              <p style={styles.userEmail}>{u.email || "No email"}</p>
                            </div>
                          </div>
                        </td>

                        <td style={{ ...styles.td, color: "rgba(255,255,255,0.5)" }}>
                          {u.email || "N/A"}
                        </td>

                        <td style={{ ...styles.td, color: "rgba(255,255,255,0.5)" }}>
                          {u.phone || "N/A"}
                        </td>

                        <td style={styles.td}>
                          <span style={{ ...styles.roleBadge, ...getRoleStyle(u.role) }}>
                            <span style={styles.roleDot} />
                            {u.role || "USER"}
                          </span>
                        </td>

                        <td style={styles.td}>
                          <span style={{ ...styles.statusBadge, ...getStatusStyle(u.is_active) }}>
                            <span style={styles.statusDot} />
                            {u.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td style={{ ...styles.td, color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
                          {formatDate(u.date_joined)}
                        </td>

                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <div style={styles.actionContainer}>
                            <button
                              style={{
                                ...styles.actionButton,
                                ...(hoveredAction === `view-${u.id}` ? styles.actionButtonHover : {}),
                              }}
                              onMouseEnter={() => setHoveredAction(`view-${u.id}`)}
                              onMouseLeave={() => setHoveredAction(null)}
                              onClick={() => navigate(`/users/${u.id}`)}
                            >
                              👁️ View
                            </button>
                            <button
                              style={{
                                ...styles.actionButton,
                                ...styles.actionButtonDanger,
                                ...(hoveredAction === `delete-${u.id}` ? styles.actionButtonDangerHover : {}),
                              }}
                              onMouseEnter={() => setHoveredAction(`delete-${u.id}`)}
                              onMouseLeave={() => setHoveredAction(null)}
                              onClick={() => {
                                if (window.confirm(`Delete user ${u.username}?`)) {
                                  console.log("Delete user:", u.id);
                                }
                              }}
                            >
                              🗑️
                            </button>
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
          {paginatedUsers.length > 0 && (
            <div style={styles.tableFooter}>
              <span style={styles.footerInfo}>
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
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