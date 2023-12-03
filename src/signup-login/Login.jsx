import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import loginBackground from "../common/assets/img/commonbackground.jpg";
import { AuthContext } from "../auth/AuthContext";
import "./assets/Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({
        message: "",
        error: false,
    });
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userData = { email, password };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, userData);

            setMessage({
                message: response.data.message,
                error: false,
            });

            setToken(response.data.access_token);
            navigate("/profile");
            window.location.reload(); // Admin check aaaaaa
        } catch (error) {
            setMessage({
                message: "Credenciales Invalidas",
                error: true,
            });
        }
    };

    return (
        <>
            <Image className="background" alt="login background" src={loginBackground} />
            <Container className="form-page">
                <Row className="justify-content-center">
                    <Col className="col">
                        <div className="form-container">
                            <h1 className="head-login">Iniciar sesión</h1>
                            <Form>
                                <Form.Group controlId="formEmail">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button className="primary-button" type="button" onClick={handleLogin}>
                  Ingresar
                                </Button>
                            </Form>

                            <p className="text-login">
                ¿No tienes una cuenta? <Link to="/signup">Registrate</Link>
                            </p>

                            {message.message && (
                                <p style={{ color: message.error ? "red" : "black" }}>{message.message}</p>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
