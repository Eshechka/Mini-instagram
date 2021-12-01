import styles from "./Nav.module.scss";
import {Button} from "../Button/Button";

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.nav__button}>
          <Button
            type={"button"}
            title={"Перейти на главную"}
            classes={{
              size: "m",
              theme: "transparent",
            }}
            icon={"home"}
          />
        </div>
        <div className={styles.nav__button}>
          <Button
            type={"button"}
            title={"Перейти на главную"}
            classes={{
              size: "m",
              theme: "transparent",
            }}
            icon={"search"}
          />
        </div>
        <div className={styles.nav__button}>
          <Button
            type={"button"}
            title={"Перейти на главную"}
            classes={{
              size: "m",
              theme: "transparent",
            }}
            icon={"user"}
          />
        </div>
      </div>
    </nav>
  );
}
