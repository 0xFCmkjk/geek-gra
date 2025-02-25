import { useRef, useState } from 'react';
import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';
import GameConsole from './components/GameConsole';
import StartingMenu from './components/StartingMenu';
import TaskInfo from './components/TaskInfo';
import { EventBus } from './game/EventBus';
import Quiz from './components/Quiz';

function App ()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [showConsole, setShowConsole] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);

    let quizNum = 0;

    const phaserDocsUrl = "https://docs.phaser.io/api-documentation/api-documentation";

    EventBus.on("back-button-pressed", () => {
        setShowConsole(false);
    })

    EventBus.on('quiz-start',(e)=>{
        setShowQuiz(true);
        quizNum = e;
    })

    return (
        <div id="app">
            {showQuiz ? <Quiz quizNum={quizNum}/> : null}
            {showMenu && <StartingMenu onStart={()=>setShowMenu(false)}/>}
            {!showMenu && <PhaserGame ref={phaserRef} isConsoleOpen={showConsole} />}
            <div>
                <button className="button" onClick={() => setShowConsole(prev => !prev)}>
                    Code Editor
                </button>
                <button className="button" onClick={() => setShowInfo(prev => !prev)}>
                    Task Info
                </button>
                <button className="button" onClick={() => window.open(phaserDocsUrl, '_blank').focus()}>
                    Phaser Docs
                </button>
            </div>
            {showConsole && <GameConsole gameRef={phaserRef} onClose={() => setShowConsole(false)} />}
            {showInfo && <TaskInfo onClose={() => setShowInfo(false)} />}
        </div>
    );
}

export default App;
