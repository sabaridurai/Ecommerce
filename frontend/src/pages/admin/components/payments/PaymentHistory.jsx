import { useEffect, useState } from "react";

import {
  getPayments,
  approvePayment,
  rejectPayment,
} from "../services/paymentService";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const res = await getPayments();
    setPayments(res.data);
  };

  const approve = async (id) => {
    await approvePayment(id);
    loadPayments();
  };

  const reject = async (id) => {
    await rejectPayment(id);
    loadPayments();
  };

  return (
    <div className="container">
      <h2>Payment History</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Screenshot</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              <td>
                {p.customer_name}
              </td>

              <td>
                ₹{p.amount}
              </td>

              <td>
                <a
                  href={`http://127.0.0.1:8000${p.screenshot}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </td>

              <td>{p.status}</td>

              <td>
                <button
                  onClick={() =>
                    approve(p.id)
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    reject(p.id)
                  }
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}