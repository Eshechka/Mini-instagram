import styles from "./UserPage.module.scss";

import {Button} from "../../components/Button/Button";
import {CardList} from "../../components/CardList/CardList";
import {Overlay} from "../../components/Overlay/Overlay";

import {useState, useEffect} from "react";

import renderer from "../../helpers/renderer";
import store from "../../store/store";

import svgSprite from "../../img/spriteIcons.svg";

export function UserPage() {
  const [openAddPhoto, setOpenAddPhoto] = useState(false);
  const [isPhotoValid, setIsPhotoValid] = useState(false);
  const [renderedPhoto, setRenderedPhoto] = useState({pic: ""});
  const [loadedPhoto, setLoadedPhoto] = useState({});
  const [titleBtnAddPhoto, setTitleBtnAddPhoto] = useState(
    "Добавьте фотграфию размером не более 2Мб"
  );

  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(
      store.getState().cards.allCards.filter((card) => card.author.id === 32)
    );
  }, []);

  const addPhoto = (e) => {
    //async
    e.preventDefault();

    if (renderedPhoto.length) {
      if (isPhotoValid) {
        const formData = new FormData();

        formData.append("photo", loadedPhoto);
        formData.append("title", loadedPhoto.title);
        formData.append("description", loadedPhoto.description);
        formData.append("authorId", 32); //!!!!!!!хардкод
        formData.append("albumId", 82); //!!!!!!!хардкод

        // await this.addCard(formData);//потом тут будет action//!!!!!
        // const {data} = await $axios.post("/v1/photos", formData, {
        //   headers: {"Content-Type": "multipart/form-data"},
        // });
        // const response = await $axios.get(
        //   `/v1/photos/${data.card.id}`,
        //   {params: {include: "author,comments,likes"}},
        //   {"Content-Type": "application/json"}
        // );
      } else {
        console.log("file's not valide"); //!!!!!!! validation
      }
    } else console.log("no file"); //!!!!!!! validation
  };

  const loadPhotoFile = (e) => {
    const loadingPhoto = e.target.files[0];
    if (loadingPhoto.size / 1024 < 2048) {
      renderer(loadingPhoto).then((pic) => {
        setRenderedPhoto({pic: pic});

        const newLoadedPhotoData = {
          title: "Тут потом будет название фото",
          description:
            "Тут потом будет какое-то описание фотки, ну да, конечно, не менее 60 символов",
        };
        setLoadedPhoto({...loadingPhoto, ...newLoadedPhotoData});

        setTitleBtnAddPhoto(
          "Для отправки необходимо добавить название и описание фотографии"
        );
        setIsPhotoValid(true);
      });
    } else {
      setTitleBtnAddPhoto(
        "Не удалось загрузить файл. Максимальный размер загружаемого файла 2Mб"
      );
      setIsPhotoValid(false);
    }
  };

  return (
    <section className={styles[`my-photos`]}>
      <div className={styles[`my-photos__container`]}>
        <div className={styles[`my-photos__topgroup`]}>
          <div className={styles[`my-photos__title`]}>Мои фотографии</div>
          <div className={styles[`my-photos__button-plus`]}>
            <Button
              type={"button"}
              title={"Добавить фотографию"}
              classes={{
                icon: "icon_expand",
                size: "s",
                theme: "pale",
              }}
              icon={"plus"}
              click={() => setOpenAddPhoto(true)}
            />
          </div>
        </div>

        {cards && <CardList cards={cards} view={"alternative"} />}
        <ul className={styles[`my-photos__photos-list`]}>
          <li className={styles[`my-photos__photos-item`]}></li>
        </ul>
      </div>

      {openAddPhoto ? <Overlay /> : null}
      {openAddPhoto ? (
        <div className={styles[`my-photos__add-photo`]}>
          <div className={styles[`add-photo`]}>
            <div className={styles[`add-photo__card`]}>
              <div className={styles[`add-photo__topgroup`]}>
                <h2 className={styles[`add-photo__title">`]}>
                  Добавить фотографию
                </h2>
                <Button
                  type={"button"}
                  title={"Закрыть форму добавления фотографий без сохранения"}
                  classes={{
                    icon: "",
                    size: "s",
                    theme: "minimalizm",
                  }}
                  icon={"close"}
                  click={() => setOpenAddPhoto(false)}
                />
              </div>

              <div className={styles[`add-photo__form`]}>
                <form
                  className={styles[`form-addPhoto`]}
                  onSubmit={(e) => addPhoto(e)}
                >
                  <div className={styles[`form-addPhoto__load-cover`]}>
                    {isPhotoValid && (
                      <div className={styles[`form-addPhoto__added-photo`]}>
                        <div className={styles[`added-photo`]}>
                          {renderedPhoto && (
                            <div
                              style={{
                                backgroundImage: `url(${renderedPhoto.pic})`,
                              }}
                              className={styles[`added-photo__item`]}
                            >
                              {/* <div
                                className={styles[`added-photo__close-button`]}
                              >//!!!!!!!!! добавить функционал, если будет время
                                <Button
                                  type={"button"}
                                  title={"Удалить фото"}
                                  classes={{
                                    icon: "",
                                    size: "s",
                                    theme: "carrot",
                                  }}
                                  icon={"close"}
                                />
                              </div> */}
                            </div>
                          )}
                        </div>
                        <div
                          className={styles[`form-addPhoto__edit-photo-fields`]}
                        >
                          <label className={styles[`form-addPhoto__label`]}>
                            Название
                            <input
                              className={styles[`form-addPhoto__input`]}
                              type="text"
                              placeholder="Название фотографии"
                            />
                          </label>
                          <label className={styles[`form-addPhoto__label`]}>
                            Описание
                            <textarea
                              className={[
                                styles[`form-addPhoto__input`],
                                styles[`form-addPhoto__input_textarea`],
                              ].join(" ")}
                              cols="10"
                              rows="2"
                              placeholder="Описание фотографии"
                            ></textarea>
                          </label>
                        </div>
                      </div>
                    )}

                    {!isPhotoValid && (
                      <label
                        htmlFor="load-photo"
                        className={[
                          styles[`form-addPhoto__label`],
                          styles[`form-addPhoto__label_file-load`],
                        ].join(" ")}
                      >
                        <input
                          type="file"
                          id="load-photo"
                          className={styles[`form-addPhoto__input-load`]}
                          onChange={loadPhotoFile}
                        />

                        <svg
                          className={styles[`form-addPhoto__load-photo-img`]}
                        >
                          <use xlinkHref={`${svgSprite}#cam`}></use>
                        </svg>

                        <div
                          className={
                            styles[`form-addPhoto__load-photo-text-button`]
                          }
                        >
                          Выберите файл
                        </div>
                        <div
                          className={styles[`form-addPhoto__load-photo-text`]}
                        >
                          <span
                            className={
                              styles[`form-addPhoto__load-photo-drag-text`]
                            }
                          >
                            Перетащите фото сюда или{" "}
                          </span>
                          выберите файл
                        </div>
                      </label>
                    )}
                  </div>

                  <div className={styles[`form-addPhoto__buttons`]}>
                    <Button
                      type={"submit"}
                      title={titleBtnAddPhoto}
                      text={"Сохранить"}
                      classes={{
                        size: "m_withtext",
                        theme: "calm",
                      }}
                    />
                    <Button
                      type={"button"}
                      title={
                        "Закрыть форму добавления фотографии без сохранения"
                      }
                      text={"Отменить"}
                      classes={{
                        size: "m_withtext",
                        theme: "minimalizm",
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* 
        <div className={styles[`my-photos__big-card-slider`]}>
          <div className={styles[`big-card-slider`]}>
            <button
              title="Закрыть слайдер"
              className="big-card-slider__control big-card-slider__control_close"
              type="button"
            ></button>

            <button
              type="button"
              className="big-card-slider__control big-card-slider__control_prev"
            ></button>
            <button
              type="button"
              className="big-card-slider__control big-card-slider__control_next"
            ></button>
          </div>
        </div> */}
    </section>
  );
}
