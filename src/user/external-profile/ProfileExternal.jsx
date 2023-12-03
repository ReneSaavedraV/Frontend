import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "../assets/profile.css";
import PetList from "../../pangui/pet-list/PetList";
import { avatarLoader, backgroundLoader } from "../avatar-loader";
import { Link } from 'react-router-dom';


const getUser = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
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
    const { id } = useParams();
    const { loggedUser } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser(id)
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
                console.log(new Date(response.data.createdAt).toDateString());
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {user && loggedUser && (
                <Container className="profile-container">
                    <span className="material-symbols-outlined profile-navigation">
                        emoji_events
                    </span>

                    <Link to="#" onClick={() => window.history.back()}>
                        <button className="return-button" style={{height: "50px", margin: "0", position: "absolute", top: "15%"}}>
                            <span class="material-symbols-outlined">
                                arrow_back
                            </span>
                        </button>
                    </Link>

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
                                Se unió el: <br />
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </Col>

                        <Col className="petlist-display" style={{marginLeft: "5%"}}>
                            <PetList ownsTheList={false} id={id} />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

