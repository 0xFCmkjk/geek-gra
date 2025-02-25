import { quiz } from '../game/quizData.js';
import { useState, useEffect } from 'react';

export default function Quiz({quizNum}){
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    let quizNumber = quizNum;
    const [answerA , setAnswerA] = useState(quiz[quizNumber].data[currentQuestion].ansA);
    const [answerB , setAnswerB] = useState(quiz[quizNumber].data[currentQuestion].ansB);
    const [answerC , setAnswerC] = useState(quiz[quizNumber].data[currentQuestion].ansC);
    const [answerD , setAnswerD] = useState(quiz[quizNumber].data[currentQuestion].ansD);
    const [question , setQuestion] = useState(quiz[quizNumber].data[currentQuestion].question);

    useEffect(() => {
        setAnswerA(quiz[quizNumber].data[currentQuestion].ansA);
        setAnswerB(quiz[quizNumber].data[currentQuestion].ansB);
        setAnswerC(quiz[quizNumber].data[currentQuestion].ansC);
        setAnswerD(quiz[quizNumber].data[currentQuestion].ansD);
        setQuestion(quiz[quizNumber].data[currentQuestion].question);
    }, [currentQuestion]);

    function handleAnswer(answer){
        if(answer == quiz[quizNumber].data[currentQuestion].goodAns){
            setScore(score + 1);
            console.log(score);
        }
        setCurrentQuestion(prevQuestion => {
            const nextQuestion = prevQuestion + 1;
            if(nextQuestion < quiz[quizNumber].data.length){
                return nextQuestion;
            } else {
                console.log('Quiz ended');
                return prevQuestion;
            }
        });
    }

    return (
        <div className="quiz">
            <h1>Quiz</h1>
            <div className='quizContainer'>
                <h3>{question}</h3>
                <div className='quizBtnContainer'>
                <button className='quizBtn' onClick={()=>handleAnswer('A')}>A. {answerA}</button>
                <button className='quizBtn' onClick={()=>handleAnswer('B')}>B. {answerB}</button>
                <button className='quizBtn' onClick={()=>handleAnswer('C')}>C. {answerC}</button>
                <button className='quizBtn' onClick={()=>handleAnswer('D')}>D. {answerD}</button>
                </div>
            </div>
        </div>
    )
}