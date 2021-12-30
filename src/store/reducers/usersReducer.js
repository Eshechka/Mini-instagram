const initialState = {
  user: {},
  currentUser: {},
};
let usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENTUSER":
      return {...state, currentUser: action.payload.user};
    case "REMOVE_CURRENTUSER":
      return {...state, currentUser: {}};
    default:
      return state;
  }
};
export default usersReducer;
