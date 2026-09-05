import Navbar from "./Navbar";

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">{children}</main>
    </div>
  );
}

export default AppLayout;