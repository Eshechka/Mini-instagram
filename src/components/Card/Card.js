import svgSprite from "../../img/spriteIcons.svg";

import styles from "./Card.module.scss";

import {urlPhotos} from "../../helpers/requests";

export function Card({card}) {
  return (
    <div className={styles.card}>
      <div className={styles[`card__img-card`]}>
        <img
          className={styles.card__img}
          src={`${urlPhotos}/${card.photo}`}
          alt={card.title}
        />
        <div className={styles[`card__img-overlay`]}></div>
      </div>

      <div className={styles.card__info}>
        {/* 
            <router-link className="card__avatar"
                tag="a"
                :to="'/'+card.author.id"
                :title="`Перейти в профиль пользователя ${card.author.name}`">
                <img className="card__avatar-img" :src="card.author.avatar ? `${urlAvatars}/${card.author.avatar}` : require('../img/no_avatar.png').default" alt="card avatar">
                <div className="card__avatar-overlay"></div>
            </router-link> */}

        <div className={styles.card__desc}>
          <div className={styles[`card__desc-title`]}> {card.title} </div>

          <div className={styles[`card__signs-wrapper`]}>
            <div className={styles.card__sign}>
              <svg
                className={[
                  styles[`card__sign-icon`],
                  styles[`card__sign-icon_comments`],
                ].join(" ")}
              >
                <use xlinkHref={`${svgSprite}#comments`}></use>
              </svg>
              <span className={styles[`card__sign-text`]}>
                {card.commentsCount}
              </span>
            </div>
            <div className={styles.card__sign}>
              <svg
                className={[
                  styles[`card__sign-icon`],
                  styles[`card__sign-icon_likes`],
                ].join(" ")}
              >
                <use xlinkHref={`${svgSprite}#like`}></use>
              </svg>
              <span className={styles[`card__sign-text`]}>
                {card.likesCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
