// import logo from "./logo.svg";
import {connect} from "react-redux";
import * as actionsUser from "./store/users.actions.js";
import React, {useEffect} from "react";

import {Navigate, Route, Routes} from "react-router-dom";

import UserPage from "./pages/UserPage/UserPage";
import {SearchPage} from "./pages/SearchPage/SearchPage";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";
import AuthPage from "./pages/AuthPage/AuthPage";

import HomePage from "./pages/HomePage/HomePage";

import {requests as $axios} from "./helpers/requests.js";

import "./App.scss";

function App({setCurrentUser, currentUser}) {
  useEffect(() => {
    async function getUserData() {
      const miniInstUser = JSON.parse(localStorage.getItem("mini-inst-user"));
      if (miniInstUser) {
        const {id, token, idDefaultAlbum} = miniInstUser;
        if (id && token) {
          $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
          const {data} = await $axios.post(`/v1/authors/${id}`);

          if (data.author) {
            setCurrentUser({
              ...data.author,
              token: token,
              idDefaultAlbum: idDefaultAlbum,
            });
          }
        }
      }
    }
    getUserData();
  }, []);

  return (
    <div className="app">
      {/*
        <div className="app__preloader">
          <div className="preloader">
            <div className="preloader__cube preloader__cube_1"></div>
            <div className="preloader__cube preloader__cube_2"></div>
            <div className="preloader__cube preloader__cube_4"></div>
            <div className="preloader__cube preloader__cube_3"></div>
          </div>
        </div> */}

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/auth"
          element={
            currentUser && currentUser.id ? <Navigate to="/" /> : <AuthPage />
          }
        />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/:id" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
  setCurrentUser: (user) => actionsUser.setCurrentUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
