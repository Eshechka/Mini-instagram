// import logo from "./logo.svg";
import {connect} from "react-redux";
import * as actionsUser from "./store/users.actions.js";
import * as actionsPosts from "./store/posts.actions.js";

import React, {useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import UserPage from "./pages/UserPage/UserPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";

import {requests as $axios, tokenForAllPosts} from "./helpers/requests";

import "./App.scss";

function App({setCurrentUser, currentUser, setAllPosts}) {
  useEffect(() => {
    getUserData();
    getAllPosts();
  }, []);

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

  async function getAllPosts() {
    let token =
      currentUser && currentUser.token ? currentUser.token : tokenForAllPosts;

    const miniInstUser = JSON.parse(localStorage.getItem("mini-inst-user"));

    if (miniInstUser && miniInstUser.token) {
      token = miniInstUser.token;
    }

    $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

    const {data} = await $axios.get(
      `/v1/photos`,
      {
        params: {
          include: "author,comments,likes",
          sort: "createdAt:desc",
          limit: 20,
        },
      },
      {"Content-Type": "application/json"}
    );

    if (data.cards) {
      setAllPosts(data.cards);
    }
  }

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
        <Route
          exact
          path="/:id"
          element={
            !(currentUser && currentUser.id) ? (
              <Navigate to="/" />
            ) : (
              <UserPage />
            )
          }
        />
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
  setAllPosts: actionsPosts.setAllPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
