import {connect} from "react-redux";

import {useState} from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import {Button} from "../../components/Button/Button";
import {PostsList} from "../../components/PostsList/PostsList";
import {Overlay} from "../../components/Overlay/Overlay.js";
import BigPostSlider from "../../components/BigPostSlider/BigPostSlider.js";

import svgSprite from "../../img/spriteIcons.svg";

import styles from "./SearchPage.module.scss";

function SearchPage({allPosts}) {
  const [searchingWord, setSearchingWord] = useState("");
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [prevSearchingWord, setPrevSearchingWord] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  const [initialSlide, setInitialSlide] = useState(0);
  const [openBigPost, setOpenBigPost] = useState(false);

  function openBigPostSlider(slideNum) {
    setInitialSlide(slideNum);
    setOpenBigPost(true);
  }

  function handleSearch(e, word) {
    e.preventDefault();
    setPrevSearchingWord(word);
    if (word !== "") {
      const searchedPosts = allPosts.filter((post) => {
        const hasWord =
          (post.description + post.title)
            .toUpperCase()
            .indexOf(word.toUpperCase()) !== -1;
        if (hasWord) {
          return post;
        }
        return false;
      });

      setSearchedPosts(searchedPosts);
      // setPrevSearchingWord(word);
      setIsSearchEmpty(false);
    } else {
      setIsSearchEmpty(true);
    }
  }

  return (
    <>
      <Header />

      <main className="maincontent">
        <section className={styles.searched}>
          <div className={styles.searched__container}>
            <form
              className={styles[`form-search`]}
              onSubmit={(e) => handleSearch(e, searchingWord)}
            >
              <input
                type="search"
                placeholder={
                  isSearchEmpty
                    ? "Заполните поле поиска"
                    : "Введите слово для поиска постов"
                }
                className={[
                  styles[`form-search__input`],
                  isSearchEmpty ? styles[`form-search__input_empty`] : "",
                ].join(" ")}
                onChange={(e) => setSearchingWord(e.target.value)}
                onInput={() => setIsSearchEmpty(false)}
                value={searchingWord}
              />
              <button
                title="Нажмите для поиска"
                type="submit"
                className={styles[`form-search__submit`]}
              >
                <svg className={styles[`form-search__icon`]}>
                  <use xlinkHref={`${svgSprite}#search`}></use>
                </svg>
              </button>
            </form>

            {!searchedPosts.length && prevSearchingWord ? (
              <p className={styles.searched__text}>
                {`Увы, ничего не нашлось ничего по запросу '${prevSearchingWord}'`}
              </p>
            ) : null}

            {searchedPosts.length && prevSearchingWord ? (
              <p className={styles.searched__text}>
                <span className={styles.searched__amount}>
                  {`Количество найденных результатов по запросу '${prevSearchingWord}': ${searchedPosts.length}`}
                </span>
              </p>
            ) : null}

            {searchedPosts.length && prevSearchingWord ? (
              <PostsList click={openBigPostSlider} posts={searchedPosts} />
            ) : null}

            {openBigPost ? (
              <Overlay click={() => setOpenBigPost(false)} />
            ) : null}
            {openBigPost ? (
              <div className={styles[`searched__big-post-slider`]}>
                <BigPostSlider
                  posts={searchedPosts}
                  clickClose={() => {
                    setOpenBigPost(false);
                  }}
                  effectSlides="cube"
                  initialSlide={initialSlide}
                  idSlider={"searchedPostsSwiper"}
                  extraParams={{hidden: "likes"}}
                />
              </div>
            ) : null}

            {/* <div className={styles[`searched__button-show-more`]}>
              <Button
                type={"button"}
                title={"Показать больше результатов поиска"}
                text={"Показать ещё"}
                classes={{
                  size: "m_withtext",
                  theme: "light",
                }}
              />
            </div> */}
          </div>

          {/* /slider */}
        </section>
      </main>

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allPosts: state.posts.allPosts,
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps, null)(SearchPage);
