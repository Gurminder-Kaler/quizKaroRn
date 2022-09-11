import apiRequest from '../network/api';
import {
  getScoreViaUserId,
  isLoading,
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';
import AsyncStorage from '@react-native-community/async-storage';

// ------------------ Login EndPoints  ----------------------- //
export const getScoreViaUserId = user => async dispatch => {
  dispatch({type: isLoading, payload: {loader: true}});
  // console.log('user data scoreActions.js', user);
  let response = await apiRequest(EndPoints.getScoreViaUserId, 'POST', loginData);
  // console.log('Response on auth action 222222', response);
  if (response && response.success) {
    AsyncStorage.setItem('userToken', response.token);
    AsyncStorage.setItem('user', JSON.stringify(response.data));
    dispatch({type: getScoreViaUserId, payload: {user: response.data}});
  }
  dispatch({type: isLoading, payload: {loader: false}});
  return response ? response : false;
};
