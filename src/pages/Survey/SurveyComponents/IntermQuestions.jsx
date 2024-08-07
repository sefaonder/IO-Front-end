import React, { useEffect, useState } from 'react';
import { dataInterm as questions } from './SurveyQs';
import { Container, Box } from '@mui/material';

const IntermQuestions = ({ selectedAnswers, setSelectedAnswers }) => {
  const [selectedAnswer, setSelectedAnswer] = useState();

  const handleClick = (answer, questionIndex) => {
    setSelectedAnswer(answer);
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer.text;
    setSelectedAnswers(updatedAnswers);
  };

  return (
    <Container className="lg:w-full sm:w-full">
      {questions?.map((data, index) => {
        return (
          <Box className="sm:py-4">
            <h2 className="font-bold">
              {' '}
              {index + 1}: {data.question}
            </h2>
            <div className="flex justify-between flex-col lg:flex-row ">
              {data?.answers?.map((answer, answerIndex) => {
                const isSelected = selectedAnswers[index] === answer.text;
                return (
                  <div
                    key={answerIndex}
                    onClick={() => handleClick(answer, index)}
                    className={
                      isSelected
                        ? 'bg-emerald-500 text-left text-white cursor-pointer py-0.5 px-4 rounded-md m-1'
                        : 'text-left py-0.5 px-4 rounded-md hover:bg-emerald-100 hover:cursor-pointer transition ease-in-out delay-150 m-1'
                    }
                  >
                    -{answer.text}
                  </div>
                );
              })}
            </div>
          </Box>
        );
      })}
    </Container>
  );
};

export default IntermQuestions;

/*

*/
