import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import store from "./store/store";
import {Provider} from "react-redux";
import {setAllCards} from "./store/cards.actions";

let imitationCards = [
  {
    id: 395,
    title: "Тут потом будет название фото",
    description:
      "Тут потом будет какое-то описание фотки, ну да, кончно, не менее 60 символов",
    author: {
      id: 32,
    },
    album: {
      id: 82,
    },
    photo: "PqYNTAxqw9X3J8QSrT3hxKSjI0EaKZiHdcFubpML.jpeg",
    commentsCount: 0,
    likesCount: 0,
    createdAt: "2021-12-02T06:33:31.000000Z",
    updatedAt: "2021-12-02T06:33:31.000000Z",
  },
  {
    id: 396,
    title: "Тут потом будет название фото",
    description:
      "Тут потом будет какое-то описание фотки, ну да, кончно, не менее 60 символов",
    author: {
      id: 32,
    },
    album: {
      id: 82,
    },
    photo: "c1clsAoRw8aEK8PuN4xC428ZfjyRMkFY4Vhlk23m.jpeg",
    commentsCount: 0,
    likesCount: 0,
    createdAt: "2021-12-02T06:33:37.000000Z",
    updatedAt: "2021-12-02T06:33:37.000000Z",
  },
  {
    id: 397,
    title: "Тут потом будет название фото",
    description:
      "Тут потом будет какое-то описание фотки, ну да, кончно, не менее 60 символов",
    author: {
      id: 32,
    },
    album: {
      id: 82,
    },
    photo: "bYTGxTcEhdmWscg6h3lnsSkeT6vE1BqqulWlKrVL.jpeg",
    commentsCount: 0,
    likesCount: 0,
    createdAt: "2021-12-02T06:33:37.000000Z",
    updatedAt: "2021-12-02T06:33:37.000000Z",
  },
];
store.dispatch(setAllCards(imitationCards)); //!!!!!

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
