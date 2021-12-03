// import logo from "./logo.svg";
import {Navigate, Route, Routes} from "react-router-dom";

import {UserPage} from "./pages/UserPage/UserPage";
import {SearchPage} from "./pages/SearchPage/SearchPage";

import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import HomePageContainer from "./pages/HomePage/HomePageContainer";

import "./App.scss";

function App() {
  return (
    <div className="app">
      {/* <div className="app__overlay app__overlay_black"></div>
        <div className="app__overlay app__overlay_white"></div>
        <div className="app__preloader">
          <div className="preloader">
            <div className="preloader__cube preloader__cube_1"></div>
            <div className="preloader__cube preloader__cube_2"></div>
            <div className="preloader__cube preloader__cube_4"></div>
            <div className="preloader__cube preloader__cube_3"></div>
          </div>
        </div> */}
      <Header />

      <main className="app__maincontent maincontent">
        <Routes>
          <Route exact path="/" element={<HomePageContainer />} />
          <Route exact path="/search" element={<SearchPage />} />
          <Route exact path="/:id" element={<UserPage />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
