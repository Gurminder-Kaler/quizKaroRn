import {loginString, updateAuthUserString, logOutString} from '../constants/actionStrings';

export default (state = {}, action) => {
  console.log('Auth reducer', action);
  switch (action.type) {
    case logOutString:
      return {
      };
    case loginString:
      return {
        ...state,
        user: action.payload,
      };
    case updateAuthUserString:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
