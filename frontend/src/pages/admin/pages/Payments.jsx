import { useEffect, useState } from "react";
import {
  getMethods,
  saveMethod,
  deleteMethod,
} from "../../../services/paymentService";

import "./Payments.css";

export default function Payments() {
  const [methods, setMethods] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialState = {
    title: "",
    payment_type: "UPI",
    upi_id: "",
    account_holder: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    mobile_number: "",
    instructions: "",
  };

  const [form, setForm] = useState(initialState);
  const [qrImage, setQrImage] = useState(null);

  useEffect(() => {
    loadMethods();
  }, []);

const loadMethods = async () => {
  try {
    const data = await getMethods();
    setMethods(data || []);
  } catch (err) {
    console.error(err);
    setMethods([]);
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const fd = new FormData();

    Object.entries(form).forEach(
      ([key, value]) => {
        fd.append(key, value);
      }
    );

    if (qrImage) {
      fd.append("qr_image", qrImage);
    }

    await saveMethod(
      fd,
      editingId
    );

    alert(
      editingId
        ? "Payment Method Updated Successfully"
        : "Payment Method Created Successfully"
    );

    resetForm();
    await loadMethods();

  } catch (error) {

    console.error(error);

    if (
      error.response?.data
    ) {
      console.log(
        error.response.data
      );
    }

    alert(
      "Failed to save payment method"
    );

  } finally {
    setLoading(false);
  }
};
  const resetForm = () => {
    setEditingId(null);
    setForm(initialState);
    setQrImage(null);
  };

  const editMethod = (method) => {
    setEditingId(method.id);

    setForm({
      title: method.title || "",
      payment_type: method.payment_type || "UPI",
      upi_id: method.upi_id || "",
      account_holder: method.account_holder || "",
      bank_name: method.bank_name || "",
      account_number: method.account_number || "",
      ifsc_code: method.ifsc_code || "",
      mobile_number: method.mobile_number || "",
      instructions: method.instructions || "",
    });
  };

  const removeMethod = async (id) => {
    if (!window.confirm("Delete payment method?")) return;

    try {
      await deleteMethod(id);
      loadMethods();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h1>Payment Management</h1>
      </div>

      <div className="payment-container">

        <div className="payment-card">

          <h3>
            {editingId
              ? "Update Payment Method"
              : "Create Payment Method"}
          </h3>

          <form
  className="payment-form"
  onSubmit={handleSubmit}
>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              required
            />

            <select
              value={form.payment_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  payment_type:
                    e.target.value,
                })
              }
            >
              <option value="UPI">UPI</option>
              <option value="QR">QR</option>
              <option value="BANK">BANK</option>
            </select>

            {(form.payment_type === "UPI" ||
              form.payment_type === "QR") && (
              <>
                <input
                  placeholder="UPI ID"
                  value={form.upi_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      upi_id:
                        e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Account Holder"
                  value={form.account_holder}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      account_holder:
                        e.target.value,
                    })
                  }
                />
              </>
            )}

            {form.payment_type ===
              "QR" && (
              <>
                <input
                  type="file"
                  onChange={(e) =>
                    setQrImage(
                      e.target.files[0]
                    )
                  }
                />

                {qrImage && (
                  <img
                    src={URL.createObjectURL(
                      qrImage
                    )}
                    alt=""
                    className="preview-img"
                  />
                )}
              </>
            )}

            {form.payment_type ===
              "BANK" && (
              <>
                <input
                  placeholder="Bank Name"
                  value={form.bank_name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      bank_name:
                        e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Account Number"
                  value={
                    form.account_number
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      account_number:
                        e.target.value,
                    })
                  }
                />

                <input
                  placeholder="IFSC"
                  value={form.ifsc_code}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ifsc_code:
                        e.target.value,
                    })
                  }
                />
              </>
            )}

            <input
              placeholder="Mobile Number"
              value={form.mobile_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile_number:
                    e.target.value,
                })
              }
            />

            <textarea
              placeholder="Instructions"
              value={form.instructions}
              onChange={(e) =>
                setForm({
                  ...form,
                  instructions:
                    e.target.value,
                })
              }
            />

            <div className="btn-group">
              <button
                type="submit"
                className="primary-btn"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update"
                  : "Create"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={
                    resetForm
                  }
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>

        <div className="table-card">

          <table className="payment-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Title</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {(methods || []).map((m) => (
                 <tr key={m.id}>
                  <td>{m.id}</td>

                  <td>
                    <span
                      className={`badge ${m.payment_type.toLowerCase()}`}
                    >
                      {m.payment_type}
                    </span>
                  </td>

                  <td>{m.title}</td>

                  <td>
                    {m.payment_type ===
                      "UPI" &&
                      m.upi_id}

                    {m.payment_type ===
                      "BANK" &&
                      m.account_number}

                    {m.payment_type ===
                      "QR" &&
                      "QR Uploaded"}
                  </td>

                  <td>
                    <button
                      className="action-btn edit-btn"
                      onClick={() =>
                        editMethod(m)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="action-btn delete-btn"
                      onClick={() =>
                        removeMethod(
                          m.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}