import {connect} from "react-redux";

import {Link} from "react-router-dom";

import {Button} from "../Button/Button";

import styles from "./Nav.module.scss";

export function Nav({currentUser}) {
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
        {currentUser && currentUser.id && (
          <div className={styles.nav__button}>
            <Link to={`/${currentUser.id}`}>
              <Button
                type={"button"}
                title={"Перейти на свою страницу"}
                classes={{
                  size: "m",
                  theme: "transparent",
                }}
                icon={"user"}
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps, null)(Nav);
