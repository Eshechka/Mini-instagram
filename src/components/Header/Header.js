import styles from "./Header.module.scss";

import {Button} from "../Button/Button";
import {Nav} from "../Nav/Nav";

// import {requests as $axios} from "../../helpers/requests.js";

export function Header() {
  // const addAlbum = async (e) => {
  //   const loadedCover = e.target.files[0];

  //   // renderer(loadedCover).then(pic => {
  //   //     this.renderedCover = pic;
  //   // });

  //   const formData = new FormData();
  //   formData.append("preview", loadedCover);
  //   formData.append("title", "defaultdefault");
  //   formData.append(
  //     "description",
  //     "defaultdefaultdefaultdefaultdefaultdefaultdefaultdefaultdefaultdefault"
  //   );
  //   formData.append("authorId", 32);

  //   const {data} = await $axios.post("/v1/albums", formData, {
  //     headers: {"Content-Type": "multipart/form-data"},
  //   });

  //   console.log("data.album: ", data.album);
  // };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__avatar}>
          <img className={styles[`header__avatar-img`]} alt="avatar" />
        </div>
        <div className={styles.header__info}>
          <h1 className={styles.header__title}>name</h1>

          <div className={styles.header__text}>description</div>
        </div>

        <div className={styles[`header__button-logout`]}>
          <Button
            type={"button"}
            title={"Выйти из своего аккаунта"}
            text={"Выйти"}
            classes={{
              icon: "space",
              size: "changing_withtext",
              theme: "color_changing",
            }}
            icon={"logout"}
          />
        </div>
      </div>

      <Nav />

      {/* <div className={styles[`header__edit-header`]}>
        <div className={styles[`edit-header`]}>
          <div className={styles[`edit-header__card`]}>
            <div className={styles[`edit-header__form`]}>
              <form className={styles[`form-edit-header`]}>
                <div className={styles[`form-edit-header__load-avatar`]}>
                  <label
                    htmlFor="load-avatar-header"
                    className={[
                      styles[`form-edit-header__label`],
                      styles[`form-edit-header__label_file-load`],
                    ].join(" ")}
                  >
                    <input
                      type="file"
                      id="load-avatar-header"
                      className={styles[`form-edit-header__input-load`]}
                    />

                    <div
                      className={styles[`form-edit-header__added-photo`]}
                    ></div>

                    <div className={styles[`form-edit-header__img-wrapper`]}>
                      <img
                        className={styles[`form-edit-header__img`]}
                        alt="avatar"
                      />
                      <div
                        className={styles[`form-edit-header__img-overlay`]}
                      ></div>
                      <div
                        className={styles[`form-edit-header__avatar-img-text`]}
                      >
                        Изменить фото
                      </div>
                    </div>
                  </label>
                </div>

                <div className={styles[`form-edit-header__other-info`]}>
                  <label className={styles[`form-edit-header__label`]}>
                    <input
                      className={styles[`form-edit-header__input`]}
                      type="text"
                      placeholder="Введите имя"
                    />
                  </label>
                  <div
                    className={[
                      styles[`form-edit-header__error`],
                      styles[`form-edit-header__error_name`],
                    ].join(" ")}
                  >
                    <span>Максимум символов в имени:</span>
                    <span>Обязательно для заполнения</span>
                  </div>

                  <label
                    className={[
                      styles[`form-edit-header__label`],
                      styles[`form-edit-header__label_view_scroll`],
                    ].join(" ")}
                  >
                    <textarea
                      className={[
                        styles[`form-edit-header__input`],
                        styles[`form-edit-header__input_textarea`],
                      ].join(" ")}
                      cols="20"
                      rows="2"
                      placeholder="Краткая информация о пользователе"
                    ></textarea>
                    <div
                      className={styles[`form-edit-header__decorelem`]}
                    ></div>
                  </label>
                  <div
                    className={[
                      styles[`form-edit-header__error`],
                      styles[`form-edit-header__error_description`],
                    ].join(" ")}
                  >
                    <span>Минимум символов в описании:</span>
                    <span>Максимум символов в описании:</span>
                    <span>Обязательно для заполнения</span>
                  </div>
                </div>

                <div className={styles[`form-edit-header__load-cover`]}>
                  <label
                    htmlFor="load-bgcover-header"
                    className={[
                      styles[`form-edit-header__label`],
                      styles[`form-edit-header__label_file-load`],
                    ].join(" ")}
                  >
                    <input
                      type="file"
                      id="load-bgcover-header"
                      className={styles[`form-edit-header__input-load`]}
                      onClick={addAlbum}
                    />
                    <div
                      className={styles[`form-edit-header__added-cover`]}
                    ></div>
                    <div
                      className={styles[`form-edit-header__now-cover`]}
                    ></div>
                    <div
                      className={styles[`form-edit-header__cover-img`]}
                    ></div>
                    <div className={styles[`form-edit-header__cover-img-text`]}>
                      Изменить фон
                    </div>
                  </label>
                </div>

                <div className={styles[`form-edit-header__buttons`]}>
                  <button
                    className={[
                      styles.button,
                      styles.button_size_m,
                      styles[`form-edit-header__buttonspace`],
                    ].join(" ")}
                    type="submit"
                  >
                    Сохранить
                  </button>

                  <button
                    className={[
                      styles.button,
                      styles.button_size_m,
                      styles.button_theme_minimalizm,
                    ].join(" ")}
                    title="Закрыть без сохранения внесенных изменений"
                    type="button"
                  >
                    Отменить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </header>
  );
}
