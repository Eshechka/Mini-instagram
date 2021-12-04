// import logo from "./logo.svg";
import {Route, Routes} from "react-router-dom";

import {UserPage} from "./pages/UserPage/UserPage";
import {SearchPage} from "./pages/SearchPage/SearchPage";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";
import {AuthPage} from "./pages/AuthPage/AuthPage";

import HomePageContainer from "./pages/HomePage/HomePageContainer";

import "./App.scss";

function App() {
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
        <Route exact path="/" element={<HomePageContainer />} />
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/:id" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
