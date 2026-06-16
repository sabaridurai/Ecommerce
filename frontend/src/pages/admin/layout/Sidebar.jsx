import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.sb-root {
  width: 240px;
  min-width: 240px;
  height: 100vh;
  background: #060a10;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255,255,255,0.06);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  transition: width 0.3s cubic-bezier(.4,0,.2,1), min-width 0.3s cubic-bezier(.4,0,.2,1);
  z-index: 100;
}

.sb-root.collapsed {
  width: 68px;
  min-width: 68px;
}

/* glow accent top */
.sb-root::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%);
  opacity: 0.8;
}

/* subtle bg orb */
.sb-root::after {
  content: '';
  position: absolute;
  top: -60px; left: -60px;
  width: 260px; height: 260px;
  background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── BRAND ── */
.sb-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 22px 18px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.sb-logo {
  width: 36px; height: 36px;
  min-width: 36px;
  background: linear-gradient(135deg, #6366f1, #4338ca);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
  box-shadow: 0 0 0 1px rgba(99,102,241,0.4), 0 4px 12px rgba(99,102,241,0.25);
  flex-shrink: 0;
}

.sb-brand-text {
  overflow: hidden;
  white-space: nowrap;
  transition: opacity 0.2s, width 0.3s;
}

.sb-brand-name {
  font-size: 15px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.sb-brand-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6366f1;
}

/* collapse btn */
.sb-collapse-btn {
  margin-left: auto;
  flex-shrink: 0;
  width: 26px; height: 26px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.3s;
}
.sb-collapse-btn:hover { background: rgba(255,255,255,0.08); color: #94a3b8; }
.sb-root.collapsed .sb-collapse-btn { transform: rotate(180deg); }

/* ── STATUS ── */
.sb-status {
  margin: 14px 14px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16,185,129,0.07);
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: 8px;
  padding: 8px 12px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.sb-status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
  animation: pulse 2.5s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px #10b981; }
  50% { opacity: 0.5; box-shadow: 0 0 2px #10b981; }
}

.sb-status-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #10b981;
  letter-spacing: 0.06em;
  white-space: nowrap;
  overflow: hidden;
}

/* ── NAV SECTION ── */
.sb-section {
  padding: 12px 12px 4px;
  position: relative;
  z-index: 1;
}

.sb-section-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #334155;
  padding: 0 6px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.2s;
}

.sb-root.collapsed .sb-section-label { opacity: 0; }

/* ── NAV ITEM ── */
.sb-nav-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 10px;
  border-radius: 9px;
  text-decoration: none;
  color: #475569;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, padding 0.3s;
  position: relative;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid transparent;
}

.sb-nav-item:hover {
  background: rgba(255,255,255,0.05);
  color: #94a3b8;
  border-color: rgba(255,255,255,0.06);
}

.sb-nav-item.active {
  background: rgba(99,102,241,0.12);
  color: #a5b4fc;
  border-color: rgba(99,102,241,0.2);
}

.sb-nav-item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  width: 3px; height: 60%;
  background: #6366f1;
  border-radius: 0 3px 3px 0;
}

/* icon */
.sb-nav-icon {
  width: 32px; height: 32px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  font-size: 16px;
  background: rgba(255,255,255,0.04);
  transition: background 0.15s;
  flex-shrink: 0;
}

.sb-nav-item.active .sb-nav-icon {
  background: rgba(99,102,241,0.2);
}

.sb-nav-item:hover .sb-nav-icon {
  background: rgba(255,255,255,0.07);
}

.sb-nav-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.2s;
}
.sb-root.collapsed .sb-nav-label { opacity: 0; width: 0; }

/* badge */
.sb-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 100px;
  background: rgba(99,102,241,0.2);
  color: #818cf8;
  letter-spacing: 0.02em;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.sb-badge.red {
  background: rgba(239,68,68,0.15);
  color: #f87171;
}

.sb-badge.green {
  background: rgba(16,185,129,0.12);
  color: #34d399;
}

.sb-root.collapsed .sb-badge { opacity: 0; width: 0; padding: 0; }

