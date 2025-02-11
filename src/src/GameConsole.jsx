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
        <div style={{
            position: 'absolute', top: '50px', left: '50px', 
            width: '450px', height: '350px',
            background: 'black', color: 'lime', padding: '10px', border: '2px solid lime',
            zIndex: 1000, fontFamily: 'Pixelon',
        }}>
            <button  onClick={onClose} style={{ float: 'right', background: 'red', color: 'white' }}>X</button>
            
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', content: 'align'}}>
                <h3>Game code editor</h3>
                <textarea 
                    value={command} 
                    onChange={(e) => setCommand(e.target.value)}
                    style={{ width: '100%', height: '100px', background: 'black', color: 'lime', fontFamily: 'monospace' }}
                />
                <button className='button' onClick={runCommand} style={{width: '50%', textAlign: 'center'}}>Run</button>
            </div>
            
            <div style={{ marginTop: '10px', whiteSpace: 'pre-wrap'}}>
                <strong>Output:</strong>
                <pre>{output}</pre>
            </div>
        </div>
    );
}

export default GameConsole;