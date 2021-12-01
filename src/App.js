// import logo from "./logo.svg";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import "./App.scss";
import {HomePage} from "./pages/HomePage/HomePage";
import {UserPage} from "./pages/UserPage/UserPage";

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
        <UserPage />
        {/* <HomePage /> */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
