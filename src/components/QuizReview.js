import React from 'react';
import { connect } from 'react-redux';
import Home from './pages/Home';
import { resetQuiz } from '../actions/quizreviewActions';
import QuizCategories from './QuizCategories';

const QuizReview = ({
  quizreview: { currentQuizStep, startpage },
  processedAnswers,
  resetQuiz,
}) => {
  const renderAnswers = (answers) => {
    console.log(answers);
    return answers.map(
      ({ question, isCorrect, correctAnswer, wrongAnswer }) => {
        const markup = () => {
          return { __html: question };
        };
        const correctanswermarkup = () => {
          return { __html: correctAnswer };
        };
        const wronganswermarkup = () => {
          return { __html: correctAnswer };
        };
        if (isCorrect) {
          return (
            <div className='card input-field col s12 m12'>
              <span className='left'>
                <div dangerouslySetInnerHTML={markup()}></div>
              </span>
              <div>
                <br />
                <br />
                <i className='material-icons left blue-text'>check</i>
                <span
                  className='left blue-text'
                  dangerouslySetInnerHTML={correctanswermarkup()}
                ></span>
              </div>
            </div>
          );
        } else {
          return (
            <div className='card input-field col s12 m12 '>
              <span className='left'>
                <div dangerouslySetInnerHTML={markup()}></div>
              </span>
              <br />
              <div>
                <br />
                <i className='material-icons left red-text'>close</i>
                <span
                  className='left red-text'
                  dangerouslySetInnerHTML={wronganswermarkup()}
                ></span>

                <br />
              </div>
              <div>
                <br />
                <i className='material-icons left blue-text'>check</i>
                <span
                  className='left blue-text'
                  dangerouslySetInnerHTML={correctanswermarkup()}
                ></span>
              </div>
            </div>
          );
        }
      }
    );
  };

  return (
    <div className='container'>
      <div className='row card'>
        <div className='col s12 center'>
          <h4 className='header'>Quiz Review</h4>
          <div className='row'>
            <div className='input-field col s12 '>
              {renderAnswers(processedAnswers)}
              <button
                className='btn waves-effect waves-light '
                onClick={(e) => resetQuiz(e)}
                name='action'
              >
                Reset
                <i className='material-icons right'>replay</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  quizreview: state.quizreview,
});
export default connect(mapStateToProps, { resetQuiz })(QuizReview);
