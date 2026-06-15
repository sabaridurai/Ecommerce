import { useSelector } from "react-redux";

function Payments() {
  const payments = useSelector(state => state.payments.list);

  return (
    <div>
      <h2>Payments</h2>

      {payments.map(p => (
        <div key={p.id}>
          {p.amount} - {p.status}
        </div>
      ))}
    </div>
  );
}

export default Payments;