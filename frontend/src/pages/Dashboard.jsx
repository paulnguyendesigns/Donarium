import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.first_name}</h1>
      <p>Role: {user?.role}</p>
      <Link to="/requests">View Requests</Link>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default Dashboard;