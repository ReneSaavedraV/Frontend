import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./assets/NewCaretaker.css";
import { Link } from 'react-router-dom';
import axios from "axios";

import { backgroundUrls, avatarUrls} from "./avatar-loader.js";

export default function NewCaretaker() {
    const [email, setEmail] = useState("");
    const [pangui, setPangui] = useState(null);
    const {id} = useParams();
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [searchedUser, setSearchedUser] = useState(null);

    const navigate = useNavigate();

    const fetchPangui = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pangui/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response.data)
            setPangui(response.data);
        }
        catch (error) {
            console.error(error);
        }	
    }

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
        fetchPangui();

        return () => {
        };
    }, []);

    
    const handleClickSearch = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/users/mail/${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setSearchedUser(response.data);
            setError(null);
        } catch (error) {
            setError("No hay resultados");
        }
    }

    const handleClickAdd = async () => {
        if (!user) return;

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/pangui/${id}/caretakers`,
                {
                    friendId: searchedUser.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            navigate(`/panguipet/${id}`);
        } catch (error) {
            console.log(error);
        }
    }
    
    const playShake = () => {
        const element = document.querySelector(".primary-button");
        element.classList.add("shake");
        setTimeout(() => {
            element.classList.remove("shake");
        }, 1000);
    }
    
    return (
        <>        
            <Image className="background" alt="background" src={backgroundUrls[pangui?.backgroundNumber]} />

            <Container className="form-page">
                <Row className="justify-content-center">
                    <Col className="col">
                        <div className="no-shadow-form-container" >

                            <div >
                                <Image className="user-image" alt="user-image" src={avatarUrls[
                                    searchedUser ? searchedUser.avatarId : 0
                                ]} />
                            </div>

                            <div className="user-info">
                                <p>{searchedUser ? searchedUser.username : "-"}</p>
                            </div>

                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email del Usuario"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="button" className="primary-button" style={{marginBottom: "8%"}} onClick={handleClickSearch}>
                                    Buscar
                                </Button>
                                <Button variant="primary" type="button" className="primary-button" style={{marginBottom: "8%", marginTop: "0%"}} onClick={(searchedUser ? handleClickAdd : playShake)}>
                                    {error || (searchedUser ? "Agregar" : "-")}
                                </Button>

                                <Link to="#" onClick={() => window.history.back()}>
                                    <button className="return-button" style={{width: "100%"}}>
                                        Volver
                                    </button>
                                </Link>

                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}