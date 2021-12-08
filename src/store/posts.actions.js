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

export const updatePostsLikes = (postId, userId, typeUpdating) => {
  return {
    type: "UPDATE_POSTLIKES",
    payload: {
      id: postId,
      userId: userId,
      type: typeUpdating,
    },
  };
};

export const removeUserPosts = () => {
  return {
    type: "REMOVE_USERPOSTS",
    payload: {},
  };
};

export const removePost = (postId) => {
  return {
    type: "REMOVE_POST",
    payload: {id: postId},
  };
};
