import { AUTHENTICATE } from "../actions/auth";

const initalState = {
  token: null,
  userId: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return{
          token: action.token,
          userId: action.userId
      }
    // case SIGN_UP:
    //     return{
    //         token: action.token,
    //         userId: action.userId
    //     }
    default:
      return state;
  }
};
