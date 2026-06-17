import { useState, useEffect } from "react";
import axios from "axios";

import { setAuth } from "../../utils/auth";
import { getErrorMessage } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../../services/api";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #root {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.al-root {
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  display: flex;
  font-family: 'Inter', sans-serif;
  background: #060a10;
  color: #e2e8f0;
  overflow: hidden;
  position: relative;
}

/* ── ANIMATED BACKGROUND ── */
.al-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.al-bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
  animation: orbFloat 12s ease-in-out infinite alternate;
}

.al-bg-orb-1 {
  width: 600px; height: 600px;
  background: #4f46e5;
  top: -200px; left: -200px;
  animation-delay: 0s;
}

.al-bg-orb-2 {
  width: 500px; height: 500px;
  background: #0ea5e9;
  bottom: -150px; right: -150px;
  animation-delay: -4s;
}

.al-bg-orb-3 {
  width: 300px; height: 300px;
  background: #10b981;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -8s;
  opacity: 0.08;
}

@keyframes orbFloat {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40px, 30px) scale(1.08); }
}

.al-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 56px 56px;
}

/* ── SPLIT LAYOUT ── */
.al-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(32px, 5vw, 64px);
  position: relative;
  z-index: 1;
}

.al-right {
  width: clamp(360px, 38vw, 520px);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: clamp(32px, 4vw, 64px) clamp(28px, 4vw, 56px);
  background: rgba(10, 14, 22, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-left: 1px solid rgba(255,255,255,0.06);
  position: relative;
  z-index: 1;
  overflow-y: auto;
}

.al-right::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #6366f1 40%, #0ea5e9 70%, transparent 100%);
  opacity: 0.8;
}

/* ── BRAND ── */
.al-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.al-logo {
  width: 44px; height: 44px;
  background: linear-gradient(135deg, #6366f1, #4338ca);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(99,102,241,0.4);
}

.al-brand-text { line-height: 1.2; }
.al-brand-name {
  font-size: 16px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.01em;
}
.al-brand-sub {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6366f1;
}

/* ── HERO ── */
.al-hero { max-width: 520px; }

.al-hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.25);
  color: #10b981;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 28px;
}

.al-hero-chip-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #10b981;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

.al-hero-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: #f8fafc;
  margin-bottom: 20px;
}

.al-gradient-text {
  background: linear-gradient(90deg, #818cf8 0%, #38bdf8 60%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.al-hero-desc {
  font-size: clamp(14px, 1.3vw, 16px);
  font-weight: 400;
  line-height: 1.75;
  color: #64748b;
  max-width: 380px;
}

/* ── STATS ── */
.al-stats {
  display: flex;
  gap: 0;
  align-items: stretch;
}

.al-stat {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 28px;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  flex: 1;
  max-width: 160px;
}

.al-stat + .al-stat { margin-left: 12px; }

.al-stat-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 600;
  color: #f1f5f9;
  letter-spacing: -0.02em;
}

.al-stat-label {
  font-size: 11px;
  color: #475569;
  letter-spacing: 0.04em;
  font-weight: 500;
}

/* ── FORM PANEL ── */
.al-form-top { margin-bottom: 36px; }

.al-access-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.2);
  color: #f87171;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.al-access-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #ef4444;
  animation: blink 2s ease-in-out infinite;
}

.al-form-title {
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #f1f5f9;
  margin-bottom: 8px;
  line-height: 1.2;
}

.al-form-sub {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
}

/* ── FIELDS ── */
.al-field { margin-bottom: 18px; }

.al-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 8px;
}

.al-input-wrap { position: relative; }

.al-input-pre {
  position: absolute;
  left: 0;
  top: 0; bottom: 0;
  width: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #334155;
  font-size: 17px;
  pointer-events: none;
  transition: color 0.2s;
  border-right: 1px solid rgba(255,255,255,0.05);
}

.al-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 14px 14px 14px 56px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  -webkit-appearance: none;
}

.al-input::placeholder { color: #2d3f55; }

.al-input:hover {
  border-color: rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.05);
}

.al-input:focus {
  border-color: #6366f1;
  background: rgba(99,102,241,0.06);
  box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
}

.al-input:focus ~ .al-input-pre,
.al-input-wrap:focus-within .al-input-pre {
  color: #6366f1;
}

