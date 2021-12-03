import styles from "./Nav.module.scss";

import {Button} from "../Button/Button";

import {Link} from "react-router-dom";

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.nav__button}>
          <Link to={`/`}>
            <Button
              type={"button"}
              title={"Перейти на главную"}
              classes={{
                size: "m",
                theme: "transparent",
              }}
              icon={"home"}
            />
          </Link>
        </div>
        <div className={styles.nav__button}>
          <Link to={`/search`}>
            <Button
              type={"button"}
              title={"Перейти на страницу поиска"}
              classes={{
                size: "m",
                theme: "transparent",
              }}
              icon={"search"}
            />
          </Link>
        </div>
        <div className={styles.nav__button}>
          <Link to={`/32`}>
            {/* //!!!!!!!хардкод */}
            <Button
              type={"button"}
              title={"Перейти на главную"}
              classes={{
                size: "m",
                theme: "transparent",
              }}
              icon={"user"}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
