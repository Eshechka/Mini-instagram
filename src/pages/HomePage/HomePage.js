import {connect} from "react-redux";

import React, {useState} from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {PostsList} from "../../components/PostsList/PostsList";
import {Overlay} from "../../components/Overlay/Overlay.js";
import BigPostSlider from "../../components/BigPostSlider/BigPostSlider.js";

import styles from "./HomePage.module.scss";

function HomePage({allPosts, currentUser}) {
  const [initialSlide, setInitialSlide] = useState(0);

  const [openBigPost, setOpenBigPost] = useState(false);

  function openBigPostSlider(slideNum) {
    setInitialSlide(slideNum);
    setOpenBigPost(true);
  }

  return (
    <>
      <Header />

      <main className="maincontent">
        <section className={styles.new}>
          <div className={styles.new__container}>
            <h2 className={styles.new__title}>Новые посты в Instagram</h2>

            {!allPosts ||
              (!allPosts.length && (
                <p className="new__empty-text">
                  Увы, пока ничего не загружено. Загрузите что-нибудь и станьте
                  первым.
                </p>
              ))}

            {allPosts && (
              <PostsList click={openBigPostSlider} posts={allPosts} />
            )}
          </div>

          {openBigPost ? <Overlay click={() => setOpenBigPost(false)} /> : null}
          {openBigPost ? (
            <div className={styles[`new__big-post-slider`]}>
              <BigPostSlider
                posts={allPosts}
                clickClose={() => {
                  setOpenBigPost(false);
                }}
                effectSlides="flip"
                initialSlide={initialSlide}
                idSlider={"allPostsSwiper"}
              />
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allPosts: state.posts.allPosts,
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps, null)(HomePage);
