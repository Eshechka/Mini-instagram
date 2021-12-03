import {connect} from "react-redux";
import {HomePage} from "./HomePage";
import * as cardsActions from "../../store/cards.actions.js";

console.log("cardsActions", cardsActions);

let mapStateToProps = (state) => {
  return {
    allcards: state.cards.allcards,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    setAllCards: (cards) => {
      dispatch(() => {
        cardsActions.setAllCards(cards);
      });
    },
  };
};

let HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default HomePageContainer;