.al-eye-btn {
  position: absolute;
  right: 12px;
  top: 50%; transform: translateY(-50%);
  background: none;
  border: none;
  color: #334155;
  cursor: pointer;
  font-size: 17px;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.2s, background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.al-eye-btn:hover { color: #94a3b8; background: rgba(255,255,255,0.05); }

/* ── OPTIONS ROW ── */
.al-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  margin-top: 4px;
}

.al-remember {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #64748b;
  user-select: none;
}

.al-checkbox {
  width: 16px; height: 16px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px;
  background: rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;
  font-size: 10px;
  color: #fff;
}

.al-checkbox.checked {
  background: #6366f1;
  border-color: #6366f1;
}

.al-forgot {
  font-size: 13px;
  color: #6366f1;
  cursor: pointer;
  text-decoration: none;
  background: none;
  border: none;
  font-family: inherit;
  transition: color 0.2s;
}
.al-forgot:hover { color: #818cf8; text-decoration: underline; }

/* ── ERROR ── */
.al-error {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(239,68,68,0.07);
  border: 1px solid rgba(239,68,68,0.2);
  border-left: 3px solid #ef4444;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 13px;
  color: #f87171;
  margin-bottom: 20px;
  animation: slideIn 0.25s cubic-bezier(.4,0,.2,1);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.al-error-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

/* ── SUBMIT BUTTON ── */
.al-btn {
  width: 100%;
  padding: 15px 20px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  transition: transform 0.15s, opacity 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
}

.al-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  pointer-events: none;
}

.al-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.15);
}

.al-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 12px rgba(99,102,241,0.3);
}

.al-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.al-btn-arrow { font-size: 18px; transition: transform 0.2s; }
.al-btn:hover:not(:disabled) .al-btn-arrow { transform: translateX(4px); }

/* ── SPINNER ── */
.al-spin {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── DIVIDER ── */
.al-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
}
.al-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
.al-divider-text { font-size: 11px; color: #334155; letter-spacing: 0.06em; }

/* ── FOOTER ── */
.al-form-footer {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.al-security-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.al-security-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
  flex-shrink: 0;
}

.al-security-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #334155;
  letter-spacing: 0.04em;
}

.al-footer-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.al-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 500;
  color: #334155;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.05em;
}

.al-badge-icon { font-size: 11px; }

/* ══════════════════════════════════════════
   RESPONSIVE BREAKPOINTS
══════════════════════════════════════════ */

/* Tablet landscape + small desktop */
@media (max-width: 1024px) {
  .al-left {
    padding: clamp(24px, 4vw, 48px);
  }
  .al-hero-title {
    font-size: clamp(32px, 4.5vw, 48px);
  }
  .al-right {
    width: clamp(320px, 42vw, 460px);
  }
  .al-stat { padding: 16px 18px; }
  .al-stat-num { font-size: 18px; }
}

/* Tablet portrait */
@media (max-width: 768px) {
  .al-root {
    flex-direction: column;
    overflow-y: auto;
    height: auto;
    min-height: 100vh;
  }
  .al-left {
    flex: none;
    padding: 32px 24px 28px;
    gap: 28px;
  }
  .al-hero-title { font-size: clamp(28px, 7vw, 40px); }
  .al-hero-desc { max-width: 100%; font-size: 14px; }
  .al-right {
    width: 100%;
    border-left: none;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 36px 24px 48px;
  }
  .al-right::before { display: none; }
  .al-stats { gap: 10px; flex-wrap: wrap; }
  .al-stat { min-width: 120px; flex: 1; padding: 14px 16px; }
  .al-stat + .al-stat { margin-left: 0; }
}

/* Mobile */
@media (max-width: 480px) {
  .al-left { padding: 24px 20px 20px; gap: 24px; }
  .al-logo { width: 38px; height: 38px; font-size: 17px; }
  .al-brand-name { font-size: 14px; }
  .al-hero-title { font-size: clamp(26px, 9vw, 34px); }
  .al-hero-chip { font-size: 10px; padding: 5px 12px; }
  .al-right { padding: 28px 20px 40px; }
  .al-form-title { font-size: 20px; }
  .al-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .al-stat { max-width: 100%; }
  .al-stat + .al-stat { margin-left: 0; }
}