/* tooltip on collapsed */
.sb-nav-item .sb-tooltip {
  display: none;
  position: absolute;
  left: 58px;
  top: 50%; transform: translateY(-50%);
  background: #1e293b;
  border: 1px solid rgba(255,255,255,0.1);
  color: #e2e8f0;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 7px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 999;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

.sb-root.collapsed .sb-nav-item:hover .sb-tooltip { display: block; }

/* ── DIVIDER ── */
.sb-divider {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin: 10px 14px;
}

/* ── SPACER ── */
.sb-spacer { flex: 1; }

/* ── USER ── */
.sb-user {
  margin: 0 12px 16px;
  padding: 11px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: background 0.15s;
}
.sb-user:hover { background: rgba(255,255,255,0.06); }

.sb-avatar {
  width: 32px; height: 32px;
  min-width: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6366f1, #0ea5e9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.sb-user-info { overflow: hidden; flex: 1; }
.sb-user-name {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sb-user-role {
  font-size: 10px;
  color: #475569;
  white-space: nowrap;
  letter-spacing: 0.04em;
}

.sb-user-arrow {
  font-size: 12px;
  color: #334155;
  flex-shrink: 0;
  transition: opacity 0.2s;
}
.sb-root.collapsed .sb-user-info,
.sb-root.collapsed .sb-user-arrow { opacity: 0; width: 0; overflow: hidden; }
`;

const NAV = [
  {
    section: "Main",
    items: [
      { to: "/admin/dashboard", icon: "🏠", label: "Dashboard", badge: null },
    //   { to: "/admin/analytics", icon: "📊", label: "Analytics",  badge: null },
    ],
  },
  {
    section: "Catalog",
    items: [
      { to: "/admin/products",  icon: "📦", label: "Products",  badge: "128", badgeType: "" },
    //   { to: "/admin/inventory", icon: "🗄️", label: "Inventory",  badge: null },
    //   { to: "/admin/categories",icon: "🏷️", label: "Categories", badge: null },
    ],
  },
  {
    section: "Finance",
    items: [
      {  to: "/admin/payments",  icon: "💳",  label: "Payment Methods",  badge: "3",  badgeType: "green"},
      { to: "/admin/paymentHistory",    icon: "🧾", label: "Payment History",    badge: "12", badgeType: "green" },
    //   { to: "/admin/refunds",   icon: "↩️",  label: "Refunds",   badge: null },
    ],
  },
  {
    section: "System",
    items: [
    //   { to: "/admin/users",     icon: "👥", label: "Users",     badge: null },
      { to: "/admin/settings",  icon: "⚙️", label: "Settings",  badge: null },
    //   { to: "/admin/logs",      icon: "📋", label: "Audit Logs", badge: null },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      <style>{css}</style>
      <aside className={`sb-root${collapsed ? " collapsed" : ""}`}>

        {/* ── Brand ── */}
        <div className="sb-brand">
         
         
          <div className="sb-logo" 
           onClick={() => setCollapsed(v => !v)}
           >🌐</div>
          {!collapsed && (
            <div className="sb-brand-text"  onClick={() => setCollapsed(v => !v)}>
              <div className="sb-brand-name">Admin</div>
              <div className="sb-brand-tag">Control Center</div>
            </div>
          )}
          {/* <button
            className="sb-collapse-btn"
            onClick={() => setCollapsed(v => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            ◀
          </button> */}
        </div>

        {/* ── Status ── */}
        <div className="sb-status">
          <div className="sb-status-dot" />
          {!collapsed && <span className="sb-status-text">System · Online</span>}
        </div>

        {/* ── Nav sections ── */}
        {NAV.map((group, gi) => (
          <div className="sb-section" key={gi}>
            <div className="sb-section-label">{group.section}</div>
            {group.items.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`sb-nav-item${active ? " active" : ""}`}
                >
                  <div className="sb-nav-icon">{item.icon}</div>
                  <span className="sb-nav-label">{item.label}</span>
                  {item.badge && (
                    <span className={`sb-badge${item.badgeType ? " " + item.badgeType : ""}`}>
                      {item.badge}
                    </span>
                  )}
                  <span className="sb-tooltip">{item.label}</span>
                </Link>
              );
            })}
            {gi < NAV.length - 1 && <div className="sb-divider" />}
          </div>
        ))}

        <div className="sb-spacer" />

        

      </aside>
    </>
  );
}