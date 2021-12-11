import {connect} from "react-redux";

import {Button} from "../Button/Button";

import {urlPhotos} from "../../helpers/requests.js";

import styles from "./Footer.module.scss";
import logo from "../../logo.svg";

function Footer({currentUser, view = ""}) {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer
      className={[
        styles.footer,
        styles[
          `${!currentUser || !currentUser.id ? "footer_view_logout" : ""}`
        ],
        styles[`${view ? `footer_${view}` : ""}`],
      ].join(" ")}
      style={
        currentUser?.cover && view !== "view_logout"
          ? {
              backgroundImage: `url(${urlPhotos}/${currentUser?.cover})`,
            }
          : null
      }
    >
      <div className={styles.footer__container}>
        {view !== "view_logout" ? (
          <div className={styles[`footer__button-up`]}>
            <Button
              type={"button"}
              title={"Вернуться в начало страницы"}
              classes={{
                icon: "expand",
                size: "s",
                theme: "calm",
              }}
              icon={"top"}
              click={scrollToTop}
            />
          </div>
        ) : null}
        <div className={styles.footer__logo}>
          <img src={logo} alt="Logotype" />
        </div>
        <div className={styles.footer__desc}>
          Mini-instagram | &copy; {new Date().getFullYear()}
        </div>
        <div className={styles.footer__copyright}>
          <span className={styles[`footer__copyright-text`]}>
            Создатель проекта &nbsp;
          </span>
          <a
            className={styles.footer__link}
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://vk.com/id594716031"
          >
            Lidia&nbsp;
          </a>
          &nbsp;
          <a
            target="_blabk"
            rel="noopener noreferrer nofollow"
            className={[styles.footer__link, styles.footer__link_torepo].join(
              " "
            )}
            href="https://github.com/Eshechka/mini-instagram.git"
          >
            Github repository
          </a>
        </div>
      </div>
    </footer>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps, null)(Footer);
