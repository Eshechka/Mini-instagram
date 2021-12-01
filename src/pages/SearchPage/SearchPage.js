import styles from "./SearchPage.module.scss";
spriteIcons;
export function SearchPage() {
  return (
    <>
      <section class="searched">
        <div class="searched__container">
          <p class="searched__text">Новое в мире</p>
          <p class="searched__text">
            Количество найденных результатов по запросу '':{" "}
            <span class="searched__amount"></span>
          </p>
          <p class="searched__text">
            Увы, ничего не нашлось ничего по запросу ''
          </p>

          <ul class="searched__card-list">
            <li class="searched__card-item"></li>
          </ul>

          <div class="searched__button-show-more">
            <button
              type="button"
              class="button button_size_m button_theme_light"
            >
              Показать ещё
            </button>
          </div>
        </div>

        <div class="searched__big-card-slider">
          <div class="big-card-slider">
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
        </div>
      </section>
    </>
  );
}
