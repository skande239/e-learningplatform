import React, { useState } from 'react';
import styled from 'styled-components';

const QuizContainer = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Question = styled.div`
  margin-bottom: 20px;
`;

const Option = styled.div`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.selected ? '#e3f2fd' : 'white'};
  
  &:hover {
    background: #f5f5f5;
  }
`;

function QuizComponent({ quiz, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setShowResults(true);
    onComplete(score);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.keys(answers).forEach(questionId => {
      if (answers[questionId] === quiz.questions[questionId].correctAnswer) {
        correct++;
      }
    });
    return (correct / quiz.questions.length) * 100;
  };

  return (
    <QuizContainer>
      {!showResults ? (
        <>
          <h3>اختبار: {quiz.title}</h3>
          <Question>
            <h4>{quiz.questions[currentQuestion].question}</h4>
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <Option
                key={index}
                selected={answers[currentQuestion] === option}
                onClick={() => handleAnswer(currentQuestion, option)}
              >
                {option}
              </Option>
            ))}
          </Question>
          <div>
            {currentQuestion > 0 && (
              <button onClick={() => setCurrentQuestion(curr => curr - 1)}>
                السابق
              </button>
            )}
            {currentQuestion < quiz.questions.length - 1 ? (
              <button onClick={() => setCurrentQuestion(curr => curr + 1)}>
                التالي
              </button>
            ) : (
              <button onClick={handleSubmit}>إنهاء الاختبار</button>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3>النتيجة النهائية</h3>
          <p>لقد حصلت على {calculateScore()}%</p>
        </div>
      )}
    </QuizContainer>
  );
}

export default QuizComponent; 