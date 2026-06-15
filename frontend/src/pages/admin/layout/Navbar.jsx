import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.nb-root {
  height: 64px;
  width: 100%;
  background: rgba(6, 10, 16, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
  font-family: 'Inter', sans-serif;
  position: sticky;
  top: 0;
  z-index: 50;
  position: relative;
}

/* top accent line */
.nb-root::before {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 30%, rgba(14,165,233,0.3) 70%, transparent 100%);
}

/* ── LEFT: breadcrumb ── */
.nb-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.nb-page-icon {
  width: 30px; height: 30px;
  border-radius: 8px;
  background: rgba(99,102,241,0.12);
  border: 1px solid rgba(99,102,241,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.nb-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
}

.nb-crumb-root {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #334155;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.nb-crumb-sep {
  color: #1e293b;
  font-size: 14px;
  line-height: 1;
}

.nb-crumb-current {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── CENTER: search ── */
.nb-search-wrap {
  position: relative;
  width: clamp(180px, 28vw, 340px);
  flex-shrink: 0;
}

.nb-search-icon {
  position: absolute;
  left: 11px;
  top: 50%; transform: translateY(-50%);
  font-size: 14px;
  color: #334155;
  pointer-events: none;
  transition: color 0.2s;
}

.nb-search-wrap:focus-within .nb-search-icon { color: #6366f1; }

.nb-search {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 9px;
  padding: 8px 36px 8px 34px;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}

.nb-search::placeholder { color: #2d3f55; }

.nb-search:focus {
  border-color: #6366f1;
  background: rgba(99,102,241,0.06);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
}

.nb-search-kbd {
  position: absolute;
  right: 10px;
  top: 50%; transform: translateY(-50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: #334155;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  padding: 2px 5px;
  pointer-events: none;
  letter-spacing: 0.06em;
  transition: opacity 0.2s;
}

.nb-search-wrap:focus-within .nb-search-kbd { opacity: 0; }

/* ── RIGHT: actions ── */
.nb-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

/* icon button */
.nb-icon-btn {
  width: 36px; height: 36px;
  border-radius: 9px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  position: relative;
  flex-shrink: 0;
}

.nb-icon-btn:hover {
  background: rgba(255,255,255,0.08);
  color: #94a3b8;
  border-color: rgba(255,255,255,0.12);
}

/* notification badge */
.nb-notif-badge {
  position: absolute;
  top: 6px; right: 6px;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #ef4444;
  border: 1.5px solid #060a10;
  box-shadow: 0 0 6px rgba(239,68,68,0.6);
  animation: badgePulse 2.5s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { box-shadow: 0 0 6px rgba(239,68,68,0.6); }
  50%       { box-shadow: 0 0 2px rgba(239,68,68,0.3); }
}

/* vertical divider */
.nb-divider {
  width: 1px;
  height: 22px;
  background: rgba(255,255,255,0.07);
  margin: 0 4px;
  flex-shrink: 0;
}

/* ── CLOCK ── */
.nb-clock {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #334155;
  letter-spacing: 0.06em;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
}

.nb-clock-time { color: #475569; font-size: 12px; font-weight: 500; }
.nb-clock-date { font-size: 9px; color: #1e293b; letter-spacing: 0.08em; }

/* ── USER DROPDOWN ── */
.nb-user-wrap { position: relative; }

.nb-user-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 6px 10px 6px 7px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  color: inherit;
  font-family: 'Inter', sans-serif;
}

.nb-user-btn:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.13);
}

.nb-avatar {
  width: 30px; height: 30px;
  min-width: 30px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6366f1, #0ea5e9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.nb-user-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  text-align: left;
}

.nb-user-name {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
  line-height: 1.2;
}

.nb-user-role {
  font-size: 10px;
  color: #475569;
  white-space: nowrap;
  letter-spacing: 0.04em;
}

.nb-chevron {
  font-size: 11px;
  color: #334155;
  transition: transform 0.2s;
  flex-shrink: 0;
}
.nb-chevron.open { transform: rotate(180deg); }

/* ── DROPDOWN MENU ── */
.nb-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
  animation: dropIn 0.18s cubic-bezier(.4,0,.2,1);
  z-index: 200;
}

@keyframes dropIn {
  from { opacity: 0; transform: translateY(-8px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.nb-dd-header {
  padding: 14px 14px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.nb-dd-name {
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
  letter-spacing: -0.01em;
}

.nb-dd-email {
  font-size: 11px;
  color: #475569;
  margin-top: 2px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.02em;
}

.nb-dd-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 7px;
  background: rgba(99,102,241,0.12);
  border: 1px solid rgba(99,102,241,0.2);
  color: #818cf8;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 5px;
}

.nb-dd-items { padding: 6px; }

.nb-dd-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 7px;
  font-size: 13px;
  color: #64748b;
  cursor: pointer;
  transition: background 0.13s, color 0.13s;
  text-decoration: none;
  background: none;
  border: none;
  width: 100%;
  font-family: 'Inter', sans-serif;
  text-align: left;
}

.nb-dd-item:hover { background: rgba(255,255,255,0.05); color: #94a3b8; }

.nb-dd-item-icon {
  width: 26px; height: 26px;
  border-radius: 6px;
  background: rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}

.nb-dd-sep { height: 1px; background: rgba(255,255,255,0.05); margin: 4px 6px; }

.nb-dd-item.danger { color: #f87171; }
.nb-dd-item.danger:hover { background: rgba(239,68,68,0.08); color: #fca5a5; }
.nb-dd-item.danger .nb-dd-item-icon { background: rgba(239,68,68,0.08); }

/* ── NOTIFICATION PANEL ── */
.nb-notif-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 300px;
  background: #0d1117;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  animation: dropIn 0.18s cubic-bezier(.4,0,.2,1);
  z-index: 200;
}

.nb-notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 14px 11px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.nb-notif-title {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.nb-notif-clear {
  font-size: 11px;
  color: #6366f1;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
  padding: 0;
}
.nb-notif-clear:hover { color: #818cf8; }

.nb-notif-list { padding: 6px; max-height: 280px; overflow-y: auto; }

.nb-notif-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.13s;
  position: relative;
}
.nb-notif-item:hover { background: rgba(255,255,255,0.04); }
.nb-notif-item.unread::after {
  content: '';
  position: absolute;
  right: 10px; top: 50%; transform: translateY(-50%);
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #6366f1;
}

.nb-notif-dot-icon {
  width: 30px; height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 1px;
}

.nb-notif-dot-icon.warn { background: rgba(251,191,36,0.1); }
.nb-notif-dot-icon.info { background: rgba(14,165,233,0.1); }
.nb-notif-dot-icon.success { background: rgba(16,185,129,0.1); }
.nb-notif-dot-icon.danger { background: rgba(239,68,68,0.1); }

.nb-notif-body { flex: 1; min-width: 0; }
.nb-notif-msg { font-size: 12px; color: #94a3b8; line-height: 1.45; }
.nb-notif-time { font-size: 10px; color: #334155; margin-top: 3px; font-family: 'JetBrains Mono', monospace; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .nb-clock { display: none; }
  .nb-search-wrap { width: clamp(120px, 30vw, 200px); }
  .nb-user-info { display: none; }
  .nb-user-btn { padding: 5px; gap: 0; border: none; background: transparent; }
  .nb-chevron { display: none; }
  .nb-breadcrumb .nb-crumb-root { display: none; }
  .nb-breadcrumb .nb-crumb-sep { display: none; }
}

@media (max-width: 480px) {
  .nb-root { padding: 0 14px; gap: 10px; }
  .nb-search-wrap { display: none; }
  .nb-page-icon { display: none; }
  .nb-divider { display: none; }
}
`;

const ROUTE_MAP = {
  "/admin/dashboard":  { label: "Dashboard",  icon: "🏠" },
  "/admin/analytics":  { label: "Analytics",  icon: "📊" },
  "/admin/products":   { label: "Products",   icon: "📦" },
  "/admin/inventory":  { label: "Inventory",  icon: "🗄️" },
  "/admin/categories": { label: "Categories", icon: "🏷️" },
  "/admin/payments":   { label: "Payments",   icon: "💳" },
  "/admin/orders":     { label: "Orders",     icon: "🧾" },
  "/admin/refunds":    { label: "Refunds",    icon: "↩️"  },
  "/admin/users":      { label: "Users",      icon: "👥" },
  "/admin/settings":   { label: "Settings",   icon: "⚙️" },
  "/admin/logs":       { label: "Audit Logs", icon: "📋" },
};

const NOTIFICATIONS = [
  { id:1, icon:"⚠️",  type:"warn",    msg:"Inventory low on 3 products",      time:"2m ago",  unread: true  },
  { id:2, icon:"💳",  type:"danger",  msg:"Payment dispute raised — Order #2847", time:"15m ago", unread: true  },
  { id:3, icon:"✅",  type:"success", msg:"New order #2851 placed successfully",  time:"1h ago",  unread: true  },
  { id:4, icon:"ℹ️",  type:"info",    msg:"System backup completed",           time:"3h ago",  unread: false },
  { id:5, icon:"👤",  type:"info",    msg:"New user registered: j.smith@co.io", time:"5h ago",  unread: false },
];

const DD_ITEMS = [
  { icon:"👤", label:"My Profile"   },
  { icon:"⚙️", label:"Settings"    },
  { icon:"🔐", label:"Security"    },
  { icon:"📋", label:"Activity Log" },
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = time.getHours().toString().padStart(2,"0");
  const mm = time.getMinutes().toString().padStart(2,"0");
  const ss = time.getSeconds().toString().padStart(2,"0");
  const date = time.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });
  return (
    <div className="nb-clock">
      <span className="nb-clock-time">{hh}:{mm}:{ss}</span>
      <span className="nb-clock-date">{date}</span>
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [userOpen,   setUserOpen]   = useState(false);
  const [notifOpen,  setNotifOpen]  = useState(false);
  const [notifs,     setNotifs]     = useState(NOTIFICATIONS);
  const userRef  = useRef(null);
  const notifRef = useRef(null);

  const page   = ROUTE_MAP[location.pathname] || { label: "Dashboard", icon: "🏠" };
  const unread = notifs.filter(n => n.unread).length;

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (userRef.current  && !userRef.current.contains(e.target))  setUserOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const clearAll = () => setNotifs(n => n.map(x => ({ ...x, unread: false })));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };

  return (
    <>
      <style>{css}</style>
      <header className="nb-root">

        {/* ── LEFT ── */}
        <div className="nb-left">
          <div className="nb-page-icon">{page.icon}</div>
          <div className="nb-breadcrumb">
            <span className="nb-crumb-root">AdminCore</span>
            <span className="nb-crumb-sep">/</span>
            <span className="nb-crumb-current">{page.label}</span>
          </div>
        </div>

        {/* ── SEARCH ── */}
        <div className="nb-search-wrap">
          <span className="nb-search-icon">🔍</span>
          <input
            className="nb-search"
            type="text"
            placeholder="Search anything…"
            aria-label="Search"
          />
          <span className="nb-search-kbd">⌘K</span>
        </div>

        {/* ── RIGHT ── */}
        <div className="nb-right">

          <LiveClock />
          <div className="nb-divider" />

          {/* Notifications */}
          <div style={{ position:"relative" }} ref={notifRef}>
            <button
              className="nb-icon-btn"
              onClick={() => { setNotifOpen(v => !v); setUserOpen(false); }}
              aria-label="Notifications"
            >
              🔔
              {unread > 0 && <span className="nb-notif-badge" />}
            </button>

            {notifOpen && (
              <div className="nb-notif-panel">
                <div className="nb-notif-header">
                  <span className="nb-notif-title">Notifications {unread > 0 && `(${unread})`}</span>
                  {unread > 0 && (
                    <button className="nb-notif-clear" onClick={clearAll}>Mark all read</button>
                  )}
                </div>
                <div className="nb-notif-list">
                  {notifs.map(n => (
                    <div
                      key={n.id}
                      className={`nb-notif-item${n.unread ? " unread" : ""}`}
                      onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? {...x, unread:false} : x))}
                    >
                      <div className={`nb-notif-dot-icon ${n.type}`}>{n.icon}</div>
                      <div className="nb-notif-body">
                        <div className="nb-notif-msg">{n.msg}</div>
                        <div className="nb-notif-time">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme / Settings quick */}
          <button className="nb-icon-btn" aria-label="Settings">⚙️</button>

          <div className="nb-divider" />

          {/* User */}
          <div className="nb-user-wrap" ref={userRef}>
            <button
              className="nb-user-btn"
              onClick={() => { setUserOpen(v => !v); setNotifOpen(false); }}
              aria-label="User menu"
            >
              <div className="nb-avatar">SA</div>
              <div className="nb-user-info">
                <div className="nb-user-name">Super Admin</div>
                <div className="nb-user-role">Administrator</div>
              </div>
              <span className={`nb-chevron${userOpen ? " open" : ""}`}>▾</span>
            </button>

            {userOpen && (
              <div className="nb-dropdown">
                <div className="nb-dd-header">
                  <div className="nb-dd-name">Super Admin</div>
                  <div className="nb-dd-email">admin@admincore.io</div>
                  <div className="nb-dd-badge">⬡ Administrator</div>
                </div>
                <div className="nb-dd-items">
                  {DD_ITEMS.map(item => (
                    <button key={item.label} className="nb-dd-item">
                      <span className="nb-dd-item-icon">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                  <div className="nb-dd-sep" />
                  <button className="nb-dd-item danger" onClick={handleLogout}>
                    <span className="nb-dd-item-icon">🚪</span>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
}