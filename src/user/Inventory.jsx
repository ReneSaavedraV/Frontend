import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import "./assets/inventory.css";
import background from "../common/assets/img/commonbackground.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

export default function Inventory() {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [user, setUser] = useState(null);
    const [pangui, setPangui] = useState(null);

    const { id } = useParams();

    const fetchInventory = async (id) => {
        try {
            localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/objects/${id}`);
            console.log(response.data);
  
            setInventory(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPangui = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pangui/${id}`);
            console.log(response.data);
            setPangui(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleItemUse = async (item) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/objetos/${item.id}/usar`);
            console.log(response.data);
            handleCloseModal();
      
        } catch (error) {
            console.error(error);
        }
    };

    const handleItemUseQuitar = async (item) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/objetos/${item.id}/quitar`);
            console.log(response.data);
            handleCloseModal();
            fetchPangui(id);
      
        } catch (error) {
            console.error(error);
        }
    }

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };
  
    useEffect(() => {
        console.log("useEffect");
        getUser()
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
                console.log(new Date(response.data.createdAt).toDateString());
                fetchPangui(id);
                fetchInventory(id);
            })
            .catch((error) => {
                console.log(error);
            }); 
    }, []);

    const base_url = "/src/common/assets/img/items/";

    return (
        <>
            <Image className="background" alt="profile background" src={background} />
            <Container>
                <div style={{position: "absolute", top: "95px"}}>
                    <Link to={`/panguipet/${id}`}>
                        <button className="primary-button top-left-button">Volver</button>
                    </Link>
                </div>
                <Row className="justify-content-center mt-4">
                    <Col>
                        <h1 className="inventory-title">Inventario de Pangui</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <div className="inventory-container">
                        {inventory.map((item, index) => (
                            <Col key={index} className="col">
                                <div className="inventory-item" onClick={() => handleItemClick(item)}>
                                    <Image src={base_url + item.imageUrl} alt={item.nombre} />
                                    <div className="item-quantity">
                                        <p>x{item.cantidad}</p>
                                    </div>
                                    <div className="item-details">
                                        <p>{item.nombre}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </div>
                </Row>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header style={{border: "none"}} closeButton>
                        <p className="h2" style={{margin: "0"}}>{selectedItem?.nombre}</p>
                    </Modal.Header>
                    <Modal.Body className="item-popup-image">
                        <Image src={base_url + selectedItem?.imageUrl} alt={selectedItem?.nombre} />
                    </Modal.Body>
                    <Modal.Footer className="item-popup-description">
                        <p>{selectedItem?.description}</p>
                    </Modal.Footer>
              
                    <Modal.Footer className="item-popup-footer">
                        {pangui && selectedItem?.tipo === "ropa" ? (
                            selectedItem?.ropaUrl === pangui?.ropa ? (
                                <>
                                    <p>Ropa en Uso</p>
                                    <button className="item-popup-button" onClick={() => handleItemUseQuitar(selectedItem)}>
                    Quitar
                                    </button> 
                                </>
                

                            ) : (
                                <button className="item-popup-button" onClick={() => handleItemUse(selectedItem)}>
                  Usar
                                </button>
                            )
                        ) : null}
                    </Modal.Footer>


                </Modal>
        
            </Container>
        </>
    );
}