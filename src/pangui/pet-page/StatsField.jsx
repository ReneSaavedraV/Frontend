import { PetContext } from "./PetPage";
import { useContext } from "react";
import "./assets/statsfield.css"

function StatsBar({name, percentage, color}) {
    return (
        <div className="stats-bar">
            <div className="stats-bar-name">{name}</div>
            <div className="stats-bar-bar">
                <div className="stats-bar-bar-fill" style={{
                    backgroundColor: color,
                    width: percentage,
                }}>
                </div>
            </div>
        </div>
    )
}

export default function StatsField() {
    const { pangui } = useContext(PetContext);
    

    return (
        <div className="stats-field">
            <StatsBar 
                name="Salud" 
                percentage={pangui?.health + "%"} 
                color="red"
            />
            <StatsBar 
                name="Comida" 
                percentage={pangui?.food + "%"} 
                color="green"
            />
            <StatsBar 
                name="Renevation" 
                percentage={pangui?.energy + "%"}
                color="yellow"
            />
        </div>
    )
}