import {useRef, useState, useEffect} from "react";

import {Link} from "react-router-dom";

import {Button} from "../Button/Button";

import {urlPhotos, urlAvatars} from "../../helpers/requests";
import no_avatar from "../../img/no_avatar.png";

import styles from "./PostSlide.module.scss";
import {apiToggleLike} from "../../helpers/api.js";

export default function PostSlide({
  postdata,
  currentUser = {},
  updateLikes = Function.prototype,
  hiddenLikes = false,
}) {
  useEffect(() => {
    if (postdata && postdata.likes.length && currentUser.id) {
      const isLikeByCurrentUser = postdata.likes.findIndex(
        (like) => like === currentUser.id
      );
      setIsLike(isLikeByCurrentUser !== -1);
    }
  }, []);

  const likesCounter = useRef(null);
  const [isLike, setIsLike] = useState(false);

  const toggleLike = async () => {
    if (currentUser.id) {
      const isToggleLike = await apiToggleLike(postdata.id, currentUser.id);
      if (isToggleLike) {
        updateLikes(
          postdata.id,
          currentUser.id,
          isLike ? "removeLike" : "addLike"
        );
        setIsLike(!isLike);
      } else {
        console.warn("Не удалось обновить лайки поста");
      }
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
          <Link
            className={styles[`big-post__link`]}
            to={`/${postdata.author.id}`}
          >
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
            <div className={styles[`big-post__name`]}>
              {postdata.author.name}
            </div>
          </Link>

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
                disabled={!currentUser.id}
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
      </div>
    </div>
  );
}
