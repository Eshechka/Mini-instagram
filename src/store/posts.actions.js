export const setAllPosts = (posts) => {
  return {
    type: "SET_ALLPOSTS",
    payload: {posts: posts},
  };
};

export const setUserPosts = (posts) => {
  return {
    type: "SET_USERPOSTS",
    payload: {posts: posts},
  };
};

export const removeUserPosts = () => {
  return {
    type: "REMOVE_USERPOSTS",
    payload: {},
  };
};
