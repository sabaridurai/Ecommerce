import { useState, useEffect } from "react";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import ProductCardView from "../components/ProductCardView";
import ProductDetailsModal from "../components/ProductDetailsModal";



import {
  getProducts,
  deleteProduct,
} from "../services/productService";

export default function Products() {

  // 🔥 BACKEND DATA (NOT REDUX)
  const [products, setProducts] = useState([]);

  const [modal, setModal] = useState(null);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  // 🚀 LOAD FROM DJANGO
  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async () => {
  try {
    const data = await getProducts();
    console.log("Fetched products:", data);
    setProducts(data);
  } catch (err) {
    console.log("Load error:", err.message);
  }
};

  // 🔍 FILTER + SEARCH
  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" ||
      (filter === "in" && p.stock > 0) ||
      (filter === "out" && p.stock <= 0);

    return matchSearch && matchFilter;
  });

  // 💾 CREATE / UPDATE
  const saveProduct = async () => {
    setModal(null);
    await fetchProducts(); // refresh from backend
  };

const handleDelete = async (id) => {
  try {
    await deleteProduct(id);
    fetchProducts();
  } catch (err) {
    console.log("Delete error:", err.message);
  }
};

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>📦 Product Dashboard</h2>
          <p style={styles.subtitle}>Manage products from backend</p>
        </div>

        <button
          style={styles.addBtn}
          onClick={() => setModal({ mode: "create" })}
        >
          + Add Product
        </button>
      </div>

      {/* TOOLBAR */}
      <div style={styles.toolbar}>

        {/* SEARCH */}
        <input
          style={styles.search}
          placeholder="🔍 Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTER */}
        <div style={styles.filters}>
          {["all", "in", "out"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                ...styles.filterBtn,
                background: filter === type ? "#111827" : "#f3f4f6",
                color: filter === type ? "#fff" : "#111827",
              }}
            >
              {type === "all" && "All"}
              {type === "in" && "In Stock"}
              {type === "out" && "Out Stock"}
            </button>
          ))}
        </div>

        {/* VIEW SWITCH */}
        <div style={styles.viewSwitch}>
          <button
            onClick={() => setView("table")}
            style={{
              ...styles.viewBtn,
              background: view === "table" ? "#3b82f6" : "#e5e7eb",
              color: view === "table" ? "#fff" : "#111827",
            }}
          >
            Table
          </button>

          <button
            onClick={() => setView("card")}
            style={{
              ...styles.viewBtn,
              background: view === "card" ? "#3b82f6" : "#e5e7eb",
              color: view === "card" ? "#fff" : "#111827",
            }}
          >
            Cards
          </button>
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <ProductForm
          onSave={saveProduct}
          editProduct={modal.mode === "edit" ? modal.data : null}
          onCancel={() => setModal(null)}
        />
      )}

      {/* CONTENT */}
      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <h3>🚫 No Products Found</h3>
          <p>Add your first product</p>
        </div>
      ) : (
        <>
          {view === "table" ? (
            <ProductTable
              products={filtered}
              onEdit={(p) => setModal({ mode: "edit", data: p })}
              onDelete={handleDelete}
              onView={setSelected}
            />
          ) : (
            <ProductCardView products={filtered} />
          )}
        </>
      )}

      {/* DETAILS MODAL */}
      <ProductDetailsModal
        product={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "24px",
    background: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
  },

  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
  },

  addBtn: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  toolbar: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "12px",
    background: "#fff",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  search: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    width: "220px",
  },

  filters: {
    display: "flex",
    gap: "8px",
  },

  filterBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  viewSwitch: {
    marginLeft: "auto",
    display: "flex",
    gap: "8px",
  },

  viewBtn: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "60px",
    background: "#fff",
    borderRadius: "12px",
  },
};