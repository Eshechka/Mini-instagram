import {connect} from "react-redux";
import * as postsActions from "../../store/posts.actions.js";

import React, {useEffect, useState} from "react";
import {requests as $axios, tokenForAllPosts} from "../../helpers/requests";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {PostsList} from "../../components/PostsList/PostsList";
import {Overlay} from "../../components/Overlay/Overlay.js";
import BigPostSlider from "../../components/BigPostSlider/BigPostSlider.js";

import styles from "./HomePage.module.scss";

function HomePage({setAllPosts, allPosts, currentUser}) {
  const [initialSlide, setInitialSlide] = useState(0);

  const [openBigPost, setOpenBigPost] = useState(false);

  useEffect(() => {
    async function getAllPosts() {
      let token =
        currentUser && currentUser.token ? currentUser.token : tokenForAllPosts;

      const miniInstUser = JSON.parse(localStorage.getItem("mini-inst-user"));

      if (miniInstUser && miniInstUser.token) {
        token = miniInstUser.token;
      }

      $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

      const {data} = await $axios.get(
        `/v1/photos`,
        {
          params: {
            include: "author,comments,likes",
            sort: "createdAt:desc",
            limit: 20,
          },
        },
        {"Content-Type": "application/json"}
      );

      if (data.cards) {
        setAllPosts(data.cards);
      }
    }
    getAllPosts();
  }, []);

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
            <h2 className={styles.new__title}>Новое в Instagram</h2>

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
const mapDispatchToProps = {
  setAllPosts: postsActions.setAllPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
