import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    api
      .get("/health")
      .then((response) => setStatus(response.data.status))
      .catch(() => setStatus("backend unreachable"));
  }, []);

  return (
    <div>
      <h1>Donarium</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;