import "./assets/inventory.css";
import "./assets/achievements.css";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import axios from "axios";
import { backgroundLoader } from "./avatar-loader";

const base_url = "/src/common/assets/img/achievements/";


export default function Achievement() {
    const { loggedUser } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [achievements, setAchievements] = useState([])
    const [unlockedAchievements, setUnlockedAchievements] = useState([])

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

    const fetchAllAchievements = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/achievements`);
    
            return response
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUnlockedAchievements = async (userId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/achievements/${userId}`);

            return response
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser()
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });    
    }, []);

    useEffect(() => {
        fetchAllAchievements()
            .then((response) => {
                setAchievements(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        fetchUnlockedAchievements(user?.id)
            .then((response) => {
                setUnlockedAchievements(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    , [user]);

    return (
        <>
            {user && loggedUser && (
                <Container className="hide-weird-overflow">
                    <span className="material-symbols-outlined achievement-navigation">
                            person
                    </span>
                    <Image className="background" alt="profile background"
                        src={backgroundLoader(user.backgroundId)}
                    /> 

                    <Row className="justify-content-center">
                        <Col>
                            <h1 className="achievements-title">Logros de {user.username}</h1>
                        </Col>
                    </Row>

                    <div className="achievements-rows">

                        <Row className="justify-content-center achievement-column">
                            <h3>Obtenidos</h3>
                            <div className="achievements-container-unlocked">
                                {unlockedAchievements.map((achievement, index) => (
                                    <OverlayTrigger
                                        key={"top-unlocked-"+achievement.achievement}
                                        placement="top"
                                        overlay={
                                            <Popover id={"popover-positioned-top"}>
                                                <Popover.Header as="h3">{achievement.achievement}</Popover.Header>
                                                <Popover.Body>
                                                    <strong>{achievement.description}</strong>
                                                </Popover.Body>
                                            </Popover>}
                                    >
                                        <Col key={index} className="col">
                                            <div className="achievement-item">
                                                <Image src={base_url + achievement.achievementUrl} alt={achievement.achievement} />
                                                <div className="item-details">
                                                    <p>{achievement.achievement}</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </OverlayTrigger>
                                ))} 
                            </div>
                        </Row>

                        <Row className="justify-content-center achievement-column">
                            <h3>Bloqueados</h3>
                            <div className="achievements-container-locked">
                                {achievements.filter(
                                    (achievement) => !unlockedAchievements.map((unlocked) => unlocked.achievement).includes(achievement.achievement)
                                ).map((achievement, index) => (
                                    <OverlayTrigger
                                        key={"top-locked-"+achievement.achievement}
                                        placement="top"
                                        overlay={
                                            <Popover id={"popover-positioned-top"}>
                                                <Popover.Header as="h3">{achievement.achievement}</Popover.Header>
                                                <Popover.Body>
                                                    <strong>{achievement.description}</strong>
                                                </Popover.Body>
                                            </Popover>}
                                    >
                                        <Col key={"locked-"+index} className="col">
                                            <div className="achievement-item">
                                                <Image src={base_url + achievement.achievementUrl} alt={achievement.achievement} />
                                                <div className="item-details">
                                                    <p>{achievement.achievement}</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </OverlayTrigger>
                                ))} 
                            </div>
                        </Row>

                    </div>

                </Container>
            )}
        </>
    );
}