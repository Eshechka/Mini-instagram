import styles from "./SearchPage.module.scss";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Button} from "../../components/Button/Button";

export function SearchPage() {
  return (
    <>
      <Header />

      <main className="maincontent">
        <section className={styles.searched}>
          <div className={styles.searched__container}>
            <p className={styles.searched__text}>Новое в мире</p>
            <p className={styles.searched__text}>
              Количество найденных результатов по запросу '':{" "}
              <span className={styles.searched__amount}></span>
            </p>
            <p className={styles.searched__text}>
              Увы, ничего не нашлось ничего по запросу ''
            </p>

            <ul className={styles[`searched__post-list`]}>
              <li className={styles[`searched__post-item`]}></li>
            </ul>

            <div className={styles[`searched__button-show-more`]}>
              <Button
                type={"button"}
                title={"Показать больше результатов поиска"}
                text={"Показать ещё"}
                classes={{
                  size: "m_withtext",
                  theme: "light",
                }}
              />
            </div>
          </div>

          {/* <div className={styles[`searched__big-card-slider`]}>
        <div className={styles[`big-card-slider`]}>
          <button
            class="big-card-slider__control big-card-slider__control_close"
            type="button"
          ></button>

          <button
            type="button"
            class="big-card-slider__control big-card-slider__control_prev"
          ></button>
          <button
            type="button"
            class="big-card-slider__control big-card-slider__control_next"
          ></button>
        </div>
      </div> */}
        </section>
      </main>

      <Footer />
    </>
  );
}
