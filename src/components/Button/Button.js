import styles from "./Button.module.scss";
import svgSprite from "../../img/spriteIcons.svg";

export function Button({
  type = "button",
  title = "",
  classes = [],
  text = "",
  icon = "",
  click = null,
}) {
  return (
    <button
      type={type}
      title={title}
      className={[
        styles.button,
        classes.icon
          ? styles[`button_icon_${classes.icon}`]
          : classes.icon === ""
          ? styles[`button_icon`]
          : "",
        classes.size ? styles[`button_size_${classes.size}`] : "",
        classes.theme ? styles[`button_theme_${classes.theme}`] : "",
        classes.other && classes.other.length ? classes.other.join(" ") : "",
      ].join(" ")}
      onClick={click ? click : null}
    >
      {text ? <span className={styles.button__text}>{text}</span> : null}
      {icon ? (
        <svg
          className={[styles.button__icon, styles[`button__icon_${icon}`]].join(
            " "
          )}
        >
          <use xlinkHref={`${svgSprite}#${icon}`}></use>
        </svg>
      ) : null}
    </button>
  );
}
