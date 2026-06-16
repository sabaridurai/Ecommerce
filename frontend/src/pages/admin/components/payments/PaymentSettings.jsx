import { useEffect, useState } from "react";
import {
  getPaymentMethods,
  createPaymentMethod,
  deletePaymentMethod,
} from "../services/paymentService";

export default function PaymentSettings() {
  const [methods, setMethods] = useState([]);

  const [form, setForm] = useState({
    title: "",
    payment_type: "QR",
    upi_id: "",
    account_holder: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    mobile_number: "",
    instructions: "",
  });

  const [qrImage, setQrImage] = useState(null);

  useEffect(() => {
    loadMethods();
  }, []);

  const loadMethods = async () => {
    const res = await getPaymentMethods();
    setMethods(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      fd.append(key, form[key]);
    });

    if (qrImage) {
      fd.append("qr_image", qrImage);
    }

    await createPaymentMethod(fd);

    setForm({
      title: "",
      payment_type: "QR",
      upi_id: "",
      account_holder: "",
      bank_name: "",
      account_number: "",
      ifsc_code: "",
      mobile_number: "",
      instructions: "",
    });

    loadMethods();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Payment Method?")) return;

    await deletePaymentMethod(id);
    loadMethods();
  };

  return (
    <div className="container">
      <h2>Payment Settings</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <select
          value={form.payment_type}
          onChange={(e) =>
            setForm({
              ...form,
              payment_type: e.target.value,
            })
          }
        >
          <option value="QR">QR</option>
          <option value="UPI">UPI</option>
          <option value="BANK">BANK</option>
        </select>

        <input
          placeholder="UPI ID"
          value={form.upi_id}
          onChange={(e) =>
            setForm({
              ...form,
              upi_id: e.target.value,
            })
          }
        />

        <input
          placeholder="Account Holder"
          value={form.account_holder}
          onChange={(e) =>
            setForm({
              ...form,
              account_holder: e.target.value,
            })
          }
        />

        <input
          placeholder="Bank Name"
          value={form.bank_name}
          onChange={(e) =>
            setForm({
              ...form,
              bank_name: e.target.value,
            })
          }
        />

        <input
          placeholder="Account Number"
          value={form.account_number}
          onChange={(e) =>
            setForm({
              ...form,
              account_number: e.target.value,
            })
          }
        />

        <input
          placeholder="IFSC"
          value={form.ifsc_code}
          onChange={(e) =>
            setForm({
              ...form,
              ifsc_code: e.target.value,
            })
          }
        />

        <input
          placeholder="Mobile Number"
          value={form.mobile_number}
          onChange={(e) =>
            setForm({
              ...form,
              mobile_number: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Instructions"
          value={form.instructions}
          onChange={(e) =>
            setForm({
              ...form,
              instructions: e.target.value,
            })
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setQrImage(e.target.files[0])
          }
        />

        <button type="submit">
          Save Payment Method
        </button>
      </form>

      <hr />

      <h3>Payment Methods</h3>

      {methods.map((method) => (
        <div key={method.id}>
          <h4>{method.title}</h4>

          <p>{method.payment_type}</p>

          <p>{method.upi_id}</p>

          {method.qr_image && (
            <img
              src={`http://127.0.0.1:8000${method.qr_image}`}
              alt=""
              width="150"
            />
          )}

          <button
            onClick={() =>
              handleDelete(method.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}