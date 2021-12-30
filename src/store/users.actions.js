export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENTUSER",
    payload: {user: user},
  };
};
export const removeCurrentUser = (userId) => {
  return {
    type: "REMOVE_CURRENTUSER",
    payload: {id: userId},
  };
};
