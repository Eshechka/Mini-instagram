import {connect} from "react-redux";

import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {EffectFlip, Navigation, Pagination, EffectCube} from "swiper";

import "swiper/swiper-bundle.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";

import {Button} from "../Button/Button";
import PostSlide from "../PostSlide/PostSlide";

import styles from "./BigPostSlider.module.scss";

function BigPostSlider({
  currentUser,
  posts = [],
  clickClose = Function.prototype,
  initialSlide,
  effectSlides = "flip",
  idSlider,
}) {
  return (
    <div className={styles[`big-post-slider`]}>
      <span className=""></span>
      <Button
        type={"button"}
        title={"Закрыть слайдер"}
        classes={{
          icon: "",
          size: "s",
          theme: "controls",
        }}
        icon={"close"}
        click={clickClose}
      />

      <Swiper
        modules={[EffectFlip, EffectCube, Navigation, Pagination]}
        effect={effectSlides}
        navigation
        pagination={{clickable: true}}
        id={idSlider}
        spaceBetween={100}
        slidesPerView={1}
        initialSlide={initialSlide}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <PostSlide postdata={post} currentUser={currentUser} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps, null)(BigPostSlider);
