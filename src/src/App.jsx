import { useRef, useState } from 'react';
import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';
import GameConsole from './GameConsole';

function App ()
{

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [showConsole, setShowConsole] = useState(false);

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
            <div>
                <div>
                    <button className="button" onClick={() => setShowConsole(prev => !prev)}>
                        Code Editor
                    </button>
                </div>

                {showConsole && <GameConsole gameRef={phaserRef} onClose={() => setShowConsole(false)} />}
            </div>
        </div>
    );
}

export default App;
