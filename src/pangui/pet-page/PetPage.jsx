import "./assets/petpage.css"
import "./assets/popups.css"
import {createContext, useEffect, useState} from "react"
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios"

import MainUI from "./MainUI"
import Chat from "/src/app/Chat.jsx"
import Shop from "/src/app/Tienda.jsx"

import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";  
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Offcanvas from "react-bootstrap/Offcanvas";

import coin from "/src/common/assets/img/PanguiCoin.png"
import { backgroundLoader, avatarLoader, backgroundUrls, avatarUrls} from "/src/user/avatar-loader.js";

export const PetContext = createContext(null);

export default function PetPage() {
    const [pangui, setPangui] = useState();
    const [stats, setStats] = useState();
    const[images, setImages] = useState({
        pangui: "/src/common/assets/img/panguis/pangui_1.png",
        panguiClothes: "/src/common/assets/img/panguis/ropa_1_1.png",
        background: "/src/pangui/assets/img/backgrounds/background_0.png",
    });
    const { id } = useParams();
    const [caretakers, setCaretakers] = useState(null);
    const [userId, setUserId] = useState(null)
    const [selectedBackground, setSelectedBackground] = useState(null)
    const [showBackgroundSelect, setShowBackgroundSelect] = useState(false);
    const [clothesSelect, setShowClothesSelect] = useState(false);
    const [itemsSelect, setShowItemsSelect] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [inventory, setInventory] = useState([]);
    const [selectedCloth, setselectedCloth] = useState(null);
    const [selectedItem, setselectedItem] = useState(null);
    const [usedItem, setUsedItem] = useState(false)
    const [error, setError] = useState("");
    const [PanguiCoins, setPanguiCoins] = useState(0);

    const navigate = useNavigate();

    const itemsList = inventory.filter((item) => item.tipo !== "ropa")
        .sort((a, b) => a.id - b.id);
    const clothesList = inventory.filter((item) => item.tipo == "ropa");

    const handleAddCaretakers = () => {
        navigate(`/add-caretaker/${id}`)
    }
    
    const handleToggleBackgroundSelect = (item) => {
        setSelectedBackground(pangui.backgroundNumber)
        setShowBackgroundSelect(!showBackgroundSelect);
    };

    const handleToggleClothesSelect = () => {
        setselectedItem(null)
        setShowClothesSelect(!clothesSelect);
    };

    const handleToggleItemsSelect = () => {
        setselectedItem(null);
        setError(null);
        setShowItemsSelect(!itemsSelect);
    };

    const handleToggleChat = (item) => {
        setShowChat(!showChat);
    };

    const handleToggleShop = (item) => {
        setShowShop(!showShop);
        fetchInventory();
    };

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleBackgroundClick = (index) => {
        setSelectedBackground(index);
    };

    const animateItemSelect = (index) => {
        setError(null);
        setselectedItem(index);
    };

    const animateItemUse = () => {
        setUsedItem(true);

        setTimeout(() => {
            setUsedItem(false);
          }, 1000); // Ajusta el tiempo según tus necesidades
    }

    const handleClothClick = (index) => {
        animateItemUse();

        setselectedCloth(index);
        const object = clothesList[index];
        axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/objects/${object.id}`,
            {
                panguiId: pangui.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((response) => {
                setPangui(response.data);
                fetchInventory();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const animateItem = (index) => {
        setselectedItem(index);
    };

    const handleItemClick = (index) => {
        animateItemUse();

        const object = itemsList[index];
        axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/objects/${object.id}`,
            {
                panguiId: pangui.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((response) => {
                setPangui(response.data);
                fetchInventory();
            })
            .catch((error) => {
                console.log(error);
                setError(error.response.data.message);
            });
    };

    const handleCaretakerClick = (e) => {
        const userId = e.target.id

        navigate(`/profile/${userId}`)
    };

    const changebackgroundId = () => { 
        if (selectedBackground !== null && id !== null) {
            axios
                .patch(
                    `${import.meta.env.VITE_BACKEND_URL}/pangui/${id}`,
                    {
                        backgroundNumber: selectedBackground,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((response) => {
                    setPangui(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        setShowBackgroundSelect(false);
    };

    const updatePanguiCoins = (newCoins) => {
        setPanguiCoins(newCoins);
    };
    
    // TODO: Si el usuario no está logeado o no es el Pangui del usuario, redirigir a la página de inicio.

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

    const fetchInventory = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/objects/${id}`);
  
            setInventory(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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

    const fetchCaretakers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pangui/${id}/caretakers`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCaretakers(response.data.caretakers);
            console.log(caretakers)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPanguiCoins()
            .then((response) => {     
                setPanguiCoins(response.data.currency);
                setUserId(response.data.id);
            });
    }, []);

    useEffect(() => {
        fetchPangui();
        fetchInventory();
        fetchCaretakers();
    }
    , []);

    useEffect(() => {
        if (pangui) {
            setselectedCloth(pangui.panguiNumber)
            // TODO: Update the status sprite of the pangui, not just the clothing.
            setImages({
                pangui: "/src/common/assets/img/panguis/pangui_1.png",
                panguiClothes: `/src/common/assets/img/panguis/ropa_${pangui?.panguiNumber}_1.png`,
                background: `/src/pangui/assets/img/backgrounds/background_${pangui?.backgroundNumber}.png`,
            });
        }
    }
    , [pangui]);

    const base_url = "/src/common/assets/img/items/";
    return(
        <>
            {pangui && (
                <PetContext.Provider
                    value={{
                        pangui,
                        setPangui,
                    }}
                >
                    <div className="pet-page">
                        <Image className="petpage-background" 
                            alt="(background image)" 
                            src={images.background}
                        />

                        <div className="button-container">
                            <Link to="/panguilist" style={{marginTop: "0"}}>
                                <button className="primary-button top-left-button">
                                    <span class="material-symbols-outlined">
                                        arrow_back
                                    </span>
                                </button>
                            </Link>
                        </div>

                        <div className="button-container" style={{justifyContent: "center"}}>
                            <Row className="money-box" style={{position: "unset"}}>
                                <Col>
                                    <Image className="money-icon" style={{animation: "2.5s linear infinite spin-2"}} src={coin} alt="PanguiCoin" />
                                </Col>
                                <Col>
                                    <span className="money-count">
                                        {PanguiCoins}
                                    </span>
                                </Col>
                            </Row>
                        </div>

                        <Accordion className="caretakers-container" defaultActiveKey={["0"]} alwaysOpen style={{ width: "auto" }}>
                            <Accordion.Item eventKey="0" style={{ border: "transparent", background: "transparent" }}>
                                <Accordion.Header>Cuidadores</Accordion.Header>
                                <Accordion.Body style={{ padding: "0" }}>
                                    {caretakers?.map((user, index) => ( 
                                        <div className="caretakers-body-container" key={user.id}> 
                                            <OverlayTrigger
                                                key={"right-"+user.username}
                                                placement="right"
                                                overlay={
                                                    <Popover id={"popover-positioned-right"}>
                                                        <Popover.Header as="h3">{user.username}</Popover.Header>
                                                        <Popover.Body>
                                                            <strong>Click para visitar el perfil</strong>
                                                        </Popover.Body>
                                                    </Popover>}
                                            >
                                                <Image 
                                                    alt="profile picture"
                                                    onClick={handleCaretakerClick}
                                                    id={user.id}
                                                    src={avatarLoader(user.avatarId)}
                                                    className="profile-picture"
                                                />
                                            </OverlayTrigger>
                                        </div>
                                    ))}
                                    <div style={{ "display": "flex", "flexDirection": "column" }}>
                                        <button className="primary-button top-left-button" onClick={handleAddCaretakers}>
                                            <span class="material-symbols-outlined">
                                                add
                                            </span>
                                        </button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <MainUI
                            panguiName={pangui?.name} 
                            panguiBase={images?.pangui} 
                            panguiRopa={images?.panguiClothes}
                            currentCurrency={PanguiCoins}
                            userId={userId}
                            updatePanguiCoins={updatePanguiCoins}
                        />
                        <div className="button-container" style={{justifyContent: "flex-end"}}>
                            <button className="primary-button top-left-button" onClick={handleToggleShop} style={{marginRight: "20px"}}  >
                                <span class="material-symbols-outlined">
                                    shopping_cart
                                </span>
                            </button>
                    
                            <button className="primary-button top-left-button" onClick={handleToggleItemsSelect}>
                                <span class="material-symbols-outlined">
                                    nutrition
                                </span>
                            </button>
                        </div>

                        <div className="button-container-bottom" style={{justifyContent: "flex-start"}}>
                            <button className="primary-button top-left-button" onClick={handleToggleChat}>
                                <span class="material-symbols-outlined">
                                    chat
                                </span>
                            </button>
                        </div>

                        <div className="button-container-bottom">
                            <button className="primary-button top-left-button" onClick={handleToggleBackgroundSelect} style={{marginRight: "20px"}}>
                                <span class="material-symbols-outlined">
                                    wallpaper
                                </span>
                            </button>

                            <button className="primary-button top-left-button" onClick={handleToggleClothesSelect}>
                                <span class="material-symbols-outlined">
                                    styler
                                </span>
                            </button>
                        </div>

                        {/* Dejar Pop-ups como componente aparte ? */}

                        <Modal className="modal-container-chat" show={showChat} onHide={handleToggleChat}>
                            {pangui && pangui.id !== undefined ?
                                <Chat selectedPangui={pangui.id} /> : <></>
                            }
                        </Modal>

                        <Modal className="modal-container-shop" show={showShop} onHide={handleToggleShop}>
                            <Shop 
                                selectedId={id} 
                                panguiClothes={clothesList.map(item => item.ropaUrl)}
                                PanguiCoins={PanguiCoins} 
                                updatePanguiCoins={updatePanguiCoins} 
                                userId={userId}>
                            </Shop>
                        </Modal>

                        <Modal className="modal-container" show={showBackgroundSelect} onHide={handleToggleBackgroundSelect}> {/* Dejarlo como componente aparte (?) quedó muy largo */}

                            <Modal.Header closeButton>
                                <p className="h3 avatar-selector-header-title">Cambiar fondo de {pangui?.name}</p>
                            </Modal.Header>

                            <Modal.Body className="edit-user-popup-container" style={{width: "900px"}}>

                                <Form.Group className="edit-user-popup-container" style={{width: "100%"}}>
                                    <div className="avatar-selector-current">
                                        <div className="mini-mainui-container">
                                            <Image
                                                alt="background picture"
                                                src={backgroundUrls[selectedBackground]}
                                            />
                                            <button className="return-button" onClick={handleToggleVisibility}>
                                                {isVisible ? <span className="material-icons">visibility</span> : <span className="material-icons">visibility_off</span>}
                                            </button>
                                            {isVisible && <MainUI
                                                panguiName={pangui?.name} panguiBase={images?.pangui} panguiRopa={images?.panguiClothes}
                                            />}
                                        </div>
                                    </div>

                                    <div className="avatar-selector-list">
                                        {backgroundUrls.map((url, index) => (
                                            <div key={"avatar-"+index} 
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

                    <Offcanvas show={clothesSelect} onHide={handleToggleClothesSelect} key="clothes-select" placement="end" name="end">

                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Elige la ropa de {pangui?.name}</Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>

                        {clothesList.map((cloth, index) => (

                            <OverlayTrigger
                            trigger={"click"}
                            key={"left-cloth-"+index}
                            placement="left"
                            rootClose={true}
                            overlay={
                                <Popover className="popover-item" id={`cloth-popup`}>
                                    <Popover.Header as="h3">
                                        {cloth.nombre} {pangui.panguiNumber == clothesList[index].ropaUrl && '(En uso)'}
                                    </Popover.Header>
                                    <Popover.Body>
                                        <p>{cloth.description}</p>
                                    </Popover.Body>
                                    <div className="popover-footer">
                                        <Button 
                                            type="button" 
                                            variant="success" 
                                            onClick={() => handleClothClick(index)}
                                        >
                                            {pangui?.panguiNumber == clothesList[index].ropaUrl ? 'Quitar Ropa' : 'Equipar ropa'}
                                        </Button>
                                    </div>
                                </Popover>}
                            >
                                <Col key={"cloth+"-index} className="col">
                                    <div 
                                    className={`inventory-item ${pangui.panguiNumber == clothesList[index].ropaUrl ? "selected" : "" || (selectedItem === index) ? "selected" : ""} ${usedItem === true && selectedItem === index ? "used" : ""}`}
                                    style={{ height: "100%" }}
                                    onClick={() => animateItemSelect(index)}
                                    >
                                        <Image src={base_url + cloth.imageUrl} alt={cloth.nombre} style={{width: "100%"}}/>
                                        <div className="item-details">
                                            <p style={{textAlign: "center"}}>{cloth.nombre}</p>
                                        </div>
                                    </div>
                                </Col>
                            </OverlayTrigger>
                        ))}
                        </Offcanvas.Body>
                    </Offcanvas>

                    <Offcanvas show={itemsSelect} onHide={handleToggleItemsSelect} key="items-select" placement="end" name="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Objetos de {pangui?.name}</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ flexGrow: "0" }}>
                            {itemsList.map((item, index) => (
                                <OverlayTrigger
                                trigger={"click"}
                                key={"left-item-"+index}
                                placement="left"
                                rootClose={true}
                                overlay={
                                    <Popover className="popover-item" id={`inventory-popup`}>
                                        <Popover.Header as="h3">{item.nombre} x{item.cantidad}</Popover.Header>
                                        <Popover.Body>
                                            <p>{item.description}</p>
                                            {error && <p style={{ fontWeight: "bold", color: "red" }}>{error}</p>}
                                        </Popover.Body>
                                        <div className="popover-footer">
                                            <Button type="button" variant="success" onClick={() => handleItemClick(index)}>
                                                Usar item
                                            </Button>
                                        </div>
                                    </Popover>}
                                >
                                    <Col key={"item-"+index} className="col">
                                        <div 
                                        className={`inventory-item ${selectedItem === index ? "selected" : ""} ${usedItem === true && selectedItem === index ? "used" : ""}`}
                                        onClick={() => animateItemSelect(index)}
                                        >
                                            <Image src={base_url + item.imageUrl} alt={item.nombre} style={{width: "100%", height: "26.462vh"}}/>
                                            <div className="item-quantity">
                                                <p>x{item.cantidad}</p>
                                            </div>
                                            <div className="item-details">
                                                <p style={{textAlign: "center"}}>{item.nombre}</p>
                                            </div>
                                        </div>
                                    </Col>
                            </OverlayTrigger>
                            ))}

                            </Offcanvas.Body>
                    </Offcanvas>

                    </div>
                </PetContext.Provider>
            )}
        </>
    )
}