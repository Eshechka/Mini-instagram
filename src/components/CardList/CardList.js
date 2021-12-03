import {Card} from "../Card/Card";
import styles from "./CardList.module.scss";

export function CardList({cards}) {
  return (
    <ul className={styles.cardlist}>
      {cards.map((card) => {
        return (
          <li className={styles.cardlist__item}>
            <Card key={card.id} card={card} />
          </li>
        );
      })}
    </ul>
  );
}
