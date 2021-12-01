import {Button} from "../Button/Button";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles[`footer__button-up`]}>
          <Button
            type={"button"}
            title={"Вернуться в начало страницы"}
            classes={{
              icon: "expand",
              size: "s",
              theme: "pale",
            }}
            icon={"top"}
          />
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
