import { quiz } from '../game/quizData.js';
import { useState, useEffect } from 'react';
import { EventBus } from '../game/EventBus';

export default function Quiz({quizNum}){
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showEnd, setShowEnd] = useState(false);
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
                setShowEnd(true)
                EventBus.emit('quiz-end', score);
                return prevQuestion;
            }
        });
    }

    return (
        <div className="quiz">
            {showEnd ? 
            <>
                <h1>Quiz ended!</h1>
                <div className='quizContainer'>
                    <h2>Congratulations! Your score is {score}/{quiz[quizNumber].data.length} ({Math.round(score / quiz[quizNumber].data.length * 100)}%)</h2>
                </div>
            </>
            : 
            <>
                <h1>{question}</h1>
                <div className='quizContainer'>
                    <h3>Question {currentQuestion+1}/{quiz[quizNumber].data.length}</h3>
                    <div className='quizBtnContainer'>
                            <button className='quizBtn' onClick={()=>handleAnswer('A')}>A. {answerA}</button>
                            <button className='quizBtn' onClick={()=>handleAnswer('B')}>B. {answerB}</button>
                            <button className='quizBtn' onClick={()=>handleAnswer('C')}>C. {answerC}</button>
                            <button className='quizBtn' onClick={()=>handleAnswer('D')}>D. {answerD}</button>
                    </div>
                </div>
            </>}
        </div>
    )
}