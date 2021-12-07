export const setAllCards = (cards) => {
  return {
    type: "SET_ALLCARDS",
    payload: {cards: cards},
  };
};

export const setUserCards = (cards) => {
  return {
    type: "SET_USERCARDS",
    payload: {cards: cards},
  };
};

export const removeUserCards = () => {
  return {
    type: "REMOVE_USERCARDS",
    payload: {},
  };
};
