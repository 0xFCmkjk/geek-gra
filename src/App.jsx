import { useRef, useState } from 'react';
import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';
import GameConsole from './components/GameConsole';
import StartingMenu from './components/StartingMenu';
import TaskInfo from './components/TaskInfo';
import { EventBus } from './game/EventBus';
import Quiz from './components/Quiz';
import Map from './components/Map';

function App ()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [showConsole, setShowConsole] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizNumber, setQuizNumber] = useState(0);
    const [showMap, setShowMap] = useState(false);

    const phaserDocsUrl = "https://docs.phaser.io/api-documentation/api-documentation";

    function resumeGame() {
        if (phaserRef.current && phaserRef.current.scene && phaserRef.current.scene.physics.world) {
            EventBus.emit("resume-game");
            setShowMap(false);
        }
    }

    EventBus.on("back-button-pressed", () => {
        setShowConsole(false);
        setShowInfo(false);
    })
    EventBus.on('start-quiz',(e)=>{
        setShowQuiz(true);
        setQuizNumber(e);
    })
    EventBus.on('exit-quiz',()=>{
        setShowQuiz(false);
    })
    EventBus.on('map',()=>{
        setShowMap(true);
    })

    return (
        <div id="app">
            {showQuiz ? <Quiz quizNum={quizNumber}/> : null}
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
            {showMap && <Map onSelect={resumeGame}/>}
        </div>
    );
}

export default App;
