import { useState } from 'react';

function GameConsole({ gameRef, onClose }) {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState('');

    const runCommand = () => {
        try {
            const scene = gameRef.current?.scene;
            if (scene) {
                // Evaluate the command with access to `scene`
                const result = eval(command);
                setOutput(result !== undefined ? String(result) : "Command executed successfully");
            } else {
                setOutput("Error: Scene not found");
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    return (
        <div className='console'>
            <button  onClick={onClose} className='consoleBtn'></button>
            <div className='terminal'>
                <h3>Runtime editor</h3>
                <textarea 
                    value={command} 
                    onChange={(e) => setCommand(e.target.value)}
                />
                <button className='button terminalBtn' onClick={runCommand}>Run</button>
            </div>
            
            <div className='output'>
                <strong>Output:</strong>
                <pre>{output}</pre>
            </div>
        </div>
    );
}

export default GameConsole;