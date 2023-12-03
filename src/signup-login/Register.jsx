import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import loginBackground from "../common/assets/img/commonbackground.jpg";
import "./assets/Login.css"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
            const userData = {
                email,
                password,
                username,
            };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, userData);

            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            const errors = error.response.data.errors.join("<br />");
            setErrors(errors);
        }
    };

    return (
        <>
            <Image className="background" alt="register background" src={loginBackground}/>
            <Container className="form-page">
                <Row className="justify-content-center">
                    <Col className="col">
                        <div className="form-container">
                            <h1>Registrarse</h1>
                            <Form>
                                <Form.Group controlId="formEmail">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formUsername">
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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

                                <Button className="primary-button" variant="primary" type="button" onClick={handleRegistration}>
                    Registrarse
                                </Button>
                            </Form>

                            <p className="text-login">
                ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
                            </p>

                            {errors && (
                                <p style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: errors }}></p>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}