import {connect} from "react-redux";
import {AuthPage} from "./AuthPage";
import * as actions from "../../store/users.actions.js";

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};
const mapDispatchToProps = {
  setCurrentUser: (user) => actions.setCurrentUser(user),
};

export const AuthPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
