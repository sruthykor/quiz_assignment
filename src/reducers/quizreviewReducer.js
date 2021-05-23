import { RESET_QUIZ, SETCURRENT_QUIZSTEP } from '../actions/types';
const initialState = {
  quizData: [],
  currentQuizStep: 'results',
  category: '',
  startpage: false,
  //difficulties: [{}],
  difficulty: {},
  //quizNumber: null,
  //loading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SETCURRENT_QUIZSTEP:
      return {
        ...state,
        currentQuizStep: 'review',
        startpage: false,
      };
    case RESET_QUIZ:
      return {
        ...state,
        currentQuizStep: 'start',
        startpage: true,
      };
    default:
      return state;
  }
};
