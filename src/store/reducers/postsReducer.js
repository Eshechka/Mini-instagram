const initialState = {
  allPosts: [],
  userPosts: [],
};
let postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALLPOSTS":
      return {...state, allPosts: action.payload.posts};
    case "SET_CURRENTUSER_POSTS":
      return {...state, userPosts: action.payload.posts};
    case "REMOVE_CURRENTUSER_POSTS":
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
    case "UPDATE_POSTLIKES":
      return {
        ...state,
        allPosts: state.allPosts.map((post) => {
          if (post.id === action.payload.id) {
            if (action.payload.type === "addLike") {
              post.likes = post.likes.concat(action.payload.userId);
            } else if (action.payload.type === "removeLike") {
              post.likes = post.likes.filter(
                (like) => like !== action.payload.userId
              );
            }
            post.likesCount = post.likes.length;
          }
          return post;
        }),

        userPosts: state.userPosts.map((post) => {
          if (post.id === action.payload.id) {
            if (action.payload.type === "addLike") {
              post.likes = post.likes.concat(action.payload.userId);
            } else if (action.payload.type === "removeLike") {
              post.likes = post.likes.filter(
                (like) => like !== action.payload.userId
              );
            }
            post.likesCount = post.likes.length;
          }
          return post;
        }),
      };

    default:
      return state;
  }
};
export default postsReducer;
