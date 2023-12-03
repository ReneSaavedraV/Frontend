import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import "./assets/profile.css";
import Profile from "./Profile.jsx"
import Achivement from "./Achievement.jsx"
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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

export default function ProfileInterface({slide=0}) {
    const { loggedUser } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser()
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
                console.log(new Date(response.data.createdAt).toDateString());
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {user && loggedUser && (
                <Swiper
                    className={"profile-swipper"}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{
                        type: "progressbar"
                    }}
                    navigation
                    loop={false}
                    initialSlide={slide}
                    modules={[Pagination, Navigation]}
                >

                    <SwiperSlide>
                        <Profile></Profile>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Achivement></Achivement>
                    </SwiperSlide>

                </Swiper>
            )}
        </>
    );
}
