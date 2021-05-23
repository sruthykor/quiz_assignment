import axios from 'axios';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import QuizAnswers from './QuizAnswers';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import { difficulties } from '../db';
import {
  fetchQuizCategories,
  handleSelectChange,
  // getdifficulty,
  handleDifficultyChange,
  getQuizNumber,
  // fetchCategories,
  handleSubmit,
} from '../actions/quizcategoriesActions';
// export const difficulties = [
//   {
//     id: 'total_easy_question_count',
//     name: 'Easy',
//   },
//   {
//     id: 'total_medium_question_count',
//     name: 'Medium',
//   },
//   {
//     id: 'total_hard_question_count',
//     name: 'Hard',
//   },
// ];
const QuizCategories = ({
  quizcategory: {
    quizcategories,
    loading,
    category,
    difficulty,
    quizNumber,
    currentQuizStep,
    quizData,
  },
  fetchQuizCategories,
  handleSelectChange,

  handleDifficultyChange,
  getQuizNumber,

  handleSubmit,
}) => {
  useEffect(() => {
    fetchQuizCategories();
  }, []);

  if (loading || quizcategories === null) {
    return <Spinner />;
  } else {
    return (
      <div className='container'>
        {currentQuizStep === 'start' ? (
          <div className='row card'>
            <div className='col s12 m9'>
              <h2 className='header'>Get Questions</h2>
              <div className='row'>
                <form
                  onSubmit={(e) =>
                    handleSubmit(e, quizData, quizNumber, category, difficulty)
                  }
                  className='col s12'
                >
                  <div className='row'>
                    <div className='input-field col s12 m12'>
                      <select
                        className='browser-default'
                        required
                        name='category'
                        // value={category.name || ''}
                        id='category-select'
                        label='Select Category'
                        onChange={(e) => handleSelectChange(e, quizcategories)}
                      >
                        <option value='Select Category' selected>
                          Select Category
                        </option>
                        {quizcategories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='input-field col s12'>
                      <select
                        className='browser-default'
                        required
                        name='difficulty'
                        // value={difficulty.id || ''}
                        id='difficulty-select'
                        label='Select Difficulty'
                        onChange={(e) =>
                          handleDifficultyChange(e, difficulties)
                        }
                      >
                        <option value='Select Difficulty' selected>
                          Select Difficulty
                        </option>
                        {difficulties.map((difficulty) => (
                          <option key={difficulty.id} value={difficulty.id}>
                            {difficulty.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='input-field col s12'>
                      <input
                        placeholder='Add a quiz number between 1 & 10'
                        id='quiz-number'
                        value={quizNumber || ' '}
                        type='number'
                        onChange={(e) => getQuizNumber(e)}
                      />
                    </div>
                  </div>
                  <button
                    className='btn waves-effect waves-light'
                    type='submit'
                    name='action'
                  >
                    Submit
                    <i className='material-icons right'>send</i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <QuizAnswers quizData={quizData} />
        )}
      </div>
    );
  }
};

QuizCategories.propTypes = {
  quizcategory: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  quizcategory: state.quizcategory,
});

export default connect(mapStateToProps, {
  fetchQuizCategories,
  handleSelectChange,

  handleDifficultyChange,
  getQuizNumber,

  handleSubmit,
})(QuizCategories);
