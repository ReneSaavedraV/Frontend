import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Link, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import appLogo from "./assets/img/pangui-logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/navbar.css";
import axios from "axios";

export default function PanguiNavbar() {
  const location = useLocation();
  const { loggedUser, logout } = useContext(AuthContext);
  const [activeLink, setActiveLink] = useState("");
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
    }
    catch (error) {
        console.error(error);
    }	
}
  useEffect(() => {
    fetchUser();
  }
  , []);


  useEffect(() => {
    const currentPath = location.pathname.substring(1);
    setActiveLink(currentPath);
  }, [location.pathname]);

  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand style={{width: "60%"}}>
        <Link className="home" to="/">
          <img alt="logo" src={appLogo} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav >
          {!loggedUser && (
            <>
              <Link to="/signup" className={`nav-link ${activeLink === "signup" ? "active" : ""}`}>
                Registrarse
              </Link>

              <Link to="/login" className={`nav-link ${activeLink === "login" ? "active" : ""}`}>
                Ingresar
              </Link>
            </>
          )}

          <Link to="/instructions" className={`nav-link ${activeLink === "instructions" ? "active" : ""}`}>
            Instrucciones
          </Link>

          {loggedUser && (
            <>
              <NavDropdown title="Usuario" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Perfil
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/achievement">
                  Logros
                </NavDropdown.Item>  
              </NavDropdown>

              <NavDropdown title="Pangui" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/panguilist">
                  Mis Panguis
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/newpangui">
                  Nuevo Pangui
                </NavDropdown.Item>
              </NavDropdown>

              <Link to="/chat" className={`nav-link ${activeLink === "chat" ? "active" : ""}`}>
                Chat
              </Link>
              
              {user && (user.admin === 1) && (
                <Link to="/admin" className={`nav-link ${activeLink === "admin" ? "active" : ""}`}>
                  Admin
                </Link>
              )}

              <Link to="/" className="nav-link" onClick={() => logout()}>
                Salir
              </Link>
            </>
          )}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
