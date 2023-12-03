/*
* TODO: Cambiar Pangui a ser un componente por separado
*/
import React, { useState } from 'react';
import axios from "axios";
import StatsField from "./StatsField"
import ActionsField from "./ActionsField"
import "./assets/pangui.css"
import ImageMerger from "../ImageMerger"

export default function MainUI({panguiBase, panguiRopa, panguiName, currentCurrency, userId, updatePanguiCoins}) {
    const [coins, setCoins] = useState([]);

    const handleCoinClick = async () => {   
        const randomX = Math.random() * 80;
        const randomY = Math.random() * 30;

        setCoins((prevCoins) => [...prevCoins, { x: randomX, y: randomY, id: Date.now() }]);
          
        try {
            const response = await axios.patch(
              `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
              {
                currency: currentCurrency + 1,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            
            updatePanguiCoins(currentCurrency + 1);

            console.log("Respuesta del servidor:", response.data);
          
          } catch (error) {
            console.error("Error al realizar la solicitud PATCH:", error);
          }

        }

    const handleAnimationEnd = (id) => {
        setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== id));
    };

    return(
        <>
            <div className='main-ui'>
                <StatsField />
                <div id='pangui-container' onClick={handleCoinClick} style={{cursor: "pointer", position: "relative"}}>
                    <ImageMerger imageUrl1={panguiBase} imageUrl2={panguiRopa} alt="pangui" />
                    {coins.map((coin) => (
                        <div key={coin.id} 
                            className='coin-reward' 
                            style={{ top: `${coin.y}%`,  left: `${coin.x}%` }}
                            onAnimationEnd={() => handleAnimationEnd(coin.id)}
                        >
                        </div>
                    ))}
                </div>
                <ActionsField />
            </div>

            <div className='name-card'>
                {panguiName}
            </div>

        </>
    )
}