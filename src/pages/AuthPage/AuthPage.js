import styles from "./AuthPage.module.scss";

import Footer from "../../components/Footer/Footer";
import {Button} from "../../components/Button/Button";

import {useRef} from "react";

import {requests as $axios} from "../../helpers/requests";

export function AuthPage({currentUser, setCurrentUser}) {
  const container = useRef(null);

  const handleSignIn = async () => {
    const user = {
      //хардкод!!!!!!!
      email: "some@some.ru",
      password: "gfhjkm",
    };
    const {data} = await $axios.post("/login", user);
    const dataUser = data;

    if (dataUser.access_token && dataUser.user) {
      setCurrentUser(dataUser.user);

      $axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${dataUser.access_token}`;

      const {data} = await $axios.get(
        `/v1/albums?where=author.id:eq:${dataUser.user.id}`
      );
      console.log("dataDefaultAlbum", data);
      if (
        //как написать это нормально??????????
        data &&
        data.albums &&
        data.albums[0] &&
        data.albums[0].id
      ) {
        localStorage.setItem(
          "mini-inst-user",
          JSON.stringify({
            id: dataUser.user.id,
            token: dataUser.access_token,
            idDefaultAlbum: data.albums[0].id,
          })
        );
      } else {
        console.warn(`У юзера id=${data.user.id} нет дефолтного альбома`);
      }
    }
  };

  //при регистрации надо будет добавить новый дефолтный альбом
  // const addAlbum = async (e) => {
  //   const loadedCover = e.target.files[0];

  //   const formData = new FormData();
  //   formData.append("preview", loadedCover);
  //   formData.append("title", "defaultdefault");
  //   formData.append(
  //     "description",
  //     "defaultdefaultdefaultdefaultdefaultdefaultdefaultdefaultdefaultdefault"
  //   );
  //   formData.append("authorId", 32);

  // const {data} = await $axios.post("/v1/albums", formData, {
  //   headers: {"Content-Type": "multipart/form-data"},
  // });
  // };

  return (
    <>
      <main className={styles.maincontent}>
        <div className={styles.auth}>
          <div
            ref={container}
            className={[
              styles.auth__container,
              styles[`right-panel-active`],
            ].join(" ")}
          >
            <div
              className={[styles.auth__form, styles[`container--signup`]].join(
                " "
              )}
            >
              <form action="#" className={styles[`auth-form`]} id="form1">
                <h2 className={styles[`auth-form__title`]}>Sign Up</h2>
                <input
                  type="text"
                  placeholder="User"
                  className={styles.input}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                />
                <div
                  className={[
                    styles[`auth-form__btn`],
                    styles[`auth-form__btn_signin`],
                  ].join(" ")}
                >
                  <Button
                    type={"button"}
                    title={"Sign Up"}
                    text={"Sign Up"}
                    classes={{
                      size: "m_withtext",
                      theme: "base",
                    }}
                  />
                </div>
              </form>
            </div>

            <div
              className={[styles.auth__form, styles[`container--signin`]].join(
                " "
              )}
            >
              <form action="#" className={styles[`auth-form`]} id="form2">
                <h2 className={styles[`auth-form__title`]}>Sign In</h2>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                />
                <div
                  className={[
                    styles[`auth-form__btn`],
                    styles[`auth-form__btn_signin`],
                  ].join(" ")}
                >
                  <Button
                    type={"button"}
                    title={"Sign In"}
                    text={"Sign In"}
                    classes={{
                      size: "m_withtext",
                      theme: "base",
                    }}
                    click={handleSignIn}
                  />
                </div>
              </form>
            </div>

            <div className={styles.auth__overlay}>
              <div className={styles.overlay}>
                <div
                  className={[
                    styles.overlay__panel,
                    styles[`overlay--left`],
                  ].join(" ")}
                >
                  <Button
                    type={"button"}
                    title={"TO Sign In"}
                    text={"Sign In"}
                    classes={{
                      size: "m_withtext",
                      theme: "base",
                    }}
                    click={() => {
                      container.current.classList.remove(
                        styles[`right-panel-active`]
                      );
                    }}
                  />
                </div>
                <div
                  className={[
                    styles.overlay__panel,
                    styles[`overlay--right`],
                  ].join(" ")}
                >
                  <Button
                    type={"button"}
                    title={"TO Sign Up"}
                    text={"Sign Up"}
                    classes={{
                      size: "m_withtext",
                      theme: "base",
                    }}
                    click={() => {
                      container.current.classList.add(
                        styles[`right-panel-active`]
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer view={"view_logout"} />
    </>
  );
}
