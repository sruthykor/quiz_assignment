import {
  GET_CATEGORIES,
  GET_QUIZCATEGORIES,
  SET_LOADING,
  QUIZCATEGORIES_ERROR,
  HANDLE_SELECT,
  // GET_DIFFICULTIES,
  HANDLE_DIFFICULTY,
  HANDLE_CHANGE,
  // GET_FETCHCATEGORIES,
  HANDLE_SUBMIT,
} from '../actions/types';
const initialState = {
  quizcategories: [{}],
  quizData: [],
  currentQuizStep: 'start',
  category: '',
  // difficulties: [{}],
  difficulty: {},
  quizNumber: null,
  loading: false,
  startpage: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_SUBMIT:
      return {
        ...state,
        quizData: action.payload,
        currentQuizStep: 'results',
      };

    case HANDLE_CHANGE:
      return {
        ...state,
        quizNumber: action.payload,
      };
    case HANDLE_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload,
      };

    case HANDLE_SELECT:
      return {
        ...state,
        category: action.payload,
      };
    case GET_QUIZCATEGORIES:
      console.log(action.payload);
      return {
        ...state,
        quizcategories: action.payload,
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case QUIZCATEGORIES_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
