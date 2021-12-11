import {connect} from "react-redux";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import * as postsActions from "../../store/posts.actions.js";

import {requests as $axios} from "../../helpers/requests";
import {getUserData, getUserPosts} from "../../helpers/api";

import {Button} from "../../components/Button/Button";
import {PostsList} from "../../components/PostsList/PostsList";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Overlay} from "../../components/Overlay/Overlay";
import BigPostSlider from "../../components/BigPostSlider/BigPostSlider.js";

import renderer from "../../helpers/renderer";

import svgSprite from "../../img/spriteIcons.svg";

import styles from "./UserPage.module.scss";

export function UserPage({
  setCurrentUserPosts,
  allPosts,
  currentUserPosts,
  currentUser,
  setUserPosts,
}) {
  const {id} = useParams();

  const [user, setUser] = useState({});

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [initialSlide, setInitialSlide] = useState(0);

  const [openAddPost, setOpenAddPost] = useState(false);
  const [openBigPost, setOpenBigPost] = useState(false);

  const [isPhotoValid, setIsPhotoValid] = useState(false);
  const [renderedPhoto, setRenderedPhoto] = useState({pic: ""});
  const [loadedPhoto, setLoadedPhoto] = useState({});
  const [titleBtnAddPost, setTitleBtnAddPost] = useState(
    "Добавьте фото размером не более 2Мб"
  );

  useEffect(() => {
    getUserWithPosts(id);
  }, [id, allPosts]);

  const getUserWithPosts = async (id) => {
    if (currentUser.id === id) {
      if (currentUser.idDefaultAlbum) {
        const currentUserPosts = allPosts.filter(
          (post) =>
            post.author.id === currentUser.id &&
            post.album.id === currentUser.idDefaultAlbum
        );
        setCurrentUserPosts(currentUserPosts);
        setUser({currentUser, posts: currentUserPosts});
      } else {
        console.warn("idDefaultAlbum is not provided");
      }
    } else {
      const userPosts = allPosts.filter((post) => post.author.id === +id);
      const userData = await getUserData(id);

      setUserPosts(userPosts);
      setUser({...userData, posts: userPosts});
    }
  };

  function openBigPostSlider(slideNum) {
    setInitialSlide(slideNum);
    setOpenBigPost(true);
  }

  function clearAddPostForm() {
    setOpenAddPost(false);
    setIsPhotoValid(false);
    setRenderedPhoto({pic: ""});
    setLoadedPhoto({});
    setTitleBtnAddPost("Добавьте фото размером не более 2Мб");
    setPostTitle("");
    setPostDescription("");
  }

  const addPost = async (e) => {
    e.preventDefault();

    if (renderedPhoto.pic) {
      if (isPhotoValid) {
        const formData = new FormData();

        formData.append("photo", loadedPhoto);
        formData.append("title", postTitle);
        formData.append("description", postDescription);
        formData.append("authorId", currentUser.id);
        formData.append("albumId", currentUser.idDefaultAlbum);

        const {data} = await $axios.post("/v1/photos", formData, {
          headers: {"Content-Type": "multipart/form-data"},
        });
        if (data.card) {
          const response = await $axios.get(
            `/v1/photos/${data.card.id}`,
            {params: {include: "author,comments,likes"}},
            {"Content-Type": "application/json"}
          );

          if (response.data.card) {
            setCurrentUserPosts([response.data.card, ...currentUserPosts]);
            setOpenAddPost(false);
            clearAddPostForm();
          } else {
            console.warn("Не удалось считать добавленный пост");
          }
        } else {
          console.warn("Не удалось добавить пост");
        }
      } else {
        console.warn("file's not valide");
      }
    } else console.warn("no file");
  };

  const loadPhotoFile = (e) => {
    const loadingPhoto = e.target.files[0];
    if (loadingPhoto.size / 1024 < 2048) {
      renderer(loadingPhoto).then((pic) => {
        setRenderedPhoto({pic: pic});
        setLoadedPhoto(loadingPhoto);

        setTitleBtnAddPost(
          "Для отправки необходимо добавить название и описание поста"
        );
        setIsPhotoValid(true);
      });
    } else {
      setTitleBtnAddPost(
        "Не удалось загрузить файл. Максимальный размер загружаемого файла 2Mб"
      );
      setIsPhotoValid(false);
    }
  };

  return (
    <>
      <Header />

      <main className="maincontent">
        <section className={styles[`my-posts`]}>
          <div className={styles[`my-posts__container`]}>
            <div className={styles[`my-posts__topgroup`]}>
              <div className={styles[`my-posts__title`]}>
                {user.id === currentUser.id
                  ? "Мои посты"
                  : `Посты юзера ${user.name}`}
              </div>
              {currentUser.id && (
                <div className={styles[`my-posts__button-plus`]}>
                  <Button
                    type={"button"}
                    title={"Добавить пост"}
                    classes={{
                      icon: "icon_expand",
                      size: "s",
                      theme: "pale",
                    }}
                    icon={"plus"}
                    click={() => setOpenAddPost(true)}
                  />
                </div>
              )}
            </div>
            {user.posts && (
              <PostsList
                posts={user.posts}
                click={openBigPostSlider}
                hasDeleteFunctional={true}
                view={"alternative"}
              />
            )}
          </div>

          {openAddPost ? <Overlay click={() => setOpenAddPost(false)} /> : null}
          {openAddPost ? (
            <div className={styles[`my-posts__add-post`]}>
              <div className={styles[`add-post`]}>
                <div className={styles[`add-post__card`]}>
                  <div className={styles[`add-post__topgroup`]}>
                    <h2 className={styles[`add-post__title">`]}>
                      Добавить пост
                    </h2>
                    <Button
                      type={"button"}
                      title={"Закрыть форму добавления поста"}
                      classes={{
                        icon: "",
                        size: "s",
                        theme: "minimalizm",
                      }}
                      icon={"close"}
                      click={() => setOpenAddPost(false)}
                    />
                  </div>

                  <div className={styles[`add-post__form`]}>
                    <form className={styles[`form-addPost`]} onSubmit={addPost}>
                      <div className={styles[`form-addPost__load-cover`]}>
                        {isPhotoValid && (
                          <div className={styles[`form-addPost__added-photo`]}>
                            <div className={styles[`added-photo`]}>
                              {renderedPhoto && (
                                <div
                                  style={{
                                    backgroundImage: `url(${renderedPhoto.pic})`,
                                  }}
                                  className={styles[`added-photo__item`]}
                                ></div>
                              )}
                            </div>
                            <div
                              className={
                                styles[`form-addPost__edit-post-fields`]
                              }
                            >
                              <label className={styles[`form-addPost__label`]}>
                                Название
                                <input
                                  className={styles[`form-addPost__input`]}
                                  type="text"
                                  placeholder="Название поста"
                                  value={postTitle}
                                  onChange={(e) => setPostTitle(e.target.value)}
                                />
                              </label>
                              <label className={styles[`form-addPost__label`]}>
                                Описание
                                <textarea
                                  className={[
                                    styles[`form-addPost__input`],
                                    styles[`form-addPost__input_textarea`],
                                  ].join(" ")}
                                  cols="10"
                                  rows="2"
                                  placeholder="Текст поста"
                                  value={postDescription}
                                  onChange={(e) =>
                                    setPostDescription(e.target.value)
                                  }
                                ></textarea>
                              </label>
                            </div>
                          </div>
                        )}

                        {!isPhotoValid && (
                          <label
                            htmlFor="load-photo"
                            className={[
                              styles[`form-addPost__label`],
                              styles[`form-addPost__label_file-load`],
                            ].join(" ")}
                          >
                            <input
                              type="file"
                              id="load-photo"
                              className={styles[`form-addPost__input-load`]}
                              onChange={loadPhotoFile}
                            />

                            <svg
                              className={styles[`form-addPost__load-photo-img`]}
                            >
                              <use xlinkHref={`${svgSprite}#cam`}></use>
                            </svg>

                            <div
                              className={
                                styles[`form-addPost__load-photo-text-button`]
                              }
                            >
                              Выберите файл
                            </div>
                            <div
                              className={
                                styles[`form-addPost__load-photo-text`]
                              }
                            >
                              <span
                                className={
                                  styles[`form-addPost__load-photo-drag-text`]
                                }
                              >
                                Перетащите фото сюда или{" "}
                              </span>
                              выберите файл
                            </div>
                          </label>
                        )}
                      </div>

                      <div className={styles[`form-addPost__buttons`]}>
                        <Button
                          type={"submit"}
                          title={titleBtnAddPost}
                          text={"Сохранить"}
                          classes={{
                            size: "m_withtext",
                            theme: "calm",
                          }}
                        />
                        <Button
                          type={"button"}
                          title={
                            "Закрыть форму добавления поста без сохранения"
                          }
                          text={"Отменить"}
                          classes={{
                            size: "m_withtext",
                            theme: "minimalizm",
                          }}
                          click={clearAddPostForm}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {openBigPost ? <Overlay click={() => setOpenBigPost(false)} /> : null}
          {openBigPost ? (
            <div className={styles[`my-posts__big-post-slider`]}>
              <BigPostSlider
                posts={user.posts}
                clickClose={() => {
                  setOpenBigPost(false);
                }}
                initialSlide={initialSlide}
                effectSlides="fade"
                idSlider={"usersPostsSwiper"}
              />
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allPosts: state.posts.allPosts,
    userPosts: state.posts.userPosts,
    currentUserPosts: state.posts.currentUserPosts,
    currentUser: state.users.currentUser,
  };
};
const mapDispatchToProps = {
  setUserPosts: postsActions.setUserPosts,
  setCurrentUserPosts: postsActions.setCurrentUserPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
