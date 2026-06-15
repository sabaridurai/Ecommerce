import Sidebar from "../layout/Sidebar";

function Dashboard() {

   
  console.log("Dashboard loaded");
  return (
    <div style={{ display: "flex" }}>
      {/* <Sidebar /> */}

      <div style={{ padding: 20 }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome to control center</p>
      </div>
    </div>
  );
}

export default Dashboard;