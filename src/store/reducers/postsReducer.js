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
    case "REMOVE_POST":
      return {
        ...state,
        userPosts: state.userPosts.filter(
          (post) => post.id !== action.payload.id
        ),
        allPosts: state.allPosts.filter(
          (post) => post.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};
export default postsReducer;
