import {Button} from "../../components/Button/Button";
import styles from "./UserPage.module.scss";

import {requests as $axios} from "../../helpers/requests.js";
import {useState} from "react";

import renderer from "../../helpers/renderer";

export function UserPage() {
  const [openAddPhoto, setOpenAddPhoto] = useState(false);
  const [isPhotoValid, setIsPhotoValid] = useState(false);
  const [renderedPhotos, setRenderedPhotos] = useState([]);
  const [loadedPhotos, setLoadedPhotos] = useState([]);

  const addPhoto = async (e) => {
    e.preventDefault();

    if (renderedPhotos.length) {
      if (isPhotoValid) {
        const formData = new FormData();

        formData.append("photo", loadedPhotos[0]);
        formData.append("title", loadedPhotos[0].title);
        formData.append("description", loadedPhotos[0].description);
        formData.append("authorId", 32); //!!!!!!!хардкод
        formData.append("albumId", 82); //!!!!!!!хардкод

        // await this.addCard(formData);//потом тут будет action
        const {data} = await $axios.post("/v1/photos", formData, {
          headers: {"Content-Type": "multipart/form-data"},
        });
        const response = await $axios.get(
          `/v1/photos/${data.card.id}`,
          {params: {include: "author,comments,likes"}},
          {"Content-Type": "application/json"}
        );
        console.log("!!!response!!! ", response);
      } else {
        console.log("file's not valide"); //!!!!!!! validation
      }
    } else console.log("no file"); //!!!!!!! validation
  };

  const loadPhotoFile = async (e) => {
    let notLoadedFiles = 0;
    let titleDisabledBtnAddPhoto = "";

    console.log("!!!file size!!! ", e.target.files[0].size / 1024);
    if (e.target.files[0].size / 1024 < 2048) {
      loadedPhotos.push(e.target.files[0]);
      setRenderedPhotos(renderedPhotos.push({pic: "", id: 0}));
    } else {
      notLoadedFiles++;
    }

    if (loadedPhotos.length === 0) {
      titleDisabledBtnAddPhoto =
        "Не удалось загрузить файл. Максимальный размер загружаемого файла 2Mб";

      setIsPhotoValid(false);
    } else {
      renderer(loadedPhotos[0]).then((pic) => {
        setRenderedPhotos((renderedPhotos[0].pic = pic));
        loadedPhotos[0].title = "Тут потом будет название фото";
        loadedPhotos[0].id = 0;
        loadedPhotos[0].description =
          "Тут потом будет какое-то описание фотки, ну да, кончно, не менее 60 символов";
      });
      console.log("!!!loadedPhotos!!! ", loadedPhotos);

      titleDisabledBtnAddPhoto =
        "Для отправки необходимо добавить названия и описания для всех фотографий";

      setIsPhotoValid(true);
    }
  };

  return (
    <>
      <section className={styles[`my-photos`]}>
        <div className={styles[`my-photos__container`]}>
          <div className={styles[`my-photos__topgroup`]}>
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

          <ul className={styles[`my-photos__photos-list`]}>
            <li className={styles[`my-photos__photos-item`]}></li>
          </ul>
        </div>
        {/* <div className={styles[`my-photos__edit-photo`]}>
          <div className={styles[`edit-photo`]}>
            <div className={styles[`edit-photo__card`]}>
              <div className={styles[`edit-photo__topgroup`]}>
                <h2 className={styles[`edit-photo__title`]}>Редактировать фотографию</h2>

                <Button
                  type={"button"}
                  title={"Редактировать фотографию"}
                  classes={{
                    size: "s",
                    theme: "minimalizm",
                  }}
                  icon={"close"}
                />
              </div>

              <div className="edit-photo__form">
                <form className="form-editPhoto">
                  <div className="form-editPhoto__confirmDeletePhoto"></div>

                  <label className="form-editPhoto__label">
                    Название
                    <input
                      className="form-editPhoto__input"
                      type="text"
                      placeholder="Название фотографии"
                    />
                  </label>
                  <div className="form-editPhoto__error form-editPhoto__error_title">
                    <span>Обязательно для заполнения</span>
                  </div>

                  <label className="form-editPhoto__label">
                    Описание
                    <textarea
                      className="form-editPhoto__input form-editPhoto__input_textarea"
                      cols="10"
                      rows="2"
                      placeholder="Описание фотографии"
                    ></textarea>
                  </label>
                  <div className="form-editPhoto__error form-editPhoto__error_description">
                    <span>Минимум символов в описании:</span>
                    <span>Максимум символов в описании:</span>
                    <span>Обязательно для заполнения</span>
                  </div>

                  <div className="form-editPhoto__buttons">
                    <Button
                      type={"submit"}
                      title={"Редактировать фотографию"}
                      text={"Сохранить"}
                      classes={{
                        size: "m_withtext",
                        other: ["form-editPhoto__buttonspace"],
                      }}
                    />

                    <Button
                      type={"button"}
                      title={
                        "Закрыть форму добавления фотографий без сохранения"
                      }
                      text={"Отменить"}
                      classes={{
                        size: "m_withtext",
                        theme: ["minimalizm"],
                      }}
                    />

                    <Button
                      type={"button"}
                      title={"Удалить фотографию"}
                      text={"Удалить"}
                      classes={{
                        icon: "",
                        size: "s_m",
                        theme: "carrot",
                        other: ["form-editPhoto__in"],
                      }}
                      icon={"delete"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> */}

        {openAddPhoto ? (
          <div className={styles[`my-photos__add-photo`]}>
            <div className={styles[`add-photo`]}>
              <div className={styles[`add-photo__card`]}>
                <div className={styles[`add-photo__topgroup`]}>
                  <h2
                    className={styles[`add-photo__title">Добавить фотографии`]}
                  ></h2>
                  <Button
                    type={"button"}
                    title={"Закрыть форму добавления фотографий без сохранения"}
                    classes={{
                      icon: "",
                      size: "s",
                      theme: "minimalizm",
                    }}
                    icon={"close"}
                  />
                </div>

                <div className={styles[`add-photo__form`]}>
                  <form
                    className={styles[`form-addPhoto`]}
                    onSubmit={(e) => addPhoto(e)}
                  >
                    <div className={styles[`form-addPhoto__album-name-label`]}>
                      Название
                      <span
                        className={styles[`form-addPhoto__album-name`]}
                        type="text"
                      ></span>
                    </div>

                    <div className={styles[`form-addPhoto__load-cover"`]}>
                      <div className={styles[`form-addPhoto__added-photos`]}>
                        <ul className={styles[`added-photos"`]}>
                          <li className={styles[`added-photos__item"`]}>
                            <Button
                              type={"button"}
                              title={"Удалить фото из списка загрузки"}
                              classes={{
                                icon: "",
                                size: "s",
                                theme: "carrot",
                                other: ["added-photos__close-button"],
                              }}
                              icon={"close"}
                            />
                            <Button
                              type={"button"}
                              title={
                                "Редактировать название и описание фотографии"
                              }
                              classes={{
                                icon: "",
                                size: "xs",
                                theme: "calm",
                                other: ["added-photos__edit-button"],
                              }}
                              icon={"edit"}
                            />
                            <span
                              title="Описание фото успешно сохранено"
                              className={styles[`added-photos__valid-sign`]}
                            ></span>
                            <span
                              title="Необходимо добавить название и описание фото"
                              className={styles[`added-photos__invalid-sign`]}
                            ></span>
                          </li>
                        </ul>
                      </div>

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
                          // multiple="multiple"
                          className={styles[`form-addPhoto__input-load`]}
                          onChange={loadPhotoFile}
                        />
                        <div
                          className={styles[`form-addPhoto__load-photo-img`]}
                        ></div>

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
                    </div>

                    <div className={styles[`form-addPhoto__buttons`]}>
                      <Button
                        type={"submit"}
                        title={"Сохранить фотографию"}
                        text={"Сохранить"}
                        classes={{
                          size: "m_withtext",
                          theme: "calm",
                          other: ["added-photos__edit-button"],
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
    </>
  );
}
