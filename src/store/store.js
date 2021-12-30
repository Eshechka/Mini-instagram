import {combineReducers, createStore} from "redux";
import postsReducer from "./reducers/postsReducer";
import usersReducer from "./reducers/usersReducer";
import loadingReducer from "./reducers/loadingReducer";

let appReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  loading: loadingReducer,
});
let store = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
