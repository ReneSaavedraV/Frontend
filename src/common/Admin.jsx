import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Background from "../common/assets/img/commonbackground.jpg";
import Image from "react-bootstrap/Image";

export default function Admin() {
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState(null);


  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/session`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }	
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsersList(response.data); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchUsers();
  }, []);

  return (
    <>
    <Image className="background" alt="register background" src={Background}/>
    <div className="container bg-dark text-white mt-5 p-4 rounded">
      <h1 className="text-center mb-4">Página de Admin</h1>
      {user && user.admin === 1 && (
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Acciones</th>
              <th>Perfil de Usuario</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
                <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    {user.admin !== 1 && (
                    <button 
                        className="btn btn-danger" 
                        onClick={() => handleDelete(user.id)}
                    >
                        Eliminar
                    </button>
                    )}
                </td>
                <td>
                    <Link to={`/profile/${user.id}`} className="btn btn-primary">Ver Perfil</Link>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      )}
    </div>
    </>
  );
}