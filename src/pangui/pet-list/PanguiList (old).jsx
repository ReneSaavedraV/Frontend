import React from "react";
import "../assets/petlist.css"

export default function PanguiList() {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipData, setTooltipData] = React.useState({});
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const moveTooltip = (e) => {
            setPosition({ x: e.pageX - 135, y: e.pageY - 210 });
        };
        window.addEventListener("mousemove", moveTooltip);
      
        return () => {
            window.removeEventListener("mousemove", moveTooltip);
        };
    }, []);

    // EJEMPLOS, convertir a params para Entrega 2
    const tooltips = [
        { id: 1, alimentacion: 0.18, salud: 0.1, entretencion: 0.7, name: "Panguito", lvl: 1},
        { id: 2, alimentacion: 0, salud: 0.58, entretencion: 0.5, name: "Marraqueta", lvl: 7},
        { id: 3, alimentacion: 0.66, salud: 0.8, entretencion: 0.4, name: "Vegeta", lvl: 9000},
        { id: 4, alimentacion: 1, salud: 0.9, entretencion: 0.3, name: "Alice Cooper", lvl: 75},
    ]; 
  
    const getBarColor = (value) => {
        let r, g; // Funcion para retornar un color entre rojo y verde dependiendo del valor de la barra
        
        if (value <= 0.5) {
            r = 255;
            g = Math.floor(255 * value * 2);
        } else {
            r = Math.floor(255 * (1 - value) * 2);
            g = 255;
        }
      
        return `rgb(${r}, ${g}, 0)`;
    };
    
  
    return (
        <div>
            <h1>Tus Panguis!</h1>
            <div className="box-container">
                {tooltips.map((tooltip, index) => (
                    <div
                        key={index}
                        className="box"
                        onMouseEnter={() => {
                            setShowTooltip(true);
                            setTooltipData(tooltip);
                        }}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <div className="box-level">
                            <img src="/src/assets/imgs/LVL.png" alt="Level Icon" className="level-icon" />
                            <div className='box-level-text'>  {tooltip.lvl} </div>
                        </div>
                
                        <a href="/panguipet">
                            <img src={`/src/assets/imgs/${tooltip.name}.png`} alt={`${tooltip.name} box image`} />
                        </a>
                        <div className="box-name">{tooltip.name}</div> {/* Add this line */}
                    </div>
                ))}
            </div>
            {showTooltip && (
                <div id="tooltip" style={{left: `${position.x}px`, top: `${position.y}px`}}>
                    <div className="tooltip-title">{tooltipData.name}</div>
                    {["salud", "alimentacion", "entretencion"].map((key) => (
                        <div className="stat" key={key}>
                            <img src={`/src/assets/imgs/${key}.png`} alt={`${key} icon`} className="icon-size" />
                            <div className="bar">
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${tooltipData[key] * 100}%`,
                                        backgroundColor: getBarColor(tooltipData[key])
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
 
    
}
