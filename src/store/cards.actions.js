export const setAllCards = (cards) => {
  return {
    type: "SET_ALLCARDS",
    payload: {cards: cards},
  };
};

export const removeAllCards = () => {
  return {
    type: "REMOVE_ALLCARDS",
    payload: {},
  };
};
