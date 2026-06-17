import { useEffect, useState } from "react";
import { getMethods } from "@/services/paymentService";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "@/services/api";
import api from "./services/api";

// ============================================================
// STYLES - Premium Dark Theme
// ============================================================
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a0a0f 0%, #14141a 100%)",
    padding: "40px 20px",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  wrapper: {
    maxWidth: "1280px",
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
    position: "sticky",
    top: "20px",
  },
  summaryTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 6px 0",
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
    gap: "10px",
    maxHeight: "420px",
    overflowY: "auto",
    paddingRight: "4px",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255,255,255,0.1) transparent",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.04)",
    transition: "all 0.3s ease",
  },
  itemRowHover: {
    borderColor: "rgba(120,80,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    transform: "translateX(4px)",
  },
  itemLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flex: 1,
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
    fontSize: "32px",
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
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 6px 0",
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
    background: "rgba(120,80,255,0.08)",
    boxShadow: "0 0 40px rgba(120,80,255,0.08)",
  },
  methodHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  methodRadio: {
    width: "22px",
    height: "22px",
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
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
  },
  detailLabel: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  qrImage: {
    width: "160px",
    height: "160px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.06)",
    objectFit: "cover",
    marginTop: "8px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  instructions: {
    marginTop: "12px",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.04)",
    fontSize: "13px",
    color: "rgba(255,255,255,0.6)",
    lineHeight: "1.6",
  },

  // ----- Actions -----
  actions: {
    marginTop: "28px",
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
    minWidth: "180px",
  },
  primaryButtonHover: {
    transform: "translateY(-3px) scale(1.02)",
    boxShadow: "0 12px 45px rgba(120,80,255,0.5)",
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
    background: "rgba(251, 146, 60, 0.12)",
    color: "#fb923c",
    border: "1px solid rgba(251, 146, 60, 0.15)",
  },
  statusAwaiting: {
    background: "rgba(74, 222, 128, 0.12)",
    color: "#4ade80",
    border: "1px solid rgba(74, 222, 128, 0.15)",
  },
  statusCompleted: {
    background: "rgba(74, 222, 128, 0.12)",
    color: "#4ade80",
    border: "1px solid rgba(74, 222, 128, 0.15)",
  },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "currentColor",
    animation: "pulse 2s ease-in-out infinite",
  },

  // ----- Payment Proof Section -----
  proofSection: {
    marginTop: "40px",
    padding: "32px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px)",
  },
  proofTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px 0",
    letterSpacing: "-0.02em",
  },
  proofSubtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.4)",
    margin: "0 0 24px 0",
  },
  uploadArea: {
    border: "2px dashed rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "rgba(255,255,255,0.02)",
    position: "relative",
  },
  uploadAreaHover: {
    borderColor: "rgba(120,80,255,0.3)",
    background: "rgba(120,80,255,0.05)",
  },
  uploadAreaDrag: {
    borderColor: "#7850ff",
    background: "rgba(120,80,255,0.08)",
    transform: "scale(1.02)",
  },
  uploadIcon: {
    fontSize: "48px",
    marginBottom: "12px",
    display: "block",
  },
  uploadText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 4px 0",
  },
  uploadSubtext: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },
  filePreview: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 20px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.06)",
    marginTop: "16px",
  },
  fileIcon: {
    fontSize: "28px",
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  fileSize: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    margin: "4px 0 0 0",
  },
  removeFile: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.3)",
    cursor: "pointer",
    fontSize: "20px",
    padding: "4px 8px",
    transition: "color 0.3s ease",
  },
  proofActions: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  submitProofButton: {
    flex: 1,
    padding: "16px 32px",
    background: "linear-gradient(135deg, #00c853, #00e676)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 8px 30px rgba(0, 200, 83, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  submitProofHover: {
    transform: "translateY(-3px) scale(1.02)",
    boxShadow: "0 12px 45px rgba(0, 200, 83, 0.5)",
  },
  submitProofDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    transform: "none !important",
  },
  clearButton: {
    padding: "16px 28px",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  clearButtonHover: {
    background: "rgba(255,70,70,0.1)",
    borderColor: "rgba(255,70,70,0.2)",
    color: "#ff4646",
  },

  // Scrollbar Styles
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

const keyframes = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
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
  const { cart } = useCart();
  const navigate = useNavigate();

  // State
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [session, setSession] = useState(null);
  const [items, setItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredMethod, setHoveredMethod] = useState(null);
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [isUploadHovered, setIsUploadHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const[ifopenupload,setIfOpenUpload] = useState(false);

  // Responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load methods and session
  useEffect(() => {
    loadMethods();
    initSession();
  }, []);

  const loadMethods = async () => {
    try {
      const data = await getMethods();
      setMethods(data);
    } catch (err) {
      console.error("Payment methods error", err);
    }
  };

  const initSession = () => {
    const buyNow = localStorage.getItem("buyNowProduct");
    const checkoutType = localStorage.getItem("checkoutType");

    let finalItems = [];

    if (buyNow) {
      const parsedData = JSON.parse(buyNow);
      if (Array.isArray(parsedData)) {
        finalItems = parsedData;
      } else {
        finalItems = [{ ...parsedData, quantity: parsedData.quantity || 1 }];
      }
    } else {
      finalItems = cart || [];
    }

    const total = finalItems.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
      0
    );

    const newSession = {
      id: "PS_" + Date.now(),
      session_id: "PS_" + Date.now(),
      items: finalItems,
      total,
      status: "PENDING_PAYMENT",
      createdAt: new Date().toISOString(),
    };

    setItems(finalItems);
    setSession(newSession);
    localStorage.setItem("payment_session", JSON.stringify(newSession));
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    const updatedSession = { ...session, payment_method: method };
    setSession(updatedSession);
    localStorage.setItem("payment_session", JSON.stringify(updatedSession));
  };

  const setIfOpenUpload_click=()=>{
   setIfOpenUpload(true);
  }

  const handleProceedToPayment = () => {
    if (!selectedMethod) {
      alert("⚠️ Please select a payment method first.");
      return;
    }
    alert(`✅ Proceeding with ${selectedMethod.title}\nTotal: ₹${session?.total || 0}`);
    setIfOpenUpload_click();
    


  };

  const handlePaymentDoneLater = () => {
    const updatedSession = { ...session, status: "AWAITING_PROOF" };
    setSession(updatedSession);
    localStorage.setItem("payment_session", JSON.stringify(updatedSession));
    alert("✅ Your order has been placed! Please complete the payment and upload proof.");
  };

  const handleFileUpload = (file) => {
    if (file) {
      setPaymentProof(file);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    } else {
      alert("Please upload an image file.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeFile = () => {
    setPaymentProof(null);
    setUploadProgress(0);
  };

const submitPaymentProof = async () => {
  if (!paymentProof) {
    alert("⚠️ Please upload a payment screenshot first.");
    return;
  }

  const sessionData = JSON.parse(localStorage.getItem("payment_session"));
  if (!sessionData) {
    alert("⚠️ Session expired. Please try again.");
    return;
  }

  setIsSubmitting(true);
  setUploadProgress(0);

  // =========================
  // STEP 1: GET CHECKOUT TYPE
  // =========================
  const checkoutType = localStorage.getItem("checkoutType");

  let cartItems = [];

  // =========================
  // STEP 2: NORMALIZE DATA
  // =========================

  // 🟢 BUY NOW FLOW
  if (checkoutType === "buyNow") {
    const product = JSON.parse(localStorage.getItem("buyNowProduct"));

    if (!product) {
      alert("No product found for Buy Now");
      setIsSubmitting(false);
      return;
    }

    cartItems = [
      {
        id: product.id,
        quantity: 1, // IMPORTANT FIX
        price: product.price,
      },
    ];
  }

  // 🟡 CART FLOW
  else {
    const cart = JSON.parse(localStorage.getItem("cart_items")) || [];

    if (cart.length === 0) {
      alert("Cart is empty!");
      setIsSubmitting(false);
      return;
    }

    cartItems = cart.map((item) => ({
      id: item.id,
      quantity: item.quantity || 1,
      price: item.price,
    }));
  }

  // =========================
  // STEP 3: CREATE FORM DATA
  // =========================
  const formData = new FormData();

  formData.append("session_id", sessionData.session_id);
  formData.append("total_amount", sessionData.total);
  formData.append("payment_method", sessionData.payment_method?.id || "");
  formData.append("proof", paymentProof);

  // 🔥 CRITICAL FIX
  formData.append("cart_items", JSON.stringify(cartItems));

  try {
    await api.post(
      `${backendURL}/payments/upload-proof/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      }
    );

    // =========================
    // CLEANUP LOCAL STORAGE
    // =========================
    localStorage.removeItem("payment_session");
    localStorage.removeItem("buyNowProduct");
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutType");

    alert("✅ Payment proof uploaded successfully!");
    navigate("/orders");

  } catch (error) {
    console.error("Upload error:", error);
    alert("❌ Failed to upload payment proof. Please try again.");
  } finally {
    setIsSubmitting(false);
    setUploadProgress(0);
  }
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
            <img
              src={method.qr_image}
              alt="QR Code"
              style={styles.qrImage}
              onError={(e) => (e.target.style.display = "none")}
            />
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
            <span style={{ marginRight: "8px" }}>ℹ️</span>
            {method.instructions}
          </div>
        )}
      </div>
    );
  };

  const statusBadge = getStatusBadge();
  const wrapperStyles = {
    ...styles.wrapper,
    ...(isMobile ? styles.wrapperMobile : {}),
  };

  // Check if proof is needed
  const needsProof = session?.status === "AWAITING_PROOF";

  return (
    <div style={styles.container}>
      <div style={wrapperStyles}>
        {/* ----- LEFT COLUMN - Order Summary ----- */}
        <div style={styles.orderSummary}>
          <h2 style={styles.summaryTitle}>🛒 Order Summary</h2>
          <p style={styles.summarySubtitle}>
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>

          {statusBadge && (
            <div style={{ ...styles.statusBadge, ...statusBadge.style }}>
              <span style={styles.statusDot} />
              {statusBadge.text}
            </div>
          )}

          <div style={styles.itemList}>
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.itemRow,
                  ...(hoveredItem === idx ? styles.itemRowHover : {}),
                }}
                onMouseEnter={() => setHoveredItem(idx)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div style={styles.itemLeft}>
                  <span style={styles.itemName}>{item.name || "Product"}</span>
                  <span style={styles.itemQuantity}>
                    Qty: {item.quantity || 1}
                  </span>
                </div>
                <span style={styles.itemPrice}>
                  ₹{(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div style={styles.totalSection}>
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total Amount</span>
              <span style={styles.totalAmount}>
                ₹{Number(session?.total || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* ----- RIGHT COLUMN - Payment Methods ----- */}
        <div>
          <div style={styles.paymentSection}>
            <h2 style={styles.paymentTitle}>💳 Payment Methods</h2>
            <p style={styles.paymentSubtitle}>
              {selectedMethod
                ? `Selected: ${selectedMethod.title}`
                : "Choose your preferred payment method"}
            </p>

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

                  {isSelected && renderMethodDetails(method)}
                </div>
              );
            })}

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
                {selectedMethod ? "Proceed to Payment" : "Select a Method"}
              </button>

              {/* <button
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
              </button> */}
            </div>
          </div>

          {/* ----- PAYMENT PROOF SECTION ----- */}
          {(ifopenupload) && (
            <div style={styles.proofSection}>
              <h2 style={styles.proofTitle}>📸 Upload Payment Proof</h2>
              <p style={styles.proofSubtitle}>
                Upload a screenshot of your payment confirmation
              </p>

              <div
                style={{
                  ...styles.uploadArea,
                  ...(isUploadHovered ? styles.uploadAreaHover : {}),
                  ...(isDragging ? styles.uploadAreaDrag : {}),
                }}
                onMouseEnter={() => setIsUploadHovered(true)}
                onMouseLeave={() => setIsUploadHovered(false)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => document.getElementById("fileInput").click()}
              >
                {!paymentProof ? (
                  <>
                    <span style={styles.uploadIcon}>📤</span>
                    <p style={styles.uploadText}>Click or drag to upload</p>
                    <p style={styles.uploadSubtext}>
                      Supports: JPG, PNG, WEBP (Max 5MB)
                    </p>
                  </>
                ) : (
                  <div style={styles.filePreview}>
                    <span style={styles.fileIcon}>🖼️</span>
                    <div style={styles.fileInfo}>
                      <p style={styles.fileName}>{paymentProof.name}</p>
                      <p style={styles.fileSize}>
                        {(paymentProof.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      style={styles.removeFile}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {/* Upload Progress */}
              {isSubmitting && uploadProgress > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <div
                    style={{
                      height: "4px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${uploadProgress}%`,
                        background: "linear-gradient(90deg, #00c853, #00e676)",
                        borderRadius: "10px",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: "8px",
                      textAlign: "center",
                    }}
                  >
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              <div style={styles.proofActions}>
                <button
                  style={{
                    ...styles.submitProofButton,
                    ...(isSubmitting || !paymentProof
                      ? styles.submitProofDisabled
                      : {}),
                    ...(!isSubmitting && paymentProof
                      ? styles.submitProofHover
                      : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && paymentProof) {
                      e.target.style.transform = "translateY(-3px) scale(1.02)";
                      e.target.style.boxShadow =
                        "0 12px 45px rgba(0, 200, 83, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "none";
                    e.target.style.boxShadow = "0 8px 30px rgba(0, 200, 83, 0.3)";
                  }}
                  onClick={submitPaymentProof}
                  disabled={isSubmitting || !paymentProof}
                >
                  {isSubmitting ? (
                    <>
                      <span>⏳</span> Submitting...
                    </>
                  ) : (
                    <>
                      <span>✅</span> Submit Payment Proof
                    </>
                  )}
                </button>

                <button
                  style={{
                    ...styles.clearButton,
                    ...(isUploadHovered ? styles.clearButtonHover : {}),
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,70,70,0.1)";
                    e.target.style.borderColor = "rgba(255,70,70,0.2)";
                    e.target.style.color = "#ff4646";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.04)";
                    e.target.style.borderColor = "rgba(255,255,255,0.08)";
                    e.target.style.color = "rgba(255,255,255,0.6)";
                  }}
                  onClick={removeFile}
                  disabled={!paymentProof || isSubmitting}
                >
                  <span>🗑️</span> Clear File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}