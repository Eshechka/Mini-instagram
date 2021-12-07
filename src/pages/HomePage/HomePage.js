import {connect} from "react-redux";
import * as postsActions from "../../store/posts.actions.js";

import React, {useEffect} from "react";
import {requests as $axios, tokenForAllPosts} from "../../helpers/requests";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {PostsList} from "../../components/PostsList/PostsList";

import styles from "./HomePage.module.scss";

function HomePage({setAllPosts, allPosts, currentUser}) {
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

            {allPosts && <PostsList posts={allPosts} />}

            {/* <div className="new__button-show-more">
            <button
              type="button"
              className="button button_size_m button_theme_light"
            >
              Показать ещё
            </button>
          </div> */}
          </div>

          {/* <div className="new__big-card-slider">
          <div className="big-card-slider">
            <button
              className="big-card-slider__control big-card-slider__control_close"
              type="button"
            ></button>

            <button
              type="button"
              className="big-card-slider__control big-card-slider__control_prev"
            ></button>
            <button
              type="button"
              className="big-card-slider__control big-card-slider__control_next"
            ></button>
          </div>
        </div> */}
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
