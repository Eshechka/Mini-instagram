import styles from "./Button.module.scss";
import svgSprite from "../../img/spriteIcons.svg";

export function Button({type, title, classes, text, icon}) {
  return (
    <button
      type={type}
      title={title}
      className={[
        styles.button,
        classes.icon ? styles[`button_icon_${classes.icon}`] : "",
        classes.size ? styles[`button_size_${classes.size}`] : "",
        classes.theme ? styles[`button_theme_${classes.theme}`] : "",
      ].join(" ")}
    >
      <span className={styles.button__text}>{text}</span>
      <svg
        className={[
          styles.button__icon,
          icon ? styles[`button__icon_${icon}`] : "",
        ].join(" ")}
      >
        <use xlinkHref={`${svgSprite}#${icon}`}></use>
      </svg>
    </button>
  );
}
