import styles from "./Overlay.module.scss";

export function Overlay({color = "black", click = Function.prototype}) {
  return (
    <div
      className={[styles.overlay, styles[`overlay_${color}`]].join(" ")}
      onClick={click}
    ></div>
  );
}
