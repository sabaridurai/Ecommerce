import { useState, useEffect, useRef } from "react";
import { backendURL } from "../services/api";

export default function ProductDetailsModal({ product, onClose }) {
  if (!product) return null;

  const media = [
    ...(product.images || []).map((img) => ({
      type: "image",
      url: `${backendURL}${img}`,
    })),
    ...(product.videos || []).map((vid) => ({
      type: "video",
      url: `${backendURL}${vid}`,
    })),
  ];

  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const videoRef = useRef(null);

  const current = media[index];

  // 🔥 AUTO SLIDE ON HOVER
  useEffect(() => {
    if (!hover || media.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [hover, media.length]);

  // 🎯 FORCE VIDEO AUTO PLAY (FIXED)
  useEffect(() => {
    if (current?.type === "video") {
      const video = videoRef.current;

      if (video) {
        video.currentTime = 0;
        video.muted = true; // REQUIRED
        video.loop = true;

        video.play().catch((err) => {
          console.log("Autoplay blocked:", err);
        });
      }
    }
  }, [index, current]);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.title}>{product.name}</h2>

          <button style={styles.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        {/* MEDIA SLIDER */}
        <div
          style={styles.imageBox}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {current?.type === "image" ? (
            <img src={current.url} style={styles.media} alt="" />
          ) : (
            <video
              ref={videoRef}
              src={current.url}
              style={styles.media}
              muted
              loop
              autoPlay
              playsInline
            />
          )}

          {/* DOTS */}
          <div style={styles.dots}>
            {media.map((_, i) => (
              <span
                key={i}
                style={{
                  ...styles.dot,
                  background: i === index ? "#111827" : "#d1d5db",
                }}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div style={styles.content}>
          <p style={styles.desc}>{product.description}</p>
          <div style={styles.price}>₹{product.price}</div>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modal: {
    width: "90%",
    maxWidth: "700px",
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    position: "relative",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  title: {
    fontSize: "20px",
    fontWeight: "700",
    margin: 0,
  },

  closeBtn: {
    color: "#f60e0e",
    border: "none",
    width: 32,
    height: 32,
    borderRadius: "50%",
    cursor: "pointer",
    background: "#f3f4f6",
  },

  imageBox: {
    position: "relative",
    width: "100%",
    height: "350px",
    overflow: "hidden",
    borderRadius: "12px",
    background: "#f3f4f6",
  },

  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  dots: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "6px",
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#d1d5db",
  },

  content: {
    padding: "12px 0",
  },

  desc: {
    fontSize: "14px",
    color: "#6b7280",
  },

  price: {
    fontSize: "20px",
    fontWeight: "700",
    marginTop: "10px",
  },
};