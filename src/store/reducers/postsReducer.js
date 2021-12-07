const initialState = {
  allPosts: [],
  userPosts: [],
};
let postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALLPOSTS":
      return {...state, allPosts: action.payload.posts};
    case "SET_USERPOSTS":
      return {...state, userPosts: action.payload.posts};
    case "REMOVE_USERPOSTS":
      return {...state, userPosts: []};
    default:
      return state;
  }
};
export default postsReducer;