/* Very small phones */
@media (max-width: 360px) {
  .al-left { padding: 20px 16px 18px; }
  .al-right { padding: 24px 16px 36px; }
  .al-hero-title { font-size: 24px; }
  .al-stats { grid-template-columns: 1fr; }
}
`;

export default function AdminLogin() {
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [remember, setRemember]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [mounted, setMounted]       = useState(false);

  useEffect(() => { setMounted(true); }, []);


  const navigate = useNavigate();
const login = async (e) => {
  e.preventDefault();
  setError("");

  if (!username.trim() || !password) {
    setError("Please enter both username and password.");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post(
      `${backendURL}/auth/admin-login/`,
      { username, password }
    );

    console.log("Login successful:", res.data);

    setAuth(res.data);

    if (res.data.role === 'ADMIN') {
      navigate("/admin/dashboard");
    } else {
      navigate("/login");
    }

  } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  setError(getErrorMessage(err));
} finally {
    setLoading(false);
  }
};

  return (
    <>
      <style>{css}</style>
      <div className="al-root" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.4s" }}>

        {/* ── Animated background ── */}
        <div className="al-bg">
          <div className="al-bg-orb al-bg-orb-1" />
          <div className="al-bg-orb al-bg-orb-2" />
          <div className="al-bg-orb al-bg-orb-3" />
          <div className="al-bg-grid" />
        </div>

        {/* ══ LEFT PANEL ══ */}
        <div className="al-left">
          {/* Brand */}
          <div className="al-brand">
            <div className="al-logo">AC</div>
            <div className="al-brand-text">
              <div className="al-brand-name">AdminCore</div>
              <div className="al-brand-sub">Control Center</div>
            </div>
          </div>

          {/* Hero */}
          <div className="al-hero">
            <div className="al-hero-chip">
              <div className="al-hero-chip-dot" />
              System Online
            </div>
            <h1 className="al-hero-title">
              Manage with<br />
              <span className="al-gradient-text">full control.</span>
            </h1>
            <p className="al-hero-desc">
              The admin portal gives you complete visibility and control over users,
              content, system settings, and real-time analytics — all from one secure place.
            </p>
          </div>

          {/* Stats */}
          <div className="al-stats">
            <div className="al-stat">
              <span className="al-stat-num">AES-256</span>
              <span className="al-stat-label">Encryption</span>
            </div>
            <div className="al-stat">
              <span className="al-stat-num">99.9%</span>
              <span className="al-stat-label">Uptime SLA</span>
            </div>
            <div className="al-stat">
              <span className="al-stat-num">SOC 2</span>
              <span className="al-stat-label">Compliant</span>
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="al-right">

          {/* Header */}
          <div className="al-form-top">
            <div className="al-access-badge">
              <div className="al-access-dot" />
              Admin Access Only
            </div>
            <h2 className="al-form-title">Welcome back</h2>
            <p className="al-form-sub">Sign in with your administrator credentials to continue.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="al-error" role="alert">
              <span className="al-error-icon">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={login} autoComplete="off" noValidate>

            <div className="al-field">
              <label className="al-label" htmlFor="al-username">Username</label>
              <div className="al-input-wrap">
                <input
                  id="al-username"
                  type="text"
                  className="al-input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  spellCheck={false}
                />
                <div className="al-input-pre" aria-hidden="true">👤</div>
              </div>
            </div>

            <div className="al-field">
              <label className="al-label" htmlFor="al-password">Password</label>
              <div className="al-input-wrap">
                <input
                  id="al-password"
                  type={showPw ? "text" : "password"}
                  className="al-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <div className="al-input-pre" aria-hidden="true">🔒</div>
                <button
                  type="button"
                  className="al-eye-btn"
                  onClick={() => setShowPw(v => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Options row */}
            <div className="al-options">
              <div
                className="al-remember"
                onClick={() => setRemember(v => !v)}
                role="checkbox"
                aria-checked={remember}
                tabIndex={0}
                onKeyDown={(e) => e.key === " " && setRemember(v => !v)}
              >
                <div className={`al-checkbox${remember ? " checked" : ""}`}>
                  {remember && "✓"}
                </div>
                Remember me
              </div>
              <button type="button" className="al-forgot">Forgot password?</button>
            </div>

            {/* Submit */}
            <button className="al-btn" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="al-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  Sign in as Admin
                  <span className="al-btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="al-divider">
            <div className="al-divider-line" />
            <span className="al-divider-text">secured by</span>
            <div className="al-divider-line" />
          </div>

          {/* Footer */}
          <div className="al-form-footer">
            <div className="al-security-row">
              <div className="al-security-dot" />
              <span className="al-security-text">End-to-end encrypted · TLS 1.3</span>
            </div>
            <div className="al-footer-badges">
              <div className="al-badge">
                <span className="al-badge-icon">🔐</span> 2FA Ready
              </div>
              <div className="al-badge">
                <span className="al-badge-icon">🛡</span> Zero Trust
              </div>
              <div className="al-badge">
                <span className="al-badge-icon">📋</span> Audit Logged
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
