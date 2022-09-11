import {combineReducers} from 'redux';
import auth from './authReducer';
import quiz from './quizReducer';
// import Profile from './profileReducer';
import Loader from './apiLoader'

export default combineReducers({
  auth,
  quiz,
  Loader,
});
