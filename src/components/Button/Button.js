import styles from "./Button.module.scss";
import svgSprite from "../../img/spriteIcons.svg";
import React from "react";

export const Button = React.forwardRef(
  (
    {
      type = "button",
      title = "",
      classes = [],
      text = "",
      icon = "",
      disabled = false,
      click = null,
      isActiveClass = false,
    },
    ref = null
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        title={title}
        disabled={disabled}
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
          isActiveClass ? styles.active : "",
        ].join(" ")}
        onClick={click ? click : null}
      >
        {text ? <span className={styles.button__text}>{text}</span> : null}
        {icon ? (
          <svg
            className={[
              styles.button__icon,
              styles[`button__icon_${icon}`],
            ].join(" ")}
          >
            <use xlinkHref={`${svgSprite}#${icon}`}></use>
          </svg>
        ) : null}
      </button>
    );
  }
);
