import "./assets/petlist.css"
import {createContext, useState} from"react"
import ListCard from "./ListCard"
import axios from "axios"
import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";



/* New pangui parameters
    backgroundUrl: background_0.png (Ejemplo)
    ropa: ropa_1 (ejemplo)
    nombre: string
    quitaremos level por ahora
    energia: int
    comida: int
    salud: int
*/


export const TooltipContext = createContext(null);

export default function PetList({ ownsTheList, id}) {
    let {showTooltip, setShowTooltip} = useState(false);
    let {toolTipContent, setToolTipContent} = useState({
        name: "",
        energia: 0,
        comida: 0,
        salud: 0,
    });

    const [user, setUser] = useState(null);
    const [panguiList, setPanguiList] = useState([]);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (ownsTheList) {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/session`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } else {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPangui = async () => {
        try {
            if (ownsTheList) {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pangui/`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setPanguiList(response.data);
            } else {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pangui/user/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setPanguiList(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        fetchPangui();
    }, [user]);

    return (
        <>
            <Image className="petlist-background" alt="panguilist background"
                src={"src/common/assets/img/commonbackground.jpg"}
            />
            <Col className="user-profile-panguis col">
                <TooltipContext.Provider
                    value={{
                        showTooltip,
                        setShowTooltip,
                        toolTipContent,
                        setToolTipContent,
                    }}
                >
                    <h1 className='box-title'>{ownsTheList ? 
                        "Tus Panguis" : `Panguis de ${user?.username}`}
                    </h1>
                    <div className="box-container">
                        {panguiList?.map((pangui, index) => (
                            <ListCard key={index}
                                panguiName={pangui.name}
                                panguiNumber={pangui.panguiNumber}
                                backgroundNumber={pangui.backgroundNumber}
                                energia={pangui.energy}
                                comida={pangui.food}
                                salud={pangui.health}
                                panguiId={pangui.id}
                                ownsTheList={ownsTheList}
                            />
                        ))}
                    </div>
                </TooltipContext.Provider>
            </Col>
        </>
    )
}

PetList.defaultProps = {
    ownsTheList: true
}
