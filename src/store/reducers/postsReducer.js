const initialState = {
  allPosts: [],
  currentUserPosts: [],
  userPosts: [],
};
let postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALLPOSTS":
      return {...state, allPosts: action.payload.posts};
    case "SET_USER_POSTS":
      return {...state, userPosts: action.payload.posts};
    case "SET_CURRENTUSER_POSTS":
      return {...state, currentUserPosts: action.payload.posts};
    case "REMOVE_CURRENTUSER_POSTS":
      return {...state, currentUserPosts: []};
    case "ADD_NEW_POST":
      return {
        ...state,
        currentUserPosts: [action.payload.post, ...state.currentUserPosts],
      };
    case "REMOVE_POST":
      return {
        ...state,
        currentUserPosts: state.currentUserPosts.filter(
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

        currentUserPosts: state.currentUserPosts.map((post) => {
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
