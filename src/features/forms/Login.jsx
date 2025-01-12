// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import senaLogo from "../../assets/logo_sena.png"; // Asegúrate de tener el logo en la carpeta assets
import "../../assets/css/login.css"; // Asegúrate de tener el archivo CSS en la carpeta assets

const Login = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedUser && password) {
      // Lógica de autenticación
      console.log("Usuario:", selectedUser);
      console.log("Contraseña:", password);
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={senaLogo} alt="Logo SENA" className="sena-logo" />
        <h2>Inicio de Sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="user">Selecciona la sede:</label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="La Ceja">La Ceja</option>
              <option value="Zona Franca">Zona Franca</option>
              <option value="Comercio">Comercio</option>
              <option value="Turismo">Turismo</option>
              <option value="Administración">Administración</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="forgot-password">
          <a href="/recuperar-contraseña">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
