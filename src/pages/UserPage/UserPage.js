import styles from "./UserPage.module.scss";

export function UserPage() {
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

          <ul className="new__card-list">
            <li className="new__card-item"></li>
          </ul>

          <div className="new__button-show-more">
            <button
              type="button"
              className="button button_size_m button_theme_light"
            >
              Показать ещё
            </button>
          </div>
        </div>

        <div className="new__big-card-slider">
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
        </div>
      </section>

      <section className="my-albums">
        <div className="my-albums__container">
          <div className="my-albums__topgroup">
            <h2 className="my-albums__title">Мои альбомы</h2>
            <h2 className="my-albums__title">Альбомы</h2>
            <div className="my-albums__button-plus">
              <button
                title="Добавить новый альбом"
                className="button button_icon_expand button_size_s button_theme_pale"
              >
                <span className="button__icon button__icon_plus"></span>
              </button>
            </div>
          </div>

          <p className="my-albums__empty-text">
            Альбомы еще не созданы. Создайте альбом с помощью кнопки "Добавить".
          </p>

          <ul className="my-albums__albums-list">
            <li className="my-albums__albums-item"></li>
          </ul>
        </div>

        <div className="my-albums__change-album"></div>
      </section>
    </>
  );
}
