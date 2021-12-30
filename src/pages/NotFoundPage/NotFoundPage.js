import styles from "./NotFoundPage.module.scss";
import {Button} from "../../components/Button/Button";
import {Link} from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="maincontent">
      <div className={styles[`not-found`]}>
        <Link to={`/`} className={styles[`not-found__link`]}>
          <Button
            type={"button"}
            title={"Перейти на главную"}
            text={"Перейти на главную"}
            classes={{
              size: "m_withtext",
              theme: "pale",
            }}
          />
        </Link>
      </div>
    </div>
  );
}
