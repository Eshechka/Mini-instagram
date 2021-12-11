import {connect} from "react-redux";
import * as actionsUsers from "../../store/users.actions.js";

import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import {Button} from "../../components/Button/Button";

import {requests as $axios} from "../../helpers/requests";

import defaultCover from "../../img/no_album_cover.jpg";

import styles from "./AuthPage.module.scss";

function AuthPage({currentUser, setCurrentUser}) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");

  const [isModeSignUp, setIsModeSignUp] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const container = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const {data} = await $axios.post("/register", {
      email: registerEmail,
      name: registerName,
      password: registerPassword,
      password_confirmation: registerPasswordConfirm,
    });
    const dataNewUser = data;

    if (dataNewUser.access_token && dataNewUser.user) {
      $axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${dataNewUser.access_token}`;

      const formData = new FormData();

      const previewFile = new File([""], defaultCover);

      formData.append("preview", previewFile);
      formData.append("title", "default Album");
      formData.append(
        "description",
        "default Album for mini-instagram user default Album for mini-instagram user"
      );
      formData.append("authorId", dataNewUser.user.id);

      const {data} = await $axios.post("/v1/albums", formData, {
        headers: {"Content-Type": "multipart/form-data"},
      });
      const defaultAlbumData = data.album;

      if (defaultAlbumData.id) {
        localStorage.setItem(
          "mini-inst-user",
          JSON.stringify({
            id: dataNewUser.user.id,
            token: dataNewUser.access_token,
            idDefaultAlbum: defaultAlbumData.id,
          })
        );
        setCurrentUser(dataNewUser.user);

        navigate("/");
      } else {
        console.warn(
          "Ошибка при создании дефолтного альбома юзера id = ",
          dataNewUser.user.id
        );
      }
    } else {
      console.warn(
        "Ошибка при регистрации юзера: нет токена и/или юзера в ответе"
      );
    }
  };
  const handleSignIn = async (e) => {
    e.preventDefault();

    const user = {
      email: loginEmail,
      password: loginPassword,
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
      if (data && data.albums.length) {
        localStorage.setItem(
          "mini-inst-user",
          JSON.stringify({
            id: dataUser.user.id,
            token: dataUser.access_token,
            idDefaultAlbum: data.albums[0].id,
          })
        );

        setCurrentUser({...dataUser.user, idDefaultAlbum: data.albums[0].id});
        navigate("/");
      } else {
        console.warn(
          `Нет данных о юзере или у юзера id=${data.user.id} нет дефолтного альбома`
        );
      }
    } else {
      console.warn(`Ошибка при логине юзера: нет токена и/или юзера в ответе`);
    }
  };

  function toggleMode() {}

  return (
    <>
      <main className={styles.maincontent}>
        <div className={styles.auth}>
          <div
            ref={container}
            className={[
              styles.auth__container,
              styles[`right-panel-active`],
              isModeSignUp ? styles.auth__container_is_signup : "",
            ].join(" ")}
          >
            <div className={styles.auth__toggler}>
              <Button
                type={"button"}
                title={isModeSignUp ? "To Sign In" : "To Sign Up"}
                text={isModeSignUp ? "To Sign In" : "To Sign Up"}
                classes={{
                  size: "m_withtext",
                  theme: "base",
                }}
                click={() => setIsModeSignUp(!isModeSignUp)}
              />
            </div>
            <div
              className={[styles.auth__form, styles[`container--signup`]].join(
                " "
              )}
            >
              <form
                action="#"
                className={styles[`auth-form`]}
                id="form1"
                onSubmit={handleSignUp}
              >
                <h2 className={styles[`auth-form__title`]}>Sign Up</h2>
                <input
                  type="text"
                  placeholder="Name"
                  className={styles.input}
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password confirmation"
                  className={styles.input}
                  value={registerPasswordConfirm}
                  onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                />
                <div
                  className={[
                    styles[`auth-form__btn`],
                    styles[`auth-form__btn_signin`],
                  ].join(" ")}
                >
                  <Button
                    type={"submit"}
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
              <form
                action="#"
                className={styles[`auth-form`]}
                id="form2"
                onSubmit={handleSignIn}
              >
                <h2 className={styles[`auth-form__title`]}>Sign In</h2>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <div
                  className={[
                    styles[`auth-form__btn`],
                    styles[`auth-form__btn_signin`],
                  ].join(" ")}
                >
                  <Button
                    type={"submit"}
                    title={"Sign In"}
                    text={"Sign In"}
                    classes={{
                      size: "m_withtext",
                      theme: "base",
                    }}
                    // click={handleSignIn}
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};
const mapDispatchToProps = {
  setCurrentUser: (user) => actionsUsers.setCurrentUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
