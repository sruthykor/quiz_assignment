import {
  GET_QUIZCATEGORIES,
  SET_LOADING,
  QUIZCATEGORIES_ERROR,
  HANDLE_SELECT,
  HANDLE_DIFFICULTY,
  HANDLE_CHANGE,
  GET_FETCHCATEGORIES,
  HANDLE_SUBMIT,
} from './types';
import axios from 'axios';
//fetch quiz categories from API
export const fetchQuizCategories = () => async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.get('https://opentdb.com/api_category.php');
    dispatch({
      type: GET_QUIZCATEGORIES,
      payload: data.trivia_categories,
    });
  } catch (err) {
    dispatch({
      type: QUIZCATEGORIES_ERROR,
      payload: err.response.data,
    });
  }
};

export const handleSelectChange = (e, quizcategories) => async (dispatch) => {
  try {
    e.preventDefault();
    const selectedCategory = await quizcategories.find(
      (cat) => cat.name === e.target.value
    );
    dispatch({
      type: HANDLE_SELECT,
      payload: selectedCategory,
    });
  } catch (err) {
    dispatch({
      type: QUIZCATEGORIES_ERROR,
      payload: err.response.data,
    });
  }
};

export const getQuizNumber = (e) => async (dispatch) => {
  try {
    e.preventDefault();
    dispatch({
      type: HANDLE_CHANGE,
      payload: e.target.value,
    });
  } catch (err) {
    dispatch({
      type: QUIZCATEGORIES_ERROR,
      payload: err.response.data,
    });
  }
};

export const handleDifficultyChange = (e, difficulties) => async (dispatch) => {
  try {
    e.preventDefault();
    const selectedDifficulty = difficulties.find(
      (diff) => diff.id === e.target.value
    );

    dispatch({
      type: HANDLE_DIFFICULTY,
      payload: selectedDifficulty,
    });
  } catch (err) {
    dispatch({
      type: QUIZCATEGORIES_ERROR,
      payload: err.response.data,
    });
  }
};

export const handleSubmit =
  (e, quizData, quizNumber, category, difficulty) => async (dispatch) => {
    try {
      e.preventDefault();
      if (!quizData.length && quizNumber && category.name && difficulty.name) {
        const { data } = await axios.get(
          `https://opentdb.com/api.php?amount=${quizNumber}&category=${
            category.id
          }&difficulty=${difficulty.name.toLowerCase()}`
        );

        const formattedData = data.results.map((category) => {
          const incorrectIndex = category.incorrect_answers.length;
          const randomIndex = Math.round(
            Math.random() * (incorrectIndex - 0) + 0
          );
          let options = category.incorrect_answers;
          options.splice(randomIndex, 0, category.correct_answer);
          return {
            ...category,
            answers: options,
          };
        });
        // fetchCategories(quizNumber, category, difficulty);
        dispatch({
          type: HANDLE_SUBMIT,
          payload: formattedData,
        });
      }
    } catch (err) {
      dispatch({
        type: QUIZCATEGORIES_ERROR,
        payload: err.response.data,
      });
    }
  };

//Set Loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
