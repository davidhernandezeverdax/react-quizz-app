import React, { useState } from 'react';
import './style.css';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    question: '¿Qué servicio AWS proporciona cómputo en la nube?',
    options: ['Lambda', 'EC2', 'S3', 'DynamoDB'],
    answer: 'EC2',
  },
  {
    question:
      '¿Cuál es el nombre del framework de JavaScript desarrollado por Facebook?',
    options: ['Angular', 'Vue', 'React', 'Ember'],
    answer: 'React',
  },
  {
    question:
      '¿Qué servicio de AWS se utiliza comúnmente para almacenar archivos estáticos?',
    options: ['EC2', 'RDS', 'S3', 'Lambda'],
    answer: 'S3',
  },
  {
    question: '¿Qué es Node.js?',
    options: [
      'Un lenguaje de programación',
      'Un entorno de ejecución de JavaScript',
      'Una base de datos',
      'Un framework frontend',
    ],
    answer: 'Un entorno de ejecución de JavaScript',
  },
  {
    question: '¿Qué servicio de AWS proporciona una base de datos relacional?',
    options: ['DynamoDB', 'Redshift', 'ElastiCache'],
    answer: 'Redshift',
  },
];

export const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.question]: option,
    });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  const reset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.question] === q.answer) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <>
      {!showResults ? (
        <div className="quiz-container">
          <div className="quiz-question">{currentQuestion.question}</div>
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleOptionSelect(option)}
              className="quiz-option-button"
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="quiz-container">
          <p className="score-display">
            Tu puntaje es: {calculateScore()} de {questions.length}
          </p>
          <div className="score-detail">
            {questions.map((q, index) => (
              <p
                key={index}
                className={
                  selectedAnswers[q.question] === q.answer
                    ? 'correct-answer'
                    : 'incorrect-answer'
                }
              >
                Pregunta {index + 1}:{' '}
                {selectedAnswers[q.question] === q.answer
                  ? 'Correcta'
                  : 'Incorrecta'}
              </p>
            ))}
          </div>
          <button onClick={reset} className="retry-button">
            Intentar de nuevo
          </button>
        </div>
      )}
    </>
  );
};
