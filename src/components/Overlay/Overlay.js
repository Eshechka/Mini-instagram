import styles from "./Overlay.module.scss";

export function Overlay({color = "black"}) {
  return (
    <div
      className={[styles.overlay, styles[`overlay_${color}`]].join(" ")}
    ></div>
  );
}
