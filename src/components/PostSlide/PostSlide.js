import {useRef, useState, useEffect} from "react";

import {requests as $axios} from "../../helpers/requests.js";

import {Button} from "../Button/Button";

import {urlPhotos, urlAvatars} from "../../helpers/requests";
import no_avatar from "../../img/no_avatar.png";

import styles from "./PostSlide.module.scss";

export default function PostSlide({
  postdata,
  currentUser,
  updateLikes = Function.prototype,
  hiddenLikes = false,
}) {
  useEffect(() => {
    if (postdata && postdata.likes.length) {
      const isLikeByCurrentUser = postdata.likes.findIndex(
        (like) => like === currentUser.id
      );
      setIsLike(isLikeByCurrentUser !== -1);
    }
  }, []);

  const likesCounter = useRef(null);
  const [isLike, setIsLike] = useState(false);

  const toggleLike = async () => {
    const {data} = await $axios.post(
      `/v1/photos/${postdata.id}/likes`,
      currentUser.id
    );
    if (data.message === "Like обновлен!") {
      updateLikes(
        postdata.id,
        currentUser.id,
        isLike ? "removeLike" : "addLike"
      );
      setIsLike(!isLike);
    } else {
      console.warn("Не удалось обновить лайки поста");
    }
  };

  return (
    <div className={styles[`big-post`]}>
      <div className={styles[`big-post__post`]}>
        <div className={styles[`big-post__post-img`]}>
          <img
            className={styles[`big-post__img`]}
            src={`${urlPhotos}/${postdata.photo}`}
            alt={postdata.title}
          />
        </div>

        <div className={styles[`big-post__author-info`]}>
          <div className={styles[`big-post__avatar`]}>
            <img
              className={styles[`big-post__avatar-img`]}
              alt="avatar"
              src={
                postdata.author.avatar
                  ? `${urlAvatars}/${postdata.author.avatar}`
                  : no_avatar
              }
            />
          </div>

          <div className={styles[`big-post__name`]}>{postdata.author.name}</div>

          {!hiddenLikes ? (
            <div className={styles[`big-post__likes`]}>
              <Button
                ref={likesCounter}
                type={"button"}
                title={"Число лайков"}
                classes={{
                  icon: "sign",
                  size: "s",
                  theme: "signs",
                }}
                icon={"heart"}
                isActiveClass={isLike}
                click={toggleLike}
              />
              <span className={styles[`big-post__button-likes`]}>
                {postdata.likesCount || postdata.likes.length}
              </span>
            </div>
          ) : null}
        </div>

        <div className={styles[`big-post__desc`]}>
          <div className={styles[`big-post__title`]}>{postdata.title}</div>

          <div className={styles[`big-post__desc-text`]}>
            {postdata.description}
          </div>
        </div>

        {/* <div className={styles[`big-post__comments`]}>
          <div className={styles[`big-post__comments-topgroup`]}>
            <h4 className={styles[`big-post__comments-title`]}>Комментарии</h4>
            <button
              type="button"
              className={styles[`big-post__button-tick`]}
            ></button>
          </div>

          <div
            className={styles[`big-post__my-comment`]}
          >
            <div className={styles[`big-post__my-comment-avatar-wrapper`]}>
              <img
                className={styles[`big-post__my-comment-avatar`]}
                src={`${urlAvatars}/${currentUser.avatar}`}
                alt="my avatar"
              />
            </div>
            <div className={styles[`big-post__my-comment-info`]}>
              <div className={styles[`big-post__my-comment-name`]}>
                {currentUser.name}
              </div>

              <form className={styles[`big-post__my-comment-form`]}>
                <textarea
                  className={styles[`big-post__my-comment-input`]}
                  cols="10"
                  rows="1"
                  placeholder="Добавить комментарий"
                ></textarea>
                <div className={styles[`big-post__my-comment-submit`]}>
                  <Button
                    type={"submit"}
                    title={"Добавить"}
                    text={"Добавить"}
                    classes={{
                      size: "m_withtext",
                      theme: "light",
                    }}
                    // click={() => setOpenAddPost(true)}
                  />
                </div>
              </form>
            </div>
          </div> */}

        {/*<div
            className="big-post__users-comments"
            // :style="{height: heightUsersComments}"
          >
            <ul className="users-comments">
              <li

              className="users-comments__item"
              >
                <div className="users-comments__avatar-wrapper">
                  <img
                    className="users-comments__avatar"
                    // src={`${urlAvatars}/${comment.author.avatar}`}
                    alt="Avatar of comment's author"
                  />
                </div>
                <div className="users-comments__info-wrapper">
                  <div className="users-comments__author">
                    {/* {{comment.author.name}} 
                  </div>
                  <div className="users-comments__text">
                    {/* {{comment.commentText}} 
                  </div>
                  <textarea
                    className="users-comments__edited-text"
                  ></textarea>
                </div>

                <div className="users-comments__buttons-wrapper">
                  <button
                    type="button"
                    title="Нажмите для редактирования этого комментария"
                    className="button button_icon button_size_s_m button_theme_pale users-comments__buttonspace"
                  >
                    <span className="button__text">Редактировать</span>
                    <span className="button__icon button__icon_edit"></span>
                  </button>
                  <button
                    type="button"
                    title="Нажмите для удаления этого комментария"
                    className="button button_icon button_size_s_m button_theme_carrot"
                  >
                    <span className="button__text">Удалить</span>
                    <span className="button__icon button__icon_delete"></span>
                  </button>
                  <button
                    type="button"
                    className="button button_size_m"
                    // :title="$v.changedComment.$invalid ? 'Необходимо исправить текст' : 'Сохранить изменения' "
                  >
                    Сохранить
                  </button>
                </div>
              </li>
            </ul>
          </div>*/}
        {/* </div> */}
      </div>
    </div>
  );
}
