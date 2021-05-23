import React from 'react';
import QuizReview from './QuizReview';
import { connect } from 'react-redux';

import { resetQuiz, setCurrentQuizStep } from '../actions/quizreviewActions';

const TotalResults = ({
  quizreview: { currentQuizStep },
  processedAnswers,
  resetQuiz,
  setCurrentQuizStep,
}) => {
  return currentQuizStep === 'results' ? (
    <div className='container'>
      <div className='row card'>
        <div className='col s12 center'>
          <h4 className='header'>Results</h4>
          <div className='row'>
            <div className='input-field col s12 '>
              {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out
              of {''} {processedAnswers.length}
            </div>
          </div>
          <div className='row '>
            <button
              className='btn waves-effect waves-light center '
              onClick={(e) => {
                setCurrentQuizStep(e);
              }}
              name='action'
            >
              Review
              <i className='material-icons right'>replay</i>
            </button>
            {'     '}
            <button
              className='btn waves-effect waves-light center '
              onClick={(e) => resetQuiz(e)}
              name='action'
            >
              Reset
              <i className='material-icons right'>replay</i>
            </button>
          </div>
          <div className='row'></div>
        </div>
      </div>
    </div>
  ) : (
    <QuizReview processedAnswers={processedAnswers} />
  );
};
const mapStateToProps = (state) => ({
  quizreview: state.quizreview,
});
export default connect(mapStateToProps, { resetQuiz, setCurrentQuizStep })(
  TotalResults
);
