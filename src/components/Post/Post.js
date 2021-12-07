import svgSprite from "../../img/spriteIcons.svg";

import styles from "./Post.module.scss";

import {urlPhotos} from "../../helpers/requests";

export function Post({post}) {
  return (
    <div className={styles.post}>
      <div className={styles[`post__img-post`]}>
        <img
          className={styles.post__img}
          src={`${urlPhotos}/${post.photo}`}
          alt={post.title}
        />
        <div className={styles[`post__img-overlay`]}></div>
      </div>

      <div className={styles.post__info}>
        {/* 
            <router-link className="post__avatar"
                tag="a"
                :to="'/'+post.author.id"
                :title="`Перейти в профиль пользователя ${post.author.name}`">
                <img className="post__avatar-img" :src="post.author.avatar ? `${urlAvatars}/${post.author.avatar}` : require('../img/no_avatar.png').default" alt="post avatar">
                <div className="post__avatar-overlay"></div>
            </router-link> */}

        <div className={styles.post__desc}>
          <div className={styles[`post__desc-title`]}> {post.title} </div>

          <div className={styles[`post__signs-wrapper`]}>
            <div className={styles.post__sign}>
              <svg
                className={[
                  styles[`post__sign-icon`],
                  styles[`post__sign-icon_comments`],
                ].join(" ")}
              >
                <use xlinkHref={`${svgSprite}#comments`}></use>
              </svg>
              <span className={styles[`post__sign-text`]}>
                {post.commentsCount}
              </span>
            </div>
            <div className={styles.post__sign}>
              <svg
                className={[
                  styles[`post__sign-icon`],
                  styles[`post__sign-icon_likes`],
                ].join(" ")}
              >
                <use xlinkHref={`${svgSprite}#like`}></use>
              </svg>
              <span className={styles[`post__sign-text`]}>
                {post.likesCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
