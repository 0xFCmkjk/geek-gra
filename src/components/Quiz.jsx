import { quiz } from '../game/quizData.js';

export default function Quiz(){
    let quizNumber = 0;
    let score = 0;
    let currentQuestion = 0;
    
    function getAnswer(e){
        if(e === quiz[quizNumber].data[currentQuestion].goodAns){
            score++;
        }
        if(currentQuestion < quiz[quizNumber].data.length - 1){
            currentQuestion++;
        } else {
            alert(`Your score is ${score}/${quiz[quizNumber].data.length}`);
        }
    }
    return (
        <div className="quiz">
            <h1>Quiz</h1>
            <h3>{quiz[quizNumber].data[currentQuestion].question}</h3>
            <button className='quizBtn' onClick={getAnswer('A')}>A. {quiz[quizNumber].data[currentQuestion].ansA}</button>
            <button className='quizBtn' onClick={getAnswer('B')}>A. {quiz[quizNumber].data[currentQuestion].ansA}</button>
            <button className='quizBtn' onClick={getAnswer('C')}>A. {quiz[quizNumber].data[currentQuestion].ansA}</button>
            <button className='quizBtn' onClick={getAnswer('D')}>A. {quiz[quizNumber].data[currentQuestion].ansA}</button>
        </div>
    )
}