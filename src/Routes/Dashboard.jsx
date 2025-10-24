import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container py-5">
      <div className="card shadow-sm rounded-3 p-4">
        <h3>Panel Principal</h3>
        <p className="text-muted">Bienvenido{user?.nombre ? `, ${user.nombre}` : ""} — aquí irá el contenido del dashboard.</p>

        <div className="mt-3">
          <p className="mb-1"><strong>Usuario (raw):</strong></p>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
