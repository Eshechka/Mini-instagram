import styles from "./Preloader.module.scss";

export function Preloader() {
  return (
    <div className={styles[`preloader`]}>
      <div className={styles[`preloader__wrapper`]}>
        <div
          className={[
            styles[`preloader__cube`],
            styles[`preloader__cube_1`],
          ].join(" ")}
        ></div>
        <div
          className={[
            styles[`preloader__cube`],
            styles[`preloader__cube_2`],
          ].join(" ")}
        ></div>
        <div
          className={[
            styles[`preloader__cube`],
            styles[`preloader__cube_4`],
          ].join(" ")}
        ></div>
        <div
          className={[
            styles[`preloader__cube`],
            styles[`preloader__cube_3`],
          ].join(" ")}
        ></div>
      </div>
    </div>
  );
}
