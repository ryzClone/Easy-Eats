import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../style/Home.css";

import { Mousewheel, Keyboard, Navigation, Pagination } from "swiper/modules";

const Home = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={3}
      centeredSlides={true}
      initialSlide={2}
      mousewheel={{ forceToAxis: true }}
      keyboard={{ enabled: true }}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Mousewheel, Keyboard, Navigation, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="card">Card 1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">Card 2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">Card 3</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">Card 4</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="card">Card 5</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Home;
