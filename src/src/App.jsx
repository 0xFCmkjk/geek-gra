import { useRef, useState } from 'react';
import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';
import GameConsole from './components/GameConsole';
import StartingMenu from './components/StartingMenu';

function App ()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [showConsole, setShowConsole] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const phaserDocsUrl = "https://docs.phaser.io/phaser/getting-started/what-is-phaser";
    const reactDocsUrl = "https://react.dev/reference/react";

    return (
        <div id="app">
            {showMenu && <StartingMenu onStart={()=>setShowMenu(false)}/>}
            <PhaserGame ref={phaserRef} isConsoleOpen={showConsole} />
            <div>
                <button className="button" onClick={() => setShowConsole(prev => !prev)}>
                    Code Editor
                </button>
                <button className="button" onClick={() => window.open(phaserDocsUrl, '_blank').focus()}>
                    Phaser Docs
                </button>
                <button className="button" onClick={() => window.open(reactDocsUrl, '_blank').focus()}>
                    React Docs
                </button>
            </div>
            {showConsole && <GameConsole gameRef={phaserRef} onClose={() => setShowConsole(false)} />}
        </div>
    );
}

export default App;
