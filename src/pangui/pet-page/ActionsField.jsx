/*
* TODO: Replace emoji for a proper icon
*       Move handleClick logic to another file (E2)
*/
import axios from "axios";
import "./assets/actionsfield.css"
import { PetContext } from "./PetPage";
import { AuthContext } from "../../auth/AuthContext";
import { useContext } from "react";

function ActionIcon({name, emoji, onclick}) {
    return (
        <div className="action-icon" onClick={onclick}>
            <div className="action-icon-emoji">
                {emoji}
            </div>
            <div className="action-icon-name">
                {name}
            </div>
        </div>
    )
}

export default function ActionsField() {
    const { token } = useContext(AuthContext);
    const { pangui, setPangui } = useContext(PetContext);

    function handleClick(statAttribute) {
        axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/pangui/${pangui.id}/${statAttribute}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        ).then(
            (response) => {
                setPangui(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <div className="actions-field">
            <div id="actions-name">Acciones</div>
            <ActionIcon name="Sanar" 
                emoji="💖" 
                onclick={() => handleClick("heal")} 
            />
            <ActionIcon name="Alimentar" 
                emoji="🍗" 
                onclick={() => handleClick("feed")} 
            />
            <ActionIcon name="Renevate()" 
                emoji="💀" 
                onclick={() => handleClick("renevate")} 
            />
        </div>
    )
}