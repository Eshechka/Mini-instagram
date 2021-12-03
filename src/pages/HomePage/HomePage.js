import {CardList} from "../../components/CardList/CardList";
import styles from "./HomePage.module.scss";
import React, {useEffect, useState} from "react";
import store from "../../store/store";

export function HomePage({setAllCards}) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log(store.getState().cards);
    setCards(store.getState().cards.allCards);
  }, []);

  return (
    <>
      <section className={styles.new}>
        <div className={styles.new__container}>
          <h2 className={styles.new__title}>Новое в Instagram</h2>

          {!cards && (
            <p className="new__empty-text">
              Увы, пока ничего не загружено. Загрузите что-нибудь и станьте
              первым.
            </p>
          )}

          {cards && <CardList cards={cards} />}

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
    </>
  );
}
