const initialState = {
  allCards: [],
  userCards: [],
};
let cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALLCARDS":
      return {...state, allCards: action.payload.cards};
    case "SET_USERCARDS":
      return {...state, userCards: action.payload.cards};
    case "REMOVE_USERCARDS":
      return {...state, userCards: []};
    default:
      return state;
  }
};
export default cardsReducer;
