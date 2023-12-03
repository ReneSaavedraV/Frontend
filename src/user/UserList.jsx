/* eslint-disable */

/* COMPLETAR */

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [token] = useContext(AuthContext);
    const [error, setError] = useState("");

    const getUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            setError("Error obteniendo la lista de usuarios");
        }
    }

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`);
            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            setError("Error deleting user.");
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <h1>
            Complete
        </h1>
    )
}

