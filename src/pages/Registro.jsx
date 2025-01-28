// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { fetchUsers, createUser } from "@/api/userService";

const RegistroPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    // Llamar a la API para obtener usuarios
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      alert("Usuario creado exitosamente");
      setNewUser({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div>
      <h1>Registro de Usuarios</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button type="submit">Registrar</button>
      </form>

      {/* Lista de usuarios */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RegistroPage;
