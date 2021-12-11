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

import {tokenForAllPosts} from "./helpers/requests";

import "./App.scss";
import {apiGetAllPostsWToken, apiGetUserDataWToken} from "./helpers/api.js";

function App({setCurrentUser, currentUser, setAllPosts}) {
  useEffect(() => {
    getAllPosts();
    getUser();
  }, []);

  async function getUser() {
    const miniInstUser = JSON.parse(localStorage.getItem("mini-inst-user"));
    if (miniInstUser) {
      const {id, token, idDefaultAlbum} = miniInstUser;
      if (id && token) {
        const user = await apiGetUserDataWToken(token, id);

        setCurrentUser({
          ...user,
          token: token,
          idDefaultAlbum: idDefaultAlbum,
        });
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

    const posts = await apiGetAllPostsWToken(token);
    setAllPosts(posts);
  }

  return (
    <div className="app">
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
  setAllPosts: actionsPosts.setAllPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
