import {requests as $axios, tokenForAllPhotos} from "../../helpers/requests.js"; //насколько норм это тут писать??????????

const initialState = {
  user: {},
  currentUser: {},
};
let usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENTUSER":
      return {...state, currentUser: action.payload.user};
    case "REMOVE_CURRENTUSER":
      localStorage.removeItem("mini-inst-user"); //насколько норм это тут писать??????????
      $axios.defaults.headers["Authorization"] = tokenForAllPhotos; //насколько норм это тут писать??????????

      return {...state, currentUser: {}};
    default:
      return state;
  }
};
export default usersReducer;
