export const setAllPosts = (posts) => {
  return {
    type: "SET_ALLPOSTS",
    payload: {posts: posts},
  };
};

export const setCurrentUserPosts = (posts) => {
  return {
    type: "SET_CURRENTUSER_POSTS",
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

export const removeCurrentUserPosts = () => {
  return {
    type: "REMOVE_CURRENTUSER_POSTS",
    payload: {},
  };
};

export const removePost = (postId) => {
  return {
    type: "REMOVE_POST",
    payload: {id: postId},
  };
};
