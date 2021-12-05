import {combineReducers, createStore} from "redux";
import cardsReducer from "./reducers/cardsReducer";
import usersReducer from "./reducers/usersReducer";

let appReducer = combineReducers({
  cards: cardsReducer,
  users: usersReducer,
});
let store = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
