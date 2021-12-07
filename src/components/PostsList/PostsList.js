import {Post} from "../Post/Post";
import styles from "./PostsList.module.scss";

export function PostsList({posts, view, click}) {
  return (
    <ul className={[styles.postslist, styles[`postslist_${view}`]].join(" ")}>
      {posts.map((post, ndx) => {
        return (
          <li key={post.id} className={styles.postslist__item}>
            <Post post={post} ndx={ndx} click={click} />
          </li>
        );
      })}
    </ul>
  );
}
