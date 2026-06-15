// components/ImageCarousel.jsx
import { useState } from "react";

export default function ImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images.length) return <div>No Image</div>;

  return (
    <div>
      <img
        src={images[index]}
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}>
          ◀
        </button>

        <button onClick={() => setIndex((i) => (i + 1) % images.length)}>
          ▶
        </button>
      </div>
    </div>
  );
}