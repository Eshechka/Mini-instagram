import {connect} from "react-redux";
import * as cardsActions from "../../store/cards.actions.js";

import React, {useEffect} from "react";
import {requests as $axios, tokenForAllPhotos} from "../../helpers/requests";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {CardList} from "../../components/CardList/CardList";

import styles from "./HomePage.module.scss";

function HomePage({setAllCards, allCards}) {
  useEffect(() => {
    async function getAllCards() {
      let token = tokenForAllPhotos;
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
        setAllCards(data.cards);
      }
    }
    getAllCards();
  }, []);

  return (
    <>
      <Header />

      <main className="maincontent">
        <section className={styles.new}>
          <div className={styles.new__container}>
            <h2 className={styles.new__title}>Новое в Instagram</h2>

            {!allCards ||
              (!allCards.length && (
                <p className="new__empty-text">
                  Увы, пока ничего не загружено. Загрузите что-нибудь и станьте
                  первым.
                </p>
              ))}

            {allCards && <CardList cards={allCards} />}

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
    allCards: state.cards.allCards,
  };
};
const mapDispatchToProps = {
  setAllCards: cardsActions.setAllCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
