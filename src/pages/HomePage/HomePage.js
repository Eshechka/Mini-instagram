import {CardList} from "../../components/CardList/CardList";
import styles from "./HomePage.module.scss";

export function HomePage() {
  return (
    <>
      <section className="new">
        <div className="new__container">
          <h2 className="new__title">Новое в мире</h2>

          <p className="new__empty-text">
            Увы, пока ничего не загружено. Загрузите что-нибудь и станьте
            первым.
          </p>

          <CardList />

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
