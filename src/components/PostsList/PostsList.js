import {Post} from "../Post/Post";
import styles from "./PostsList.module.scss";

export function PostsList({posts, view}) {
  return (
    <ul className={[styles.postslist, styles[`postslist_${view}`]].join(" ")}>
      {posts.map((post) => {
        return (
          <li key={post.id} className={styles.postslist__item}>
            <Post post={post} />
          </li>
        );
      })}
    </ul>
  );
}
