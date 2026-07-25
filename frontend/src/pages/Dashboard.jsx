import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.first_name}</h1>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

export default Dashboard;