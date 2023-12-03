import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./assets/profile.css";
import PetList from "../pangui/pet-list/PetList";
import { avatarLoader, backgroundLoader } from "./avatar-loader";

const getUser = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/session`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export default function Profile() {
    const navigate = useNavigate();
    const { loggedUser } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser()
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
                console.log(new Date(response.data.createdAt).toDateString());
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const editUser = async (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    return (
        <>
            {user && loggedUser && (
                <Container className="profile-container">
                    <span className="material-symbols-outlined profile-navigation">
                        emoji_events
                    </span>
                    <Image className="background" alt="profile background"
                        src={backgroundLoader(user.backgroundId)}
                    />
                    <Row className="profile-container">
                        <Col className="user-profile-info">
                            <Image alt="Foto de perfil"
                                src={avatarLoader(user.avatarId)}
                            />
                            <p>{user.username}</p>
                            <p>
                                Te uniste el: <br />
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
              
                            <button type="button" className="edit-button" onClick={() => editUser(user.id)}>
                                Editar usuario
                            </button>
                        </Col>

                        <Col className="petlist-display" style={{marginLeft: "5%"}}>
                            <PetList />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

