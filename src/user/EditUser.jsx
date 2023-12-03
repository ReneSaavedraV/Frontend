import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./assets/editUser.css";
import loginBackground from "../common/assets/img/commonbackground.jpg";
import { backgroundLoader, avatarLoader, backgroundUrls, avatarUrls} from "./avatar-loader";
import Profile from "./Profile";

export default function EditUser() {
    const [userData, setUserData] = useState({});
    const [newUsername, setNewUsername] = useState("");
    const [error, setError] = useState("");
    
    const [showAvatarSelect, setShowAvatarSelect] = useState(false);
    const [showBackgroundSelect, setShowBackgroundSelect] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedBackground, setSelectedBackground] = useState(null)

    const handleAvatarClick = (index) => {
        setSelectedAvatar(index);
    };

    const handleBackgroundClick = (index) => {
        setSelectedBackground(index);
    };

    const handleToggleAvatarSelect = (item) => {
        setSelectedAvatar(userData.avatarId)
        setShowAvatarSelect(!showAvatarSelect);
    };

    const handleToggleBackgroundSelect = (item) => {
        setSelectedBackground(userData.backgroundId)
        setShowBackgroundSelect(!showBackgroundSelect);
    };
    
    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
      };

    const changeAvatarId = () => {
        if (selectedAvatar !== null && userData.id !== null) {
            axios
                .patch(
                    `${import.meta.env.VITE_BACKEND_URL}/users/${userData.id}`,
                    {
                        avatarId: selectedAvatar,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((response) => {
                    setError("Avatar cambiado con éxito");
                    setUserData(response.data);
                    document.getElementById("error-message").style.color = "green";
                })
                .catch((error) => {
                    console.log(error);
                    setError("Error actualizando el avatar");
                    document.getElementById("error-message").style.color = "red";
                });
        }

        setShowAvatarSelect(false);
    };

    const changebackgroundId = () => {
        if (selectedBackground !== null && userData.id !== null) {
            axios
                .patch(
                    `${import.meta.env.VITE_BACKEND_URL}/users/${userData.id}`,
                    {
                        backgroundId: selectedBackground,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((response) => {
                    setError("Fondo cambiado con éxito");
                    setUserData(response.data);
                    document.getElementById("error-message").style.color = "green";
                })
                .catch((error) => {
                    console.log(error);
                    setError("Error actualizando el fondo");
                    document.getElementById("error-message").style.color = "red";
                });
        }

        setShowBackgroundSelect(false);
    };

    useEffect(() => {
        const id = window.location.pathname.split("/")[2];
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setUserData(response.data);
            })
            .catch(() => {
                setError("Error obteniendo la información del usuario");
            });
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Add validation logic for newUsername and password confirmation
        if (newUsername === userData.username) {
            setError("El nombre debe ser diferente.");
            document.getElementById("error-message").style.color = "red";
            return;
        }

        const id = window.location.pathname.split("/")[2];
        axios
            .patch(
                `${import.meta.env.VITE_BACKEND_URL}/users/${id}`,
                {
                    username: newUsername,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((response) => {
                setError("Nombre cambiado con éxito");
                setUserData(response.data);
                document.getElementById("error-message").style.color = "green";
            })
            .catch((error) => {
                console.log(error);
                setError("Error actualizando el nombre");
                document.getElementById("error-message").style.color = "red";
            });
    };

    return (
        <>
            <Image className="background" alt="login background" src={loginBackground} />
            <Container className="form-page"> 
                <Row className="justify-content-center">
                    <Col className="edituser-col">
                        <div className="form-container">
                            <h2 style={{fontSize: "2.5em"}}>Editar usuario</h2>

                            <div className="edit-user-imgs">
                                <Image onClick={() => handleToggleAvatarSelect()}
                                    alt="profile picture"
                                    src={avatarLoader(userData.avatarId)}
                                    className="profile-picture"
                                />

                                <Image onClick={() => handleToggleBackgroundSelect()}
                                    alt="background picture"
                                    src={backgroundLoader(userData.backgroundId)}
                                    className="profile-picture"
                                />
                            </div>

                            <p><b>Username:</b> {userData.username}</p>
                            <p><b>Email:</b> {userData.email}</p>
                            
                            <Form onSubmit={handleFormSubmit} className="edit-form">
                                <Form.Group controlId="formNewUsername">
                                    <Form.Control
                                        type="text"
                                        placeholder="Nuevo username"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <button type="button submit" className="edit-button" style={{marginTop: "0%"}}>
                                    Actualizar username
                                </button>
                                <div className="error" id="error-message">
                                    {error}
                                </div>
                            </Form>
                            <Link to="/profile">
                                <button type="button submit" className="return-button">
                                    Volver
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>

                <Modal className="modal-container" show={showAvatarSelect} onHide={handleToggleAvatarSelect}> {/* Dejarlo como componente aparte (?) quedó muy largo */}

                    <Modal.Header closeButton>
                        <p className="h3 avatar-selector-header-title">Cambiar avatar</p>
                    </Modal.Header>

                    <Modal.Body className="edit-user-popup-container">

                        <Form.Group className="edit-user-popup-container">
                            <div className="avatar-selector-current">
                                <Image
                                    alt="profile picture (placeholder)"
                                    src= {avatarUrls[selectedAvatar]}
                                />
                            </div>

                            <div className="avatar-selector-list">
                                {avatarUrls.map((url, index) => (
                                    <div key={index} 
                                        className={`avatar-selector-item ${selectedAvatar === index ? "selected" : ""}`}
                                        onClick={() => handleAvatarClick(index)}>

                                        <Image alt={`profile picture ${index + 1}`} src={url} />

                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer style={{justifyContent: "center"}}>
                        <button className="return-button" style={{padding: "6px 12px"}} onClick={handleToggleAvatarSelect}>
                            Volver
                        </button>

                        <Button variant="success" onClick={changeAvatarId}>
                            Confirmar selección
                        </Button>
                    </Modal.Footer>

                </Modal>

                <Modal className="modal-container" show={showBackgroundSelect} onHide={handleToggleBackgroundSelect}> {/* Dejarlo como componente aparte (?) quedó muy largo */}

                    <Modal.Header closeButton>
                        <p className="h3 avatar-selector-header-title">Cambiar fondo del perfil</p>
                    </Modal.Header>

                    <Modal.Body className="edit-user-popup-container" style={{width: "900px"}}>

                        <Form.Group className="edit-user-popup-container" style={{width: "100%"}}>
                            <div className="avatar-selector-current">
                                <div className="mini-profile-container">
                                    <Image
                                        alt="background picture"
                                        src={backgroundUrls[selectedBackground]}
                                    />
                                    <button className="return-button" onClick={handleToggleVisibility}>
                                        {isVisible ? 
                                        <span className="material-symbols-outlined">visibility</span> 
                                        : 
                                        <span className="material-symbols-outlined">visibility_off</span>}
                                    </button>
                                    {isVisible && <Profile />}
                                </div>
                            </div>

                            <div className="avatar-selector-list">
                                {backgroundUrls.map((url, index) => (
                                    <div key={index} 
                                        className={`avatar-selector-item ${selectedBackground === index ? "selected" : ""}`}
                                        style={{width: "90%"}}
                                        onClick={() => handleBackgroundClick(index)}>

                                        <Image alt={`background picture ${index + 1}`} src={url} />

                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer style={{justifyContent: "center"}}>
                        <button className="return-button" style={{padding: "6px 12px"}} onClick={handleToggleBackgroundSelect}>
                            Volver
                        </button>

                        <Button variant="success" onClick={changebackgroundId}>
                            Confirmar selección
                        </Button>
                    </Modal.Footer>

                </Modal>

            </Container>
        </>
    );
}