import {connect} from "react-redux";
import * as actionsPosts from "../../store/posts.actions";

import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {
  EffectFlip,
  Navigation,
  Pagination,
  EffectCube,
  EffectCards,
  EffectFade,
} from "swiper";

import "swiper/swiper-bundle.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";

import {Button} from "../Button/Button";
import PostSlide from "../PostSlide/PostSlide";

import styles from "./BigPostSlider.module.scss";

function BigPostSlider({
  currentUser,
  updatePostsLikes,
  posts = [],
  clickClose = Function.prototype,
  initialSlide,
  effectSlides = "flip",
  idSlider,
}) {
  const updateLikes = (postId, userId, typeUpdating) => {
    updatePostsLikes(postId, userId, typeUpdating);
  };

  return (
    <div className={styles[`big-post-slider`]}>
      <div className={styles[`big-post-slider__container`]}>
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
          modules={[
            EffectFlip,
            EffectCube,
            EffectCards,
            EffectFade,
            Navigation,
            Pagination,
          ]}
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
              <PostSlide
                postdata={post}
                currentUser={currentUser}
                updateLikes={updateLikes}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};
const mapDispatchToProps = {
  updatePostsLikes: actionsPosts.updatePostsLikes,
};

export default connect(mapStateToProps, mapDispatchToProps)(BigPostSlider);
