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

    return (
        <div id="app">
            {showMenu && <StartingMenu onStart={()=>setShowMenu(false)}/>}
            <PhaserGame ref={phaserRef} />
            <button className="button" onClick={() => setShowConsole(prev => !prev)}>
                Code Editor
            </button>
            {showConsole && <GameConsole gameRef={phaserRef} onClose={() => setShowConsole(false)} />}
        </div>
    );
}

export default App;
