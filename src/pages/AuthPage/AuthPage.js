import styles from "./AuthPage.module.scss";

import {Footer} from "../../components/Footer/Footer";
import {Button} from "../../components/Button/Button";

import {useRef} from "react";

import store from "../../store/store";

export function AuthPage() {
  const container = useRef(null);

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
            {/* <!-- Sign Up --> */}
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
                <Button
                  type={"button"}
                  title={"Sign Up"}
                  text={"Sign Up"}
                  classes={{
                    size: "m_withtext",
                    theme: "base",
                  }}
                />
              </form>
            </div>

            {/* <!-- Sign In --> */}
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
                <Button
                  type={"button"}
                  title={"Sign In"}
                  text={"Sign In"}
                  classes={{
                    size: "m_withtext",
                    theme: "base",
                  }}
                />
              </form>
            </div>

            {/* <!-- Overlay --> */}
            <div className={styles.auth__overlay}>
              <div className={styles.overlay}>
                <div
                  className={[
                    styles.overlay__panel,
                    styles[`overlay--left`],
                  ].join(" ")}
                >
                  <div
                    className={[
                      styles[`auth__btn`],
                      styles[`auth__btn_signin`],
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
                </div>
                <div
                  className={[
                    styles.overlay__panel,
                    styles[`overlay--right`],
                  ].join(" ")}
                >
                  <div
                    className={[
                      styles[`auth__btn`],
                      styles[`auth__btn_signup`],
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
        </div>
      </main>

      <Footer />
    </>
  );
}
