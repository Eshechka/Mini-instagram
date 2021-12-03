import {Card} from "../Card/Card";
import styles from "./CardList.module.scss";

export function CardList({cards, view}) {
  return (
    <ul className={[styles.cardlist, styles[`cardlist_${view}`]].join(" ")}>
      {cards.map((card) => {
        return (
          <li key={card.id} className={styles.cardlist__item}>
            <Card card={card} />
          </li>
        );
      })}
    </ul>
  );
}
