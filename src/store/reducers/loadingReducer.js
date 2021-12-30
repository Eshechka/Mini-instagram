const initialState = {
  isLoading: false,
};
let loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ISLOADING":
      return {...state, isLoading: action.payload.isLoading};
    default:
      return state;
  }
};
export default loadingReducer;
