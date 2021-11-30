import styles from "./Footer.module.scss";

// import svgSprite from "../../img/spriteIcons.svg";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles[`footer__button-up`]}>
          <button
            title="Вернуться в начало страницы"
            className={[
              styles.button,
              styles.button_size_s,
              styles.button_icon_expand,
              styles.button_theme_pale,
            ].join(" ")}
          >
            <span
              className={[styles.button__icon, styles.button__icon_up].join(
                " "
              )}
            ></span>
          </button>
        </div>
        <div className={styles.footer__desc}>Mini-instagram</div>
        <div className={styles.footer__copyright}>
          &copy; {new Date().getFullYear()} | Создатель проекта &nbsp;
          <a target="_blank" rel="noreferrer" href="https://vk.com/id594716031">
            Lidia
          </a>
          &nbsp;
          <a
            target="_blabk"
            rel="noopener noreferrer nofollow"
            className={styles.footer__link}
            href="https://github.com/Eshechka/mini-instagram.git"
          >
            Github repository
          </a>
        </div>
      </div>
    </footer>
  );
}
