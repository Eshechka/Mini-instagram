import {connect} from "react-redux";
import * as actionsPosts from "../../store/posts.actions.js";

import {requests as $axios} from "../../helpers/requests.js";

import {urlPhotos} from "../../helpers/requests";
import {Button} from "../Button/Button";

import svgSprite from "../../img/spriteIcons.svg";

import styles from "./Post.module.scss";

function Post({
  removePost,
  post,
  ndx,
  click = Function.prototype,
  hasDeleteFunctional = false,
}) {
  const deletePost = async (postId) => {
    if (hasDeleteFunctional) {
      const {data} = await $axios.delete(`/v1/photos/${postId}`, {
        headers: {"Content-Type": "application/json"},
      });

      if (data.message === "Deleted !") {
        removePost(postId);
      }
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles[`post__img-post`]} onClick={() => click(ndx)}>
        <img
          className={styles.post__img}
          src={`${urlPhotos}/${post.photo}`}
          alt={post.title}
        />
        <div className={styles[`post__img-overlay`]}></div>
      </div>

      <div className={styles.post__info}>
        {/* 
            <Link className="post__avatar"
                :to="'/'+post.author.id"
                :title="`Перейти в профиль пользователя ${post.author.name}`">
                <img className="post__avatar-img" src="post.author.avatar ? `${urlAvatars}/${post.author.avatar}` : no_avatar" alt="post avatar">
                <div className="post__avatar-overlay"></div>
            </Link> */}

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
          {hasDeleteFunctional ? (
            <div className={styles[`post__button-delete`]}>
              <Button
                type={"button"}
                title={"Удалить пост"}
                classes={{
                  icon: "",
                  size: "s",
                  theme: "controls",
                }}
                icon={"delete"}
                click={() => deletePost(post.id)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  removePost: actionsPosts.removePost,
};

export default connect(null, mapDispatchToProps)(Post);
