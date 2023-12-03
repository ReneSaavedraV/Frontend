import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup"
import "./assets/Tienda.css";
import axios from "axios";
import shop_background from "./assets/img/tienda/shopbackground.jpg"
import coin from "../common/assets/img/PanguiCoin.png"

export default function Tienda({selectedId = null, panguiClothes = [], PanguiCoins, updatePanguiCoins, userId}) {

  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState("Calculating...");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [panguiList, setPanguiList] = useState([]);
  const [desiredPangui, setDesiredPangui] = useState(selectedId);
  const [showPanguiList, setShowPanguiList] = useState(true)

  const itemsList = items.filter((item) => item.tipo !== "ropa");
  const clothesList = items.filter(item => 
    item.tipo === "ropa" && !panguiClothes.includes(item.ropaUrl)
  );

  const [isVisible, setIsVisible] = useState(true);

  const fetchPanguiCoins = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/session`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });

      return response
    } catch (error) {
      console.error(error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/items`);

      return response
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleVisibilityItems = () => {
    setIsVisible(true);
  };

  const handleToggleVisibilityClothes = () => {
    setIsVisible(false)
  }

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setError(null);
    setQuantity(1)
  };

  const fetchPanguiList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pangui/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      return response
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (selectedItem, quantity, pangui) => {
    try {

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/objects`, {
        cantidad: quantity,
        nombre: selectedItem.nombre,
        price: selectedItem.price * quantity,
        tipo: selectedItem.tipo,
        description: selectedItem.description,
        imageUrl: selectedItem.imageUrl,
        stat_boost: selectedItem.statBoost,
        panguiId: desiredPangui,
        userId: userId,
        ropaUrl: selectedItem.ropaUrl,
      });
      console.log(response.data);

      fetchPanguiCoins()
        .then((response) => {
          updatePanguiCoins(response.data.currency)
      });
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchItems()
      .then((response) => {
        setItems(response.data);
    });

    fetchPanguiList().then((response) => {
      setPanguiList(response.data);
      if (desiredPangui === null && response.data.length > 0) {
        setDesiredPangui(response.data[0].id);  
      } else {
        setShowPanguiList(false)
      }
    });

    const calculateTimeLeft = () => {
      const now = new Date();
      const next9AM = new Date(now);
      next9AM.setDate(now.getDate() + (now.getHours() >= 9 ? 1 : 0));
      next9AM.setHours(9, 0, 0, 0);
      const diffInSeconds = Math.floor((next9AM - now) / 1000);
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    };

    setTimeLeft(calculateTimeLeft());

    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const base_url = "/src/common/assets/img/items/";
  return (
    <Container>
      <Image className="background" alt="shop" src={shop_background} />
      <h1 className="store-title"> 
        <div className="shop-categories">    
          <button className="return-button" onClick={handleToggleVisibilityItems} style={{marginRight: "1%"}}>
              <span className="material-symbols-outlined">
                lunch_dining
              </span> 
          </button>
          <button className="return-button" onClick={handleToggleVisibilityClothes}>
              <span className="material-symbols-outlined">
                apparel
              </span>
          </button>
        </div> 
        PanguiStore
      </h1>
      <p className="store-reset-text">Nuevo stock en {timeLeft}</p>
      <Row className="money-box">
        <Col>
          <Image className="money-icon" src={coin} alt="PanguiCoin" />
        </Col>
        <Col>
          <span className="money-count">{PanguiCoins}</span>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <div className="shop-container">
          {isVisible?
          <>
            {itemsList.map((item, index) => (
              <Col key={index} className="col">
                <div className="shop-item" onClick={() => handleItemClick(item)}>
                  <span className="shop-item-name">{item.nombre}</span>
                  <Image src={base_url + item.imageUrl} alt={item.nombre} />
                  <Col className="price">
                    <Image alt="PanguiCoin" src={coin} />
                    <span className="coin-count">{item.price}</span>
                  </Col>
                  <button className="buy-button primary-button">Comprar</button>
                </div>
              </Col>
            ))}
          </>
          :
          <>
            {clothesList.map((item, index) => (
              <Col key={index} className="col">
                <div className="shop-item" onClick={() => handleItemClick(item)}>
                  <span className="shop-item-name">{item.nombre}</span>
                  <Image src={base_url + item.imageUrl} alt={item.nombre} />
                  <Col className="price">
                    <Image alt="PanguiCoin" src={coin} />
                    <span className="coin-count">{item.price}</span>
                  </Col>
                  <button className="buy-button primary-button">Comprar</button>
                </div>
              </Col>
            ))}
          </>
          }

        </div>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}> {/* Dejarlo como componente aparte (?) quedó muy largo */}
        <Modal.Header closeButton>
          <p className="h3" style={{ margin: '0' }}>Confirma la cantidad de {selectedItem?.nombre}</p>
        </Modal.Header>
        <Modal.Body className="purchase-container">

          <div className="purchase-money-header">
            <p className="item-price">PanguiCoin</p>
          </div>

          <div className="purchase-item-info">

            <div className="purchase-info-left">
              <Image src={base_url + selectedItem?.imageUrl} alt={selectedItem?.nombre} />
              <div>
                <p className="item-name">{selectedItem?.nombre}</p>
              </div>
            </div>

            <div className="purchase-info-right price" style={{ margin: '0' }}>
              <Image alt="PanguiCoin" src={coin} />
              <span className="coin-count" style={{ color: 'black' }}>{selectedItem?.price}</span>
            </div>

          </div>

          <Form.Group className="purchase-container" controlId="quantity">

            <Form.Label className="formlabel-buy">Descripción:</Form.Label>
            <div className="purchase-item-description">
              <span>{selectedItem?.description}</span>
            </div>

            {showPanguiList && (
              <>
                <Form.Label className="formlabel-buy">Pangui:</Form.Label>
                <Form.Control className="purchase-form-center" as="select" onChange={(e) => setDesiredPangui(e.target.value)}>
                  {panguiList.map((pangui, index) => (
                    <option key={index} value={pangui.id}>{pangui.name}</option>
                  ))}
                </Form.Control>
              </>
            )}
            
            {selectedItem?.tipo !== "ropa" && (
              <>
                <Form.Label className="formlabel-buy">Cantidad:</Form.Label>
                <InputGroup className="input-quantity-buy purchase-form-center">
                  <Button variant="outline-secondary" onClick={handleDecrease}>-</Button>
                  <Form.Control type="number" min="1" value={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))} />
                  <Button variant="outline-secondary" onClick={handleIncrease}>+</Button>
                </InputGroup>
              </>
            )}

            <div className="purchase-price">
                Total:&nbsp;
                <Image alt="PanguiCoin" src={coin} />
                {selectedItem && <span className="coin-count">{selectedItem.price * quantity}</span>}
            </div>

          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          {panguiList.length > 0 ? (
            <Button variant="success" onClick={() => handleBuy(selectedItem, quantity, desiredPangui)}>
              Confirmar Compra
            </Button>
          ) : (
            <p>¡Necesitas un Pangui para comprar objetos!</p>
          )}

        {error && (
                <p style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: error }}></p>
            )}

        </Modal.Footer>

      </Modal>

    </Container>
  );
}