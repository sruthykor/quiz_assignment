import { combineReducers } from 'redux';
import quizcategoriesReducer from './quizcategoriesReducer';
import quizreviewReducer from './quizreviewReducer';
export default combineReducers({
  quizcategory: quizcategoriesReducer,
  quizreview: quizreviewReducer,
});
