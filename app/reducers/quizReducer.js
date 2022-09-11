import {getAllQuizCategoriesString, getAllQuizViaCategoryIdString} from '../constants/actionStrings';

export default (state = {}, action) => {
  switch (action.type) { 
    case getAllQuizCategoriesString:
      return {
        ...state,
        allQuizCategories: action.payload,
      };
    case getAllQuizViaCategoryIdString:
      return {
        ...state,
        allQuiz: action.payload,
      };
    default:
      return state;
  }
};
