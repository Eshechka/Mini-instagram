import {combineReducers, createStore} from "redux";
import cardsReducer from "./reducers/cardsReducer";

let appReducer = combineReducers({
  cards: cardsReducer,
});
let store = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
