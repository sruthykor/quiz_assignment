import { SETCURRENT_QUIZSTEP, RESET_QUIZ, QUIZCATEGORIES_ERROR } from './types';

export const resetQuiz = (e) => async (dispatch) => {
  try {
    e.preventDefault();
    window.scrollTo(0, '20px');
    dispatch({
      type: RESET_QUIZ,
    });
  } catch (err) {
    dispatch({
      type: QUIZCATEGORIES_ERROR,
      payload: err.response.data,
    });
  }
};

export const setCurrentQuizStep = (e) => async (dispatch) => {
  try {
    e.preventDefault();
    dispatch({
      type: SETCURRENT_QUIZSTEP,
    });
  } catch (err) {
    dispatch({
      type: QUIZCATEGORIES_ERROR,
      payload: err.response.data,
    });
  }
};
