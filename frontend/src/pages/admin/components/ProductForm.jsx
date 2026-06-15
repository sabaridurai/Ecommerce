import { useState, useEffect } from "react";
import axios from "axios";
import { saveProduct } from "../services/productService";


export default function ProductForm({ onSave, editProduct, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "in",
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        category: editProduct.category || "",
        stock: editProduct.stock > 0 ? "in" : "out",
      });

      setImages(editProduct.images || []);
      setVideos(editProduct.videos || []);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const submit = async () => {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("price", form.price);
  formData.append("category", form.category);
  formData.append("stock", form.stock === "in" ? 10 : 0);

  images.forEach((file) => {
    if (file instanceof File) {
      formData.append("images", file);
    }
  });

  videos.forEach((file) => {
    if (file instanceof File) {
      formData.append("videos", file);
    }
  });

  try {
    const res = await saveProduct(formData, editProduct?.id);

    console.log(editProduct ? "Updated:" : "Created:", res);

    onSave(res);
    onCancel();

  } catch (err) {
    console.log("Error:+", err.message);
  }
};

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div style={styles.header}>
          <h2>
            {editProduct ? "✏️ Edit Product" : "➕ Create Product"}
          </h2>

          <button style={styles.closeBtn} onClick={onCancel}>
            ✖
          </button>
        </div>

        {/* FORM GRID */}
        <div style={styles.grid}>
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="stock"
            value={form.stock}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="in">🟢 In Stock</option>
            <option value="out">🔴 Out of Stock</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          style={{ ...styles.input, marginTop: 12 }}
          rows={3}
        />

        {/* UPLOAD */}
        <div style={styles.uploadGrid}>

          <div style={styles.uploadBox}>
            <label style={styles.uploadLabel}>📷 Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files])}
            />
          </div>

          <div style={styles.uploadBox}>
            <label style={styles.uploadLabel}>🎥 Videos</label>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => setVideos([...e.target.files])}
            />
          </div>

        </div>

        {/* PREVIEW */}
        <div style={styles.preview}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img instanceof File ? URL.createObjectURL(img) : img}
              style={styles.img}
              alt=""
            />
          ))}

          {videos.map((v, i) => (
            <video
              key={i}
              src={v instanceof File ? URL.createObjectURL(v) : v}
              controls
              style={styles.video}
            />
          ))}
        </div>

        {/* ACTIONS */}
        <div style={styles.actions}>
          <button style={styles.saveBtn} onClick={submit}>
            Save Product
          </button>

          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    width: "92%",
    maxWidth: "800px",
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  closeBtn: {
    border: "none",
    background: "#eee",
    width: 32,
    height: 32,
    borderRadius: "50%",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginTop: "10px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },

  uploadGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "15px",
  },

  uploadBox: {
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "10px",
    background: "#fafafa",
  },

  uploadLabel: {
    fontSize: "13px",
    fontWeight: "600",
  },

  preview: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  },

  img: {
    width: "70px",
    height: "70px",
    borderRadius: "10px",
    objectFit: "cover",
  },

  video: {
    width: "100px",
    height: "70px",
    borderRadius: "10px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  saveBtn: {
    background: "#111827",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "#ef4444",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
};