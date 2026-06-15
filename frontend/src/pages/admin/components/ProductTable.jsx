import {backendURL} from "../services/api";

export default function ProductTable({ products, onEdit, onDelete, onView }) {

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableCard}>
        
        <table style={styles.table}>
          
          {/* HEADER */}
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={styles.row}>
                
                {/* IMAGE */}
                <td style={styles.td}>
                    
                <img
  src={
    p.images?.[0]
      ? `${backendURL}${p.images[0]}`
      : "https://via.placeholder.com/60"
  }
  alt="product"
  style={styles.image}
/>
                </td>

                {/* NAME */}
                <td style={styles.tdBold}>{p.name}</td>

                {/* PRICE */}
                <td style={styles.td}>₹{p.price}</td>

                {/* CATEGORY */}
                <td style={styles.td}>{p.category}</td>

                {/* STOCK BADGE */}
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background: p.stock > 0 ? "#dcfce7" : "#fee2e2",
                      color: p.stock > 0 ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {p.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.viewBtn} onClick={() => onView(p)}>
                      👁
                    </button>

                    <button style={styles.editBtn} onClick={() => onEdit(p)}>
                      ✏️
                    </button>

                    <button
  style={styles.deleteBtn}
  onClick={() => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this product? This action cannot be undone."
    );

    if (confirmDelete) {
      onDelete(p.id);
    }
  }}
>
  🗑
</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    marginTop: "20px",
    width: "100%",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px",
  },

  headerRow: {
    background: "#f9fafb",
  },

  th: {
    textAlign: "left",
    padding: "14px",
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: "600",
    borderBottom: "1px solid #eee",
  },

  row: {
    borderBottom: "1px solid #f3f4f6",
    transition: "0.2s",
  },

  td: {
    padding: "14px",
    fontSize: "14px",
    color: "#374151",
  },

  tdBold: {
    padding: "14px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },

  image: {
    width: "45px",
    height: "45px",
    borderRadius: "10px",
    objectFit: "cover",
    border: "1px solid #eee",
  },

  badge: {
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  viewBtn: {
    background: "#e0f2fe",
    border: "none",
    padding: "6px 8px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  editBtn: {
    background: "#fef9c3",
    border: "none",
    padding: "6px 8px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#fee2e2",
    border: "none",
    padding: "6px 8px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};