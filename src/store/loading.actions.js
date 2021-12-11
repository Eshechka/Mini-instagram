export const setIsLoading = (isLoading) => {
  return {
    type: "SET_ISLOADING",
    payload: {isLoading: isLoading},
  };
};
