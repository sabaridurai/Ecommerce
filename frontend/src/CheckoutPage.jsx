import { useEffect, useState } from "react";
import { getMethods } from "@/services/paymentService";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

// ============================================================
// PREMIUM CHECKOUT PAGE - MODERN UI
// ============================================================

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0a0a0f",
    padding: "40px 20px",
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  wrapper: {
    maxWidth: "1200px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "start",
  },
  wrapperMobile: {
    gridTemplateColumns: "1fr",
    gap: "30px",
  },

  // ----- LEFT COLUMN - Order Summary -----
  orderSummary: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "32px",
    backdropFilter: "blur(20px)",
  },
  summaryTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px 0",
    letterSpacing: "-0.02em",
  },
  summarySubtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.4)",
    margin: "0 0 24px 0",
  },
  itemList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxHeight: "400px",
    overflowY: "auto",
    paddingRight: "8px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.04)",
    transition: "all 0.3s ease",
  },
  itemRowHover: {
    borderColor: "rgba(120,80,255,0.15)",
    background: "rgba(255,255,255,0.05)",
  },
  itemLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  itemName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  itemQuantity: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #7850ff, #b28aff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  totalSection: {
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: "18px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
    margin: 0,
  },
  totalAmount: {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: 0,
  },

  // ----- RIGHT COLUMN - Payment Methods -----
  paymentSection: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "32px",
    backdropFilter: "blur(20px)",
  },
  paymentTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px 0",
    letterSpacing: "-0.02em",
  },
  paymentSubtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.4)",
    margin: "0 0 24px 0",
  },

  // ----- Payment Method Cards -----
  methodCard: {
    padding: "16px 20px",
    marginBottom: "12px",
    borderRadius: "16px",
    border: "2px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  methodCardHover: {
    borderColor: "rgba(120,80,255,0.2)",
    background: "rgba(255,255,255,0.04)",
    transform: "translateX(4px)",
  },
  methodCardSelected: {
    borderColor: "#7850ff",
    background: "rgba(120,80,255,0.06)",
    boxShadow: "0 0 30px rgba(120,80,255,0.05)",
  },
  methodHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  methodRadio: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.3s ease",
  },
  methodRadioSelected: {
    borderColor: "#7850ff",
    background: "#7850ff",
  },
  methodRadioInner: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#ffffff",
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  methodType: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  },
  methodChevron: {
    color: "rgba(255,255,255,0.2)",
    fontSize: "18px",
    transition: "transform 0.3s ease",
  },
  methodChevronOpen: {
    transform: "rotate(180deg)",
  },

  // ----- Method Details (expanded) -----
  methodDetails: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    animation: "slideDown 0.3s ease-out",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
  },
  detailLabel: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.3)",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  qrImage: {
    width: "140px",
    height: "140px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.06)",
    objectFit: "cover",
    marginTop: "8px",
    display: "block",
  },
  instructions: {
    marginTop: "12px",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.04)",
    fontSize: "13px",
    color: "rgba(255,255,255,0.5)",
    lineHeight: "1.6",
  },
  instructionsIcon: {
    marginRight: "8px",
  },

  // ----- Actions -----
  actions: {
    marginTop: "24px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryButton: {
    flex: 1,
    padding: "16px 32px",
    background: "linear-gradient(135deg, #7850ff, #ff46b4)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 8px 30px rgba(120,80,255,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  primaryButtonHover: {
    transform: "translateY(-2px) scale(1.01)",
    boxShadow: "0 12px 45px rgba(120,80,255,0.4)",
  },
  primaryButtonDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    transform: "none !important",
  },
  secondaryButton: {
    padding: "16px 28px",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  secondaryButtonHover: {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.15)",
    transform: "translateY(-2px)",
    color: "#ffffff",
  },

  // ----- Status Badge -----
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  statusPending: {
    background: "rgba(251, 146, 60, 0.1)",
    color: "#fb923c",
    border: "1px solid rgba(251, 146, 60, 0.1)",
  },
  statusAwaiting: {
    background: "rgba(74, 222, 128, 0.1)",
    color: "#4ade80",
    border: "1px solid rgba(74, 222, 128, 0.1)",
  },
  statusCompleted: {
    background: "rgba(74, 222, 128, 0.1)",
    color: "#4ade80",
    border: "1px solid rgba(74, 222, 128, 0.1)",
  },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "currentColor",
    animation: "pulse 2s ease-in-out infinite",
  },
};

