const initialState = {
  allCards: [],
};
let cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALLCARDS":
      return {...state, allCards: action.payload.cards};
    default:
      return state;
  }
};
export default cardsReducer;
