import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";

import jungleBackground from "./assets/img/landing/junglebackground.jpg";
import shopbackground from "./assets/img/tienda/shopbackground.jpg";
import panguiFlag from "./assets/img/landing/pangui.png";
import "./assets/LandingPage.css";

export default function LandingPage() {
  const [showAnimation, setAnimation] = useState(true);

  useEffect(() => {

      setAnimation(false);

  }, []);

  return (
    <>
    <div className="hide-overflow">
      <div className={`hide-overflow landing-main-swipper ${showAnimation ? "" : "show"}`}> {/* Eliminar div si se descomenta lo demás*/}
      {/* <Swiper
        className={`landing-main-swipper ${showAnimation ? "" : "show"}`}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 50000,
          disableOnInteraction: true
        }}
        pagination={{
          type: "progressbar"
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        modules={[Autoplay, Pagination]}
      >
         <SwiperSlide> */}
          <Image className="background" src={jungleBackground} alt="jungle" />
          <Container className="landing-container">
            <Row style={{ width: "100%", height: "100%" }}>
              <Col className="landing-content">
                <h1>
                  <Link to="/panguilist">¡Cuida de un Pangui virtual<br />con tus amigos!</Link>
                </h1>
                <Image alt="pangui flag" src={panguiFlag} />
              </Col>
            </Row>
          </Container>
        {/* </SwiperSlide> */}

        {/* <SwiperSlide>
          <Image className="background" src={shopbackground} alt="jungle" />
        </SwiperSlide> */}

      {/* </Swiper> */}
      </div>
    </div>
    </>
  );
};