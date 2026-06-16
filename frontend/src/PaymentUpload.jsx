import { useState, useEffect } from "react";

export default function PaymentUpload() {
  const [session, setSession] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const s = localStorage.getItem("payment_session");
    if (s) setSession(JSON.parse(s));
  }, []);

  const handleUpload = () => {
    if (!file) return;

    // normally upload to backend
    console.log("Uploading proof for session:", session.id);

    const updated = {
      ...session,
      status: "PAYMENT_UPLOADED",
    };

    localStorage.setItem("payment_session", JSON.stringify(updated));
    setSession(updated);

    alert("Payment proof uploaded!");
  };

  return (
    <div>
      <h2>Upload Payment Screenshot</h2>

      {session && (
        <p>Session ID: {session.id}</p>
      )}

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}