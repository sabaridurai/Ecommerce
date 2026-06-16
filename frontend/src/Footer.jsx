export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        <div style={styles.col}>
          <h3 style={styles.logo}>ShopMate</h3>
          <p style={styles.text}>
            Premium shopping experience with fast delivery and trusted quality.
          </p>
        </div>

        <div style={styles.col}>
          <h4 style={styles.title}>Quick Links</h4>
          <a href="#" style={styles.link}>Home</a>
          <a href="#" style={styles.link}>Products</a>
          <a href="#" style={styles.link}>Cart</a>
        </div>

        <div style={styles.col}>
          <h4 style={styles.title}>Support</h4>
          <a href="#" style={styles.link}>Contact</a>
          <a href="#" style={styles.link}>FAQ</a>
          <a href="#" style={styles.link}>Help</a>
        </div>

      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} ShopMate. All rights reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#0b0b12",
    color: "#fff",
    padding: "60px 20px 20px",
    marginTop: "40px",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "30px",
  },

  col: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  title: {
    fontSize: "16px",
    marginBottom: "8px",
    color: "#aaa",
  },

  text: {
    fontSize: "13px",
    color: "#777",
    lineHeight: "1.5",
  },

  link: {
    fontSize: "14px",
    color: "#bbb",
    textDecoration: "none",
  },

  bottom: {
    marginTop: "40px",
    textAlign: "center",
    fontSize: "12px",
    color: "#555",
    borderTop: "1px solid #222",
    paddingTop: "20px",
  },
};