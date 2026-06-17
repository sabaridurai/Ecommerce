import { useState, useEffect } from "react";
import axios from "axios";
import { setAuth } from "@/utils/auth";
import { backendURL } from "../../../services/api";

function UserLogin() {
  const [loginType, setLoginType] = useState("email");

const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && showOTP) {
      setCanResend(true);
    }
  }, [timeLeft, showOTP]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    card: {
      background: "white",
      borderRadius: "24px",
      padding: "48px 40px",
      width: "100%",
      maxWidth: "440px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.3s ease",
    },
    header: {
      textAlign: "center",
      marginBottom: "36px",
    },
    iconContainer: {
      width: "72px",
      height: "72px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px",
    },
    icon: {
      fontSize: "32px",
      color: "white",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1a1a2e",
      margin: "0 0 8px 0",
      letterSpacing: "-0.5px",
    },
    subtitle: {
      fontSize: "15px",
      color: "#6b7280",
      margin: "0",
      fontWeight: "400",
    },
    formGroup: {
      marginBottom: "24px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      fontSize: "15px",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      backgroundColor: "#f9fafb",
      color: "#1f2937",
    },
    inputFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1)",
      backgroundColor: "white",
    },
    button: {
      width: "100%",
      padding: "14px",
      fontSize: "16px",
      fontWeight: "600",
      color: "white",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      letterSpacing: "0.3px",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 20px rgba(102, 126, 234, 0.4)",
    },
    buttonDisabled: {
      opacity: "0.7",
      cursor: "not-allowed",
      transform: "none",
    },
    buttonSecondary: {
      width: "100%",
      padding: "14px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#667eea",
      background: "transparent",
      border: "2px solid #667eea",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "12px",
      letterSpacing: "0.3px",
    },
    otpContainer: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
    },
    otpInput: {
      flex: "1",
      padding: "14px 16px",
      fontSize: "15px",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      backgroundColor: "#f9fafb",
      color: "#1f2937",
      textAlign: "center",
      letterSpacing: "4px",
      fontWeight: "600",
    },
    backButton: {
      background: "none",
      border: "none",
      color: "#6b7280",
      fontSize: "14px",
      cursor: "pointer",
      padding: "8px 0",
      marginTop: "12px",
      transition: "color 0.3s ease",
      textDecoration: "underline",
    },
    footer: {
      marginTop: "24px",
      textAlign: "center",
      fontSize: "14px",
      color: "#6b7280",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "24px 0",
      color: "#9ca3af",
      fontSize: "13px",
    },
    dividerLine: {
      flex: "1",
      height: "1px",
      background: "#e5e7eb",
    },
    dividerText: {
      padding: "0 16px",
    },
    loadingSpinner: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      borderTop: "3px solid white",
      animation: "spin 0.8s linear infinite",
    },
    timerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
      padding: "12px 16px",
      backgroundColor: "#f3f4f6",
      borderRadius: "12px",
    },
    timerText: {
      fontSize: "14px",
      color: "#6b7280",
      fontWeight: "500",
    },
    timerValue: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#667eea",
      fontVariantNumeric: "tabular-nums",
    },
    timerWarning: {
      color: "#ef4444",
    },
    resendButton: {
      background: "none",
      border: "none",
      color: "#667eea",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      padding: "4px 8px",
      transition: "color 0.3s ease",
      textDecoration: "underline",
    },
    resendDisabled: {
      color: "#9ca3af",
      cursor: "not-allowed",
      textDecoration: "none",
    },
    otpInfo: {
      fontSize: "13px",
      color: "#6b7280",
      textAlign: "center",
      marginTop: "8px",
    },
  };

const sendOTP = async () => {
  try {

    const payload =
      loginType === "email"
        ? { email }
        : { phone };

    await axios.post(
      `${backendURL}/auth/send-otp/`,
      payload
    );

    alert("OTP sent successfully");

    setShowOTP(true);
    setTimeLeft(300);
    setCanResend(false);

  } catch (error) {
    console.error(error);
    alert("Failed to send OTP");
  }
};

const resendOTP = async () => {
  try {

    const payload =
      loginType === "email"
        ? { email }
        : { phone };

    await axios.post(
      `${backendURL}/auth/send-otp/`,
      payload
    );

    alert("OTP resent successfully");

    setTimeLeft(300);
    setCanResend(false);

  } catch (error) {
    console.error(error);
    alert("Failed to resend OTP");
  }
};

