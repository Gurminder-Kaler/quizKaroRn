import apiRequest from '../network/api';
import {
  getAllQuizCategoriesString,
  getAllQuizViaCategoryIdString,
  isLoadingString,
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';

// ------------------ getAllQuizCategories EndPoints  ----------------------- //
export const getAllQuizCategories = () => async dispatch => {
  dispatch({type: isLoadingString, payload: {loader: true}});
  let response = await apiRequest(EndPoints.getAllQuizCategories, 'POST');
  // console.log('RESPONES quiz action 1 ', response.data);
  if (response && response.success) {

  dispatch({type: isLoadingString, payload: {loader: true}});
    dispatch({type: getAllQuizCategoriesString, payload: response.data});
  }
  dispatch({type: isLoadingString, payload: {loader: false}});
  return response ? response : false;
};

// ------------------ getAllQuizViaCategoryId EndPoints  ----------------------- //
export const getAllQuizViaCategoryId = categoryId => async dispatch => {
  dispatch({type: isLoadingString, payload: {loader: true}});
  // console.log('Category id quizAction', categoryId);
  let response = await apiRequest(EndPoints.getAllQuizViaCategoryId, 'POST', {
    categoryId: categoryId,
  });
  // console.log('RESPONES quiz action 2 ', response.data);
  if (response && response.success) {
    dispatch({type: getAllQuizViaCategoryIdString, payload: response.data});
  }
  dispatch({type: isLoadingString, payload: {loader: false}});
  return response ? response : false;
};
