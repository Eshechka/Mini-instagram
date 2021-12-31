import {connect} from "react-redux";
import * as actionsUsers from "../../store/users.actions.js";
import * as actionsPosts from "../../store/posts.actions.js";

import {Link} from "react-router-dom";
import {Button} from "../Button/Button";
import Nav from "../Nav/Nav";

import {
  requests as $axios,
  tokenForAllPosts,
  urlPhotos,
  urlAvatars,
} from "../../helpers/requests.js";

import no_avatar from "../../img/no_avatar.png";

import styles from "./Header.module.scss";

function Header({currentUser, removeCurrentUser, removeCurrentUserPosts}) {
  const handleLogout = () => {
    localStorage.removeItem("mini-inst-user");
    removeCurrentUser();
    removeCurrentUserPosts();
    $axios.defaults.headers["Authorization"] = tokenForAllPosts;
  };

  return (
    <header
      className={[
        styles.header,
        styles[`${!currentUser?.id ? "header_view_logout" : ""}`],
      ].join(" ")}
      style={
        currentUser?.cover
          ? {
              backgroundImage: `url(${urlPhotos}/${currentUser?.cover})`,
            }
          : null
      }
    >
      <div className={styles.header__container}>
        {currentUser?.id && (
          <div className={styles.header__avatar}>
            <img
              src={
                currentUser?.avatar
                  ? `${urlAvatars}/${currentUser.avatar}`
                  : no_avatar
              }
              className={styles[`header__avatar-img`]}
              alt="avatar"
            />
          </div>
        )}
        {currentUser?.id && (
          <div className={styles.header__info}>
            <div className={styles.header__title}>{currentUser.name}</div>

            <div className={styles.header__text}>{currentUser.description}</div>
          </div>
        )}
        {(!currentUser || !currentUser.id) && (
          <Link to={`/#/auth`}>
            <div className={styles[`header__button-auth`]}>
              <Button
                type={"button"}
                title={"На страницу логин / регистрация"}
                text={"Логин и регистрация"}
                classes={{
                  icon: "space",
                  size: "changing_withtext",
                  theme: "color_changing",
                }}
                icon={"user"}
              />
            </div>
          </Link>
        )}
        {currentUser?.id && (
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
              click={handleLogout}
            />
          </div>
        )}
      </div>

      <Nav />

      {/* <div className={styles[`header__edit-header`]}>
        <div className={styles[`edit-header`]}>
          <div className={styles[`edit-header__post`]}>
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
  removeCurrentUser: (userId) => actionsUsers.removeCurrentUser(userId),
  removeCurrentUserPosts: actionsPosts.removeCurrentUserPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