const verifyOTP = async () => {
  try {

    const payload =
      loginType === "email"
        ? {
            email,
            otp,
          }
        : {
            phone,
            otp,
          };

    const response =
      await axios.post(
        `${backendURL}/auth/verify-otp/`,
        payload
      );

    setAuth(response.data);

    window.location.href = "/";

  } catch (error) {
    console.error(error);
    alert("Invalid OTP");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <span style={styles.icon}>🛍️</span>
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>
            {!showOTP ? "Sign in to your account" : "Enter the verification code"}
          </p>
        </div>

        {!showOTP ? (
          <>

<div
  style={{
    display: "flex",
    marginBottom: "20px",
    gap: "10px",
  }}
>
  <button
    type="button"
    onClick={() => setLoginType("email")}
    style={{
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      background:
        loginType === "email"
          ? "#667eea"
          : "#e5e7eb",
      color:
        loginType === "email"
          ? "#fff"
          : "#374151",
    }}
  >
    📧 Email OTP
  </button>

  <button
    type="button"
    onClick={() => setLoginType("phone")}
    style={{
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      background:
        loginType === "phone"
          ? "#667eea"
          : "#e5e7eb",
      color:
        loginType === "phone"
          ? "#fff"
          : "#374151",
    }}
  >
    📱 Phone OTP
  </button>
</div>






          <div style={styles.formGroup}>
  <label style={styles.label}>
    {loginType === "email"
      ? "Email Address"
      : "Phone Number"}
  </label>

  {loginType === "email" ? (
    <input
      type="email"
      placeholder="you@example.com"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      style={styles.input}
    />
  ) : (
    <input
      type="tel"
      placeholder="9876543210"
      value={phone}
      onChange={(e) =>
        setPhone(
          e.target.value.replace(/\D/g, "")
        )
      }
      maxLength={10}
      style={styles.input}
    />
  )}
</div>

            <button
              onClick={sendOTP}
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = styles.buttonHover.transform;
                  e.target.style.boxShadow = styles.buttonHover.boxShadow;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "none";
                e.target.style.boxShadow = "none";
              }}
            >
              {loading ? (
                <span style={styles.loadingSpinner}></span>
              ) : (
                "Send OTP"
              )}
            </button>
          </>
        ) : (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Verification Code</label>
              <div style={styles.otpContainer}>
                <input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength="6"
                  style={styles.otpInput}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
                    e.target.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                    e.target.style.backgroundColor = "#f9fafb";
                  }}
                  disabled={loading}
                  autoFocus
                />
              </div>
<p style={styles.otpInfo}>
  Enter the 6-digit code sent to your{" "}
  {loginType === "email"
    ? "email"
    : "phone"}
</p>
            </div>

            <button
              onClick={verifyOTP}
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = styles.buttonHover.transform;
                  e.target.style.boxShadow = styles.buttonHover.boxShadow;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "none";
                e.target.style.boxShadow = "none";
              }}
            >
              {loading ? (
                <span style={styles.loadingSpinner}></span>
              ) : (
                "Verify & Sign In"
              )}
            </button>

            {/* Timer Section */}
            <div style={styles.timerContainer}>
              <span style={styles.timerText}>
                {canResend ? "OTP expired" : "OTP valid for"}
              </span>
              <span 
                style={{
                  ...styles.timerValue,
                  ...(timeLeft < 60 && timeLeft > 0 ? styles.timerWarning : {}),
                }}
              >
                {canResend ? "Expired" : formatTime(timeLeft)}
              </span>
            </div>

            {/* Resend Button */}
            <button
              onClick={resendOTP}
              disabled={!canResend || loading}
              style={{
                ...styles.buttonSecondary,
                ...(!canResend || loading ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (canResend && !loading) {
                  e.target.style.background = "#667eea";
                  e.target.style.color = "white";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#667eea";
              }}
            >
              {loading ? (
                <span style={styles.loadingSpinner}></span>
              ) : (
                canResend ? "Resend OTP" : `Resend available in ${formatTime(timeLeft)}`
              )}
            </button>

            <button
              style={styles.backButton}
              onClick={() => {
                setShowOTP(false);
                setOtp("");
                setTimeLeft(0);
                setCanResend(false);
              }}
              onMouseEnter={(e) => (e.target.style.color = "#667eea")}
              onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
            >
              ← Change email address
            </button>
          </>
        )}

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>Secure Login</span>
          <span style={styles.dividerLine}></span>
        </div>

        <div style={styles.footer}>
          <p style={{ margin: "0" }}>
            By continuing, you agree to our{" "}
            <span style={{ color: "#667eea", fontWeight: "500" }}>
              Terms of Service
            </span>{" "}
            and{" "}
            <span style={{ color: "#667eea", fontWeight: "500" }}>
              Privacy Policy
            </span>
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          input:focus {
            outline: none;
          }
        `}
      </style>
    </div>
  );
}

export default UserLogin;