// ============================================================
// KEYFRAMES
// ============================================================
const keyframes = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  @keyframes fadeIn {
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
export default function CheckoutPage() {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [session, setSession] = useState(null);
  const [items, setItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredMethod, setHoveredMethod] = useState(null);
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load payment methods
  useEffect(() => {
    loadMethods();
    initSession();
  }, []);

  const loadMethods = async () => {
    try {
      const data = await getMethods();
      console.log("Fetched payment methods:", data);
      setMethods(data);
    } catch (err) {
      console.error("Payment methods error", err);
    }
  };

  // SESSION + CART HANDLING
  const initSession = () => {
    const buyNow = localStorage.getItem("buyNowProduct");
    const checkoutType = localStorage.getItem("checkoutType");

    let finalItems = [];

    if (checkoutType === "buyNow" && buyNow) {
      finalItems = [JSON.parse(buyNow)];
    } else {
      finalItems = cart;
    }

    setItems(finalItems);

    const existing = localStorage.getItem("payment_session");

    if (existing) {
      setSession(JSON.parse(existing));
    } else {
      const newSession = {
        id: "PS_" + Date.now(),
        items: finalItems,
        total: finalItems.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0),
        status: "PENDING_PAYMENT",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("payment_session", JSON.stringify(newSession));
      setSession(newSession);
    }
  };

  const saveSession = (updated) => {
    setSession(updated);
    localStorage.setItem("payment_session", JSON.stringify(updated));
  };

  // Select payment method
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    saveSession({
      ...session,
      selectedMethod: method,
    });
  };

  // Pay later
  const handlePaymentDoneLater = () => {
    saveSession({
      ...session,
      status: "AWAITING_PROOF",
    });
    alert("✅ Your order has been placed! Please complete the payment and send proof.");
  };

  // Proceed to payment
  const handleProceedToPayment = () => {
    if (!selectedMethod) {
      alert("⚠️ Please select a payment method first.");
      return;
    }
    alert(`✅ Proceeding with ${selectedMethod.title}\nTotal: ₹${session?.total || 0}`);
  };

  const getStatusBadge = () => {
    if (!session) return null;
    switch (session.status) {
      case "PENDING_PAYMENT":
        return { text: "Pending Payment", style: styles.statusPending };
      case "AWAITING_PROOF":
        return { text: "Awaiting Proof", style: styles.statusAwaiting };
      case "COMPLETED":
        return { text: "Completed", style: styles.statusCompleted };
      default:
        return { text: session.status, style: styles.statusPending };
    }
  };

  const statusBadge = getStatusBadge();
  const wrapperStyles = {
    ...styles.wrapper,
    ...(isMobile ? styles.wrapperMobile : {}),
  };

  // Render payment method details
  const renderMethodDetails = (method) => {
    if (!method) return null;

    return (
      <div style={styles.methodDetails}>
        {method.payment_type === "UPI" && method.upi_id && (
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>UPI ID</span>
            <span style={styles.detailValue}>{method.upi_id}</span>
          </div>
        )}

        {method.payment_type === "QR" && method.qr_image && (
          <div style={{ textAlign: "center" }}>
            <img src={method.qr_image} alt="QR Code" style={styles.qrImage} />
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "8px" }}>
              Scan to pay
            </p>
          </div>
        )}

        {method.payment_type === "BANK" && (
          <>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Bank Name</span>
              <span style={styles.detailValue}>{method.bank_name || "N/A"}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Account Number</span>
              <span style={styles.detailValue}>{method.account_number || "N/A"}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>IFSC Code</span>
              <span style={styles.detailValue}>{method.ifsc_code || "N/A"}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Account Holder</span>
              <span style={styles.detailValue}>{method.account_holder || "N/A"}</span>
            </div>
          </>
        )}

        {method.instructions && (
          <div style={styles.instructions}>
            <span style={styles.instructionsIcon}>ℹ️</span>
            {method.instructions}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={wrapperStyles}>
        {/* ----- LEFT COLUMN - Order Summary ----- */}
        <div style={styles.orderSummary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <p style={styles.summarySubtitle}>
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>

          {/* Status Badge */}
          {statusBadge && (
            <div style={{ ...styles.statusBadge, ...statusBadge.style }}>
              <span style={styles.statusDot} />
              {statusBadge.text}
            </div>
          )}

          {/* Items List */}
          <div style={styles.itemList}>
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.itemRow,
                  ...(hoveredItem === idx ? styles.itemRowHover : {}),
                  animation: "fadeIn 0.3s ease-out",
                  animationDelay: `${idx * 0.05}s`,
                }}
                onMouseEnter={() => setHoveredItem(idx)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div style={styles.itemLeft}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemQuantity}>
                    Qty: {item.quantity || 1}
                  </span>
                </div>
                <span style={styles.itemPrice}>
                  ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={styles.totalSection}>
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total Amount</span>
              <span style={styles.totalAmount}>₹{session?.total || 0}</span>
            </div>
          </div>
        </div>

        {/* ----- RIGHT COLUMN - Payment Methods ----- */}
        <div style={styles.paymentSection}>
          <h2 style={styles.paymentTitle}>Payment Methods</h2>
          <p style={styles.paymentSubtitle}>
            {selectedMethod
              ? `Selected: ${selectedMethod.title}`
              : "Choose your preferred payment method"}
          </p>

          {/* Payment Methods List */}
          {methods.map((method) => {
            const isSelected = selectedMethod?.id === method.id;
            const isHovered = hoveredMethod === method.id;

            return (
              <div
                key={method.id}
                style={{
                  ...styles.methodCard,
                  ...(isHovered ? styles.methodCardHover : {}),
                  ...(isSelected ? styles.methodCardSelected : {}),
                }}
                onMouseEnter={() => setHoveredMethod(method.id)}
                onMouseLeave={() => setHoveredMethod(null)}
                onClick={() => handleMethodSelect(method)}
              >
                <div style={styles.methodHeader}>
                  <div
                    style={{
                      ...styles.methodRadio,
                      ...(isSelected ? styles.methodRadioSelected : {}),
                    }}
                  >
                    {isSelected && <div style={styles.methodRadioInner} />}
                  </div>

                  <div style={styles.methodInfo}>
                    <h4 style={styles.methodTitle}>{method.title}</h4>
                    <p style={styles.methodType}>{method.payment_type}</p>
                  </div>

                  <span
                    style={{
                      ...styles.methodChevron,
                      ...(isSelected ? styles.methodChevronOpen : {}),
                    }}
                  >
                    ▼
                  </span>
                </div>

                {/* Expanded Details - Only show when selected */}
                {isSelected && renderMethodDetails(method)}
              </div>
            );
          })}

          {/* Actions */}
          <div style={styles.actions}>
            <button
              style={{
                ...styles.primaryButton,
                ...(isPrimaryHovered && selectedMethod
                  ? styles.primaryButtonHover
                  : {}),
                ...(!selectedMethod ? styles.primaryButtonDisabled : {}),
              }}
              onMouseEnter={() => setIsPrimaryHovered(true)}
              onMouseLeave={() => setIsPrimaryHovered(false)}
              onClick={handleProceedToPayment}
              disabled={!selectedMethod}
            >
              <span>⚡</span>
              {selectedMethod ? "Proceed to Payment" : "Select a Payment Method"}
            </button>

            <button
              style={{
                ...styles.secondaryButton,
                ...(isSecondaryHovered ? styles.secondaryButtonHover : {}),
              }}
              onMouseEnter={() => setIsSecondaryHovered(true)}
              onMouseLeave={() => setIsSecondaryHovered(false)}
              onClick={handlePaymentDoneLater}
            >
              <span>🕐</span>
              Pay Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}