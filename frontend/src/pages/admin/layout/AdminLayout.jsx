import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={styles.wrapper}>
      
      {/* SIDEBAR FIXED */}
      <div style={styles.sidebar}>
        <Sidebar />
      </div>

      {/* MAIN AREA */}
      <div style={styles.main}>
        
        {/* NAVBAR FIXED */}
        <div style={styles.navbar}>
          <Navbar />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div style={styles.content}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    overflow: "hidden", // IMPORTANT
    background: "#f9fafb",
  },

  sidebar: {
    width: "250px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    background: "#111827",
    color: "#fff",
    overflowY: "auto",
  },

  main: {
    marginLeft: "250px", // same as sidebar width
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
  },

  navbar: {
    height: "60px",
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "#fff",
    borderBottom: "1px solid #eee",
  },

  content: {
    flex: 1,
    overflowY: "auto", // ONLY THIS SCROLLS
    padding: "20px",
  },
};