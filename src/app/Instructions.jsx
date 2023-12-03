import React from "react";
import loginBackground from "../common/assets/img/commonbackground.jpg";
import PanguiCoin from "../common/assets/img/PanguiCoin.png"
import demo_1 from "./assets/img/instructions/demo_1.png"
import demo_2 from "./assets/img/instructions/demo_2.png"
import demo_3 from "./assets/img/instructions/demo_3.png"
import demo_4 from "./assets/img/instructions/demo_4.png"
import demo_5 from "./assets/img/instructions/demo_5.png"
import demo_6 from "./assets/img/instructions/demo_6.png"
import "./assets/Instructions.css";

export default function Instructions() {
    return (
        <>
            <img className="background" 
                alt="instructions background" 
                src={loginBackground}
            />
            <div className="instructions-container">
                <br />
                <h1 className="title">¿Qué es PanguiPet?</h1>
                <div className="intro-section">
                    <p className="intro-text">
                        PanguiPet es una aplicación web que te permite adoptar y cuidar a tu propio Pangui, una mascota virtual. Además puedes interactuar con tus amigos y cuidar a sus Panguis juntos.
                    </p>
                    <p className="intro-highlight">
                        PanguiPet funciona con <img src={PanguiCoin} alt="PanguiCoin Icon" className="mini-icon" />PanguiCoins<img src={PanguiCoin} alt="PanguiCoin Icon" className="mini-icon" />, la moneda oficial del juego. ¡Úsalas para comprar objetos en la tienda!
                    </p>
                </div>
                
                <div className="content-wrapper">
                    <h2 className="sub-title">Cómo jugar</h2>
                    <p className="intro-text"> Utiliza la barra navegadora para jugar PanguiPet. ¡Crea una cuenta y empieza a jugar!</p>
                    <img src={demo_4} alt="Demo_4"/>
                    <div className="feature normal">
                        <div className="feature-description bold-text">
                            <p>Tu mascota Pangui posee diversas estadísticas, ¡Un Pangui bien cuidado es un Pangui feliz!</p>
                        </div>
                        <div className="feature-image">
                            <img src={demo_1} alt="Pangui stats" />
                        </div>
                    </div>

                    <div className="feature normal">
                        <div className="feature-image">
                            <img src={demo_2} alt="Actions to do" />
                        </div>
                        <div className="feature-description bold-text">
                            <p>Puedes realizar acciones y customizar a tu Pangui</p>
                        </div>
                    </div>

                    <div className="feature normal">
                        <div className="feature-description bold-text">
                            <p>Revisa tu lista de Panguis para saber el estado de tus mascotas</p>
                        </div>
                        <div className="feature-image">
                            <img src={demo_3} alt="List of Panguis" />
                        </div>
                    </div>
                </div>
                
                <h2 className="sub-title"><img src={PanguiCoin} alt="PanguiCoin Icon" className="mini-icon" />PanguiCoins<img src={PanguiCoin} alt="PanguiCoin Icon" className="mini-icon" /></h2>
                <p className="intro-text">
                    Consigue PanguiCoins por medio de tareas diarias y logros, puedes utilizarlas para conseguir comida, objetos y ropa para tu Pangui.
                </p>
                
                <img src={demo_5} alt="Demo BG" style={{width: "100%", height: "auto", borderRadius: "15px"}}/>
                <br />
                <h3 className="sub-title"><img src={PanguiCoin} alt="PanguiCoin Icon" className="mini-icon" />Tienda<img src={PanguiCoin} alt="PanguiCoin Icon" className="mini-icon" /></h3>
                <p className="intro-text">
                    ¡Utiliza los PanguiCoins para comprar objetos y customizables en la tienda!
                </p>
                <img src={demo_6} alt="Demo BG" style={{width: "100%", height: "auto", borderRadius: "15px"}}/>
                <footer className="footer">
                    <p>© 2023 PanguiPet, Todos los derechos aún no reservados.</p>
                </footer>
            </div>
        </>
    );
}
