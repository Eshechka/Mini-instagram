import {PostList} from "../PostsList/PostsList";
import styles from "./HomePage.module.scss";

export function HomePage() {
  return (
    <>
      <div className="my-search">
        <div className="my-search__container">
          <form className="form-search">
            <input type="search" className="form-search__input" />
            <button
              title="Нажмите для поиска"
              type="submit"
              className="form-search__submit"
            >
              <svg className="form-search__icon">
                <use xlinkHref="../img/spriteIcons.svg#search"></use>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <section className="new">
        <div className="new__container">
          <h2 className="new__title">Новое в мире</h2>

          <p className="new__empty-text">
            Увы, пока ничего не загружено. Загрузите что-нибудь и станьте
            первым.
          </p>

          <PostList />

          {/* <div className="new__button-show-more">
            <button
              type="button"
              className="button button_size_m button_theme_light"
            >
              Показать ещё
            </button>
          </div> */}
        </div>

        {/* <div className="new__big-post-slider">
          <div className="big-post-slider">
            <button
              className="big-post-slider__control big-post-slider__control_close"
              type="button"
            ></button>

            <button
              type="button"
              className="big-post-slider__control big-post-slider__control_prev"
            ></button>
            <button
              type="button"
              className="big-post-slider__control big-post-slider__control_next"
            ></button>
          </div>
        </div> */}
      </section>
    </>
  );
}
