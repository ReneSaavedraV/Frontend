import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./assets/NewPangui.css";
import ImageMerger from "../ImageMerger.jsx";
import axios from "axios";

export default function NewPangui() {
    const [nombre, setNombre] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [panguiNumber, setPanguiNumber] = useState(1);
    const [backgroundNumber, setBackgroundNumber] = useState(1);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const texts = ["Cuida", "Ama", "Guía", "Alimenta", "Celebra", "Motiva"];

    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/session`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUserId(response.data.id);
        }
        catch (error) {
            console.error(error);
        }	
    }

    useEffect(() => {
        fetchUser();

        const panguiIntervalId = setInterval(() => {
            setPanguiNumber(Math.floor(Math.random() * 5) + 1);
        }, 6000);

        const backgroundIntervalId = setInterval(() => {
            setBackgroundNumber(Math.floor(Math.random() * 4) + 1);
        }, 6000);

        const textIntervalId = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000);

        return () => {
            clearInterval(panguiIntervalId);
            clearInterval(backgroundIntervalId);
            clearInterval(textIntervalId);
        };
    }, []);

    const getPanguiImageSource = () => {
        return "src/common/assets/img/panguis/pangui_1.png";
    };

    const getPanguiClothesImageSource = () => {
        return `src/common/assets/img/panguis/ropa_${panguiNumber}_1.png`;
    };

    const getBackgroundImageSource = () => {
        return `src/pangui/assets/img/backgrounds/background_${backgroundNumber}.png`;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault(); 
        handleSubmit(); 
      };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/pangui`,
                {
                    name: nombre,
                    panguiNumber: 1,
                    backgroundNumber: backgroundNumber
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            navigate("/panguilist");
        } catch (error) {
            setError("Error creando el pangui");
        }
    }
    
    
    return (
        <>
            <Image className="background" alt="background" src={getBackgroundImageSource()} />
            <Container className="form-page">
                <Row className="justify-content-center">
                    <Col className="col">
                        <div className="form-container" style={{background: "transparent", border: "0", padding: "0", width: "780px"}}>

                            <div className="imagetext-container">
                                <p className="newpangui-left-text">¡{texts[textIndex]} <br/> a Pangui!</p> 
                                <ImageMerger
                                    imageUrl1={getPanguiImageSource()}
                                    imageUrl2={getPanguiClothesImageSource()}
                                    alt="pangui"
                                />
                                <p className="newpangui-right-text">¡{texts[textIndex]} <br/> a Pangui!</p>
                            </div>

                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Control
                                    type="text"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="primary-button" style={{marginBottom: "8%"}}>
                                    Ingresar
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}