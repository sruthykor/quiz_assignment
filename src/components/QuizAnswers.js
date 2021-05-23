import React, { useState } from 'react';
import { setCurrentQuizStep } from '../actions/quizreviewActions';
import TotalResults from './TotalResults';

const QuizAnswers = ({ quizData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [processedAnswers, setProcessedAnswers] = useState([]);
  const [currentQuizStep, setCurrentQuizStep] = useState('');

  const relatedAnswer = (question, selectedAnswers) => {
    if (selectedAnswers && selectedAnswers.length) {
      const relatedQuestion = selectedAnswers.find(
        (answer) => answer.question === question
      );
      console.log(relatedQuestion);
      return (relatedQuestion && relatedQuestion.answer) || '';
    }

    return '';
  };
  const handleAnswerChange = (e, selectedQuestion) => {
    e.preventDefault();
    const { value } = e.target;
    const isExistQuestion =
      selectedAnswers.length &&
      selectedAnswers.find((answer) => answer.question === selectedQuestion);

    if (isExistQuestion && isExistQuestion.answer) {
      const updatedAnswers = selectedAnswers.map((answer) => {
        if (answer.question === selectedQuestion) {
          return { question: selectedQuestion, answer: value };
        }
        return answer;
      });
      setSelectedAnswers(updatedAnswers);
    } else {
      setSelectedAnswers([
        ...selectedAnswers,
        { question: selectedQuestion, answer: value },
      ]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const processedAnswers = selectedAnswers.map(({ answer, question }) => {
      const relatedQuestion = quizData.find((cat) => cat.question === question);
      if (relatedQuestion.correct_answer === answer) {
        return { correctAnswer: answer, isCorrect: true, question };
      }
      return {
        correctAnswer: relatedQuestion.correct_answer,
        wrongAnswer: answer,
        isCorrect: false,
        question,
      };
    });
    setProcessedAnswers(processedAnswers);
    setCurrentQuizStep('results');
  };
  console.log({ selectedAnswers });
  return !processedAnswers.length ? (
    <div className='container'>
      <div className='row card'>
        <div className='col s12 m9'>
          <h4 className='header'>Choose your correct answer</h4>
          <div className='row'>
            <form onSubmit={(e) => handleSubmit(e)} className='col s12'>
              <div className='row'>
                {quizData.map((quiz) => (
                  <div className='input-field col s12'>
                    <span>{quiz.question}</span>

                    <div className='input-field col s12 m12'>
                      <select
                        className='browser-default'
                        required
                        name='answer'
                        value={
                          relatedAnswer(quiz.question, selectedAnswers) || ''
                        }
                        id='answer-select'
                        label='Select Answer'
                        onChange={(e) => handleAnswerChange(e, quiz.question)}
                      >
                        <option value='Select Category' selected>
                          Select Answer
                        </option>
                        {quiz.answers.map((answer) => (
                          <option key={answer} value={answer}>
                            {answer}
                          </option>
                        ))}
                      </select>{' '}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className='btn waves-effect waves-light'
                type='submit'
                name='action'
              >
                Result
                <i className='material-icons right'>send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <TotalResults processedAnswers={processedAnswers} />
  );
};

export default QuizAnswers;
